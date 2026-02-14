import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Privacy policy for Upscale Project Management. How we collect, use, and protect your personal information.',
  path: '/privacy-policy',
})

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
      />
      <Container size="narrow" as="article" className="py-12 md:py-16">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <p className="text-sm text-muted-foreground">
            Last updated: 05/07/2025
          </p>

          <p>
            Upscale Project Management (&ldquo;we,&rdquo; &ldquo;us,&rdquo;
            &ldquo;our&rdquo;) is committed to protecting your privacy and
            handling your personal information in a responsible manner. This
            Privacy Policy outlines how we collect, use, store, and disclose
            your personal information when you interact with us, including
            through our website{' '}
            <a href="https://upscalepm.com.au">https://upscalepm.com.au</a>{' '}
            (the &ldquo;Site&rdquo;).
          </p>

          <p>
            By using our Site or engaging with our services, you consent to the
            terms of this Privacy Policy.
          </p>

          <h2>1. What Information We Collect</h2>

          <p>
            We collect personal information that is reasonably necessary for our
            business activities. This may include:
          </p>

          <ul>
            <li>
              <strong>Contact Information:</strong> Your name, email address,
              phone number, company name, and job title.
            </li>
            <li>
              <strong>Project Details:</strong> Information you provide about
              your project, scope, timeline, or goals.
            </li>
            <li>
              <strong>Website Usage Data:</strong> We collect anonymous data such
              as your IP address, browser type, device information, pages
              visited, and time spent on the site (via tools like Google
              Analytics).
            </li>
            <li>
              <strong>Correspondence:</strong> Records of your communications
              with us, including email interactions or enquiry forms.
            </li>
          </ul>

          <p>
            We do not knowingly collect personal data from children under the
            age of 16.
          </p>

          <h2>2. How We Collect Your Information</h2>

          <p>We collect information when you:</p>

          <ul>
            <li>Fill out a contact or enquiry form on our website</li>
            <li>Subscribe to our updates or request marketing materials</li>
            <li>Send us an email or phone enquiry</li>
            <li>Engage our project management or consulting services</li>
            <li>Use our website, which may use cookies or tracking pixels</li>
          </ul>

          <h2>3. Why We Collect Your Information</h2>

          <p>We collect and use your personal information to:</p>

          <ul>
            <li>
              Respond to your enquiries and provide project-related services
            </li>
            <li>
              Send updates, proposals, and communications related to your
              project
            </li>
            <li>
              Improve the usability, content, and security of our website
            </li>
            <li>
              Market our services, with your consent (you can opt out anytime)
            </li>
            <li>Comply with legal obligations or respond to lawful requests</li>
          </ul>

          <h2>4. Disclosure of Your Information</h2>

          <p>
            We do not sell your personal data. However, we may share your
            information with:
          </p>

          <ul>
            <li>
              Trusted service providers (e.g. cloud hosting, email platforms,
              analytics tools) who support our operations under strict
              confidentiality
            </li>
            <li>Legal or regulatory bodies if required by law</li>
            <li>
              Contractors or consultants directly involved in your project
              (where necessary and with confidentiality arrangements)
            </li>
          </ul>

          <h2>5. How We Store and Protect Your Information</h2>

          <p>
            We store your personal information securely using cloud-based
            systems with appropriate technical and organisational safeguards in
            place. These may include:
          </p>

          <ul>
            <li>Password-protected accounts</li>
            <li>Encrypted storage and secure servers</li>
            <li>Regular software updates and access controls</li>
          </ul>

          <p>
            While we take reasonable steps to protect your information, no
            method of transmission over the Internet or method of electronic
            storage is 100% secure.
          </p>

          <h2>6. Cookies and Tracking Technologies</h2>

          <p>
            Our website may use cookies and other technologies to enhance user
            experience and analyse traffic. Cookies are small files stored on
            your device that allow our website to remember your preferences. You
            can manage your cookie preferences through your browser settings.
          </p>

          <p>
            We may use tools like Google Analytics, which may collect anonymous
            usage data and demographic insights.
          </p>

          <h2>7. Accessing and Correcting Your Information</h2>

          <p>
            You may request access to any personal information we hold about you
            and ask us to correct it if it is inaccurate or out-of-date. To do
            so, please contact us using the details below.
          </p>

          <h2>8. Your Rights and Choices</h2>

          <p>You have the right to:</p>

          <ul>
            <li>Access and correct your personal data</li>
            <li>
              Withdraw your consent to receive marketing communications
            </li>
            <li>
              Request that we delete your personal information (subject to legal
              and contractual obligations)
            </li>
          </ul>

          <p>
            To exercise these rights, please contact us at:{' '}
            <a href="mailto:privacy@upscalepm.com.au">
              privacy@upscalepm.com.au
            </a>
          </p>

          <h2>9. Third-Party Websites</h2>

          <p>
            Our website may contain links to other websites. We are not
            responsible for the privacy practices of these third parties. We
            encourage you to read their privacy policies before providing
            personal information.
          </p>

          <h2>10. International Transfers</h2>

          <p>
            We may store or process your data on servers located outside of
            Australia (e.g., cloud providers). Where we do so, we ensure that
            appropriate safeguards are in place to protect your information in
            line with Australian privacy requirements.
          </p>

          <h2>11. Changes to This Policy</h2>

          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with the revised date. We recommend
            reviewing this policy periodically to stay informed about how we
            protect your information.
          </p>

          <h2>12. Contact Us</h2>

          <p>
            If you have any questions, complaints, or requests relating to your
            privacy or this policy, please contact us:
          </p>

          <p>
            Upscale Project Management
            <br />
            Website:{' '}
            <a href="https://upscalepm.com.au">https://upscalepm.com.au</a>
            <br />
            Email:{' '}
            <a href="mailto:privacy@upscalepm.com.au">
              privacy@upscalepm.com.au
            </a>
          </p>
        </div>
      </Container>
    </>
  )
}
