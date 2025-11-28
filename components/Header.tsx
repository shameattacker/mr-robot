import React, { useEffect, useState } from 'react';
import { Search, Menu, User as UserIcon, ShoppingBag, LayoutDashboard, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { User } from '../App';
import { Logo } from './Logo';

const MotionHeader = motion.header as any;
const MotionButton = motion.button as any;
const MotionDiv = motion.div as any;
const MotionSpan = motion.span as any;

interface HeaderProps {
  user: User | null;
  cartItemCount: number;
  onAuthClick: () => void;
  onProfileClick: () => void;
  onSearchClick: () => void;
  onDeveloperClick: () => void;
  onCartClick: () => void;
  onClientPortalClick: () => void;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  user, 
  cartItemCount,
  onAuthClick, 
  onProfileClick, 
  onSearchClick, 
  onDeveloperClick,
  onCartClick,
  onClientPortalClick,
  theme,
  toggleTheme
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MotionHeader 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-500 ${
          isScrolled ? 'py-4 glass shadow-sm dark:border-b dark:border-white/5' : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex justify-between items-center">
          <div onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <Logo />
          </div>

          <nav className="hidden md:flex items-center gap-8 font-sans text-lg text-secondary dark:text-gray-300">
            {['Home', 'About Us', 'Services', 'Projects', 'Blog'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative group overflow-hidden px-1 py-1 cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-primary transition-colors duration-300">{item}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-secondary dark:text-white transition-colors"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </MotionButton>

            <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClientPortalClick}
                className="px-4 py-2 rounded-lg border border-primary/30 bg-primary/10 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-all flex items-center gap-2"
            >
                <LayoutDashboard size={16} /> Client Portal
            </MotionButton>

            <MotionButton
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onDeveloperClick}
                className="px-3 py-1 rounded-md border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-xs font-mono text-primary hover:bg-primary hover:text-white transition-colors"
            >
                xx1lly
            </MotionButton>

            <MotionButton 
              whileHover={{ scale: 1.1 }}
              onClick={onSearchClick}
            >
              <Search className="w-5 h-5 cursor-pointer text-secondary dark:text-white hover:text-primary transition-colors" />
            </MotionButton>

            <MotionButton 
              whileHover={{ scale: 1.1 }}
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingBag className="w-5 h-5 cursor-pointer text-secondary dark:text-white hover:text-primary transition-colors" />
              {cartItemCount > 0 && (
                <MotionSpan 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold"
                >
                  {cartItemCount}
                </MotionSpan>
              )}
            </MotionButton>
            
            <AnimatePresence mode="wait">
              {user ? (
                 <MotionDiv 
                  key="profile"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={onProfileClick}
                  className="flex items-center gap-3 cursor-pointer bg-white dark:bg-darkCard pl-2 pr-4 py-1.5 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
                 >
                   <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-primary" />
                   <span className="font-medium text-sm text-secondary dark:text-white">{user.name.split(' ')[0]}</span>
                 </MotionDiv>
              ) : (
                <MotionButton 
                  key="login"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onAuthClick}
                  className="px-6 py-2 rounded-xl bg-primary text-white hover:bg-secondary dark:hover:bg-white dark:hover:text-secondary transition-colors duration-300 font-medium shadow-lg hover:shadow-primary/30 cursor-pointer"
                >
                  Join Now
                </MotionButton>
              )}
            </AnimatePresence>
          </div>

          <button 
            className="md:hidden text-secondary dark:text-white hover:text-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-8 h-8" />
          </button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <MotionDiv 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="absolute top-full left-0 w-full bg-white/95 dark:bg-darkBg/95 backdrop-blur-xl shadow-xl z-50 overflow-hidden border-t border-gray-100 dark:border-gray-800"
              >
                <div className="p-6 flex flex-col gap-4">
                  {['Home', 'About Us', 'Services', 'Projects', 'Contact'].map((item) => (
                    <a key={item} href="#" className="text-xl text-secondary dark:text-white hover:text-primary py-3 border-b border-gray-200 dark:border-gray-800 font-serif">{item}</a>
                  ))}
                   <button onClick={toggleTheme} className="text-xl text-left text-secondary dark:text-white hover:text-primary py-3 border-b border-gray-200 dark:border-gray-800 font-serif flex items-center gap-2">
                    {theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>} {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                   <button onClick={onClientPortalClick} className="text-xl text-left text-secondary dark:text-white hover:text-primary py-3 border-b border-gray-200 dark:border-gray-800 font-serif flex items-center gap-2">
                    <LayoutDashboard size={18}/> Client Portal
                  </button>
                  <button onClick={onDeveloperClick} className="text-xl text-left text-primary py-3 border-b border-gray-200 dark:border-gray-800 font-mono">
                      &gt; xx1lly_profile
                  </button>
                  <button onClick={onSearchClick} className="text-xl text-left text-secondary dark:text-white hover:text-primary py-3 border-b border-gray-200 dark:border-gray-800 font-serif flex items-center gap-2">
                    Search <Search size={18}/>
                  </button>
                   <button onClick={onCartClick} className="text-xl text-left text-secondary dark:text-white hover:text-primary py-3 border-b border-gray-200 dark:border-gray-800 font-serif flex items-center gap-2">
                    Cart ({cartItemCount}) <ShoppingBag size={18}/>
                  </button>
                  <button 
                    onClick={() => {
                      if (user) onProfileClick();
                      else onAuthClick();
                    }} 
                    className="text-left text-white bg-primary p-4 rounded-xl font-bold text-lg mt-4 flex items-center justify-center gap-2"
                  >
                    {user ? <><UserIcon size={20}/> My Profile</> : 'Login / Sign Up'}
                  </button>
                </div>
              </MotionDiv>
            )}
          </AnimatePresence>
        </div>
        
        <MotionDiv
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left"
          style={{ scaleX }}
        />
      </MotionHeader>
    </>
  );
};