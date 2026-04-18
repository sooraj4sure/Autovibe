// "use client";

// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import Image from "next/image";
// import Link from "next/link";
// import { motion } from "framer-motion";
// import { ArrowLeft, Package, ChevronDown, ExternalLink } from "lucide-react";
// import axios from "axios";
// import { Order } from "@/types";
// import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
// import toast from "react-hot-toast";

// const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
// const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

// const TOAST_STYLE = { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)", fontFamily: "var(--font-poppins)", fontSize: "12px" };

// export default function AdminOrderDetailPage() {
//   const { id } = useParams<{ id: string }>();
//   const router = useRouter();
//   const [order, setOrder] = useState<Order | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [orderStatus, setOrderStatus] = useState("");
//   const [paymentStatus, setPaymentStatus] = useState("");
//   const [isSaving, setIsSaving] = useState(false);

//   useEffect(() => {
//     if (!id) return;
//     axios
//       .get(`/api/orders/${id}`)
//       .then(({ data }) => {
//         if (data.success) {
//           setOrder(data.data);
//           setOrderStatus(data.data.orderStatus);
//           setPaymentStatus(data.data.paymentStatus);
//         }
//       })
//       .catch(console.error)
//       .finally(() => setIsLoading(false));
//   }, [id]);

//   const handleSave = async () => {
//     if (!order) return;
//     setIsSaving(true);
//     try {
//       const { data } = await axios.put(`/api/orders/${order._id}`, { orderStatus, paymentStatus });
//       if (data.success) {
//         setOrder((prev) => prev ? { ...prev, orderStatus: orderStatus as Order["orderStatus"], paymentStatus: paymentStatus as Order["paymentStatus"] } : prev);
//         toast.success("Order updated successfully", { style: TOAST_STYLE });
//       }
//     } catch {
//       toast.error("Failed to update order", { style: TOAST_STYLE });
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="p-8 space-y-4">
//         <div className="skeleton h-8 w-48 rounded-sm" />
//         <div className="skeleton h-64 rounded-sm" />
//         <div className="skeleton h-48 rounded-sm" />
//       </div>
//     );
//   }

//   if (!order) {
//     return (
//       <div className="p-8 text-center">
//         <p className="text-ash font-body text-lg">Order not found.</p>
//         <Link href="/admin/orders" className="text-gold text-sm font-sans hover:underline mt-2 block">← Back to orders</Link>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 lg:p-8 max-w-5xl">
//       {/* Back */}
//       <button
//         onClick={() => router.push("/admin/orders")}
//         className="flex items-center gap-2 text-ash hover:text-gold transition-colors text-[11px] font-sans tracking-wider uppercase mb-6"
//       >
//         <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders
//       </button>

//       {/* Header */}
//       <div className="mb-8">
//         <div className="flex items-center gap-3 mb-1">
//           <span className="w-6 h-px bg-gold" />
//           <span className="text-gold text-[10px] font-sans tracking-[0.3em] uppercase">Order Detail</span>
//         </div>
//         <div className="flex flex-wrap items-center justify-between gap-4">
//           <div>
//             <h1 className="font-display text-3xl text-ivory">{order.orderId}</h1>
//             <p className="text-ash text-sm font-body mt-1">Placed on {formatDate(order.createdAt)}</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <span className={`text-[11px] font-sans px-3 py-1.5 border rounded-sm ${getStatusColor(order.orderStatus)}`}>
//               {order.orderStatus}
//             </span>
//             <span className={`text-[11px] font-sans px-3 py-1.5 border rounded-sm ${getStatusColor(order.paymentStatus)}`}>
//               {order.paymentStatus}
//             </span>
//             <span className="text-[11px] font-sans px-3 py-1.5 border border-white/10 text-ash rounded-sm">
//               {order.paymentMethod}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
//         {/* LEFT: Items + Customer */}
//         <div className="xl:col-span-2 space-y-6">

//           {/* ── Ordered Items ── */}
//           <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-graphite border border-white/5 rounded-sm overflow-hidden">
//             <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
//               <Package className="w-4 h-4 text-gold" strokeWidth={1.5} />
//               <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase">
//                 Ordered Items ({order.items.length})
//               </h2>
//             </div>

//             <div className="divide-y divide-white/5">
//               {order.items.map((item, i) => {
//                 // Safely handle populated vs unpopulated product
//                 const productObj = typeof item.product === "object" && item.product !== null ? item.product as {
//                   _id?: string; name?: string; slug?: string; sku?: string;
//                   category?: string; images?: { url: string; alt?: string }[];
//                 } : null;

