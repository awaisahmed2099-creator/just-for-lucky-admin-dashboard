"use client";

import { useState } from "react";
import Modal from "../../../components/Modal";
import Table from "../../../components/Table";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, role: "All", message: "System maintenance scheduled for Saturday." },
    { id: 2, role: "Drivers", message: "Driver meeting at 5 PM tomorrow." },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [targetRole, setTargetRole] = useState("All");
  const [message, setMessage] = useState("");

  const openModal = () => {
    setTargetRole("All");
    setMessage("");
    setShowModal(true);
  };

  const sendNotification = () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }
    const newNotification = {
      id: Date.now(),
      role: targetRole,
      message: message.trim(),
    };
    setNotifications([newNotification, ...notifications]);
    setShowModal(false);
    alert("Notification sent!");
  };

  const columns = [
    { key: "role", header: "Role" },
    { key: "message", header: "Message" },
  ];

  return (
    <div className="p-6 ml-64 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Notifications Panel</h2>

      <button
        onClick={openModal}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ➕ Send Notification
      </button>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <Table columns={columns} data={notifications} />
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Target Role</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="border px-3 py-2 rounded w-full max-w-xs"
            >
              <option value="Student">Student</option>
              <option value="Driver">Driver</option>
              <option value="All">All</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border px-3 py-2 rounded w-full max-w-xl"
              placeholder="Enter your notification message here"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              onClick={sendNotification}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Send Notification
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-400 text-black px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
