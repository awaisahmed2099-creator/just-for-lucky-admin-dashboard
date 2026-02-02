"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
 {name: "Dashboard", href: "/Admin", icon: "🏠" },
  { name: "ManageRoutes", href: "/Admin/ManageRoutes", icon: "🛣️" },
  { name: "ManageVehicles", href: "/Admin/ManageVehicles", icon: "🚐" },
  { name: "Approvals", href: "/Admin/Approvals", icon: "✅" },
  { name: "Reports", href: "/Admin/Reports", icon: "📊" },
  { name: "Notifications", href: "/Admin/Notifications", icon: "🔔" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
      <nav className="flex flex-col space-y-3">
        {navItems.map(({ name, href, icon }) => (
          <Link
            key={name}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-200 ${
              pathname === href ? "bg-gray-300 font-semibold" : ""
            }`}
          >
            <span>{icon}</span>
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
