import { LegalPage, LegalSection } from '@/components/legal/LegalPage';

const Refunds = () => {
  return (
    <LegalPage title="Refund Policy" lastUpdated="February 1, 2026">
      <p>
        At NeoNotion Templates, we want you to be completely satisfied with your purchase. This Refund Policy outlines our procedures for refunds and returns.
      </p>

      <LegalSection title="1. 7-Day Money-Back Guarantee">
        <p>
          We offer a 7-day money-back guarantee on all template purchases. If you are not satisfied with your purchase for any reason, you may request a full refund within 7 days of the original purchase date.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligibility for Refunds">
        <p>To be eligible for a refund:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The request must be made within 7 days of purchase</li>
          <li>You must provide your order confirmation or receipt</li>
          <li>You must provide a valid reason for the refund request</li>
        </ul>
        <p>Refunds may be denied if:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>The request is made after 7 days</li>
          <li>There is evidence of abuse of the refund policy</li>
          <li>The template has been substantially used or modified</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Subscription Refunds">
        <p>
          For subscription plans, you may cancel at any time. Upon cancellation:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You will retain access until the end of your current billing period</li>
          <li>Refunds for partial months are not provided</li>
          <li>Refunds for annual subscriptions may be prorated at our discretion</li>
        </ul>
        <p>
          If you are unsatisfied with your first month of a new subscription, you may request a full refund within 7 days of signing up.
        </p>
      </LegalSection>

      <LegalSection title="4. How to Request a Refund">
        <p>To request a refund:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Email us at refunds@neonotion.com</li>
          <li>Include your order number or account email</li>
          <li>Provide a brief explanation of your reason for requesting a refund</li>
        </ol>
        <p>
          We will review your request and respond within 2-3 business days.
        </p>
      </LegalSection>

      <LegalSection title="5. Refund Processing">
        <p>
          Once your refund is approved:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Refunds will be processed to the original payment method</li>
          <li>Credit card refunds may take 5-10 business days to appear on your statement</li>
          <li>You will receive an email confirmation when the refund is processed</li>
        </ul>
      </LegalSection>

      <LegalSection title="6. Non-Refundable Items">
        <p>The following are not eligible for refunds:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Free templates (no payment was made)</li>
          <li>Purchases made more than 7 days ago</li>
          <li>Multiple refunds from the same account within a 12-month period</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Exceptions">
        <p>
          We reserve the right to make exceptions to this policy on a case-by-case basis. If you have extenuating circumstances, please contact us and we will do our best to assist you.
        </p>
      </LegalSection>

      <LegalSection title="8. Chargebacks">
        <p>
          If you dispute a charge with your bank or credit card company before contacting us, your account may be suspended. We encourage you to contact us first to resolve any issues.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          If you have any questions about this Refund Policy, please contact us at:
        </p>
        <p className="text-primary">refunds@neonotion.com</p>
      </LegalSection>

      <p className="text-sm italic mt-8">
        This document is provided for informational purposes only and does not constitute legal advice.
      </p>
    </LegalPage>
  );
};

export default Refunds;
