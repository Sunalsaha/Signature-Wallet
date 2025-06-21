import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS class names.
 * - Removes duplicates
 * - Resolves conflicting Tailwind classes
 * 
 * @param inputs - Class values (can be strings, conditionals, arrays, etc.)
 * @returns A single string of valid class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs));
}
