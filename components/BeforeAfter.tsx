import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeftRight } from 'lucide-react';

export const BeforeAfter: React.FC = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [width, setWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isResizing && containerRef.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const newWidth = ((clientX - bounds.left) / bounds.width) * 100;
        setWidth(Math.max(0, Math.min(100, newWidth)));
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('touchmove', resize);
    window.addEventListener('mouseup', stopResizing);
    window.addEventListener('touchend', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('touchmove', resize);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('touchend', stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32">
       <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Transformation Magic</h2>
            <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
                Drag the slider to see how we transform spaces from ordinary to extraordinary.
            </p>
        </div>

      <div 
        ref={containerRef}
        className="relative w-full h-[500px] md:h-[600px] rounded-[30px] overflow-hidden cursor-col-resize select-none shadow-2xl group"
        onMouseDown={startResizing}
        onTouchStart={startResizing}
      >
        <div className="absolute inset-0">
             <img 
                src="https://placehold.co/1200x800/1a1a1a/ffffff?text=AFTER" 
                alt="After Renovation" 
                className="w-full h-full object-cover"
                draggable={false}
            />
             <span className="absolute top-6 right-6 bg-white/90 text-secondary px-4 py-1.5 rounded-full font-bold text-sm backdrop-blur-md z-10 shadow-sm">AFTER</span>
        </div>

        <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${width}%` }}
        >
            <img 
                src="https://placehold.co/1200x800/222222/ffffff?text=BEFORE" 
                alt="Before Renovation" 
                className="w-full h-full object-cover max-w-none grayscale contrast-125"
                style={{ width: containerRef.current?.offsetWidth || '100%' }} 
                draggable={false}
            />
            <div className="absolute inset-0 bg-black/10"></div>
            <span className="absolute top-6 left-6 bg-black/60 text-white px-4 py-1.5 rounded-full font-bold text-sm backdrop-blur-md z-10">BEFORE</span>
        </div>

        <div 
            className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            style={{ left: `${width}%` }}
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl transform transition-transform hover:scale-110 active:scale-95 text-primary">
                <ArrowLeftRight className="w-6 h-6" />
            </div>
        </div>
      </div>
    </section>
  );
};