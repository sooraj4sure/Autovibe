"use client";

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import {
  closeCart,
  removeFromCart,
  updateQuantity,
} from "@/lib/store/cartSlice";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { tree } from "next/dist/build/templates/app-page";

export default function CartDrawer() {
  const dispatch = useAppDispatch();
  const { items, subtotal, tax, shipping, total, isOpen } = useAppSelector(
    (s) => s.cart,
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-obsidian/70 backdrop-blur-sm"
            onClick={() => dispatch(closeCart())}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-graphite border-l border-white/5 flex flex-col shadow-glass"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4 text-gold" strokeWidth={1.5} />
                <h2 className="text-ivory font-display text-lg">Your Cart</h2>
                {items.length > 0 && (
                  <span className="text-ash text-[10px] font-sans tracking-wider">
                    ({items.reduce((s, i) => s + i.quantity, 0)} items)
                  </span>
                )}
              </div>
              <button
                onClick={() => dispatch(closeCart())}
                className="text-ash hover:text-ivory transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-thin scrollbar-thumb-graphite-soft scrollbar-track-transparent">
              <AnimatePresence mode="popLayout">
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center h-64 gap-4"
                  >
                    <ShoppingBag
                      className="w-12 h-12 text-graphite-soft"
                      strokeWidth={1}
                    />
                    <p className="text-ash font-body text-lg">
                      Your cart is empty
                    </p>

                    {/* <p className="text-graphite-soft text-[11px] font-sans tracking-wider uppercase">
                      Discover our collection
                    </p> */}
                    <p className="text-green-500 text-[11px] font-sans tracking-wider uppercase">
                      View Orders In My Orders.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(closeCart())}
                      rightIcon={<ArrowRight className="w-3 h-3" />}
                    >
                      <Link href="/store/products">Browse Products</Link>
                    </Button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.product._id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 bg-obsidian/50 border border-white/5 rounded-sm p-3"
                    >
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-obsidian">
                        <Image
                          src={
                            item.product.images[0]?.url ||
                            "/placeholder-product.jpg"
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/store/products/${item.product.slug}`}
                          onClick={() => dispatch(closeCart())}
                          className="text-ivory text-sm font-body hover:text-gold transition-colors line-clamp-2 leading-tight"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-gold text-xs font-sans mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          {/* Quantity controls */}
                          <div className="flex items-center gap-2 border border-white/10 rounded-sm">
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    productId: item.product._id,
                                    quantity: item.quantity - 1,
                                  }),
                                )
                              }
                              className="w-6 h-6 flex items-center justify-center text-ash hover:text-ivory hover:bg-white/5 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-ivory text-xs font-sans w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                dispatch(
                                  updateQuantity({
                                    productId: item.product._id,
                                    quantity: item.quantity + 1,
                                  }),
                                )
                              }
                              disabled={item.quantity >= item.product.stock}
                              className="w-6 h-6 flex items-center justify-center text-ash hover:text-ivory hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              dispatch(removeFromCart(item.product._id))
                            }
                            className="text-ash hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer totals & CTA */}
            {items.length > 0 && (
              <div className="border-t border-white/5 px-6 py-5 space-y-3">
                <div className="space-y-1.5">
                  {[
                    { label: "Subtotal", value: subtotal },
                    { label: "GST (18% incl.)", value: tax, isGst: true },
                    {
                      label: "Shipping",
                      value: shipping,
                      isFree: shipping === 0,
                    },
                  ].map(({ label, value, isFree, isGst }) => (
                    <div
                      key={label}
                      className="flex justify-between text-xs font-sans"
                    >
                      <span className="text-ash tracking-wider uppercase">
                        {label}
                      </span>
                      <span
                        className={
                          isFree
                            ? "text-green-400"
                            : isGst
                              ? "text-ash"
                              : "text-smoke"
                        }
                      >
                        {isFree
                          ? "Free"
                          : isGst
                            ? `${formatPrice(value)} incl.`
                            : formatPrice(value)}
                      </span>
                    </div>
                  ))}

                  <div className="flex justify-between border-t border-white/5 pt-2 mt-2">
                    <span className="text-ivory text-xs font-sans tracking-[0.15em] uppercase font-medium">
                      Total
                    </span>
                    <span className="text-gold font-sans font-semibold text-sm">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <Link
                    href="/store/checkout"
                    onClick={() => dispatch(closeCart())}
                  >
                    <Button
                      variant="gold"
                      size="md"
                      className="w-full"
                      rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <Link
                    href="/store/cart"
                    onClick={() => dispatch(closeCart())}
                  >
                    <Button variant="ghost" size="sm" className="w-full">
                      View Full Cart
                    </Button>
                  </Link>
                </div>

                <p className="text-graphite-soft text-[9px] font-sans tracking-widest uppercase text-center">
                  Free shipping on orders above ₹500
                </p>
              </div>
            )}
          </motion.aside>
        </Fragment>
      )}
    </AnimatePresence>
  );
}
