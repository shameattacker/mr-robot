import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Mail, Lock, User, Eye, EyeOff, ShieldCheck, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionH3 = motion.h3 as any;
const MotionP = motion.p as any;
const MotionButton = motion.button as any;

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return 0;
    if (pass.length > 6) score += 1;
    if (pass.length > 10) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strengthScore = calculateStrength(formData.password);

  const getStrengthColor = () => {
    if (strengthScore === 0) return 'bg-gray-200';
    if (strengthScore <= 1) return 'bg-red-500';
    if (strengthScore === 2) return 'bg-yellow-500';
    if (strengthScore === 3) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (strengthScore === 0) return '';
    if (strengthScore <= 1) return 'Weak';
    if (strengthScore === 2) return 'Fair';
    if (strengthScore === 3) return 'Good';
    return 'Strong';
  };

  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', password: '', confirmPassword: '' });
      setErrors({ name: '', email: '', password: '', confirmPassword: '' });
      setIsLoading(false);
    }
  }, [isOpen]);

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', email: '', password: '', confirmPassword: '' };

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 chars';
      isValid = false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    setIsLoading(true);

    setTimeout(() => {
      const displayName = formData.name || (formData.email.split('@')[0]);
      const initials = displayName.substring(0, 2).toUpperCase();
      const colors = ['CDA274', '292F36', 'E6D6C3', '1B1B1B', '5C5C5C'];
      const color = colors[displayName.length % colors.length];

      const userProfile = {
          name: isLogin ? (formData.name || "Returned User") : displayName,
          email: formData.email,
          avatar: `https://placehold.co/150x150/${color}/ffffff?text=${initials}`
      };

      onLogin(userProfile);
      setIsLoading(false);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <MotionDiv 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        layout
        className="bg-white dark:bg-[#1f1f1f] rounded-[30px] w-full max-w-[480px] shadow-2xl relative overflow-hidden border border-white/10"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-secondary to-black dark:from-black dark:to-darkCard z-0">
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white z-10"
        >
          <X size={20} />
        </button>

        <div className="relative z-10 px-8 pt-12 pb-8">
            <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white dark:bg-[#2a2a2a] rounded-full shadow-xl flex items-center justify-center border-4 border-white/10">
                    <ShieldCheck className="w-10 h-10 text-primary" />
                </div>
            </div>

            <div className="text-center mb-8">
                <MotionH3 layout className="font-serif text-3xl text-secondary dark:text-white mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </MotionH3>
                <MotionP layout className="text-textGray dark:text-gray-400 text-sm">
                    {isLogin ? 'Securely login to your Interno account' : 'Join exclusive community of designers'}
                </MotionP>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <AnimatePresence mode="popLayout">
                    {!isLogin && (
                        <MotionDiv
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-1"
                        >
                            <div className={`flex items-center gap-3 bg-gray-50 dark:bg-white/5 border rounded-xl px-4 py-3 transition-colors ${errors.name ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-white/10 focus-within:border-primary'}`}>
                                <User size={20} className="text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Full Name" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="bg-transparent outline-none w-full text-secondary dark:text-white placeholder:text-gray-400" 
                                />
                            </div>
                            {errors.name && <p className="text-xs text-red-500 pl-2 flex items-center gap-1"><AlertCircle size={10}/> {errors.name}</p>}
                        </MotionDiv>
                    )}
                </AnimatePresence>
                
                <div className="space-y-1">
                    <div className={`flex items-center gap-3 bg-gray-50 dark:bg-white/5 border rounded-xl px-4 py-3 transition-colors ${errors.email ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-white/10 focus-within:border-primary'}`}>
                        <Mail size={20} className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder="Email Address" 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            className="bg-transparent outline-none w-full text-secondary dark:text-white placeholder:text-gray-400" 
                        />
                    </div>
                    {errors.email && <p className="text-xs text-red-500 pl-2 flex items-center gap-1"><AlertCircle size={10}/> {errors.email}</p>}
                </div>

                <div className="space-y-1">
                    <div className={`flex items-center gap-3 bg-gray-50 dark:bg-white/5 border rounded-xl px-4 py-3 transition-colors ${errors.password ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-white/10 focus-within:border-primary'}`}>
                        <Lock size={20} className="text-gray-400" />
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            className="bg-transparent outline-none w-full text-secondary dark:text-white placeholder:text-gray-400" 
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-secondary dark:hover:text-white">
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-red-500 pl-2 flex items-center gap-1"><AlertCircle size={10}/> {errors.password}</p>}
                    
                    <AnimatePresence>
                        {!isLogin && formData.password && (
                            <MotionDiv 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="px-1 pt-1"
                            >
                                <div className="flex justify-between text-[10px] text-gray-500 mb-1 uppercase font-bold tracking-wider">
                                    <span>Security</span>
                                    <span className={`${
                                        strengthScore <= 1 ? 'text-red-500' : 
                                        strengthScore === 2 ? 'text-yellow-500' : 
                                        strengthScore === 3 ? 'text-blue-500' : 'text-green-500'
                                    }`}>{getStrengthLabel()}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <MotionDiv 
                                        className={`h-full ${getStrengthColor()}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(strengthScore / 4) * 100}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                            </MotionDiv>
                        )}
                    </AnimatePresence>
                </div>

                <AnimatePresence mode="popLayout">
                    {!isLogin && (
                         <MotionDiv
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="space-y-1"
                        >
                            <div className={`flex items-center gap-3 bg-gray-50 dark:bg-white/5 border rounded-xl px-4 py-3 transition-colors ${errors.confirmPassword ? 'border-red-500 bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-white/10 focus-within:border-primary'}`}>
                                <Check size={20} className="text-gray-400" />
                                <input 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    className="bg-transparent outline-none w-full text-secondary dark:text-white placeholder:text-gray-400" 
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-xs text-red-500 pl-2 flex items-center gap-1"><AlertCircle size={10}/> {errors.confirmPassword}</p>}
                        </MotionDiv>
                    )}
                </AnimatePresence>

                <div className="flex items-center justify-between text-sm mt-1">
                    <label className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-secondary dark:hover:text-white transition-colors">
                        <input type="checkbox" className="accent-primary rounded" />
                        <span>{isLogin ? 'Remember me' : 'I agree to Terms'}</span>
                    </label>
                    {isLogin && <a href="#" className="text-primary hover:underline">Forgot Password?</a>}
                </div>

                <MotionButton 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold hover:bg-secondary dark:hover:bg-white dark:hover:text-secondary transition-colors mt-2 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <>
                            {isLogin ? 'Log In' : 'Create Account'}
                            <ArrowRight className="w-5 h-5" />
                        </>
                    )}
                </MotionButton>
            </form>

            <div className="my-6 flex items-center gap-4">
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
                <span className="text-xs text-gray-400 uppercase">Or continue with</span>
                <div className="h-px bg-gray-200 dark:bg-white/10 flex-1"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button className="py-3 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google" className="w-5 h-5" />
                    <span className="text-sm font-medium text-secondary dark:text-white">Google</span>
                </button>
                <button className="py-3 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple" className="w-5 h-5 dark:invert" />
                    <span className="text-sm font-medium text-secondary dark:text-white">Apple</span>
                </button>
            </div>

            <div className="mt-8 text-center">
                <button 
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-secondary dark:text-white font-medium hover:text-primary transition-colors"
                >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </button>
            </div>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};