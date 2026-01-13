import React, { FormEvent, useState, useEffect } from 'react';

interface ChargingStation {
  id: string;
  name: string;
  address: string;
  power: string;
  status: 'available' | 'busy' | 'offline';
  dist: string;
  x: number; // Map percentage X
  y: number; // Map percentage Y
  isOloSiTi?: boolean;
}

const stationData: Record<string, ChargingStation[]> = {
  "Warszawa Centrum": [
    { id: 'w1', name: 'OloSiTiRENT Hub Złota', address: 'Złota 44, Warszawa', power: '350kW', status: 'available', dist: '0.2 km', x: 45, y: 55, isOloSiTi: true },
    { id: 'w2', name: 'SuperCharge PKiN', address: 'Plac Defilad 1, Warszawa', power: '150kW', status: 'busy', dist: '0.5 km', x: 55, y: 45 },
    { id: 'w3', name: 'VoltPoint Rondo ONZ', address: 'Rondo ONZ 1, Warszawa', power: '200kW', status: 'available', dist: '0.8 km', x: 35, y: 40 },
    { id: 'w4', name: 'West Station Charge', address: 'Al. Jerozolimskie, Warszawa', power: '50kW', status: 'available', dist: '1.5 km', x: 20, y: 70 },
  ],
  "Berlin Alexanderplatz": [
    { id: 'b1', name: 'Alex Power Grid', address: 'Alexanderplatz 1, Berlin', power: '350kW', status: 'available', dist: '0.1 km', x: 50, y: 50, isOloSiTi: true },
    { id: 'b2', name: 'B-Charge TV Tower', address: 'Panoramastraße 1, Berlin', power: '150kW', status: 'busy', dist: '0.3 km', x: 60, y: 40 },
    { id: 'b3', name: 'CityHub Berlin', address: 'Karl-Liebknecht-Str, Berlin', power: '350kW', status: 'available', dist: '0.6 km', x: 40, y: 65, isOloSiTi: true },
  ],
  "Londyn Canary Wharf": [
    { id: 'l1', name: 'Wharf HyperHub', address: 'Cabot Square, London', power: '400kW', status: 'available', dist: '0.4 km', x: 40, y: 45, isOloSiTi: true },
    { id: 'l2', name: 'Docklands Energy', address: 'Marsh Wall, London', power: '150kW', status: 'offline', dist: '1.2 km', x: 65, y: 60 },
    { id: 'l3', name: 'OloSiTiRENT Underground', address: 'Canada Square, London', power: '350kW', status: 'available', dist: '0.1 km', x: 50, y: 50, isOloSiTi: true },
  ],
  "Zielona Góra": [
    { id: 'z1', name: 'OloSiTiRENT Focus Mall', address: 'Wrocławska 17, Zielona Góra', power: '150kW', status: 'available', dist: '0.6 km', x: 60, y: 50, isOloSiTi: true },
    { id: 'z2', name: 'E-Station Centrum', address: 'Bohaterów Westerplatte, Z.G.', power: '50kW', status: 'available', dist: '1.1 km', x: 40, y: 40 },
    { id: 'z3', name: 'TechPark OloSiTiRENT', address: 'Nowy Kisielin, Z.G.', power: '350kW', status: 'available', dist: '3.5 km', x: 80, y: 20, isOloSiTi: true },
  ]
};

