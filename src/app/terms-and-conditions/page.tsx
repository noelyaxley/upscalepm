import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/metadata'
import { PageHeader } from '@/components/layout/page-header'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms and Conditions',
  description:
    'Terms and conditions for using the Upscale Project Management website and services.',
  path: '/terms-and-conditions',
})

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHeader
        title="Terms and Conditions"
        breadcrumbs={[{ label: 'Terms and Conditions' }]}
      />
      <Container size="narrow" as="article" className="py-12 md:py-16">
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <p className="text-sm text-muted-foreground">
            Last updated: 05/07/2025
          </p>

          <p>
            Welcome to Upscale Project Management. These Terms and Conditions
            (&ldquo;Terms&rdquo;) govern your use of our website located at{' '}
            <a href="https://upscalepm.com.au">https://upscalepm.com.au</a>{' '}
            (the &ldquo;Site&rdquo;) and any services, content, or information
            offered through the Site (collectively, the
            &ldquo;Services&rdquo;).
          </p>

          <p>
            By accessing or using our Site and Services, you agree to be bound
            by these Terms. If you do not agree to these Terms, please do not
            use our Site or Services.
          </p>

          <h2>1. About Upscale Project Management</h2>

          <p>
            Upscale Project Management (&ldquo;we,&rdquo; &ldquo;our,&rdquo;
            &ldquo;us&rdquo;) provides strategic project management, planning,
            and advisory services primarily within the architecture,
            construction, and development sectors. Our Site offers information
            about our services, case studies, contact details, and the
            opportunity to engage with us.
          </p>

          <h2>2. Eligibility</h2>

          <p>
            You must have the legal capacity to enter into a binding agreement
            to use our Site and Services. By using the Site, you represent and
            warrant that you meet these requirements.
          </p>

          <h2>3. Use of the Website</h2>

          <p>
            You agree to use the Site only for lawful purposes and in accordance
            with these Terms. You must not:
          </p>

          <ul>
            <li>
              Use the Site in any way that breaches any applicable local,
              national, or international law
            </li>
            <li>
              Attempt to gain unauthorised access to the Site or any server,
              system, or network connected to it
            </li>
            <li>Interfere with the security or integrity of the Site</li>
            <li>
              Use the Site to transmit any unsolicited or unauthorised
              advertising or promotional material
            </li>
          </ul>

          <h2>4. Intellectual Property</h2>

          <p>
            All content on the Site, including but not limited to text,
            graphics, logos, icons, images, videos, design elements, and
            software, is the property of Upscale Project Management or its
            licensors and is protected by Australian and international
            copyright, trademark, and other intellectual property laws.
          </p>

          <p>
            You may view and print content from the Site for your own personal
            or internal business purposes, but you must not reproduce,
            distribute, or create derivative works without our express written
            permission.
          </p>

          <h2>5. Third-Party Links</h2>

          <p>
            Our Site may contain links to third-party websites or services that
            are not owned or controlled by us. We are not responsible for the
            content, policies, or practices of any third-party sites. We
            encourage you to read the terms and privacy policies of every site
            you visit.
          </p>

          <h2>6. Disclaimers</h2>

          <p>
            The information on our Site is provided for general information
            purposes only. While we make reasonable efforts to ensure accuracy,
            we do not guarantee that the content is up-to-date, complete, or
            free of errors.
          </p>

          <p>
            To the fullest extent permitted by law, we disclaim all warranties,
            express or implied, in connection with the Site and your use of it,
            including but not limited to implied warranties of merchantability,
            fitness for a particular purpose, and non-infringement.
          </p>

          <h2>7. Limitation of Liability</h2>

          <p>
            To the extent permitted by law, Upscale Project Management and its
            directors, employees, and agents will not be liable for any
            indirect, incidental, special, or consequential damages arising out
            of or in connection with your use of (or inability to use) the Site
            or Services, even if we have been advised of the possibility of such
            damages.
          </p>

          <h2>8. Privacy</h2>

          <p>
            Your use of the Site is subject to our{' '}
            <a href="/privacy-policy">Privacy Policy</a>, which explains how we
            collect, use, and protect your personal information.
          </p>

          <h2>9. Changes to These Terms</h2>

          <p>
            We may update these Terms from time to time. We will post any
            changes on this page, and the revised version will take effect
            immediately upon posting. Your continued use of the Site following
            any updates constitutes your acceptance of those changes.
          </p>

          <h2>10. Termination</h2>

          <p>
            We reserve the right to suspend or terminate your access to the Site
            at any time, without notice or liability, for any reason including
            breach of these Terms.
          </p>

          <h2>11. Governing Law</h2>

          <p>
            These Terms are governed by the laws of New South Wales, Australia.
            Any disputes arising from or relating to these Terms or the use of
            the Site will be subject to the exclusive jurisdiction of the courts
            of New South Wales.
          </p>

          <h2>12. Contact Us</h2>

          <p>
            If you have any questions about these Terms, please contact:
          </p>

          <p>
            Upscale Project Management
            <br />
            Website:{' '}
            <a href="https://upscalepm.com.au">https://upscalepm.com.au</a>
            <br />
            Email:{' '}
            <a href="mailto:hello@upscalepm.com.au">
              hello@upscalepm.com.au
            </a>
          </p>
        </div>
      </Container>
    </>
  )
}
