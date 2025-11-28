import React, { useState } from 'react';
import { ArrowRight, Plus, PenTool, Armchair, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartItem } from '../types';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface ServicesProps {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

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

export const Services: React.FC<ServicesProps> = ({ onAddToCart }) => {
  const services = [
    { 
      id: "srv_1",
      title: "Interior Design", 
      desc: "Full-scale interior design consultation including mood boards and 3D renders.",
      price: 1500,
      Icon: PenTool
    },
    { 
      id: "srv_2",
      title: "Furniture Set", 
      desc: "Curated luxury furniture set for living rooms. Includes sofa, coffee table, and 2 armchairs.",
      price: 3500,
      Icon: Armchair
    },
    { 
      id: "srv_3",
      title: "Flooring Install", 
      desc: "Premium hardwood or marble flooring installation. Price per room.",
      price: 2200,
      Icon: Hammer
    },
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32 relative" id="services">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <MotionDiv 
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <SpotlightCard className="h-full group hover:-translate-y-2 transition-transform duration-500">
                <div className="p-10 flex flex-col h-full text-center">
                    <div className="text-primary mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                        <service.Icon size={48} strokeWidth={1} />
                    </div>
                    
                    <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-primary transition-colors duration-300">
                        {service.title}
                    </h3>
                    
                    <p className="font-sans text-gray-400 mb-8 leading-relaxed flex-1">
                        {service.desc}
                    </p>
                    
                    <div className="mt-auto">
                      <div className="text-3xl font-serif text-primary mb-6 font-bold">${service.price}</div>
                      
                      <MotionButton 
                          onClick={() => onAddToCart({ id: service.id, title: service.title, price: service.price })}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-3 bg-white/5 hover:bg-primary text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 mb-4 border border-white/10 hover:border-transparent"
                      >
                          <Plus size={18} /> Add to Cart
                      </MotionButton>
                      
                      <button className="flex items-center gap-2 mx-auto text-sm text-gray-500 hover:text-white transition-colors group-hover:translate-x-1 duration-300">
                          Read More <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                </div>
            </SpotlightCard>
          </MotionDiv>
        ))}
      </div>
    </section>
  );
};