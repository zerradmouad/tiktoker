export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Privacy Policy – SaveTok™</h1>
      <div className="mt-8 prose prose-lg mx-auto dark:prose-invert">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>

        <p>At SaveTok (“SaveTok”, “we”, “our”, or “us”), your privacy is important to us. This Privacy Policy explains how we handle information when you use our website and services (collectively, the “Service”).</p>

        <p>By accessing or using SaveTok, you agree to the practices described in this Privacy Policy. If you do not agree, please do not use our Service.</p>

        <h2>1. Information We Do Not Collect</h2>
        <p>SaveTok is designed to be simple and private.</p>
        <ul className="list-disc pl-6">
            <li>We <strong>do not require you to register an account</strong>.</li>
            <li>We <strong>do not store the links you paste</strong> into the Service.</li>
            <li>We <strong>do not monitor or track your downloads</strong>.</li>
            <li>We <strong>do not sell or share personal data</strong> with third parties.</li>
        </ul>

        <h2>2. Information We May Collect</h2>
        <p>While we do not actively collect personal data, some information may be automatically processed when you use our Service:</p>
        <ul className="list-disc pl-6">
            <li><strong>Technical data</strong>: such as your browser type, device type, IP address, and operating system (standard information collected by most websites).</li>
            <li><strong>Cookies</strong>: small text files stored on your device to improve performance and user experience. You can disable cookies in your browser settings if you prefer.</li>
        </ul>

        <h2>3. How We Use Information</h2>
        <p>Any automatically collected data is used only to:</p>
        <ul className="list-disc pl-6">
            <li>Maintain and improve the performance of our Service.</li>
            <li>Prevent misuse or unauthorized access.</li>
            <li>Analyze general usage trends (without identifying individual users).</li>
        </ul>
        <p>We do not use your information for marketing or advertising.</p>

        <h2>4. Third-Party Services</h2>
        <p>SaveTok may use third-party services (such as analytics or hosting providers) that process limited technical information on our behalf. These providers are bound by their own privacy policies.</p>
        <p>We are not responsible for third-party websites linked from SaveTok. Please review the privacy practices of any external site you visit.</p>

        <h2>5. Data Security</h2>
        <p>We take reasonable steps to protect against unauthorized access, alteration, disclosure, or destruction of data. However, no method of electronic storage or transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>

        <h2>6. Children’s Privacy</h2>
        <p>SaveTok is not intended for use by children under the age of 13 (or the legal age of consent in your region). We do not knowingly collect personal data from children. If you believe we may have inadvertently received such information, please contact us so we can delete it.</p>

        <h2>7. Changes to this Policy</h2>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated “Last updated” date. Continued use of SaveTok after changes means you accept the updated Policy.</p>

        <h2>8. Contact Us</h2>
        <p>If you have questions about this Privacy Policy or how we handle your data, you may contact us at: <a href="mailto:support@savetok.online">support@savetok.online</a></p>
      </div>
    </div>
  );
}
