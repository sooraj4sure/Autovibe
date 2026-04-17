"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, ZoomIn, Check, Truck, RotateCcw, Shield } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks/useStore";
import { useAppSelector } from "@/hooks/useStore";
import { addToCart, openCart } from "@/lib/store/cartSlice";
import { toggleWishlist } from "@/lib/store/wishlistSlice";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const isWishlisted = wishlistItems.some((i) => i._id === product._id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [zoomed, setZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [added, setAdded] = useState(false);

  const discount = product.comparePrice
    ? Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)
    : null;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    dispatch(addToCart({ product, quantity }));
    dispatch(openCart());
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    toast.success(`${product.name} added to cart`, {
      style: { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)", fontFamily: "var(--font-poppins)", fontSize: "12px" },
    });
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast(isWishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: isWishlisted ? "💔" : "❤️",
      style: { background: "#1E1E1E", color: "#E8E0D0", border: "1px solid rgba(201,161,74,0.15)", fontFamily: "var(--font-poppins)", fontSize: "12px" },
    });
  };

  return (
    <div className="min-h-screen bg-obsidian pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-[11px] font-sans text-ash tracking-wider uppercase">
          <Link href="/store" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/store/products" className="hover:text-gold transition-colors">Collection</Link>
          <span>/</span>
          <Link href={`/store/products?category=${encodeURIComponent(product.category)}`} className="hover:text-gold transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-ivory">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main image */}
            <div
              className={cn(
                "relative aspect-square bg-graphite rounded-sm overflow-hidden border border-white/5 cursor-zoom-in mb-4",
                zoomed && "cursor-zoom-out"
              )}
              onClick={() => setZoomed(!zoomed)}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomed(false)}
            >
              <Image
                src={product.images[selectedImage]?.url || "/placeholder-product.jpg"}
                alt={product.images[selectedImage]?.alt || product.name}
                fill
                className={cn(
                  "object-cover transition-transform duration-200",
                  zoomed && "scale-150"
                )}
                style={zoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />

              {/* Zoom hint */}
              {!zoomed && (
                <div className="absolute bottom-4 right-4 bg-obsidian/60 backdrop-blur-sm border border-white/10 rounded-sm px-2.5 py-1.5 flex items-center gap-1.5">
                  <ZoomIn className="w-3 h-3 text-gold" />
                  <span className="text-[9px] font-sans text-ash tracking-wider uppercase">Click to zoom</span>
                </div>
              )}

              {/* Badges */}
              {discount && (
                <div className="absolute top-4 left-4 badge-gold">-{discount}%</div>
              )}
              {product.stock === 0 && (
                <div className="absolute inset-0 bg-obsidian/60 flex items-center justify-center">
                  <span className="text-ivory font-display text-2xl">Sold Out</span>
                </div>
              )}

              {/* Navigation arrows for multi-image */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length); }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-obsidian/70 border border-white/10 rounded-sm flex items-center justify-center hover:border-gold/40 hover:bg-obsidian/90 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4 text-ivory" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev + 1) % product.images.length); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-obsidian/70 border border-white/10 rounded-sm flex items-center justify-center hover:border-gold/40 hover:bg-obsidian/90 transition-all"
                  >
                    <ChevronRight className="w-4 h-4 text-ivory" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-200",
                      selectedImage === i ? "border-gold" : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <Image src={img.url} alt={img.alt || `Image ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col"
          >
            <p className="text-gold text-[10px] font-sans tracking-[0.3em] uppercase mb-3">
              {product.category}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl text-ivory mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-ash text-[11px] font-sans tracking-wider uppercase mb-6">
              SKU: {product.sku}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
              <span className="font-display text-3xl text-gold">{formatPrice(product.price)}</span>
              {product.comparePrice && (
                <>
                  <span className="text-ash line-through text-lg font-body">
                    {formatPrice(product.comparePrice)}
                  </span>
                  <span className="badge-gold">Save {discount}%</span>
                </>
              )}
            </div>

            {/* Short description */}
            <p className="text-smoke font-body text-base leading-relaxed mb-8">
              {product.shortDescription}
            </p>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-6">
              <div className={cn("w-2 h-2 rounded-full", product.stock > 0 ? "bg-green-400" : "bg-red-400")} />
              <span className={cn("text-[11px] font-sans tracking-wider uppercase", product.stock > 0 ? "text-green-400" : "text-red-400")}>
                {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
              </span>
            </div>

            {/* Quantity + Add to cart */}
            {product.stock > 0 && (
              <div className="flex items-center gap-3 mb-4">
                {/* Quantity */}
                <div className="flex items-center border border-white/10 rounded-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center text-ash hover:text-ivory hover:bg-white/5 transition-colors"
                  >
                    −
                  </button>
                  <span className="w-10 text-center text-ivory font-sans font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-12 flex items-center justify-center text-ash hover:text-ivory hover:bg-white/5 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <Button
                  variant="gold"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  leftIcon={added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                >
                  {added ? "Added!" : "Add to Cart"}
                </Button>

                {/* Wishlist */}
                <button
                  onClick={handleWishlist}
                  className={cn(
                    "w-12 h-12 border rounded-sm flex items-center justify-center transition-all duration-200",
                    isWishlisted
                      ? "border-gold/40 bg-gold/10 text-gold"
                      : "border-white/10 text-ash hover:border-gold/30 hover:text-gold"
                  )}
                >
                  <Heart className={cn("w-4.5 h-4.5", isWishlisted && "fill-gold")} />
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-white/5">
              {[
                { Icon: Truck, label: "Free Delivery", sub: "Orders above ₹399" },
                { Icon: RotateCcw, label: "Easy Returns", sub: "within 24 hours of delivery" },
                { Icon: Shield, label: "Authentic", sub: "100% genuine products" },
              ].map(({ Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center text-center gap-1.5 p-3 bg-graphite rounded-sm border border-white/5">
                  <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
                  <p className="text-ivory text-[11px] font-sans font-medium">{label}</p>
                  <p className="text-ash text-[9px] font-sans tracking-wider">{sub}</p>
                </div>
              ))}
            </div>

            {/* Specifications */}
            {product.specifications && Object.keys(product.specifications).length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/5">
                <h3 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4">
                  Specifications
                </h3>
                <div className="space-y-2">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex gap-3 text-sm">
                      <span className="text-ash font-sans min-w-[120px]">{key}</span>
                      <span className="text-smoke font-body">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Full description */}
        <div className="mt-16 pt-10 border-t border-white/5">
          <h2 className="font-display text-2xl text-ivory mb-6">Product Description</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-smoke font-body text-base leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
