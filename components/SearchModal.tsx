import React, { useState, useEffect } from 'react';
import { X, Search, ArrowUpRight, Mic, MicOff, Command, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, ARTICLES } from '../constants';

const MotionDiv = motion.div as any;
const MotionA = motion.a as any;

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!isOpen) {
        setQuery('');
        setResults([]);
        setIsListening(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    
    const filteredProjects = PROJECTS.filter(p => 
        p.title.toLowerCase().includes(lowerQuery) || 
        p.category.toLowerCase().includes(lowerQuery)
    ).map(p => ({ ...p, type: 'Project', link: '#projects', image: p.imageUrl }));
    
    const filteredArticles = ARTICLES.filter(a => 
        a.title.toLowerCase().includes(lowerQuery) || 
        a.tag.toLowerCase().includes(lowerQuery)
    ).map(a => ({ ...a, type: 'Journal', link: '#blog', image: a.imageUrl }));
    
    setResults([...filteredProjects, ...filteredArticles]);
  }, [query]);

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice search is not supported in this browser.");
        return;
    }

    if (isListening) return;

    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
        setIsListening(true);
    };

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
    };

    recognition.onerror = () => {
        setIsListening(false);
    };

    recognition.onend = () => {
        setIsListening(false);
    };

    recognition.start();
  };

  if (!isOpen) return null;

  return (
    <MotionDiv 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#050505]/95 backdrop-blur-3xl z-[100] flex flex-col items-center pt-32 px-4"
        onClick={onClose}
    >
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[150px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px] pointer-events-none"></div>

        <button 
            onClick={onClose} 
            className="absolute top-8 right-8 w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-all duration-300 group z-50"
        >
            <X size={24} className="group-hover:rotate-90 transition-transform" />
        </button>

        <div className="w-full max-w-4xl relative z-10" onClick={e => e.stopPropagation()}>
            
            <MotionDiv 
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative group"
            >
                <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-50 transition-opacity duration-500 rounded-full"></div>
                <div className="relative flex items-center border-b-2 border-white/10 focus-within:border-primary transition-colors duration-300 py-4">
                    <Search className="text-gray-500 w-8 h-8 mr-6" />
                    <input 
                        autoFocus
                        type="text" 
                        placeholder={isListening ? "Listening..." : "Search projects, articles..."}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-transparent text-white text-3xl md:text-5xl font-serif placeholder:text-white/20 outline-none"
                    />
                    <div className="flex items-center gap-4">
                        {query && (
                            <button onClick={() => setQuery('')} className="text-xs uppercase tracking-widest text-gray-500 hover:text-white transition-colors">
                                Clear
                            </button>
                        )}
                        <button 
                            onClick={handleVoiceSearch}
                            className={`p-3 rounded-full transition-all border border-white/10 ${isListening ? 'bg-red-500/20 text-red-500 border-red-500/50 animate-pulse' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
                        >
                            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                        </button>
                    </div>
                </div>
            </MotionDiv>

            <div className="mt-12 w-full min-h-[400px]">
                <AnimatePresence mode="wait">
                    {results.length > 0 ? (
                        <MotionDiv 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2"
                        >
                            <p className="text-xs font-bold uppercase text-gray-500 mb-2 tracking-widest">Top Results</p>
                            {results.map((item, idx) => (
                                <MotionA 
                                    href={item.link}
                                    onClick={onClose}
                                    key={`${item.type}-${item.id}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
                                >
                                    <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-800 shrink-0 relative">
                                        {item.image ? (
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity group-hover:scale-110 duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-white/5"><Command size={20} className="text-gray-600"/></div>
                                        )}
                                    </div>
                                    
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.type === 'Project' ? 'bg-primary' : 'bg-blue-400'}`}></span>
                                            <span className="text-[10px] uppercase tracking-wider text-gray-400">{item.type}</span>
                                        </div>
                                        <h4 className="text-xl font-serif text-white group-hover:text-primary transition-colors">{item.title}</h4>
                                    </div>

                                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-500 group-hover:bg-white group-hover:text-black group-hover:border-white transition-all transform group-hover:-rotate-45">
                                        <ArrowUpRight size={18} />
                                    </div>
                                </MotionA>
                            ))}
                        </MotionDiv>
                    ) : query ? (
                        <MotionDiv 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="flex flex-col items-center justify-center py-20 text-center opacity-50"
                        >
                            <Search size={48} className="text-gray-600 mb-4" />
                            <p className="text-xl font-serif text-gray-400">No results found for "{query}"</p>
                        </MotionDiv>
                    ) : (
                        <MotionDiv 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-xs font-bold uppercase text-gray-500 mb-6 tracking-widest flex items-center gap-2">
                                <Sparkles size={12} className="text-primary"/> Trending Now
                            </p>
                            <div className="flex flex-wrap gap-3">
                               {[
                                   { label: 'Minimalist Bedroom', type: 'Project' },
                                   { label: 'Sustainable Materials', type: 'Article' },
                                   { label: 'Luxury Kitchens', type: 'Project' },
                                   { label: 'Smart Home Tech', type: 'Feature' },
                                   { label: 'Art Deco Style', type: 'Trend' }
                               ].map((tag, i) => (
                                   <button 
                                        key={i}
                                        onClick={() => setQuery(tag.label)}
                                        className="group flex items-center gap-3 pl-4 pr-2 py-2 rounded-full border border-white/10 hover:border-primary/50 hover:bg-white/5 transition-all"
                                   >
                                       <span className="text-gray-300 group-hover:text-white">{tag.label}</span>
                                       <span className="bg-white/5 text-gray-500 text-[10px] px-2 py-1 rounded-full uppercase">{tag.type}</span>
                                   </button>
                               ))}
                            </div>

                            <div className="mt-12 pt-12 border-t border-white/5 flex gap-12 text-gray-500 text-sm">
                                <div>
                                    <h5 className="text-white font-bold mb-2">Recent Projects</h5>
                                    <ul className="space-y-2">
                                        <li className="hover:text-primary cursor-pointer transition-colors">Villa in Los Angeles</li>
                                        <li className="hover:text-primary cursor-pointer transition-colors">Modern Loft NYC</li>
                                    </ul>
                                </div>
                                <div>
                                    <h5 className="text-white font-bold mb-2">Design Services</h5>
                                    <ul className="space-y-2">
                                        <li className="hover:text-primary cursor-pointer transition-colors">Interior Architecture</li>
                                        <li className="hover:text-primary cursor-pointer transition-colors">Furniture Selection</li>
                                    </ul>
                                </div>
                            </div>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </MotionDiv>
  );
};