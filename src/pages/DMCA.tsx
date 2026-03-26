import { LegalPage, LegalSection } from '@/components/legal/LegalPage';

const DMCA = () => {
  return (
    <LegalPage title="DMCA / Copyright Policy" lastUpdated="February 1, 2026">
      <p>
        NeoNotion Templates respects the intellectual property rights of others and expects our users to do the same. This policy outlines our procedures for responding to claims of copyright infringement in accordance with the Digital Millennium Copyright Act (DMCA).
      </p>

      <LegalSection title="1. Reporting Copyright Infringement">
        <p>
          If you believe that content on our website infringes your copyright, please submit a DMCA takedown notice containing the following information:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>A physical or electronic signature of the copyright owner or authorized representative</li>
          <li>Identification of the copyrighted work claimed to be infringed</li>
          <li>Identification of the material that is claimed to be infringing, including its location on our website</li>
          <li>Your contact information (address, phone number, email)</li>
          <li>A statement that you have a good faith belief that use of the material is not authorized by the copyright owner, its agent, or the law</li>
          <li>A statement, under penalty of perjury, that the information in the notice is accurate and that you are authorized to act on behalf of the copyright owner</li>
        </ol>
      </LegalSection>

      <LegalSection title="2. How to Submit a Notice">
        <p>
          Send your DMCA notice to our designated Copyright Agent:
        </p>
        <div className="bg-secondary p-4 rounded-lg mt-4">
          <p><strong>SELLVERGE LLC</strong></p>
          <p>Attn: Copyright Agent</p>
        </div>
        <p className="mt-4">
          Please note that under 17 U.S.C. § 512(f), you may be liable for any damages, including costs and attorneys' fees, if you knowingly misrepresent that material is infringing.
        </p>
      </LegalSection>

      <LegalSection title="3. Counter-Notification">
        <p>
          If you believe your content was removed or disabled by mistake or misidentification, you may file a counter-notification containing:
        </p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Your physical or electronic signature</li>
          <li>Identification of the material that was removed and its original location</li>
          <li>A statement under penalty of perjury that you have a good faith belief the material was removed or disabled as a result of mistake or misidentification</li>
          <li>Your name, address, and phone number</li>
          <li>A statement that you consent to the jurisdiction of the federal district court for your judicial district</li>
          <li>A statement that you will accept service of process from the party who filed the original DMCA notice</li>
        </ol>
      </LegalSection>

      <LegalSection title="4. Our Response">
        <p>
          Upon receiving a valid DMCA notice, we will:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Promptly remove or disable access to the allegedly infringing material</li>
          <li>Notify the user who posted the material of the takedown</li>
          <li>Provide the user with a copy of the notice and counter-notification procedures</li>
        </ul>
        <p>
          Upon receiving a valid counter-notification, we will:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Forward the counter-notification to the original complainant</li>
          <li>Wait 10-14 business days for the complainant to file a court action</li>
          <li>Restore the material if no court action is filed within the waiting period</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Repeat Infringers">
        <p>
          We maintain a policy of terminating, in appropriate circumstances, the accounts of users who are repeat infringers. Factors we consider include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Number of valid DMCA notices received</li>
          <li>Whether the user has filed valid counter-notifications</li>
          <li>The nature and severity of the infringements</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Protecting Your Work">
        <p>
          If you are a content creator concerned about protecting your work, we recommend:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Registering your copyright with the U.S. Copyright Office</li>
          <li>Including clear copyright notices on your work</li>
          <li>Keeping records of when you created your work</li>
          <li>Using watermarks or other protective measures when appropriate</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. No Legal Advice">
        <p>
          This policy is provided for informational purposes only. We are not providing legal advice, and this policy does not create an attorney-client relationship. If you have questions about your rights or obligations under copyright law, please consult with a qualified attorney.
        </p>
      </LegalSection>

      <LegalSection title="8. Contact Us">
        <p>
          For DMCA matters, contact our Copyright Agent.
        </p>
        <p>
          For general legal inquiries, contact us.
        </p>
      </LegalSection>

      <p className="text-sm italic mt-8">
        This document is provided for informational purposes only and does not constitute legal advice. We recommend consulting with a qualified attorney for legal matters.
      </p>
    </LegalPage>
  );
};

export default DMCA;
