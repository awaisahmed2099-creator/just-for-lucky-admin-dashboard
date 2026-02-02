"use client";

import React from "react";
import Link from "next/link";  // <-- Import Link for navigation
import { Users, Bus, Map, Bell } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stats = [
  { title: "Total Students", value: "320", icon: Users },
  { title: "Active Drivers", value: "18", icon: Bus },
  { title: "Routes", value: "12", icon: Map },
  { title: "Pending Requests", value: "7", icon: Bell },
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
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard – Just For Lucky</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white p-4 rounded-xl shadow flex items-center gap-4"
          >
            <item.icon className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-gray-500">{item.title}</p>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Ride Activity</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="rides" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Requests */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Recent Student Requests</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-2">Student</th>
              <th>Type</th>
              <th>Route</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">Ali Khan</td>
              <td>Early Drop</td>
              <td>Route A</td>
              <td className="text-yellow-600">Pending</td>
            </tr>
            <tr className="border-b">
              <td className="py-2">Ayesha Noor</td>
              <td>Carpool</td>
              <td>Route B</td>
              <td className="text-green-600">Approved</td>
            </tr>
            <tr>
              <td className="py-2">Usman Raza</td>
              <td>Early Drop</td>
              <td>Route C</td>
              <td className="text-red-600">Rejected</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4 mt-6">
        <Link
          href="/Admin/ManageRoutes"
          
        >
          Manage Routes
        </Link>
        <Link
          href="/Admin/ManageVehicles"
         
        >
          Manage Vehicles
        </Link>
        <Link
          href="/Admin/Approvals"
          
        >
          Approvals
        </Link>
        <Link
          href="/Admin/Notifications"
          
        >
          Notifications
        </Link>
        <Link
          href="/Admin/Reports"
          
        >
          Reports
        </Link>
      </div>
    </div>
  );
}
