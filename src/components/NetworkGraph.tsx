"use client";

import { motion } from "framer-motion";
import { Package, Users, Building2, Zap } from "lucide-react";

const nodes = [
  { id: 1, type: 'resource', label: 'DONOR_CLUSTER_01', x: 200, y: 150, icon: Users, color: 'text-neon-blue' },
  { id: 2, type: 'resource', label: 'NGO_PARTNER_NORTH', x: 500, y: 100, icon: Building2, color: 'text-neon-purple' },
  { id: 3, type: 'resource', label: 'NGO_PARTNER_SOUTH', x: 500, y: 300, icon: Building2, color: 'text-neon-purple' },
  { id: 4, type: 'resource', label: 'DONOR_CLUSTER_02', x: 200, y: 350, icon: Users, color: 'text-neon-blue' },
  { id: 5, type: 'resource', label: 'CENTRAL_OMNI_HUB', x: 750, y: 225, icon: Zap, color: 'text-neon-green' },
];

const connections = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 4, to: 3 },
  { from: 2, to: 5 },
  { from: 3, to: 5 },
];

export default function NetworkGraph() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-dark-950 flex flex-col">
      <div className="p-6 border-b border-white/5 flex justify-between items-center">
         <div>
            <h2 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Resource Allocation Graph</h2>
            <p className="text-[9px] text-gray-500 uppercase tracking-widest mt-1">Real-time Node Connectivity</p>
         </div>
         <div className="flex gap-4">
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-neon-red" />
               <span className="text-[8px] font-bold text-gray-400 uppercase">Needs</span>
            </div>
            <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
               <span className="text-[8px] font-bold text-gray-400 uppercase">Resources</span>
            </div>
         </div>
      </div>

      <div className="flex-1 relative">
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((conn, i) => {
            const from = nodes.find(n => n.id === conn.from)!;
            const to = nodes.find(n => n.id === conn.to)!;
            return (
              <motion.line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="white"
                strokeOpacity="0.1"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.2 }}
              />
            );
          })}
        </svg>

        {nodes.map((node) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={node.id}
              drag
              dragConstraints={{ left: 0, right: 800, top: 0, bottom: 500 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="absolute cursor-move group"
              style={{ left: node.x - 20, top: node.y - 20 }}
            >
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl bg-dark-800 border border-white/10 flex items-center justify-center shadow-xl group-hover:border-neon-blue transition-colors`}>
                   <Icon className={`w-6 h-6 ${node.color}`} />
                </div>
                <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-dark-900 px-2 py-1 rounded border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[8px] font-black text-white uppercase tracking-widest">{node.label}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="p-6 border-t border-white/5 text-center">
         <p className="text-[8px] font-mono text-gray-700">GRAPH_ALGO: FORCE_DIRECTED_V2 | STABILITY: OPTIMAL | NODES: 5 | EDGES: 5</p>
      </div>
    </div>
  );
}
