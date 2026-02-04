"use client";

import React from "react";

export default function Table({ columns, data }) {
  return (
    <div className="w-full overflow-hidden rounded-[24px] border border-white/5 bg-[#0f172a]/50 backdrop-blur-sm">
      <table className="w-full text-left border-collapse table-fixed">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-6 py-5 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] align-middle"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-white/5">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={item.id || index}
                className="hover:bg-white/[0.02] transition-colors duration-200 group"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="px-6 py-6 text-sm text-slate-300 align-middle"
                  >
                    {/* Custom render */}
                    {col.render ? (
                      <div className="flex items-center min-h-[44px]">
                        {col.render(item[col.key], item)}
                      </div>
                    ) : col.actions ? (
                      <div className="flex items-center gap-3 min-h-[44px]">
                        {col.actions.map((action, i) => (
                          <button
                            key={i}
                            onClick={() => action.onClick(item)}
                            className={`text-[10px] font-black px-4 py-2 rounded-xl transition-all ${
                              action.variant === "danger"
                                ? "bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white"
                                : "bg-cyan-500/10 text-cyan-500 hover:bg-cyan-500 hover:text-black"
                            }`}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center min-h-[44px]">
                        {item[col.key]}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-12 text-center text-slate-500 text-sm italic"
              >
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
