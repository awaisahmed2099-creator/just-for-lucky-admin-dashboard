"use client";

import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import Table from "../../../components/Table";
import { Megaphone, Send, Clock, Trash2, ShieldCheck, UserCircle } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("fleet_notifications");
      return saved !== null ? JSON.parse(saved) : [
        { id: 1, role: "All", message: "System maintenance scheduled for Saturday.", time: "10:00 AM" },
        { id: 2, role: "Driver", message: "Driver meeting at 5 PM tomorrow.", time: "02:30 PM" },
      ];
    }
    return [];
  });

  const [showModal, setShowModal] = useState(false);
  const [targetRole, setTargetRole] = useState("All");
  const [message, setMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("fleet_notifications", JSON.stringify(notifications));
  }, [notifications]);

  const sendNotification = () => {
    if (!message.trim()) return alert("Please enter a message.");
    
    const newNotification = {
      id: Date.now(),
      role: targetRole,
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setNotifications([newNotification, ...notifications]);
    setShowModal(false);
    setMessage("");
  };

  const deleteNotification = (id) => {
    if (confirm("Delete this notification?")) {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }
  };

  const columns = [
    { 
      key: "role", 
      header: "Target Role",
      render: (v) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${v === 'All' ? 'bg-cyan-500' : v === 'Driver' ? 'bg-orange-500' : 'bg-purple-500'}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{v}</span>
        </div>
      )
    },
    { 
      key: "message", 
      header: "Announcement Content",
      render: (v) => <p className="text-sm text-slate-400 font-medium italic">"{v}"</p>
    },
    { 
        key: "time", 
        header: "Sent At",
        render: (v) => <span className="text-[10px] font-bold text-slate-500">{v || "Now"}</span>
    },
    {
      key: "actions",
      header: "Control",
      render: (_, row) => (
        <button onClick={() => deleteNotification(row.id)} className="p-2 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/10">
          <Trash2 size={16} />
        </button>
      )
    }
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">Broadcast Center</h2>
          <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.4em] mt-3 flex items-center gap-2">
            <Megaphone size={14} className="text-cyan-500/50" /> Push Notifications
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-3 bg-cyan-500 text-black px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-cyan-500/20"
        >
          <Send size={16} /> New Announcement
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-[#1e293b]/50 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-sm">
        {notifications.length === 0 ? (
          <div className="p-20 text-center">
            <Megaphone size={40} className="mx-auto text-slate-700 mb-4 opacity-20" />
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No active broadcasts</p>
          </div>
        ) : (
          <Table columns={columns} data={notifications} />
        )}
      </div>

      {/* Modern Professional Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="p-4 bg-[#0f172a]">
          <h3 className="text-2xl font-black text-white uppercase italic mb-6 tracking-tighter">Create Notification</h3>
          
          <div className="space-y-6">
            <div>
              <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 block">Target Audience</label>
              <div className="grid grid-cols-3 gap-3">
                {["Student", "Driver", "All"].map((role) => (
                  <button
                    key={role}
                    onClick={() => setTargetRole(role)}
                    className={`py-3 rounded-xl text-[10px] font-black uppercase transition-all border ${
                      targetRole === role ? "bg-cyan-500 text-black border-cyan-500" : "bg-white/5 text-slate-400 border-white/5 hover:border-white/10"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 block">Your Message</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all italic"
                placeholder="Type the announcement here..."
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={sendNotification}
                className="flex-1 bg-cyan-500 text-black py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl shadow-cyan-500/10"
              >
                Send Broadcast
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 bg-white/5 text-slate-400 py-4 rounded-2xl text-[11px] font-black uppercase hover:bg-red-500/20 hover:text-red-500 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}