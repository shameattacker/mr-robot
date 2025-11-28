import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { Brands } from './components/Brands';
import { Projects } from './components/Projects';
import { Stats } from './components/Stats';
import { Estimator } from './components/Estimator';
import { Blog } from './components/Blog';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { UserProfile } from './components/UserProfile';
import { BeforeAfter } from './components/BeforeAfter';
import { Chatbot } from './components/Chatbot';
import { SearchModal } from './components/SearchModal';
import { DeveloperProfile } from './components/DeveloperProfile';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Lookbook } from './components/Lookbook';
import { ClientDashboard } from './components/ClientDashboard';
import { StyleQuiz } from './components/StyleQuiz';
import { Team } from './components/Team';
import { Pricing } from './components/Pricing';
import { SmartHome } from './components/SmartHome';
import { Moodboard } from './components/Moodboard';
import { ProductCustomizer } from './components/ProductCustomizer';
import { BookingSystem } from './components/BookingSystem';
import { RoomPlanner } from './components/RoomPlanner';
import { NotificationSystem } from './components/NotificationSystem';
import { WelcomeScreen } from './components/WelcomeScreen';
import { CartItem, Notification, NotificationType } from './types';

export interface User {
  name: string;
  email: string;
  avatar: string;
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDeveloperOpen, setIsDeveloperOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isClientPortalOpen, setIsClientPortalOpen] = useState(false);
  const [isStyleQuizOpen, setIsStyleQuizOpen] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const [hackerMode, setHackerMode] = useState(false);
  const [konamiKeys, setKonamiKeys] = useState<string[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('interno_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedTheme = localStorage.getItem('interno_theme') as 'dark' | 'light' | null;
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('interno_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    showNotification('info', `Switched to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  };

  const showNotification = (type: NotificationType, message: string) => {
    const newNote = {
      id: Date.now().toString(),
      type,
      message
    };
    setNotifications(prev => [...prev, newNote]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonamiKeys(prev => {
        const newKeys = [...prev, e.key];
        if (newKeys.length > 10) newKeys.shift();
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const code = "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba";
    if (konamiKeys.join('').includes(code)) {
      setHackerMode(prev => !prev);
      setKonamiKeys([]);
      showNotification('info', hackerMode ? 'System Normal' : 'SYSTEM OVERRIDE ACTIVATED');
    }
  }, [konamiKeys]);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('interno_user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
    showNotification('success', `Welcome back, ${userData.name}!`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('interno_user');
    setIsProfileOpen(false);
    showNotification('info', 'You have been logged out.');
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('interno_user', JSON.stringify(updatedUser));
    showNotification('success', 'Profile updated successfully.');
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
    showNotification('success', `${item.title} added to cart`);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleCheckoutStart = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutComplete = () => {
    setCartItems([]);
    showNotification('success', 'Order placed successfully!');
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <WelcomeScreen>
      <div className={`min-h-screen bg-white dark:bg-darkBg text-secondary dark:text-white selection:bg-primary selection:text-white overflow-x-hidden font-sans transition-colors duration-500 ${hackerMode ? 'grayscale invert' : ''}`}>
        {hackerMode && (
          <div className="fixed inset-0 pointer-events-none z-[9999] mix-blend-overlay opacity-20 bg-[url('https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif')] bg-cover"></div>
        )}
        
        <NotificationSystem notifications={notifications} removeNotification={removeNotification} />

        <Header 
          user={user}
          cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onAuthClick={() => setIsAuthModalOpen(true)} 
          onProfileClick={() => setIsProfileOpen(true)}
          onSearchClick={() => setIsSearchOpen(true)}
          onDeveloperClick={() => setIsDeveloperOpen(true)}
          onCartClick={() => setIsCartOpen(true)}
          onClientPortalClick={() => setIsClientPortalOpen(true)}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        
        <main>
          <Hero onTakeQuiz={() => setIsStyleQuizOpen(true)} />
          <Services onAddToCart={addToCart} />
          <SmartHome />
          <RoomPlanner />
          <Lookbook onAddToCart={addToCart} />
          <About />
          <Process />
          <Moodboard onSave={() => showNotification('success', 'Moodboard saved to gallery')} />
          <ProductCustomizer onAddToCart={addToCart} />
          <BookingSystem onBooked={() => showNotification('success', 'Consultation booked successfully')} />
          <Team />
          <Estimator />
          <Pricing />
          <BeforeAfter />
          <Testimonials />
          <Brands />
          <Projects />
          <Stats />
          <Blog />
          <CTA />
        </main>

        <Footer onSubscribe={() => showNotification('success', 'Successfully subscribed to newsletter!')} />
        <Chatbot />
        
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckoutStart}
        />

        <AnimatePresence>
          {isCheckoutOpen && (
            <CheckoutModal 
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              total={cartTotal}
              onComplete={handleCheckoutComplete}
            />
          )}
          {isAuthModalOpen && (
            <AuthModal 
              isOpen={isAuthModalOpen} 
              onClose={() => setIsAuthModalOpen(false)} 
              onLogin={handleLogin}
            />
          )}
          {isProfileOpen && user && (
            <UserProfile
              isOpen={isProfileOpen}
              onClose={() => setIsProfileOpen(false)}
              user={user}
              onLogout={handleLogout}
              onUpdateUser={handleUpdateUser}
            />
          )}
          {isSearchOpen && (
            <SearchModal 
              isOpen={isSearchOpen} 
              onClose={() => setIsSearchOpen(false)} 
            />
          )}
          {isDeveloperOpen && (
            <DeveloperProfile 
              onClose={() => setIsDeveloperOpen(false)} 
            />
          )}
          {isClientPortalOpen && (
            <ClientDashboard 
              onClose={() => setIsClientPortalOpen(false)} 
            />
          )}
          {isStyleQuizOpen && (
            <StyleQuiz 
              isOpen={isStyleQuizOpen}
              onClose={() => setIsStyleQuizOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </WelcomeScreen>
  );
}

export default App;