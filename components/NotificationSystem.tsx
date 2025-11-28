
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { Notification } from '../types';

interface NotificationSystemProps {
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

export const NotificationSystem: React.FC<NotificationSystemProps> = ({ notifications, removeNotification }) => {
  return (
    <div className="fixed top-24 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((note) => (
          <NotificationItem key={note.id} notification={note} onRemove={removeNotification} />
        ))}
      </AnimatePresence>
    </div>
  );
};

const NotificationItem: React.FC<{ notification: Notification; onRemove: (id: string) => void }> = ({ notification, onRemove }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(notification.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircle size={20} className="text-green-500" />;
      case 'error': return <XCircle size={20} className="text-red-500" />;
      default: return <Info size={20} className="text-blue-500" />;
    }
  };

  const getStyles = () => {
    switch (notification.type) {
      case 'success': return 'border-green-500/20 bg-green-500/10';
      case 'error': return 'border-red-500/20 bg-red-500/10';
      default: return 'border-blue-500/20 bg-blue-500/10';
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.9 }}
      className={`pointer-events-auto min-w-[300px] p-4 rounded-xl backdrop-blur-md border bg-[#1a1a1a]/90 shadow-2xl flex items-center gap-3 ${getStyles()}`}
    >
      <div className="shrink-0">
        {getIcon()}
      </div>
      <p className="text-sm font-medium text-white flex-1">{notification.message}</p>
      <button 
        onClick={() => onRemove(notification.id)}
        className="p-1 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
};
