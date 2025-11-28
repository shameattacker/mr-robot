
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutTemplate, RotateCw, Trash2, Save, 
  MousePointer2, Grid3X3, Download, Maximize, 
  Undo, Redo, Square, Circle
} from 'lucide-react';

type FurnitureType = 'sofa' | 'chair' | 'table' | 'bed' | 'door' | 'window' | 'plant' | 'wall';

interface PlanItem {
  id: string;
  type: FurnitureType;
  x: number;
  y: number;
  rotation: number;
  width: number;
  height: number;
}

const FURNITURE_LIB: { type: FurnitureType; label: string; w: number; h: number; icon: any }[] = [
  { type: 'wall', label: 'Wall Block', w: 100, h: 10, icon: Square },
  { type: 'door', label: 'Door Swing', w: 60, h: 60, icon: LayoutTemplate },
  { type: 'window', label: 'Window', w: 60, h: 10, icon: Square },
  { type: 'sofa', label: '3-Seat Sofa', w: 120, h: 50, icon: Square },
  { type: 'chair', label: 'Armchair', w: 50, h: 50, icon: Square },
  { type: 'table', label: 'Dining Table', w: 100, h: 60, icon: Square },
  { type: 'bed', label: 'Queen Bed', w: 100, h: 120, icon: Square },
  { type: 'plant', label: 'Plant', w: 30, h: 30, icon: Circle },
];

