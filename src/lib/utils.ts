import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export function formatAadhar(aadhar: string | number): string {
  if (!aadhar) return "";

  const digits = aadhar.toString().replace(/\D/g, "");

  const limited = digits.slice(0, 12);

  return limited.replace(/(\d{4})(?=\d)/g, "$1 ");
}
