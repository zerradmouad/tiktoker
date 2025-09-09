export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-2 sm:px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Contact Us</h1>
      <div className="mt-8 prose prose-lg mx-auto dark:prose-invert">
        <p>
          We'd love to hear from you! If you have any questions, feedback, or inquiries, please don't hesitate to get in touch with us.
        </p>
        <p>
          You can reach us by email at: <a href="mailto:support@savetok.app">support@savetok.app</a>
        </p>
        <p>
          We do our best to respond to all inquiries within 24-48 hours.
        </p>
      </div>
    </div>
  );
}
