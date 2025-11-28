import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { X, Code, Cpu, Globe, Send, Layers, User, Sparkles, ExternalLink } from 'lucide-react';

const MotionDiv = motion.div as any;

interface DeveloperProfileProps {
  onClose: () => void;
}

export const DeveloperProfile: React.FC<DeveloperProfileProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'stack' | 'contact'>('about');
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-300, 300], [2, -2]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-300, 300], [-2, 2]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(e.clientX - centerX);
      y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
  };

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 bg-[#050505]/90 backdrop-blur-xl z-[100] flex items-center justify-center p-4 overflow-hidden"
      onClick={onClose}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-primary/5 rounded-full blur-[150px] opacity-40"></div>
      </div>

      <MotionDiv 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        style={{ rotateX, rotateY, perspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-5xl h-[700px] bg-[#0a0a0a] border border-white/10 rounded-[40px] shadow-2xl relative flex overflow-hidden z-20 group"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none z-50 opacity-30 rounded-[40px]"></div>

        <div className="w-80 md:w-96 bg-[#0f0f0f] border-r border-white/5 flex flex-col relative z-20">
            <div className="p-8 pb-0 flex justify-between items-start">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
            </div>

            <div className="p-10 flex flex-col items-center text-center flex-1">
                <div className="relative w-40 h-40 mb-8 group/avatar">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl group-hover/avatar:blur-3xl transition-all duration-700"></div>
                    
                    <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 shadow-2xl bg-[#1a1a1a] flex items-center justify-center">
                        <span className="text-5xl font-thin text-white opacity-80">{`>_`}</span>
                    </div>
                    
                    <div className="absolute bottom-2 right-2 w-5 h-5 bg-[#0f0f0f] rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

                <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">xx1lly</h2>
                <p className="text-primary/80 font-medium text-sm uppercase tracking-widest mb-8">Creative Architect</p>

                <div className="w-full space-y-4">
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="p-2 bg-white/5 rounded-full text-white"><Globe size={16} /></div>
                        <div className="text-left">
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Based In</div>
                            <div className="text-sm text-white font-medium">Zaporizhzhia, UA</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5">
                        <div className="p-2 bg-white/5 rounded-full text-white"><Layers size={16} /></div>
                        <div className="text-left">
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider">Focus</div>
                            <div className="text-sm text-white font-medium">Frontend & OpSec</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-8 text-center opacity-30 hover:opacity-60 transition-opacity">
                <p className="text-[10px] font-mono">ID: 8842-ALPHA // ENCRYPTED</p>
            </div>
        </div>

        <div className="flex-1 bg-[#0a0a0a] relative flex flex-col">
            <div className="h-24 border-b border-white/5 flex items-center px-10 justify-between">
                <div className="flex gap-8">
                    {[
                        { id: 'about', label: 'Overview' },
                        { id: 'stack', label: 'Tech Stack' },
                        { id: 'contact', label: 'Uplink' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className="relative py-2 group"
                        >
                            <span className={`text-sm font-medium transition-colors duration-300 ${activeTab === tab.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                {tab.label}
                            </span>
                            {activeTab === tab.id && (
                                <MotionDiv 
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-px bg-primary shadow-[0_0_10px_#CDA274]"
                                />
                            )}
                        </button>
                    ))}
                </div>
                <button 
                    onClick={onClose} 
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar relative">
                <AnimatePresence mode="wait">
                    
                    {activeTab === 'about' && (
                        <MotionDiv 
                            key="about"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="space-y-8"
                        >
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-6xl font-serif text-white leading-tight">
                                    Building digital <br/> 
                                    <span className="text-primary italic">sanctuaries.</span>
                                </h1>
                                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl font-light">
                                    I specialize in crafting high-performance, secure, and visually stunning digital experiences. My work sits at the intersection of creative design and robust engineering.
                                </p>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent"></div>

                            <div className="bg-white/5 border border-white/5 rounded-2xl p-8 relative overflow-hidden group hover:border-white/10 transition-colors">
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Sparkles size={48} />
                                </div>
                                <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                                    The Philosophy
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-sm">
                                    "Control is an illusion." — <span className="text-white font-medium">Mr. Robot</span>. 
                                    <br/><br/>
                                    Inspired by the meticulous detail and hidden depth of Elliot Alderson's world, I approach code with precision. I believe true beauty in software lies in what you don't see: security, efficiency, and seamless architecture.
                                </p>
                            </div>
                        </MotionDiv>
                    )}

                    {activeTab === 'stack' && (
                        <MotionDiv 
                            key="stack"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4, staggerChildren: 0.1 }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {[
                                { name: 'C++', level: 95, desc: 'Memory Management & Systems' },
                                { name: 'React', level: 92, desc: 'Modern UI/UX Architecture' },
                                { name: 'C#', level: 88, desc: 'Enterprise Backend Solutions' },
                                { name: 'Node.js', level: 85, desc: 'Scalable API Development' },
                                { name: 'Security', level: 90, desc: 'Penetration Testing & Audits' },
                                { name: 'Rust', level: 75, desc: 'Safe Concurrency & Speed' },
                            ].map((skill, i) => (
                                <MotionDiv 
                                    key={skill.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-[#141414] border border-white/5 p-6 rounded-2xl hover:bg-white/5 hover:border-white/10 transition-all group"
                                >
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="text-white font-bold text-lg">{skill.name}</h4>
                                        <span className="text-primary font-mono text-xs">{skill.level}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-3">
                                        <MotionDiv 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                            className="h-full bg-gradient-to-r from-primary to-[#E6D6C3]"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">{skill.desc}</p>
                                </MotionDiv>
                            ))}
                        </MotionDiv>
                    )}

                    {activeTab === 'contact' && (
                        <MotionDiv 
                            key="contact"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center h-full text-center"
                        >
                            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 relative">
                                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-50"></div>
                                <Send size={32} className="text-white relative z-10" />
                            </div>

                            <h2 className="text-3xl font-bold text-white mb-2">Initialize Connection</h2>
                            <p className="text-gray-400 max-w-md mb-8">
                                Ready to collaborate? Establish a secure line.
                            </p>

                            <a 
                                href="https://t.me/IocalIy" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="group relative px-8 py-4 bg-white text-black font-bold rounded-xl flex items-center gap-3 overflow-hidden hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-white to-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span className="relative z-10 flex items-center gap-2">
                                    Open Telegram Uplink <ExternalLink size={16} />
                                </span>
                            </a>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </div>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};