"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/types/user";
import { z } from "zod";

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  onSubmit: (data: UserFormValues) => Promise<void>;
  isSubmitting: boolean;
  message?: string;
}

export default function AddUserForm({ onSubmit, isSubmitting, message }: UserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await onSubmit(data);
        reset();
      })}
      className="space-y-4"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Role */}
      <div>
        <label className="block text-sm font-medium mb-2" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          {...register("role")}
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Add User"}
        </button>
      </div>
      <div>
        {message && (
          <div className="text-green-500 text-sm">{message}</div>
        )}
      </div>
    </form>
  );
}
