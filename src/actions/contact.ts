'use server'

import { cookies, headers } from 'next/headers'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
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

  const cookieStore = await cookies()
  const hutk = cookieStore.get('hubspotutk')?.value

  const headerStore = await headers()
  const ipAddress = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim()

  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formGuid = process.env.HUBSPOT_FORM_GUID
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN

  if (
    !portalId ||
    !formGuid ||
    !accessToken ||
    portalId === 'REPLACE_ME' ||
    formGuid === 'REPLACE_ME' ||
    accessToken === 'REPLACE_ME'
  ) {
    console.warn(
      '[contact] HubSpot env vars not configured -- skipping submission.'
    )
    return { success: true }
  }

  const fields = [
    { objectTypeId: '0-1', name: 'firstname', value: parsed.data.name },
    { objectTypeId: '0-1', name: 'email', value: parsed.data.email },
    { objectTypeId: '0-1', name: 'phone', value: parsed.data.phone ?? '' },
    {
      objectTypeId: '0-1',
      name: 'service_interest',
      value: parsed.data.projectType ?? '',
    },
    { objectTypeId: '0-1', name: 'message', value: parsed.data.message },
  ]

  const utmFields: Array<{
    objectTypeId: string
    name: string
    value: string
  }> = []
  if (parsed.data.utmSource)
    utmFields.push({
      objectTypeId: '0-1',
      name: 'utm_source',
      value: parsed.data.utmSource,
    })
  if (parsed.data.utmMedium)
    utmFields.push({
      objectTypeId: '0-1',
      name: 'utm_medium',
      value: parsed.data.utmMedium,
    })
  if (parsed.data.utmCampaign)
    utmFields.push({
      objectTypeId: '0-1',
      name: 'utm_campaign',
      value: parsed.data.utmCampaign,
    })
  if (parsed.data.utmTerm)
    utmFields.push({
      objectTypeId: '0-1',
      name: 'utm_term',
      value: parsed.data.utmTerm,
    })
  if (parsed.data.utmContent)
    utmFields.push({
      objectTypeId: '0-1',
      name: 'utm_content',
      value: parsed.data.utmContent,
    })

  const body = {
    submittedAt: Date.now().toString(),
    fields: [...fields, ...utmFields],
    context: {
      hutk: hutk ?? undefined,
      pageUri: parsed.data.pageUri ?? '',
      pageName: parsed.data.pageName ?? '',
      ...(ipAddress ? { ipAddress } : {}),
    },
  }

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formGuid}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      console.error(
        'HubSpot submission failed:',
        response.status,
        await response.text()
      )
      return {
        success: false,
        error:
          'Something went wrong. Please try again or call us directly.',
      }
    }

    return { success: true }
  } catch (error) {
    console.error('HubSpot submission error:', error)
    return {
      success: false,
      error: 'Something went wrong. Please try again or call us directly.',
    }
  }
}
