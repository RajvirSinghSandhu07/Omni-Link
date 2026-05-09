"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  MapPin,
  Clock,
  User,
  Building2,
  ChevronDown,
  ChevronUp,
  Truck,
  Package,
  Heart,
  Users,
  Home,
  Pill,
  Shield,
  Zap,
} from "lucide-react";
import {
  mockRequests,
  mockVolunteers,
  mockNGOs,
  typeConfig,
  urgencyConfig,
  statusConfig,
  type NeedRequest,
} from "@/data/mockData";

const typeIcons: Record<string, React.ElementType> = {
  food_donation: Package,
  volunteer_request: Users,
  shelter_need: Home,
  supply_request: Heart,
  medical_aid: Pill,
  transport_request: Truck,
};

const typeImages: Record<string, string> = {
  food_donation: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=100",
  volunteer_request: "https://images.unsplash.com/photo-1559027615-cd26714e93af?auto=format&fit=crop&q=80&w=100",
  shelter_need: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=100",
  supply_request: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=100",
  medical_aid: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=100",
  transport_request: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=100",
};

function RequestCard({ request, onAccept }: { request: NeedRequest, onAccept?: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);
  const tConfig = typeConfig[request.type];
  const uConfig = urgencyConfig[request.urgency];
  const sConfig = statusConfig[request.status];
  const TypeIcon = typeIcons[request.type] || Package;

  const volunteer = request.assignedVolunteer
    ? mockVolunteers.find((v) => v.id === request.assignedVolunteer)
    : null;
  const ngo = request.matchedNGO
    ? mockNGOs.find((n) => n.id === request.matchedNGO)
    : null;

  const isCritical = request.urgency === "critical";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border overflow-hidden transition-all group ${
        isCritical 
          ? "border-neon-red/30 bg-neon-red/[0.03]" 
          : "border-white/5 bg-dark-700/30 hover:border-white/10 hover:bg-dark-700/50"
      }`}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-4 flex items-center gap-4 text-left"
      >
        {/* Type Image Thumbnail */}
        <div
          className={`w-12 h-12 rounded-lg border overflow-hidden shrink-0 shadow-sm relative ${
            isCritical ? "border-neon-red/40" : "border-white/10"
          }`}
        >
          <img 
            src={typeImages[request.type] || typeImages.food_donation} 
            alt={request.type}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          <div className={`absolute inset-0 flex items-center justify-center bg-dark-900/40 group-hover:bg-transparent transition-colors`}>
            <TypeIcon className={`w-3.5 h-3.5 ${isCritical ? "text-neon-red" : "text-white"}`} />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[9px] font-black uppercase tracking-widest ${isCritical ? "text-neon-red" : tConfig.color}`}>
              {tConfig.label}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-700" />
            <span className={`text-[9px] font-black uppercase tracking-widest ${uConfig.color} flex items-center gap-1.5`}>
              {isCritical && <span className="w-1.5 h-1.5 rounded-full bg-neon-red animate-ping" />}
              {uConfig.label}
            </span>
          </div>
          <p className="text-[12px] text-gray-300 font-medium truncate tracking-tight">{request.description}</p>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-2.5 h-2.5" />
              {request.location}
            </span>
            <span className={`text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/5 bg-white/5 ${sConfig.color}`}>
              {sConfig.label}
            </span>
          </div>
        </div>

        {/* Expand */}
        <div className="text-gray-600 group-hover:text-gray-400 transition-colors">
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-dark-800/40"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/5 pt-4">
              {/* AI Analysis Card */}
              {request.aiNotes && (
                <div className="p-3 rounded-lg bg-neon-blue/5 border border-neon-blue/20">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Zap className="w-3 h-3 text-neon-blue" />
                    <span className="text-[9px] font-black text-neon-blue uppercase tracking-widest">Autonomous Dispatch Notes</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-medium italic">
                    "{request.aiNotes}"
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* NGO Entity */}
                {ngo && (
                  <div className="p-3 rounded-lg bg-dark-600 border border-white/5 space-y-2">
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Logistics Hub</span>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-neon-purple" />
                      <div>
                        <p className="text-[11px] font-bold text-white">{ngo.name}</p>
                        <p className="text-[9px] text-gray-500 font-mono">{ngo.location}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Assigned Unit */}
                {volunteer && (
                  <div className="p-3 rounded-lg bg-dark-600 border border-white/5 space-y-2">
                    <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">Deployment Unit</span>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-neon-green" />
                      <div>
                        <p className="text-[11px] font-bold text-white">{volunteer.name}</p>
                        <p className="text-[9px] text-gray-500 font-mono">RANK: {volunteer.rating} / TASK COUNT: {volunteer.completedTasks}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* System Metadata */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center gap-4 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-2.5 h-2.5" />
                    {new Date(request.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span>QTY: {request.quantity}</span>
                </div>
                <span className="text-[9px] font-mono text-gray-700">HASH: {request.id.slice(0, 8)}</span>
              </div>
              
              {/* Action Buttons */}
              {request.status !== "completed" && onAccept && (
                <div className="pt-3 flex justify-end">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAccept(request.id); }}
                    className="px-4 py-2 bg-neon-green/10 text-neon-green border border-neon-green/30 hover:bg-neon-green/20 hover:border-neon-green rounded text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(0,245,141,0.1)] flex items-center gap-2"
                  >
                     <Zap className="w-3 h-3" />
                     Accept Mission
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RequestsPanel() {
  const [filter, setFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"queue" | "completed">("queue");
  const [requests, setRequests] = useState<NeedRequest[]>(mockRequests);

  const handleAccept = (id: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent('system-log', { 
            detail: `[SUCCESS] Mission ${id.slice(0, 8)} accepted and moved to Completed status.` 
          }));
        }
        return { ...req, status: "completed" };
      }
      return req;
    }));
  };

  const filteredRequests = requests.filter((r) => {
    const statusMatch = viewMode === "queue" ? r.status !== "completed" : r.status === "completed";
    const urgencyMatch = filter === "all" ? true : r.urgency === filter;
    return statusMatch && urgencyMatch;
  });

  const sorted = [...filteredRequests].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return order[a.urgency] - order[b.urgency];
  });

  return (
    <div className="glass rounded-xl h-full flex flex-col border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 bg-dark-800/40 border-b border-white/5 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shadow-sm ${viewMode === "queue" ? "bg-neon-orange/10 border-neon-orange/20 shadow-[0_0_10px_rgba(255,159,67,0.1)]" : "bg-neon-green/10 border-neon-green/20 shadow-[0_0_10px_rgba(0,245,141,0.1)]"}`}>
              {viewMode === "queue" ? <Shield className="w-4 h-4 text-neon-orange" /> : <Heart className="w-4 h-4 text-neon-green" />}
            </div>
            <div>
              <h2 className="text-[11px] font-bold text-white uppercase tracking-wider">{viewMode === "queue" ? "Operational Queue" : "Completed Missions"}</h2>
              <p className="text-[9px] text-gray-500 uppercase tracking-tight">{filteredRequests.length} System Threads</p>
            </div>
          </div>
          
          <div className="flex gap-1 bg-dark-900/50 p-1 rounded-lg border border-white/5">
            <button 
               onClick={() => setViewMode("queue")}
               className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded transition-all ${viewMode === "queue" ? "bg-neon-orange/20 text-neon-orange" : "text-gray-500 hover:text-gray-300"}`}
            >
               Queue
            </button>
            <button 
               onClick={() => setViewMode("completed")}
               className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded transition-all ${viewMode === "completed" ? "bg-neon-green/20 text-neon-green" : "text-gray-500 hover:text-gray-300"}`}
            >
               Completed
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex gap-2 p-1 rounded-lg bg-dark-900/50 border border-white/5 w-fit">
          {["all", "critical", "high", "medium", "low"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded text-[9px] font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-white/10 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3 min-h-0 custom-scrollbar">
        <AnimatePresence>
          {sorted.map((request) => (
            <RequestCard key={request.id} request={request} onAccept={handleAccept} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
