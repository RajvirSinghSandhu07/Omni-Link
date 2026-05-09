"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Radio, ChevronRight, Shield, Zap, Terminal } from "lucide-react";

interface EscalationEvent {
  id: string;
  requestId: string;
  level: number;
  trigger: string;
  action: string;
  timestamp: string;
  resolved: boolean;
}

const initialEscalations: EscalationEvent[] = [
  {
    id: "esc-001",
    requestId: "req-005",
    level: 2,
    trigger: "Primary NGO at full capacity",
    action: "Contacting 3 backup NGOs within 15km radius",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    resolved: false,
  },
  {
    id: "esc-002",
    requestId: "req-001",
    level: 1,
    trigger: "No volunteers in 5km radius",
    action: "Search radius expanded to 10km — 3 new volunteers found",
    timestamp: new Date(Date.now() - 22 * 60000).toISOString(),
    resolved: true,
  },
  {
    id: "esc-003",
    requestId: "req-003",
    level: 1,
    trigger: "Blanket supply below threshold",
    action: "Cross-NGO inventory request sent to 4 partner NGOs",
    timestamp: new Date(Date.now() - 8 * 60000).toISOString(),
    resolved: false,
  },
];

const levelStyles: Record<number, { color: string; bg: string; border: string; label: string }> = {
  1: { color: "text-neon-orange", bg: "bg-neon-orange/5", border: "border-neon-orange/20", label: "L1 ESCALATION" },
  2: { color: "text-neon-red", bg: "bg-neon-red/5", border: "border-neon-red/20", label: "L2 ESCALATION" },
  3: { color: "text-red-500", bg: "bg-red-500/5", border: "border-red-500/20", label: "L3 CRITICAL" },
};

function timeAgo(ts: string) {
  const mins = Math.floor((Date.now() - new Date(ts).getTime()) / 60000);
  return mins < 1 ? "just now" : `${mins}m ago`;
}

export default function EscalationEngine() {
  const [escalations, setEscalations] = useState<EscalationEvent[]>(initialEscalations);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newEsc: EscalationEvent = {
        id: `esc-live-${Date.now()}`,
        requestId: "req-004",
        level: 1,
        trigger: "Volunteer response rate below 30% after 10 minutes",
        action: "Escalating urgency level and broadcasting to extended network",
        timestamp: new Date().toISOString(),
        resolved: false,
      };
      setEscalations((prev) => [newEsc, ...prev]);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const active = escalations.filter((e) => !e.resolved).length;

  return (
    <div className="glass rounded-xl overflow-hidden border border-white/5">
      {/* Header */}
      <div className="px-5 py-4 bg-dark-800/40 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-lg bg-neon-red/10 flex items-center justify-center border border-neon-red/20 shadow-[0_0_10px_rgba(247,37,133,0.15)]">
              <AlertTriangle className="w-4 h-4 text-neon-red" />
            </div>
            {active > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-neon-red animate-pulse" />
            )}
          </div>
          <div>
            <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">Escalation Logic Node</h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-tight">Active Fallback Watchdog</p>
          </div>
        </div>
        <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-all ${active > 0 ? "bg-neon-red/5 border-neon-red/20 text-neon-red" : "bg-dark-600 border-white/5 text-gray-500"}`}>
          <Radio className={`w-3 h-3 ${active > 0 ? "animate-pulse" : ""}`} />
          <span className="text-[9px] font-black uppercase tracking-widest">{active} Active Alerts</span>
        </div>
      </div>

      {/* Decision Path */}
      <div className="px-5 py-3 bg-dark-900/50 border-b border-white/5">
        <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
          {[
            { step: "01", label: "RADIUS EXPANSION", done: true },
            { step: "02", label: "URGENCY SHIFT", done: true },
            { step: "03", label: "NGO BACKUP", done: false },
            { step: "04", label: "EMERGENCY BROADCAST", done: false },
          ].map((item, i, arr) => (
            <div key={item.step} className="flex items-center gap-2 shrink-0">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[7px] font-black shrink-0 ${
                  item.done
                    ? "bg-neon-green/10 text-neon-green border border-neon-green/30"
                    : "bg-dark-600 text-gray-700 border border-white/5"
                }`}
              >
                {item.step}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest ${item.done ? "text-gray-400" : "text-gray-700"}`}>
                {item.label}
              </span>
              {i < arr.length - 1 && (
                <ChevronRight className="w-2.5 h-2.5 text-gray-800 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Events */}
      <div className="px-4 py-5 space-y-3 max-h-72 overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {escalations.map((esc) => {
            const ls = levelStyles[esc.level];
            return (
              <motion.div
                key={esc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex gap-4 p-4 rounded-lg border ${ls.bg} ${ls.border} relative group overflow-hidden`}
              >
                <div className="absolute top-0 right-0 p-1 opacity-5">
                   <Terminal className="w-12 h-12 text-white" />
                </div>
                
                <div className="flex-1 min-w-0 space-y-2 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className={`text-[8px] font-black uppercase tracking-[0.2em] px-1.5 py-0.5 rounded border ${ls.color} ${ls.border}`}>
                      {ls.label}
                    </span>
                    <span className="text-[8px] font-mono text-gray-600">{timeAgo(esc.timestamp)}</span>
                  </div>
                  
                  <p className={`text-[12px] font-bold tracking-tight leading-tight ${ls.color}`}>{esc.trigger}</p>
                  
                  <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                    <Shield className="w-3 h-3 text-gray-500 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-400 italic leading-snug">{esc.action}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                     <span className="text-[8px] font-mono text-gray-700 uppercase">REF: {esc.requestId}</span>
                     <span className={`text-[8px] font-black uppercase tracking-widest ${esc.resolved ? "text-neon-green" : ls.color}`}>
                      {esc.resolved ? "STATUS: RESOLVED" : "STATUS: ACTIVE"}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
