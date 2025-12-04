import React, { useRef, useEffect, useState } from 'react';
import { Card } from '../UI/Card';

export const EyeWidget: React.FC = () => {
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;
      
      const rect = eyeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      
      // Calculate angle
      const angle = Math.atan2(dy, dx);
      
      // Limit movement radius (eye radius - pupil radius)
      // Eye is e.g. w-24 (96px), pupil is w-8 (32px). Max radius approx 20px
      const distance = Math.min(Math.hypot(dx, dy), 20);
      
      setPupilPos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Card className="bg-prawn text-black flex items-center justify-center min-h-[150px]">
        <div ref={eyeRef} className="relative w-24 h-24 bg-white border-4 border-black rounded-full flex items-center justify-center overflow-hidden">
            <div 
                className="w-8 h-8 bg-black rounded-full"
                style={{
                    transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`
                }}
            />
        </div>
    </Card>
  );
};