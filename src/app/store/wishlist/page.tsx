"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { useAppSelector } from "@/hooks/useStore";
import ProductCard from "@/components/products/ProductCard";
import Button from "@/components/ui/Button";

export default function WishlistPage() {
  const items = useAppSelector((s) => s.wishlist.items);

  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Saved Items</span>
          </div>
          <div className="flex items-center justify-between">
            <h1 className="font-display text-4xl text-ivory">
              My <span className="text-gold italic">Wishlist</span>
            </h1>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-gold fill-gold" />
              <span className="text-ash text-sm font-body">{items.length} items</span>
            </div>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center">
              <Heart className="w-9 h-9 text-graphite-soft" strokeWidth={1} />
            </div>
            <h2 className="font-display text-2xl text-ivory">Your wishlist is empty</h2>
            <p className="text-ash font-body text-center max-w-sm">
              Save your favourite pieces to revisit them later.
            </p>
            <Link href="/store/products">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Collection
              </Button>
            </Link>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((product, i) => (
                <motion.div
                  key={product._id}
                  layout
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
