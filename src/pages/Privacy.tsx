import { LegalPage, LegalSection } from '@/components/legal/LegalPage';

const Privacy = () => {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="February 1, 2026">
      <p>
        At NeoNotion Templates, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
      </p>

      <LegalSection title="1. Information We Collect">
        <p><strong>Personal Information:</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Name and email address when you create an account</li>
          <li>Payment information when you make a purchase (processed by our payment provider)</li>
          <li>Communications you send to us</li>
        </ul>
        <p><strong>Automatically Collected Information:</strong></p>
        <ul className="list-disc pl-6 space-y-2">
          <li>IP address and device information</li>
          <li>Browser type and operating system</li>
          <li>Pages visited and time spent on our website</li>
          <li>Referring website addresses</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <p>We use collected information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide, maintain, and improve our services</li>
          <li>Process transactions and send related information</li>
          <li>Send promotional communications (with your consent)</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Monitor and analyze trends, usage, and activities</li>
          <li>Detect, investigate, and prevent fraudulent transactions</li>
          <li>Comply with legal obligations</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Information Sharing">
        <p>We do not sell your personal information. We may share your information with:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Service Providers:</strong> Third parties that perform services on our behalf (payment processing, email delivery, analytics)</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Data Security">
        <p>
          We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Retention">
        <p>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Object to or restrict processing of your information</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>
        <p>To exercise these rights, please contact us at privacy@neonotion.com.</p>
      </LegalSection>

      <LegalSection title="7. California Privacy Rights">
        <p>
          California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected and how it is used, the right to delete personal information, and the right to opt-out of the sale of personal information.
        </p>
      </LegalSection>

      <LegalSection title="8. International Data Transfers">
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place for such transfers.
        </p>
      </LegalSection>

      <LegalSection title="9. Children's Privacy">
        <p>
          Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn we have collected such information, we will delete it.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="text-primary">privacy@neonotion.com</p>
      </LegalSection>

      <p className="text-sm italic mt-8">
        This document is provided for informational purposes only and does not constitute legal advice.
      </p>
    </LegalPage>
  );
};

export default Privacy;
