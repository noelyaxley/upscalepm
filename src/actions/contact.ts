'use server'

import { Client } from '@hubspot/api-client'
import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(1, 'Message is required'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  pageUri: z.string().optional(),
  pageName: z.string().optional(),
})

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function submitContactForm(
  data: Record<string, string>
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' }
  }

  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN

  if (!accessToken || accessToken === 'REPLACE_ME') {
    console.warn(
      '[contact] HUBSPOT_ACCESS_TOKEN not configured -- skipping submission.'
    )
    return { success: true }
  }

  const hubspot = new Client({ accessToken })

  const properties: Record<string, string> = {
    firstname: parsed.data.firstName,
    lastname: parsed.data.lastName,
    email: parsed.data.email,
    phone: parsed.data.phone ?? '',
    service_interest: parsed.data.projectType ?? '',
    message: parsed.data.message,
  }

  if (parsed.data.utmSource) properties.utm_source = parsed.data.utmSource
  if (parsed.data.utmMedium) properties.utm_medium = parsed.data.utmMedium
  if (parsed.data.utmCampaign) properties.utm_campaign = parsed.data.utmCampaign
  if (parsed.data.utmTerm) properties.utm_term = parsed.data.utmTerm
  if (parsed.data.utmContent) properties.utm_content = parsed.data.utmContent

  try {
    await hubspot.crm.contacts.basicApi.create({ properties })
    return { success: true }
  } catch (error: unknown) {
    // If contact already exists (409 conflict), update instead
    if (
      error &&
      typeof error === 'object' &&
      'code' in error &&
      (error as { code: number }).code === 409
    ) {
      try {
        const searchResponse = await hubspot.crm.contacts.searchApi.doSearch({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: parsed.data.email,
                },
              ],
            },
          ],
          properties: ['email'],
          limit: 1,
          after: '0',
          sorts: [],
        })

        if (searchResponse.results.length > 0) {
          await hubspot.crm.contacts.basicApi.update(
            searchResponse.results[0].id,
            { properties }
          )
          return { success: true }
        }
      } catch (updateError) {
        console.error('HubSpot contact update failed:', updateError)
      }
    }

    console.error('HubSpot contact creation failed:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again or call us directly.',
    }
  }
}
