
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Video, CheckCircle, ChevronRight, ChevronLeft, Star, Download } from 'lucide-react';

interface BookingSystemProps {
    onBooked?: () => void;
}

const EXPERTS = [
  {
    id: 1,
    name: "Sarah Jenson",
    role: "Senior Interior Architect",
    rating: 4.9,
    image: "https://placehold.co/200x200/1a1a1a/ffffff?text=?",
    specialty: "Minimalist & Modern"
  },
  {
    id: 2,
    name: "David Knight",
    role: "Principal Designer",
    rating: 5.0,
    image: "https://placehold.co/200x200/1a1a1a/ffffff?text=?",
    specialty: "Luxury Residential"
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Lighting Specialist",
    rating: 4.8,
    image: "https://placehold.co/200x200/1a1a1a/ffffff?text=?",
    specialty: "Atmosphere & Smart Home"
  }
];

const TIME_SLOTS = [
  "09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"
];

export const BookingSystem: React.FC<BookingSystemProps> = ({ onBooked }) => {
  const [step, setStep] = useState(1);
  const [selectedExpert, setSelectedExpert] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dates, setDates] = useState<{day: string, date: number, full: Date}[]>([]);

  useEffect(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      days.push({
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        date: d.getDate(),
        full: d
      });
    }
    setDates(days);
  }, []);

  const handleNext = () => {
    if (step === 1 && selectedExpert) setStep(2);
    if (step === 2 && selectedTime) {
        setStep(3);
        if (onBooked) onBooked();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const expert = EXPERTS.find(e => e.id === selectedExpert);

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 mb-32" id="booking">
      <div className="text-center mb-12">
        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Consultation</span>
        <h2 className="font-serif text-4xl md:text-5xl text-secondary dark:text-white mb-4">Book a Video Call</h2>
        <p className="font-sans text-textGray dark:text-gray-400 max-w-2xl mx-auto">
           Schedule a 1-on-1 session with our top architects to discuss your vision remotely.
        </p>
      </div>

      <div className="bg-white dark:bg-darkCard rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 dark:border-white/5 min-h-[600px] flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 bg-secondary dark:bg-[#151515] p-10 text-white flex flex-col relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>

            <h3 className="text-2xl font-serif mb-8 relative z-10">Reservation</h3>
            
            <div className="space-y-8 relative z-10">
                <div className={`flex items-start gap-4 transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>1</div>
                    <div>
                        <h4 className="font-bold text-lg">Select Expert</h4>
                        <p className="text-sm text-gray-400">Choose your designer</p>
                    </div>
                </div>
                <div className={`flex items-start gap-4 transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>2</div>
                    <div>
                        <h4 className="font-bold text-lg">Date & Time</h4>
                        <p className="text-sm text-gray-400">Check availability</p>
                    </div>
                </div>
                <div className={`flex items-start gap-4 transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 3 ? 'bg-primary text-white' : 'bg-white/10 text-gray-400'}`}>3</div>
                    <div>
                        <h4 className="font-bold text-lg">Confirmation</h4>
                        <p className="text-sm text-gray-400">Get your digital pass</p>
                    </div>
                </div>
            </div>

            {step === 3 && expert && (
                <div className="mt-auto pt-10 relative z-10 animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-3 mb-3">
                            <img src={expert.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                            <div>
                                <div className="font-bold text-sm">{expert.name}</div>
                                <div className="text-xs opacity-70">{expert.role}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs opacity-80">
                            <Video size={14} /> Video Call Link Generated
                        </div>
                    </div>
                </div>
            )}
        </div>

        <div className="flex-1 p-8 md:p-12 bg-gray-50 dark:bg-darkCard relative">
            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full flex flex-col"
                    >
                        <h3 className="text-2xl font-serif text-secondary dark:text-white mb-6">Choose an Expert</h3>
                        <div className="grid grid-cols-1 gap-4">
                            {EXPERTS.map((exp) => (
                                <button
                                    key={exp.id}
                                    onClick={() => setSelectedExpert(exp.id)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left group ${
                                        selectedExpert === exp.id 
                                        ? 'border-primary bg-white dark:bg-white/5 shadow-lg' 
                                        : 'border-transparent bg-white dark:bg-white/5 hover:border-gray-200 dark:hover:border-white/10'
                                    }`}
                                >
                                    <img src={exp.image} alt={exp.name} className="w-16 h-16 rounded-xl object-cover" />
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-lg text-secondary dark:text-white">{exp.name}</h4>
                                            <div className="flex items-center gap-1 text-primary text-sm">
                                                <Star size={14} fill="#CDA274" /> {exp.rating}
                                            </div>
                                        </div>
                                        <p className="text-sm text-primary font-medium mb-1">{exp.role}</p>
                                        <p className="text-xs text-gray-500">{exp.specialty}</p>
                                    </div>
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedExpert === exp.id ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
                                        {selectedExpert === exp.id && <CheckCircle size={14} />}
                                    </div>
                                </button>
                            ))}
                        </div>
                        <div className="mt-auto flex justify-end pt-8">
                            <button 
                                onClick={handleNext}
                                disabled={!selectedExpert}
                                className="px-8 py-3 bg-secondary dark:bg-white text-white dark:text-secondary rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
                            >
                                Continue <ChevronRight size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full flex flex-col"
                    >
                        <h3 className="text-2xl font-serif text-secondary dark:text-white mb-6">Select Availability</h3>
                        
                        <div className="mb-8">
                            <label className="text-xs font-bold uppercase text-gray-500 mb-3 block">October 2025</label>
                            <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                                {dates.map((d, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedDate(idx)}
                                        className={`min-w-[70px] p-3 rounded-xl flex flex-col items-center gap-1 transition-all border ${
                                            selectedDate === idx 
                                            ? 'bg-primary text-white border-primary shadow-lg' 
                                            : 'bg-white dark:bg-white/5 text-secondary dark:text-gray-300 border-gray-100 dark:border-white/10 hover:border-primary/50'
                                        }`}
                                    >
                                        <span className="text-xs font-medium uppercase">{d.day}</span>
                                        <span className="text-xl font-bold font-serif">{d.date}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <label className="text-xs font-bold uppercase text-gray-500 mb-3 block">Available Slots</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {TIME_SLOTS.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 px-4 rounded-xl text-sm font-bold transition-all border ${
                                            selectedTime === time 
                                            ? 'bg-secondary dark:bg-white text-white dark:text-secondary border-transparent' 
                                            : 'bg-white dark:bg-white/5 text-gray-500 border-gray-100 dark:border-white/10 hover:border-primary'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto flex justify-between pt-8">
                            <button 
                                onClick={handleBack}
                                className="px-6 py-3 text-gray-500 hover:text-secondary dark:hover:text-white transition-colors"
                            >
                                Back
                            </button>
                            <button 
                                onClick={handleNext}
                                disabled={!selectedTime}
                                className="px-8 py-3 bg-primary text-white rounded-xl font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-lg shadow-primary/30"
                            >
                                Confirm Booking <CheckCircle size={18} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && expert && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full flex flex-col items-center justify-center"
                    >
                        <div className="w-full max-w-sm bg-white dark:bg-[#1a1a1a] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-white/10 relative">
                            <div className="bg-secondary dark:bg-primary p-6 text-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                <h3 className="text-white font-serif text-2xl relative z-10">Booking Confirmed</h3>
                                <div className="text-white/70 text-sm relative z-10">Check your email for details</div>
                            </div>
                            
                            <div className="h-4 bg-secondary dark:bg-primary relative">
                                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-gray-50 dark:bg-darkCard rounded-full"></div>
                                <div className="absolute -bottom-3 -right-3 w-6 h-6 bg-gray-50 dark:bg-darkCard rounded-full"></div>
                                <div className="absolute bottom-0 left-3 right-3 border-b-2 border-dashed border-white/20"></div>
                            </div>

                            <div className="p-8 flex flex-col gap-6">
                                <div className="flex justify-between items-end pb-4 border-b border-dashed border-gray-200 dark:border-gray-700">
                                    <div>
                                        <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Date</label>
                                        <div className="text-lg font-bold text-secondary dark:text-white">{dates[selectedDate].day}, Oct {dates[selectedDate].date}</div>
                                    </div>
                                    <div className="text-right">
                                        <label className="text-xs text-gray-400 uppercase tracking-wider block mb-1">Time</label>
                                        <div className="text-lg font-bold text-primary">{selectedTime}</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <img src={expert.image} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-primary" />
                                    <div>
                                        <div className="font-bold text-secondary dark:text-white">{expert.name}</div>
                                        <div className="text-xs text-gray-500">Video Consultation</div>
                                    </div>
                                </div>

                                <div className="bg-gray-100 dark:bg-black/20 p-4 rounded-xl flex items-center justify-between">
                                    <div className="text-xs font-mono text-gray-500">MEETING ID</div>
                                    <div className="text-sm font-mono font-bold text-secondary dark:text-white">884-291-003</div>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5">
                                <button className="w-full py-3 border-2 border-dashed border-primary/30 text-primary rounded-xl font-bold text-sm hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center justify-center gap-2">
                                    <Download size={16} /> Download Pass
                                </button>
                            </div>
                        </div>
                        
                        <button 
                            onClick={() => { setStep(1); setSelectedExpert(null); setSelectedTime(null); }}
                            className="mt-8 text-gray-400 hover:text-secondary dark:hover:text-white transition-colors text-sm"
                        >
                            Book Another Session
                        </button>
                    </motion.div>
                )}

            </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
