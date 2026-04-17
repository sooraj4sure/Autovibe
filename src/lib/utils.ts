import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes without conflicts
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Format price to Indian Rupees
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generate URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Generate a unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LA-${timestamp}-${random}`;
}

/**
 * Calculate cart totals
 */
export function calculateCartTotals(
  subtotal: number,
  freeShippingThreshold = 399
): {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
} {
  const tax = Math.round(subtotal - subtotal / 1.18); // Extract GST already included in price
  const shipping = subtotal >= freeShippingThreshold ? 0 : 99;
  const total = subtotal + shipping; // No extra tax added

  return { subtotal, tax, shipping, total };
}

/**
 * Truncate text to a given length
 */
export function truncate(text: string, length = 100): string {
  if (text.length <= length) return text;
  return text.substring(0, length).trim() + "…";
}

/**
 * Format date to readable string
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get status color for order status badges
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    Pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    Processing: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Shipped: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    Delivered: "text-green-400 bg-green-400/10 border-green-400/20",
    Cancelled: "text-red-400 bg-red-400/10 border-red-400/20",
    Paid: "text-green-400 bg-green-400/10 border-green-400/20",
    Failed: "text-red-400 bg-red-400/10 border-red-400/20",
    Refunded: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  };
  return colors[status] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
}
