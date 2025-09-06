export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Terms of Service</h1>
       <div className="mt-8 prose prose-lg mx-auto dark:prose-invert">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>

        <p>
          Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the Tiktoker website (the "Service") operated by Tiktoker ("us", "we", or "our").
        </p>

        <h2>Acceptance of Terms</h2>
        <p>
          By accessing and using our Service, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2>Service Description</h2>
        <p>
          Tiktoker provides a free tool to download TikTok videos for personal use. You are responsible for ensuring that your use of the downloaded content complies with all applicable laws and the terms of service of TikTok.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of Tiktoker. The content you download belongs to its respective owners.
        </p>
        
        <h2>Disclaimer</h2>
        <p>
          Our service is provided "as is." We do not guarantee the availability or reliability of the service. Tiktoker is not affiliated with TikTok.
        </p>

        <h2>Changes to Terms</h2>
        <p>
          We reserve the right to modify or replace these Terms at any time. We will provide notice of changes on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at <a href="mailto:terms@tiktoker.app">terms@tiktoker.app</a>.
        </p>
      </div>
    </div>
  );
}
