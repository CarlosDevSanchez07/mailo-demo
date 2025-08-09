import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getRoleColor = (role: string) => {
  switch (role) {
    case "BUSINESS":
      return "bg-red-500";
    case "CLIENT":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

export const getRoleText = (role: string) => {
  switch (role) {
    case "BUSINESS":
      return "Empresa";
    case "CLIENT":
      return "Cliente";
    default:
      return "Usuario";
  }
};

export const generateSlug = (text: string) => {
  const slug = text.replaceAll(" ", "-");
  const cleanText = slug.replace(/[^a-zA-Z0-9-]/g, ""); // remove all special characters except -
  return cleanText.toLowerCase();
};
