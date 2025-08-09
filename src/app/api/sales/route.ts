import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // Ventas: compras de productos pertenecientes a mis tiendas
    const sales = await prisma.purchases.findMany({
      where: {
        product: {
          shop: {
            userId: session.user.id,
          },
        },
      },
      include: {
        product: {
          include: {
            shop: true,
          },
        },
        user: true, // comprador
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(sales);
  } catch (error) {
    console.error("Error fetching sales:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