export const RoomPlanner: React.FC = () => {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [showGrid, setShowGrid] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedId) return;

      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'r' || e.key === 'R') {
        handleRotate();
      } else if (e.key === 'ArrowUp') {
        moveItem(0, -10);
      } else if (e.key === 'ArrowDown') {
        moveItem(0, 10);
      } else if (e.key === 'ArrowLeft') {
        moveItem(-10, 0);
      } else if (e.key === 'ArrowRight') {
        moveItem(10, 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, items]);

  const addItem = (type: FurnitureType, w: number, h: number) => {
    const newItem: PlanItem = {
      id: `item-${Date.now()}`,
      type,
      x: 50,
      y: 50,
      rotation: 0,
      width: w,
      height: h
    };
    setItems([...items, newItem]);
    setSelectedId(newItem.id);
  };

  const updateItemPosition = (id: string, x: number, y: number) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, x, y } : item));
  };

  const moveItem = (dx: number, dy: number) => {
    setItems(prev => prev.map(item => item.id === selectedId ? { ...item, x: item.x + dx, y: item.y + dy } : item));
  };

  const handleRotate = () => {
    if (!selectedId) return;
    setItems(prev => prev.map(item => item.id === selectedId ? { ...item, rotation: (item.rotation + 45) % 360 } : item));
  };

  const handleDelete = () => {
    if (!selectedId) return;
    setItems(prev => prev.filter(item => item.id !== selectedId));
    setSelectedId(null);
  };

  const renderShape = (item: PlanItem) => {
    const isSelected = selectedId === item.id;
    const strokeColor = isSelected ? '#CDA274' : '#4D5053';
    const fillColor = isSelected ? 'rgba(205, 162, 116, 0.2)' : 'transparent';

    switch (item.type) {
      case 'sofa':
        return (
          <svg width="100%" height="100%" viewBox="0 0 120 50" preserveAspectRatio="none">
            <rect x="0" y="0" width="120" height="50" rx="5" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <rect x="0" y="0" width="20" height="50" rx="2" fill="none" stroke={strokeColor} strokeWidth="2" />
            <rect x="100" y="0" width="20" height="50" rx="2" fill="none" stroke={strokeColor} strokeWidth="2" />
            <rect x="0" y="35" width="120" height="15" rx="2" fill="none" stroke={strokeColor} strokeWidth="2" />
          </svg>
        );
      case 'table':
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 60" preserveAspectRatio="none">
            <rect x="0" y="0" width="100" height="60" rx="2" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <circle cx="50" cy="30" r="10" fill="none" stroke={strokeColor} strokeWidth="1" />
          </svg>
        );
      case 'door':
        return (
          <svg width="100%" height="100%" viewBox="0 0 60 60">
            <path d="M0,60 L0,0 A 60,60 0 0,1 60,60 L0,60" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
            <line x1="0" y1="60" x2="0" y2="0" stroke={strokeColor} strokeWidth="4" />
          </svg>
        );
      case 'plant':
        return (
          <svg width="100%" height="100%" viewBox="0 0 30 30">
             <circle cx="15" cy="15" r="14" fill={fillColor} stroke={strokeColor} strokeWidth="2" />
             <path d="M15,15 L5,5 M15,15 L25,5 M15,15 L5,25 M15,15 L25,25" stroke={strokeColor} strokeWidth="1" />
          </svg>
        );
      case 'wall':
        return (
          <div className={`w-full h-full bg-gray-600 ${isSelected ? 'ring-2 ring-primary' : ''}`}></div>
        );
      default:
        return (
          <div className={`w-full h-full border-2 ${isSelected ? 'border-primary bg-primary/20' : 'border-gray-500'} flex items-center justify-center`}>
             <span className="text-[10px] uppercase tracking-wider">{item.type}</span>
          </div>
        );
    }
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="planner">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Interactive Floor Planner</h2>
        <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
           Design your layout. Drag furniture, rotate items, and plan your space with our professional blueprint tool.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[700px] bg-[#1e1e1e] rounded-[30px] overflow-hidden border border-white/10 shadow-2xl">
        <div className="w-full lg:w-64 bg-[#252525] border-r border-white/5 flex flex-col">
            <div className="p-4 border-b border-white/5">
                <h3 className="text-white font-serif font-bold">Library</h3>
                <p className="text-xs text-gray-500">Drag items to canvas</p>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 grid grid-cols-2 gap-3 content-start">
                {FURNITURE_LIB.map((item) => (
                    <button
                        key={item.type}
                        onClick={() => addItem(item.type, item.w, item.h)}
                        className="aspect-square bg-[#1e1e1e] hover:bg-primary/20 border border-white/5 hover:border-primary rounded-xl flex flex-col items-center justify-center gap-2 transition-all group"
                    >
                        <item.icon size={24} className="text-gray-400 group-hover:text-primary" />
                        <span className="text-[10px] text-gray-400 group-hover:text-white font-medium">{item.label}</span>
                    </button>
                ))}
            </div>

            <div className="p-4 border-t border-white/5 text-xs text-gray-500">
                Shortcuts: <br/>
                <span className="text-white font-mono">R</span> to Rotate <br/>
                <span className="text-white font-mono">DEL</span> to Remove
            </div>
        </div>

        <div className="flex-1 relative bg-[#151515] overflow-hidden flex flex-col">
            <div className="h-12 border-b border-white/5 flex items-center justify-between px-4 bg-[#1e1e1e]">
                <div className="flex gap-2">
                    <button 
                        onClick={() => setShowGrid(!showGrid)}
                        className={`p-2 rounded hover:bg-white/10 ${showGrid ? 'text-primary' : 'text-gray-400'}`} 
                        title="Toggle Grid"
                    >
                        <Grid3X3 size={18} />
                    </button>
                    <div className="w-px h-6 bg-white/10 my-auto mx-2"></div>
                    <button className="p-2 rounded hover:bg-white/10 text-gray-400" title="Undo"><Undo size={18} /></button>
                    <button className="p-2 rounded hover:bg-white/10 text-gray-400" title="Redo"><Redo size={18} /></button>
                </div>
                <div className="text-xs text-gray-500 font-mono">
                    {items.length} Items | Scale: 1px = 1cm
                </div>
            </div>

            <div 
                ref={constraintsRef}
                className="flex-1 relative overflow-hidden cursor-crosshair"
                onClick={() => setSelectedId(null)}
            >
                {showGrid && (
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                )}
                {showGrid && (
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:100px_100px]"></div>
                )}

                <AnimatePresence>
                    {items.map((item) => (
                        <motion.div
                            key={item.id}
                            drag
                            dragMomentum={false}
                            dragConstraints={constraintsRef}
                            onDragStart={() => setSelectedId(item.id)}
                            animate={{ 
                                rotate: item.rotation,
                                borderColor: selectedId === item.id ? '#CDA274' : 'transparent'
                            }}
                            style={{
                                width: item.width,
                                height: item.height,
                                x: item.x,
                                y: item.y,
                                position: 'absolute',
                                zIndex: selectedId === item.id ? 10 : 1
                            }}
                            className={`flex items-center justify-center group cursor-move`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedId(item.id);
                            }}
                        >
                            {renderShape(item)}
                            
                            {selectedId === item.id && (
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-110 text-black"
                                     onClick={(e) => { e.stopPropagation(); handleRotate(); }}
                                >
                                    <RotateCw size={12} />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>

        <div className="w-full lg:w-64 bg-[#252525] border-l border-white/5 p-4 flex flex-col">
            <h3 className="text-white font-serif font-bold mb-4">Properties</h3>
            
            {selectedId ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                        <div className="text-xs text-gray-500 uppercase mb-1">Selected Item</div>
                        <div className="text-primary font-bold text-lg capitalize">
                            {items.find(i => i.id === selectedId)?.type}
                        </div>
                        <div className="text-xs text-gray-400 font-mono mt-1">ID: {selectedId.split('-')[1]}</div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-gray-400">Rotation</label>
                            <div className="flex items-center gap-2">
                                <button onClick={handleRotate} className="p-2 bg-white/5 hover:bg-white/10 rounded text-white">
                                    <RotateCw size={16} />
                                </button>
                                <span className="text-white font-mono w-8 text-center">
                                    {items.find(i => i.id === selectedId)?.rotation}°
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-gray-400">Width</label>
                            <span className="text-white font-mono">{items.find(i => i.id === selectedId)?.width}cm</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="text-sm text-gray-400">Depth</label>
                            <span className="text-white font-mono">{items.find(i => i.id === selectedId)?.height}cm</span>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <button 
                            onClick={handleDelete}
                            className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl flex items-center justify-center gap-2 transition-colors"
                        >
                            <Trash2 size={18} /> Remove Item
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-500 text-center opacity-50">
                    <MousePointer2 size={48} className="mb-4" />
                    <p>Select an item on the canvas to edit properties</p>
                </div>
            )}

            <div className="mt-auto pt-4">
                <button className="w-full py-3 bg-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-secondary transition-colors">
                    <Save size={18} /> Export Blueprint
                </button>
            </div>
        </div>
      </div>
    </section>
  );
};
