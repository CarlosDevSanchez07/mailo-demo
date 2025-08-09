# 🔗 Integración de GitHub OAuth - Mailo Demo

## 📋 Configuración Completa de GitHub OAuth

### 1. Crear OAuth App en GitHub

1. **Ve a GitHub Developer Settings**

   - URL: https://github.com/settings/developers
   - Inicia sesión en tu cuenta de GitHub

2. **Crea una nueva OAuth App**
   - Haz clic en "New OAuth App"
   - Completa el formulario con los siguientes datos:

#### Configuración de la OAuth App:

**Application name:** `Mailo Demo` (o el nombre que prefieras)

**Homepage URL:** `http://localhost:3000`

**Application description:** `Aplicación de demostración con autenticación NextAuth.js`

**Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`

### 2. Obtener Credenciales

Después de crear la app, GitHub te proporcionará:

- **Client ID**: Una cadena de caracteres (ej: `abc123def456`)
- **Client Secret**: Una cadena más larga (ej: `xyz789abc123def456ghi789`)

### 3. Configurar Variables de Entorno

Crea o actualiza tu archivo `.env.local` con las credenciales:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="xzv/yDBq6GRI3G+WMtkW96gZwUlH287/cqVzjW2drT0="

# GitHub OAuth
GITHUB_ID="tu-client-id-de-github"
GITHUB_SECRET="tu-client-secret-de-github"
```

### 4. Rutas de API

NextAuth maneja automáticamente todas las rutas de autenticación a través de:

- **`/api/auth/[...nextauth]`**: Ruta principal que maneja todos los providers
- **`/api/auth/callback/github`**: Callback automático para GitHub OAuth
- **`/api/auth/signin/github`**: Signin automático para GitHub OAuth

### 5. Funcionalidades Implementadas

#### ✅ Autenticación Automática

- Los usuarios pueden iniciar sesión con GitHub
- Se crea automáticamente un usuario en la base de datos
- Se asigna el rol "CLIENT" por defecto

#### ✅ Manejo de Usuarios

- Verificación de usuarios existentes
- Creación automática de nuevos usuarios
- Asignación de roles por defecto

#### ✅ Integración con el Sistema

- Compatible con el sistema de roles existente
- Funciona junto con la autenticación por credenciales
- Sesiones JWT unificadas

### 6. Probar la Integración

1. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

2. **Ve a la página de registro o login:**

   - http://localhost:3000/auth/signup
   - http://localhost:3000/auth/signin

3. **Haz clic en el botón "GitHub"**

   - Serás redirigido a GitHub
   - Autoriza la aplicación
   - Volverás automáticamente a tu app

4. **Verifica que funcionó:**
   - Deberías estar autenticado
   - Tu información de GitHub aparecerá en el dashboard
   - Tendrás el rol "CLIENT" por defecto

### 7. Configuración para Producción

Si planeas desplegar la aplicación, necesitarás:

1. **Crear otra OAuth App para producción**

   - Usa tu dominio real
   - Homepage URL: `https://tu-dominio.com`
   - Callback URL: `https://tu-dominio.com/api/auth/callback/github`

2. **Actualizar las variables de entorno:**
   ```env
   NEXTAUTH_URL="https://tu-dominio.com"
   GITHUB_ID="tu-client-id-de-produccion"
   GITHUB_SECRET="tu-client-secret-de-produccion"
   ```

### 8. Solución de Problemas

#### Error: "Invalid callback URL"

- Verifica que la URL de callback en GitHub coincida exactamente
- Asegúrate de que no haya espacios extra
- Confirma que estés usando el puerto correcto (3000)

#### Error: "Client ID not found"

- Verifica que el GITHUB_ID esté correctamente configurado
- Asegúrate de que no haya espacios o caracteres extra

#### Error: "Invalid client secret"

- Verifica que el GITHUB_SECRET esté correctamente configurado
- Copia y pega exactamente como aparece en GitHub

#### Usuario no se crea automáticamente

- Verifica que la base de datos esté configurada
- Ejecuta `npx prisma db push` si es necesario
- Revisa los logs del servidor para errores

### 9. Archivos Modificados/Creados

```
src/
├── lib/
│   ├── auth.ts                    # Configuración de NextAuth actualizada
│   └── github-auth.ts             # Helper para usuarios de GitHub
├── app/api/auth/
│   └── [...nextauth]/route.ts     # Ruta principal de NextAuth (maneja todos los providers)
└── types/
    └── next-auth.d.ts             # Tipos actualizados
```

### 10. Seguridad

- Las credenciales de GitHub se almacenan en variables de entorno
- Los usuarios de GitHub reciben el rol "CLIENT" por defecto
- Se puede cambiar el rol manualmente en la base de datos
- Las sesiones se manejan de forma segura con JWT

¡Tu integración de GitHub OAuth está lista! 🎉
