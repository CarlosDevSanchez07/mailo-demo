"use client";

import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/hooks/use-auth";
import { SalesTable, type SaleRow } from "./sales-table";

export type Sale = {
  id: string;
  createdAt: string;
  product: {
    name: string;
    image: string;
    price: number;
    shop: {
      name: string;
    };
  };
  user: {
    name: string;
    email: string;
  };
};

export default function SalesPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<SaleRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/sales", { cache: "no-store" });
        if (!res.ok) {
          setRows([]);
          return;
        }
        const data = await res.json();
        const mapped: SaleRow[] = (data || []).map((s: Sale) => ({
          id: s.id,
          createdAt: s.createdAt,
          productName: s.product?.name ?? "Producto",
          productImage: s.product?.image ?? undefined,
          price: s.product?.price ?? 0,
          shopName: s.product?.shop?.name ?? "Tienda",
          buyerName: s.user?.name ?? s.user?.email ?? "Cliente",
          buyerEmail: s.user?.email ?? "",
        }));
        setRows(mapped);
      } catch (e) {
        console.error(e);
        setRows([]);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  return (
    <ProtectedRoute requiredRole="BUSINESS">
      <Header title="Ventas" user={user} />
      <div className="px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
            Cargando...
          </div>
        ) : (
          <SalesTable rows={rows} />
        )}
      </div>
    </ProtectedRoute>
  );
}
