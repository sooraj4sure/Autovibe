"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { addToCart, openCart } from "@/lib/store/cartSlice";
import { toggleWishlist } from "@/lib/store/wishlistSlice";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlistItems.some((i) => i._id === product._id);
  const [imageLoaded, setImageLoaded] = useState(false);

  const primaryImage = product.images[0]?.url || "/placeholder-product.jpg";
  const secondaryImage = product.images[1]?.url;
  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock === 0) return;
    dispatch(addToCart({ product }));
    dispatch(openCart());
    toast.success("Added to cart", {
      style: {
        background: "#1E1E1E",
        color: "#C9A14A",
        border: "1px solid rgba(201,161,74,0.2)",
        fontFamily: "var(--font-poppins)",
        fontSize: "12px",
        letterSpacing: "0.05em",
      },
      iconTheme: { primary: "#C9A14A", secondary: "#1E1E1E" },
    });
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: isWishlisted ? "💔" : "❤️",
      style: {
        background: "#1E1E1E",
        color: "#E8E0D0",
        border: "1px solid rgba(201,161,74,0.15)",
        fontFamily: "var(--font-poppins)",
        fontSize: "12px",
      },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link href={`/store/products/${product.slug}`} className="group block">
        <div className="bg-graphite border border-white/5 rounded-sm overflow-hidden hover:border-gold/20 transition-all duration-500 hover:shadow-card-hover">
          {/* Image container */}
          <div className="relative aspect-square overflow-hidden bg-obsidian-50">
            {/* Primary image */}
            <Image
              src={primaryImage}
              alt={product.name}
              fill
              className={cn(
                "object-cover transition-all duration-700 group-hover:scale-105",
                secondaryImage ? "group-hover:opacity-0" : "",
                !imageLoaded && "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Secondary image on hover */}
            {secondaryImage && (
              <Image
                src={secondaryImage}
                alt={product.name}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}

            {/* Skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-graphite-light animate-pulse" />
            )}

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {discount && (
                <span className="bg-gold text-obsidian text-[9px] font-sans font-bold px-2 py-1 tracking-widest uppercase">
                  -{discount}%
                </span>
              )}
              {product.stock === 0 && (
                <span className="bg-graphite-soft/90 backdrop-blur-sm text-smoke text-[9px] font-sans px-2 py-1 tracking-widest uppercase border border-white/10">
                  Sold Out
                </span>
              )}
              {product.isFeatured && (
                <span className="bg-gold/10 text-gold text-[9px] font-sans px-2 py-1 tracking-widest uppercase border border-gold/20">
                  Featured
                </span>
              )}
            </div>

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 translate-x-10 group-hover:translate-x-0 transition-transform duration-300">
              <button
                onClick={handleWishlist}
                className="w-8 h-8 bg-obsidian/80 backdrop-blur-sm border border-white/10 rounded-sm flex items-center justify-center hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  className={cn("w-3.5 h-3.5 transition-colors", isWishlisted ? "fill-gold text-gold" : "text-smoke")}
                />
              </button>
              <Link
                href={`/store/products/${product.slug}`}
                className="w-8 h-8 bg-obsidian/80 backdrop-blur-sm border border-white/10 rounded-sm flex items-center justify-center hover:border-gold/40 hover:bg-gold/10 transition-all duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <Eye className="w-3.5 h-3.5 text-smoke" />
              </Link>
            </div>

            {/* Add to cart overlay */}
            <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full bg-obsidian/90 backdrop-blur-sm border-t border-gold/20 text-gold text-[10px] font-sans tracking-[0.2em] uppercase py-3 flex items-center justify-center gap-2 hover:bg-gold hover:text-obsidian transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Product info */}
          <div className="p-4">
            <p className="text-ash text-[9px] font-sans tracking-[0.2em] uppercase mb-1">
              {product.category}
            </p>
            <h3 className="text-ivory font-body text-base leading-tight mb-2 group-hover:text-gold transition-colors duration-200 line-clamp-2">
              {product.name}
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-gold font-sans font-semibold text-sm">
                {formatPrice(product.price)}
              </span>
              {product.comparePrice && (
                <span className="text-ash font-sans text-xs line-through">
                  {formatPrice(product.comparePrice)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
