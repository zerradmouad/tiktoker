export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Privacy Policy</h1>
      <div className="mt-8 prose prose-lg mx-auto dark:prose-invert">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        
        <p>
          Tiktoker ("us", "we", or "our") operates the Tiktoker website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h2>Information Collection and Use</h2>
        <p>
          We do not collect any personally identifiable information from our users. The TikTok URL you provide is used solely for the purpose of processing your download request and is not stored or shared.
        </p>
        
        <h2>Log Data</h2>
        <p>
          We do not log any data related to your download requests.
        </p>

        <h2>Cookies</h2>
        <p>
          We do not use cookies to track users.
        </p>

        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@tiktoker.app">privacy@tiktoker.app</a>.
        </p>
      </div>
    </div>
  );
}
