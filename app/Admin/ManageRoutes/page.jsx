"use client";

import { useState, useEffect } from "react";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import { Plus } from "lucide-react";

export default function ManageRoutes() {
  const [routes, setRoutes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", stops: "", driver: "" });
  const [editId, setEditId] = useState(null);

  // 1. Load data from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("fleet_routes");
    if (saved) {
      setRoutes(JSON.parse(saved));
    } else {
      setRoutes([
        { id: 1, name: "Route 1", stops: ["Stop A", "Stop B"], driver: "John", students: 20 },
      ]);
    }
  }, []);

  // 2. Save to LocalStorage whenever routes change
  useEffect(() => {
    if (routes.length > 0) {
      localStorage.setItem("fleet_routes", JSON.stringify(routes));
    }
  }, [routes]);

  const handleAction = (route = null) => {
    setFormData(route ? { name: route.name, stops: route.stops.join(", "), driver: route.driver } : { name: "", stops: "", driver: "" });
    setEditId(route?.id || null);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stopsArr = formData.stops.split(",").map(s => s.trim()).filter(Boolean);
    const newEntry = { name: formData.name, stops: stopsArr, driver: formData.driver };

    setRoutes(prev => editId 
      ? prev.map(r => r.id === editId ? { ...r, ...newEntry } : r)
      : [...prev, { id: Date.now(), ...newEntry, students: 0 }]
    );
    setShowModal(false);
  };

  const columns = [
    { key: "name", header: "Route Name" },
    // FIXED: Ab yahan stops list nazar aayegi
    { 
      key: "stops", 
      header: "Stops List", 
      render: (v) => <span className="text-xs text-slate-400">{v.join(" → ")}</span> 
    },
    { key: "driver", header: "Driver" },
    { key: "students", header: "Students" },
    {
      key: "actions",
      header: "Actions",
      actions: [
        { label: "EDIT", onClick: handleAction },
        { label: "DELETE", variant: 'danger', onClick: (r) => confirm("Delete?") && setRoutes(routes.filter(i => i.id !== r.id)) },
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Manage Routes</h2>
          <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest mt-1">Fleet Navigation</p>
        </div>
        <button onClick={() => handleAction()} className="flex items-center gap-2 bg-[#00D7FF] text-black font-black text-[11px] uppercase tracking-widest px-6 py-3 rounded-2xl hover:shadow-[0_0_20px_rgba(0,215,255,0.3)] transition-all">
          <Plus size={16} /> Add Route
        </button>
      </div>

      <Table columns={columns} data={routes} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editId ? "Edit Route" : "Add Route"}>
        <form onSubmit={handleSubmit} className="space-y-6">
          {["name", "stops", "driver"].map((field) => (
            <div key={field}>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 ml-1">
                {field === "name" ? "Route Designation" : field === "stops" ? "Stops (comma separated)" : "Assign Driver"}
              </label>
              {field === "stops" ? (
                <textarea className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-5 py-3 text-sm text-white focus:ring-1 focus:ring-cyan-500/50 outline-none" value={formData[field]} onChange={e => setFormData({...formData, [field]: e.target.value})} required />
              ) : (
                <input className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-5 py-3 text-sm text-white focus:ring-1 focus:ring-cyan-500/50 outline-none" value={formData[field]} onChange={e => setFormData({...formData, [field]: e.target.value})} required />
              )}
            </div>
          ))}
          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 py-4 bg-[#00D7FF] hover:bg-[#00c4e9] text-black font-black text-[12px] uppercase tracking-widest rounded-2xl transition-all shadow-lg active:scale-95">Confirm</button>
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-800 text-slate-300 font-black text-[12px] uppercase tracking-widest rounded-2xl border border-white/5 transition-all">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}