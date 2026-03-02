'use server'

import { Client } from '@hubspot/api-client'
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts/models/Filter'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Please enter a valid email'),
  siteAddress: z.string().min(3, 'Please enter a site address'),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  gclid: z.string().optional(),
  pageUri: z.string().optional(),
})

export type PlanningReportState = {
  success: boolean
  error?: string
}

export async function submitPlanningReport(
  data: Record<string, string>
): Promise<PlanningReportState> {
  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Invalid form data'
    return { success: false, error: firstError }
  }

  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN

  if (!accessToken || accessToken === 'REPLACE_ME') {
    console.warn(
      '[planning-report] HUBSPOT_ACCESS_TOKEN not configured -- skipping submission.'
    )
    return { success: true }
  }

  const hubspot = new Client({ accessToken })

  const properties: Record<string, string> = {
    email: parsed.data.email,
    message: `FREE PLANNING REPORT REQUEST\nSite address: ${parsed.data.siteAddress}`,
    service_interest: 'Planning report',
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

    console.error('HubSpot planning report submission failed:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again or call us directly.',
    }
  }
}
