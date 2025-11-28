import React, { useState } from 'react';
import { ARTICLES } from '../constants';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;

const SpotlightCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[30px] border border-white/10 bg-[#1a1a1a] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(205, 162, 116, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

export const Blog: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="blog">
        <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Recent Blogs</h2>
            <p className="font-sans text-gray-400 max-w-2xl mx-auto">
                Get updates about our latest trends and techniques used in interior design project works.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ARTICLES.map((article, index) => (
                <MotionDiv 
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <SpotlightCard className="group cursor-pointer h-full">
                        <div className="p-5 h-full flex flex-col">
                            <div className="relative w-full h-64 mb-5 rounded-[20px] overflow-hidden bg-gray-800">
                                <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute bottom-4 left-4 bg-[#1a1a1a]/90 backdrop-blur-md px-4 py-2 rounded-lg text-sm font-sans text-white border border-white/10">
                                    {article.tag}
                                </div>
                            </div>
                            <h3 className="font-serif text-2xl text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                                {article.title}
                            </h3>
                            <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-auto">
                                <span className="text-gray-400 text-sm">{article.date}</span>
                                <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-primary flex items-center justify-center transition-colors">
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </div>
                            </div>
                        </div>
                    </SpotlightCard>
                </MotionDiv>
            ))}
        </div>
    </section>
  );
};