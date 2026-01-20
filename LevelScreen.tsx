import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, CheckCircle2, Zap, Lock } from 'lucide-react';
import { LEVELS } from '../data/levels';
import { TaskComponent } from './TaskComponent';
import { useTimer } from '../hooks/useTimer';
import { useAudio } from '../hooks/useAudio';
import { toast } from 'sonner';

interface LevelScreenProps {
  level: number;
  task: number;
  onTaskComplete: (timeSpent: number, pointsEarned: number) => void;
  onBackToMenu: () => void;
}

export function LevelScreen({ level, task, onTaskComplete, onBackToMenu }: LevelScreenProps) {
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);
  const [showShake, setShowShake] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const levelData = LEVELS.find((l) => l.number === level);
  const currentTask = levelData?.tasks[task - 1];
  const { timeLeft, startTimer, stopTimer, resetTimer } = useTimer(currentTask?.timeLimit || 120);
  const { playSuccess, playError, playTick } = useAudio();

  useEffect(() => {
    resetTimer();
    startTimer();
    return () => stopTimer();
  }, [task]);

  useEffect(() => {
    if (timeLeft <= 10 && timeLeft > 0) {
      playTick();
    }
    if (timeLeft === 0 && !isTaskCompleted) {
      handleTaskFail();
    }
  }, [timeLeft]);

  const handleTaskSuccess = () => {
    if (isTaskCompleted) return;
    setIsTaskCompleted(true);
    stopTimer();
    playSuccess();
    const timeSpent = (currentTask?.timeLimit || 120) - timeLeft;
    const basePoints = 100;
    const timeBonus = Math.max(0, 50 - timeSpent);
    const pointsEarned = Math.floor(basePoints + timeBonus);
    
    // Mark current task as completed
    setCompletedTasks(prev => new Set([...prev, task]));
    
    toast.success('Task completed!', {
      description: `You earned ${pointsEarned} points! Time: ${timeSpent}s`,
    });
    
    setTimeout(() => {
      onTaskComplete(timeSpent, pointsEarned);
      setIsTaskCompleted(false);
    }, 2000);
  };

  const handleTaskFailure = (pointsDeducted: number) => {
    playError();
    setShowShake(true);
    setTimeout(() => setShowShake(false), 500);
    toast.error('Out of attempts!', {
      description: `${pointsDeducted} points deducted. Review the tutorial to learn.`,
    });
    
    // Mark task as completed even on failure so user can progress
    setCompletedTasks(prev => new Set([...prev, task]));
  };

  const handleTaskFail = () => {
    stopTimer();
    playError();
    setShowShake(true);
    setTimeout(() => setShowShake(false), 500);
    toast.error('Time is up!', {
      description: 'Moving to next task.',
    });
    
    // Mark task as completed even on timeout so user can progress
    setCompletedTasks(prev => new Set([...prev, task]));
    
    setTimeout(() => {
      onTaskComplete(currentTask?.timeLimit || 120, 0);
    }, 2000);
  };

  if (!levelData || !currentTask) {
    return (
      <div className="text-center">
        <p className="text-red-300">Level or task not found</p>
        <Button onClick={onBackToMenu} className="mt-4 bg-primary hover:bg-primary/90">
          Back to Menu
        </Button>
      </div>
    );
  }

  const progress = ((task - 1) / 10) * 100;
  const isLowTime = timeLeft <= 10;
  const canAccessTask = task === 1 || completedTasks.has(task - 1);

  return (
    <div className={`space-y-6 animate-slide-up ${showShake ? 'animate-shake' : ''}`}>
      <div className="flex items-center justify-between">
        <Button 
          onClick={onBackToMenu} 
          variant="ghost" 
          size="sm" 
          className="group text-red-300 hover:text-white hover:bg-primary/20 border border-primary/30"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Menu
        </Button>
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-300 ${
              isLowTime
                ? 'border-primary bg-primary/20 animate-timer-pulse shadow-glow-intense'
                : 'border-primary/50 bg-black/60 shadow-glow'
            }`}
          >
            <Clock
              className={`h-5 w-5 ${isLowTime ? 'text-white' : 'text-primary'}`}
            />
            <span
              className={`font-mono text-2xl font-bold ${
                isLowTime ? 'text-white' : 'text-primary'
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      <Card className="border-2 border-primary/50 shadow-glow-lg bg-black/60">
        <CardHeader className="bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-primary/30">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="gradient-text-red">
                  Level {level}: {levelData.title}
                </span>
              </CardTitle>
              <CardDescription className="text-base font-medium text-red-300">
                Task {task} of 10 - {currentTask.title}
              </CardDescription>
            </div>
            {isTaskCompleted && (
              <CheckCircle2 className="h-10 w-10 text-primary animate-bounce-in" />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-red-400 font-medium">Level Progress</span>
              <span className="font-bold text-red-300">{task}/10 tasks</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative border border-primary/30">
              <div
                className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-primary via-red-600 to-primary shadow-glow"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute inset-0 bg-red-500/30 animate-pulse"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          
          {/* Task completion status indicator */}
          {!canAccessTask && (
            <div className="flex items-center gap-2 p-3 bg-gray-900/80 border-2 border-yellow-600/50 rounded-lg">
              <Lock className="h-5 w-5 text-yellow-500" />
              <span className="text-yellow-400 text-sm font-medium">
                Complete the previous task to unlock this one
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {canAccessTask ? (
        <TaskComponent
          task={currentTask}
          onSuccess={handleTaskSuccess}
          onFailure={handleTaskFailure}
          isCompleted={isTaskCompleted}
          levelType={levelData.type}
          levelNumber={level}
        />
      ) : (
        <Card className="border-2 border-gray-700 bg-black/60 opacity-50">
          <CardContent className="py-12 text-center">
            <Lock className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">This task is locked</p>
            <p className="text-gray-500 text-sm mt-2">Complete Task {task - 1} to continue</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
