"use client";

import { useState } from "react";
import Table from "../../../components/Table";

export default function Reports() {
  const [reportType, setReportType] = useState("daily"); // "daily" or "weekly"
  const [date, setDate] = useState("");
  const [reportData, setReportData] = useState(null);

  const columns = [
    { key: "metric", header: "Metric" },
    { key: "value", header: "Value" },
  ];

  const generateReport = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }
    // Simulate fetching report data
    setReportData({
      studentsTraveled: Math.floor(Math.random() * 200),
      vehiclesUsed: Math.floor(Math.random() * 20),
      earlyLeaves: Math.floor(Math.random() * 15),
    });
  };

  // Prepare data in array format for Table component
  const data = reportData
    ? [
        { metric: "Students Traveled", value: reportData.studentsTraveled },
        { metric: "Vehicles Used", value: reportData.vehiclesUsed },
        { metric: "Early Leaves", value: reportData.earlyLeaves },
      ]
    : [];

  return (
    <div className="p-6 ml-64 max-w-3xl">
      <h2 className="text-2xl font-semibold mb-4">Reports</h2>

      <div className="mb-4 flex items-center space-x-4">
        <label className="font-semibold">Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="daily">Daily Report</option>
          <option value="weekly">Weekly Report</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">
          {reportType === "daily" ? "Select Date:" : "Select Week (Start Date):"}
        </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-xs"
        />
      </div>

      <button
        onClick={generateReport}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generate Report
      </button>

      {reportData && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xs">
          <h3 className="text-xl font-semibold mb-3">Report Summary</h3>
          <Table columns={columns} data={data} />
        </div>
      )}
    </div>
  );
}
