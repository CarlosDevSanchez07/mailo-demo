import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";

type Shop = {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  _count: { products: number };
};

async function getPublicShops() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/shops`,
    {
      // habilitar caché en producción si quieres
      next: { revalidate: 30 },
    }
  );
  if (!res.ok) return [] as Shop[];
  return res.json();
}

export default async function PublicHomePage() {
  const session = await getServerSession(authOptions);
  const shops: Shop[] = await getPublicShops();
  const featured = shops.slice(0, 5);
  const others = shops;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tiendas destacadas</h1>
          <p className="text-muted-foreground">
            Descubre las mejores tiendas y sus productos
          </p>
        </div>
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
          <Link href="/auth/signin?callbackUrl=/public">
            <Button variant="outline">Iniciar sesión</Button>
          </Link>
        )}
      </div>

      {/* Carrusel de tiendas destacadas */}
      <Carousel className="w-full mb-10">
        <CarouselContent>
          {featured.map((shop: Shop) => (
            <CarouselItem key={shop.id} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/public/shops/${shop.slug}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <div className="relative w-full h-48">
                    <Image
                      src={shop.image || "/window.svg"}
                      alt={shop.name}
                      fill
                      className="object-contain rounded-t-lg"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{shop.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {shop.description || "Sin descripción"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {shop._count.products} producto
                      {shop._count.products !== 1 ? "s" : ""}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Listado horizontal de más tiendas */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Más tiendas</h2>
        <div className="grid grid-cols-1 gap-6">
          {others.map((shop: Shop) => (
            <Link key={shop.id} href={`/public/shops/${shop.slug}`}>
              <Card className="hover:shadow-md transition-shadow">
                <div className="flex gap-4 px-3">
                  <div className="relative h-32 w-32">
                    <Image
                      src={shop.image || "/window.svg"}
                      alt={shop.name}
                      fill
                      className="object-contain rounded-t-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <CardTitle className="text-2xl">{shop.name}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {shop.description || "Sin descripción"}
                    </CardDescription>
                    <p className="text-sm text-muted-foreground">
                      {shop._count.products} producto
                      {shop._count.products !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
