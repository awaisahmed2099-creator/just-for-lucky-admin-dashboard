"use client";

import { useState, useEffect } from "react";
import Table from "../../../components/Table";
import { CheckCircle, XCircle, Clock, Trash2 } from "lucide-react";

export default function ApprovalsPanel() {
  const [requests, setRequests] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fleet_approvals");
      return saved !== null ? JSON.parse(saved) : [
        { id: 1, studentName: "Ali Ahmed", route: "Route 1", requestedTime: "08:30 AM", status: "Pending" },
        { id: 2, studentName: "Sara Khan", route: "Route 2", requestedTime: "09:00 AM", status: "Approved" },
      ];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("fleet_approvals", JSON.stringify(requests));
  }, [requests]);

  const updateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  // Naya function: Sirf wahi request delete hogi jis par click kiya jaye
  const deleteRequest = (id) => {
    if (confirm("Kya aap is request ko delete karna chahte hain?")) {
      setRequests(prev => prev.filter(r => r.id !== id));
    }
  };

  const clearRequests = () => {
    if (confirm("Kya aap tamam requests delete karna chahte hain?")) {
      setRequests([]);
    }
  };

  const columns = [
    { key: "studentName", header: "Student Name" },
    { key: "route", header: "Route" },
    { key: "requestedTime", header: "Requested Time" },
    { 
      key: "status", 
      header: "Status",
      render: (v) => {
        const styles = { Pending: "bg-yellow-500/10 text-yellow-500", Approved: "bg-green-500/10 text-green-500", Rejected: "bg-red-500/10 text-red-500" };
        return (
          <div className="flex justify-start">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${styles[v] || styles.Pending}`}>
              {v || "Pending"}
            </span>
          </div>
        );
      }
    },
    {
      key: "actions",
      header: "Decision",
      render: (_, row) => (
        <div className="flex gap-3 items-center min-h-[45px] justify-start">
          {row?.status === "Pending" ? (
            <>
              <button onClick={() => updateStatus(row.id, "Approved")} className="p-2.5 bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-black rounded-xl transition-all shadow-lg shadow-green-500/5">
                <CheckCircle size={20} />
              </button>
              <button onClick={() => updateStatus(row.id, "Rejected")} className="p-2.5 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-black rounded-xl transition-all shadow-lg shadow-red-500/5">
                <XCircle size={20} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 px-1">
               <div className="w-1.5 h-1.5 rounded-full bg-slate-700 animate-pulse" />
               <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] italic">Actioned</span>
            </div>
          )}
          {/* Specific delete button for each row */}
          <button 
            onClick={() => deleteRequest(row.id)} 
            className="p-2.5 ml-2 bg-white/5 hover:bg-red-500/20 text-slate-500 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/20"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-white uppercase italic leading-none">Approval Center</h2>
          <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.35em] mt-2 flex items-center gap-2">
            <Clock size={13} className="opacity-60" /> Management Dashboard
          </p>
        </div>

        <div className="flex items-center gap-6 bg-white/5 px-5 py-3 rounded-2xl border border-white/5 backdrop-blur">
          <button onClick={clearRequests} className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-red-500 hover:text-white transition">
            <Trash2 size={14} /> Clear All
          </button>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex gap-5">
            <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Pending</p>
              <p className="text-xl font-black text-yellow-500 leading-none">{requests.filter(r => r.status === "Pending").length}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest">Total</p>
              <p className="text-xl font-black text-white leading-none">{requests.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#1e293b]/50 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
        <Table columns={columns} data={requests} />
      </div>
    </div>
  );
}