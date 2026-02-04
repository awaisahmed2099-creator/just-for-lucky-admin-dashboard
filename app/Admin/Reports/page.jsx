"use client";

import { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { FileText, BarChart3, Download, RefreshCcw, Trash2 } from "lucide-react";

export default function Reports() {
  const [reportType, setReportType] = useState("daily");
  const [date, setDate] = useState("");
  
  // Persistence Logic: Load data from localStorage on mount
  const [reportData, setReportData] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fleet_last_report");
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  });

  // Save to localStorage whenever reportData changes
  useEffect(() => {
    if (reportData) {
      localStorage.setItem("fleet_last_report", JSON.stringify(reportData));
    } else {
      localStorage.removeItem("fleet_last_report");
    }
  }, [reportData]);

  const generateReport = () => {
    if (!date) return alert("Please select a date.");
    setReportData({
      studentsTraveled: Math.floor(Math.random() * 200),
      vehiclesUsed: Math.floor(Math.random() * 20),
      earlyLeaves: Math.floor(Math.random() * 15),
    });
  };

  const columns = [
    { 
      key: "metric", header: "Metric Analysis",
      render: (v) => <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{v}</span>
    },
    { 
      key: "value", header: "Total Count",
      render: (v) => (
        <div className="flex items-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
          <span className="text-lg font-black text-white leading-none">{v}</span>
        </div>
      )
    },
  ];

  const data = reportData ? [
    { metric: "Students Traveled", value: reportData.studentsTraveled },
    { metric: "Vehicles Used", value: reportData.vehiclesUsed },
    { metric: "Early Leaves", value: reportData.earlyLeaves },
  ] : [];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Intelligence Hub</h2>
          <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.4em] mt-3 flex items-center gap-2">
            <FileText size={14} className="opacity-50" /> Fleet Analytics & Reports
          </p>
        </div>

        <div className="flex gap-4 items-center bg-white/5 p-3 rounded-[2rem] border border-white/5 backdrop-blur-md">
          <div className="flex bg-black/20 p-1 rounded-xl">
            {["daily", "weekly"].map((type) => (
              <button key={type} onClick={() => setReportType(type)} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${reportType === type ? "bg-cyan-500 text-black shadow-lg" : "text-slate-500 hover:text-white"}`}>{type}</button>
            ))}
          </div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bg-transparent border-none text-white text-[11px] font-black uppercase focus:ring-0 cursor-pointer" />
          
          <button onClick={generateReport} className="bg-white text-black px-6 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-cyan-500 transition-all flex items-center gap-2">
            <RefreshCcw size={14} /> Run Report
          </button>

          {reportData && (
            <button onClick={() => setReportData(null)} className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-500/10">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 space-y-4">
          {reportData ? data.map((item, i) => (
            <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] backdrop-blur-sm">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">{item.metric}</p>
              <h4 className="text-4xl font-black text-white italic">{item.value}</h4>
            </div>
          )) : (
            <div className="h-full bg-white/5 border border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center">
              <BarChart3 size={48} className="text-slate-800 mb-4" />
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest">Select parameters to <br /> generate analytics</p>
            </div>
          )}
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="bg-[#1e293b]/50 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
            {reportData ? (
              <>
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                   <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Detailed Breakdown</h3>
                   <button className="text-cyan-500 hover:text-white transition-colors"><Download size={18} /></button>
                </div>
                <Table columns={columns} data={data} />
              </>
            ) : (
              <div className="p-20 text-center opacity-20">
                <p className="text-xs font-black uppercase tracking-[0.5em] text-white">Awaiting Data Generation</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}