import React from 'react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 text-center relative overflow-hidden bg-orange">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-multiply"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-6xl font-black italic uppercase text-black mb-5 leading-[0.85]">
          BEZ GRANIC.<br/>BEZ KOMPROMISÓW.
        </h2>
        <div className="flex justify-center mt-8">
          <a href="#rezerwacja" className="bg-graphite text-white px-10 py-4 text-lg font-black italic uppercase tracking-widest hover:scale-105 transition-transform skew-x-[-12deg] border border-black hover:border-white">
            <span className="skew-x-[12deg] block">POBIERZ APKĘ</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;