"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, Sparkles, Zap, ChevronRight, Package, Users, Home, Pill, Truck, Heart, Terminal, Minimize2, Maximize2 } from "lucide-react";

interface ExtractedData {
  type: string;
  quantity: number;
  location: string;
  urgency: string;
  description?: string;
}

interface OperationsResult {
  matchedNGO: string;
  assignedVolunteer: string;
  estimatedTime: string;
  actions: string[];
  outreachSent: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "coordinator" | "operations";
  content: string;
  extractedData?: ExtractedData;
  operationsResult?: OperationsResult;
  isTyping?: boolean;
  timestamp: string;
}

const typeIcons: Record<string, React.ElementType> = {
  food_donation: Package,
  volunteer_request: Users,
  shelter_need: Home,
  supply_request: Heart,
  medical_aid: Pill,
  transport_request: Truck,
};

const urgencyColors: Record<string, string> = {
  critical: "text-neon-red border-neon-red/20 bg-neon-red/5",
  high: "text-neon-orange border-neon-orange/20 bg-neon-orange/5",
  medium: "text-neon-blue border-neon-blue/20 bg-neon-blue/5",
  low: "text-gray-500 border-white/5 bg-white/5",
};

const quickPrompts = [
  "Food for 50 people in Whitefield",
  "Need 5 volunteers for HSR distribution",
  "Emergency shelter in Koramangala",
  "Medical supplies Indiranagar",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1">
      <div className="typing-indicator flex gap-1">
        <span className="w-1 h-1 rounded-full bg-neon-blue inline-block" />
        <span className="w-1 h-1 rounded-full bg-neon-blue inline-block" />
        <span className="w-1 h-1 rounded-full bg-neon-blue inline-block" />
      </div>
      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">AI PROCESSING...</span>
    </div>
  );
}

