// ─── Product Types ────────────────────────────────────────────────────────────

export interface ProductImage {
  url: string;
  publicId: string;
  alt?: string;
}

export type ProductCategory =
  | "Interior"
  | "Exterior"
  | "Tech Accessories"
  | "Performance"
  | "Lighting"
  | "Wheels & Tyres"
  | "Audio"
  | "Protection";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  comparePrice?: number;
  category: ProductCategory;
  images: ProductImage[];
  stock: number;
  sku: string;
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

// ─── Order Types ──────────────────────────────────────────────────────────────

export type PaymentMethod = "COD" | "Prepaid";
export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface PopulatedProduct {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  category?: string;
  images: { url: string; alt?: string }[];
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface OrderItem {
  product: string | PopulatedProduct;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Wishlist Types ───────────────────────────────────────────────────────────

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

// ─── API Response Types ───────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// ─── Admin Types ──────────────────────────────────────────────────────────────

export interface AdminUser {
  email: string;
  name: string;
  role: "admin";
}

export interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  totalProducts: number;
  recentOrders: Order[];
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export interface ProductFilters {
  category?: ProductCategory | "";
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "featured";
  page?: number;
  limit?: number;
}
