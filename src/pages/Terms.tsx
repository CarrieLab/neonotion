import { LegalPage, LegalSection } from '@/components/legal/LegalPage';

const Terms = () => {
  return (
    <LegalPage title="Terms of Service" lastUpdated="February 1, 2026">
      <p>
        Welcome to NeoNotion Templates. These Terms of Service ("Terms") govern your access to and use of our website, products, and services. By accessing or using our services, you agree to be bound by these Terms.
      </p>

      <LegalSection title="1. Acceptance of Terms">
        <p>
          By creating an account, making a purchase, or otherwise using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, please do not use our services.
        </p>
        <p>
          We reserve the right to modify these Terms at any time. We will notify users of material changes via email or through our website. Your continued use of our services after such modifications constitutes acceptance of the updated Terms.
        </p>
      </LegalSection>

      <LegalSection title="2. Description of Services">
        <p>
          NeoNotion Templates provides digital Notion templates that can be duplicated to users' Notion workspaces. Our services include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Free templates available without purchase</li>
          <li>Premium templates available for one-time purchase</li>
          <li>Subscription plans providing access to curated template collections</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Account Registration">
        <p>
          To access certain features, you must create an account. You agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate, current, and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Promptly update your account information if it changes</li>
          <li>Accept responsibility for all activities under your account</li>
        </ul>
        <p>
          You must be at least 18 years old or have parental consent to create an account.
        </p>
      </LegalSection>

      <LegalSection title="4. Purchases and Payments">
        <p>
          All purchases are processed through our secure payment provider. By making a purchase, you agree that:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You are authorized to use the payment method provided</li>
          <li>All payment information is accurate and complete</li>
          <li>You will pay all charges at the prices in effect when incurred</li>
          <li>Prices are in US Dollars unless otherwise specified</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. License and Permitted Use">
        <p>
          Upon purchase or subscription, we grant you a non-exclusive, non-transferable, personal license to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Download and use templates for personal or commercial purposes</li>
          <li>Modify templates to suit your needs</li>
          <li>Use templates in client work (for one client per license)</li>
        </ul>
        <p>
          You may NOT:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Redistribute, resell, or share templates with others</li>
          <li>Claim templates as your own original work</li>
          <li>Use templates to create competing template products</li>
          <li>Remove or alter any branding or attribution</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Intellectual Property">
        <p>
          All templates, designs, code, content, and other materials are owned by NeoNotion Templates or our licensors. The purchase of a template grants you a license to use it, not ownership of the intellectual property.
        </p>
      </LegalSection>

      <LegalSection title="7. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, NeoNotion Templates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities, arising from your use of our services.
        </p>
        <p>
          Our total liability for any claims arising from these Terms or your use of our services shall not exceed the amount you paid us in the twelve (12) months preceding the claim.
        </p>
      </LegalSection>

      <LegalSection title="8. Disclaimer of Warranties">
        <p>
          Our services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or meet your specific requirements.
        </p>
      </LegalSection>

      <LegalSection title="9. Termination">
        <p>
          We may terminate or suspend your account at any time for violation of these Terms or for any other reason at our sole discretion. Upon termination, your right to use our services will immediately cease.
        </p>
      </LegalSection>

      <LegalSection title="10. Governing Law">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law provisions. Any disputes shall be resolved in the courts of Delaware.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact Us">
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="text-primary">legal@neonotion.com</p>
      </LegalSection>

      <p className="text-sm italic mt-8">
        This document is provided for informational purposes only and does not constitute legal advice. We recommend consulting with a qualified attorney for legal matters.
      </p>
    </LegalPage>
  );
};

export default Terms;
