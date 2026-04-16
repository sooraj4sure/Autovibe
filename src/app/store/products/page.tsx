import type { Metadata } from "next";
import ProductsClient from "@/components/products/ProductsClient";

export const metadata: Metadata = {
  title: "Collection",
  description: "Browse LuxeAuto's full range of premium car accessories.",
};

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  return <ProductsClient initialFilters={searchParams} />;
}
