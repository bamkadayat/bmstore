"use client";

import React, { useState } from "react";
import AddUserForm from "./AddUserForm"; 
import { CreateUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

export default function AddUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleAddUser = async (data: CreateUser) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/admin/users/addUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("User added successfully!");
        router.push("/admin/users");
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="md:container mt-10 bg-white p-6 rounded-lg shadow-md">
      <Link href={"/admin/users"}><FaArrowLeftLong color="black" className="my-4" /></Link>
      <h1 className="text-2xl font-bold mb-4">Add User</h1>
      <AddUserForm onSubmit={handleAddUser} isSubmitting={isSubmitting} message={message} />
    </div>
  );
}
