import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <div className="flex justify-center gap-4 mb-2">
          <Link href="/contact" className="hover:underline">Contact Us</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
        <p>© Copyright 2025 SaveTok - All Rights Reserved.</p>
      </div>
    </footer>
  );
}
