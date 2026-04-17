"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { removeFromCart, updateQuantity, clearCart } from "@/lib/store/cartSlice";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, subtotal, tax, shipping, total } = useAppSelector((s) => s.cart);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center gap-6 pt-24">
        <ShoppingBag className="w-16 h-16 text-graphite-soft" strokeWidth={1} />
        <h1 className="font-display text-3xl text-ivory">Your cart is empty</h1>
        <p className="text-ash font-body">Explore our curated collection of luxury accessories</p>
        <Link href="/store/products">
          <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="w-8 h-px bg-gold" />
              <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Your Selection</span>
            </div>
            <h1 className="font-display text-4xl text-ivory">Shopping Cart</h1>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="text-ash text-[11px] font-sans tracking-wider uppercase hover:text-red-400 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.product._id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-5 bg-graphite border border-white/5 rounded-sm p-5 hover:border-gold/15 transition-colors"
                >
                  <Link href={`/store/products/${item.product.slug}`} className="relative w-24 h-24 flex-shrink-0 rounded-sm overflow-hidden bg-obsidian">
                    <Image
                      src={item.product.images[0]?.url || "/placeholder-product.jpg"}
                      alt={item.product.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-ash text-[9px] font-sans tracking-[0.2em] uppercase mb-1">
                          {item.product.category}
                        </p>
                        <Link href={`/store/products/${item.product.slug}`}>
                          <h3 className="text-ivory font-body text-base hover:text-gold transition-colors line-clamp-2 leading-snug">
                            {item.product.name}
                          </h3>
                        </Link>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.product._id))}
                        className="text-ash hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-white/10 rounded-sm">
                        <button
                          onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity - 1 }))}
                          className="w-8 h-8 flex items-center justify-center text-ash hover:text-ivory hover:bg-white/5 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-ivory text-sm font-sans">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(updateQuantity({ productId: item.product._id, quantity: item.quantity + 1 }))}
                          disabled={item.quantity >= item.product.stock}
                          className="w-8 h-8 flex items-center justify-center text-ash hover:text-ivory hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-gold font-sans font-semibold">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-ash text-[10px] font-sans">
                            {formatPrice(item.product.price)} each
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-graphite border border-white/5 rounded-sm p-6 sticky top-28">
              <h2 className="font-display text-xl text-ivory mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                {[
                  { label: "Subtotal", value: formatPrice(subtotal) },
                  // { label: "GST (18%)", value: formatPrice(tax) },
                  { label: "GST (18% incl.)", value: `${formatPrice(tax)} included`, green: false },
                  { label: "Shipping", value: shipping === 0 ? "Free" : formatPrice(shipping), green: shipping === 0 },
                ].map(({ label, value, green }) => (
                  <div key={label} className="flex justify-between text-sm font-sans">
                    <span className="text-ash tracking-wider uppercase text-[11px]">{label}</span>
                    <span className={green ? "text-green-400" : "text-smoke"}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-white/5 pt-3 mt-1">
                  <span className="text-ivory font-sans font-medium tracking-wider uppercase text-[11px]">Total</span>
                  <span className="text-gold font-sans font-bold text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <Link href="/store/checkout">
                <Button variant="gold" size="lg" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Proceed to Checkout
                </Button>
              </Link>

              <p className="text-graphite-soft text-[9px] font-sans tracking-widest uppercase text-center mt-4">
                Secure checkout · All payments encrypted
              </p>

              {shipping > 0 && (
                <p className="text-center text-[10px] font-sans text-ash mt-3">
                  Add <span className="text-gold">{formatPrice(500 - subtotal)}</span> more for free shipping
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
