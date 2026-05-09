"use client";

import { motion } from "framer-motion";
import { MapPin, Target, Activity } from "lucide-react";

const locations = [
  { id: "whitefield", name: "WHITEFIELD", x: "75%", y: "45%", load: "HIGH", color: "text-neon-red" },
  { id: "indiranagar", name: "INDIRANAGAR", x: "55%", y: "40%", load: "MEDIUM", color: "text-neon-blue" },
  { id: "hsr", name: "HSR_LAYOUT", x: "60%", y: "65%", load: "CRITICAL", color: "text-neon-red" },
  { id: "btm", name: "BTM_LAYOUT", x: "50%", y: "70%", load: "NOMINAL", color: "text-neon-green" },
  { id: "koramangala", name: "KORAMANGALA", x: "52%", y: "58%", load: "HIGH", color: "text-neon-blue" },
];

export default function TacticalMap() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-dark-950 flex items-center justify-center">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #4cf1f0 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* Stylized Bangalore Map SVG Placeholder */}
      <svg className="w-[80%] h-[80%] opacity-20 text-neon-blue" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
        <motion.path 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          d="M30,20 L70,20 L85,40 L80,70 L60,85 L40,85 L20,70 L15,40 Z" 
        />
        <path d="M40,20 L40,85" strokeDasharray="2 2" />
        <path d="M60,20 L60,85" strokeDasharray="2 2" />
        <path d="M15,50 L85,50" strokeDasharray="2 2" />
      </svg>

      {/* Scanning Line */}
      <motion.div
        animate={{ y: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-neon-blue to-transparent shadow-[0_0_15px_rgba(76,201,240,0.8)] z-10 pointer-events-none"
      />

      {/* Location Markers & Heat Pulses */}
      {locations.map((loc) => (
        <div 
          key={loc.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2"
          style={{ left: loc.x, top: loc.y }}
        >
          {/* Heat Pulse */}
          <div className="relative">
            <motion.div 
              animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              className={`absolute inset-0 w-12 h-12 -left-6 -top-6 rounded-full blur-xl ${loc.load === 'CRITICAL' || loc.load === 'HIGH' ? 'bg-neon-red/30' : 'bg-neon-blue/30'}`}
            />
            <div className={`w-3 h-3 rounded-full border-2 border-white shadow-[0_0_10px_white] relative z-20 ${loc.load === 'CRITICAL' ? 'bg-neon-red' : 'bg-neon-blue'}`} />
            
            {/* Label */}
            <div className="absolute top-4 left-4 whitespace-nowrap bg-dark-900/80 backdrop-blur-md border border-white/10 p-2 rounded shadow-2xl z-30">
               <div className="text-[10px] font-black text-white tracking-widest">{loc.name}</div>
               <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[8px] font-bold uppercase ${loc.color}`}>{loc.load} LOAD</span>
                  <div className="w-10 h-1 bg-dark-600 rounded-full overflow-hidden">
                     <div className={`h-full ${loc.color.replace('text-', 'bg-')} w-[70%]`} />
                  </div>
               </div>
            </div>
          </div>
        </div>
      ))}

      {/* Map Legend */}
      <div className="absolute bottom-6 right-6 glass p-4 border border-white/10 space-y-3">
         <div className="text-[9px] font-black text-gray-500 uppercase tracking-widest border-b border-white/5 pb-2">Tactical Legend</div>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neon-red shadow-[0_0_8px_rgba(247,37,133,0.8)]" />
            <span className="text-[9px] text-gray-400 font-bold uppercase">Critical Demand</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neon-blue shadow-[0_0_8px_rgba(76,201,240,0.8)]" />
            <span className="text-[9px] text-gray-400 font-bold uppercase">Active Supply</span>
         </div>
         <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_rgba(0,245,141,0.8)]" />
            <span className="text-[9px] text-gray-400 font-bold uppercase">Nominal Zone</span>
         </div>
      </div>

      {/* Floating Meta */}
      <div className="absolute top-6 right-6 text-right">
         <div className="text-[10px] font-black text-white uppercase tracking-[0.2em] mb-1">SCAN_MODE: ACTIVE</div>
         <div className="text-[8px] font-mono text-gray-500 uppercase">COORD: 12.9716° N, 77.5946° E</div>
      </div>
    </div>
  );
}
