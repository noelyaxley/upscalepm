'use server'

import { Client } from '@hubspot/api-client'
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts/models/Filter'
import { headers } from 'next/headers'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'

// 5 submissions per IP per 10-minute window
const FORM_RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 5 }

const schema = z.object({
  name: z.string().min(1, 'Please enter your name').max(200),
  phone: z.string().max(30).optional(),
  email: z.string().email('Please enter a valid email').max(254),
  siteAddress: z.string().min(1, 'Please enter the site address').max(500),
  utmSource: z.string().max(500).optional(),
  utmMedium: z.string().max(500).optional(),
  utmCampaign: z.string().max(500).optional(),
  utmTerm: z.string().max(500).optional(),
  utmContent: z.string().max(500).optional(),
  gclid: z.string().max(500).optional(),
  pageUri: z.string().max(2000).optional(),
})

export type PlanningReportState = {
  success: boolean
  error?: string
}

export async function submitPlanningReport(
  data: Record<string, string>
): Promise<PlanningReportState> {
  // Rate limit by IP
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'unknown'
  const rl = rateLimit(`planning-report:${ip}`, FORM_RATE_LIMIT)
  if (!rl.success) {
    return { success: false, error: 'Too many submissions. Please try again later.' }
  }

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

  const nameParts = parsed.data.name.trim().split(/\s+/)
  const firstName = nameParts[0] ?? ''
  const lastName = nameParts.slice(1).join(' ') || '-'

  const properties: Record<string, string> = {
    firstname: firstName,
    lastname: lastName,
    email: parsed.data.email,
    phone: parsed.data.phone ?? '',
    message: `FREE PLANNING REPORT REQUEST${parsed.data.siteAddress ? `\nSite address: ${parsed.data.siteAddress}` : ''}`,
    service_interest: 'Feasibility & Advisory',
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
