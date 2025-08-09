/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "./prisma";

export async function handleGitHubUser(user: any) {
  try {
    if (!user.email) {
      throw new Error("GitHub user email is required");
    }

    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      console.log("GitHub user already exists:", existingUser.email);
      // Actualizar información del usuario si es necesario
      if (existingUser.name !== user.name) {
        await prisma.user.update({
          where: { email: user.email },
          data: { name: user.name || user.email.split("@")[0] },
        });
        console.log("Updated GitHub user name:", user.email);
      }
      return existingUser;
    }

    // Crear nuevo usuario con rol por defecto
    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name || user.email.split("@")[0],
        role: "CLIENT", // Rol por defecto para usuarios de GitHub
      },
    });

    console.log("Created new GitHub user:", newUser.email);
    return newUser;
  } catch (error) {
    console.error("Error handling GitHub user:", error);
    throw error;
  }
}
