"use client";

import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type SaleRow = {
  id: string;
  createdAt: string;
  productName: string;
  productImage?: string;
  price: number;
  shopName: string;
  buyerName: string;
  buyerEmail: string;
};

const columns: ColumnDef<SaleRow>[] = [
  {
    accessorKey: "productImage",
    header: "Imagen",
    cell: ({ row }) => {
      const img = row.getValue("productImage") as string | undefined;
      return img ? (
        <div className="relative h-12 w-12 rounded overflow-hidden">
          <Image src={img} alt="Producto" fill className="object-cover" />
        </div>
      ) : (
        <div className="h-12 w-12 bg-gray-100 rounded" />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "productName", header: "Producto" },
  { accessorKey: "shopName", header: "Tienda" },
  {
    accessorKey: "price",
    header: "Precio",
    cell: ({ row }) => `$${(row.getValue("price") as number).toFixed(2)}`,
  },
  { accessorKey: "buyerName", header: "Cliente" },
  { accessorKey: "buyerEmail", header: "Email" },
  {
    accessorKey: "createdAt",
    header: "Fecha",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt") as string).toLocaleString("es-ES"),
  },
];

export function SalesTable({ rows }: { rows: SaleRow[] }) {
  return (
    <DataTable
      columns={columns}
      data={rows}
      searchKey="productName"
      searchPlaceholder="Buscar por producto..."
    />
  );
}
