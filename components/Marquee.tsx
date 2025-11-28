
import React from 'react';

export const Marquee: React.FC = () => {
  const text = " • Luxury Interiors • Sustainable Design • Award Winning Agency • 24/7 Support • Premium Materials";
  const repeatCount = 10;

  return (
    <div className="w-full bg-secondary dark:bg-primary py-6 overflow-hidden relative z-20 border-y border-white/10 mb-32">
      <div className="flex whitespace-nowrap animate-shine" style={{ animation: 'marquee 20s linear infinite' }}>
        {Array.from({ length: repeatCount }).map((_, i) => (
          <span key={i} className="text-xl md:text-2xl font-serif text-white uppercase tracking-widest mx-4 opacity-90">
            {text}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};
