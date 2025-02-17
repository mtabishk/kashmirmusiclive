import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertToSlug(category: String) {
  return category
    .toLowerCase()
    .replace(/\s+&\s+/g, "-and-")
    .replace(/\s+/g, "-");
}

export function getRandomFileName() {
  const currentDate = new Date();
  const timestamp = currentDate.getTime();
  return timestamp.toString();
}
