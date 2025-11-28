import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['hello', 'hi', 'hey', 'start'],
    answer: "Hello! Welcome to Interno. How can I help you with your interior design journey today?"
  },
  {
    keywords: ['price', 'cost', 'much', 'quote', 'fee'],
    answer: "Our design consultation starts at $150/hour. Full project implementations vary based on scope. Would you like to request a free estimate?"
  },
  {
    keywords: ['contact', 'email', 'phone', 'call', 'reach'],
    answer: "You can reach us at contact@interno.com or call us directly at (123) 456 - 7890. We are open Mon-Fri, 9am - 6pm."
  },
  {
    keywords: ['service', 'offer', 'do'],
    answer: "We offer Interior Design, Furniture Selection, Flooring Solutions, and comprehensive Project Management."
  },
  {
    keywords: ['location', 'address', 'where'],
    answer: "We are located at 55 East Birchwood Ave. Brooklyn, New York 11201, USA."
  },
  {
    keywords: ['thank', 'thanks'],
    answer: "You're very welcome! Let us know if you need anything else."
  }
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! I'm the Interno Assistant. Ask me about our services, pricing, or contact info!", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const findAnswer = (text: string) => {
    const lowerText = text.toLowerCase();
    const match = KNOWLEDGE_BASE.find(item => 
      item.keywords.some(keyword => lowerText.includes(keyword))
    );
    return match ? match.answer : "I'm not sure about that specifically. Could you please try asking about our 'services', 'pricing', or 'contact' details?";
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const answer = findAnswer(userMsg.text);
      const botMsg = { id: Date.now() + 1, text: answer, isBot: true };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <MotionButton
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 right-8 w-16 h-16 bg-secondary dark:bg-primary text-white rounded-full shadow-2xl flex items-center justify-center z-50 transition-transform ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
      >
        <MessageCircle size={32} />
      </MotionButton>

      <AnimatePresence>
        {isOpen && (
          <MotionDiv
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-8 right-4 md:right-8 w-[90vw] md:w-[380px] h-[500px] bg-white dark:bg-darkCard rounded-[30px] shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100 dark:border-gray-700"
          >
            <div className="bg-secondary dark:bg-primary p-5 flex justify-between items-center text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg">Interno Help</h3>
                  <p className="text-xs opacity-80">Online | Automated Support</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-darkBg/50 space-y-4">
              {messages.map((msg) => (
                <MotionDiv
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                      msg.isBot
                        ? 'bg-white dark:bg-darkCard text-textGray dark:text-gray-200 rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700'
                        : 'bg-secondary dark:bg-primary text-white rounded-tr-none shadow-md'
                    }`}
                  >
                    {msg.text}
                  </div>
                </MotionDiv>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-darkCard p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700 flex gap-1.5">
                    <MotionDiv animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    <MotionDiv animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                    <MotionDiv animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white dark:bg-darkCard border-t border-gray-100 dark:border-gray-700 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 bg-gray-100 dark:bg-darkBg text-secondary dark:text-white px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 bg-secondary dark:bg-primary text-white rounded-xl flex items-center justify-center hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};