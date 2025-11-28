import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const MotionDiv = motion.div as any;

export const Pricing: React.FC = () => {
  const [isCommercial, setIsCommercial] = useState(false);

  const plans = [
    {
      name: "Design Advice",
      price: isCommercial ? 59 : 29,
      features: ["Complete Design Advice", "Interior Color Palette", "Decor Selection", "Email Support"],
      popular: false
    },
    {
      name: "Complete Interior",
      price: isCommercial ? 199 : 89,
      features: ["Complete Design Advice", "3D Rendering", "Furniture Selection", "Priority Support", "Site Visit"],
      popular: true
    },
    {
      name: "Furniture Design",
      price: isCommercial ? 149 : 59,
      features: ["Furniture Selection", "Custom Carpentry", "Material Samples", "Vendor Management"],
      popular: false
    }
  ];

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="pricing">
       <div className="text-center mb-12">
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Pricing Plans</h2>
        <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-bold ${!isCommercial ? 'text-primary' : 'text-gray-400'}`}>Residential</span>
            <button 
                onClick={() => setIsCommercial(!isCommercial)}
                className="w-14 h-8 bg-white/10 rounded-full relative p-1 transition-colors border border-white/10"
            >
                <MotionDiv 
                    animate={{ x: isCommercial ? 24 : 0 }}
                    className="w-6 h-6 bg-primary rounded-full shadow-md"
                />
            </button>
            <span className={`text-sm font-bold ${isCommercial ? 'text-primary' : 'text-gray-400'}`}>Commercial</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
            <MotionDiv
                key={index}
                whileHover={{ y: -15 }}
                className={`p-8 rounded-[30px] text-center border transition-all duration-300 flex flex-col items-center ${
                    plan.popular 
                    ? 'bg-secondary dark:bg-primary text-white border-transparent shadow-2xl scale-105 z-10' 
                    : 'premium-glass text-secondary dark:text-white shadow-lg'
                }`}
            >
                <h3 className="font-serif text-2xl mb-4">{plan.name}</h3>
                <div className="text-5xl font-serif font-bold mb-2">
                    <span className="text-2xl align-top">$</span>{plan.price}
                </div>
                <div className="text-sm opacity-70 mb-8">/ month</div>
                
                <div className="w-full space-y-4 mb-8 flex-1">
                    {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-center justify-center gap-2">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                plan.popular ? 'bg-white/20' : 'bg-primary/20'
                            }`}>
                                <Check size={12} className={plan.popular ? 'text-white' : 'text-primary'} />
                            </div>
                            <span className="text-sm font-medium">{feat}</span>
                        </div>
                    ))}
                </div>

                <button className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all ${
                    plan.popular 
                    ? 'bg-primary dark:bg-white text-white dark:text-secondary hover:shadow-xl hover:brightness-110' 
                    : 'bg-secondary dark:bg-primary text-white hover:opacity-90'
                }`}>
                    Get Started
                </button>
            </MotionDiv>
        ))}
      </div>
    </section>
  );
};