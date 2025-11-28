
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Thermometer, Wind, Power, Zap } from 'lucide-react';

export const SmartHome: React.FC = () => {
  const [brightness, setBrightness] = useState(80);
  const [temp, setTemp] = useState(72);
  const [colorTemp, setColorTemp] = useState(50);
  const [isCurtainsOpen, setIsCurtainsOpen] = useState(true);
  const [isActive, setIsActive] = useState(true);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32">
      <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Smart Living Experience</h2>
        <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
           We integrate cutting-edge IoT technology into your design. Try controlling this room.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 relative rounded-[40px] overflow-hidden h-[500px] shadow-2xl group border border-white/5">
           <img 
              src="https://placehold.co/1200x800/1a1a1a/ffffff?text=SMART+BEDROOM+PREVIEW" 
              alt="Smart Bedroom" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
           />

           <div 
              className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
              style={{ opacity: isActive ? 1 - (brightness / 100) : 0.9 }}
           ></div>

           <div 
              className="absolute inset-0 pointer-events-none transition-colors duration-500 mix-blend-overlay"
              style={{ 
                  backgroundColor: isActive 
                    ? `rgba(${255 - (colorTemp * 0.5)}, ${200 + (colorTemp * 0.5)}, ${255}, 0.2)` 
                    : 'transparent' 
              }}
           ></div>
           
           <div 
              className="absolute inset-0 bg-orange-500 pointer-events-none transition-opacity duration-500 mix-blend-soft-light"
              style={{ opacity: isActive ? (100 - colorTemp) / 200 : 0 }}
           ></div>

           <div className={`absolute inset-y-0 left-0 bg-[#1a1a1a] transition-all duration-1000 ease-in-out z-10 ${isCurtainsOpen ? 'w-0' : 'w-1/2'}`}>
              <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/vertical-cloth.png')] opacity-30"></div>
           </div>
           <div className={`absolute inset-y-0 right-0 bg-[#1a1a1a] transition-all duration-1000 ease-in-out z-10 ${isCurtainsOpen ? 'w-0' : 'w-1/2'}`}>
              <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/vertical-cloth.png')] opacity-30"></div>
           </div>
           
           <div className="absolute top-6 left-6 flex gap-3">
              <div className={`px-3 py-1 rounded-full backdrop-blur-md border text-xs font-bold flex items-center gap-2 ${isActive ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-red-500/20 border-red-500/30 text-red-400'}`}>
                 <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                 SYSTEM {isActive ? 'ONLINE' : 'OFFLINE'}
              </div>
              {isActive && (
                  <div className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold flex items-center gap-2">
                    <Thermometer size={12} /> {temp}°F
                  </div>
              )}
           </div>
        </div>

        <div className="premium-glass rounded-[40px] p-8 flex flex-col justify-between">
           <div className="flex justify-between items-center mb-8">
              <div>
                  <h3 className="text-2xl font-serif text-secondary dark:text-white">Master Bedroom</h3>
                  <p className="text-sm text-gray-500">Smart Controller</p>
              </div>
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg ${isActive ? 'bg-primary text-white shadow-primary/30' : 'bg-gray-800 text-gray-500'}`}
              >
                 <Power size={20} />
              </button>
           </div>

           <div className={`space-y-8 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
              <div>
                 <div className="flex justify-between text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    <span>Brightness</span>
                    <span>{brightness}%</span>
                 </div>
                 <div className="h-12 bg-white/5 rounded-2xl relative flex items-center px-4 group border border-white/5">
                    <Sun size={18} className="text-gray-400 mr-3" />
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                 </div>
              </div>

              <div>
                 <div className="flex justify-between text-sm font-bold text-gray-400 mb-2 uppercase tracking-wider">
                    <span>Ambiance</span>
                    <span>{colorTemp < 50 ? 'Warm' : 'Cool'}</span>
                 </div>
                 <div className="h-12 bg-white/5 rounded-2xl relative flex items-center px-4 border border-white/5">
                    <span className="w-4 h-4 rounded-full bg-orange-400 mr-3"></span>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={colorTemp}
                        onChange={(e) => setColorTemp(Number(e.target.value))}
                        className="w-full h-1 bg-gradient-to-r from-orange-400 to-blue-400 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <span className="w-4 h-4 rounded-full bg-blue-400 ml-3"></span>
                 </div>
              </div>

              <div>
                 <div className="flex justify-between text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                    <span>Climate Control</span>
                 </div>
                 <div className="flex items-center justify-between gap-4">
                    <button 
                        onClick={() => setTemp(t => t - 1)}
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-white/5"
                    >-</button>
                    <div className="text-3xl font-serif text-secondary dark:text-white">{temp}°</div>
                    <button 
                        onClick={() => setTemp(t => t + 1)}
                        className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-colors border border-white/5"
                    >+</button>
                 </div>
              </div>

              <button 
                onClick={() => setIsCurtainsOpen(!isCurtainsOpen)}
                className="w-full py-4 rounded-2xl bg-white/5 flex items-center justify-between px-6 hover:bg-white/10 transition-colors border border-white/5 hover:border-primary/30"
              >
                 <span className="font-bold text-secondary dark:text-white flex items-center gap-3">
                    <Wind size={18} className="text-primary" /> Smart Curtains
                 </span>
                 <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${isCurtainsOpen ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>
                    {isCurtainsOpen ? 'Open' : 'Closed'}
                 </span>
              </button>

           </div>
           
           <div className="mt-8 pt-6 border-t border-white/10">
               <div className="flex items-center justify-between text-xs text-gray-500">
                   <span className="flex items-center gap-1"><Zap size={12}/> Energy Saving Mode</span>
                   <span>Auto-off: 11:00 PM</span>
               </div>
           </div>
        </div>

      </div>
    </section>
  );
};
