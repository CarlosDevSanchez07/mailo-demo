# Mailo Demo - Sistema de Autenticación con NextAuth.js

Una aplicación de demostración que implementa un sistema completo de autenticación usando NextAuth.js con múltiples proveedores, roles de usuario y vistas protegidas.

## 🚀 Características

- **Autenticación múltiple**: Credenciales locales y GitHub OAuth
- **Sistema de roles**: Usuario, Moderador y Administrador
- **Vistas protegidas**: Control de acceso basado en roles
- **Base de datos**: Postgres con Prisma ORM
- **UI moderna**: Componentes de shadcn/ui
- **TypeScript**: Tipado completo

## 📋 Prerrequisitos

- Node.js 18+
- npm o yarn
- Cuenta de GitHub (opcional, para OAuth)

## 🛠️ Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/CarlosDevSanchez07/mailo-demo
   cd mailo-demo
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno**

   ```bash
   cp env.example .env.local
   ```

4. **Editar `.env.local`**

   ```env
   # Database
   DATABASE_URL="file:./dev.db"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="tu-secret-super-seguro-aqui"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"

   # GitHub OAuth (opcional)
   GITHUB_ID="tu-github-client-id"
   GITHUB_SECRET="tu-github-client-secret"
   ```

5. **Configurar base de datos**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

6. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

## 🔧 Configuración de GitHub OAuth (Opcional)

1. Ve a [GitHub Developer Settings](https://github.com/settings/developers)
2. Crea una nueva OAuth App
3. Configura:
   - **Application name**: Mailo Demo
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Copia el Client ID y Client Secret a tu `.env.local`

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── api/auth/
│   │   ├── [...nextauth]/route.ts    # NextAuth API
│   │   └── register/route.ts         # Registro de usuarios
│   ├── auth/
│   │   ├── signin/page.tsx           # Página de inicio de sesión
│   │   └── signup/page.tsx           # Página de registro
│   ├── dashboard/page.tsx            # Dashboard protegido
│   ├── admin/page.tsx                # Panel de administración
│   └── page.tsx                      # Página principal
├── components/
│   ├── auth/
│   │   └── protected-route.tsx       # Componente de protección
│   ├── providers/
│   │   └── auth-provider.tsx         # Provider de NextAuth
│   └── ui/                           # Componentes de UI
├── hooks/
│   └── use-auth.ts                   # Hook de autenticación
├── lib/
│   ├── auth.ts                       # Configuración de NextAuth
│   └── prisma.ts                     # Cliente de Prisma
└── types/
    └── next-auth.d.ts                # Tipos de NextAuth
```

## 🔐 Sistema de Roles

### Cliente (CLIENT)

- Acceso básico al dashboard
- Ver información personal
- Navegar por páginas públicas
- Funciones de cliente

### Empresa (BUSINESS)

- Todas las funciones de Cliente
- Panel de gestión de empresa
- Funciones administrativas
- Gestión de contenido empresarial

## 🛡️ Vistas Protegidas

- **Públicas**: `/` (página principal)
- **Protegidas**:
  - `/dashboard` (requiere autenticación)
  - `/admin` (requiere rol BUSINESS)

## 🧪 Uso

1. **Registro**: Ve a `/auth/signup` para crear una cuenta
2. **Inicio de sesión**: Ve a `/auth/signin` o usa GitHub OAuth
3. **Dashboard**: Accede a `/dashboard` después de autenticarte
4. **Empresa**: Ve a `/admin` si tienes rol de empresa

## 🔧 Comandos Útiles

```bash
# Generar cliente de Prisma
npx prisma generate

# Aplicar cambios a la base de datos
npx prisma db push

# Ver la base de datos
npx prisma studio

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📝 Notas

- Las contraseñas se encriptan con bcryptjs
- La sesión se maneja con JWT
- SQLite se usa para desarrollo (cambia a PostgreSQL para producción)
- Todos los componentes están tipados con TypeScript

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