//                 const imageUrl = item.image || productObj?.images?.[0]?.url;
//                 const productSlug = productObj?.slug;
//                 const productSku = productObj?.sku;
//                 const productCategory = productObj?.category;

//                 return (
//                   <div key={i} className="flex gap-4 p-5 hover:bg-white/[0.02] transition-colors">
//                     {/* Product image */}
//                     <div className="relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-obsidian border border-white/5">
//                       {imageUrl ? (
//                         <Image
//                           src={imageUrl}
//                           alt={item.name}
//                           fill
//                           className="object-cover"
//                         />
//                       ) : (
//                         <div className="w-full h-full flex items-center justify-center">
//                           <Package className="w-5 h-5 text-graphite-soft" strokeWidth={1} />
//                         </div>
//                       )}
//                     </div>

//                     {/* Product info */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between gap-3">
//                         <div>
//                           {productSlug ? (
//                             <Link
//                               href={`/store/products/${productSlug}`}
//                               target="_blank"
//                               className="text-ivory text-sm font-body hover:text-gold transition-colors flex items-center gap-1 group"
//                             >
//                               {item.name}
//                               <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
//                             </Link>
//                           ) : (
//                             <p className="text-ivory text-sm font-body">{item.name}</p>
//                           )}
//                           <div className="flex flex-wrap gap-2 mt-1.5">
//                             {productCategory && (
//                               <span className="text-[9px] font-sans px-1.5 py-0.5 border border-white/10 text-ash rounded-sm">{productCategory}</span>
//                             )}
//                             {productSku && (
//                               <span className="text-[9px] font-mono text-graphite-soft">SKU: {productSku}</span>
//                             )}
//                           </div>
//                         </div>
//                         <div className="text-right flex-shrink-0">
//                           <p className="text-gold font-sans font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
//                           <p className="text-ash text-[11px] font-sans mt-0.5">
//                             {formatPrice(item.price)} × {item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Order totals */}
//             <div className="border-t border-white/5 px-5 py-4 bg-obsidian/30">
//               <div className="space-y-1.5 max-w-xs ml-auto">
//                 {[
//                   { label: "Subtotal", value: formatPrice(order.subtotal) },
//                   { label: "GST (18%)", value: formatPrice(order.tax) },
//                   { label: "Shipping", value: order.shipping === 0 ? "Free" : formatPrice(order.shipping), green: order.shipping === 0 },
//                 ].map(({ label, value, green }) => (
//                   <div key={label} className="flex justify-between text-[11px] font-sans">
//                     <span className="text-ash tracking-wider uppercase">{label}</span>
//                     <span className={green ? "text-green-400" : "text-smoke"}>{value}</span>
//                   </div>
//                 ))}
//                 <div className="flex justify-between border-t border-white/5 pt-2">
//                   <span className="text-ivory text-xs font-sans font-medium tracking-wider uppercase">Total</span>
//                   <span className="text-gold font-sans font-bold text-base">{formatPrice(order.total)}</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* ── Customer Info ── */}
//           <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-graphite border border-white/5 rounded-sm p-5">
//             <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4">Customer Information</h2>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm font-body">
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Full Name</p>
//                   <p className="text-ivory">{order.shippingAddress.fullName}</p>
//                 </div>
//                 <div>
//                   <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Email</p>
//                   <p className="text-ivory">{order.shippingAddress.email}</p>
//                 </div>
//                 <div>
//                   <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Phone</p>
//                   <p className="text-ivory">{order.shippingAddress.phone}</p>
//                 </div>
//               </div>
//               <div>
//                 <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Delivery Address</p>
//                 <div className="text-smoke leading-relaxed">
//                   <p>{order.shippingAddress.addressLine1}</p>
//                   {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
//                   <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
//                   <p>PIN: {order.shippingAddress.pincode}</p>
//                   <p>{order.shippingAddress.country}</p>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </div>

//         {/* RIGHT: Status management */}
//         <div className="xl:col-span-1 space-y-5">
//           {/* ── Update Status ── */}
//           <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-graphite border border-white/5 rounded-sm p-5">
//             <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-5">Manage Order</h2>

