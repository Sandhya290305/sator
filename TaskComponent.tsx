import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Heart, HelpCircle } from 'lucide-react';
import type { Task } from '../data/levels';
import { Confetti } from './Confetti';
import { ExcelSimulation } from './ExcelSimulation';
import { PowerPointSimulation } from './PowerPointSimulation';
import { TutorialOverlay } from './TutorialOverlay';
import { HintSystem } from './HintSystem';

interface TaskComponentProps {
  task: Task;
  onSuccess: () => void;
  onFailure: (pointsDeducted: number) => void;
  isCompleted: boolean;
  levelType: 'excel' | 'powerpoint';
  levelNumber: number;
}

export function TaskComponent({ task, onSuccess, onFailure, isCompleted, levelType, levelNumber }: TaskComponentProps) {
  const [attemptsRemaining, setAttemptsRemaining] = useState(2);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isCompleted]);

  useEffect(() => {
    // Reset attempts when task changes
    setAttemptsRemaining(2);
    setShowFeedback(false);
    setIsCorrect(false);
    setIsValidated(false);
    setShowHint(false);
    setShowTutorial(false);
  }, [task.id]);

  const handleValidation = (isValid: boolean) => {
    setIsValidated(isValid);
  };

  const handleSubmit = () => {
    if (isCompleted || attemptsRemaining === 0) return;

    setIsCorrect(isValidated);
    setShowFeedback(true);

    if (isValidated) {
      // Success
      setTimeout(() => {
        onSuccess();
        setShowFeedback(false);
      }, 1500);
    } else {
      // Failure
      const newAttempts = attemptsRemaining - 1;
      setAttemptsRemaining(newAttempts);

      if (newAttempts === 0) {
        // No attempts left - show tutorial and deduct points
        const pointsDeducted = 50;
        onFailure(pointsDeducted);
        setTimeout(() => {
          setShowTutorial(true);
          setShowFeedback(false);
        }, 2000);
      } else {
        // Still have attempts left
        setTimeout(() => {
          setShowFeedback(false);
        }, 2000);
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      {showTutorial && task.tutorialSteps && (
        <TutorialOverlay
          title={task.title}
          steps={task.tutorialSteps}
          videoUrl={task.tutorialVideo}
          onClose={() => setShowTutorial(false)}
        />
      )}
      {showHint && (
        <HintSystem
          task={task}
          isActive={showHint}
          onClose={() => setShowHint(false)}
        />
      )}
      
      <Card
        className={`border-2 transition-all duration-300 bg-black/60 ${
          isCompleted
            ? 'glow-border-red-intense'
            : 'border-primary/50'
        } ${showFeedback && !isCorrect ? 'animate-shake' : ''}`}
      >
        <CardHeader className="bg-gradient-to-r from-primary/20 to-transparent border-b border-primary/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-red-100">{task.title}</CardTitle>
              <CardDescription className="text-base text-red-300">{task.description}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {[...Array(2)].map((_, i) => (
                <Heart
                  key={i}
                  className={`h-6 w-6 transition-all ${
                    i < attemptsRemaining
                      ? 'text-primary fill-primary animate-pulse'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scenario-Based Instructions with Data Table */}
          <div className="rounded-lg bg-black/80 p-4 border-l-4 border-primary shadow-glow space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2 text-primary">📋 Business Scenario:</p>
              <p className="text-sm text-red-200 leading-relaxed">{task.scenario}</p>
            </div>
            
            {task.dataTable && task.dataTable.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2 text-primary">📊 Dataset:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      {task.dataTable.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex === 0 ? 'bg-primary/20' : 'bg-black/40'}>
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`border border-primary/30 px-3 py-2 ${
                                rowIndex === 0 ? 'font-bold text-red-100' : 'text-red-200'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            
            <div>
              <p className="text-sm font-semibold mb-2 text-primary">🎯 Your Task:</p>
              <p className="text-sm text-red-200 leading-relaxed">{task.instructions}</p>
            </div>
          </div>

          {/* Simulation Interface */}
          {task.type === 'excel-simulation' && (
            <ExcelSimulation
              validationCriteria={task.validationCriteria}
              onValidate={handleValidation}
              taskId={task.id}
              levelNumber={levelNumber}
            />
          )}

          {task.type === 'powerpoint-simulation' && (
            <PowerPointSimulation
              validationCriteria={task.validationCriteria}
              onValidate={handleValidation}
              taskId={task.id}
              levelNumber={levelNumber}
            />
          )}

          {showFeedback && (
            <div
              className={`flex items-center gap-3 rounded-lg p-4 border-2 animate-bounce-in ${
                isCorrect
                  ? 'bg-primary/20 text-white border-primary shadow-glow'
                  : 'bg-red-900/30 text-red-200 border-red-600'
              }`}
            >
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
                  <span className="font-bold text-lg">Correct! Well done! 🎉</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-6 w-6 flex-shrink-0" />
                  <span className="font-bold text-lg">
                    {attemptsRemaining > 0
                      ? `Not quite right. ${attemptsRemaining} attempt${attemptsRemaining > 1 ? 's' : ''} remaining! 💪`
                      : 'Out of attempts. Check the tutorial to learn the correct method. -50 points'}
                  </span>
                </>
              )}
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              disabled={isCompleted || attemptsRemaining === 0}
              className={`flex-1 text-lg h-14 transition-all duration-300 bg-primary hover:bg-primary/90 text-white border-2 border-primary/50 shadow-glow ${
                isCompleted || attemptsRemaining === 0 ? '' : 'hover:scale-105 hover:shadow-glow-intense'
              }`}
              size="lg"
            >
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Check Answer
            </Button>
            
            <Button
              onClick={() => setShowHint(true)}
              variant="outline"
              className="border-primary/50 text-red-300 hover:bg-primary/20 hover:scale-105 transition-all"
              size="lg"
              disabled={isCompleted || attemptsRemaining === 0}
            >
              <HelpCircle className="h-5 w-5 mr-2" />
              Hint
            </Button>
            
            {task.tutorialSteps && (
              <Button
                onClick={() => setShowTutorial(true)}
                variant="outline"
                className="border-primary/50 text-red-300 hover:bg-primary/20"
                size="lg"
              >
                Tutorial
              </Button>
            )}
          </div>

          {attemptsRemaining === 0 && !isCompleted && (
            <div className="text-center text-red-400 text-sm">
              Review the tutorial above to understand the correct approach, then move to the next task.
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
