"use client";

import { useState, useEffect, useRef } from "react";
import { Terminal, ShieldAlert, ChevronDown, ChevronUp, Minimize2, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Log {
  id: string;
  message: string;
  timestamp: string;
}

export default function SystemLogs() {
  const [logs, setLogs] = useState<Log[]>([
    {
      id: "init",
      message: "[SYSTEM] Omni Link Interface Initialized. Listening for events...",
      timestamp: new Date().toISOString(),
    }
  ]);
  const [isMinimized, setIsMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleLog = (e: Event) => {
      const customEvent = e as CustomEvent;
      const newLog = {
        id: `log-${Date.now()}-${Math.random()}`,
        message: customEvent.detail,
        timestamp: new Date().toISOString()
      };
      setLogs((prev) => [...prev, newLog].slice(-50)); // Keep last 50 logs
    };

    window.addEventListener("system-log", handleLog);
    return () => window.removeEventListener("system-log", handleLog);
  }, []);

  useEffect(() => {
    if (!isMinimized) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isMinimized]);

  return (
    <motion.div 
      initial={false}
      animate={{ height: isMinimized ? "32px" : "128px" }}
      className="glass rounded-t-xl border-x border-t border-white/10 bg-dark-900/95 flex flex-col overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-[90]"
    >
      <div 
        className="px-4 py-2 border-b border-white/5 bg-dark-800/80 flex items-center justify-between shrink-0 cursor-pointer hover:bg-dark-700/50 transition-colors"
        onClick={() => setIsMinimized(!isMinimized)}
      >
         <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-neon-blue" />
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">System Intelligence Logs</span>
            {isMinimized && (
              <span className="text-[8px] text-neon-green animate-pulse ml-2 font-mono">LISTENING...</span>
            )}
         </div>
         <div className="flex items-center gap-4">
            <div className="flex gap-1.5 opacity-50">
               <div className="w-1.5 h-1.5 rounded-full bg-neon-red" />
               <div className="w-1.5 h-1.5 rounded-full bg-neon-orange" />
               <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
            </div>
            <button className="text-gray-500 hover:text-white transition-colors">
               {isMinimized ? <Maximize2 className="w-3 h-3" /> : <Minimize2 className="w-3 h-3" />}
            </button>
         </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-[10px] font-mono leading-relaxed space-y-1 bg-dark-950/50">
        <AnimatePresence initial={false}>
          {logs.map((log) => {
             // Color coding based on tags
             let colorClass = "text-gray-400";
             if (log.message.includes("[SUCCESS]")) colorClass = "text-neon-green";
             else if (log.message.includes("[API_CALL]")) colorClass = "text-neon-blue";
             else if (log.message.includes("[DISPATCH]") || log.message.includes("[USER_INPUT]")) colorClass = "text-neon-purple";
             else if (log.message.includes("[ERROR]") || log.message.includes("[DEBUG]")) colorClass = "text-neon-orange";

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 break-all"
              >
                <span className="text-gray-600 shrink-0">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit', fractionalSecondDigits: 3 })}
                </span>
                <span className={colorClass}>{log.message}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
}
