import { z } from "zod";

// Define the Category enum based on your Prisma schema
const CategoryEnum = z.enum(["PAINTING", "SCULPTURE", "DIGITAL_ART"]);

export const ProductSchema = z.object({
  id: z.string().uuid().optional(), // UUID for the product ID, optional for creation
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  price: z
    .number()
    .positive("Price must be a positive number")
    .max(1_000_000, "Price must not exceed $1,000,000"),
  imageUrl: z
    .string()
    .url("Image URL must be a valid URL")
    .max(500, "Image URL must not exceed 500 characters"),
  stock: z
    .number()
    .int("Stock must be an integer")
    .min(0, "Stock cannot be negative")
    .max(10_000, "Stock must not exceed 10,000 items"),
  category: CategoryEnum, // Use the defined Category enum
  createdAt: z
    .string()
    .datetime({ message: "Invalid createdAt format" })
    .optional(), // Optional for creation
  updatedAt: z
    .string()
    .datetime({ message: "Invalid updatedAt format" })
    .optional(), // Optional for creation
});

// Infer the TypeScript type from the schema
export type Product = z.infer<typeof ProductSchema>;
