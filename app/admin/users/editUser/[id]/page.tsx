"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EditUserPage() {
  const router = useRouter();
  const pathname = usePathname();
  const userId = pathname.split("/").pop();

  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
    password?: string;
  }>({
    name: "",
    email: "",
    role: "USER",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/users/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data); 
        } else {
          console.error("Failed to fetch user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        router.push("/admin/users"); 
      } else {
        alert("Failed to update user. Please try again.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <div className="flex items-center justify-center space-x-2">
          <svg
            className="animate-spin h-5 w-5 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span>Loading users...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="md:container mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <Input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Enter user name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="email"
            placeholder="Enter user email"
             className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Role</label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <Input
            value={user.password || ""}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="Enter new password (optional)"
             className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={() => router.push("/admin/users")}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
