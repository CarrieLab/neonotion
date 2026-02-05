import { LegalPage, LegalSection } from '@/components/legal/LegalPage';

const Cookies = () => {
  return (
    <LegalPage title="Cookie Policy" lastUpdated="February 1, 2026">
      <p>
        This Cookie Policy explains how NeoNotion Templates uses cookies and similar technologies on our website. By using our website, you consent to the use of cookies as described in this policy.
      </p>

      <LegalSection title="1. What Are Cookies?">
        <p>
          Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
        </p>
      </LegalSection>

      <LegalSection title="2. Types of Cookies We Use">
        <p><strong>Essential Cookies:</strong></p>
        <p>
          These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies.
        </p>

        <p><strong>Performance Cookies:</strong></p>
        <p>
          These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and services.
        </p>

        <p><strong>Functionality Cookies:</strong></p>
        <p>
          These cookies allow the website to remember choices you make (such as your username, language, or region) and provide enhanced, personalized features.
        </p>

        <p><strong>Marketing Cookies:</strong></p>
        <p>
          These cookies are used to track visitors across websites to display relevant advertisements. They may be set by advertising partners through our website.
        </p>
      </LegalSection>

      <LegalSection title="3. Cookies We Use">
        <table className="w-full text-sm border border-border mt-4">
          <thead className="bg-secondary">
            <tr>
              <th className="px-4 py-2 text-left border-b border-border">Cookie</th>
              <th className="px-4 py-2 text-left border-b border-border">Purpose</th>
              <th className="px-4 py-2 text-left border-b border-border">Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border-b border-border">auth_token</td>
              <td className="px-4 py-2 border-b border-border">Authentication</td>
              <td className="px-4 py-2 border-b border-border">Session</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-border">_analytics</td>
              <td className="px-4 py-2 border-b border-border">Site analytics</td>
              <td className="px-4 py-2 border-b border-border">1 year</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border-b border-border">preferences</td>
              <td className="px-4 py-2 border-b border-border">User preferences</td>
              <td className="px-4 py-2 border-b border-border">1 year</td>
            </tr>
          </tbody>
        </table>
      </LegalSection>

      <LegalSection title="4. Third-Party Cookies">
        <p>
          We may use third-party services that set cookies on your device. These include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Analytics providers:</strong> To help us understand website usage</li>
          <li><strong>Payment processors:</strong> To process transactions securely</li>
          <li><strong>Authentication services:</strong> To manage user logins</li>
        </ul>
        <p>
          These third parties have their own privacy policies governing their use of cookies.
        </p>
      </LegalSection>

      <LegalSection title="5. Managing Cookies">
        <p>
          Most web browsers allow you to control cookies through their settings. You can:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>View what cookies are stored on your device</li>
          <li>Delete all or specific cookies</li>
          <li>Block all cookies or only third-party cookies</li>
          <li>Set preferences for certain websites</li>
        </ul>
        <p>
          Please note that blocking certain cookies may impact your experience on our website and some features may not function properly.
        </p>
      </LegalSection>

      <LegalSection title="6. Do Not Track">
        <p>
          Some browsers include a "Do Not Track" (DNT) feature. We currently do not respond to DNT signals. However, you can manage your cookie preferences as described above.
        </p>
      </LegalSection>

      <LegalSection title="7. Changes to This Policy">
        <p>
          We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact Us">
        <p>
          If you have any questions about our use of cookies, please contact us at:
        </p>
        <p className="text-primary">privacy@neonotion.com</p>
      </LegalSection>

      <p className="text-sm italic mt-8">
        This document is provided for informational purposes only and does not constitute legal advice.
      </p>
    </LegalPage>
  );
};

export default Cookies;
