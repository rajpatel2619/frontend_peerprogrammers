import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

/**
 * PeerProgrammers — Legal Pages
 * Framework: React + Tailwind CSS
 * Routes:
 *  - /privacy-policy
 *  - /terms
 *  - /refund-policy
 *
 * How to use:
 * 1) Drop this file anywhere in your React app (e.g., src/LegalPages.jsx).
 * 2) Ensure react-router-dom v6+ is installed and Router is mounted at root.
 * 3) Import <LegalPagesRoutes /> into your main router or App and render it.
 * 4) Update business details (email, address, company name) below.
 */

const SITE_NAME = "PeerProgrammers";
const SITE_URL = "https://peerprogrammers.in";
const SUPPORT_EMAIL = "peerprogrammers@gmail.com"; // change if needed
const COMPANY_ADDRESS = "Incubation center, Mathematics dept. IIT Patna, India"; // update
const LAST_UPDATED = "September 2, 2025";

const PageShell = ({ title, children }) => (
  <div className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 transition-colors duration-300">
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">{title}</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        {children}
      </div>
      <p className="mt-10 text-sm text-neutral-500 dark:text-neutral-400">
        Last updated: {LAST_UPDATED}
      </p>
    </main>
  </div>
);

export const PrivacyPolicy = () => (
  <PageShell title="Privacy Policy">
    <p>
      This Privacy Policy describes how {SITE_NAME} ("we", "us", or "our")
      collects, uses, discloses, and safeguards your information when you visit{" "}
      <a href={SITE_URL}>{SITE_URL}</a> and use our products or services
      (collectively, the "Services").
    </p>

    <h2>1. Information We Collect</h2>
    <ul>
      <li>
        <strong>Information you provide:</strong> name, email, contact number,
        billing details, profile data, support messages, and any content you
        submit.
      </li>
      <li>
        <strong>Automatic data:</strong> device information, IP address, browser
        type, referral URLs, usage data, approximate location, session
        analytics, cookies, and similar technologies.
      </li>
      <li>
        <strong>Payment data:</strong> We use third-party payment processors to
        handle payments. We do not store full card details on our servers.
      </li>
    </ul>

    <h2>2. How We Use Your Information</h2>
    <ul>
      <li>Provide, operate, and maintain the Services.</li>
      <li>Process transactions, subscriptions, and orders.</li>
      <li>Communicate with you about updates, security alerts, and support.</li>
      <li>
        Personalize content, measure performance, and improve our Services.
      </li>
      <li>
        Comply with legal obligations, prevent fraud, and enforce our Terms.
      </li>
    </ul>

    <h2>3. Cookies & Tracking</h2>
    <p>
      We use cookies and similar technologies for authentication, preferences,
      analytics, and performance. You can control cookies through your browser
      settings; however, disabling cookies may limit functionality.
    </p>

    <h2>4. Sharing of Information</h2>
    <p>
      We may share information with service providers and vendors who assist
      with hosting, analytics, payments, customer support, and communications,
      subject to appropriate safeguards. We may disclose information to comply
      with law, protect rights and safety, or in connection with a merger,
      acquisition, or sale of assets.
    </p>

    <h2>5. Data Security</h2>
    <p>
      We implement reasonable technical and organizational measures to protect
      your information. No method of transmission or storage is 100% secure; we
      cannot guarantee absolute security.
    </p>

    <h2>6. Data Retention</h2>
    <p>
      We retain personal data only as long as necessary for the purposes
      described in this Policy, unless a longer retention period is required by
      law.
    </p>

    <h2>7. Your Rights & Choices</h2>
    <ul>
      <li>Access, update, or delete certain personal information.</li>
      <li>
        Opt-out of marketing communications via the unsubscribe link or by
        contacting us.
      </li>
      <li>
        Manage cookie preferences through your browser or device settings.
      </li>
    </ul>

    <h2>8. Children’s Privacy</h2>
    <p>
      Our Services are not directed to children under 13 (or the applicable age
      of consent in your region). We do not knowingly collect personal
      information from children.
    </p>

    <h2>9. International Transfers</h2>
    <p>
      Your information may be processed outside your country, including in
      jurisdictions that may not offer the same level of data protection. We
      take steps to ensure appropriate safeguards where required.
    </p>

    <h2>10. Contact Us</h2>
    <p>
      For questions or requests regarding this Privacy Policy, contact us at{" "}
      <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or write to{" "}
      {COMPANY_ADDRESS}.
    </p>
  </PageShell>
);

