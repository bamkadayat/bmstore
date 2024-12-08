"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import LoginForm from "./LoginForm";
import Image from "next/image";

export default function LoginUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (formData: { email: string; password: string }) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Login failed");
      }

      const { token, user } = await response.json();

      dispatch(login({ token, user }));

      // Redirect based on role
      if (user.role === "USER") {
        router.push("/overview");
      } else if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        throw new Error("Unknown user role");
      }
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message || "An unexpected error occurred.");
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="container mx-auto py-8 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div> <h1 className="text-3xl font-bold text-left mb-6">Login</h1>
        <LoginForm onSubmit={handleLogin} isSubmitting={isSubmitting} />
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}</div>
        <div className="flex justify-center">
            <Image
              src={"/assets/login.svg"}
              width={400}
              height={400}
              alt="register image"
              className="w-full max-w-xs md:max-w-md"
            />
          </div>
          </div>
      </div>
    </div>
  );
}
