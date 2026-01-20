import { Trophy, Target, Skull } from 'lucide-react';
import { useEffect, useState } from 'react';

interface GameHeaderProps {
  score: number;
  currentLevel: number;
  currentTask: number;
}

export function GameHeader({ score, currentLevel, currentTask }: GameHeaderProps) {
  const [prevScore, setPrevScore] = useState(score);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);

  useEffect(() => {
    if (score > prevScore) {
      setIsScoreAnimating(true);
      setTimeout(() => setIsScoreAnimating(false), 600);
    }
    setPrevScore(score);
  }, [score]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/30 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80 shadow-glow">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-glow animate-float border-2 border-primary/50">
            <Skull className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text-red">SATOR Learning Game</h1>
            <p className="text-xs text-red-400">Excel & PowerPoint Mastery</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {currentLevel > 0 && (
            <div className="flex items-center gap-2 text-sm animate-slide-up">
              <Target className="h-4 w-4 text-primary" />
              <span className="font-medium text-red-300">
                Level {currentLevel} - Task {currentTask}/10
              </span>
            </div>
          )}
          <div
            className={`flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20 px-4 py-2 border-2 border-primary/50 transition-all duration-300 shadow-glow ${
              isScoreAnimating ? 'scale-110 animate-pulse-glow-intense' : ''
            }`}
          >
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-white">{score}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
