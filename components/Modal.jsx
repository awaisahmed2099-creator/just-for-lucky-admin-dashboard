"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl flex items-center justify-center z-[100] p-4"
      onClick={onClose} 
    >
      <div
        className="bg-[#0f172a] border border-white/10 rounded-[32px] shadow-2xl max-w-lg w-full p-8 relative animate-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Glow Effect */}
        <div className="absolute -top-6 -left-6 w-32 h-32 bg-cyan-500/20 blur-[60px] -z-10 rounded-full"></div>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter">{title}</h3>
            <div className="h-1 w-10 bg-[#00D7FF] rounded-full mt-1 shadow-[0_0_10px_rgba(0,215,255,0.5)]"></div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-white transition-all duration-200"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Content - Yahan buttons aap form ke andar handle karenge */}
        <div className="text-slate-300">
          {children}
        </div>
      </div>
    </div>
  );
}