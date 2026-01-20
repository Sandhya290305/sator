import { Heart } from 'lucide-react';

export function GameFooter() {
  return (
    <footer className="border-t border-primary/30 bg-black/80 py-6 shadow-glow">
      <div className="container">
        <div className="flex flex-col items-center justify-center gap-2 text-sm text-red-300">
          <div className="flex items-center gap-2">
            <span>© 2025. Built with</span>
            <Heart className="h-4 w-4 text-primary animate-pulse fill-primary" />
            <span>using</span>
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
