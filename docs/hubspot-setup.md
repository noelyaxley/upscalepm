# HubSpot Setup Guide

Complete configuration guide for connecting the UpScalePM website to HubSpot CRM.

## Prerequisites

### 1. Create HubSpot Account

Sign up at [app.hubspot.com](https://app.hubspot.com). The free plan is sufficient for forms, basic workflows, and CRM.

### 2. Create a Private App

Required for authenticated form submission from the Server Action.

1. Navigate to: **Settings > Integrations > Private Apps > Create private app**
2. App name: `UpScalePM Website`
3. Scopes: select `crm.objects.contacts.write` and `forms`
4. Copy the access token → set as `HUBSPOT_ACCESS_TOKEN` in `.env.local`

### 3. Create Custom Contact Property: `service_interest`

1. Navigate to: **Settings > Data Management > Properties > Contact properties**
2. Click **Create property**
3. Group: "Contact information"
4. Label: "Service Interest"
5. Internal name: `service_interest` (verify it matches exactly)
6. Field type: Dropdown select
7. Options:
   - Feasibility & Advisory
   - Design Management
   - DA Approval
   - Tender Assessment
   - Construction Superintendent
   - Not sure yet

### 4. Create Form in HubSpot

1. Navigate to: **Marketing > Forms > Create form > Embedded form**
2. Form name: `Website Contact Form`
3. Add fields:
   - First name (`firstname`)
   - Email (`email`)
   - Phone number (`phone`)
   - Service Interest (`service_interest`)
   - Message (`message`) — may need to be created as a custom property first
4. After saving, copy the **Form GUID** from the URL or embed code
5. Set as `HUBSPOT_FORM_GUID` in `.env.local`

### 5. Find Portal ID

1. Navigate to: **Settings (gear icon) > Account Management**
2. The portal ID (Hub ID) is shown at the top
3. Set as both `HUBSPOT_PORTAL_ID` and `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` in `.env.local`

## Email Automation Workflow

### 6. Create Follow-Up Email

1. Navigate to: **Marketing > Email > Create email > Regular email**
2. Subject: "Thank you for contacting UpScale Project Management"
3. From: info@upscalepm.com.au (or configured sending domain)
4. Content:
   - Thank the contact for their enquiry
   - Confirm receipt of their message
   - Set expectations: "We'll review your enquiry and respond within 1 business day"
   - Include founder's name and signature
5. Save as template

### 7. Create Workflow

1. Navigate to: **Automation > Workflows > Create workflow > Contact-based**
2. Enrollment trigger: **Contact has submitted form** = "Website Contact Form"
3. Actions:
   - **Action 1:** Send email (the thank-you email created above)
   - **Action 2 (optional):** Send internal notification email to info@upscalepm.com.au
   - **Action 3 (optional):** Create task ("Follow up with [contact name]" assigned to team member)
4. Turn workflow **ON**

## Environment Variables

Set all values in `.env.local`:

```
HUBSPOT_PORTAL_ID=<your-portal-id>
HUBSPOT_FORM_GUID=<your-form-guid>
HUBSPOT_ACCESS_TOKEN=<your-private-app-token>
NEXT_PUBLIC_HUBSPOT_PORTAL_ID=<your-portal-id>
NEXT_PUBLIC_CALENDLY_URL=<your-calendly-booking-url>
```

`HUBSPOT_PORTAL_ID` and `HUBSPOT_ACCESS_TOKEN` are server-side only (not exposed to the browser).
`NEXT_PUBLIC_HUBSPOT_PORTAL_ID` and `NEXT_PUBLIC_CALENDLY_URL` are public (visible in client-side JavaScript).

## Testing the Integration

1. Set real values in `.env.local`
2. Run `npm run dev`
3. Navigate to `/contact`
4. Submit the form with test data
5. Check HubSpot CRM: **Contacts > search for test email**
6. Verify:
   - Contact exists with all fields populated
   - Form submission recorded on contact timeline
   - `service_interest` property shows the selected project type
7. Verify automated email:
   - Check test email inbox for the thank-you email
   - Check internal notification was sent
8. Verify tracking:
   - Open browser DevTools > Network tab
   - Navigate between pages
   - Confirm HubSpot tracking script loads (`hs-scripts.com`)
   - Confirm `_hsq` calls fire on route changes
9. Verify UTM attribution:
   - Visit `/contact?utm_source=test&utm_medium=cpc&utm_campaign=test`
   - Submit the form
   - Check the HubSpot contact record for UTM data
10. Verify Calendly:
    - Scroll to "Prefer to Book Directly?" section
    - Confirm the Calendly widget loads
    - Check service page CTAs show "Book a Call" button
