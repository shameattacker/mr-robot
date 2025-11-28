import React, { useState, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = 1.2; 

  return (
    <MotionDiv 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      className="group cursor-pointer"
    >
        <div 
          ref={ref} 
          className={`w-full h-[550px] overflow-hidden ${project.borderRadius} mb-6 relative bg-[#F4F0EC] dark:bg-darkCard`}
        >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
            <MotionDiv style={{ y, scale }} className="w-full h-full">
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
            </MotionDiv>
        </div>
        <div className="flex justify-between items-end">
            <div>
                <h3 className="font-serif text-2xl text-secondary dark:text-white mb-1">{project.title}</h3>
                <p className="text-textGray dark:text-gray-400">{project.category}</p>
            </div>
            <MotionDiv 
                whileHover={{ scale: 1.2, rotate: -45 }}
                className="w-16 h-16 rounded-full bg-[#F4F0EC] dark:bg-darkCard flex items-center justify-center text-secondary dark:text-white group-hover:bg-primary group-hover:text-white transition-all duration-300"
            >
                <ChevronRight className="w-6 h-6" />
            </MotionDiv>
        </div>
    </MotionDiv>
  );
};

export const Projects: React.FC = () => {
  const categories = ['All', 'Art Modern', 'Minimalist', 'Modern', 'Scandinavian'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="projects">
        <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-6xl text-secondary dark:text-white mb-4">Follow Our Projects</h2>
            <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto text-lg">
                It is a long established fact that a reader will be distracted by the of readable content of page lookings at its layouts points.
            </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
                <MotionButton
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 py-3 rounded-[18px] font-bold transition-all border ${
                        activeCategory === cat 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white dark:bg-transparent text-secondary dark:text-white border-[#CDA274] hover:bg-[#CDA274] hover:text-white'
                    }`}
                >
                    {cat}
                </MotionButton>
            ))}
        </div>

        <MotionDiv 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20"
        >
            <AnimatePresence mode='popLayout'>
                {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </AnimatePresence>
        </MotionDiv>
    </section>
  );
};