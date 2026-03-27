'use server'

import { Client } from '@hubspot/api-client'
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts/models/Filter'
import { headers } from 'next/headers'
import { z } from 'zod'
import { rateLimit } from '@/lib/rate-limit'

const FORM_RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 10 }

const schema = z.object({
  firstName: z.string().min(1).max(100),
  email: z.string().email().max(254),
  resourceSlug: z.string().min(1).max(200),
  resourceTitle: z.string().min(1).max(500),
  utmSource: z.string().max(500).optional(),
  utmMedium: z.string().max(500).optional(),
  utmCampaign: z.string().max(500).optional(),
  gclid: z.string().max(500).optional(),
})

export async function submitResourceDownload(
  data: z.infer<typeof schema>
): Promise<{ success: boolean; error?: string }> {
  const headersList = await headers()
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    headersList.get('x-real-ip') ??
    'unknown'
  const rl = rateLimit(`resource:${ip}`, FORM_RATE_LIMIT)
  if (!rl.success) {
    return { success: false, error: 'Too many requests. Please try again later.' }
  }

  const parsed = schema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' }
  }

  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN
  if (!accessToken || accessToken === 'REPLACE_ME') {
    console.warn('[resource-download] HUBSPOT_ACCESS_TOKEN not configured')
    return { success: true }
  }

  const hubspot = new Client({ accessToken })

  const properties: Record<string, string> = {
    firstname: parsed.data.firstName,
    email: parsed.data.email,
    message: `RESOURCE DOWNLOAD: ${parsed.data.resourceTitle} (${parsed.data.resourceSlug})`,
    service_interest: 'Resource Download',
  }

  if (parsed.data.utmSource) properties.utm_source = parsed.data.utmSource
  if (parsed.data.utmMedium) properties.utm_medium = parsed.data.utmMedium
  if (parsed.data.utmCampaign) properties.utm_campaign = parsed.data.utmCampaign
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
    console.error('HubSpot resource download submission failed:', error)
    return { success: false, error: 'Something went wrong.' }
  }
}
