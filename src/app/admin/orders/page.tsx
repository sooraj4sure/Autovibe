// "use client";

// import { useEffect, useState, useCallback } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import { Order } from "@/types";
// import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
// import { ChevronDown, Search, X, Eye, Package } from "lucide-react";
// import toast from "react-hot-toast";

// const ORDER_STATUSES = ["", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
// const PAYMENT_METHODS = ["", "COD", "Prepaid"];

// const TOAST_STYLE = { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)" };

// export default function AdminOrdersPage() {
//   const searchParams = useSearchParams();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
//   const [filters, setFilters] = useState({
//     orderStatus: searchParams.get("status") || "",
//     paymentMethod: "",
//     search: "",
//     page: 1,
//   });
//   const [updatingId, setUpdatingId] = useState<string | null>(null);

//   const fetchOrders = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const params = new URLSearchParams();
//       if (filters.orderStatus) params.set("orderStatus", filters.orderStatus);
//       if (filters.paymentMethod) params.set("paymentMethod", filters.paymentMethod);
//       if (filters.search) params.set("search", filters.search);
//       params.set("page", String(filters.page));

//       const { data } = await axios.get(`/api/orders?${params.toString()}`);
//       if (data.success) {
//         setOrders(data.data);
//         setPagination(data.pagination);
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }, [filters]);

//   useEffect(() => { fetchOrders(); }, [fetchOrders]);

//   const quickUpdateStatus = async (orderId: string, orderStatus: string) => {
//     setUpdatingId(orderId);
//     try {
//       const { data } = await axios.put(`/api/orders/${orderId}`, { orderStatus });
//       if (data.success) {
//         setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, orderStatus: orderStatus as Order["orderStatus"] } : o));
//         toast.success("Status updated", { style: TOAST_STYLE });
//       }
//     } catch {
//       toast.error("Failed to update order");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   return (
//     <div className="p-6 lg:p-8">
//       <div className="mb-8">
//         <div className="flex items-center gap-3 mb-1">
//           <span className="w-6 h-px bg-gold" />
//           <span className="text-gold text-[10px] font-sans tracking-[0.3em] uppercase">Management</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <h1 className="font-display text-3xl text-ivory">Orders</h1>
//           <span className="text-ash text-sm font-body">{pagination.total} total orders</span>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-3 mb-6">
//         <div className="relative flex-1 min-w-[200px] max-w-xs">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash" />
//           <input
//             type="text"
//             placeholder="Order ID, customer name, email..."
//             value={filters.search}
//             onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))}
//             className="input-luxury pl-9 text-sm py-2.5"
//           />
//           {filters.search && (
//             <button onClick={() => setFilters((f) => ({ ...f, search: "", page: 1 }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-ivory">
//               <X className="w-3.5 h-3.5" />
//             </button>
//           )}
//         </div>
//         <div className="relative">
//           <select value={filters.orderStatus} onChange={(e) => setFilters((f) => ({ ...f, orderStatus: e.target.value, page: 1 }))}
//             className="input-luxury text-sm py-2.5 pr-8 appearance-none min-w-[160px]">
//             <option value="">All Statuses</option>
//             {ORDER_STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s}</option>)}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
//         </div>
//         <div className="relative">
//           <select value={filters.paymentMethod} onChange={(e) => setFilters((f) => ({ ...f, paymentMethod: e.target.value, page: 1 }))}
//             className="input-luxury text-sm py-2.5 pr-8 appearance-none min-w-[140px]">
//             {PAYMENT_METHODS.map((m) => <option key={m} value={m}>{m || "All Payments"}</option>)}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-graphite border border-white/5 rounded-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm font-sans">
//             <thead>
//               <tr className="border-b border-white/5">
//                 {["Order ID", "Customer", "Products", "Total", "Payment", "Status", "Date", "Actions"].map((h) => (
//                   <th key={h} className="text-left text-ash text-[10px] tracking-[0.15em] uppercase px-4 py-3 font-normal whitespace-nowrap">{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {isLoading ? (
//                 Array(8).fill(null).map((_, i) => (
//                   <tr key={i} className="border-b border-white/5">
//                     {Array(8).fill(null).map((_, j) => (
//                       <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded w-20" /></td>
//                     ))}
//                   </tr>
//                 ))
//               ) : orders.length === 0 ? (
//                 <tr>
//                   <td colSpan={8} className="text-center text-ash py-16 font-body">No orders found</td>
//                 </tr>
//               ) : (
//                 orders.map((order) => (
//                   <tr key={order._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
//                     {/* Order ID */}
//                     <td className="px-4 py-3">
//                       <Link href={`/admin/orders/${order._id}`} className="text-gold hover:text-gold-light font-mono text-[11px]">
//                         {order.orderId}
//                       </Link>
//                     </td>

