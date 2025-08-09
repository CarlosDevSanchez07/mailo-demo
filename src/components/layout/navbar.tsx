"use client";

import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function Navbar() {
  const { user, isAuthenticated, logout, hasRole } = useAuth();

  const getRoleColor = (role: string) => {
    switch (role) {
      case "BUSINESS":
        return "bg-red-500";
      case "CLIENT":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case "BUSINESS":
        return "Empresa";
      case "CLIENT":
        return "Cliente";
      default:
        return "Usuario";
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              Mailo Demo
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">{user?.name}</span>
                  <Badge className={getRoleColor(user?.role || "USER")}>
                    {getRoleText(user?.role || "USER")}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      Dashboard
                    </Button>
                  </Link>

                  {hasRole("BUSINESS") && (
                    <Link href="/admin">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                      >
                        Empresa
                      </Button>
                    </Link>
                  )}

                  <Button variant="outline" size="sm" onClick={logout}>
                    Cerrar Sesión
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="outline" size="sm">
                    Iniciar Sesión
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">Registrarse</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
