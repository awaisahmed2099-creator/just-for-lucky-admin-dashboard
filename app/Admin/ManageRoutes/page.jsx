"use client";

import { useState } from "react";
import Table from "../../../components/Table";

import Modal from "../../../components/Modal";

export default function ManageRoutes() {
  const [routes, setRoutes] = useState([
    { id: 1, name: "Route 1", stops: ["Stop A", "Stop B"], driver: "John", students: 20 },
    { id: 2, name: "Route 2", stops: ["Stop C", "Stop D"], driver: "Doe", students: 15 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", stops: "", driver: "" });
  const [editId, setEditId] = useState(null);

  const handleAddClick = () => {
    setFormData({ name: "", stops: "", driver: "" });
    setEditId(null);
    setShowModal(true);
  };

  const handleEditClick = (route) => {
    setFormData({ name: route.name, stops: route.stops.join(", "), driver: route.driver });
    setEditId(route.id);
    setShowModal(true);
  };

  const handleDeleteClick = (id) => {
    if (confirm("Are you sure you want to delete this route?")) {
      setRoutes(routes.filter(r => r.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stopsArr = formData.stops.split(",").map(s => s.trim()).filter(Boolean);

    if (editId) {
      setRoutes(routes.map(r => (r.id === editId ? { ...r, name: formData.name, stops: stopsArr, driver: formData.driver, students: r.students } : r)));
    } else {
      const newRoute = {
        id: Date.now(),
        name: formData.name,
        stops: stopsArr,
        driver: formData.driver,
        students: 0,
      };
      setRoutes([...routes, newRoute]);
    }
    setShowModal(false);
  };

  // Table columns config
  const columns = [
    { key: "name", header: "Route Name" },
    { key: "stops", header: "Stops Count", render: (value) => value.length },
    { key: "driver", header: "Assigned Driver" },
    { key: "students", header: "Student Count" },
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
      <h2 className="text-2xl font-semibold mb-4">Manage Routes</h2>
      <button onClick={handleAddClick} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        ➕ Add Route
      </button>

      <Table columns={columns} data={routes} />

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Route Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Stops (comma separated)</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              value={formData.stops}
              onChange={e => setFormData({ ...formData, stops: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Assign Driver</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={formData.driver}
              onChange={e => setFormData({ ...formData, driver: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editId ? "Update Route" : "Add Route"}
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
