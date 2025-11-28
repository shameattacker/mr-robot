
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 md:p-10"
          onClick={onClose}
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10"
          >
            <X size={40} />
          </button>

          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(205,162,116,0.2)] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/594Ok9I4CK4?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1" 
                title="Interno Design Cinematic" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="w-full h-full object-cover"
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
