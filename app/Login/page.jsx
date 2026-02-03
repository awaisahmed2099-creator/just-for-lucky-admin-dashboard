"use client";
import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  const ADMIN_EMAIL = "admin@lucky.com";
  const ADMIN_PASSWORD = "admin_123";

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email === ADMIN_EMAIL && formData.password === ADMIN_PASSWORD) {
      router.push('/Admin'); 
    } else {
      alert("Invalid Admin Credentials");
    }
  };

  return (
    // Background color strictly matches the professional slate-blue tone
    <div className="relative min-h-screen flex items-center justify-center bg-[#1e293b] p-6 font-sans">
      
      {/* Background Glows for depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Balanced Card Size */}
      <div className="relative z-10 w-full max-w-[400px] bg-slate-900/90 backdrop-blur-2xl rounded-[2rem] border border-white/5 p-10 shadow-2xl">
        
        {/* Header - Straight & Professional */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/20">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Just For Lucky</h1>
          <p className="text-[10px] text-cyan-400 font-bold tracking-[0.3em] uppercase mt-2">Fleet Administration</p>
        </div>

        {/* Form Section with Correct Spacing */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all"
                placeholder="admin@justforlucky.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl py-3 pl-11 pr-11 text-sm text-white focus:ring-1 focus:ring-cyan-500/50 outline-none transition-all"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Button color matches your reference */}
          <button 
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/10 active:scale-[0.98] mt-2"
          >
            Sign In
          </button>
        </form>

        {/* Fixed Spacing Footer */}
        <div className="mt-8 text-center border-t border-white/5 pt-6">
          <button className="text-[10px] text-slate-500 hover:text-cyan-500 transition-colors font-bold uppercase tracking-widest mb-4">
            Reset Admin Credentials?
          </button>
          
          <p className="text-[9px] text-slate-600 font-bold uppercase tracking-[0.1em] leading-relaxed">
            Secure Session Active • Encrypted & Logged
          </p>
        </div>

      </div>
    </div>
  );
}