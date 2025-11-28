import React, { useState, useEffect } from 'react';
import { X, User as UserIcon, LogOut, Save, Camera, Edit3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from '../App';

const MotionDiv = motion.div as any;

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onLogout: () => void;
  onUpdateUser: (user: User) => void;
}

const AVATAR_PRESETS = [
  "https://placehold.co/150x150/CDA274/ffffff?text=A",
  "https://placehold.co/150x150/292F36/ffffff?text=B",
  "https://placehold.co/150x150/E6D6C3/292F36?text=C",
  "https://placehold.co/150x150/1B1B1B/ffffff?text=D",
  "https://placehold.co/150x150/FF6B6B/ffffff?text=E",
];

export const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose, user, onLogout, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(user.name);
      setAvatar(user.avatar);
      setIsEditing(false);
      setShowAvatarSelector(false);
    }
  }, [isOpen, user]);

  const handleSave = () => {
    onUpdateUser({ ...user, name, avatar });
    setIsEditing(false);
    setShowAvatarSelector(false);
  };

  if (!isOpen) return null;

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-secondary/60 dark:bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <MotionDiv 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        className="bg-white dark:bg-darkCard rounded-[40px] w-full max-w-[500px] overflow-hidden shadow-2xl relative flex flex-col"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div className="relative h-32 bg-secondary dark:bg-primary">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
            >
                <X className="w-6 h-6" />
            </button>
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <div className="relative group">
                    <img 
                        src={avatar} 
                        alt={name} 
                        className="w-32 h-32 rounded-full border-4 border-white dark:border-darkCard object-cover shadow-lg bg-white" 
                    />
                    {isEditing && (
                        <button 
                            onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                            className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
                        >
                            <Camera size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>

        <div className="pt-20 pb-8 px-8 flex flex-col items-center">
            
            <AnimatePresence>
                {showAvatarSelector && isEditing && (
                    <MotionDiv 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mb-6 w-full overflow-hidden"
                    >
                        <p className="text-sm text-center text-textGray dark:text-gray-400 mb-3">Select an avatar</p>
                        <div className="flex justify-center gap-3 flex-wrap">
                            {AVATAR_PRESETS.map((preset, idx) => (
                                <button 
                                    key={idx}
                                    onClick={() => setAvatar(preset)}
                                    className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all ${avatar === preset ? 'border-primary scale-110' : 'border-transparent hover:scale-105'}`}
                                >
                                    <img src={preset} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </MotionDiv>
                )}
            </AnimatePresence>

            {isEditing ? (
                <div className="w-full space-y-4 mb-8">
                    <div>
                        <label className="text-xs uppercase tracking-wider text-textGray dark:text-gray-400 font-bold mb-1 block">Display Name</label>
                        <input 
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 bg-gray-100 dark:bg-darkBg dark:text-white rounded-xl outline-none border-2 border-transparent focus:border-primary transition-all font-serif text-xl text-center"
                        />
                    </div>
                    <div className="opacity-50">
                        <label className="text-xs uppercase tracking-wider text-textGray dark:text-gray-400 font-bold mb-1 block text-center">Email (Cannot change)</label>
                        <div className="text-center font-sans text-lg text-secondary dark:text-white">{user.email}</div>
                    </div>
                </div>
            ) : (
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif text-secondary dark:text-white mb-2">{user.name}</h2>
                    <p className="text-textGray dark:text-gray-400 font-sans">{user.email}</p>
                    <div className="mt-4 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-bold">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Active Member
                    </div>
                </div>
            )}

            <div className="flex gap-4 w-full">
                {isEditing ? (
                    <>
                         <button 
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-secondary dark:text-white font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleSave}
                            className="flex-1 py-3 rounded-xl bg-primary text-white font-bold hover:bg-secondary transition-colors flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> Save
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            onClick={onLogout}
                            className="flex-1 py-3 rounded-xl border-2 border-red-100 dark:border-red-900/30 text-red-500 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                        >
                            <LogOut size={18} /> Log Out
                        </button>
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex-1 py-3 rounded-xl bg-secondary dark:bg-primary text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Edit3 size={18} /> Edit Profile
                        </button>
                    </>
                )}
            </div>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
};