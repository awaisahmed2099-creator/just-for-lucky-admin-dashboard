"use client";

import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Yahan auth tokens ya sessions clear kar sakte hain agar use kar rahe ho
    // localStorage.clear();
    // sessionStorage.clear();

    router.push("/Login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Welcome, Admin</h1>

      <div className="flex items-center space-x-4">
        <button
          aria-label="Notifications"
          className="relative text-gray-600 hover:text-gray-900 focus:outline-none"
        >
          <Bell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-600 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
