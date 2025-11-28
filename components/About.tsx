import React, { useState } from 'react';
import { Phone, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { VideoModal } from './VideoModal';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

export const About: React.FC = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
        <section className="w-full max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32" id="about">
        <MotionDiv 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
        >
            <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-8 leading-tight">
                We Tackle The Most <br/> Challenging Designs
            </h2>
            <p className="font-sans text-textGray dark:text-gray-300 text-lg mb-10 leading-relaxed">
                The world needs innovators and problem solvers who turn challenges into greater opportunities. We have an insatiable curiosity about transformative trends challenging the status.
            </p>
            
            <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 rounded-full bg-[#F4F0EC] dark:bg-secondary flex items-center justify-center border border-[#CDA274]/30 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    <Phone className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <div className="font-bold text-secondary dark:text-white text-xl">012345678</div>
                    <div className="text-textGray dark:text-gray-400">Call Us Anytime</div>
                </div>
            </div>

            <div className="flex gap-4">
                <MotionButton 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-secondary dark:bg-primary text-white px-8 py-4 rounded-[18px] flex items-center gap-3 hover:bg-primary dark:hover:bg-white dark:hover:text-secondary transition-all duration-300 shadow-lg group"
                >
                    Get Free Estimate
                    <ArrowRight className="w-5 h-5 text-primary group-hover:text-white dark:text-white dark:group-hover:text-secondary transition-colors" />
                </MotionButton>

                <MotionButton
                    onClick={() => setIsVideoOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-[18px] border border-primary/50 text-secondary dark:text-white flex items-center gap-3 hover:bg-primary/10 transition-all duration-300 group"
                >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                        <Play size={14} className="ml-1" />
                    </div>
                    Watch Video
                </MotionButton>
            </div>
        </MotionDiv>

        <MotionDiv 
            initial={{ opacity: 0, scale: 0.9, rotate: 1 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative group cursor-pointer"
            onClick={() => setIsVideoOpen(true)}
        >
            <div className="absolute inset-4 border-2 border-primary rounded-tr-[150px] rounded-bl-[50px] -z-10 dark:opacity-30"></div>
            <div className="relative rounded-tr-[150px] rounded-bl-[50px] overflow-hidden shadow-2xl">
                <img 
                    src="https://placehold.co/1000x1200/1a1a1a/ffffff?text=?" 
                    alt="Interior Design Project" 
                    className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <MotionDiv 
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border border-white/50 flex items-center justify-center relative"
                    >
                        <div className="absolute inset-0 rounded-full border border-white/50 animate-ping"></div>
                        <Play size={40} className="text-white ml-2 fill-white" />
                    </MotionDiv>
                </div>
            </div>
        </MotionDiv>
        </section>

        <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
  );
};