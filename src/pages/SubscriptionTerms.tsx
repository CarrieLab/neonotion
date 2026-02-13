import { LegalPage, LegalSection } from '@/components/legal/LegalPage';

const SubscriptionTerms = () => {
  return (
    <LegalPage title="Subscription Terms" lastUpdated="February 1, 2026">
      <p>
        These Subscription Terms govern your subscription to NeoNotion Templates Pro and should be read in conjunction with our Terms of Service.
      </p>

      <LegalSection title="1. Subscription Plans">
        <p>We offer the following subscription plans:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Pro Monthly:</strong> $9.99 per month, billed monthly</li>
          <li><strong>Pro Yearly:</strong> $99.99 per year, billed annually (save 20%)</li>
        </ul>
        <p>
          Subscription benefits include access to all Pro-eligible templates, new template releases during your subscription period, and priority customer support.
        </p>
      </LegalSection>

      <LegalSection title="2. Billing and Payment">
        <p>
          Subscriptions are billed in advance on a recurring basis according to your chosen billing cycle. By subscribing, you authorize us to charge your payment method automatically at the beginning of each billing period.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Monthly subscriptions are billed every 30 days</li>
          <li>Annual subscriptions are billed every 365 days</li>
          <li>All prices are in US Dollars</li>
          <li>Prices do not include applicable taxes</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Free Trial">
        <p>
          We may offer free trials at our discretion. If a free trial is offered:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You will not be charged during the trial period</li>
          <li>You may cancel at any time during the trial without charge</li>
          <li>Your subscription will automatically begin at the end of the trial unless cancelled</li>
          <li>Free trials are limited to one per user</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Cancellation">
        <p>
          You may cancel your subscription at any time through your account settings or by contacting us. Upon cancellation:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Your subscription will remain active until the end of your current billing period</li>
          <li>You will not be charged for future billing periods</li>
          <li>You will lose access to Pro templates after your subscription ends</li>
          <li>Templates you have already duplicated to your Notion workspace will remain accessible</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Renewals">
        <p>
          Your subscription will automatically renew at the end of each billing period unless you cancel before the renewal date. We will send you a reminder email before automatic renewal.
        </p>
      </LegalSection>

      <LegalSection title="6. Price Changes">
        <p>
          We reserve the right to change subscription prices. If we change prices:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>We will notify you at least 30 days in advance</li>
          <li>Price changes will take effect at your next renewal</li>
          <li>You may cancel before the price change takes effect</li>
          <li>Continuing your subscription after a price change constitutes acceptance</li>
        </ul>
      </LegalSection>

      <LegalSection title="7. Subscription Access">
        <p>
          Your Pro subscription provides:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access to all templates marked as "Included in Pro"</li>
          <li>Access to new Pro templates released during your subscription</li>
          <li>Priority customer support</li>
          <li>Early access to new features and templates</li>
        </ul>
        <p>
          Templates purchased separately (one-time purchases) are not affected by your subscription status.
        </p>
      </LegalSection>

      <LegalSection title="8. Account Sharing">
        <p>
          Your subscription is personal and non-transferable. You may not share your account credentials or subscription access with others. Violations may result in account termination.
        </p>
      </LegalSection>

      <LegalSection title="9. Refunds">
        <p>
          Subscription refunds are handled according to our Refund Policy. Generally:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>New subscribers may request a refund within 7 days</li>
          <li>Partial month refunds are not provided</li>
          <li>Annual subscription refunds may be prorated at our discretion</li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Suspension and Termination">
        <p>
          We may suspend or terminate your subscription if:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Payment cannot be processed</li>
          <li>You violate our Terms of Service</li>
          <li>You engage in abusive behavior toward our staff</li>
          <li>You share your account with unauthorized users</li>
        </ul>
      </LegalSection>

      <LegalSection title="11. Changes to Subscription Terms">
        <p>
          We may modify these Subscription Terms at any time. Material changes will be communicated via email. Your continued subscription after changes constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact Us">
        <p>
          If you have any questions about your subscription, please contact us at:
        </p>
        <p className="text-primary">greaterthan2026@gmail.com</p>
      </LegalSection>

      <p className="text-sm italic mt-8">
        This document is provided for informational purposes only and does not constitute legal advice.
      </p>
    </LegalPage>
  );
};

export default SubscriptionTerms;
