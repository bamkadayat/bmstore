"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/store/authSlice";

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get the current URL path
  const router = useRouter();
  const dispatch = useDispatch();

  const menuItems = [
    { path: "/admin/dashboard", label: "Home" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/orders", label: "Orders" },
    { path: "/admin/settings", label: "Settings" },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/users/logout", { method: "POST", credentials: "include" });
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        {/* Dashboard Title */}
        <div className="p-4 text-lg font-bold">Dashboard</div>

        {/* Navigation Menu */}
        <nav className="flex-1">
          <ul>
            {menuItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <li
                  className={`p-4 cursor-pointer hover:bg-gray-700 ${
                    pathname === item.path ? "bg-gray-700" : ""
                  }`}
                >
                  {item.label}
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 bg-gray-100 p-8">{children}</main>
    </div>
  );
}
