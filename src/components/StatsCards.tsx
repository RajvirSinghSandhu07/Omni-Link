"use client";

import { motion } from "framer-motion";
import {
  Activity,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Heart,
  Zap,
} from "lucide-react";
import { dashboardStats } from "@/data/mockData";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const sparkData = [
  { val: 10 }, { val: 8 }, { val: 12 }, { val: 7 }, { val: 10 }, { val: 6 }, { val: 8 }
];

const reachData = [
  { name: 'W', val: 40 },
  { name: 'I', val: 70 },
  { name: 'H', val: 50 },
  { name: 'B', val: 90 },
  { name: 'K', val: 60 },
];

const stats = [
  {
    label: "ACTIVE REQUESTS",
    value: dashboardStats.activeRequests,
    icon: Activity,
    color: "text-neon-blue",
    borderColor: "border-neon-blue/20",
    bgClass: "bg-neon-blue/5",
    trend: "+12.5%",
  },
  {
    label: "VOLUNTEERS ONLINE",
    value: dashboardStats.volunteersOnline,
    icon: Users,
    color: "text-neon-green",
    borderColor: "border-neon-green/20",
    bgClass: "bg-neon-green/5",
    trend: "NOMINAL",
  },
  {
    label: "NGO HUB STATUS",
    value: dashboardStats.ngosActive,
    icon: Building2,
    color: "text-neon-purple",
    borderColor: "border-neon-purple/20",
    bgClass: "bg-neon-purple/5",
    trend: "ACTIVE",
  },
  {
    label: "MISSIONS DONE",
    value: dashboardStats.completedToday,
    icon: CheckCircle2,
    color: "text-neon-green",
    borderColor: "border-neon-green/20",
    bgClass: "bg-neon-green/5",
    trend: "+4.2%",
  },
  {
    label: "RESPONSE ETA",
    value: dashboardStats.avgResponseTime,
    icon: Clock,
    color: "text-neon-orange",
    borderColor: "border-neon-orange/20",
    bgClass: "bg-neon-orange/5",
    trend: "-0.5M",
  },
  {
    label: "ESCALATIONS",
    value: dashboardStats.escalations,
    icon: AlertTriangle,
    color: "text-neon-red",
    borderColor: "border-neon-red/20",
    bgClass: "bg-neon-red/5",
    trend: "STABLE",
  },
  {
    label: "TOTAL REACH",
    value: dashboardStats.totalPeopleHelped,
    icon: Heart,
    color: "text-[#f72585]",
    borderColor: "border-[#f72585]/20",
    bgClass: "bg-[#f72585]/5",
    trend: "UP",
  },
  {
    label: "AI OPS LOAD",
    value: dashboardStats.aiActionsToday,
    icon: Zap,
    color: "text-neon-blue",
    borderColor: "border-neon-blue/20",
    bgClass: "bg-neon-blue/5",
    trend: "82%",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03, duration: 0.4 }}
            className={`glass rounded-xl p-4 border border-white/5 border-l-2 ${stat.borderColor} relative group overflow-hidden hover:bg-dark-700/40 transition-all`}
          >
            {/* Background Accent */}
            <div className={`absolute -right-4 -top-4 w-12 h-12 ${stat.bgClass} rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity`} />
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-7 h-7 rounded bg-dark-600 border border-white/5 flex items-center justify-center`}>
                <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
              </div>
              <span className={`text-[8px] font-black uppercase tracking-tighter ${stat.color} opacity-60`}>
                {stat.trend}
              </span>
            </div>
            
            <div className="relative z-10">
              <div className={`text-2xl font-black text-white font-mono tracking-tighter mb-1`}>
                {stat.value}
              </div>
              <div className="text-[8px] text-gray-500 font-black uppercase tracking-widest leading-none">
                {stat.label}
              </div>
            </div>

            {/* Micro Gauge & Charts */}
            <div className="mt-3 h-10 w-full relative z-10">
              {stat.label === "RESPONSE ETA" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparkData}>
                    <Line 
                      type="monotone" 
                      dataKey="val" 
                      stroke="#ff9f43" 
                      strokeWidth={2} 
                      dot={false}
                      isAnimationActive={true}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : stat.label === "TOTAL REACH" ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reachData}>
                    <Bar dataKey="val">
                      {reachData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 ? '#f72585' : '#f7258544'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[2px] w-full bg-dark-600 rounded-full overflow-hidden absolute bottom-0">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full ${stat.color.replace('text-', 'bg-')} opacity-60 shadow-[0_0_10px_currentColor]`} 
                  />
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
