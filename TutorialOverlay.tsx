import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Play, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TutorialOverlayProps {
  title: string;
  steps: string[];
  videoUrl?: string;
  onClose: () => void;
}

export function TutorialOverlay({ title, steps, videoUrl, onClose }: TutorialOverlayProps) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-2xl border-2 border-primary shadow-glow-intense bg-black/90">
        <CardHeader className="bg-gradient-to-r from-primary/30 to-secondary/30 border-b border-primary/50">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl gradient-text-red">Tutorial Guide</CardTitle>
              <CardDescription className="text-red-300 text-base mt-1">{title}</CardDescription>
            </div>
            <Button
              onClick={onClose}
              size="icon"
              variant="ghost"
              className="text-red-300 hover:text-white hover:bg-primary/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              {videoUrl && (
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-primary flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Video Tutorial
                  </h3>
                  <div className="aspect-video bg-gray-900 rounded-lg border-2 border-primary/30 flex items-center justify-center">
                    <p className="text-red-400">Video tutorial would play here</p>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-lg font-bold text-primary">Step-by-Step Guide</h3>
                {steps.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-3 p-3 rounded-lg bg-black/60 border border-primary/30 hover:border-primary/50 transition-all"
                  >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </div>
                    <p className="text-red-200 flex-1 pt-1">{step}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <p className="text-red-300 text-sm">
                  Follow these steps carefully to complete the task successfully!
                </p>
              </div>
            </div>
          </ScrollArea>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={onClose}
              className="bg-primary hover:bg-primary/90 text-white shadow-glow"
            >
              Got it! Let me try
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
