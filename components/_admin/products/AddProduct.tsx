"use client";

import React, { useState } from "react";
import { z } from "zod";
import { ProductSchema } from "@/types/products";
import { useRouter } from "next/navigation";
import AddProductForm from "./AddProductForm";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default function AddProduct() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleAddProduct = async (data: z.infer<typeof ProductSchema>) => {
    setIsSubmitting(true);
    console.log("Form data received (parent):", data);
    try {
      const response = await fetch("/api/admin/products/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          price: data.price,
          imageUrl: data.imageUrl,
          stock: data.stock,
          category: data.category, 
        }),
      });
  
      if (response.ok) {
        setMessage("Product added successfully!");
        setTimeout(() => {
          router.push("/admin/products"); 
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  

  return (
    <div className="md:container mt-10 bg-white p-6 rounded-lg shadow-md">
      <Link href="/admin/products">
        <FaArrowLeft color="black" className="my-4 cursor-pointer" />
      </Link>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      {message && (
        <p
          className={`mb-4 ${
            message.includes("successfully") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
      <AddProductForm
        onSubmit={handleAddProduct}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
