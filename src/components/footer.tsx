import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-6 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          This tool is for personal use only. We are not affiliated with TikTok.
        </p>
        <p className="mt-2 flex items-center justify-center gap-1">
          Made with <Heart className="w-4 h-4 text-destructive fill-current" /> by a developer.
        </p>
      </div>
    </footer>
  );
}
