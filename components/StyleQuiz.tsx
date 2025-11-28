import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Sparkles, Check, Loader2, ArrowRight, RefreshCcw } from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface StyleQuizProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    label: string;
    image: string;
    style: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "Which color palette speaks to you?",
    options: [
      { id: 'q1a', label: 'Earthy Neutrals', image: 'https://placehold.co/400x300/e6d6c3/292f36?text=Neutrals', style: 'Minimalist' },
      { id: 'q1b', label: 'Bold & Vibrant', image: 'https://placehold.co/400x300/cda274/ffffff?text=Bold', style: 'Modern' },
      { id: 'q1c', label: 'Soft Pastels', image: 'https://placehold.co/400x300/f4f0ec/292f36?text=Pastels', style: 'Scandinavian' },
      { id: 'q1d', label: 'Dark & Moody', image: 'https://placehold.co/400x300/1a1a1a/ffffff?text=Moody', style: 'Industrial' },
    ]
  },
  {
    id: 2,
    text: "Select your ideal living room vibe.",
    options: [
      { id: 'q2a', label: 'Clean & Uncluttered', image: 'https://placehold.co/400x300/222/fff?text=Clean', style: 'Minimalist' },
      { id: 'q2b', label: 'Cozy & Layered', image: 'https://placehold.co/400x300/333/fff?text=Cozy', style: 'Bohemian' },
      { id: 'q2c', label: 'Sleek & Shiny', image: 'https://placehold.co/400x300/444/fff?text=Sleek', style: 'Modern' },
      { id: 'q2d', label: 'Raw & Unfinished', image: 'https://placehold.co/400x300/555/fff?text=Raw', style: 'Industrial' },
    ]
  },
  {
    id: 3,
    text: "Pick a material you love.",
    options: [
      { id: 'q3a', label: 'Natural Wood', image: 'https://placehold.co/400x300/666/fff?text=Wood', style: 'Scandinavian' },
      { id: 'q3b', label: 'Glass & Steel', image: 'https://placehold.co/400x300/777/fff?text=Steel', style: 'Modern' },
      { id: 'q3c', label: 'Velvet & Brass', image: 'https://placehold.co/400x300/888/fff?text=Velvet', style: 'Art Deco' },
      { id: 'q3d', label: 'Concrete & Brick', image: 'https://placehold.co/400x300/999/fff?text=Concrete', style: 'Industrial' },
    ]
  }
];

export const StyleQuiz: React.FC<StyleQuizProps> = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleOptionSelect = (style: string) => {
    const newAnswers = [...answers, style];
    setAnswers(newAnswers);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      const counts: Record<string, number> = {};
      finalAnswers.forEach(style => {
        counts[style] = (counts[style] || 0) + 1;
      });
      const topStyle = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
      setResult(topStyle);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setIsAnalyzing(false);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <MotionDiv
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-[#1a1a1a] w-full max-w-4xl min-h-[600px] rounded-[40px] shadow-2xl overflow-hidden relative flex flex-col"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <div className="p-8 flex justify-between items-center border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-serif text-xl text-secondary dark:text-white">AI Style Finder</h3>
                <p className="text-xs text-gray-500">Discover your interior personality</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
              <X size={24} className="text-gray-500" />
            </button>
          </div>

          <div className="flex-1 p-8 flex flex-col">
            {isAnalyzing ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <Loader2 size={48} className="text-primary animate-spin mb-4" />
                <h3 className="text-2xl font-serif text-secondary dark:text-white mb-2">Analyzing Your Choices</h3>
                <p className="text-gray-500">Our AI is curating your perfect style profile...</p>
              </div>
            ) : result ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-6 shadow-xl">
                  <Sparkles size={40} className="text-white" />
                </div>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Your Style Is</h2>
                <h1 className="text-5xl md:text-6xl font-serif text-secondary dark:text-white mb-6">{result}</h1>
                <p className="max-w-md text-gray-500 mb-10 leading-relaxed">
                  You appreciate aesthetics that balance form and function. {result} design emphasizes clean lines, organic textures, and a harmonious color palette.
                </p>
                <div className="flex gap-4">
                    <button onClick={resetQuiz} className="px-8 py-3 border border-gray-200 dark:border-white/10 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-secondary dark:text-white">
                        <RefreshCcw size={18} /> Retake Quiz
                    </button>
                    <button onClick={onClose} className="px-8 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 hover:bg-secondary transition-colors shadow-lg shadow-primary/30">
                        View Projects <ArrowRight size={18} />
                    </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="mb-8">
                    <div className="flex justify-between text-sm font-bold text-gray-400 mb-2">
                        <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
                        <span>{Math.round(((currentQuestion) / QUESTIONS.length) * 100)}%</span>
                    </div>
                    <div className="h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <MotionDiv 
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
                            className="h-full bg-primary"
                        />
                    </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-serif text-center text-secondary dark:text-white mb-10">
                    {QUESTIONS[currentQuestion].text}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {QUESTIONS[currentQuestion].options.map((option, idx) => (
                        <MotionButton
                            key={option.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            onClick={() => handleOptionSelect(option.style)}
                            className="group relative h-48 rounded-2xl overflow-hidden text-left"
                        >
                            <img src={option.image} alt={option.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <h3 className="text-xl font-serif text-white group-hover:translate-x-2 transition-transform">{option.label}</h3>
                            </div>
                            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Check size={14} className="text-white" />
                            </div>
                        </MotionButton>
                    ))}
                </div>
              </div>
            )}
          </div>
        </MotionDiv>
      </MotionDiv>
    </AnimatePresence>
  );
};