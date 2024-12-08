"use client";

import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import { CreateUser } from "@/types/user";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterUser() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (formData: CreateUser) => {
    setIsSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Failed to register user");
      }

      setSuccessMessage("User registered successfully!");
      router.push("/login");
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
          <div>
            <h1 className="text-3xl font-bold text-left mb-6">Create account</h1>
            <RegisterForm
              onSubmit={handleRegister}
              isSubmitting={isSubmitting}
            />
            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">
                {successMessage}
              </p>
            )}
            {/* Error Message */}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </div>
          <div className="flex justify-center">
            <Image
              src={"/assets/register.svg"}
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