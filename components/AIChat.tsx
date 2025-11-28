import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, ChatRole } from '../types';

export const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: ChatRole.MODEL, text: "Hello! I'm Interno AI. How can I help you design your dream space today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = inputText;
    setInputText('');
    setMessages(prev => [...prev, { role: ChatRole.USER, text: userMessage }]);
    setIsLoading(true);

    const response = await sendMessageToGemini(userMessage);

    setMessages(prev => [...prev, { role: ChatRole.MODEL, text: response }]);
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 bg-secondary text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <MessageSquare className="w-8 h-8" />
      </button>

      <div className={`fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[600px] bg-white rounded-[30px] shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-500 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'}`}>
        
        <div className="bg-secondary p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Sparkles className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-serif text-lg">Interno AI</h3>
              <p className="text-white/60 text-xs">Powered by Gemini</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-[#F4F0EC] space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === ChatRole.USER ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-sans leading-relaxed ${
                msg.role === ChatRole.USER 
                  ? 'bg-secondary text-white rounded-tr-none' 
                  : 'bg-white text-secondary shadow-sm rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask for design advice..."
              className="flex-1 p-3 bg-accent rounded-xl outline-none text-sm text-secondary focus:ring-1 focus:ring-primary transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputText.trim()}
              className="p-3 bg-primary text-white rounded-xl hover:bg-secondary disabled:opacity-50 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};