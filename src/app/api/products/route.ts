import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { generateSlug } from "@/lib/utils";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { name, description, price, image, shopId } = await request.json();

    if (!name || !price || !shopId) {
      return NextResponse.json(
        { error: "Nombre, precio y tienda son requeridos" },
        { status: 400 }
      );
    }

    // Verificar que la tienda pertenezca al usuario
    const shop = await prisma.shops.findFirst({
      where: {
        id: shopId,
        userId: session.user.id,
      },
    });

    if (!shop) {
      return NextResponse.json(
        { error: "Tienda no encontrada" },
        { status: 404 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        shopId,
        slug: `${generateSlug(name)}-${Date.now()}`,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
