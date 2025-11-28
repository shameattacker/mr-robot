import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { X, CreditCard, Check, Lock, Truck, ShieldCheck, ArrowRight, MapPin, User, Fingerprint, Smartphone, Wifi } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;
const MotionPath = motion.path as any;

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onComplete: () => void;
}

type Step = 'shipping' | 'payment' | 'processing' | 'success';

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, total, onComplete }) => {
  const [step, setStep] = useState<Step>('shipping');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [processingStage, setProcessingStage] = useState(0);
  
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvc: '' });
  const [shippingData, setShippingData] = useState({ firstName: '', lastName: '', address: '', city: '', zip: '', country: '' });

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 });
  
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  
  const sheenGradient = useTransform(
    mouseX, 
    [-0.5, 0.5], 
    [
      'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 0%, transparent 100%)', 
      'linear-gradient(115deg, transparent 20%, rgba(255,255,255,0.15) 50%, transparent 80%)'
    ]
  );

  useEffect(() => {
    if (isOpen) {
      setStep('shipping');
      setCardData({ number: '', name: '', expiry: '', cvc: '' });
      setIsCardFlipped(false);
      setProcessingStage(0);
    }
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;
    
    mouseX.set(mouseXFromCenter / width);
    mouseY.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/g, '');
    const parts = [];
    for(let i = 0; i < v.length; i += 4) parts.push(v.substring(i, i + 4));
    return parts.length > 1 ? parts.join('   ') : v;
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    
    const stages = [
        { time: 1500, stage: 1 },
        { time: 3000, stage: 2 },
        { time: 4500, stage: 3 },
    ];

    stages.forEach(({ time, stage }) => {
        setTimeout(() => setProcessingStage(stage), time);
    });

    setTimeout(() => {
      setStep('success');
    }, 5500);
  };

  const handleFinish = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#000000]/95 backdrop-blur-3xl z-[150] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-gradient-radial from-primary/5 to-transparent opacity-30 blur-[100px]"></div>
      </div>

      <MotionDiv 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="w-full max-w-5xl bg-[#080808] border border-white/10 rounded-[32px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row h-[700px]"
      >
        <div className="w-full md:w-80 bg-[#0f0f0f] border-b md:border-b-0 md:border-r border-white/5 p-8 flex flex-col relative z-20">
            <div className="mb-8">
                <h2 className="text-white font-serif text-2xl mb-1 tracking-wide">Secure Checkout</h2>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Lock size={10} className="text-primary" /> 256-Bit Encryption
                </p>
            </div>

            <div className="flex-1 flex flex-col justify-center space-y-8">
                <div className="space-y-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wider">Total Due</div>
                    <div className="text-4xl font-serif text-primary">${total.toLocaleString()}</div>
                </div>
                
                <div className="space-y-6 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10"></div>
                    
                    {[
                        { id: 'shipping', label: 'Shipping Details', icon: Truck },
                        { id: 'payment', label: 'Payment Method', icon: CreditCard },
                        { id: 'success', label: 'Confirmation', icon: ShieldCheck }
                    ].map((s, idx) => {
                        const isActive = step === s.id;
                        const isPast = (step === 'payment' && idx === 0) || (step === 'processing' && idx <= 1) || (step === 'success');
                        
                        return (
                            <div key={s.id} className="flex items-center gap-4 relative z-10">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-500 ${
                                    isActive || isPast ? 'bg-primary border-primary text-black' : 'bg-[#0f0f0f] border-white/20 text-gray-500'
                                }`}>
                                    {isPast ? <Check size={12} strokeWidth={3} /> : <div className="text-[10px] font-bold">{idx + 1}</div>}
                                </div>
                                <span className={`text-sm transition-colors duration-300 ${isActive ? 'text-white font-bold' : 'text-gray-500'}`}>{s.label}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <button onClick={onClose} className="mt-8 flex items-center gap-2 text-gray-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold group">
                <X size={14} className="group-hover:rotate-90 transition-transform" /> Cancel
            </button>
        </div>

        <div className="flex-1 bg-[#0A0A0A] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            
            <AnimatePresence mode="wait">
                
                {step === 'shipping' && (
                    <MotionDiv
                        key="shipping"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full p-12 flex flex-col justify-center max-w-2xl mx-auto"
                    >
                        <h3 className="text-3xl text-white font-serif mb-2">Shipping Address</h3>
                        <p className="text-gray-500 mb-10 text-sm">Where should we deliver your order?</p>
                        
                        <div className="space-y-5 relative z-10">
                            <div className="grid grid-cols-2 gap-5">
                                <FancyInput 
                                    label="First Name" 
                                    value={shippingData.firstName} 
                                    onChange={(v: string) => setShippingData({...shippingData, firstName: v})} 
                                />
                                <FancyInput 
                                    label="Last Name"
                                    value={shippingData.lastName} 
                                    onChange={(v: string) => setShippingData({...shippingData, lastName: v})} 
                                />
                            </div>
                            <FancyInput label="Street Address" icon={MapPin} value={shippingData.address} onChange={(v: string) => setShippingData({...shippingData, address: v})} />
                            <div className="grid grid-cols-2 gap-5">
                                <FancyInput label="City" value={shippingData.city} onChange={(v: string) => setShippingData({...shippingData, city: v})} />
                                <FancyInput label="ZIP Code" value={shippingData.zip} onChange={(v: string) => setShippingData({...shippingData, zip: v})} />
                            </div>
                        </div>

                        <div className="mt-12 flex justify-end relative z-20">
                            <button 
                                type="button"
                                onClick={() => setStep('payment')}
                                className="px-10 py-4 bg-white text-black rounded-2xl font-bold flex items-center gap-3 hover:bg-primary hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-pointer"
                            >
                                Continue <ArrowRight size={18} />
                            </button>
                        </div>
                    </MotionDiv>
                )}

                {step === 'payment' && (
                    <MotionDiv
                        key="payment"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="h-full flex flex-col p-8 lg:p-16 items-center justify-center"
                    >
                        <div className="w-full max-w-lg space-y-10">
                            
                            <div 
                                className="relative w-full aspect-[1.586/1] perspective-1000 cursor-grab active:cursor-grabbing z-20 group"
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                ref={cardRef}
                            >
                                <MotionDiv
                                    className="w-full h-full relative preserve-3d"
                                    style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                                    animate={{ rotateY: isCardFlipped ? 180 : 0 }}
                                    transition={{ type: "spring", stiffness: 50, damping: 15 }}
                                >
                                    <div className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden bg-[#111] shadow-2xl border border-white/10">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-black to-black"></div>
                                        
                                        <MotionDiv 
                                            className="absolute inset-0 z-10 mix-blend-soft-light opacity-80"
                                            style={{ 
                                                background: sheenGradient,
                                                backgroundPosition: `${glareX}% ${glareY}%`
                                            }}
                                        />
                                        
                                        <div className="relative z-20 p-8 h-full flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <div className="w-14 h-10 rounded-md bg-gradient-to-br from-yellow-200 via-yellow-500 to-yellow-700 shadow-inner border border-yellow-600/50 flex items-center justify-center overflow-hidden relative">
                                                    <div className="absolute inset-0 border-[0.5px] border-black/20 grid grid-cols-2 gap-[1px] bg-black/10">
                                                        <div className="bg-transparent"></div><div className="bg-transparent"></div>
                                                        <div className="bg-transparent"></div><div className="bg-transparent"></div>
                                                    </div>
                                                    <div className="w-8 h-6 border border-black/20 rounded-[4px]"></div>
                                                </div>
                                                
                                                <Wifi size={28} className="rotate-90 text-white/30" />
                                            </div>

                                            <div className="font-mono text-2xl md:text-3xl text-white/90 tracking-[0.15em] drop-shadow-md flex gap-4 mt-4">
                                                {cardData.number ? cardData.number : '•••• •••• •••• ••••'}
                                            </div>

                                            <div className="flex justify-between items-end text-white/70">
                                                <div className="space-y-1">
                                                    <div className="text-[8px] uppercase tracking-widest opacity-60">Card Holder</div>
                                                    <div className="font-medium uppercase tracking-wider text-sm">{cardData.name || 'YOUR NAME'}</div>
                                                </div>
                                                <div className="text-right space-y-1">
                                                    <div className="text-[8px] uppercase tracking-widest opacity-60">Expires</div>
                                                    <div className="font-medium tracking-widest text-sm">{cardData.expiry || 'MM/YY'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div 
                                        className="absolute inset-0 backface-hidden rounded-[24px] overflow-hidden bg-[#111] shadow-2xl border border-white/5"
                                        style={{ transform: 'rotateY(180deg)' }}
                                    >
                                        <div className="w-full h-14 bg-black mt-8 relative border-t border-b border-white/5">
                                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                                        </div>
                                        
                                        <div className="p-8 pt-6">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="text-[8px] text-white/40 uppercase tracking-widest">Authorized Signature</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="flex-1 h-10 bg-[#222] rounded-sm flex items-center px-3 relative overflow-hidden">
                                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-5"></div>
                                                    <span className="font-handwriting text-white/50 italic text-sm select-none">Interno Member</span>
                                                </div>
                                                <div className="w-12 h-10 bg-white rounded-sm flex items-center justify-center font-mono font-bold text-black text-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                                    {cardData.cvc || '***'}
                                                </div>
                                            </div>
                                            
                                            <div className="mt-12 flex justify-center opacity-20">
                                                <Lock size={32} />
                                            </div>
                                        </div>
                                    </div>
                                </MotionDiv>
                            </div>

                            <form onSubmit={handlePaymentSubmit} className="space-y-5 relative z-10">
                                <FancyInput 
                                    icon={CreditCard} 
                                    placeholder="0000 0000 0000 0000" 
                                    value={cardData.number}
                                    maxLength={19}
                                    onChange={(v: string) => setCardData({...cardData, number: formatCardNumber(v)})}
                                    onFocus={() => setIsCardFlipped(false)}
                                />
                                <div className="grid grid-cols-2 gap-5">
                                    <FancyInput 
                                        icon={User} 
                                        placeholder="Name on Card" 
                                        value={cardData.name}
                                        onChange={(v: string) => setCardData({...cardData, name: v.toUpperCase()})}
                                        onFocus={() => setIsCardFlipped(false)}
                                    />
                                    <div className="grid grid-cols-2 gap-3">
                                        <FancyInput 
                                            placeholder="MM/YY" 
                                            value={cardData.expiry}
                                            maxLength={5}
                                            onChange={(v: string) => {
                                                let val = v.replace(/[^0-9]/g, '');
                                                if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2);
                                                setCardData({...cardData, expiry: val});
                                            }}
                                            onFocus={() => setIsCardFlipped(false)}
                                        />
                                        <FancyInput 
                                            placeholder="CVC" 
                                            value={cardData.cvc}
                                            maxLength={3}
                                            type="password"
                                            onChange={(v: string) => setCardData({...cardData, cvc: v.replace(/[^0-9]/g, '')})}
                                            onFocus={() => setIsCardFlipped(true)}
                                            onBlur={() => setIsCardFlipped(false)}
                                        />
                                    </div>
                                </div>

                                <button type="submit" className="w-full mt-6 bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-white hover:text-secondary transition-all shadow-[0_10px_30px_rgba(205,162,116,0.2)] active:scale-95 flex items-center justify-center gap-3 group">
                                    <Lock size={18} /> Pay ${total.toLocaleString()} <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </button>
                            </form>
                        </div>
                    </MotionDiv>
                )}

                {step === 'processing' && (
                    <MotionDiv
                        key="processing"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex flex-col items-center justify-center p-12"
                    >
                        <div className="relative w-64 h-64 flex items-center justify-center mb-12">
                            <MotionDiv 
                                className="absolute inset-0 border border-white/10 rounded-full"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <MotionDiv 
                                className="absolute inset-0 border border-primary/20 rounded-full"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.2, opacity: [0, 0.5, 0] }}
                                transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                            />
                            
                            <div className="relative w-32 h-32">
                                <MotionSpan 
                                    className="absolute inset-0 border-4 border-t-primary border-r-primary/30 border-b-primary/10 border-l-transparent rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1.5, ease: "linear", repeat: Infinity }}
                                />
                                <MotionSpan 
                                    className="absolute inset-4 border-4 border-b-white border-l-white/30 border-t-white/10 border-r-transparent rounded-full"
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                                />
                                
                                <div className="absolute inset-0 flex items-center justify-center text-primary">
                                    <AnimatePresence mode="wait">
                                        {processingStage < 2 ? (
                                            <MotionDiv key="fp" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                                <Fingerprint size={40} className="animate-pulse" />
                                            </MotionDiv>
                                        ) : processingStage < 3 ? (
                                            <MotionDiv key="sp" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                                                <Smartphone size={40} className="animate-bounce text-blue-400" />
                                            </MotionDiv>
                                        ) : (
                                            <MotionDiv key="ok" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                                <ShieldCheck size={40} className="text-green-500" />
                                            </MotionDiv>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-2xl font-serif text-white mb-2 tracking-wide animate-pulse">
                            {['Authenticating Biometrics...', 'Tokenizing Transaction...', 'Bank Verified'][processingStage]}
                        </h3>
                        <p className="text-gray-500 text-sm">Please do not close this window</p>
                    </MotionDiv>
                )}

                {step === 'success' && (
                    <MotionDiv
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden"
                    >
                        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                             {[...Array(12)].map((_, i) => (
                                 <MotionDiv
                                    key={i}
                                    className="absolute w-2 h-16 bg-gradient-to-t from-transparent to-primary rounded-full"
                                    initial={{ opacity: 1, scale: 0, rotate: i * 30, y: 0 }}
                                    animate={{ opacity: 0, scale: 1, y: -200 }}
                                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                                    style={{ transformOrigin: 'center bottom' }}
                                 />
                             ))}
                        </div>

                        <MotionDiv 
                            className="w-40 h-40 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_#22c55e] mb-10 relative z-10"
                            initial={{ scale: 0 }}
                            animate={{ scale: [0, 1.2, 1] }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <MotionPath
                                    d="M20 6L9 17l-5-5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
                                />
                            </svg>
                        </MotionDiv>

                        <MotionDiv
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-center"
                        >
                            <h2 className="text-5xl font-serif text-white mb-4">Payment Successful</h2>
                            <p className="text-gray-400 text-lg mb-12">Order #8842 confirmed. Check your email.</p>
                            
                            <button 
                                onClick={handleFinish}
                                className="px-12 py-4 bg-[#1a1a1a] border border-white/10 text-white rounded-2xl font-bold hover:bg-white hover:text-black transition-colors"
                            >
                                Return to Home
                            </button>
                        </MotionDiv>
                    </MotionDiv>
                )}

            </AnimatePresence>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};

const FancyInput = ({ label, icon: Icon, onChange, value, ...props }: any) => (
    <div className="group relative">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-primary transition-colors z-10 pointer-events-none">
            {Icon && <Icon size={20} />}
        </div>
        <input 
            {...props}
            value={value || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            className={`w-full bg-[#111] border border-white/10 rounded-2xl py-5 ${Icon ? 'pl-14' : 'pl-5'} pr-5 text-white outline-none focus:border-primary focus:bg-[#151515] focus:shadow-[0_0_20px_rgba(205,162,116,0.1)] transition-all placeholder:text-gray-600 font-medium tracking-wide text-lg`}
        />
        {label && (
            <span className="absolute -top-3 left-4 bg-[#0A0A0A] px-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 group-focus-within:text-primary transition-colors border border-white/5 rounded-md">
                {label}
            </span>
        )}
    </div>
);