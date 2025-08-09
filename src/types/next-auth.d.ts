import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: "CLIENT" | "BUSINESS";
    };
  }

  interface User {
    role: "CLIENT" | "BUSINESS";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: "CLIENT" | "BUSINESS";
  }
}
