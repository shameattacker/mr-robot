import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Calculator, Check, DollarSign, Ruler, Sparkles } from 'lucide-react';

const MotionDiv = motion.div as any;

export const Estimator: React.FC = () => {
  const [roomType, setRoomType] = useState('living');
  const [area, setArea] = useState(500);
  const [quality, setQuality] = useState('premium');
  const [total, setTotal] = useState(0);
  const controls = useAnimation();

  const rates: Record<string, number> = {
    living: 15,
    kitchen: 35,
    bedroom: 20,
    bathroom: 45
  };

  const qualityMultipliers: Record<string, number> = {
    standard: 1,
    premium: 1.8,
    ultra: 3.5
  };

  useEffect(() => {
    const basePrice = area * rates[roomType];
    const finalPrice = basePrice * qualityMultipliers[quality];
    setTotal(Math.round(finalPrice));
    
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 0.2 }
    });
  }, [roomType, area, quality]);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="estimate">
      <div className="premium-glass rounded-[50px] overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                        <Calculator size={24} />
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl text-white">Project Estimator</h2>
                </div>
                <p className="text-gray-400 mb-10">Calculate the approximate cost of your dream renovation instantly.</p>

                <div className="mb-8">
                    <label className="text-xs font-bold uppercase text-gray-500 mb-3 block tracking-wider">Room Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['living', 'kitchen', 'bedroom', 'bathroom'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setRoomType(type)}
                                className={`py-3 px-2 rounded-xl text-sm font-bold capitalize transition-all border-2 ${
                                    roomType === type 
                                    ? 'border-primary bg-primary/10 text-primary' 
                                    : 'border-white/5 bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-10">
                    <div className="flex justify-between mb-3">
                         <label className="text-xs font-bold uppercase text-gray-500 tracking-wider">Total Area</label>
                         <span className="text-white font-mono">{area} sq.ft</span>
                    </div>
                    <div className="relative h-2 bg-white/10 rounded-full">
                         <input 
                            type="range" 
                            min="100" 
                            max="2000" 
                            step="50"
                            value={area}
                            onChange={(e) => setArea(Number(e.target.value))}
                            className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                         />
                         <div 
                            className="absolute h-full bg-primary rounded-full pointer-events-none z-10"
                            style={{ width: `${((area - 100) / 1900) * 100}%` }}
                         />
                         <div 
                            className="absolute h-6 w-6 bg-white rounded-full shadow-lg top-1/2 -translate-y-1/2 z-10 pointer-events-none transition-all"
                            style={{ left: `${((area - 100) / 1900) * 100}%`, transform: `translate(-50%, -50%)` }}
                         />
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold uppercase text-gray-500 mb-3 block tracking-wider">Finishing Quality</label>
                    <div className="flex flex-col gap-3">
                        {[
                            { id: 'standard', label: 'Standard', desc: 'Quality basics, practical materials.' },
                            { id: 'premium', label: 'Premium', desc: 'High-end finishes, custom carpentry.' },
                            { id: 'ultra', label: 'Ultra Luxury', desc: 'Imported marble, smart home integration.' }
                        ].map((q) => (
                            <button
                                key={q.id}
                                onClick={() => setQuality(q.id)}
                                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left group ${
                                    quality === q.id 
                                    ? 'border-primary bg-primary/10' 
                                    : 'border-white/5 bg-white/5 hover:border-white/20'
                                }`}
                            >
                                <div>
                                    <div className={`font-bold ${quality === q.id ? 'text-white' : 'text-gray-300'}`}>{q.label}</div>
                                    <div className="text-xs text-gray-500">{q.desc}</div>
                                </div>
                                {quality === q.id && (
                                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                        <Check size={14} className="text-white" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-primary/90 to-[#b08b62]/90 backdrop-blur-md p-10 md:p-16 flex flex-col justify-between text-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                 <div className="absolute top-10 right-10 opacity-20 animate-pulse">
                     <Sparkles size={100} />
                 </div>

                 <div>
                     <h3 className="text-xl font-serif opacity-90 mb-2">Estimated Total</h3>
                     <p className="text-sm opacity-70">Based on market averages. Does not include furniture.</p>
                 </div>

                 <MotionDiv 
                    animate={controls}
                    className="my-10"
                 >
                     <div className="text-6xl md:text-7xl font-serif font-bold flex items-start gap-2 leading-none">
                         <span className="text-3xl mt-2">$</span>
                         {total.toLocaleString()}
                     </div>
                 </MotionDiv>

                 <div className="space-y-4 text-sm font-medium">
                     <div className="flex justify-between border-b border-white/20 pb-2">
                         <span className="opacity-80 flex items-center gap-2"><Ruler size={16}/> Room Size</span>
                         <span>{area} sq.ft</span>
                     </div>
                     <div className="flex justify-between border-b border-white/20 pb-2">
                         <span className="opacity-80 flex items-center gap-2"><DollarSign size={16}/> Rate per sq.ft</span>
                         <span>${Math.round((total / area))} / sq.ft</span>
                     </div>
                 </div>

                 <button className="mt-8 w-full py-4 bg-white text-primary font-bold rounded-xl shadow-xl hover:bg-gray-50 transition-colors uppercase tracking-widest text-sm">
                     Book Consultation
                 </button>
            </div>
        </div>
      </div>
    </section>
  );
};