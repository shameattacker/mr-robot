import React from 'react';

export const Brands: React.FC = () => {
  const brands = [
    { id: 1, content: <div className="flex items-center gap-1"><span className="font-serif text-3xl font-bold text-white">Modern</span><span className="font-sans text-2xl text-primary font-light">Home</span></div> },
    { id: 2, content: <div className="relative w-20 h-20 flex items-center justify-center border-2 border-white rounded-full"><span className="font-serif text-3xl italic text-white">Vs</span></div> },
    { id: 3, content: <div className="flex items-center gap-2"><div className="w-10 h-10 bg-white rounded-md flex items-center justify-center text-black font-black text-xl">B</div><span className="font-sans font-black text-2xl tracking-[0.2em] text-white">RAND</span></div> },
    { id: 4, content: <div className="text-center"><h3 className="text-3xl font-serif tracking-widest uppercase text-white">Classic</h3></div> },
    { id: 5, content: <div className="flex flex-col items-center relative"><span className="font-serif text-2xl text-white">Nature Home</span></div> },
  ];

  return (
    <section className="w-full border-y border-white/5 bg-[#111] py-16 mb-32 overflow-hidden relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1B1B1B] to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#1B1B1B] to-transparent z-10"></div>
      
      <div className="flex w-[200%] animate-shine opacity-60 hover:opacity-100 transition-opacity duration-500" style={{ animation: 'marquee 25s linear infinite' }}>
        {[...brands, ...brands, ...brands, ...brands].map((brand, idx) => (
            <div key={idx} className="flex-1 flex justify-center items-center min-w-[250px] grayscale hover:grayscale-0 transition-all duration-500">
                {brand.content}
            </div>
        ))}
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};