export const TermsAndConditions = () => (
  <PageShell title="Terms & Conditions">
    <p>
      These Terms & Conditions ("Terms") govern your access to and use of{" "}
      {SITE_NAME}'s Services at <a href={SITE_URL}>{SITE_URL}</a>. By accessing
      or using the Services, you agree to be bound by these Terms.
    </p>

    <h2>1. Accounts & Eligibility</h2>
    <ul>
      <li>
        You must be at least 18 years old (or the age of majority in your
        jurisdiction).
      </li>
      <li>
        You are responsible for maintaining the confidentiality of your account
        and credentials.
      </li>
      <li>You agree to provide accurate, current, and complete information.</li>
    </ul>

    <h2>2. Use of the Services</h2>
    <ul>
      <li>
        Do not misuse the Services or interfere with their normal operation.
      </li>
      <li>
        Do not attempt to access data you do not have permission to access.
      </li>
      <li>Comply with all applicable laws and regulations.</li>
    </ul>

    <h2>3. Purchases, Subscriptions & Billing</h2>
    <ul>
      <li>
        Prices, features, and availability are subject to change with reasonable
        notice.
      </li>
      <li>
        Taxes may apply based on your billing location and applicable laws.
      </li>
      <li>
        By placing an order or subscribing, you authorize us or our payment
        partners to charge your chosen method.
      </li>
    </ul>

    <h2>4. Intellectual Property</h2>
    <p>
      The Services, including content, logos, trademarks, code, and design, are
      owned by {SITE_NAME} or our licensors and are protected by applicable
      intellectual property laws. You receive a limited, non-exclusive,
      revocable license to access and use the Services for lawful purposes.
    </p>

    <h2>5. User Content</h2>
    <p>
      You retain ownership of content you submit. By submitting content, you
      grant us a worldwide, non-exclusive, royalty-free license to use,
      reproduce, modify, adapt, publish, and display such content solely for
      operating and improving the Services. You are responsible for the legality
      and appropriateness of your content.
    </p>

    <h2>6. Third-Party Links & Services</h2>
    <p>
      The Services may contain links to third-party websites or services. We are
      not responsible for their content, policies, or practices. Accessing
      third-party services is at your own risk.
    </p>

    <h2>7. Warranty Disclaimer</h2>
    <p>
      The Services are provided on an "as is" and "as available" basis without
      warranties of any kind, whether express or implied, including
      merchantability, fitness for a particular purpose, and non-infringement.
    </p>

    <h2>8. Limitation of Liability</h2>
    <p>
      To the maximum extent permitted by law, {SITE_NAME} will not be liable for
      any indirect, incidental, special, consequential, or punitive damages, or
      any loss of profits or revenues, whether incurred directly or indirectly,
      or any loss of data, use, goodwill, or other intangible losses, resulting
      from your use of the Services.
    </p>

    <h2>9. Indemnification</h2>
    <p>
      You agree to indemnify and hold harmless {SITE_NAME}, its affiliates,
      officers, employees, and agents from any claims, disputes, liabilities,
      damages, losses, and costs arising out of or in any way connected with
      your use of the Services or violation of these Terms.
    </p>

    <h2>10. Termination</h2>
    <p>
      We may suspend or terminate your access to the Services at any time, with
      or without notice, for conduct that we believe violates these Terms or is
      otherwise harmful to other users, us, or third parties.
    </p>

    <h2>11. Governing Law & Dispute Resolution</h2>
    <p>
      These Terms are governed by the laws of India, without regard to conflict
      of law principles. Subject to any mandatory arbitration/conciliation
      provisions under applicable law, the courts at your city/state (to update)
      shall have exclusive jurisdiction.
    </p>

    <h2>12. Changes to Terms</h2>
    <p>
      We may modify these Terms from time to time. Material changes will be
      notified by updating the date above and/or through reasonable means.
      Continued use of the Services after changes constitutes acceptance.
    </p>

    <h2>13. Contact</h2>
    <p>
      If you have questions about these Terms, contact us at{" "}
      <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or write to{" "}
      {COMPANY_ADDRESS}.
    </p>
  </PageShell>
);

export const RefundPolicy = () => (
  <PageShell title="Refund & Cancellation Policy">
    <p>
      This Refund & Cancellation Policy explains how refunds, cancellations, and
      adjustments are handled for purchases made through {SITE_NAME}.
    </p>

    <h2>1. Digital Products & Services</h2>
    <ul>
      <li>
        Unless otherwise stated, fees for digital products, subscriptions, and
        downloadable content are generally non-refundable once access is
        granted.
      </li>
      <li>
        In cases of duplicate charge, unauthorized payment, or demonstrable
        technical failure preventing access, you may be eligible for a refund
        upon verification.
      </li>
    </ul>

    <h2>2. Courses / Memberships (if applicable)</h2>
    <ul>
      <li>
        If a money-back guarantee is advertised on a specific course or plan,
        its timeframe and conditions will be clearly stated on the respective
        checkout page; that policy will prevail for that item.
      </li>
      <li>
        To request a refund within the eligible window, you must not have
        violated our Terms or engaged in misuse, excessive downloads, or content
        scraping.
      </li>
    </ul>

    <h2>3. How to Request a Refund</h2>
    <ol>
      <li>
        Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> from your
        registered email ID.
      </li>
      <li>
        Include order ID, purchase date, product/service name, and reason for
        the request.
      </li>
      <li>
        We may ask for additional information to verify and diagnose issues.
      </li>
    </ol>

    <h2>4. Processing Time & Method</h2>
    <ul>
      <li>
        Approved refunds are typically processed to the original payment method.
      </li>
      <li>
        Processing times depend on your bank or payment provider (typically 5–10
        business days after approval).
      </li>
    </ul>

    <h2>5. Cancellations & Renewals</h2>
    <ul>
      <li>
        You can cancel auto-renewing subscriptions any time before the next
        billing date.
      </li>
      <li>
        Access generally continues until the end of the current billing period;
        partial period refunds are not provided unless required by law.
      </li>
    </ul>

    <h2>6. Chargebacks</h2>
    <p>
      Initiating a chargeback without first contacting support may delay
      resolution. We reserve the right to contest chargebacks we believe are
      invalid or fraudulent.
    </p>

    <h2>7. Contact</h2>
    <p>
      For refund and billing questions, contact{" "}
      <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> or write to{" "}
      {COMPANY_ADDRESS}.
    </p>
  </PageShell>
);
