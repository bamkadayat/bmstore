import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Fetch a specific product by ID
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const productId = url.pathname.split('/').pop();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch the product by ID
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the product" },
      { status: 500 }
    );
  }
}

// POST: Create a new product
export async function POST(request: NextRequest): Promise<NextResponse> {
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
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the product" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing product by ID
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const productId = url.pathname.split('/').pop();
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

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        title,
        description,
        price,
        imageUrl,
        stock,
        category,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error: unknown) {
    console.error("Error updating product:", error);

    if ((error as { code: string }).code === "P2025") {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while updating the product" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a product by ID
export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const productId = url.pathname.split('/').pop();

    // Delete the product
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      { message: "Product deleted successfully", deletedProduct },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error deleting product:", error);

    if ((error as { code: string }).code === "P2025") {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "An error occurred while deleting the product" },
      { status: 500 }
    );
  }
}