"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Package, ChevronDown, ChevronUp, ArrowRight, ShoppingBag } from "lucide-react";
import axios from "axios";
import { useUserAuth } from "@/context/UserAuthContext";
import { Order } from "@/types";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
import Button from "@/components/ui/Button";

const STATUS_STEPS = ["Pending", "Processing", "Shipped", "Delivered"];

function StatusTimeline({ status }: { status: string }) {
  const currentStep = STATUS_STEPS.indexOf(status);
  const isCancelled = status === "Cancelled";

  return (
    <div className="flex items-center gap-0 mt-4">
      {STATUS_STEPS.map((step, i) => {
        const isCompleted = !isCancelled && i <= currentStep;
        const isActive = !isCancelled && i === currentStep;
        return (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                isCancelled ? "border-red-400/30 bg-transparent"
                : isCompleted ? "border-gold bg-gold" : "border-white/20 bg-transparent"
              }`}>
                {isCompleted && !isCancelled && (
                  <div className={`rounded-full ${isActive ? "w-2 h-2 bg-obsidian" : "w-1.5 h-1.5 bg-obsidian"}`} />
                )}
              </div>
              <span className={`text-[9px] font-sans tracking-wider uppercase whitespace-nowrap ${
                isCancelled ? "text-red-400/50"
                : isCompleted ? "text-gold" : "text-graphite-soft"
              }`}>
                {step}
              </span>
            </div>
            {i < STATUS_STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-1 mb-4 ${
                isCancelled ? "bg-red-400/20"
                : i < currentStep ? "bg-gold/60" : "bg-white/10"
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      layout
      className="bg-graphite border border-white/5 rounded-sm overflow-hidden hover:border-gold/15 transition-colors duration-300"
    >
      {/* Order header */}
      <div
        className="flex flex-wrap items-start justify-between gap-4 p-5 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-gold/10 border border-gold/20 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5">
            <Package className="w-4 h-4 text-gold" strokeWidth={1.5} />
          </div>
          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-gold font-mono text-[11px] tracking-wider">{order.orderId}</span>
              <span className={`text-[10px] font-sans px-2 py-0.5 border rounded-sm ${getStatusColor(order.orderStatus)}`}>
                {order.orderStatus}
              </span>
              <span className="text-ash text-[10px] font-sans px-2 py-0.5 border border-white/10 rounded-sm">
                {order.paymentMethod}
              </span>
            </div>
            <p className="text-ash text-[11px] font-sans mt-1">{formatDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-gold font-sans font-semibold text-sm">{formatPrice(order.total)}</p>
            <p className="text-ash text-[11px] font-sans">{order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="text-ash hover:text-ivory transition-colors">
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5 px-5 py-5 space-y-5">
              {/* Status timeline */}
              {order.orderStatus !== "Cancelled" && (
                <div>
                  <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-1">Order Progress</p>
                  <StatusTimeline status={order.orderStatus} />
                </div>
              )}
              {order.orderStatus === "Cancelled" && (
                <div className="flex items-center gap-2 p-3 bg-red-500/5 border border-red-500/20 rounded-sm">
                  <span className="text-red-400 text-xs font-sans">This order has been cancelled.</span>
                </div>
              )}

              {/* Items */}
              <div>
                <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-3">Items Ordered</p>
                <div className="space-y-3">
                  {order.items.map((item, i) => {
                    // item.product may be populated object or just an ID string
                    const productData = typeof item.product === "object" ? item.product : null;
                    const imageUrl = item.image || (productData as { images?: { url: string }[] })?.images?.[0]?.url;
                    const slug = (productData as { slug?: string })?.slug;

                    return (
                      <div key={i} className="flex items-center gap-4 bg-obsidian/40 rounded-sm p-3">
                        {/* Product image */}
                        <div className="relative w-14 h-14 rounded-sm overflow-hidden bg-graphite-light flex-shrink-0">
                          {imageUrl ? (
                            <Image src={imageUrl} alt={item.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Package className="w-5 h-5 text-graphite-soft" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          {slug ? (
                            <Link href={`/store/products/${slug}`} className="text-ivory text-sm font-body hover:text-gold transition-colors line-clamp-1">
                              {item.name}
                            </Link>
                          ) : (
                            <p className="text-ivory text-sm font-body line-clamp-1">{item.name}</p>
                          )}
                          <p className="text-ash text-[11px] font-sans mt-0.5">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>

                        <p className="text-gold font-sans font-medium text-sm flex-shrink-0">
                          {formatPrice(item.price * item.quantity)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Totals + Shipping side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-white/5 pt-5">
                {/* Shipping address */}
                <div>
                  <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">Delivery Address</p>
                  <div className="text-smoke font-body text-sm leading-relaxed">
                    <p className="text-ivory font-sans font-medium text-xs">{order.shippingAddress.fullName}</p>
                    <p>{order.shippingAddress.addressLine1}</p>
                    {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} – {order.shippingAddress.pincode}</p>
                    <p className="text-ash text-[11px] font-sans mt-1">{order.shippingAddress.phone}</p>
                  </div>
                </div>

                {/* Price breakdown */}
                <div>
                  <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">Price Breakdown</p>
                  <div className="space-y-1.5">
                    {[
                      { label: "Subtotal", value: formatPrice(order.subtotal) },
                      { label: "GST (18%)", value: formatPrice(order.tax) },
                      { label: "Shipping", value: order.shipping === 0 ? "Free" : formatPrice(order.shipping), green: order.shipping === 0 },
                    ].map(({ label, value, green }) => (
                      <div key={label} className="flex justify-between text-[11px] font-sans">
                        <span className="text-ash tracking-wider">{label}</span>
                        <span className={green ? "text-green-400" : "text-smoke"}>{value}</span>
                      </div>
                    ))}
                    <div className="flex justify-between border-t border-white/5 pt-2 font-sans">
                      <span className="text-ivory text-xs font-medium tracking-wider">Total Paid</span>
                      <span className="text-gold font-semibold text-sm">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function MyOrdersPage() {
  const { user, isLoading: authLoading } = useUserAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/store");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;
    axios
      .get("/api/user/orders")
      .then(({ data }) => { if (data.success) setOrders(data.data); })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [user]);

  if (authLoading || (!user && isLoading)) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Order History</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-display text-4xl text-ivory">
              My <span className="text-gold italic">Orders</span>
            </h1>
            {orders.length > 0 && (
              <span className="text-ash text-sm font-body">{orders.length} order{orders.length !== 1 ? "s" : ""} total</span>
            )}
          </div>
        </div>

        {/* States */}
        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(null).map((_, i) => (
              <div key={i} className="skeleton h-24 rounded-sm" />
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-9 h-9 text-graphite-soft" strokeWidth={1} />
            </div>
            <h2 className="font-display text-2xl text-ivory">No orders yet</h2>
            <p className="text-ash font-body text-center max-w-sm">
              Once you place an order, you&apos;ll be able to track it right here.
            </p>
            <Link href="/store/products">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, i) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
              >
                <OrderCard order={order} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
