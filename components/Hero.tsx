import React, { useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;
const MotionP = motion.p as any;
const MotionButton = motion.button as any;
const MotionSvg = motion.svg as any;

interface HeroProps {
  onTakeQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onTakeQuiz }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const titleText = "Let's Create Your Dream Interior";

  return (
    <section ref={containerRef} className="w-full max-w-[1400px] mx-auto px-4 md:px-6 relative pt-32 md:pt-40 pb-20" id="home">
      
      <div className="relative w-full rounded-[40px] md:rounded-bl-[200px] overflow-hidden shadow-2xl min-h-[600px] md:h-[85vh] flex items-center bg-[#1a1a1a] border border-white/5">
        
        <MotionDiv 
            style={{ y, scale, opacity }}
            className="absolute inset-0 w-full h-full z-0"
        >
             <img 
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop" 
                alt="Luxury Interior" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30"></div>
        </MotionDiv>

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10 pointer-events-none"></div>

        <div className="relative z-20 max-w-3xl pl-8 md:pl-24 py-12 pr-4">
             <MotionDiv 
              initial="hidden"
              animate="visible"
              variants={sentence}
            >
                <MotionSvg 
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="absolute -left-12 -top-20 w-40 h-40 text-primary/30" 
                  viewBox="0 0 100 100" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1"
                >
                   <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z"/>
                </MotionSvg>

                <h1 className="font-serif text-5xl md:text-7xl lg:text-[90px] leading-[1.1] text-white mb-8 relative drop-shadow-lg">
                    {titleText.split(" ").map((word, index) => {
                        return (
                            <span key={index} className="inline-block mr-4">
                                {word.split("").map((char, charIndex) => {
                                    return (
                                        <MotionSpan key={char + "-" + charIndex} variants={letter} className={`inline-block ${word === 'Dream' || word === 'Interior' ? 'text-primary' : ''}`}>
                                            {char}
                                        </MotionSpan>
                                    )
                                })}
                            </span>
                        )
                    })}
                </h1>
                
                <MotionP 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="font-sans text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-lg font-light tracking-wide"
                >
                    The world needs innovators and problem solvers who turn challenges into greater opportunities.
                </MotionP>
                
                <MotionDiv 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                    <MotionButton 
                      whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#CDA274" }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary text-white px-10 py-5 rounded-[20px] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(205,162,116,0.4)] transition-all duration-300 group"
                    >
                        <span className="font-bold tracking-wide">Get Started</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </MotionButton>

                    <MotionButton 
                      onClick={onTakeQuiz}
                      whileHover={{ scale: 1.05, borderColor: "#CDA274" }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-[20px] flex items-center justify-center gap-3 hover:bg-white/10 transition-all duration-300 group"
                    >
                        <Sparkles className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
                        <span className="font-bold tracking-wide">Take Style Quiz</span>
                    </MotionButton>
                </MotionDiv>
            </MotionDiv>
        </div>
      </div>
      
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
    </section>
  );
};