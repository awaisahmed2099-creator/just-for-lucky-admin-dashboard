"use client";

import { useState } from "react";
import Table from "../../../components/Table";


const sampleRequests = [
  { id: 1, studentName: "Ali", route: "Route 1", requestedTime: "08:30 AM", status: "Pending" },
  { id: 2, studentName: "Sara", route: "Route 2", requestedTime: "09:00 AM", status: "Approved" },
];

const statusColors = {
  Pending: "bg-yellow-300 text-yellow-900",
  Approved: "bg-green-300 text-green-900",
  Rejected: "bg-red-300 text-red-900",
};

export default function ApprovalsPanel() {
  const [requests, setRequests] = useState(sampleRequests);

  const updateStatus = (id, newStatus) => {
    setRequests(requests.map(r => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  // Custom render function for status with buttons
  const renderRow = (request) => (
    <tr key={request.id} className="hover:bg-gray-100">
      <td className="p-3 border">{request.studentName}</td>
      <td className="p-3 border">{request.route}</td>
      <td className="p-3 border">{request.requestedTime}</td>
      <td className="p-3 border">
        <span className={`px-2 py-1 rounded ${statusColors[request.status]}`}>
          {request.status}
        </span>
      </td>
      <td className="p-3 border space-x-2">
        {request.status === "Pending" && (
          <>
            <button
              onClick={() => updateStatus(request.id, "Approved")}
              className="px-2 py-1 bg-green-400 rounded hover:bg-green-500"
            >
              ✅ Approve
            </button>
            <button
              onClick={() => updateStatus(request.id, "Rejected")}
              className="px-2 py-1 bg-red-400 rounded hover:bg-red-500"
            >
              ❌ Reject
            </button>
          </>
        )}
      </td>
    </tr>
  );

  return (
    <div className="p-6 ml-64">
      <h2 className="text-2xl font-semibold mb-4">Early Leave Requests</h2>

      <table className="w-full border-collapse bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Student Name</th>
            <th className="p-3 border">Route</th>
            <th className="p-3 border">Requested Time</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(renderRow)}
        </tbody>
      </table>
    </div>
  );
}
