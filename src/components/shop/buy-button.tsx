"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useState } from "react";

type BuyButtonProps = {
  productId: string;
  disabled?: boolean;
  slug?: string;
};

export function BuyButton({ productId, disabled, slug }: BuyButtonProps) {
  const { isAuthenticated, role } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuy = async () => {
    try {
      setIsLoading(true);
      if (!isAuthenticated) {
        toast.error("Debes iniciar sesión como cliente para comprar");
        await signIn(undefined, { callbackUrl: "/public" });
        return;
      }
      if (role !== "CLIENT") {
        toast.error("Esta acción requiere rol de Cliente");
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL!}/api/public/shops/${slug}/buy`,
        {
          method: "POST",
          body: JSON.stringify({ productId }),
        }
      );
      if (!res.ok) {
        toast.error("Error al comprar");
        return;
      }
      toast.success("Compra realizada correctamente");
    } catch (error) {
      toast.error("Error al comprar");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleBuy}
      disabled={disabled || isLoading}
      className="w-full"
    >
      {isLoading ? "Comprando..." : "Comprar"}
    </Button>
  );
}
