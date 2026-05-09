"use client";

import { motion } from "framer-motion";
import { Cpu, Zap, Activity, BrainCircuit, ArrowUpRight } from "lucide-react";

const recommendations = [
  "REROUTE: 3 Supply Units from HSR to Whitefield (Demand Cluster Detected)",
  "OPTIMIZE: Volunteer cluster #42 merged for multi-drop efficiency",
  "ALERT: Shelter capacity at NGO_HUB_01 reaching 95%",
  "TRAFFIC: Congestion Indiranagar 12th Main - updating ETAs",
  "SUPPLY: New bulk donation validated at Koramangala Warehouse",
];

export default function MissionIntelligenceCore() {
  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* 1. Central Intelligence Bezel (Now at Top) */}
      <div className="h-[320px] glass rounded-2xl border border-white/5 bg-dark-950/40 relative overflow-hidden flex flex-col shrink-0">
        
        {/* Background Radar Effect */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
           <div className="w-[400px] h-[400px] border border-neon-blue rounded-full absolute animate-ping" style={{ animationDuration: '4s' }} />
           <div className="w-[280px] h-[280px] border border-neon-blue/40 rounded-full absolute" />
           <div className="w-[150px] h-[150px] border border-neon-blue/20 rounded-full absolute" />
        </div>

        {/* Header Branding */}
        <div className="p-5 flex justify-between items-start z-10 bg-gradient-to-b from-dark-950 to-transparent">
           <div>
              <div className="flex items-center gap-2 mb-1">
                 <BrainCircuit className="w-3.5 h-3.5 text-neon-blue" />
                 <span className="text-[9px] font-black text-neon-blue uppercase tracking-[0.3em]">AI Optimization Core</span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">OMNI_INTELLIGENCE</h2>
           </div>
           <div className="text-right">
              <div className="text-[18px] font-black text-white font-mono leading-none">98.4<span className="text-neon-blue text-xs ml-0.5">%</span></div>
              <div className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Efficiency</div>
           </div>
        </div>

        {/* Central Display */}
        <div className="flex-1 flex items-center justify-center relative z-10 pb-4">
           <div className="relative group cursor-crosshair scale-75 lg:scale-90">
              {/* Outer Ring */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-36 h-36 rounded-full border-2 border-dashed border-neon-blue/30 flex items-center justify-center"
              />
              {/* Inner Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-24 rounded-full glass border border-white/10 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(76,201,240,0.15)] bg-dark-900/40">
                    <Activity className="w-6 h-6 text-neon-blue mb-1 animate-pulse" />
                    <div className="text-[7px] font-black text-gray-500 uppercase tracking-widest">System Load</div>
                    <div className="text-sm font-black text-white font-mono">MODERATE</div>
                 </div>
              </div>
              {/* Floating Orbitals */}
              <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 pointer-events-none"
              >
                 <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-neon-red shadow-[0_0_8px_rgba(247,37,133,0.8)]" />
                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_rgba(0,245,141,0.8)]" />
              </motion.div>
           </div>
        </div>
      </div>

      {/* 2. Integrated Metrics Bezel */}
      <div className="glass rounded-2xl border border-white/5 bg-white/[0.02] p-6 grid grid-cols-3 gap-6 relative z-10 shrink-0">
         <div className="text-center">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Active Nodes</div>
            <div className="text-2xl font-black text-white font-mono">1.2K</div>
         </div>
         <div className="text-center border-x border-white/5">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Latency</div>
            <div className="text-2xl font-black text-neon-blue font-mono">0.4ms</div>
         </div>
         <div className="text-center">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Bandwidth</div>
            <div className="text-2xl font-black text-neon-green font-mono">94%</div>
         </div>
      </div>

      {/* 3. AI Insights Panel */}
      <div className="h-[180px] glass rounded-2xl border border-white/5 bg-dark-900/60 p-5 overflow-hidden flex flex-col shrink-0">
         <div className="flex items-center gap-3 mb-4 shrink-0">
            <Zap className="w-4 h-4 text-neon-orange" />
            <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live AI Optimization Recommendations</h3>
         </div>
         <div className="flex-1 space-y-3 overflow-hidden relative">
            {recommendations.map((rec, i) => (
               <motion.div 
                 key={i}
                 initial={{ x: -20, opacity: 0 }}
                 animate={{ x: 0, opacity: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="flex items-center gap-3 group cursor-pointer"
               >
                  <div className="w-1.5 h-1.5 rounded-full bg-neon-blue/40 group-hover:bg-neon-blue transition-colors" />
                  <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wide group-hover:text-white transition-colors">{rec}</p>
                  <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 text-neon-blue transition-all" />
               </motion.div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-dark-900 to-transparent pointer-events-none" />
         </div>
      </div>
    </div>
  );
}
