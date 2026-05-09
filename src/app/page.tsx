"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Send,
  AlertTriangle,
  Zap,
  Truck,
  Archive,
  LineChart,
  Bell,
  Settings,
  User,
  LogOut,
  Radio,
  Menu,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

import StatsCards from "@/components/StatsCards";
import AICommandCenter from "@/components/AICommandCenter";
import OperationsFeed from "@/components/OperationsFeed";
import RequestsPanel from "@/components/RequestsPanel";
import VolunteerPanel from "@/components/VolunteerPanel";
import NGOPanel from "@/components/NGOPanel";
import OutreachPanel from "@/components/OutreachPanel";
import EscalationEngine from "@/components/EscalationEngine";
import TacticalMap from "@/components/TacticalMap";
import NetworkGraph from "@/components/NetworkGraph";
import MissionIntelligenceCore from "@/components/MissionIntelligenceCore";
import SystemLogs from "@/components/SystemLogs";

type TabId = "operations" | "logistics" | "volunteers" | "resources" | "analytics";

const sidebarLinks: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "operations", label: "Operations", icon: LayoutDashboard },
  { id: "logistics", label: "Logistics", icon: Truck },
  { id: "volunteers", label: "Volunteers", icon: Users },
  { id: "resources", label: "Resources", icon: Archive },
  { id: "analytics", label: "Analytics", icon: LineChart },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("operations");
  const [secondaryNavActiveTab, setSecondaryNavActiveTab] = useState("OPERATIONS FLOW");
  const [emergencyMode, setEmergencyMode] = useState(false);

  // Global Interaction Logging
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const btn = target.closest('button');
      if (btn) {
        const btnText = btn.innerText || btn.getAttribute('aria-label') || 'SYSTEM_ACTION';
        window.dispatchEvent(new CustomEvent('system-log', { 
          detail: `[DEBUG] Latency: ${Math.floor(Math.random() * 30) + 10}ms | INTERACTION: ${btnText.trim().substring(0, 25).toUpperCase()} | STATUS: SUCCESS` 
        }));
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  const getSecondaryNav = () => {
    switch (activeTab) {
      case "operations":
        return ["OPERATIONS FLOW", "TACTICAL OVERLAY", "NETWORK GRAPH"];
      case "logistics":
        return ["NGO HUB REGISTRY", "SUPPLY CHAIN", "INVENTORY"];
      case "volunteers":
        return ["UNIT REGISTRY", "OUTREACH LOGS", "DEPLOYMENT"];
      default:
        return ["OVERVIEW", "DIAGNOSTICS"];
    }
  };

  const secondaryNavLinks = getSecondaryNav();

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${emergencyMode ? "bg-[#0a0000]" : "bg-dark-900"} text-gray-200 font-sans overflow-hidden relative`}>
      
      {/* Visual Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-900/50" />
        <div className="scanline" />
      </div>

      {/* ═══════════════ TOP NAV BAR ═══════════════ */}
      <header className="h-16 shrink-0 border-b border-white/[0.04] bg-dark-900/60 backdrop-blur-xl flex items-center px-6 justify-between z-50">
        {/* Logo Area */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-3">
                {/* High-tech 'O' icon with pulsing cyan ring */}
                <div className="relative mr-4">
                  <div className="w-8 h-8 rounded-full border-2 border-neon-blue flex items-center justify-center relative z-10 bg-dark-950">
                    <div className="w-3 h-3 rounded-full border border-neon-blue/40" />
                  </div>
                  <div className="absolute inset-0 w-8 h-8 rounded-full border border-neon-blue animate-ping opacity-40 z-0" />
                </div>
                <h1 className="text-2xl font-black tracking-tighter text-white">
                  OMNI <span className="text-neon-blue">LINK</span>
                </h1>
             </div>
          </div>
          
          <div className="hidden lg:flex h-6 w-[1px] bg-white/10 mx-2" />
          
          <div className="hidden lg:flex items-center gap-2 text-[9px] font-black text-gray-500 uppercase tracking-widest">
             <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
             NODE_CONNECTED: GLOBAL_SOUTH_01
          </div>
        </div>

        {/* Secondary Context Nav */}
        <nav className="hidden xl:flex items-center gap-10">
          {secondaryNavLinks.map((link, idx) => {
            const isActive = secondaryNavActiveTab === link;
            return (
              <button 
                key={idx} 
                onClick={() => setSecondaryNavActiveTab(link)}
                className={`text-[10px] font-black tracking-[0.2em] uppercase transition-all relative py-5 ${
                  isActive 
                    ? "text-neon-blue" 
                    : "text-gray-600 hover:text-gray-400"
                }`}
              >
                {link}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-blue shadow-[0_0_10px_rgba(76,201,240,0.8)]" 
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Icons */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 border-r border-white/5 pr-6">
            <button className="text-gray-500 hover:text-white transition-colors relative">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-neon-red rounded-full shadow-[0_0_8px_rgba(247,37,133,0.8)]"></span>
            </button>
            <button className="text-gray-500 hover:text-white transition-colors">
              <Settings className="w-4.5 h-4.5" />
            </button>
          </div>
          
          <button 
            onClick={() => setEmergencyMode(!emergencyMode)}
            className={`px-4 py-2 rounded border text-[10px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all duration-500 ${
              emergencyMode 
                ? "bg-neon-red border-neon-red text-white shadow-[0_0_30px_rgba(247,37,133,0.3)]" 
                : "bg-dark-600 border-white/10 text-gray-400 hover:text-neon-red hover:border-neon-red/30"
            }`}
          >
            <ShieldAlert className={`w-3.5 h-3.5 ${emergencyMode ? "animate-bounce" : ""}`} />
            {emergencyMode ? "PROTOCOL ALPHA ACTIVE" : "DEFCON 5 NORMAL"}
          </button>

          <div className="flex items-center gap-3 pl-2">
             <div className="text-right">
                <div className="text-[10px] font-black text-white leading-none uppercase">Admin_Root</div>
                <div className="text-[8px] font-mono text-gray-600 leading-none mt-1">LVL_04_CLEARANCE</div>
             </div>
             <div className="w-9 h-9 rounded bg-dark-700 border border-white/10 flex items-center justify-center group cursor-pointer hover:border-neon-blue transition-colors">
                <User className="w-4 h-4 text-gray-500 group-hover:text-neon-blue" />
             </div>
          </div>
        </div>
      </header>

      {/* ═══════════════ MAIN WORKSPACE ═══════════════ */}
      <div className="flex flex-1 overflow-hidden relative z-10">
        
        {/* ── SIDEBAR ── */}
        <aside className="w-64 shrink-0 border-r border-white/[0.04] bg-dark-900/40 backdrop-blur-md flex flex-col z-40">
          <div className="p-8">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_8px_rgba(0,245,141,0.5)]" />
               <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">SYSTEM STATUS</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tighter glow-text-green">ONLINE</h2>
          </div>

          <nav className="flex-1 px-4 space-y-2">
            {sidebarLinks.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-5 py-3.5 rounded group transition-all ${
                    isActive
                      ? "bg-dark-600/50 border border-white/5 text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-4 h-4 ${isActive ? "text-neon-green" : "group-hover:text-gray-300"} transition-colors`} />
                    <span className={`text-[11px] font-black uppercase tracking-widest ${isActive ? "" : "group-hover:translate-x-1 transition-transform"}`}>
                      {tab.label}
                    </span>
                  </div>
                  {isActive && (
                    <motion.div layoutId="sidebarDot" className="w-1.5 h-1.5 rounded-full bg-neon-green shadow-[0_0_8px_rgba(0,245,141,0.8)]" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="p-6 space-y-4">
            <div className="bg-dark-800/80 border border-white/5 rounded-lg p-4 mb-4">
               <div className="flex items-center justify-between mb-3">
                  <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest">NETWORK LOAD</span>
                  <span className="text-[8px] font-mono text-neon-blue">62%</span>
               </div>
               <div className="h-1 bg-dark-600 rounded-full overflow-hidden">
                  <div className="h-full bg-neon-blue w-[62%]" />
               </div>
            </div>
            
            <button className="w-full py-4 bg-neon-green text-dark-900 font-black text-[11px] uppercase tracking-[0.2em] rounded hover:bg-[#00e080] transition-all shadow-[0_0_20px_rgba(0,245,141,0.2)] flex items-center justify-center gap-3">
              <Send className="w-4 h-4" /> DEPLOY PROTOCOL
            </button>
          </div>
        </aside>

        {/* ── CONTENT AREA ── */}
        <main className={`flex-1 overflow-y-auto custom-scrollbar relative ${emergencyMode ? "bg-neon-red/[0.02]" : ""}`}>
           <div className="p-8 pb-32">
             <AnimatePresence mode="wait">
                
                {/* OPERATIONS TAB */}
                {activeTab === "operations" && (
                  <motion.div
                    key="operations"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-8 max-w-[1600px] mx-auto h-full flex flex-col"
                  >
                    {/* Top Stats Section */}
                    <StatsCards />

                    <AnimatePresence mode="wait">
                      {secondaryNavActiveTab === "OPERATIONS FLOW" && (
                        <motion.div
                          key="flow"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="grid grid-cols-1 xl:grid-cols-12 gap-8 h-[650px]"
                        >
                          {/* Left: Feed */}
                          <div className="xl:col-span-3 h-full">
                            <OperationsFeed />
                          </div>
                          
                          {/* Middle Column: Unified Intelligence & Escalation */}
                          <div className="xl:col-span-6 h-full flex flex-col gap-6 overflow-hidden">
                             <div className="shrink-0">
                                <MissionIntelligenceCore />
                             </div>
                             <div className="flex-1 overflow-y-auto custom-scrollbar glass rounded-2xl border border-white/5 bg-dark-950/20 p-1">
                                <EscalationEngine />
                             </div>
                          </div>
                          
                          {/* Right: Request Queue */}
                          <div className="xl:col-span-3 h-full">
                            <RequestsPanel />
                          </div>
                        </motion.div>
                      )}

                      {secondaryNavActiveTab === "TACTICAL OVERLAY" && (
                        <motion.div
                          key="tactical"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          className="flex-1 glass rounded-2xl border border-white/10 relative overflow-hidden bg-dark-950 shadow-2xl"
                        >
                          <TacticalMap />
                        </motion.div>
                      )}

                      {secondaryNavActiveTab === "NETWORK GRAPH" && (
                        <motion.div
                          key="network"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="flex-1 glass rounded-2xl border border-white/10 relative overflow-hidden bg-dark-950 p-8"
                        >
                          <NetworkGraph />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* AI Command Center */}
                    <div className="fixed bottom-40 right-8 left-[19rem] z-50 pointer-events-none">
                       <div className="pointer-events-auto h-72 xl:h-auto shadow-2xl">
                          <AICommandCenter />
                       </div>
                    </div>
                  </motion.div>
                )}

                {/* LOGISTICS TAB */}
                {activeTab === "logistics" && (
                  <motion.div
                    key="logistics"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8 max-w-[1600px] mx-auto"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[750px]">
                       <div className="lg:col-span-8 h-full">
                         <NGOPanel />
                       </div>
                       <div className="lg:col-span-4 h-full flex flex-col gap-8">
                         <div className="flex-1">
                            <RequestsPanel />
                         </div>
                         <div className="h-[300px]">
                            <OperationsFeed />
                         </div>
                       </div>
                    </div>
                  </motion.div>
                )}

                {/* VOLUNTEERS TAB */}
                {activeTab === "volunteers" && (
                  <motion.div
                    key="volunteers"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[750px] max-w-[1600px] mx-auto"
                  >
                    <div className="lg:col-span-5 h-full">
                      <VolunteerPanel />
                    </div>
                    <div className="lg:col-span-4 h-full flex flex-col gap-8">
                       <div className="flex-1">
                          <RequestsPanel />
                       </div>
                       <div className="h-[300px]">
                          <OutreachPanel />
                       </div>
                    </div>
                    <div className="lg:col-span-3 h-full">
                      <OperationsFeed />
                    </div>
                  </motion.div>
                )}

                {/* PLACEHOLDERS */}
                {(activeTab === "resources" || activeTab === "analytics") && (
                   <motion.div
                    key="placeholder"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="flex items-center justify-center h-[70vh] flex-col gap-6"
                  >
                     <div className="w-24 h-24 rounded-full bg-dark-800 border border-white/5 flex items-center justify-center relative">
                        <Archive className="w-10 h-10 text-gray-700" />
                        <div className="absolute inset-0 border-2 border-neon-blue border-dashed rounded-full animate-spin-slow opacity-20" />
                     </div>
                     <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black tracking-[0.4em] uppercase text-white">Accessing Secure Node</h2>
                        <p className="text-xs text-gray-600 font-mono">ESTABLISHING ENCRYPTED TUNNEL: SECTOR_07_RESOURCES</p>
                     </div>
                  </motion.div>
                )}

             </AnimatePresence>
           </div>
        </main>
      </div>
      
      {/* System Logs Terminal */}
      <div className="fixed bottom-0 left-64 right-0 z-[90]">
         <SystemLogs />
      </div>
      
      {/* Visual Glitch/Technical Elements */}
      <div className="fixed bottom-4 left-4 z-[100] text-[8px] font-mono text-gray-700 pointer-events-none uppercase tracking-widest hidden md:block">
         CPU_LOAD: 24% | MEM_USAGE: 4.2GB | OPS_SEC: 128 | AUTH: ROOT_ADMIN
      </div>
    </div>
  );
}
