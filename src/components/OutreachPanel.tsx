"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Smartphone, AlertTriangle, Building2, CheckCircle2, Zap, Terminal } from "lucide-react";
import { mockOutreachMessages } from "@/data/mockData";

const platformStyles: Record<string, { icon: React.ElementType; color: string; bg: string; border: string }> = {
  WhatsApp: {
    icon: Smartphone,
    color: "text-neon-green",
    bg: "bg-neon-green/5",
    border: "border-neon-green/20",
  },
  Emergency: {
    icon: AlertTriangle,
    color: "text-neon-red",
    bg: "bg-neon-red/5",
    border: "border-neon-red/20",
  },
  NGO: {
    icon: Building2,
    color: "text-neon-purple",
    bg: "bg-neon-purple/5",
    border: "border-neon-purple/20",
  },
};

const statusBadge: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  delivered: { label: "Delivered", color: "text-neon-green", icon: CheckCircle2 },
  read: { label: "Read", color: "text-neon-blue", icon: CheckCircle2 },
  sent: { label: "Sent", color: "text-neon-orange", icon: MessageSquare },
};

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}

export default function OutreachPanel() {
  return (
    <div className="glass rounded-xl h-full flex flex-col border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-dark-800/40 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20 shadow-[0_0_10px_rgba(188,71,254,0.1)]">
            <MessageSquare className="w-4 h-4 text-neon-purple" />
          </div>
          <div>
            <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">AI Outreach Terminal</h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-tight">Autonomous Communication Stream</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 min-h-0 custom-scrollbar">
        <AnimatePresence>
          {mockOutreachMessages.map((msg, index) => {
            const platform = platformStyles[msg.platform] || platformStyles.WhatsApp;
            const PlatformIcon = platform.icon;
            const sb = statusBadge[msg.status];
            const StatusIcon = sb.icon;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-lg border ${platform.border} overflow-hidden bg-dark-700/20 group`}
              >
                {/* Message header */}
                <div className={`flex items-center justify-between px-3.5 py-2 ${platform.bg} border-b ${platform.border}`}>
                  <div className="flex items-center gap-2">
                    <PlatformIcon className={`w-3.5 h-3.5 ${platform.color}`} />
                    <span className={`text-[9px] font-black uppercase tracking-widest ${platform.color}`}>
                      {msg.platform}
                    </span>
                    <span className="text-[9px] font-mono text-gray-600">→ {msg.recipient}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusIcon className={`w-2.5 h-2.5 ${sb.color}`} />
                    <span className={`text-[8px] font-black uppercase tracking-widest ${sb.color}`}>{sb.label}</span>
                  </div>
                </div>

                {/* Message body */}
                <div className="px-4 py-3.5 relative">
                  <Terminal className="absolute top-2 right-2 w-3 h-3 text-white/5" />
                  <p className="text-[11px] text-gray-300 leading-relaxed font-mono italic">
                    "{msg.message}"
                  </p>
                  <div className="mt-3 flex items-center justify-end">
                     <span className="text-[8px] font-mono text-gray-700 uppercase tracking-tighter">TIMESTAMP: {new Date(msg.timestamp).toISOString()}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* AI-generated label */}
        <div className="flex items-center justify-center gap-3 py-4 opacity-40">
          <div className="h-[1px] flex-1 bg-white/5" />
          <span className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
            <Zap className="w-2.5 h-2.5 text-neon-blue" />
            SECURE AUTONOMOUS CHANNEL
          </span>
          <div className="h-[1px] flex-1 bg-white/5" />
        </div>
      </div>
    </div>
  );
}
