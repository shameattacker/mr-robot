
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingBag, ArrowRight, Ruler, Info, Layers } from 'lucide-react';
import { CartItem } from '../types';

interface ProductCustomizerProps {
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
}

const MATERIALS = [
  { id: 'velvet', name: 'Italian Velvet', priceMod: 1.2, texture: 'https://placehold.co/50x50/333333/ffffff?text=V' },
  { id: 'leather', name: 'Full Grain Leather', priceMod: 1.5, texture: 'https://placehold.co/50x50/553311/ffffff?text=L' },
  { id: 'linen', name: 'Natural Linen', priceMod: 1.0, texture: 'https://placehold.co/50x50/dddddd/000000?text=N' },
];

const COLORS = [
  { id: 'cream', name: 'Cream', hex: '#F5F5DC' },
  { id: 'charcoal', name: 'Charcoal', hex: '#36454F' },
  { id: 'emerald', name: 'Emerald', hex: '#046307' },
  { id: 'navy', name: 'Navy', hex: '#000080' },
  { id: 'cognac', name: 'Cognac', hex: '#9A463D' },
  { id: 'blush', name: 'Blush', hex: '#FEC5E5' },
];

const SIZES = [
  { id: '2-seater', name: '2 Seater', width: '180cm', basePrice: 2400 },
  { id: '3-seater', name: '3 Seater', width: '240cm', basePrice: 3200 },
  { id: 'l-shape', name: 'Sectional', width: '320cm', basePrice: 4500 },
];

