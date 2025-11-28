import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ArrowRight, Minus, Plus, Package, Truck, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

const MotionDiv = motion.div as any;

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onUpdateQuantity,
  onCheckout
}) => {
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingThreshold = 5000;
  const progress = Math.min(100, (subtotal / shippingThreshold) * 100);
  const remaining = shippingThreshold - subtotal;
  const shippingCost = subtotal > shippingThreshold ? 0 : 150;
  const total = subtotal + shippingCost;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <MotionDiv 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
          />
          
          <MotionDiv 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-[500px] bg-[#1a1a1a] z-[95] shadow-2xl flex flex-col border-l border-white/10"
          >
            <div className="p-8 pb-4 bg-[#1a1a1a] z-10">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                    <ShoppingBag size={20} />
                  </div>
                  <h2 className="text-2xl font-serif text-white">Your Bag <span className="text-gray-500 text-lg font-sans ml-2">({items.length})</span></h2>
                </div>
                <button 
                    onClick={onClose} 
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-all hover:rotate-90"
                >
                  <X size={20} />
                </button>
              </div>

              {items.length > 0 && (
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-sm mb-3 font-medium">
                          {remaining > 0 ? (
                              <>
                                <Truck size={16} className="text-primary" />
                                <span className="text-gray-300">Spend <span className="text-primary">${remaining.toLocaleString()}</span> more for free shipping</span>
                              </>
                          ) : (
                              <>
                                <ShieldCheck size={16} className="text-green-500" />
                                <span className="text-green-400">You've unlocked <span className="font-bold">Free Premium Shipping</span></span>
                              </>
                          )}
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <MotionDiv 
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 1 }}
                            className={`h-full rounded-full ${remaining > 0 ? 'bg-primary' : 'bg-green-500'}`}
                          />
                      </div>
                  </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-8 py-2 space-y-6 custom-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-60 pb-20">
                  <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
                    <Package size={40} className="text-gray-500" />
                  </div>
                  <p className="text-2xl font-serif text-white mb-2">Your bag is empty</p>
                  <p className="text-sm text-gray-400 max-w-[200px]">Browse our projects and collections to find your dream pieces.</p>
                  <button onClick={onClose} className="mt-8 px-8 py-3 border border-white/20 rounded-xl text-white hover:bg-white hover:text-black transition-colors font-bold">
                      Start Browsing
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <MotionDiv 
                    layout
                    key={item.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="flex gap-5 group"
                  >
                    <div className="w-28 h-28 bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative shrink-0">
                        {item.image ? (
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-white/5">
                                <Package className="text-gray-600" />
                            </div>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start mb-1">
                            <h3 className="font-serif text-white text-lg leading-tight pr-4">{item.title}</h3>
                            <button 
                                onClick={() => onRemove(item.id)}
                                className="text-gray-600 hover:text-red-400 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <p className="text-primary font-mono text-sm">${item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/5">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md text-gray-300 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-bold w-6 text-center text-white font-mono">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="w-7 h-7 flex items-center justify-center hover:bg-white/10 rounded-md text-gray-300 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <p className="text-white/60 font-mono text-sm">
                            ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </MotionDiv>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-8 border-t border-white/10 bg-[#1a1a1a] z-10">
                <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>Subtotal</span>
                        <span className="text-white font-mono">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>Shipping</span>
                        <span className={`${shippingCost === 0 ? 'text-green-400' : 'text-white'} font-mono`}>
                            {shippingCost === 0 ? 'Free' : `$${shippingCost}`}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-serif text-white pt-4 border-t border-white/10">
                        <span>Total</span>
                        <span className="text-primary">${total.toLocaleString()}</span>
                    </div>
                </div>

                <button 
                  onClick={onCheckout}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-bold text-lg hover:bg-white hover:text-secondary transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(205,162,116,0.2)] group"
                >
                  Checkout Securely <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <p className="text-center text-xs text-gray-600 mt-4 flex items-center justify-center gap-2">
                    <ShieldCheck size={12} /> SSL Encrypted Transaction
                </p>
              </div>
            )}
          </MotionDiv>
        </>
      )}
    </AnimatePresence>
  );
};