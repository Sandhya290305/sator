import { useState, useEffect } from 'react';
import { GameMenu } from './GameMenu';
import { LevelScreen } from './LevelScreen';
import { GameHeader } from './GameHeader';
import { GameFooter } from './GameFooter';
import { useGameState } from '../hooks/useGameState';

export function Game() {
  const {
    currentLevel,
    currentTask,
    score,
    isPlaying,
    startLevel,
    completeTask,
    resetGame,
    gameProgress,
  } = useGameState();

  const [showMenu, setShowMenu] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      setIsTransitioning(true);
      setTimeout(() => {
        setShowMenu(false);
        setIsTransitioning(false);
      }, 300);
    }
  }, [isPlaying]);

  const handleStartLevel = (levelNumber: number) => {
    startLevel(levelNumber);
  };

  const handleBackToMenu = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setShowMenu(true);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black via-gray-900 to-black">
      <GameHeader score={score} currentLevel={currentLevel} currentTask={currentTask} />
      <main className="flex-1 container py-8">
        <div
          className={`transition-all duration-300 ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {showMenu ? (
            <GameMenu
              onStartLevel={handleStartLevel}
              onResetProgress={resetGame}
              gameProgress={gameProgress}
            />
          ) : (
            <LevelScreen
              level={currentLevel}
              task={currentTask}
              onTaskComplete={completeTask}
              onBackToMenu={handleBackToMenu}
            />
          )}
        </div>
      </main>
      <GameFooter />
    </div>
  );
}
