import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        imageUrl: true,
        stock: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const transformedProducts = products.map((product) => ({
      ...product,
      category: product.category || "Uncategorized",
    }));

    return NextResponse.json(transformedProducts, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
