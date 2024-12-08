"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema, CreateUser } from "@/types/user";

interface RegisterFormProps {
  onSubmit: (formData: CreateUser) => void;
  isSubmitting: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateUser>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "USER", 
    },
  });

  const handleFormSubmit: SubmitHandler<CreateUser> = (data) => {
    onSubmit(data);
    reset(); 
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Name Field */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Name:</label>
        <input
          type="text"
          {...register("name")}
          className={`w-full p-3 border rounded ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          {...register("email")}
          className={`w-full p-3 border rounded ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          {...register("password")}
          className={`w-full p-3 border rounded ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {/* Role Field (Hidden by Default) */}
      <input type="hidden" {...register("role")} value="USER" />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-white rounded ${
          isSubmitting ? "bg-gray-400" : "bg-gray-500 hover:bg-gray-600"
        }`}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
