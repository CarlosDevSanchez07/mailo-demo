import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido a Mailo Demo
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Una aplicación de demostración con autenticación completa usando
            NextAuth.js, roles de usuario y vistas protegidas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>🔐 Autenticación Segura</CardTitle>
              <CardDescription>
                Sistema de autenticación con múltiples proveedores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Inicio de sesión con credenciales</li>
                <li>• Autenticación con GitHub OAuth</li>
                <li>• Registro de usuarios con roles</li>
                <li>• Contraseñas encriptadas</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>👥 Sistema de Roles</CardTitle>
              <CardDescription>
                Control de acceso basado en roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• cliente (acceso básico)</li>
                <li>• Empresas (control total de su empresa)</li>
                <li>• Jerarquía de permisos</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🛡️ Vistas Protegidas</CardTitle>
              <CardDescription>Páginas públicas y privadas</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Páginas públicas (acceso libre)</li>
                <li>• Dashboard protegido</li>
                <li>• Panel de administración</li>
                <li>• Redirección automática</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              ¿Listo para empezar?
            </h3>
            <p className="text-gray-600">
              Crea una cuenta o inicia sesión para acceder a todas las funciones
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/auth/signup">
                <Button size="lg">Crear Cuenta</Button>
              </Link>
              <Link href="/auth/signin">
                <Button variant="outline" size="lg">
                  Iniciar Sesión
                </Button>
              </Link>
              <Link href="/public">
                <Button variant="outline" size="lg">
                  Ver Tiendas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p>© 2025 Mailo Demo. Desarrollado con Next.js y NextAuth.js</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