export default function AICommandCenter() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "coordinator",
      content:
        "Omni Link online. I'm your Coordinator AI. Provide a resource request or donation brief to begin autonomous dispatch.",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSubmit(text?: string) {
    const userInput = text || input.trim();
    if (!userInput || isProcessing) return;
    setInput("");
    setIsProcessing(true);

    // Dispatch system log for user input
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('system-log', { detail: `[USER_INPUT] Received: "${userInput}"` }));
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: userInput,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg, {
      id: `typing-coord-${Date.now()}`,
      role: "coordinator",
      content: "",
      isTyping: true,
      timestamp: new Date().toISOString(),
    }]);

    try {
      // Dispatch system log for coordinator API
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('system-log', { detail: `[API_CALL] Requesting Coordinator AI...` }));
      }
      
      // Simulate delay for API call
      await new Promise(r => setTimeout(r, 800));

      // Keyword matching simulation
      const lowerInput = userInput.toLowerCase();
      let mockType = "supply_request";
      let mockUrgency = "medium";
      let mockNgo = "HelpHands Collective";
      let mockVol = "Arjun Mehta";
      let coordResponse = "I have logged the supply request. Evaluating logistics.";
      
      if (lowerInput.includes("food")) {
        mockType = "food_donation";
        mockUrgency = "high";
        mockNgo = "FeedIndia Foundation";
        coordResponse = "Classifying as food_donation. Urgent routing required to prevent spoilage.";
      } else if (lowerInput.includes("medical") || lowerInput.includes("medicine")) {
        mockType = "medical_aid";
        mockUrgency = "critical";
        mockNgo = "MedReach Trust";
        mockVol = "Priya Sharma";
        coordResponse = "Critical medical need identified. Immediate escalation triggered.";
      } else if (lowerInput.includes("shelter")) {
        mockType = "shelter_need";
        mockUrgency = "high";
        mockNgo = "Shelter Hope Alliance";
        coordResponse = "Shelter need processed. Checking available beds at nearby facilities.";
      } else if (lowerInput.includes("volunteer") || lowerInput.includes("volunteers")) {
        mockType = "volunteer_request";
        mockUrgency = "medium";
        coordResponse = "Volunteer requirement noted. Sourcing available personnel.";
      }

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('system-log', { detail: `[SUCCESS] Coordinator AI returned analysis. Latency: 824ms` }));
      }

      const extracted: ExtractedData = {
        type: mockType,
        quantity: parseInt(userInput.replace(/[^0-9]/g, '')) || 1,
        location: lowerInput.includes("whitefield") ? "Whitefield" : lowerInput.includes("hsr") ? "HSR Layout" : "Central Hub",
        urgency: mockUrgency,
      };

      setMessages((prev) => {
        const filtered = prev.filter((m) => !m.isTyping);
        return [
          ...filtered,
          {
            id: `coord-${Date.now()}`,
            role: "coordinator" as const,
            content: coordResponse,
            extractedData: extracted,
            timestamp: new Date().toISOString(),
          },
        ];
      });

      await new Promise((r) => setTimeout(r, 600));

      setMessages((prev) => [...prev, {
        id: `typing-ops-${Date.now()}`,
        role: "operations",
        content: "",
        isTyping: true,
        timestamp: new Date().toISOString(),
      }]);

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('system-log', { detail: `[API_CALL] Requesting Operations AI (Google_Maps_Matrix_V2)...` }));
      }

      await new Promise((r) => setTimeout(r, 1200));

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent('system-log', { detail: `[SUCCESS] Operations AI returned routing. Latency: 1204ms` }));
        window.dispatchEvent(new CustomEvent('system-log', { detail: `[DISPATCH] Assigned NGO: ${mockNgo} | Volunteer: ${mockVol}` }));
      }

      setMessages((prev) => {
        const filtered = prev.filter((m) => !m.isTyping);
        return [
          ...filtered,
          {
            id: `ops-${Date.now()}`,
            role: "operations" as const,
            content: "Deployment strategy formulated. Routing finalized based on proximity.",
            operationsResult: {
              matchedNGO: mockNgo,
              assignedVolunteer: mockVol,
              estimatedTime: "14 mins",
              actions: [
                `Secured drop-off location at ${mockNgo}`,
                `Dispatched ${mockVol} for pickup`,
                "Sent WhatsApp ETA notifications"
              ],
              outreachSent: "Yes"
            },
            timestamp: new Date().toISOString(),
          },
        ];
      });
    } catch {
      setMessages((prev) => {
        const filtered = prev.filter((m) => !m.isTyping);
        return [
          ...filtered,
          {
            id: `error-${Date.now()}`,
            role: "coordinator" as const,
            content: "⚠️ Connection error.",
            timestamp: new Date().toISOString(),
          },
        ];
      });
    } finally {
      setIsProcessing(false);
    }
  }

  if (isMinimized) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl border border-neon-blue/30 bg-dark-900/80 backdrop-blur-xl p-4 flex items-center justify-between cursor-pointer hover:bg-dark-800/80 transition-colors shadow-[0_0_30px_rgba(76,201,240,0.15)]"
        onClick={() => setIsMinimized(false)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-neon-green relative z-10" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-neon-green animate-ping z-0" />
          </div>
          <h2 className="text-[10px] font-black tracking-[0.2em] uppercase text-white">
            Omni Link Engine: Monitoring Field Data...
          </h2>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors group">
          <Maximize2 className="w-5 h-5 text-gray-500 group-hover:text-white" />
        </button>
      </motion.div>
    );
  }

  return (
    <div className="glass rounded-xl h-full flex flex-col border border-white/10 bg-dark-900/70 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-dark-800/40 border-b border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-blue/10 flex items-center justify-center border border-neon-blue/20">
              <Bot className="w-4 h-4 text-neon-blue" />
            </div>
            <div>
              <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">Omni Link Dispatch</h2>
              <p className="text-[9px] text-gray-500 uppercase tracking-tight flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-neon-green" /> TARGET: SECTOR 7 VOLUNTEER NETWORK
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <div className="px-2 py-0.5 rounded bg-dark-600 border border-white/5 text-[8px] font-bold text-gray-400">LLM V3.1</div>
            <div className="px-2 py-0.5 rounded bg-neon-blue/10 border border-neon-blue/20 text-[8px] font-bold text-neon-blue uppercase">Live Node</div>
            <button 
              onClick={() => setIsMinimized(true)}
              className="p-1.5 ml-2 hover:bg-white/10 rounded transition-colors group"
            >
              <Minimize2 className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 min-h-0 custom-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  msg.role === "user"
                    ? "bg-dark-600 border-white/10"
                    : msg.role === "coordinator"
                    ? "bg-neon-blue/10 border-neon-blue/20"
                    : "bg-neon-purple/10 border-neon-purple/20"
                }`}
              >
                {msg.role === "user" ? <Terminal className="w-3.5 h-3.5 text-gray-400" /> : <Bot className={`w-3.5 h-3.5 ${msg.role === "coordinator" ? "text-neon-blue" : "text-neon-purple"}`} />}
              </div>

              <div className={`flex flex-col gap-2 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2">
                   <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                    {msg.role === "user" ? "Operator" : msg.role === "coordinator" ? "Coordinator AI" : "Operations AI"}
                  </span>
                  <span className="text-[8px] font-mono text-gray-700">{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>

                <div
                  className={`rounded-xl px-4 py-3 text-[13px] leading-relaxed border ${
                    msg.role === "user"
                      ? "bg-dark-700 border-white/10 text-white rounded-tr-none"
                      : "bg-dark-800/40 border-white/5 text-gray-300 rounded-tl-none shadow-sm"
                  }`}
                >
                  {msg.isTyping ? <TypingIndicator /> : <p className={msg.role === "user" ? "font-medium" : ""}>{msg.content}</p>}
                </div>

                {/* Data Cards */}
                {msg.extractedData && (
                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-dark-800/60 border border-white/5 rounded-lg overflow-hidden shadow-xl">
                    <div className="px-3 py-1.5 bg-white/5 border-b border-white/5 flex items-center justify-between">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-neon-blue" /> Parsed Intelligence
                      </span>
                    </div>
                    <div className="p-3 grid grid-cols-2 gap-3">
                      {Object.entries(msg.extractedData).map(([key, value]) => (
                        <div key={key} className="space-y-0.5">
                          <span className="text-[8px] uppercase tracking-tighter text-gray-600 font-bold">{key}</span>
                          <div className={`text-[11px] font-bold ${key === 'urgency' ? urgencyColors[value as string]?.split(' ')[0] : 'text-gray-200'}`}>
                            {String(value).toUpperCase()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {msg.operationsResult && (
                  <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full bg-dark-800/60 border border-neon-purple/20 rounded-lg overflow-hidden shadow-xl">
                    <div className="px-3 py-1.5 bg-neon-purple/5 border-b border-neon-purple/10 flex items-center justify-between">
                      <span className="text-[9px] font-black text-neon-purple uppercase tracking-widest flex items-center gap-1.5">
                        <Zap className="w-3 h-3" /> Execution Log
                      </span>
                    </div>
                    <div className="p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase font-bold text-gray-600">NGO Node</span>
                          <p className="text-[11px] font-bold text-neon-purple">{msg.operationsResult.matchedNGO}</p>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[8px] uppercase font-bold text-gray-600">Logistics ETA</span>
                          <p className="text-[11px] font-bold text-neon-orange">{msg.operationsResult.estimatedTime}</p>
                        </div>
                      </div>
                      <div className="space-y-2 border-t border-white/5 pt-3">
                         <span className="text-[8px] uppercase font-bold text-gray-600">Autonomous Actions</span>
                         <div className="space-y-1.5">
                           {msg.operationsResult.actions.map((action, i) => (
                             <div key={i} className="flex gap-2 items-start">
                               <div className="w-1 h-1 rounded-full bg-neon-purple mt-1.5" />
                               <p className="text-[11px] text-gray-400 italic leading-tight">{action}</p>
                             </div>
                           ))}
                         </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Footer Area */}
      <div className="px-5 py-4 bg-dark-800/40 border-t border-white/5 space-y-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSubmit(prompt)}
              disabled={isProcessing}
              className="shrink-0 px-3 py-1.5 rounded bg-dark-600 border border-white/5 text-[9px] font-bold text-gray-400 hover:text-neon-blue hover:border-neon-blue/30 transition-all uppercase tracking-wide"
            >
              {prompt}
            </button>
          ))}
        </div>
        
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="flex gap-3">
          <div className="flex-1 relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="INTERVENE OR SUGGEST PROMPT..."
              disabled={isProcessing}
              className="w-full bg-dark-900/50 border border-white/10 rounded-lg px-4 py-3 text-[12px] font-mono text-white placeholder-gray-600 focus:outline-none focus:border-neon-blue/40 transition-all uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            disabled={!input.trim() || isProcessing}
            className="px-6 rounded-lg bg-neon-blue text-dark-900 font-black text-[11px] uppercase tracking-[0.2em] hover:bg-neon-blue/90 transition-all disabled:opacity-20 shadow-[0_0_20px_rgba(76,201,240,0.2)]"
          >
            Send Intervention
          </button>
        </form>
      </div>
    </div>
  );
}
