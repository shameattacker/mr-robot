
import React from 'react';
import { motion } from 'framer-motion';
import { NotebookPen, Lightbulb, DraftingCompass, Award } from 'lucide-react';

const MotionDiv = motion.div as any;

const STEPS = [
  {
    id: '01',
    title: 'Concept & Details',
    desc: 'It is a long established fact  will be distracted. Lorem Ipsum is simply dummy from text of the and typesetting indufstry.',
    image: 'https://placehold.co/400x350/1a1a1a/ffffff?text=?',
    icon: NotebookPen
  },
  {
    id: '02',
    title: 'Idea for Work',
    desc: 'It is a long established fact  will be distracted. Lorem Ipsum is simply dummy from text of the and typesetting indufstry.',
    image: 'https://placehold.co/400x350/1a1a1a/ffffff?text=?',
    icon: Lightbulb
  },
  {
    id: '03',
    title: 'Design & Execution',
    desc: 'It is a long established fact  will be distracted. Lorem Ipsum is simply dummy from text of the and typesetting indufstry.',
    image: 'https://placehold.co/400x350/1a1a1a/ffffff?text=?',
    icon: DraftingCompass
  },
  {
    id: '04',
    title: 'Perfection',
    desc: 'It is a long established fact  will be distracted. Lorem Ipsum is simply dummy from text of the and typesetting indufstry.',
    image: 'https://placehold.co/400x350/1a1a1a/ffffff?text=?',
    icon: Award
  }
];

export const Process: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="process">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Work Process</h2>
        <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
          We follow a simple but effective process to ensure every project is completed to perfection.
        </p>
      </div>

      <div className="space-y-12">
        {STEPS.map((step, index) => (
          <MotionDiv 
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="w-full md:w-1/2 relative">
               <div className="absolute top-0 right-0 -mr-4 -mt-4 text-8xl font-serif text-white/5 font-bold z-0 pointer-events-none">
                 {step.id}
               </div>
               <img 
                src={step.image} 
                alt={step.title} 
                className="w-full h-[350px] object-cover rounded-3xl md:rounded-[50px] md:rounded-tr-none z-10 relative shadow-lg"
               />
            </div>
            
            <div className="w-full md:w-1/2 md:p-8">
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 flex items-center justify-center text-primary">
                    <step.icon size={40} strokeWidth={1.5} />
                 </div>
                 <span className="font-serif text-4xl font-bold text-white/10">{step.id}</span>
               </div>
               
               <h3 className="font-serif text-3xl text-secondary dark:text-white mb-4">{step.title}</h3>
               <p className="text-textGray dark:text-gray-400 text-lg leading-relaxed">
                 {step.desc}
               </p>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};
