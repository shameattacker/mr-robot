import React, { useState, useEffect } from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

const MotionDiv = motion.div as any;

interface FooterProps {
    onSubscribe: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSubscribe }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('interno_newsletter_subscribed')) {
        setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    localStorage.setItem('interno_newsletter_subscribed', 'true');
    onSubscribe();
    setTimeout(() => setIsSubscribed(true), 500);
  };

  return (
    <div 
        className="relative h-[600px]"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
        <div className="fixed bottom-0 h-[600px] w-full bg-[#111] text-white border-t border-white/5 flex flex-col justify-center">
            <div className="w-full max-w-[1200px] mx-auto px-6">
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16">
                    <div>
                        <div className="mb-8">
                            <Logo />
                        </div>
                        <p className="text-gray-400 font-sans mb-8 max-w-xs leading-relaxed">
                            We are the leading architect and interior design firm in the world. Building dreams since 1999.
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"><Facebook size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"><Twitter size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"><Linkedin size={18} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center transition-all duration-300"><Instagram size={18} /></a>
                        </div>
                    </div>

                    <div className="md:pl-20">
                        <h4 className="font-serif text-2xl text-white mb-8">Pages</h4>
                        <div className="flex flex-col gap-4 text-gray-400 font-sans">
                            <a href="#" className="hover:text-primary hover:translate-x-2 transition-all cursor-pointer inline-block">Style Guide</a>
                            <a href="#" className="hover:text-primary hover:translate-x-2 transition-all cursor-pointer inline-block">Protected</a>
                            <a href="#" className="hover:text-primary hover:translate-x-2 transition-all cursor-pointer inline-block">Licenses</a>
                            <a href="#" className="hover:text-primary hover:translate-x-2 transition-all cursor-pointer inline-block">Changelog</a>
                            <a href="#" className="hover:text-primary hover:translate-x-2 transition-all cursor-pointer inline-block">404</a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-serif text-2xl text-white mb-8">Newsletter</h4>
                        <p className="text-gray-400 font-sans mb-6">
                            Subscribe to get the latest design news and updates.
                        </p>
                        <form onSubmit={handleSubscribe} className="relative">
                            <AnimatePresence mode="wait">
                                {isSubscribed ? (
                                    <MotionDiv 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="w-full p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl flex items-center gap-2 font-bold"
                                    >
                                        <Check size={20} /> Subscribed!
                                    </MotionDiv>
                                ) : (
                                    <MotionDiv 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex gap-2"
                                    >
                                        <input 
                                            type="email" 
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email" 
                                            className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:border-primary transition-colors"
                                        />
                                        <button 
                                            type="submit"
                                            className="px-6 bg-primary text-white rounded-xl hover:bg-white hover:text-primary transition-colors font-bold"
                                        >
                                            <Send size={20} />
                                        </button>
                                    </MotionDiv>
                                )}
                            </AnimatePresence>
                        </form>
                    </div>
                </div>
                
                <div className="border-t border-white/10 pt-8 text-center text-gray-600 font-sans text-sm flex flex-col md:flex-row justify-between items-center">
                    <p>Copyright © Interno | Designed by Victorflow Templates</p>
                    <p>Powered by Webflow</p>
                </div>
            </div>
        </div>
    </div>
  );
};