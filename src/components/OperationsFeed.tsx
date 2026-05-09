"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Bot,
  Users,
  Building2,
  AlertTriangle,
  Send,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { mockActivityFeed, type ActivityEvent } from "@/data/mockData";

const eventIcons: Record<string, React.ElementType> = {
  ai_action: Bot,
  volunteer_update: Users,
  ngo_match: Building2,
  escalation: AlertTriangle,
  intake: Radio,
  outreach: Send,
  completion: CheckCircle2,
};

const eventColors: Record<string, string> = {
  ai_action: "text-neon-blue border-neon-blue/20 bg-neon-blue/5",
  volunteer_update: "text-neon-green border-neon-green/20 bg-neon-green/5",
  ngo_match: "text-neon-purple border-neon-purple/20 bg-neon-purple/5",
  escalation: "text-neon-red border-neon-red/20 bg-neon-red/5",
  intake: "text-neon-orange border-neon-orange/20 bg-neon-orange/5",
  outreach: "text-yellow-400 border-yellow-400/20 bg-yellow-400/5",
  completion: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
};

const agentBadge: Record<string, { label: string; color: string }> = {
  coordinator: { label: "Coordinator", color: "bg-neon-blue/10 text-neon-blue border-neon-blue/20" },
  operations: { label: "Operations", color: "bg-neon-purple/10 text-neon-purple border-neon-purple/20" },
  system: { label: "System", color: "bg-dark-600 text-gray-400 border-white/5" },
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  return `${hours}h ago`;
}

export default function OperationsFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>(mockActivityFeed);
  const [isLive, setIsLive] = useState(true);

  // Simulate new events arriving
  useEffect(() => {
    if (!isLive) return;

    const simulatedEvents: string[] = [
      "Coordinator AI analyzing new intake from BTM Layout area",
      "Operations AI dispatching nearest volunteer for supply delivery",
      "Volunteer Karthik Reddy confirmed pickup assignment",
      "Auto-generated WhatsApp alert sent to 5 volunteers in Marathahalli",
      "NGO BookBridge India confirmed availability for book donation",
      "Operations AI optimizing delivery route — 3 stops consolidated",
    ];

    const interval = setInterval(() => {
      const newEvent: ActivityEvent = {
        id: `evt-live-${Date.now()}`,
        type: (["ai_action", "volunteer_update", "outreach", "ngo_match"] as const)[
          Math.floor(Math.random() * 4)
        ],
        message: simulatedEvents[Math.floor(Math.random() * simulatedEvents.length)],
        timestamp: new Date().toISOString(),
        agent: (["coordinator", "operations"] as const)[Math.floor(Math.random() * 2)],
      };
      setEvents((prev) => [newEvent, ...prev].slice(0, 20));
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  return (
    <div className="glass rounded-xl h-full flex flex-col border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-dark-800/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-blue/10 flex items-center justify-center border border-neon-blue/20 shadow-[0_0_10px_rgba(76,201,240,0.15)]">
            <Radio className="w-4 h-4 text-neon-blue" />
          </div>
          <div>
            <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">AI Activity Feed</h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-tight">Real-time Decision Stream</p>
          </div>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-all border ${
            isLive
              ? "bg-neon-green/5 text-neon-green border-neon-green/20"
              : "bg-dark-600 text-gray-500 border-white/5"
          }`}
        >
          <span
            className={`w-1 h-1 rounded-full ${
              isLive ? "bg-neon-green animate-pulse" : "bg-gray-500"
            }`}
          />
          {isLive ? "LIVE" : "PAUSED"}
        </button>
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 custom-scrollbar">
        <AnimatePresence initial={false}>
          {events.map((event) => {
            const Icon = eventIcons[event.type] || Zap;
            const colors = eventColors[event.type] || "text-gray-400 border-gray-600 bg-gray-600/5";
            const badge = agentBadge[event.agent];
            const [textColor, borderColor, bgColor] = colors.split(" ");

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 p-3 rounded-lg bg-dark-700/30 border border-white/[0.03] hover:border-white/10 hover:bg-dark-700/50 transition-all group`}
              >
                <div
                  className={`w-8 h-8 rounded-lg border ${borderColor} ${bgColor} flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:shadow-md transition-shadow`}
                >
                  <Icon className={`w-3.5 h-3.5 ${textColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-300 leading-relaxed font-medium">
                    {event.message}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`px-1.5 py-0.5 rounded border text-[8px] font-bold uppercase tracking-wider ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                    <span className="text-[8px] text-neon-blue font-mono font-bold bg-neon-blue/5 px-1.5 py-0.5 rounded border border-neon-blue/10">
                      {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <span className="text-[8px] text-gray-600 font-mono">
                      ({timeAgo(event.timestamp)})
                    </span>
                    {event.type === 'ai_action' && (
                      <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-neon-green/10 border border-neon-green/20 ml-auto">
                        <CheckCircle2 className="w-2.5 h-2.5 text-neon-green" />
                        <span className="text-[7px] font-black text-neon-green uppercase tracking-widest">Validated</span>
                      </div>
                    )}
                    {event.urgency && (
                      <div className="flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                        <span
                          className={`text-[8px] font-black uppercase tracking-widest ${
                            event.urgency === "critical"
                              ? "text-neon-red"
                              : event.urgency === "high"
                              ? "text-neon-orange"
                              : "text-neon-blue"
                          }`}
                        >
                          {event.urgency}
                        </span>
                      </div>
                    )}
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
