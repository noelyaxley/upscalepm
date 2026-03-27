'use server'

import { Client } from '@hubspot/api-client'
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts/models/Filter'
import { headers } from 'next/headers'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'

// 5 submissions per IP per 10-minute window
const FORM_RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 }

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  email: z.string().email('Please enter a valid email').max(254),
  phone: z.string().max(30).optional(),
  projectType: z.string().max(200).optional(),
  message: z.string().min(1, 'Message is required').max(5000),
  utmSource: z.string().max(500).optional(),
  utmMedium: z.string().max(500).optional(),
  utmCampaign: z.string().max(500).optional(),
  utmTerm: z.string().max(500).optional(),
  utmContent: z.string().max(500).optional(),
  gclid: z.string().max(500).optional(),
  pageUri: z.string().max(2000).optional(),
  pageName: z.string().max(500).optional(),
})

export type ContactFormState = {
  success: boolean
  error?: string
}

export async function submitContactForm(
  data: Record<string, string>
): Promise<ContactFormState> {
  // Rate limit by IP
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'unknown'
  const rl = rateLimit(`contact:${ip}`, FORM_RATE_LIMIT)
  if (!rl.success) {
    return { success: false, error: 'Too many submissions. Please try again later.' }
  }

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

  // Map project types to HubSpot service_interest values
  const serviceInterestMap: Record<string, string> = {
    'New Club Redevelopment': 'Club Redevelopment',
    'Club Refurbishment': 'Club Refurbishment',
    'Masterplan / Feasibility Study': 'Feasibility & Advisory',
    'Golf Clubhouse Development': 'Golf Clubhouse Development',
    'Seniors Living / Mixed-Use': 'Seniors Living / Mixed-Use',
    'Construction Oversight (project underway)': 'Construction Oversight',
    'Not sure yet': 'Not sure yet',
    'Property Report': 'Property Report',
    // Legacy mappings from survey form
    'New build or extension': 'Club Redevelopment',
    'Commercial fit-out or refurbishment': 'Club Refurbishment',
    'DA approval or town planning': 'DA Approval',
    'Feasibility study': 'Feasibility & Advisory',
    'Something else': 'Not sure yet',
  }

  const properties: Record<string, string> = {
    firstname: parsed.data.firstName,
    lastname: parsed.data.lastName,
    email: parsed.data.email,
    phone: parsed.data.phone ?? '',
    service_interest: serviceInterestMap[parsed.data.projectType ?? ''] || 'Not sure yet',
    message: parsed.data.message,
  }

  if (parsed.data.utmSource) properties.utm_source = parsed.data.utmSource
  if (parsed.data.utmMedium) properties.utm_medium = parsed.data.utmMedium
  if (parsed.data.utmCampaign) properties.utm_campaign = parsed.data.utmCampaign
  if (parsed.data.utmTerm) properties.utm_term = parsed.data.utmTerm
  if (parsed.data.utmContent) properties.utm_content = parsed.data.utmContent
  if (parsed.data.gclid) properties.hs_google_click_id = parsed.data.gclid

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
                  operator: FilterOperatorEnum.Eq,
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
