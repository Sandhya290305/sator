import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, CheckCircle2, Play, RotateCcw, Skull } from 'lucide-react';
import { LEVELS } from '../data/levels';
import type { GameProgress } from '../hooks/useGameState';
import { useState } from 'react';

interface GameMenuProps {
  onStartLevel: (level: number) => void;
  onResetProgress: () => void;
  gameProgress: GameProgress;
}

export function GameMenu({ onStartLevel, onResetProgress, gameProgress }: GameMenuProps) {
  const [hoveredLevel, setHoveredLevel] = useState<number | null>(null);

  const isLevelUnlocked = (levelNumber: number) => {
    if (levelNumber === 1) return true;
    return gameProgress[levelNumber - 1]?.completed || false;
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* SATOR Branding Section */}
      <div className="text-center space-y-6 py-8">
        <div className="sator-container inline-block">
          <div className="sator-aura animate-aura-pulse" />
          <div className="relative">
            <img 
              src="/assets/WhatsApp Image 2026-01-18 at 9.50.23 PM.jpeg" 
              alt="SATOR Logo"
              className="w-64 h-64 object-contain mx-auto mb-4 animate-float"
              style={{ filter: 'drop-shadow(0 0 30px rgba(220, 38, 38, 0.6))' }}
            />
          </div>
          <h1 className="text-7xl font-black metallic-text animate-sator-pulse mb-2" style={{
            WebkitTextStroke: '2px oklch(var(--primary))',
            letterSpacing: '0.1em'
          }}>
            SATOR
          </h1>
        </div>
        <div className="inline-flex items-center gap-2 mb-2">
          <Skull className="h-8 w-8 text-primary animate-float" />
          <h2 className="text-4xl font-bold gradient-text-red">
            Excel & PowerPoint Learning Game
          </h2>
          <Skull className="h-8 w-8 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
        </div>
        <p className="text-lg text-red-300 max-w-2xl mx-auto">
          Master Excel and PowerPoint through 7 progressive levels with 10 tasks each. Complete tasks to earn points and unlock new levels!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {LEVELS.map((level, index) => {
          const isUnlocked = isLevelUnlocked(level.number);
          const progress = gameProgress[level.number];
          const isCompleted = progress?.completed || false;
          const tasksCompleted = progress?.tasksCompleted || 0;
          const isHovered = hoveredLevel === level.number;

          return (
            <Card
              key={level.number}
              className={`relative overflow-hidden transition-all duration-300 bg-black/60 border-2 ${
                isUnlocked
                  ? 'hover:shadow-glow-intense hover:scale-105 cursor-pointer border-primary/50'
                  : 'opacity-60 border-gray-700'
              } ${
                isHovered && isUnlocked ? 'glow-border-red-intense' : ''
              }`}
              onMouseEnter={() => setHoveredLevel(level.number)}
              onMouseLeave={() => setHoveredLevel(null)}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Red gradient overlay */}
              <div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 ${
                  isHovered ? 'opacity-20' : ''
                }`}
                style={{
                  background: 'linear-gradient(135deg, oklch(var(--primary)) 0%, transparent 100%)',
                }}
              />

              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <span className="gradient-text-red">
                        Level {level.number}
                      </span>
                      {isCompleted && (
                        <CheckCircle2 className="h-5 w-5 text-primary animate-bounce-in" />
                      )}
                      {!isUnlocked && <Lock className="h-5 w-5 text-gray-500" />}
                    </CardTitle>
                    <CardDescription className="font-medium text-red-300">{level.title}</CardDescription>
                  </div>
                  <Badge
                    className="bg-primary text-white shadow-glow border border-primary/50"
                  >
                    {level.type === 'excel' ? 'Excel' : 'PowerPoint'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                <p className="text-sm text-red-200">{level.description}</p>
                {isUnlocked && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-red-400">Progress</span>
                      <span className="font-medium text-red-300">{tasksCompleted}/10 tasks</span>
                    </div>
                    <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative border border-primary/30">
                      <div
                        className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-primary via-red-600 to-primary shadow-glow"
                        style={{ width: `${(tasksCompleted / 10) * 100}%` }}
                      />
                      {tasksCompleted > 0 && (
                        <div
                          className="absolute inset-0 bg-red-500/30 animate-pulse"
                          style={{ width: `${(tasksCompleted / 10) * 100}%` }}
                        />
                      )}
                    </div>
                  </div>
                )}
                <Button
                  onClick={() => onStartLevel(level.number)}
                  disabled={!isUnlocked}
                  className={`w-full transition-all duration-300 bg-primary hover:bg-primary/90 text-white border-2 border-primary/50 shadow-glow ${
                    isHovered && isUnlocked ? 'scale-105 shadow-glow-intense' : ''
                  }`}
                  size="lg"
                >
                  <Play className="mr-2 h-4 w-4" />
                  {isCompleted ? 'Play Again' : 'Start Level'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={onResetProgress} 
          variant="outline" 
          size="lg" 
          className="group bg-black/60 border-2 border-primary/50 text-red-300 hover:bg-primary/20 hover:text-white hover:border-primary shadow-glow"
        >
          <RotateCcw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
          Reset All Progress
        </Button>
      </div>
    </div>
  );
}