const Booking: React.FC<{ isPluggedIn?: boolean }> = ({ isPluggedIn }) => {
  const [selectedLocation, setSelectedLocation] = useState("Warszawa Centrum");
  const [nearbyStations, setNearbyStations] = useState<ChargingStation[]>(stationData["Warszawa Centrum"]);
  const [showStations, setShowStations] = useState(true);
  const [hoveredStation, setHoveredStation] = useState<string | null>(null);

  useEffect(() => {
    setNearbyStations(stationData[selectedLocation] || []);
  }, [selectedLocation]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('System engaging...');
  };

  // Top 3 closest stations for "Plug-in" highlight
  const top3Stations = nearbyStations.slice(0, 3).map(s => s.id);

  return (
    <section id="rezerwacja" className="py-20 md:py-24 px-6 bg-graphite-900 border-t border-graphite-600 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-full opacity-5 pointer-events-none skew-x-[-15deg] bg-gradient-to-l from-orange to-transparent"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-7xl font-black italic uppercase text-center tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">GOTOWY NA</span> <span className="text-orange">START?</span>
          </h2>
          <p className="text-center text-gray-500 italic font-bold uppercase tracking-widest text-xs mt-4">
            Pełna automatyzacja procesu. Kod odbioru otrzymasz w aplikacji.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <form className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={handleSubmit}>
            <div className="group md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-2">LOKALIZACJA ODBIORU</label>
              <select 
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="input-speed w-full py-4 px-4 cursor-pointer text-gray-300 focus:text-white appearance-none"
              >
                <option className="bg-graphite-800">Warszawa Centrum</option>
                <option className="bg-graphite-800">Berlin Alexanderplatz</option>
                <option className="bg-graphite-800">Londyn Canary Wharf</option>
                <option className="bg-graphite-800">Zielona Góra</option>
              </select>
            </div>

            <div className="group md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-2">KLASA MASZYNY</label>
              <select className="input-speed w-full py-4 px-4 cursor-pointer text-gray-300 focus:text-white appearance-none">
                <option className="bg-graphite-800">Hiper (2 Miejsca) - Top Speed Experience</option>
                <option className="bg-graphite-800">Grand Tour (4 Miejsca) - Long Distance Luxury</option>
                <option className="bg-graphite-800">Power SUV (4x4) - Versatile Performance</option>
                <option className="bg-graphite-800">Urban EV - City Efficiency</option>
              </select>
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-2">DATA STARTU</label>
              <input type="date" className="input-speed w-full py-4 px-4 uppercase text-gray-300 focus:text-white" />
            </div>

            <div className="group">
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-cyan mb-2">DATA ZWROTU</label>
              <input type="date" className="input-speed w-full py-4 px-4 uppercase text-gray-300 focus:text-white" />
            </div>

            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full btn-ignite py-5 text-xl skew-x-[-12deg] group relative overflow-hidden">
                <span className="skew-x-[12deg] block group-hover:tracking-[0.5em] transition-all">POTWIERDŹ START</span>
              </button>
              {isPluggedIn && (
                <div className="mt-4 bg-techGreen/10 border border-techGreen/30 p-3 flex items-center gap-3 animate-slide-up">
                  <div className="w-2 h-2 bg-techGreen rounded-full animate-ping"></div>
                  <span className="text-[10px] font-black text-techGreen uppercase tracking-widest">URZĄDZENIE SPAROWANE: WYŚWIETLANO NAJBLIŻSZE HUBY</span>
                </div>
              )}
            </div>
          </form>

          <div className="lg:col-span-6">
            <div className="bg-graphite-800 border border-white/5 p-6 skew-x-[-6deg] shadow-2xl relative overflow-hidden min-h-[500px]">
              <div className="skew-x-[6deg]">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-black italic uppercase text-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-techGreen rounded-full animate-pulse shadow-[0_0_8px_#00FF94]"></span>
                    Radar Infrastruktury: {selectedLocation}
                  </h3>
                  <div className="flex gap-2">
                    <button onClick={() => setShowStations(true)} className={`text-[10px] font-black px-3 py-1 ${showStations ? 'bg-orange text-black' : 'text-gray-500 border border-white/10'}`}>MAPA</button>
                    <button onClick={() => setShowStations(false)} className={`text-[10px] font-black px-3 py-1 ${!showStations ? 'bg-orange text-black' : 'text-gray-500 border border-white/10'}`}>LISTA</button>
                  </div>
                </div>

                {showStations ? (
                  <div className="relative w-full h-[350px] bg-void border border-white/5 rounded-sm overflow-hidden group/map">
                    {/* Map Grid */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    
                    {/* Stylized Buildings (Abstract) */}
                    <svg className="absolute inset-0 w-full h-full opacity-5 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <rect x="10" y="20" width="15" height="40" fill="white" />
                      <rect x="70" y="10" width="20" height="30" fill="white" />
                      <rect x="40" y="70" width="25" height="15" fill="white" />
                    </svg>

                    {/* Markers */}
                    {nearbyStations.map((station) => {
                      const isHighlighted = isPluggedIn && top3Stations.includes(station.id);
                      const isOlo = station.isOloSiTi;
                      
                      return (
                        <div 
                          key={station.id}
                          className={`absolute cursor-pointer transition-transform duration-300 hover:scale-125 z-10 ${hoveredStation === station.id ? 'z-20' : ''}`}
                          style={{ left: `${station.x}%`, top: `${station.y}%` }}
                          onMouseEnter={() => setHoveredStation(station.id)}
                          onMouseLeave={() => setHoveredStation(null)}
                        >
                          {/* Marker Body */}
                          <div className={`relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2`}>
                            {isOlo ? (
                              <div className={`w-8 h-8 flex items-center justify-center relative`}>
                                <div className={`absolute inset-0 bg-orange/20 blur-[8px] rounded-full ${isHighlighted ? 'animate-pulse' : ''}`}></div>
                                <svg viewBox="0 0 100 100" className={`w-full h-full ${isHighlighted ? 'drop-shadow-[0_0_8px_#FF3B00]' : ''}`}>
                                  <path d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z" fill="#FF3B00" />
                                  <text x="50" y="65" textAnchor="middle" fill="black" fontSize="40" fontWeight="900" style={{fontStyle: 'italic'}}>O</text>
                                </svg>
                              </div>
                            ) : (
                              <div className={`w-4 h-4 rounded-full border-2 border-cyan bg-void flex items-center justify-center ${isHighlighted ? 'shadow-[0_0_10px_#00F0FF]' : ''}`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${station.status === 'busy' ? 'bg-yellow-400' : (station.status === 'offline' ? 'bg-red-500' : 'bg-cyan')}`}></div>
                              </div>
                            )}

                            {/* Callout (Tooltip) */}
                            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-graphite-800 border border-white/10 p-2 pointer-events-none transition-all duration-200 shadow-2xl ${hoveredStation === station.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}>
                              <div className="text-[10px] font-black text-white uppercase italic truncate mb-1">{station.name}</div>
                              <div className="flex justify-between items-center text-[8px] text-gray-400 font-bold tracking-widest uppercase">
                                <span>{station.power}</span>
                                <span className={station.status === 'available' ? 'text-techGreen' : 'text-orange'}>{station.status}</span>
                              </div>
                              <div className="absolute top-full left-1/2 -translate-x-1/2 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-graphite-800"></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    
                    {/* Map Legend */}
                    <div className="absolute bottom-4 left-4 flex gap-4 text-[8px] font-black uppercase tracking-widest text-gray-500 bg-void/80 p-2 backdrop-blur-sm">
                      <div className="flex items-center gap-1"><div className="w-2 h-2 bg-orange"></div> OLOSITIRENT HUB</div>
                      <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full border border-cyan"></div> STANDARD</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                    {nearbyStations.map((station) => (
                      <div 
                        key={station.id} 
                        className={`bg-void/50 border p-4 transition-colors group cursor-crosshair ${
                          isPluggedIn && top3Stations.includes(station.id) ? 'border-techGreen/50 bg-techGreen/5' : 'border-white/5 hover:border-orange/50'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`text-white font-bold italic text-sm transition-colors ${station.isOloSiTi ? 'text-orange' : 'group-hover:text-orange'}`}>{station.name}</span>
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase ${
                            station.status === 'available' ? 'bg-techGreen/20 text-techGreen' : 
                            station.status === 'busy' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-red-500/20 text-red-500'
                          }`}>
                            {station.status === 'available' ? 'DOSTĘPNA' : station.status === 'busy' ? 'ZAJĘTA' : 'OFFLINE'}
                          </span>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="text-[10px] text-gray-500 font-medium">
                            <p>{station.address}</p>
                            <p className="mt-1 text-cyan/70 font-mono tracking-tighter">MOC: {station.power} | DYSTANS: {station.dist}</p>
                          </div>
                          {isPluggedIn && top3Stations.includes(station.id) && (
                            <div className="text-techGreen flex items-center gap-1 text-[8px] font-black uppercase tracking-widest">
                              <span className="w-1.5 h-1.5 bg-techGreen rounded-full animate-pulse"></span> REKOMENDOWANA
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 border-t border-white/5 pt-6">
                  <div className="flex items-center gap-4">
                     <div className="flex-1 h-1 bg-white/5 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 h-full bg-orange ${isPluggedIn ? 'animate-warp w-full' : 'animate-warp-slow w-1/3'}`}></div>
                     </div>
                     <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">MAPA OPERACYJNA: AKTYWNA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #333; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: var(--orange); }
      `}</style>
    </section>
  );
};

export default Booking;