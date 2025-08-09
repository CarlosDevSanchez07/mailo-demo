"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { useEffect, useState } from "react";
import { PurchasesTable, type PurchaseRow } from "./purchases-table";
import { useAuth } from "@/hooks/use-auth";

export type Purchase = {
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
};

export default function PurchasesPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<PurchaseRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/purchases", { cache: "no-store" });
        if (!res.ok) {
          setRows([]);
          return;
        }
        const data = await res.json();
        const mapped: PurchaseRow[] = (data || []).map((p: Purchase) => ({
          id: p.id,
          createdAt: p.createdAt,
          productName: p.product?.name ?? "Producto",
          productImage: p.product?.image ?? undefined,
          price: p.product?.price ?? 0,
          shopName: p.product?.shop?.name ?? "Tienda",
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
    <ProtectedRoute requiredRole="CLIENT">
      <Header title="Mis compras" user={user} />
      <div className="px-4 py-8">
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
              Cargando...
            </div>
          ) : (
            <PurchasesTable rows={rows} />
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
