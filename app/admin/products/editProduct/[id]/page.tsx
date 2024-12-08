"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import RichTextEditor from "@/components/RichTextEditor";

export default function EditProductPage() {
  const router = useRouter();
  const pathname = usePathname();
  const productId = pathname.split("/").pop();

  const [product, setProduct] = useState<{
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    stock: number;
    category: string;
  }>({
    title: "",
    description: "",
    price: 0,
    imageUrl: "",
    stock: 0,
    category: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) {
        console.error("Missing product ID");
        router.push("/admin/products");
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`/api/admin/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId, router]);

  const handleSave = async () => {
    if (!product.title || !product.description || !product.price) {
      alert("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        router.push("/admin/products");
      } else {
        alert("Failed to update product. Please try again.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
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
          <span>Loading product...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="md:container mt-10 bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input
            value={product.title}
            onChange={(e) =>
              setProduct({ ...product, title: e.target.value })
            }
            placeholder="Enter product title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <RichTextEditor
            content={product.description || ""}
            onChange={(value) =>
              setProduct({ ...product, description: value })
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Price</label>
          <Input
            value={product.price}
            onChange={(e) =>
              setProduct({ ...product, price: parseFloat(e.target.value) })
            }
            type="number"
            placeholder="Enter product price"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Image URL</label>
          <Input
            value={product.imageUrl}
            onChange={(e) =>
              setProduct({ ...product, imageUrl: e.target.value })
            }
            placeholder="Enter image URL"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Stock</label>
          <Input
            value={product.stock}
            onChange={(e) =>
              setProduct({ ...product, stock: parseInt(e.target.value, 10) })
            }
            type="number"
            placeholder="Enter stock quantity"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            <option value="PAINTING">Painting</option>
            <option value="SCULPTURE">Sculpture</option>
            <option value="DIGITAL_ART">Digital Art</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push("/admin/products")}
          >
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