export const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ onAddToCart }) => {
  const [material, setMaterial] = useState(MATERIALS[0]);
  const [color, setColor] = useState(COLORS[2]);
  const [size, setSize] = useState(SIZES[1]);
  const [showDimensions, setShowDimensions] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setTotalPrice(Math.round(size.basePrice * material.priceMod));
  }, [size, material]);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="customizer">
      <div className="text-center mb-16">
        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Bespoke Studio</span>
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Customize Your Centerpiece</h2>
        <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
           Craft the perfect sofa for your living space. Choose materials, colors, and configurations to match your style.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 premium-glass rounded-[50px] p-8 md:p-12 shadow-2xl">
        <div className="lg:col-span-2 relative min-h-[400px] bg-[#F4F0EC] dark:bg-[#1a1a1a]/50 rounded-[40px] flex items-center justify-center overflow-hidden group border border-white/5">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="relative w-full max-w-2xl aspect-[4/3] flex items-center justify-center">
                <motion.div 
                    key={size.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    <img 
                        src="https://placehold.co/800x600/1a1a1a/ffffff?text=SOFA+PREVIEW" 
                        alt="Sofa Preview" 
                        className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
                        style={{ 
                            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                        }}
                    />

                    <div 
                        className="absolute inset-0 z-20 mix-blend-color pointer-events-none transition-colors duration-500"
                        style={{ 
                            backgroundColor: color.hex,
                            opacity: 0.4
                        }}
                    ></div>
                </motion.div>

                <AnimatePresence>
                    {showDimensions && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-30 pointer-events-none"
                        >
                            <div className="absolute bottom-[15%] left-[15%] right-[15%] h-px bg-primary flex items-center justify-center">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-3 bg-primary"></div>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-3 bg-primary"></div>
                                <span className="bg-white dark:bg-black px-2 text-xs font-mono text-primary">{size.width}</span>
                            </div>
                            <div className="absolute top-[25%] bottom-[15%] right-[10%] w-px bg-primary flex items-center justify-center">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-px bg-primary"></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-px bg-primary"></div>
                                <span className="bg-white dark:bg-black px-1 py-2 text-xs font-mono text-primary [writing-mode:vertical-lr]">85cm</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute bottom-6 right-6 flex gap-3 z-40">
                <button 
                    onClick={() => setShowDimensions(!showDimensions)}
                    className={`p-3 rounded-full backdrop-blur-md transition-colors shadow-lg ${showDimensions ? 'bg-primary text-white' : 'bg-white/80 dark:bg-black/50 text-gray-600 dark:text-white'}`}
                >
                    <Ruler size={20} />
                </button>
                <div className="p-3 bg-white/80 dark:bg-black/50 rounded-full backdrop-blur-md shadow-lg text-gray-600 dark:text-white" title="3D View Coming Soon">
                    <Layers size={20} />
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-between">
            <div className="space-y-8">
                <div>
                    <h3 className="text-sm font-bold uppercase text-textGray dark:text-gray-400 mb-3 flex items-center justify-between">
                        Material Selection
                        <Info size={14} className="text-gray-400 cursor-help" />
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {MATERIALS.map((mat) => (
                            <button
                                key={mat.id}
                                onClick={() => setMaterial(mat)}
                                className={`flex items-center p-3 rounded-xl border-2 transition-all ${
                                    material.id === mat.id 
                                    ? 'border-primary bg-primary/5' 
                                    : 'border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10'
                                }`}
                            >
                                <div className="w-12 h-12 rounded-lg mr-4 bg-gray-200 shadow-inner" style={{ backgroundImage: `url(${mat.texture})` }}></div>
                                <div className="text-left flex-1">
                                    <div className="font-serif text-secondary dark:text-white">{mat.name}</div>
                                    <div className="text-xs text-gray-500">{mat.priceMod === 1 ? 'Standard' : `+${Math.round((mat.priceMod - 1) * 100)}% Premium`}</div>
                                </div>
                                {material.id === mat.id && <div className="bg-primary text-white p-1 rounded-full"><Check size={12} /></div>}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase text-textGray dark:text-gray-400 mb-3">Color Palette</h3>
                    <div className="flex flex-wrap gap-3">
                        {COLORS.map((c) => (
                            <button
                                key={c.id}
                                onClick={() => setColor(c)}
                                className={`w-10 h-10 rounded-full shadow-lg transition-transform relative ${
                                    color.id === c.id ? 'scale-110 ring-2 ring-offset-2 ring-primary dark:ring-offset-darkCard' : 'hover:scale-105'
                                }`}
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            >
                                {color.id === c.id && (
                                    <span className="absolute inset-0 flex items-center justify-center">
                                        <Check size={14} className={`drop-shadow-md ${['cream', 'blush'].includes(c.id) ? 'text-black' : 'text-white'}`} />
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                    <div className="mt-2 text-sm font-medium text-secondary dark:text-white">{color.name}</div>
                </div>

                <div>
                    <h3 className="text-sm font-bold uppercase text-textGray dark:text-gray-400 mb-3">Configuration</h3>
                    <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/5">
                        {SIZES.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setSize(s)}
                                className={`flex-1 py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                                    size.id === s.id 
                                    ? 'bg-primary text-white shadow-sm' 
                                    : 'text-gray-500 hover:text-secondary dark:hover:text-white'
                                }`}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-200 dark:border-white/10">
                <div className="flex justify-between items-end mb-6">
                    <span className="text-textGray dark:text-gray-400 mb-1 block text-sm">Total Estimate</span>
                    <motion.div 
                        key={totalPrice}
                        initial={{ scale: 1.1, color: '#CDA274' }}
                        animate={{ scale: 1, color: 'var(--tw-text-white)' }}
                        className="text-4xl font-serif text-secondary dark:text-white"
                    >
                        ${totalPrice.toLocaleString()}
                    </motion.div>
                </div>
                
                <button 
                    onClick={() => onAddToCart({ 
                        id: `custom-${Date.now()}`, 
                        title: `Custom ${size.name} Sofa`, 
                        price: totalPrice,
                        image: 'https://placehold.co/200x200/1a1a1a/ffffff?text=SOFA'
                    })}
                    className="w-full py-4 bg-secondary dark:bg-primary text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity shadow-xl flex items-center justify-center gap-3"
                >
                    <ShoppingBag size={20} /> Add Custom Piece
                </button>
                <div className="text-center mt-4">
                    <button className="text-xs text-gray-400 hover:text-primary flex items-center justify-center gap-1 mx-auto">
                        Save Configuration <ArrowRight size={10} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};
