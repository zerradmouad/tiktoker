import { Film } from 'lucide-react';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  return (
    <header className="py-4 border-b">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Film className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold tracking-tight">Tiktoker</h1>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
