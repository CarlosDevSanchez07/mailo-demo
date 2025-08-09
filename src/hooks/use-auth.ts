"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const login = async (
    provider: "github" | "credentials",
    credentials?: { email: string; password: string }
  ) => {
    if (provider === "credentials" && credentials) {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      });
      return result;
    } else {
      // Para GitHub, usar callbackUrl para redirigir al dashboard
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    }
  };

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";
  const user = session?.user;
  const role = user?.role as "CLIENT" | "BUSINESS";

  const hasRole = (requiredRole: "CLIENT" | "BUSINESS") => {
    if (!user) return false;

    const roleHierarchy = {
      CLIENT: 1,
      BUSINESS: 2,
    };

    return roleHierarchy[role] >= roleHierarchy[requiredRole];
  };

  return {
    session,
    user,
    role,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasRole,
  };
}
