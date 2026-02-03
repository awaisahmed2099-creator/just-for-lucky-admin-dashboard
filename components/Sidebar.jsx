"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Bus, 
  CheckCircle, 
  Bell, 
  FileText, 
  ShieldCheck,
  Menu
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/Admin" },
  { name: "Manage Routes", icon: Map, path: "/Admin/ManageRoutes" },
  { name: "Manage Vehicles", icon: Bus, path: "/Admin/ManageVehicles" },
  { name: "Approvals", icon: CheckCircle, path: "/Admin/Approvals" },
  { name: "Notifications", icon: Bell, path: "/Admin/Notifications" },
  { name: "Reports", icon: FileText, path: "/Admin/Reports" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative z-50 h-screen font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 3 Lines Icon (Trigger Area) - Hamesha visible rahega */}
      <div className={`fixed top-0 left-0 h-screen w-16 flex flex-col items-center py-8 bg-slate-900 border-r border-white/5 transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <Menu className="text-cyan-500 shadow-cyan-500/20" size={24} />
      </div>

      {/* Actual Sliding Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen bg-slate-900/95 backdrop-blur-2xl border-r border-white/10 shadow-[20px_0_50px_rgba(0,0,0,0.5)] transition-all duration-500 ease-in-out overflow-hidden flex flex-col p-6 
        ${isHovered ? "w-64 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-full"}`}
      >
        {/* Branding Section */}
        <div className="flex items-center gap-3 mb-10 min-w-[200px]">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="text-white" size={22} />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm tracking-tight leading-none uppercase">Just For Lucky</h2>
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest mt-1 block">Fleet Admin</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-2 min-w-[200px]">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 border ${
                  isActive 
                  ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 font-bold" 
                  : "border-transparent text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={18} className={isActive ? "text-cyan-400" : "group-hover:text-cyan-400"} />
                <span className="text-sm tracking-wide whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Text (No Logout) */}
        <div className="mt-auto min-w-[200px] pt-6 border-t border-white/5">
          <div className="bg-slate-950/40 p-3 rounded-lg border border-white/5">
            <p className="text-[8px] text-slate-500 uppercase font-bold text-center leading-tight">
              Secure Terminal <br />
              <span className="text-cyan-500/40 tracking-[0.2em]">v1.0.2 • 2026</span>
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}