//             <div className="space-y-4">
//               {/* Order status */}
//               <div>
//                 <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">Order Status</label>
//                 <div className="relative">
//                   <select
//                     value={orderStatus}
//                     onChange={(e) => setOrderStatus(e.target.value)}
//                     className="input-luxury text-sm py-2.5 pr-8 appearance-none w-full"
//                   >
//                     {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
//                 </div>
//               </div>

//               {/* Payment status */}
//               <div>
//                 <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">Payment Status</label>
//                 <div className="relative">
//                   <select
//                     value={paymentStatus}
//                     onChange={(e) => setPaymentStatus(e.target.value)}
//                     className="input-luxury text-sm py-2.5 pr-8 appearance-none w-full"
//                   >
//                     {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
//                   </select>
//                   <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
//                 </div>
//               </div>

//               <button
//                 onClick={handleSave}
//                 disabled={isSaving || (orderStatus === order.orderStatus && paymentStatus === order.paymentStatus)}
//                 className="w-full bg-gold text-obsidian py-3 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-all disabled:opacity-40 disabled:cursor-not-allowed rounded-sm flex items-center justify-center gap-2"
//               >
//                 {isSaving ? (
//                   <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
//                 ) : "Save Changes"}
//               </button>
//             </div>
//           </motion.div>

//           {/* ── Order Summary ── */}
//           <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-graphite border border-white/5 rounded-sm p-5">
//             <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4">Order Summary</h2>
//             <div className="space-y-2.5 text-[11px] font-sans">
//               {[
//                 { label: "Order ID", value: order.orderId, mono: true },
//                 { label: "Items", value: `${order.items.length} item${order.items.length !== 1 ? "s" : ""}` },
//                 { label: "Payment Method", value: order.paymentMethod },
//                 { label: "Order Total", value: formatPrice(order.total), gold: true },
//                 { label: "Date Placed", value: formatDate(order.createdAt) },
//               ].map(({ label, value, mono, gold }) => (
//                 <div key={label} className="flex justify-between items-start gap-3">
//                   <span className="text-ash tracking-wider uppercase flex-shrink-0">{label}</span>
//                   <span className={`text-right ${gold ? "text-gold font-semibold text-sm" : mono ? "text-ivory font-mono text-[10px]" : "text-smoke"}`}>
//                     {value}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           {/* ── Razorpay info if prepaid ── */}
//           {order.paymentMethod === "Prepaid" && (
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="bg-graphite border border-white/5 rounded-sm p-5">
//               <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-3">Payment Reference</h2>
//               <div className="space-y-2 text-[11px] font-sans">
//                 {order.razorpayOrderId && (
//                   <div>
//                     <p className="text-ash tracking-wider uppercase mb-0.5">Razorpay Order ID</p>
//                     <p className="text-smoke font-mono text-[10px] break-all">{order.razorpayOrderId}</p>
//                   </div>
//                 )}
//                 {order.razorpayPaymentId && (
//                   <div>
//                     <p className="text-ash tracking-wider uppercase mb-0.5">Payment ID</p>
//                     <p className="text-smoke font-mono text-[10px] break-all">{order.razorpayPaymentId}</p>
//                   </div>
//                 )}
//               </div>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Package, ChevronDown, ExternalLink, Download } from "lucide-react";
import axios from "axios";
import { Order } from "@/types";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
import { generateInvoicePDF } from "@/lib/generateInvoice";  // ← NEW
import toast from "react-hot-toast";

const ORDER_STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const PAYMENT_STATUSES = ["Pending", "Paid", "Failed", "Refunded"];

const TOAST_STYLE = { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)", fontFamily: "var(--font-poppins)", fontSize: "12px" };

