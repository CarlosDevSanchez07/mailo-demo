import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BuyButton } from "@/components/shop/buy-button";
import { ArrowLeftIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

type Shop = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  products: Product[];
};

async function getShop(slug: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/shops/${slug}`,
    {
      next: { revalidate: 30 },
    }
  );
  if (!res.ok) return null as Shop | null;
  return res.json();
}

export default async function PublicShopPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { slug } = await params;
  const shop: Shop | null = await getShop(slug);

  if (!shop) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-2">Tienda no encontrada</h2>
            <p className="text-muted-foreground mb-4">
              La tienda que buscas no existe o ha sido eliminada.
            </p>
            <Link href="/public">
              <Button>Volver</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <Link className="flex items-center gap-2" href="/public">
          <Button variant="outline">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        {session?.user ? (
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline">Ir a dashboard</Button>
            </Link>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm">
                {session.user.name || session.user.email}
              </span>
              <Badge variant="secondary">
                {session.user.role === "CLIENT" ? "Cliente" : session.user.role}
              </Badge>
            </div>
          </div>
        ) : (
          <Link href="/auth/signin">
            <Button variant="outline">Iniciar sesión</Button>
          </Link>
        )}
      </div>

      {/* Banner */}
      <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6">
        <Image
          src={shop.image || "/window.svg"}
          alt={shop.name}
          fill
          className="object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h1 className="text-3xl font-bold">{shop.name}</h1>
          {shop.description && (
            <p className="text-sm text-white/90 max-w-2xl line-clamp-2">
              {shop.description}
            </p>
          )}
        </div>
      </div>

      {/* Productos */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Productos</h2>
      </div>

      {shop.products.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center text-muted-foreground">
            No hay productos disponibles en esta tienda.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {shop.products.map((product: Product) => (
            <Card key={product.id} className="flex flex-col p-0">
              <div className="relative w-full h-40">
                <Image
                  src={product.image || "/file.svg"}
                  alt={product.name}
                  fill
                  className="object-contain rounded-t-lg"
                />
              </div>
              <div className="flex flex-col pb-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  {product.description && (
                    <CardDescription className="line-clamp-2">
                      {product.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="mt-auto w-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <BuyButton productId={product.id} slug={shop.slug} />
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
