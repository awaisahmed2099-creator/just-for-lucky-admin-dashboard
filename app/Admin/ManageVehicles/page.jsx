"use client";

import { useState } from "react";
import Table from "../../../components/Table";
import Modal from "../../../components/Modal";

export default function ManageVehicles() {
  const [vehicles, setVehicles] = useState([
    { id: 1, vehicleId: "VAN123", type: "Van", capacity: 12, route: "Route 1", status: "Active" },
    { id: 2, vehicleId: "BUS456", type: "Bus", capacity: 40, route: "Route 2", status: "Inactive" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    vehicleId: "",
    type: "Van",
    capacity: "",
    route: "",
    status: "Active",
  });
  const [editId, setEditId] = useState(null);

  const handleAddClick = () => {
    setFormData({ vehicleId: "", type: "Van", capacity: "", route: "", status: "Active" });
    setEditId(null);
    setShowModal(true);
  };

  const handleEditClick = (v) => {
    setFormData({
      vehicleId: v.vehicleId,
      type: v.type,
      capacity: v.capacity,
      route: v.route,
      status: v.status,
    });
    setEditId(v.id);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    if (confirm("Are you sure you want to delete this vehicle?")) {
      setVehicles(vehicles.filter((v) => v.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setVehicles(
        vehicles.map((v) =>
          v.id === editId ? { ...v, ...formData, capacity: Number(formData.capacity) } : v
        )
      );
    } else {
      const newVehicle = {
        id: Date.now(),
        ...formData,
        capacity: Number(formData.capacity),
      };
      setVehicles([...vehicles, newVehicle]);
    }
    setShowModal(false);
  };

  const columns = [
    { key: "vehicleId", header: "Vehicle ID" },
    { key: "type", header: "Type" },
    { key: "capacity", header: "Capacity" },
    { key: "route", header: "Assigned Route" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "Actions",
      actions: [
        { label: "✏️ Edit", onClick: (row) => handleEditClick(row) },
        { label: "🗑 Delete", onClick: (row) => handleDeleteClick(row.id) },
      ],
    },
  ];

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-semibold mb-4">Manage Vehicles</h2>
      <button
        onClick={handleAddClick}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Add Vehicle
      </button>

      <Table columns={columns} data={vehicles} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Vehicle ID</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={formData.vehicleId}
              onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Type</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option>Van</option>
              <option>Bus</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Capacity</label>
            <input
              type="number"
              min="1"
              className="w-full border px-3 py-2 rounded"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Assigned Route</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={formData.route}
              onChange={(e) => setFormData({ ...formData, route: e.target.value })}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Status</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId ? "Update Vehicle" : "Add Vehicle"}
            </button>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