export default function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderStatus, setOrderStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // ← NEW

  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/orders/${id}`)
      .then(({ data }) => {
        if (data.success) {
          setOrder(data.data);
          setOrderStatus(data.data.orderStatus);
          setPaymentStatus(data.data.paymentStatus);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [id]);

  const handleSave = async () => {
    if (!order) return;
    setIsSaving(true);
    try {
      const { data } = await axios.put(`/api/orders/${order._id}`, { orderStatus, paymentStatus });
      if (data.success) {
        setOrder((prev) => prev ? { ...prev, orderStatus: orderStatus as Order["orderStatus"], paymentStatus: paymentStatus as Order["paymentStatus"] } : prev);
        toast.success("Order updated successfully", { style: TOAST_STYLE });
      }
    } catch {
      toast.error("Failed to update order", { style: TOAST_STYLE });
    } finally {
      setIsSaving(false);
    }
  };

  // ── NEW: Download invoice handler ────────────
  const handleDownloadInvoice = async () => {
    if (!order) return;
    setIsDownloading(true);
    try {
      generateInvoicePDF(order);
      toast.success("Invoice downloaded!", { style: TOAST_STYLE });
    } catch {
      toast.error("Failed to generate invoice", { style: TOAST_STYLE });
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <div className="skeleton h-8 w-48 rounded-sm" />
        <div className="skeleton h-64 rounded-sm" />
        <div className="skeleton h-48 rounded-sm" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-8 text-center">
        <p className="text-ash font-body text-lg">Order not found.</p>
        <Link href="/admin/orders" className="text-gold text-sm font-sans hover:underline mt-2 block">← Back to orders</Link>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Back */}
      <button
        onClick={() => router.push("/admin/orders")}
        className="flex items-center gap-2 text-ash hover:text-gold transition-colors text-[11px] font-sans tracking-wider uppercase mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-6 h-px bg-gold" />
          <span className="text-gold text-[10px] font-sans tracking-[0.3em] uppercase">Order Detail</span>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-ivory">{order.orderId}</h1>
            <p className="text-ash text-sm font-body mt-1">Placed on {formatDate(order.createdAt)}</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <span className={`text-[11px] font-sans px-3 py-1.5 border rounded-sm ${getStatusColor(order.orderStatus)}`}>
              {order.orderStatus}
            </span>
            <span className={`text-[11px] font-sans px-3 py-1.5 border rounded-sm ${getStatusColor(order.paymentStatus)}`}>
              {order.paymentStatus}
            </span>
            <span className="text-[11px] font-sans px-3 py-1.5 border border-white/10 text-ash rounded-sm">
              {order.paymentMethod}
            </span>

            {/* ── Download Invoice Button ── */}
            <button
              onClick={handleDownloadInvoice}
              disabled={isDownloading}
              className="flex items-center gap-1.5 text-[11px] font-sans px-3 py-1.5 border border-gold/40 text-gold rounded-sm hover:bg-gold/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed tracking-wider uppercase"
            >
              {isDownloading ? (
                <div className="w-3 h-3 border border-gold/30 border-t-gold rounded-full animate-spin" />
              ) : (
                <Download className="w-3 h-3" />
              )}
              Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: Items + Customer */}
        <div className="xl:col-span-2 space-y-6">

          {/* ── Ordered Items ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-graphite border border-white/5 rounded-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
              <Package className="w-4 h-4 text-gold" strokeWidth={1.5} />
              <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase">
                Ordered Items ({order.items.length})
              </h2>
            </div>

            <div className="divide-y divide-white/5">
              {order.items.map((item, i) => {
                const productObj = typeof item.product === "object" && item.product !== null ? item.product as {
                  _id?: string; name?: string; slug?: string; sku?: string;
                  category?: string; images?: { url: string; alt?: string }[];
                } : null;

                const imageUrl = item.image || productObj?.images?.[0]?.url;
                const productSlug = productObj?.slug;
                const productSku = productObj?.sku;
                const productCategory = productObj?.category;

                return (
                  <div key={i} className="flex gap-4 p-5 hover:bg-white/[0.02] transition-colors">
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-sm overflow-hidden bg-obsidian border border-white/5">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-5 h-5 text-graphite-soft" strokeWidth={1} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {productSlug ? (
                            <Link
                              href={`/store/products/${productSlug}`}
                              target="_blank"
                              className="text-ivory text-sm font-body hover:text-gold transition-colors flex items-center gap-1 group"
                            >
                              {item.name}
                              <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                          ) : (
                            <p className="text-ivory text-sm font-body">{item.name}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-1.5">
                            {productCategory && (
                              <span className="text-[9px] font-sans px-1.5 py-0.5 border border-white/10 text-ash rounded-sm">{productCategory}</span>
                            )}
                            {productSku && (
                              <span className="text-[9px] font-mono text-graphite-soft">SKU: {productSku}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-gold font-sans font-semibold text-sm">{formatPrice(item.price * item.quantity)}</p>
                          <p className="text-ash text-[11px] font-sans mt-0.5">
                            {formatPrice(item.price)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order totals */}
            <div className="border-t border-white/5 px-5 py-4 bg-obsidian/30">
              <div className="space-y-1.5 max-w-xs ml-auto">
                {[
                  { label: "Subtotal", value: formatPrice(order.subtotal) },
                  { label: "GST (18%)", value: formatPrice(order.tax) },
                  { label: "Shipping", value: order.shipping === 0 ? "Free" : formatPrice(order.shipping), green: order.shipping === 0 },
                ].map(({ label, value, green }) => (
                  <div key={label} className="flex justify-between text-[11px] font-sans">
                    <span className="text-ash tracking-wider uppercase">{label}</span>
                    <span className={green ? "text-green-400" : "text-smoke"}>{value}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-white/5 pt-2">
                  <span className="text-ivory text-xs font-sans font-medium tracking-wider uppercase">Total</span>
                  <span className="text-gold font-sans font-bold text-base">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Customer Info ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-graphite border border-white/5 rounded-sm p-5">
            <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm font-body">
              <div className="space-y-3">
                <div>
                  <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Full Name</p>
                  <p className="text-ivory">{order.shippingAddress.fullName}</p>
                </div>
                <div>
                  <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Email</p>
                  <p className="text-ivory">{order.shippingAddress.email}</p>
                </div>
                <div>
                  <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Phone</p>
                  <p className="text-ivory">{order.shippingAddress.phone}</p>
                </div>
              </div>
              <div>
                <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Delivery Address</p>
                <div className="text-smoke leading-relaxed">
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                  <p>PIN: {order.shippingAddress.pincode}</p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Status management */}
        <div className="xl:col-span-1 space-y-5">
          {/* ── Update Status ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-graphite border border-white/5 rounded-sm p-5">
            <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-5">Manage Order</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">Order Status</label>
                <div className="relative">
                  <select
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
                    className="input-luxury text-sm py-2.5 pr-8 appearance-none w-full"
                  >
                    {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">Payment Status</label>
                <div className="relative">
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="input-luxury text-sm py-2.5 pr-8 appearance-none w-full"
                  >
                    {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={isSaving || (orderStatus === order.orderStatus && paymentStatus === order.paymentStatus)}
                className="w-full bg-gold text-obsidian py-3 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold-light transition-all disabled:opacity-40 disabled:cursor-not-allowed rounded-sm flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <div className="w-4 h-4 border-2 border-obsidian/30 border-t-obsidian rounded-full animate-spin" />
                ) : "Save Changes"}
              </button>

              {/* ── Download Invoice — secondary CTA ── */}
              <button
                onClick={handleDownloadInvoice}
                disabled={isDownloading}
                className="w-full border border-gold/30 text-gold py-3 text-[11px] font-sans font-semibold tracking-[0.2em] uppercase hover:bg-gold/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed rounded-sm flex items-center justify-center gap-2"
              >
                {isDownloading ? (
                  <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    Download Invoice
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* ── Order Summary ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-graphite border border-white/5 rounded-sm p-5">
            <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4">Order Summary</h2>
            <div className="space-y-2.5 text-[11px] font-sans">
              {[
                { label: "Order ID", value: order.orderId, mono: true },
                { label: "Items", value: `${order.items.length} item${order.items.length !== 1 ? "s" : ""}` },
                { label: "Payment Method", value: order.paymentMethod },
                { label: "Order Total", value: formatPrice(order.total), gold: true },
                { label: "Date Placed", value: formatDate(order.createdAt) },
              ].map(({ label, value, mono, gold }) => (
                <div key={label} className="flex justify-between items-start gap-3">
                  <span className="text-ash tracking-wider uppercase flex-shrink-0">{label}</span>
                  <span className={`text-right ${gold ? "text-gold font-semibold text-sm" : mono ? "text-ivory font-mono text-[10px]" : "text-smoke"}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Razorpay info if prepaid ── */}
          {order.paymentMethod === "Prepaid" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }} className="bg-graphite border border-white/5 rounded-sm p-5">
              <h2 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-3">Payment Reference</h2>
              <div className="space-y-2 text-[11px] font-sans">
                {order.razorpayOrderId && (
                  <div>
                    <p className="text-ash tracking-wider uppercase mb-0.5">Razorpay Order ID</p>
                    <p className="text-smoke font-mono text-[10px] break-all">{order.razorpayOrderId}</p>
                  </div>
                )}
                {order.razorpayPaymentId && (
                  <div>
                    <p className="text-ash tracking-wider uppercase mb-0.5">Payment ID</p>
                    <p className="text-smoke font-mono text-[10px] break-all">{order.razorpayPaymentId}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
