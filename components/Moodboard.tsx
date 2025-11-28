
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, RefreshCw, Download, Trash2, Plus, GripVertical, Palette, Armchair, Image as ImageIcon } from 'lucide-react';

type ItemType = 'furniture' | 'color' | 'decor';

interface BoardItem {
  id: string;
  type: ItemType;
  content: string;
  x: number;
  y: number;
  rotation: number;
}

interface MoodboardProps {
    onSave?: () => void;
}

const ASSETS = {
  furniture: [
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507473888900-52e1adad5420?q=80&w=200&auto=format&fit=crop',
  ],
  decor: [
    'https://images.unsplash.com/photo-1513506003011-3b032f737104?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=200&auto=format&fit=crop',
  ],
  color: [
    '#CDA274',
    '#292F36',
    '#E6D6C3',
    '#8C7B70',
    '#5C5C5C',
    '#9BA6A5',
  ]
};

export const Moodboard: React.FC<MoodboardProps> = ({ onSave }) => {
  const [items, setItems] = useState<BoardItem[]>([]);
  const [activeTab, setActiveTab] = useState<ItemType>('furniture');
  const [isSaving, setIsSaving] = useState(false);
  const constraintsRef = useRef(null);

  const addItem = (type: ItemType, content: string) => {
    const newItem: BoardItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      type,
      content,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: (Math.random() - 0.5) * 20
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const clearBoard = () => setItems([]);

  const magicShuffle = () => {
    clearBoard();
    setTimeout(() => addItem('furniture', ASSETS.furniture[Math.floor(Math.random() * ASSETS.furniture.length)]), 100);
    setTimeout(() => addItem('color', ASSETS.color[Math.floor(Math.random() * ASSETS.color.length)]), 200);
    setTimeout(() => addItem('decor', ASSETS.decor[Math.floor(Math.random() * ASSETS.decor.length)]), 300);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
        setIsSaving(false);
        if (onSave) onSave();
    }, 2000);
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="creative-canvas">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Creative Canvas</h2>
        <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
          Unleash your inner designer. Drag, drop, and arrange elements to visualize your dream moodboard.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-[800px] lg:h-[700px]">
        <div className="w-full lg:w-80 bg-white dark:bg-darkCard rounded-[30px] p-6 flex flex-col shadow-xl border border-gray-100 dark:border-white/5">
            <div className="flex gap-2 mb-6 bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
                {[
                    { id: 'furniture', icon: Armchair },
                    { id: 'color', icon: Palette },
                    { id: 'decor', icon: ImageIcon }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as ItemType)}
                        className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${
                            activeTab === tab.id 
                            ? 'bg-white dark:bg-primary text-secondary dark:text-white shadow-sm' 
                            : 'text-gray-400 hover:text-secondary dark:hover:text-white'
                        }`}
                    >
                        <tab.icon size={18} />
                    </button>
                ))}
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 px-1">
                <h3 className="text-xs font-bold uppercase text-gray-400 tracking-widest mb-2">
                    {activeTab === 'color' ? 'Swatches' : 'Assets'}
                </h3>
                
                <div className={`grid ${activeTab === 'color' ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
                    {ASSETS[activeTab].map((asset, idx) => (
                        <motion.button
                            key={idx}
                            layoutId={`sidebar-${activeTab}-${idx}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addItem(activeTab, asset)}
                            className={`relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-white/5 group ${
                                activeTab === 'color' ? 'aspect-square' : 'aspect-[3/4]'
                            }`}
                            style={{ backgroundColor: activeTab === 'color' ? asset : 'white' } as any}
                        >
                            {activeTab !== 'color' && (
                                <img src={asset} alt="Asset" className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <Plus className="text-white drop-shadow-md" />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 space-y-3">
                <button 
                    onClick={magicShuffle}
                    className="w-full py-3 bg-secondary dark:bg-white/10 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                >
                    <RefreshCw size={16} /> Magic Shuffle
                </button>
                <div className="flex gap-3">
                    <button 
                        onClick={clearBoard}
                        className="flex-1 py-3 border border-red-200 dark:border-red-900/30 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                        <Trash2 size={16} /> Clear
                    </button>
                    <button 
                        onClick={handleSave}
                        className="flex-1 py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
                    >
                        {isSaving ? <RefreshCw className="animate-spin" size={16}/> : <Download size={16} />} 
                        Save
                    </button>
                </div>
            </div>
        </div>

        <div 
            ref={constraintsRef}
            className="flex-1 bg-[#F4F0EC] dark:bg-[#1a1a1a] rounded-[30px] relative overflow-hidden shadow-inner border-2 border-dashed border-gray-300 dark:border-white/10 group"
        >
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>
            
            {items.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300 dark:text-white/10 pointer-events-none">
                    <Layout size={64} className="mb-4" />
                    <p className="text-xl font-serif">Your canvas is empty</p>
                    <p className="text-sm">Click items on the left to add them</p>
                </div>
            )}

            <AnimatePresence>
                {items.map((item) => (
                    <motion.div
                        key={item.id}
                        drag
                        dragConstraints={constraintsRef}
                        dragMomentum={false}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                            scale: 1, 
                            opacity: 1, 
                            rotate: item.rotation,
                            x: item.x,
                            y: item.y
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileDrag={{ scale: 1.1, zIndex: 50, rotate: 0, cursor: 'grabbing' }}
                        whileHover={{ zIndex: 40, scale: 1.02 }}
                        className="absolute top-1/4 left-1/4 cursor-grab group/item"
                    >
                        <button 
                            onClick={() => removeItem(item.id)}
                            className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity shadow-md z-10 hover:scale-110"
                        >
                            <XIcon size={12} />
                        </button>

                        {item.type === 'color' ? (
                            <div className="p-2 bg-white shadow-xl rounded-lg rotate-3">
                                <div 
                                    className="w-24 h-24 rounded-md"
                                    style={{ backgroundColor: item.content }}
                                ></div>
                                <div className="mt-2 text-[10px] font-mono text-gray-400 text-center uppercase">{item.content}</div>
                            </div>
                        ) : (
                            <div className="p-3 bg-white shadow-xl rounded-xl">
                                <div className="w-32 md:w-40 rounded-lg overflow-hidden bg-gray-50">
                                    <img src={item.content} alt="Moodboard Item" className="w-full h-auto object-cover pointer-events-none" />
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const XIcon = ({ size }: { size: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
