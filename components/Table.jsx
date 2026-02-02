"use client";

export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            {columns.map((col) => (
              <th
                key={col.key}
                className="py-3 px-6 text-left border-b border-gray-200"
              >
                {col.header}
              </th>
            ))}
            {/** Add one extra header for actions if any column has actions */}
            {columns.some(col => col.actions) && <th className="py-3 px-6 text-left border-b border-gray-200">Actions</th>}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-4">
                No data found.
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr
                key={idx}
                className={`border-b border-gray-200 hover:bg-gray-100 cursor-pointer`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-3 px-6 text-left">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                {columns.some(col => col.actions) && (
                  <td className="py-3 px-6 text-left space-x-2">
                    {columns
                      .filter(col => col.actions)
                      .map((col) =>
                        col.actions.map(({ label, onClick }, i) => (
                          <button
                            key={i}
                            onClick={() => onClick(row)}
                            className="text-blue-600 hover:underline text-sm"
                          >
                            {label}
                          </button>
                        ))
                      )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