//                     {/* Customer */}
//                     <td className="px-4 py-3">
//                       <p className="text-ivory text-xs">{order.shippingAddress.fullName}</p>
//                       <p className="text-ash text-[10px]">{order.shippingAddress.email}</p>
//                       <p className="text-ash text-[10px]">{order.shippingAddress.phone}</p>
//                     </td>

//                     {/* Products with images */}
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-1.5">
//                         {order.items.slice(0, 3).map((item, i) => {
//                           const productObj = typeof item.product === "object" && item.product ? item.product as { images?: {url:string}[] } : null;
//                           const imgUrl = item.image || productObj?.images?.[0]?.url;
//                           return (
//                             <div key={i} className="relative w-8 h-8 rounded-sm overflow-hidden bg-obsidian border border-white/10 flex-shrink-0" title={item.name}>
//                               {imgUrl ? (
//                                 <Image src={imgUrl} alt={item.name} fill className="object-cover" />
//                               ) : (
//                                 <div className="w-full h-full flex items-center justify-center">
//                                   <Package className="w-3 h-3 text-graphite-soft" />
//                                 </div>
//                               )}
//                             </div>
//                           );
//                         })}
//                         <span className="text-ash text-[10px] font-sans ml-1">
//                           {order.items.length === 1
//                             ? "1 item"
//                             : order.items.length > 3
//                               ? `+${order.items.length - 3} more`
//                               : `${order.items.length} items`}
//                         </span>
//                       </div>
//                       {/* First item name */}
//                       <p className="text-smoke text-[10px] font-body mt-1 line-clamp-1 max-w-[160px]">
//                         {order.items[0]?.name}
//                         {order.items.length > 1 ? ` + ${order.items.length - 1} more` : ""}
//                       </p>
//                     </td>

//                     {/* Total */}
//                     <td className="px-4 py-3">
//                       <p className="text-ivory font-sans font-medium text-xs">{formatPrice(order.total)}</p>
//                     </td>

//                     {/* Payment */}
//                     <td className="px-4 py-3">
//                       <span className="text-[10px] font-sans px-2 py-0.5 border border-white/10 text-ash rounded-sm">{order.paymentMethod}</span>
//                     </td>

//                     {/* Status */}
//                     <td className="px-4 py-3">
//                       <span className={`text-[10px] font-sans px-2 py-0.5 border rounded-sm ${getStatusColor(order.orderStatus)}`}>
//                         {order.orderStatus}
//                       </span>
//                     </td>

//                     {/* Date */}
//                     <td className="px-4 py-3 text-ash text-[11px] whitespace-nowrap">{formatDate(order.createdAt)}</td>

