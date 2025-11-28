import React, { useEffect, useState, useRef } from 'react';
import { STATS } from '../constants';
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion';

const MotionDiv = motion.div as any;

const Counter = ({ value }: { value: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
    
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
        if (inView) {
            motionValue.set(numericValue);
        }
    }, [inView, numericValue, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest) + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} className="font-serif text-5xl md:text-6xl text-primary mb-2 block" />;
};

export const Stats: React.FC = () => {
  return (
    <section className="w-full bg-accent dark:bg-darkCard py-24 mb-32 transition-colors duration-300">
        <div className="max-w-[1000px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
                <MotionDiv 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`text-center ${index !== STATS.length - 1 ? 'md:border-r border-primary/30' : ''}`}
                >
                    <Counter value={stat.value} />
                    <div className="text-textGray dark:text-gray-300 font-sans mt-2">{stat.label}</div>
                </MotionDiv>
            ))}
        </div>
    </section>
  );
};