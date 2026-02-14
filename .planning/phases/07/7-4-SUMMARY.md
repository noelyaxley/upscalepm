# Summary: Prompt 4 — DNS Cutover from WordPress to Vercel

## Status: DEFERRED

DNS cutover deferred by user. All code is production-ready. DNS changes will be performed manually when ready to launch.

## Pre-cutover checklist documented

1. Lower TTL to 60s at registrar (24-48h before)
2. Add upscalepm.com.au in Vercel project settings
3. Update A record to 76.76.21.21
4. Update www CNAME to Vercel value
5. Wait for SSL provisioning
6. Verify with curl -I https://upscalepm.com.au

## Commits

None (deferred — operational task)

## Self-Check: DEFERRED
