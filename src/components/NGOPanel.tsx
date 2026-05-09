"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { mockNGOs, type NGO } from "@/data/mockData";

const statusStyles: Record<NGO["status"], { label: string; dot: string; badge: string }> = {
  active: {
    label: "Active Hub",
    dot: "bg-neon-green",
    badge: "bg-neon-green/5 text-neon-green border-neon-green/20",
  },
  busy: {
    label: "High Load",
    dot: "bg-neon-orange",
    badge: "bg-neon-orange/5 text-neon-orange border-neon-orange/20",
  },
  offline: {
    label: "Standby",
    dot: "bg-gray-700",
    badge: "bg-dark-600 text-gray-500 border-white/5",
  },
};

const specialtyColors: Record<string, string> = {
  food_donation: "text-neon-green border-neon-green/20 bg-neon-green/5",
  volunteer_request: "text-neon-blue border-neon-blue/20 bg-neon-blue/5",
  shelter_need: "text-neon-orange border-neon-orange/20 bg-neon-orange/5",
  supply_request: "text-neon-purple border-neon-purple/20 bg-neon-purple/5",
  medical_aid: "text-neon-red border-neon-red/20 bg-neon-red/5",
  transport_request: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
};

const specialtyLabels: Record<string, string> = {
  food_donation: "Food",
  volunteer_request: "Volunteers",
  shelter_need: "Shelter",
  supply_request: "Supplies",
  medical_aid: "Medical",
  transport_request: "Transport",
};

export default function NGOPanel() {
  const active = mockNGOs.filter((n) => n.status === "active").length;
  const totalCapacity = mockNGOs.reduce((acc, n) => acc + n.capacity, 0);

  return (
    <div className="glass rounded-xl h-full flex flex-col border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-dark-800/40 border-b border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20 shadow-[0_0_10px_rgba(188,71,254,0.1)]">
            <Building2 className="w-4 h-4 text-neon-purple" />
          </div>
          <div>
            <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">NGO Logistics Hubs</h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-tight">{mockNGOs.length} Node Affiliates Online</p>
          </div>
        </div>
        
        {/* Network Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-dark-900/50 border border-white/5 rounded-lg p-3">
            <div className="text-xl font-black text-neon-purple font-mono tracking-tighter">{active.toString().padStart(2, '0')}</div>
            <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Operational Nodes</div>
          </div>
          <div className="bg-dark-900/50 border border-white/5 rounded-lg p-3">
            <div className="text-xl font-black text-neon-blue font-mono tracking-tighter">{totalCapacity.toLocaleString()}</div>
            <div className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Aggregate Capacity</div>
          </div>
        </div>
      </div>

      {/* Hub List */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3 min-h-0 custom-scrollbar">
        {mockNGOs.map((ngo, index) => {
          const ss = statusStyles[ngo.status];
          return (
            <motion.div
              key={ngo.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 rounded-lg bg-dark-700/30 border border-white/[0.03] hover:border-white/10 hover:bg-dark-700/50 transition-all group"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ss.dot} shadow-[0_0_5px_${ss.dot.replace('bg-', '')}]`} />
                    <span className="text-[12px] font-bold text-white truncate tracking-tight uppercase">{ngo.name}</span>
                  </div>
                  <p className="text-[9px] font-bold text-gray-600 uppercase tracking-widest">{ngo.type}</p>
                </div>
                <span className={`px-1.5 py-0.5 rounded border text-[8px] font-black uppercase tracking-widest shrink-0 ${ss.badge}`}>
                  {ss.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                  <MapPin className="w-3 h-3 text-gray-600" />
                  {ngo.location}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                  <ShieldCheck className="w-3 h-3 text-neon-blue" />
                  CAP: {ngo.capacity}
                </div>
              </div>

              {/* Specializations Matrix */}
              <div className="flex gap-1.5 flex-wrap pt-2 border-t border-white/5">
                {ngo.specialties.map((s) => (
                  <span
                    key={s}
                    className={`px-1.5 py-0.5 rounded border text-[8px] font-black uppercase tracking-widest ${
                      specialtyColors[s] || "text-gray-500 border-white/5 bg-white/5"
                    }`}
                  >
                    {specialtyLabels[s] || s}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
