import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
}

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      'oklch(0.55 0.25 0)', // blood red
      'oklch(0.45 0.20 0)', // dark red
      'oklch(0.60 0.22 10)', // red-orange
      'oklch(0.50 0.18 350)', // crimson
      'oklch(0.40 0.15 0)', // deep red
    ];

    const newPieces: ConfettiPiece[] = [];
    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 1,
      });
    }
    setPieces(newPieces);
  }, []);

  return (
    <div className="particle-container">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            boxShadow: `0 0 10px ${piece.color}`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
