"use client";

import { useState } from "react";
import { Bell, Moon, Info, Search, LogOut, ShieldCheck, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false); // Dropdown control karne ke liye

  const handleLogout = () => {
    router.push("/Login");
  };

  return (
    <header className="w-full bg-transparent px-4 md:px-8 py-4 flex flex-wrap justify-between items-center gap-4 transition-all duration-500">
      
      {/* Left Side: Branding & Greeting */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex w-12 h-12 bg-cyan-500/10 rounded-2xl items-center justify-center border border-cyan-500/20 shadow-lg shadow-cyan-500/5">
          <ShieldCheck className="text-cyan-500" size={28} />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <nav className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">
              Admin / Dashboard
            </nav>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span className="text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Just For Lucky</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            Admin Console <span className="text-slate-500 font-medium text-lg md:text-xl hidden xs:inline">| Admin Dashboard</span>
          </h1>
        </div>
      </div>

      {/* Right Side: Pill-Shaped Action Bar */}
      <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/5 rounded-full px-2 py-1.5 flex items-center gap-1 shadow-2xl relative">
        
        {/* Search Input */}
        <div className="flex items-center bg-slate-950/40 rounded-full px-4 py-1.5 mr-1 focus-within:ring-1 focus-within:ring-cyan-500/30 transition-all">
          <Search size={15} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-xs text-slate-200 ml-2 w-24 md:w-40 placeholder:text-slate-600"
          />
        </div>

        {/* Action Icons (Logout arrow removed from here) */}
        <div className="flex items-center space-x-0.5">
          <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-full hover:bg-white/5 group relative" title="Notifications">
            <Bell size={18} />
            <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-cyan-500 rounded-full border border-slate-900"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-full hover:bg-white/5" title="Dark Mode">
            <Moon size={18} />
          </button>
          <button className="p-2 text-slate-400 hover:text-cyan-400 transition-colors rounded-full hover:bg-white/5" title="System Info">
            <Info size={18} />
          </button>
        </div>

        {/* User Avatar with Dropdown Logout */}
        <div className="ml-1 pr-1 relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-9 h-9 rounded-full border border-cyan-500/30 overflow-hidden bg-slate-800 p-0.5 shadow-lg shadow-cyan-500/10 active:scale-95 transition-transform"
          >
             <img 
               src="https://ui-avatars.com/api/?name=Admin&background=06b6d4&color=fff" 
               alt="Admin Profile" 
               className="w-full h-full rounded-full object-cover"
             />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
              <div className="absolute right-0 mt-3 w-40 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-20 overflow-hidden py-1">
                <button className="w-full flex items-center gap-2 px-4 py-2 text-xs text-slate-300 hover:bg-white/5 transition-colors">
                  <User size={14} /> Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/5"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}