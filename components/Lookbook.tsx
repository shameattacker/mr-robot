import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ShoppingBag, Tag } from 'lucide-react';
import { CartItem } from '../types';

const MotionDiv = motion.div as any;

interface LookbookProps {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

interface Hotspot {
  id: string;
  title: string;
  price: number;
  x: number;
  y: number;
  description: string;
  image?: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'lb_1',
    title: 'Artemide Table Lamp',
    price: 450,
    x: 68,
    y: 45,
    description: 'Classic mid-century modern lighting design.',
    image: 'https://placehold.co/300x300/1a1a1a/ffffff?text=?'
  },
  {
    id: 'lb_2',
    title: 'Velvet Accent Chair',
    price: 1200,
    x: 85,
    y: 75,
    description: 'Premium Italian velvet with gold-plated legs.',
    image: 'https://placehold.co/300x300/1a1a1a/ffffff?text=?'
  },
  {
    id: 'lb_3',
    title: 'Abstract Wall Art',
    price: 890,
    x: 45,
    y: 25,
    description: 'Hand-painted canvas, framed in oak.',
    image: 'https://placehold.co/300x300/1a1a1a/ffffff?text=?'
  },
  {
    id: 'lb_4',
    title: 'Minimalist Coffee Table',
    price: 650,
    x: 40,
    y: 70,
    description: 'Solid walnut wood with matte finish.',
    image: 'https://placehold.co/300x300/1a1a1a/ffffff?text=?'
  }
];

export const Lookbook: React.FC<LookbookProps> = ({ onAddToCart }) => {
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Shop The Look</h2>
        <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
            Hover over the items to discover details and add them directly to your design collection.
        </p>
      </div>

      <div className="relative w-full h-[500px] md:h-[700px] rounded-[40px] overflow-hidden shadow-2xl group">
        <img 
          src="https://placehold.co/1600x900/1a1a1a/ffffff?text=?" 
          alt="Shoppable Interior" 
          className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none"></div>

        <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 pointer-events-none animate-pulse">
            <Tag size={16} /> Hover dots to shop
        </div>

        {HOTSPOTS.map((spot) => (
            <div
                key={spot.id}
                className="absolute z-20"
                style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
            >
                <MotionDiv
                    className="relative group/spot"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", delay: 0.5 }}
                >
                    <div className="w-8 h-8 -ml-4 -mt-4 relative cursor-pointer">
                        <span className="absolute inset-0 rounded-full bg-white animate-ping opacity-75"></span>
                        <span className="absolute inset-0 rounded-full border-2 border-white bg-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:bg-primary hover:border-primary transition-colors"></span>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Plus size={14} className="text-white" />
                        </div>
                    </div>

                    <div className="absolute left-1/2 bottom-full mb-4 -translate-x-1/2 w-64 opacity-0 invisible group-hover/spot:opacity-100 group-hover/spot:visible transition-all duration-300 transform translate-y-4 group-hover/spot:translate-y-0">
                         <div className="bg-white dark:bg-darkCard p-3 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden">
                            <div className="h-32 w-full rounded-xl overflow-hidden mb-3 relative">
                                <img src={spot.image} alt={spot.title} className="w-full h-full object-cover" />
                                <div className="absolute top-2 right-2 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-lg backdrop-blur-md">
                                    ${spot.price}
                                </div>
                            </div>

                            <h3 className="font-serif text-lg text-secondary dark:text-white leading-tight mb-1">{spot.title}</h3>
                            <p className="text-xs text-textGray dark:text-gray-400 mb-3 line-clamp-2">{spot.description}</p>

                            <button 
                                onClick={() => onAddToCart({ id: spot.id, title: spot.title, price: spot.price, image: spot.image })}
                                className="w-full py-2 bg-primary text-white text-sm font-bold rounded-xl hover:bg-secondary transition-colors flex items-center justify-center gap-2 active:scale-95"
                            >
                                <ShoppingBag size={14} /> Add to Cart
                            </button>
                            
                            <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-darkCard rotate-45 border-b border-r border-gray-100 dark:border-gray-700"></div>
                         </div>
                    </div>
                </MotionDiv>
            </div>
        ))}
      </div>
    </section>
  );
};