import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TRINKET_POSITIONS, EMOJI_POOL } from '../../constants';

export const TrinketCanvas: React.FC = () => {
  const constraintsRef = useRef(null);
  const [trinkets, setTrinkets] = useState<Array<{id: number, initialX: number, initialY: number, emoji: string}>>([]);

  useEffect(() => {
    // Generate random emojis for fixed positions on mount
    const randomTrinkets = TRINKET_POSITIONS.map(pos => ({
      ...pos,
      emoji: EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]
    }));
    setTrinkets(randomTrinkets);
  }, []);

  return (
    <div ref={constraintsRef} className="absolute inset-0 pointer-events-none overflow-hidden z-10">
      {trinkets.map((trinket) => (
        <motion.div
          key={trinket.id}
          className="absolute text-6xl cursor-grab active:cursor-grabbing pointer-events-auto select-none"
          style={{
            left: `${trinket.initialX}%`,
            top: `${trinket.initialY}%`,
          }}
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.2}
          whileTap={{ scale: 1.2, rotate: 10 }}
          whileDrag={{ scale: 1.1 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: trinket.id * 0.1 }}
        >
          {trinket.emoji}
        </motion.div>
      ))}
    </div>
  );
};