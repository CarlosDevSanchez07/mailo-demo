"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Header } from "@/components/layout/header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ImageUpload } from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Store, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Shop {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  _count: {
    products: number;
  };
}

export default function ShopsPage() {
  return (
    <ProtectedRoute requiredRole="BUSINESS">
      <ShopsContent />
    </ProtectedRoute>
  );
}

function ShopsContent() {
  const { user } = useAuth();
  const [shops, setShops] = useState<Shop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    try {
      const response = await fetch("/api/shops");
      if (response.ok) {
        const data = await response.json();
        setShops(data);
      }
    } catch (error) {
      console.error("Error fetching shops:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditShop = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (!editingShop) {
        const response = await fetch("/api/shops", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          await fetchShops();
          setIsOpen(false);
          setFormData({ name: "", description: "", image: "" });
        }
        return;
      }

      const response = await fetch(`/api/shops/${editingShop.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchShops();
        setIsOpen(false);
        setEditingShop(null);
        setFormData({ name: "", description: "", image: "" });
      }
    } catch (error) {
      console.error("Error updating shop:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShop = async (shopId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta tienda?")) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/shops/${shopId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchShops();
      }
    } catch (error) {
      console.error("Error deleting shop:", error);
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (shop: Shop) => {
    setEditingShop(shop);
    setFormData({
      name: shop.name,
      description: shop.description || "",
      image: shop.image || "",
    });
    setIsOpen(true);
  };

  const columns: ColumnDef<Shop>[] = [
    {
      accessorKey: "image",
      header: "Imagen",
      cell: ({ row }) => {
        const shop = row.original;
        return shop.image ? (
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src={shop.image}
              alt={shop.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Store className="h-6 w-6 text-gray-400" />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Nombre",
    },
    {
      accessorKey: "description",
      header: "Descripción",
      cell: ({ row }) => {
        const description = row.getValue("description") as string;
        return description ? (
          <span className="max-w-xs truncate">{description}</span>
        ) : (
          <span className="text-gray-500">Sin descripción</span>
        );
      },
    },
    {
      accessorKey: "_count.products",
      header: "Productos",
      cell: ({ row }) => {
        const count = row.original._count.products;
        return (
          <Badge variant="secondary">
            {count} producto{count !== 1 ? "s" : ""}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Fecha de creación",
      cell: ({ row }) => {
        const date = new Date(row.getValue("createdAt"));
        return date.toLocaleDateString("es-ES");
      },
    },
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        const shop = row.original;
        return (
          <div className="flex items-center space-x-2">
            <Link href={`/admin/shops/${shop.slug}`}>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => openEditDialog(shop)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDeleteShop(shop.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Header title="Mis Tiendas" user={user} />
      <div className="px-4 py-6">
        <div className="flex items-center justify-between">
          <CardDescription>Gestiona tus tiendas y productos</CardDescription>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4" />
            Nueva Tienda
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={shops}
          searchKey="name"
          searchPlaceholder="Buscar tiendas..."
        />

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingShop?.id ? "Editar" : "Crear"} Tienda
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEditShop} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-name">Nombre</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="edit-description">Descripción</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                type="shop"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