//                     {/* Actions */}
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         {/* Quick status update */}
//                         <div className="relative">
//                           <select
//                             value={order.orderStatus}
//                             onChange={(e) => quickUpdateStatus(order._id, e.target.value)}
//                             disabled={updatingId === order._id}
//                             className="bg-obsidian border border-white/10 text-ivory text-[10px] font-sans px-2 py-1.5 pr-5 rounded-sm appearance-none focus:outline-none focus:border-gold/40 disabled:opacity-50 cursor-pointer"
//                           >
//                             {ORDER_STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s}</option>)}
//                           </select>
//                           <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-ash pointer-events-none" />
//                         </div>
//                         {/* View detail */}
//                         <Link
//                           href={`/admin/orders/${order._id}`}
//                           className="w-7 h-7 flex items-center justify-center border border-white/10 rounded-sm text-ash hover:text-gold hover:border-gold/30 transition-all"
//                           title="View full order"
//                         >
//                           <Eye className="w-3.5 h-3.5" />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {pagination.pages > 1 && (
//           <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
//             <p className="text-ash text-[11px] font-sans">Page {pagination.page} of {pagination.pages}</p>
//             <div className="flex gap-2">
//               <button onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))} disabled={pagination.page <= 1}
//                 className="text-ash text-[11px] font-sans px-3 py-1.5 border border-white/10 hover:border-gold/30 hover:text-gold transition-all disabled:opacity-30 rounded-sm">Prev</button>
//               <button onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))} disabled={pagination.page >= pagination.pages}
//                 className="text-ash text-[11px] font-sans px-3 py-1.5 border border-white/10 hover:border-gold/30 hover:text-gold transition-all disabled:opacity-30 rounded-sm">Next</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Order } from "@/types";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";
import { ChevronDown, Search, X, Eye, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const ORDER_STATUSES = ["", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"];
const PAYMENT_METHODS = ["", "COD", "Prepaid"];

const TOAST_STYLE = { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)" };

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [filters, setFilters] = useState({
    orderStatus: searchParams.get("status") || "",
    paymentMethod: "",
    search: "",
    page: 1,
  });
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.orderStatus) params.set("orderStatus", filters.orderStatus);
      if (filters.paymentMethod) params.set("paymentMethod", filters.paymentMethod);
      if (filters.search) params.set("search", filters.search);
      params.set("page", String(filters.page));

      const { data } = await axios.get(`/api/orders?${params.toString()}`);
      if (data.success) {
        setOrders(data.data);
        setPagination(data.pagination);
      }
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const quickUpdateStatus = async (orderId: string, orderStatus: string) => {
    setUpdatingId(orderId);
    try {
      const { data } = await axios.put(`/api/orders/${orderId}`, { orderStatus });
      if (data.success) {
        setOrders((prev) => prev.map((o) => o._id === orderId ? { ...o, orderStatus: orderStatus as Order["orderStatus"] } : o));
        toast.success("Status updated", { style: TOAST_STYLE });
      }
    } catch {
      toast.error("Failed to update order");
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;
    setDeletingId(orderId);
    try {
      const { data } = await axios.delete(`/api/orders/${orderId}`);
      if (data.success) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
        setPagination((p) => ({ ...p, total: p.total - 1 }));
        toast.success("Order deleted", { style: TOAST_STYLE });
      }
    } catch {
      toast.error("Failed to delete order");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-6 h-px bg-gold" />
          <span className="text-gold text-[10px] font-sans tracking-[0.3em] uppercase">Management</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl text-ivory">Orders</h1>
          <span className="text-ash text-sm font-body">{pagination.total} total orders</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash" />
          <input
            type="text"
            placeholder="Order ID, customer name, email..."
            value={filters.search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))}
            className="input-luxury pl-9 text-sm py-2.5"
          />
          {filters.search && (
            <button onClick={() => setFilters((f) => ({ ...f, search: "", page: 1 }))} className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-ivory">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="relative">
          <select value={filters.orderStatus} onChange={(e) => setFilters((f) => ({ ...f, orderStatus: e.target.value, page: 1 }))}
            className="input-luxury text-sm py-2.5 pr-8 appearance-none min-w-[160px]">
            <option value="">All Statuses</option>
            {ORDER_STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
        </div>
        <div className="relative">
          <select value={filters.paymentMethod} onChange={(e) => setFilters((f) => ({ ...f, paymentMethod: e.target.value, page: 1 }))}
            className="input-luxury text-sm py-2.5 pr-8 appearance-none min-w-[140px]">
            {PAYMENT_METHODS.map((m) => <option key={m} value={m}>{m || "All Payments"}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-graphite border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/5">
                {["Order ID", "Customer", "Products", "Total", "Payment", "Status", "Date", "Actions", "Delete"].map((h) => (
                  <th key={h} className="text-left text-ash text-[10px] tracking-[0.15em] uppercase px-4 py-3 font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array(8).fill(null).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {Array(9).fill(null).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded w-20" /></td>
                    ))}
                  </tr>
                ))
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="text-center text-ash py-16 font-body">No orders found</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                    {/* Order ID */}
                    <td className="px-4 py-3">
                      <Link href={`/admin/orders/${order._id}`} className="text-gold hover:text-gold-light font-mono text-[11px]">
                        {order.orderId}
                      </Link>
                    </td>

                    {/* Customer */}
                    <td className="px-4 py-3">
                      <p className="text-ivory text-xs">{order.shippingAddress.fullName}</p>
                      <p className="text-ash text-[10px]">{order.shippingAddress.email}</p>
                      <p className="text-ash text-[10px]">{order.shippingAddress.phone}</p>
                    </td>

                    {/* Products — name + count only */}
                    <td className="px-4 py-3">
                      <p className="text-ivory text-xs line-clamp-1 max-w-[160px]">
                        {order.items[0]?.name}
                      </p>
                      <p className="text-ash text-[10px] mt-0.5">
                        {order.items.length === 1 ? "1 item" : `${order.items.length} items`}
                      </p>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-3">
                      <p className="text-ivory font-sans font-medium text-xs">{formatPrice(order.total)}</p>
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-sans px-2 py-0.5 border border-white/10 text-ash rounded-sm">{order.paymentMethod}</span>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-sans px-2 py-0.5 border rounded-sm ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-ash text-[11px] whitespace-nowrap">{formatDate(order.createdAt)}</td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="relative">
                          <select
                            value={order.orderStatus}
                            onChange={(e) => quickUpdateStatus(order._id, e.target.value)}
                            disabled={updatingId === order._id}
                            className="bg-obsidian border border-white/10 text-ivory text-[10px] font-sans px-2 py-1.5 pr-5 rounded-sm appearance-none focus:outline-none focus:border-gold/40 disabled:opacity-50 cursor-pointer"
                          >
                            {ORDER_STATUSES.filter(Boolean).map((s) => <option key={s} value={s}>{s}</option>)}
                          </select>
                          <ChevronDown className="absolute right-1 top-1/2 -translate-y-1/2 w-2.5 h-2.5 text-ash pointer-events-none" />
                        </div>
                        <Link
                          href={`/admin/orders/${order._id}`}
                          className="w-7 h-7 flex items-center justify-center border border-white/10 rounded-sm text-ash hover:text-gold hover:border-gold/30 transition-all"
                          title="View full order"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </td>

                    {/* Delete */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => deleteOrder(order._id)}
                        disabled={deletingId === order._id}
                        className="w-7 h-7 flex items-center justify-center border border-white/10 rounded-sm text-ash hover:text-red-400 hover:border-red-400/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        title="Delete order"
                      >
                        {deletingId === order._id ? (
                          <span className="w-3 h-3 border border-ash border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <p className="text-ash text-[11px] font-sans">Page {pagination.page} of {pagination.pages}</p>
            <div className="flex gap-2">
              <button onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))} disabled={pagination.page <= 1}
                className="text-ash text-[11px] font-sans px-3 py-1.5 border border-white/10 hover:border-gold/30 hover:text-gold transition-all disabled:opacity-30 rounded-sm">Prev</button>
              <button onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))} disabled={pagination.page >= pagination.pages}
                className="text-ash text-[11px] font-sans px-3 py-1.5 border border-white/10 hover:border-gold/30 hover:text-gold transition-all disabled:opacity-30 rounded-sm">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}