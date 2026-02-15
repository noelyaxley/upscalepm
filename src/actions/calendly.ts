'use server'

import { Client } from '@hubspot/api-client'
import { FilterOperatorEnum } from '@hubspot/api-client/lib/codegen/crm/contacts/models/Filter'

export async function syncCalendlyBooking(inviteeUri: string) {
  const calendlyToken = process.env.CALENDLY_API_TOKEN
  const hubspotToken = process.env.HUBSPOT_ACCESS_TOKEN

  if (!calendlyToken || !hubspotToken) {
    console.warn('[calendly] Missing CALENDLY_API_TOKEN or HUBSPOT_ACCESS_TOKEN')
    return { success: false }
  }

  // Fetch invitee details from Calendly API
  const res = await fetch(inviteeUri, {
    headers: { Authorization: `Bearer ${calendlyToken}` },
  })

  if (!res.ok) {
    console.error('[calendly] Failed to fetch invitee:', res.status)
    return { success: false }
  }

  const { resource: invitee } = await res.json()

  const email = invitee.email
  if (!email) return { success: false }

  // Build contact properties from Calendly data
  const nameParts = (invitee.name || '').split(' ')
  const firstname = nameParts[0] || ''
  const lastname = nameParts.slice(1).join(' ') || ''

  const properties: Record<string, string> = {
    firstname,
    lastname,
    email,
  }

  // Extract answers from Calendly custom questions
  if (invitee.questions_and_answers) {
    for (const qa of invitee.questions_and_answers) {
      const q = (qa.question || '').toLowerCase()
      if (q.includes('phone')) {
        properties.phone = qa.answer || ''
      } else if (q.includes('message') || q.includes('note') || q.includes('detail')) {
        properties.message = qa.answer || ''
      } else if (q.includes('service') || q.includes('project type')) {
        properties.service_interest = qa.answer || ''
      }
    }
  }

  properties.lifecyclestage = 'lead'

  // Push to HubSpot
  const hubspot = new Client({ accessToken: hubspotToken })

  try {
    await hubspot.crm.contacts.basicApi.create({ properties })
    return { success: true }
  } catch (error: unknown) {
    // If contact exists, update instead
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
                  value: email,
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
        console.error('[calendly] HubSpot update failed:', updateError)
      }
    }

    console.error('[calendly] HubSpot create failed:', error)
    return { success: false }
  }
}
