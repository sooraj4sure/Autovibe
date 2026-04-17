// import { notFound } from "next/navigation";
// import { Product } from "@/types";
// import ProductForm from "@/components/admin/ProductForm";

// async function getProduct(id: string): Promise<Product | null> {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/products/${id}`,
//       { cache: "no-store" }
//     );
//     const data = await res.json();
//     return data.success ? data.data : null;
//   } catch {
//     return null;
//   }
// }

// export default async function EditProductPage({ params }: { params: { id: string } }) {
//   const product = await getProduct(params.id);
//   if (!product) notFound();
//   return <ProductForm product={product} isEdit />;
// }
import { notFound } from "next/navigation";
import { Product } from "@/types";
import ProductForm from "@/components/admin/ProductForm";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";

async function getProduct(id: string): Promise<Product | null> {
  try {
    await connectDB();
    const product = await ProductModel.findById(id).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product)) as Product;
  } catch {
    return null;
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  if (!product) notFound();
  return <ProductForm product={product} isEdit />;
}
