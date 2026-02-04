"use client";

import { useState, useEffect } from "react";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";
import { Plus } from "lucide-react";

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    vehicleId: "", type: "Van", capacity: "", route: "", status: "Active",
  });

  useEffect(() => {
    const saved = localStorage.getItem("fleet_vehicles");
    setVehicles(saved ? JSON.parse(saved) : [
      { id: 1, vehicleId: "VAN123", type: "Van", capacity: 12, route: "Route 1", status: "Active" },
    ]);
  }, []);

  useEffect(() => {
    if (vehicles.length > 0) {
      localStorage.setItem("fleet_vehicles", JSON.stringify(vehicles));
    }
  }, [vehicles]);

  const handleAction = (v = null) => {
    setFormData(v ? { ...v } : { vehicleId: "", type: "Van", capacity: "", route: "", status: "Active" });
    setEditId(v?.id || null);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...formData, capacity: Number(formData.capacity) };

    setVehicles(prev => editId 
      ? prev.map(v => v.id === editId ? { ...v, ...data } : v)
      : [...prev, { id: Date.now(), ...data }]
    );
    setShowModal(false);
  };

  const columns = [
    { key: "vehicleId", header: "Vehicle ID" },
    { key: "type", header: "Type" },
    { key: "capacity", header: "Capacity" },
    { key: "route", header: "Route" },
    { 
      key: "status", 
      header: "Status",
      render: (v) => (
        <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${v === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
          {v.toUpperCase()}
        </span>
      )
    },
    {
      key: "actions",
      header: "Actions",
      actions: [
        { label: "EDIT", onClick: handleAction },
        { label: "DELETE", variant: "danger", onClick: (v) => confirm("Delete vehicle?") && setVehicles(vehicles.filter(i => i.id !== v.id)) },
      ],
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Manage Vehicles</h2>
          <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest mt-1">Fleet Assets Management</p>
        </div>
        <button onClick={() => handleAction()} className="flex items-center gap-2 bg-[#00D7FF] text-black font-black text-[11px] uppercase px-6 py-3 rounded-2xl hover:shadow-[0_0_20px_rgba(0,215,255,0.3)] transition-all active:scale-95">
          <Plus size={16} strokeWidth={3} /> Add Vehicle
        </button>
      </div>

      <Table columns={columns} data={vehicles} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={editId ? "Edit Vehicle" : "Add Vehicle"}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Row 1: ID & Type */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1 tracking-widest">Vehicle ID</label>
              <input className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-cyan-500/50" placeholder="VAN-01" value={formData.vehicleId} onChange={e => setFormData({...formData, vehicleId: e.target.value})} required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1 tracking-widest">Type</label>
              <select className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-cyan-500/50" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                <option value="Van">Van</option>
                <option value="Bus">Bus</option>
              </select>
            </div>
          </div>

          {/* Row 2: Capacity & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1 tracking-widest">Capacity</label>
              <input type="number" className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-cyan-500/50" value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} required />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1 tracking-widest">Status</label>
              <select className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-cyan-500/50" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Row 3: Assigned Route (Ab ye yahan hai!) */}
          <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 ml-1 tracking-widest">Assigned Route</label>
            <input className="w-full bg-[#1e293b] border border-white/5 rounded-2xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-cyan-500/50 placeholder:text-slate-700" placeholder="e.g. Route Alpha" value={formData.route} onChange={e => setFormData({...formData, route: e.target.value})} />
          </div>

          <div className="flex gap-4 pt-4">
            <button type="submit" className="flex-1 py-4 bg-[#00D7FF] hover:bg-[#00c4e9] text-black font-black text-[12px] uppercase tracking-widest rounded-2xl transition-all shadow-lg active:scale-95">Confirm</button>
            <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-4 bg-slate-800 text-slate-400 font-black text-[12px] uppercase tracking-widest rounded-2xl border border-white/5">Cancel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}