import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Game } from './components/Game';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-primary/5">
        <Game />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;

