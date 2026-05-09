"use client";

import { motion } from "framer-motion";
import { Users, Star, CheckCircle2, Navigation, ShieldCheck, Zap } from "lucide-react";
import { mockVolunteers, type Volunteer } from "@/data/mockData";

const statusStyles: Record<Volunteer["status"], { label: string; dot: string; text: string; badge: string }> = {
  available: {
    label: "Available",
    dot: "bg-neon-green",
    text: "text-neon-green",
    badge: "bg-neon-green/5 text-neon-green border-neon-green/20",
  },
  assigned: {
    label: "Assigned",
    dot: "bg-neon-orange",
    text: "text-neon-orange",
    badge: "bg-neon-orange/5 text-neon-orange border-neon-orange/20",
  },
  "in-transit": {
    label: "In Transit",
    dot: "bg-neon-blue",
    text: "text-neon-blue",
    badge: "bg-neon-blue/5 text-neon-blue border-neon-blue/20",
  },
  offline: {
    label: "Offline",
    dot: "bg-gray-700",
    text: "text-gray-500",
    badge: "bg-dark-600 text-gray-500 border-white/5",
  },
};

const skillColors: Record<string, string> = {
  pickup: "text-neon-blue border-neon-blue/20 bg-neon-blue/5",
  delivery: "text-neon-green border-neon-green/20 bg-neon-green/5",
  driving: "text-neon-orange border-neon-orange/20 bg-neon-orange/5",
  sorting: "text-neon-purple border-neon-purple/20 bg-neon-purple/5",
  coordination: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  "first-aid": "text-neon-red border-neon-red/20 bg-neon-red/5",
  logistics: "text-pink-400 border-pink-400/20 bg-pink-400/5",
  packing: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",
  outreach: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
};

export default function VolunteerPanel() {
  const available = mockVolunteers.filter((v) => v.status === "available").length;
  const assigned = mockVolunteers.filter((v) => v.status === "assigned").length;
  const inTransit = mockVolunteers.filter((v) => v.status === "in-transit").length;

  return (
    <div className="glass rounded-xl h-full flex flex-col border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-dark-800/40 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-neon-green/10 flex items-center justify-center border border-neon-green/20 shadow-[0_0_10px_rgba(67,233,123,0.1)]">
            <ShieldCheck className="w-4 h-4 text-neon-green" />
          </div>
          <div>
            <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">Unit Network Registry</h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-tight">{mockVolunteers.length} Active Deployment Assets</p>
          </div>
        </div>
        
        {/* Network Health */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "STANDBY", value: available, color: "text-neon-green", dot: "bg-neon-green" },
            { label: "ACTIVE", value: assigned, color: "text-neon-orange", dot: "bg-neon-orange" },
            { label: "TRANSIT", value: inTransit, color: "text-neon-blue", dot: "bg-neon-blue" },
          ].map((s) => (
            <div key={s.label} className="bg-dark-900/50 border border-white/5 rounded-lg p-2.5 text-center">
              <div className={`text-xl font-black font-mono tracking-tighter ${s.color}`}>{s.value.toString().padStart(2, '0')}</div>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className={`w-1 h-1 rounded-full ${s.dot} shadow-[0_0_5px_${s.dot.replace('bg-', '')}]`} />
                <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment List */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3 min-h-0 custom-scrollbar">
        {mockVolunteers.map((v, index) => {
          const ss = statusStyles[v.status];
          return (
            <motion.div
              key={v.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex items-center gap-4 p-3.5 rounded-lg bg-dark-700/30 border border-white/[0.03] hover:border-white/10 hover:bg-dark-700/50 transition-all group"
            >
              {/* Unit Identifier */}
              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-lg bg-dark-600 border border-white/5 flex items-center justify-center text-[10px] font-black text-gray-400 group-hover:border-neon-blue/30 transition-colors">
                  {v.avatar}
                </div>
                <span
                  className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-dark-700 ${ss.dot} shadow-sm`}
                />
              </div>

              {/* Unit Data */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[12px] font-bold text-white truncate tracking-tight">{v.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded border text-[8px] font-black uppercase tracking-widest ${ss.badge}`}
                  >
                    {ss.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] text-gray-600 font-bold uppercase tracking-wider flex items-center gap-1">
                    <Navigation className="w-2.5 h-2.5" />
                    {v.location}
                  </span>
                </div>
                
                {/* Capability Matrix */}
                <div className="flex gap-1.5 mt-2.5 flex-wrap">
                  {v.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className={`px-1.5 py-0.5 rounded border text-[8px] font-black uppercase tracking-widest ${
                        skillColors[skill] || "text-gray-500 border-white/5 bg-white/5"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="text-right shrink-0 pl-2">
                <div className="flex items-center gap-1 justify-end">
                  <Star className="w-2.5 h-2.5 text-neon-blue fill-neon-blue/20" />
                  <span className="text-[10px] text-neon-blue font-black font-mono">{v.rating}</span>
                </div>
                <div className="flex items-center gap-1 justify-end mt-1.5 opacity-60">
                  <CheckCircle2 className="w-2.5 h-2.5 text-gray-500" />
                  <span className="text-[9px] text-gray-500 font-black font-mono">{v.completedTasks.toString().padStart(2, '0')}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
