import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, imageUrl, stock, category } = body;

    // Validate required fields
    if (!title || !description || !price || !imageUrl || !stock || !category) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Validate price and stock
    if (price <= 0 || stock < 0) {
      return NextResponse.json(
        { error: "Price must be greater than 0 and stock cannot be negative" },
        { status: 400 }
      );
    }

    // Create the product
    const newProduct = await prisma.product.create({
      data: {
        title,
        description,
        price,
        imageUrl,
        stock,
        category,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: unknown) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the product" },
      { status: 500 }
    );
  }
}
