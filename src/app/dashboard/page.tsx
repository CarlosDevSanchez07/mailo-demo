"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { getRoleColor, getRoleText } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, hasRole } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <Header title="Dashboard" user={user} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* User Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>Información del Usuario</CardTitle>
                <CardDescription>Detalles de tu cuenta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Nombre</p>
                  <p className="text-lg">{user?.name || "No especificado"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Rol</p>
                  <Badge className={getRoleColor(user?.role || "CLIENT")}>
                    {getRoleText(user?.role || "CLIENT")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>Navegación rápida</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 flex flex-col">
                {hasRole("BUSINESS") ? (
                  <>
                    <Link href="/admin/sales">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Ver Ventas
                      </Button>
                    </Link>

                    <Link href="/admin/shops">
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        Ver tiendas
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href="/purchases">
                    <Button variant="outline" className="w-full justify-start">
                      Ver compras
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            {/* Role Permissions */}
            <Card>
              <CardHeader>
                <CardTitle>Permisos</CardTitle>
                <CardDescription>
                  Funciones disponibles según tu rol
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Acceso básico</span>
                  <Badge variant="secondary">✓ Disponible</Badge>
                </div>
                {hasRole("BUSINESS") && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Gestión de Tiendas</span>
                    <Badge variant="secondary">✓ Disponible</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Public Content Link */}
          {!hasRole("BUSINESS") && (
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contenido Público</CardTitle>
                  <CardDescription>
                    Accede a las páginas públicas de la aplicación
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/public">
                    <Button variant="outline">Ir a Página Principal</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
