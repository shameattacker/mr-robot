import React from 'react';
import { TESTIMONIALS } from '../constants';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

export const Testimonials: React.FC = () => {
  return (
    <section className="w-full bg-accent dark:bg-secondary/30 py-24 rounded-[50px] mb-32 max-w-[1200px] mx-auto transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="text-center max-w-2xl mx-auto mb-12 px-4 relative z-10">
        <h2 className="font-serif text-4xl text-secondary dark:text-white mb-4">What the People Thinks <br/> About Interno</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12 relative z-10">
        {TESTIMONIALS.map((item, index) => (
            <MotionDiv 
                key={item.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="premium-glass p-8 rounded-[30px] transition-all duration-300"
            >
                <div className="flex items-center gap-4 mb-6">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/20" />
                    <div>
                        <h4 className="font-serif text-xl text-secondary dark:text-white">{item.name}</h4>
                        <p className="text-textGray dark:text-gray-400 text-sm">{item.location}</p>
                    </div>
                </div>
                <p className="font-sans text-textGray dark:text-gray-300 italic leading-relaxed">
                    "{item.text}"
                </p>
            </MotionDiv>
        ))}
      </div>
    </section>
  );
};