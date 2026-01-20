import { useState, useEffect } from 'react';

export interface GameProgress {
  [level: number]: {
    completed: boolean;
    tasksCompleted: number;
    bestTime?: number;
  };
}

export function useGameState() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [currentTask, setCurrentTask] = useState(1);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameProgress, setGameProgress] = useState<GameProgress>(() => {
    const saved = localStorage.getItem('sator-game-progress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('sator-game-progress', JSON.stringify(gameProgress));
  }, [gameProgress]);

  useEffect(() => {
    const savedScore = localStorage.getItem('sator-game-score');
    if (savedScore) {
      setScore(parseInt(savedScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sator-game-score', score.toString());
  }, [score]);

  const startLevel = (levelNumber: number) => {
    setCurrentLevel(levelNumber);
    setCurrentTask(1);
    setIsPlaying(true);
  };

  const completeTask = (timeSpent: number, pointsEarned: number) => {
    // Add or subtract points based on performance
    setScore((prev) => Math.max(0, prev + pointsEarned));

    if (currentTask < 10) {
      setCurrentTask((prev) => prev + 1);
    } else {
      // Level completed
      setGameProgress((prev) => ({
        ...prev,
        [currentLevel]: {
          completed: true,
          tasksCompleted: 10,
          bestTime: prev[currentLevel]?.bestTime
            ? Math.min(prev[currentLevel].bestTime!, timeSpent)
            : timeSpent,
        },
      }));
      setIsPlaying(false);
      setCurrentLevel(0);
    }

    // Update progress
    setGameProgress((prev) => ({
      ...prev,
      [currentLevel]: {
        ...prev[currentLevel],
        completed: currentTask === 10,
        tasksCompleted: Math.max(prev[currentLevel]?.tasksCompleted || 0, currentTask),
      },
    }));
  };

  const resetGame = () => {
    setGameProgress({});
    setScore(0);
    setCurrentLevel(0);
    setCurrentTask(1);
    setIsPlaying(false);
    localStorage.removeItem('sator-game-progress');
    localStorage.removeItem('sator-game-score');
  };

  return {
    currentLevel,
    currentTask,
    score,
    isPlaying,
    gameProgress,
    startLevel,
    completeTask,
    resetGame,
  };
}
