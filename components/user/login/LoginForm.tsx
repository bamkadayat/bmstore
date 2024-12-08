"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormProps {
  onSubmit: (formData: { email: string; password: string }) => void;
  isSubmitting: boolean;
}

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, isSubmitting }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Email Field */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
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
          {...register("password", { required: "Password is required" })}
          className={`w-full p-3 border rounded ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter your password"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full py-3 text-white rounded ${
          isSubmitting ? "bg-gray-400" : "bg-gray-500 hover:bg-gray-600"
        }`}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
