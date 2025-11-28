
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram } from 'lucide-react';

const MotionDiv = motion.div as any;

const TEAM = [
  {
    id: 1,
    name: "David Knight",
    role: "Principal Architect",
    image: "https://placehold.co/600x800/1a1a1a/ffffff?text=?",
    socials: ["#", "#", "#"]
  },
  {
    id: 2,
    name: "Sarah Jenson",
    role: "Senior Interior Designer",
    image: "https://placehold.co/600x800/1a1a1a/ffffff?text=?",
    socials: ["#", "#", "#"]
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Project Manager",
    image: "https://placehold.co/600x800/1a1a1a/ffffff?text=?",
    socials: ["#", "#", "#"]
  },
  {
    id: 4,
    name: "Emily Davis",
    role: "Furniture Specialist",
    image: "https://placehold.co/600x800/1a1a1a/ffffff?text=?",
    socials: ["#", "#", "#"]
  }
];

export const Team: React.FC = () => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="team">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Meet Our Experts</h2>
        <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
          Our team of creative minds who make magic happen.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM.map((member, index) => (
          <MotionDiv
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            className="group premium-glass rounded-[30px] overflow-hidden shadow-lg"
          >
            <div className="relative h-80 overflow-hidden">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                <a href="#" className="p-3 bg-white text-primary rounded-full hover:bg-secondary hover:text-white transition-colors"><Linkedin size={18} /></a>
                <a href="#" className="p-3 bg-white text-primary rounded-full hover:bg-secondary hover:text-white transition-colors"><Twitter size={18} /></a>
                <a href="#" className="p-3 bg-white text-primary rounded-full hover:bg-secondary hover:text-white transition-colors"><Instagram size={18} /></a>
              </div>
            </div>

            <div className="p-6 text-center bg-transparent relative z-10">
              <h3 className="font-serif text-xl text-secondary dark:text-white mb-1">{member.name}</h3>
              <p className="text-textGray dark:text-gray-400 text-sm uppercase tracking-wider">{member.role}</p>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};
