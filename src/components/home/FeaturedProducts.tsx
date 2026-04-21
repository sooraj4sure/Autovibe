
import { Product } from "@/types";
import ProductCard from "@/components/products/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import ProductModel from "@/models/Product";

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    await connectDB();
    const products = await ProductModel.find({ isFeatured: true, isActive: true })
      .sort({ createdAt: -1 })
      .limit(4)
      .lean();
    return JSON.parse(JSON.stringify(products)) as Product[];
  } catch (err) {
    console.error("FeaturedProducts fetch error:", err);
    return [];
  }
}

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (!products.length) return null;

  return (
    <section className="py-24 bg-obsidian-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="w-10 h-px bg-gold" />
              <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">
                Handpicked Selection
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-ivory">
              Featured
              <br />
              <span className="text-gold italic">Pieces</span>
            </h2>
          </div>
          <Link
            href="/store/products?featured=true"
            className="text-ash text-[11px] font-sans tracking-[0.2em] uppercase hover:text-gold transition-colors flex items-center gap-2 group self-start sm:self-auto"
          >
            View All
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
