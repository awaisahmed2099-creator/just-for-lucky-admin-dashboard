"use client";

import { useState } from 'react';

export default function DashboardPage() {
    const [stats] = useState({
        students: 120,
        drivers: 15,
        routes: 8,
        vehicles: 10,
    });

    const cards = [
        { id: 'students', label: 'Total Students', value: stats.students, color: 'bg-blue-600' },
        { id: 'drivers', label: 'Total Drivers', value: stats.drivers, color: 'bg-green-600' },
        { id: 'routes', label: 'Total Routes', value: stats.routes, color: 'bg-amber-600' },
        { id: 'vehicles', label: 'Total Vehicles', value: stats.vehicles, color: 'bg-purple-600' },
    ];

    return (
        <main className="p-6 min-h-screen bg-gray-50">
            <header className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-600">Overview of key metrics</p>
            </header>

            <section aria-label="Overview cards" className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map((c) => (
                    <article
                        key={c.id}
                        role="group"
                        aria-labelledby={`${c.id}-title`}
                        className="bg-white rounded-lg shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-300"
                    >
                        <div className={`${c.color} px-4 py-3`}>
                            <h2 id={`${c.id}-title`} className="text-sm font-medium text-white">
                                {c.label}
                            </h2>
                        </div>
                        <div className="p-4">
                            <p className="text-3xl font-bold text-gray-900" aria-live="polite">
                                {c.value}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Current</p>
                        </div>
                    </article>
                ))}
            </section>

            <section className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-2" aria-label="Charts and summaries">
                <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="text-lg font-medium text-gray-900">Daily Pickups</h3>
                    <div
                        role="img"
                        aria-label="Placeholder for Daily Pickups chart"
                        className="mt-4 h-40 rounded-md border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400"
                    >
                        Chart placeholder
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="text-lg font-medium text-gray-900">Early Leave Requests Count</h3>
                    <div
                        role="img"
                        aria-label="Placeholder for Early Leave Requests Count chart"
                        className="mt-4 h-40 rounded-md border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400"
                    >
                        Chart placeholder
                    </div>
                </div>
            </section>
        </main>
    );
}
