import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex items-center gap-2 group cursor-pointer ${className}`}>
      <span className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-secondary dark:text-white transition-colors duration-300 group-hover:text-primary">
        Interno
      </span>
      <span className="text-primary font-serif text-5xl leading-none mb-2">.</span>
    </div>
  );
};