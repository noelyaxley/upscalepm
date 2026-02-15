import Script from 'next/script'

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

/**
 * GTM head script — loads synchronously in <head> so Tag Assistant
 * and Googlebot can detect it on first paint.
 */
export function GTMScript() {
  if (!gtmId || gtmId === 'REPLACE_ME') {
    return null
  }

  return (
    <Script
      id="gtm-script"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
      }}
    />
  )
}

/**
 * GTM noscript fallback — place immediately after opening <body>.
 */
export function GTMNoScript() {
  if (!gtmId || gtmId === 'REPLACE_ME') {
    return null
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
