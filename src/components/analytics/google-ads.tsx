import Script from 'next/script'

const AW_ID = 'AW-10851484907'

/**
 * Google Ads global site tag (gtag.js).
 * Loads on every page. Conversion events are fired separately on thank-you pages.
 */
export function GoogleAdsTag() {
  return (
    <>
      <Script
        id="gtag-js"
        src={`https://www.googletagmanager.com/gtag/js?id=${AW_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${AW_ID}');
          `,
        }}
      />
    </>
  )
}
