
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Terminal, ChevronRight } from 'lucide-react';

interface WelcomeScreenProps {
  children: React.ReactNode;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ children }) => {
  const [stage, setStage] = useState(0);
  const [flash, setFlash] = useState(false);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isSwitchActive, setIsSwitchActive] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth - 0.5) * 40);
    mouseY.set((clientY / innerHeight - 0.5) * 40);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 2500);
    const t2 = setTimeout(() => setStage(2), 4000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (stage === 2) {
      const lines = [
        "INITIALIZING NEURAL LINK...",
        "BYPASSING SECURITY PROTOCOLS...",
        "OPTIMIZING VISUAL CORTEX...",
        "LOADING REALITY ENGINE v9.0...",
        "ESTABLISHING CONNECTION..."
      ];
      let delay = 0;
      lines.forEach((line, index) => {
        setTimeout(() => {
          setBootLines(prev => [...prev, line]);
          if (index === lines.length - 1) {
            setTimeout(() => setStage(3), 800);
          }
        }, delay);
        delay += Math.random() * 400 + 200;
      });
    }
  }, [stage]);

  const handleSwitch = () => {
    if (isSwitchActive) return;
    setIsSwitchActive(true);
    
    setTimeout(() => {
        setFlash(true);
        setTimeout(() => {
            setStage(4);
        }, 500); 
    }, 800);
  };

  if (stage === 4) {
    return (
      <>
        {flash && <div className="flash-overlay"></div>}
        <motion.div 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        >
          {children}
        </motion.div>
      </>
    );
  }

  return (
    <div 
        className="fixed inset-0 z-[9999] overflow-hidden bg-black text-white cursor-default select-none"
        onMouseMove={handleMouseMove}
    >
      {flash && <div className="flash-overlay"></div>}
      
      <AnimatePresence mode="wait">
        {(stage === 0 || stage === 1) && (
          <div className={`w-full h-full bg-white text-black font-serif p-8 raw-mode overflow-hidden ${stage === 1 ? 'glitch-active' : ''}`}>
            {stage === 1 && <div className="scanlines"></div>}
            
            <div className="max-w-3xl mx-auto border border-gray-300 shadow-sm p-4">
                <h1 className="text-3xl font-bold border-b-2 border-black pb-2 mb-4">Interno</h1>
                
                <div className="bg-gray-100 p-2 mb-6 flex gap-4 text-blue-700 underline text-sm">
                    <span>Home</span><span>About</span><span>Services</span><span>Contact</span>
                </div>
                
                <div className="flex gap-4 mb-8">
                    <div className="flex-1">
                        <h2 className="text-xl font-bold mb-2">Let's Create Your Dream Interior</h2>
                        <p className="mb-4 text-sm">The world needs innovators and problem solvers.</p>
                        <button className="bg-gray-200 border border-gray-400 px-2 py-1 text-sm">Get Started &gt;&gt;</button>
                    </div>
                </div>
                
                <h3 className="font-bold border-b border-gray-300 mb-2">Latest Projects</h3>
                <ul className="list-disc pl-5 text-sm mb-8">
                    <li>Modern Bedroom v2</li>
                    <li>Kitchen Remodel 2024</li>
                    <li>Office Space Layout</li>
                </ul>
                
                <div className="text-center text-xs text-gray-500 border-t border-gray-300 pt-2">
                    Copyright © 1999-2025 Interno. All rights reserved.
                </div>
            </div>
          </div>
        )}

        {stage === 2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center font-mono text-green-500"
          >
            <div className="w-full max-w-md p-8">
                <div className="mb-4 flex items-center gap-2 text-primary animate-pulse">
                    <Terminal size={20} /> SYSTEM BOOT
                </div>
                <div className="space-y-2">
                    {bootLines.map((line, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-sm tracking-wider opacity-80"
                        >
                            {`> ${line}`}
                        </motion.div>
                    ))}
                </div>
            </div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div 
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div 
                style={{ x: springX, y: springY }}
                className="absolute inset-0 z-0"
            >
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-[120px]"></div>
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"></div>
            </motion.div>

            <div className="relative z-10 flex flex-col items-center max-w-4xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="mb-12"
                >
                    <h1 className="font-serif text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 tracking-tighter mb-4 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                        Wake Up
                    </h1>
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="font-sans text-primary text-lg tracking-[0.5em] uppercase"
                    >
                        To Reality
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1 }}
                    className="mb-16 space-y-6"
                >
                    <div className="flex flex-wrap justify-center gap-8 text-xs font-mono tracking-widest uppercase opacity-60">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Architect: <span className="text-white font-bold">xx1lly</span>
                        </span>
                        <span className="text-gray-700">|</span>
                        <span className="flex items-center gap-2">
                            Concept: <span className="text-white font-bold">shame</span>
                        </span>
                    </div>
                    
                    <p className="text-gray-400 max-w-xl mx-auto font-light leading-relaxed">
                        The simulation is degrading. You are about to transcend the boundaries of standard design. 
                        Initiate the protocol to access the premium layer.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                    onClick={handleSwitch}
                    className={`relative w-96 h-28 rounded-full cursor-pointer group transition-all duration-500 ${isSwitchActive ? 'scale-105' : 'hover:scale-105'}`}
                >
                    <div className={`absolute -inset-4 bg-primary/20 rounded-full blur-2xl transition-opacity duration-500 ${isSwitchActive ? 'opacity-50' : 'opacity-0 group-hover:opacity-30'}`}></div>

                    <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-full border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-primary/80 to-[#E6D6C3]"
                            initial={{ x: '-100%' }}
                            animate={{ x: isSwitchActive ? '0%' : '-100%' }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                        />
                    </div>

                    <motion.div 
                        className="absolute top-3 bottom-3 w-24 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center z-10 border border-white/50"
                        initial={{ left: '12px' }}
                        animate={{ left: isSwitchActive ? 'calc(100% - 108px)' : '12px' }}
                        transition={{ duration: 0.6, ease: "circOut" }}
                    >
                        <ChevronRight className={`text-black transition-transform duration-500 ${isSwitchActive ? 'rotate-180 scale-125' : ''}`} />
                    </motion.div>

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                        <span className={`text-white/80 font-bold tracking-[0.3em] uppercase text-sm transition-all duration-500 ml-8 ${isSwitchActive ? 'opacity-0' : 'opacity-100 animate-pulse'}`}>
                            Slide to Activate
                        </span>
                        <span className={`absolute text-black font-bold tracking-[0.3em] uppercase text-sm transition-all duration-500 ${isSwitchActive ? 'opacity-100' : 'opacity-0'}`}>
                            System Online
                        </span>
                    </div>
                </motion.div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};
