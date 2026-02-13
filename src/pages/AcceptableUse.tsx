import { LegalPage, LegalSection } from '@/components/legal/LegalPage';

const AcceptableUse = () => {
  return (
    <LegalPage title="Acceptable Use Policy" lastUpdated="February 1, 2026">
      <p>
        This Acceptable Use Policy outlines the rules and guidelines for using NeoNotion Templates. By using our services, you agree to comply with this policy.
      </p>

      <LegalSection title="1. Permitted Use">
        <p>You may use our templates for:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal productivity and organization</li>
          <li>Business operations and team management</li>
          <li>Educational purposes</li>
          <li>Client projects (one license per client)</li>
          <li>Creating derivative works for your own use</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. Prohibited Activities">
        <p>You may NOT:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Redistribute:</strong> Share, resell, or distribute templates to others, whether for free or for profit</li>
          <li><strong>Republish:</strong> Post templates on template marketplaces or sharing sites</li>
          <li><strong>Claim Ownership:</strong> Present templates as your own original creation</li>
          <li><strong>Create Competing Products:</strong> Use our templates to create and sell similar template products</li>
          <li><strong>Remove Attribution:</strong> Remove or alter copyright notices or branding</li>
          <li><strong>Bulk Usage:</strong> Use a single license for multiple clients or organizations</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Account Conduct">
        <p>When using our services, you must NOT:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Create multiple accounts to abuse free trials or offers</li>
          <li>Share account credentials with unauthorized users</li>
          <li>Use automated systems to access our services without permission</li>
          <li>Attempt to bypass any security measures or access restrictions</li>
          <li>Interfere with or disrupt our services or servers</li>
          <li>Engage in any activity that violates applicable laws</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Content Guidelines">
        <p>
          While you can customize templates for your use, you must NOT use our services to create, store, or distribute:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Illegal content or content promoting illegal activities</li>
          <li>Hateful, discriminatory, or harassing content</li>
          <li>Content that infringes on intellectual property rights</li>
          <li>Malware, viruses, or other harmful code</li>
          <li>Spam or unsolicited promotional materials</li>
          <li>Deceptive or fraudulent content</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Fair Use">
        <p>
          We expect users to use our services fairly and reasonably. Excessive or abusive use may result in throttling, suspension, or termination of your account. Examples of excessive use include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Downloading all templates in bulk</li>
          <li>Automating downloads or template access</li>
          <li>Using templates in ways that strain our infrastructure</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Reporting Violations">
        <p>
          If you become aware of any violations of this policy, please report them to us at:
        </p>
        <p className="text-primary">greaterthan2026@gmail.com</p>
        <p>
          We investigate all reports and take appropriate action, which may include content removal and account termination.
        </p>
      </LegalSection>

      <LegalSection title="7. Consequences of Violations">
        <p>
          Violations of this policy may result in:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Warning and request to correct behavior</li>
          <li>Temporary suspension of account access</li>
          <li>Permanent termination of account</li>
          <li>Legal action in serious cases</li>
        </ul>
        <p>
          We reserve the right to take any action we deem necessary to protect our services and users.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to This Policy">
        <p>
          We may update this Acceptable Use Policy at any time. Material changes will be communicated via email or through our website.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          If you have any questions about this policy, please contact us at:
        </p>
        <p className="text-primary">greaterthan2026@gmail.com</p>
      </LegalSection>

      <p className="text-sm italic mt-8">
        This document is provided for informational purposes only and does not constitute legal advice.
      </p>
    </LegalPage>
  );
};

export default AcceptableUse;
