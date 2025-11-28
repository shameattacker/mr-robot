import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('.cursor-pointer')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null;
  }

  return (
    <>
      <MotionDiv
        className="fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6 }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0 }}
      />
      
      <MotionDiv
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-[9998]"
        animate={{ 
          x: mousePosition.x - 16, 
          y: mousePosition.y - 16,
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.5 : 1,
          backgroundColor: isHovering ? 'rgba(205, 162, 116, 0.1)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.5 }}
      />
    </>
  );
};