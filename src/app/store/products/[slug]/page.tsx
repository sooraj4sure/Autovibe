// import { notFound } from "next/navigation";
// import type { Metadata } from "next";
// import { Product } from "@/types";
// import ProductDetailClient from "@/components/products/ProductDetailClient";

// async function getProduct(slug: string): Promise<Product | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${slug}`,
//       { next: { revalidate: 600 } }
//     );
//     const data = await res.json();
//     return data.success ? data.data : null;
//   } catch {
//     return null;
//   }
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const product = await getProduct(params.slug);
//   if (!product) return { title: "Product Not Found" };
//   return {
//     title: product.name,
//     description: product.shortDescription,
//     openGraph: {
//       title: product.name,
//       description: product.shortDescription,
//       images: product.images[0] ? [{ url: product.images[0].url }] : [],
//     },
//   };
// }

// export default async function ProductDetailPage({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const product = await getProduct(params.slug);
//   if (!product) notFound();
//   return <ProductDetailClient product={product} />;
// }




import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Product } from "@/types";
import ProductDetailClient from "@/components/products/ProductDetailClient";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";

async function getProduct(slug: string): Promise<Product | null> {
  try {
    await connectDB();
    // Try by slug first, then by _id
    let product = await ProductModel.findOne({ slug, isActive: true }).lean();
    if (!product) {
      product = await ProductModel.findOne({
        _id: slug.match(/^[a-f\d]{24}$/i) ? slug : null,
        isActive: true,
      }).lean();
    }
    if (!product) return null;
    return JSON.parse(JSON.stringify(product)) as Product;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetailClient product={product} />;
}
