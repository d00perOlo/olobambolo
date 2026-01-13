import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Fleet from './components/Fleet';
import ChargingInfrastructure from './components/ChargingInfrastructure';
import Process from './components/Process';
import Booking from './components/Booking';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import MotionBackground from './components/MotionBackground';
import MobileNav from './components/MobileNav';

export default function App() {
  const [isPluggedIn, setIsPluggedIn] = useState(false);

  return (
    <div className="relative">
      <a className="skip-link" href="#main">Przejdź do treści</a>
      
      <MotionBackground />
      <Navbar />

      <main id="main">
        <div id="top" className="h-0" />
        <Hero />
        <Stats />
        <Fleet />
        <ChargingInfrastructure onConnectChange={setIsPluggedIn} />
        <Process />
        <Booking isPluggedIn={isPluggedIn} />
        <FinalCTA />
      </main>

      <Footer />
      
      <MobileNav />
    </div>
  );
}