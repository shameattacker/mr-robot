import React, { useState } from 'react';
import { ArrowRight, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

export const CTA: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => {
        setFormState('idle');
        setFormData({ name: '', email: '', phone: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="contact">
      <MotionDiv 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-secondary dark:bg-darkCard rounded-[50px] md:rounded-[70px] p-8 md:p-20 flex flex-col items-center text-center relative overflow-hidden shadow-2xl border border-white/5"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">Wanna join the interno?</h2>
            <p className="font-sans text-white/70 text-lg mb-12 max-w-xl mx-auto">
                It is a long established fact will be distracted. Contact With Us
            </p>

            {formState === 'success' ? (
                <MotionDiv 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-500/10 border border-green-500/30 p-8 rounded-3xl flex flex-col items-center gap-4"
                >
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
                        <CheckCircle2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-serif text-white">Message Sent Successfully!</h3>
                    <p className="text-white/60">We will contact you shortly.</p>
                </MotionDiv>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group text-left">
                            <input 
                                type="text" 
                                required
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 outline-none focus:border-primary focus:bg-white/10 transition-all hover:border-white/20"
                            />
                        </div>
                        <div className="group text-left">
                            <input 
                                type="email" 
                                required
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 outline-none focus:border-primary focus:bg-white/10 transition-all hover:border-white/20"
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="group text-left">
                            <input 
                                type="tel" 
                                placeholder="Phone (Optional)"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 outline-none focus:border-primary focus:bg-white/10 transition-all hover:border-white/20"
                            />
                        </div>
                        <div className="group text-left">
                            <input 
                                type="text" 
                                placeholder="Subject / Interest"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 outline-none focus:border-primary focus:bg-white/10 transition-all hover:border-white/20"
                            />
                        </div>
                    </div>

                    <textarea 
                        rows={4}
                        placeholder="Hello, I am interested in..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/30 outline-none focus:border-primary focus:bg-white/10 transition-all hover:border-white/20 resize-none"
                    ></textarea>

                    <MotionButton 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={formState === 'submitting'}
                        className="bg-primary text-white px-10 py-5 rounded-[18px] font-bold text-lg shadow-[0_10px_20px_rgba(205,162,116,0.3)] hover:bg-white hover:text-secondary transition-all duration-300 w-full md:w-auto md:px-16 mx-auto mt-4 flex items-center justify-center gap-3 group"
                    >
                        {formState === 'submitting' ? (
                            <>Sending...</>
                        ) : (
                            <>
                                Contact With Us
                                <ArrowRight className="w-5 h-5 group-hover:text-primary transition-colors" />
                            </>
                        )}
                    </MotionButton>
                </form>
            )}
        </div>
      </MotionDiv>
    </section>
  );
};