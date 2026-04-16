// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { motion } from "framer-motion";
// import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
// import axios from "axios";
// import { Order } from "@/types";
// import { formatPrice, formatDate } from "@/lib/utils";
// import Button from "@/components/ui/Button";
// import { useUserAuth } from "@/context/UserAuthContext";

// export default function OrderSuccessPage() {
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("orderId");
//   const [order, setOrder] = useState<Order | null>(null);
//   const { user } = useUserAuth();

//   useEffect(() => {
//     if (orderId) {
//       axios.get(`/api/orders/${orderId}`).then(({ data }) => {
//         if (data.success) setOrder(data.data);
//       });
//     }
//   }, [orderId]);

//   return (
//     <div className="min-h-screen bg-obsidian flex items-center justify-center pt-24 pb-20 px-4">
//       <div className="w-full max-w-2xl">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="text-center mb-10"
//         >
//           {/* Animated check */}
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", damping: 12, delay: 0.2 }}
//             className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold/30 bg-gold/5 mb-6"
//           >
//             <CheckCircle className="w-10 h-10 text-gold" strokeWidth={1.5} />
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <div className="flex items-center justify-center gap-4 mb-3">
//               <span className="w-8 h-px bg-gold" />
//               <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">
//                 Order Confirmed
//               </span>
//               <span className="w-8 h-px bg-gold" />
//             </div>
//             <h1 className="font-display text-4xl sm:text-5xl text-ivory mb-4">
//               Thank You for Your Order
//             </h1>
//             <p className="text-ash font-body text-lg">
//               Your luxury accessories are being prepared with the utmost care.
//             </p>
//             {orderId && (
//               <p className="text-gold font-sans font-medium tracking-wider mt-2">
//                 Order ID: {orderId}
//               </p>
//             )}
//           </motion.div>
//         </motion.div>

//         {/* Order details */}
//         {order && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.55 }}
//             className="bg-graphite border border-white/5 rounded-sm p-6 mb-8"
//           >
//             <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/5">
//               <Package className="w-4 h-4 text-gold" strokeWidth={1.5} />
//               <h2 className="text-ivory font-sans font-medium text-sm tracking-[0.15em] uppercase">
//                 Order Summary
//               </h2>
//             </div>

//             {/* Items */}
//             <div className="space-y-3 mb-5">
//               {order.items.map((item, i) => (
//                 <div key={i} className="flex justify-between text-sm">
//                   <div>
//                     <p className="text-ivory font-body">{item.name}</p>
//                     <p className="text-ash text-[11px] font-sans">Qty: {item.quantity}</p>
//                   </div>
//                   <p className="text-smoke font-sans">{formatPrice(item.price * item.quantity)}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Totals */}
//             <div className="space-y-2 border-t border-white/5 pt-4">
//               {[
//                 { label: "Subtotal", value: formatPrice(order.subtotal) },
//                 { label: "GST", value: formatPrice(order.tax) },
//                 { label: "Shipping", value: order.shipping === 0 ? "Free" : formatPrice(order.shipping), green: order.shipping === 0 },
//               ].map(({ label, value, green }) => (
//                 <div key={label} className="flex justify-between text-[11px] font-sans">
//                   <span className="text-ash tracking-wider uppercase">{label}</span>
//                   <span className={green ? "text-green-400" : "text-smoke"}>{value}</span>
//                 </div>
//               ))}
//               <div className="flex justify-between border-t border-white/5 pt-2 font-sans">
//                 <span className="text-ivory font-medium text-[11px] tracking-wider uppercase">Total</span>
//                 <span className="text-gold font-bold">{formatPrice(order.total)}</span>
//               </div>
//             </div>

//             {/* Shipping & Payment info */}
//             <div className="grid grid-cols-2 gap-4 mt-5 pt-5 border-t border-white/5">
//               <div>
//                 <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-2">Shipping To</p>
//                 <p className="text-ivory text-sm font-body leading-relaxed">
//                   {order.shippingAddress.fullName}<br />
//                   {order.shippingAddress.city}, {order.shippingAddress.state}<br />
//                   {order.shippingAddress.pincode}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-2">Payment</p>
//                 <p className="text-ivory text-sm font-sans">
//                   {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
//                 </p>
//                 <p className="text-ash text-[10px] font-sans mt-1">
//                   Placed on {formatDate(order.createdAt)}
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* CTAs */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.7 }}
//           className="flex flex-col sm:flex-row items-center justify-center gap-3"
//         >
//           <Link href="/store">
//             <Button variant="outline" size="lg" leftIcon={<Home className="w-4 h-4" />}>
//               Back to Home
//             </Button>
//           </Link>
//           {user && (
//             <Link href="/store/account/orders">
//               <Button variant="gold" size="lg" rightIcon={<Package className="w-4 h-4" />}>
//                 Track My Orders
//               </Button>
//             </Link>
//           )}
//           <Link href="/store/products">
//             <Button variant={user ? "outline" : "gold"} size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
//               Continue Shopping
//             </Button>
//           </Link>
//         </motion.div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Package, ArrowRight, Home } from "lucide-react";
import axios from "axios";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { useUserAuth } from "@/context/UserAuthContext";

// 👇 Inner component (your original logic)
function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [order, setOrder] = useState<Order | null>(null);
  const { user } = useUserAuth();

  useEffect(() => {
    if (orderId) {
      axios.get(`/api/orders/${orderId}`).then(({ data }) => {
        if (data.success) setOrder(data.data);
      });
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center pt-24 pb-20 px-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-gold/30 bg-gold/5 mb-6"
          >
            <CheckCircle className="w-10 h-10 text-gold" strokeWidth={1.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-4xl text-white mb-4">
              Thank You for Your Order
            </h1>

            {orderId && (
              <p className="text-gold mt-2">
                Order ID: {orderId}
              </p>
            )}
          </motion.div>
        </motion.div>

        {order && (
          <div className="bg-gray-900 p-6 mb-8 rounded">
            <h2 className="text-white mb-4">Order Summary</h2>

            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm text-white">
                <span>{item.name} x {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}

            <div className="mt-4 border-t pt-2 text-white">
              Total: {formatPrice(order.total)}
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <Link href="/store">
            <Button>Home</Button>
          </Link>

          {user && (
            <Link href="/store/account/orders">
              <Button>My Orders</Button>
            </Link>
          )}

          <Link href="/store/products">
            <Button>Shop More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// 👇 Wrapper with Suspense (fixes build)
export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
