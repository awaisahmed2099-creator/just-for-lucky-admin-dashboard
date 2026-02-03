"use client";

import React from "react";
import Link from "next/link";
import { Users, Bus, Map, Bell, TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const stats = [
  { title: "Total Students", value: "320", icon: Users, color: "text-blue-400" },
  { title: "Active Drivers", value: "18", icon: Bus, color: "text-cyan-400" },
  { title: "Routes", value: "12", icon: Map, color: "text-indigo-400" },
  { title: "Pending Requests", value: "7", icon: Bell, color: "text-orange-400" },
];

const chartData = [
  { day: "Mon", rides: 120 },
  { day: "Tue", rides: 140 },
  { day: "Wed", rides: 160 },
  { day: "Thu", rides: 150 },
  { day: "Fri", rides: 180 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* System Status - Clean & Floating */}
      <div className="flex justify-end">
        <div className="bg-slate-900/50 px-4 py-1.5 rounded-full border border-cyan-500/20 text-[10px] font-bold text-cyan-400 uppercase tracking-widest shadow-lg shadow-cyan-500/5">
          System Live
        </div>
      </div>

      {/* Stats Cards - Matches your Theme */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, i) => (
          <div key={i} className="bg-slate-900/60 border border-white/5 p-5 rounded-3xl hover:border-cyan-500/30 transition-all shadow-xl group">
            <div className="flex justify-between items-center mb-3">
              <item.icon className={`${item.color} group-hover:scale-110 transition-transform`} size={24} />
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Real-time</span>
            </div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">{item.title}</p>
            <p className="text-2xl font-bold text-white mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Chart - Modern Styling */}
        <div className="lg:col-span-2 bg-slate-900/60 p-6 rounded-3xl border border-white/5 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp size={20} className="text-cyan-500" /> Weekly Ride Activity
          </h2>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#22d3ee' }}
                />
                <Line type="monotone" dataKey="rides" stroke="#06b6d4" strokeWidth={4} dot={{ fill: '#06b6d4', r: 4 }} activeDot={{ r: 6, stroke: '#1e293b', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Requests - Optimized List */}
        <div className="bg-slate-900/60 p-6 rounded-3xl border border-white/5 shadow-xl">
          <h2 className="text-lg font-bold text-white mb-6 tracking-tight">Recent Requests</h2>
          <div className="space-y-4">
            {[
              { name: "Ali Khan", type: "Early Drop", status: "Pending", color: "text-orange-400", bg: "bg-orange-400/10" },
              { name: "Ayesha Noor", type: "Carpool", status: "Approved", color: "text-emerald-400", bg: "bg-emerald-400/10" },
              { name: "Usman Raza", type: "Early Drop", status: "Rejected", color: "text-red-400", bg: "bg-red-400/10" },
            ].map((req, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 rounded-2xl bg-slate-800/40 border border-white/5 hover:bg-slate-800/60 transition-colors">
                <div>
                  <p className="text-sm font-bold text-white">{req.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{req.type}</p>
                </div>
                <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg ${req.bg} ${req.color} uppercase tracking-tighter`}>
                  {req.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons section removed strictly as requested */}
    </div>
  );
}