"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart, Package, TrendingUp, Clock, ArrowUpRight, Users,
} from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { Order } from "@/types";
import { formatPrice, formatDate, getStatusColor } from "@/lib/utils";

interface Stats {
  totalOrders: number;
  pendingOrders: number;
  totalProducts: number;
  totalRevenue: number;
  totalUsers: number;
  recentOrders: Order[];
  ordersByStatus: Record<string, number>;
  ordersByPayment: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/orders/stats").then(({ data }) => {
      if (data.success) setStats(data.data);
    }).finally(() => setIsLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: "Total Revenue", value: formatPrice(stats.totalRevenue), Icon: TrendingUp, color: "text-gold" },
        { label: "Total Orders", value: stats.totalOrders.toString(), Icon: ShoppingCart, color: "text-blue-400" },
        { label: "Pending Orders", value: stats.pendingOrders.toString(), Icon: Clock, color: "text-yellow-400" },
        { label: "Products Active", value: stats.totalProducts.toString(), Icon: Package, color: "text-green-400" },
        { label: "Registered Users", value: stats.totalUsers.toString(), Icon: Users, color: "text-purple-400" },
      ]
    : [];

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-6 h-px bg-gold" />
          <span className="text-gold text-[10px] font-sans tracking-[0.3em] uppercase">Overview</span>
        </div>
        <h1 className="font-display text-3xl text-ivory">Dashboard</h1>
      </div>

      {/* Stat cards */}
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {Array(5).fill(null).map((_, i) => (
            <div key={i} className="skeleton h-28 rounded-sm" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map(({ label, value, Icon, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-graphite border border-white/5 rounded-sm p-5 hover:border-gold/15 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase">{label}</p>
                <Icon className={`w-4 h-4 ${color}`} strokeWidth={1.5} />
              </div>
              <p className={`font-display text-2xl ${color}`}>{value}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Orders breakdown */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* By status */}
          <div className="bg-graphite border border-white/5 rounded-sm p-5">
            <h3 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4">
              Orders by Status
            </h3>
            <div className="space-y-2.5">
              {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
                <div key={status} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-sans px-2 py-0.5 rounded-sm border ${getStatusColor(status)}`}>
                      {status}
                    </span>
                  </div>
                  <span className="text-ivory font-sans text-sm">
                    {stats.ordersByStatus[status] || 0}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* By payment */}
          <div className="bg-graphite border border-white/5 rounded-sm p-5">
            <h3 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4">
              Payment Methods
            </h3>
            <div className="space-y-3">
              {[
                { key: "COD", label: "Cash on Delivery", color: "bg-yellow-400/10 text-yellow-400" },
                { key: "Prepaid", label: "Online (Prepaid)", color: "bg-green-400/10 text-green-400" },
              ].map(({ key, label, color }) => {
                const count = stats.ordersByPayment[key] || 0;
                const total = stats.totalOrders || 1;
                const pct = Math.round((count / total) * 100);
                return (
                  <div key={key}>
                    <div className="flex justify-between text-[11px] font-sans mb-1.5">
                      <span className={`px-2 py-0.5 rounded-sm text-[10px] ${color}`}>{label}</span>
                      <span className="text-smoke">{count} ({pct}%)</span>
                    </div>
                    <div className="h-1 bg-graphite-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gold/60 rounded-full transition-all duration-700"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-graphite border border-white/5 rounded-sm p-5">
            <h3 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              {[
                { label: "View All Orders", href: "/admin/orders" },
                { label: "Add New Product", href: "/admin/products/new" },
                { label: "Pending Orders", href: "/admin/orders?status=Pending" },
                { label: "Manage Products", href: "/admin/products" },
                { label: "View Customers", href: "/admin/users" },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center justify-between text-ash hover:text-gold text-sm font-body py-2 border-b border-white/5 last:border-0 hover:pl-1 transition-all duration-200"
                >
                  {label}
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent orders */}
      {stats?.recentOrders && stats.recentOrders.length > 0 && (
        <div className="bg-graphite border border-white/5 rounded-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
            <h3 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase">
              Recent Orders
            </h3>
            <Link href="/admin/orders" className="text-gold text-[10px] font-sans tracking-wider uppercase hover:text-gold-light transition-colors flex items-center gap-1">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-sans">
              <thead>
                <tr className="border-b border-white/5">
                  {["Order ID", "Customer", "Total", "Payment", "Status", "Date"].map((h) => (
                    <th key={h} className="text-left text-ash text-[10px] tracking-[0.2em] uppercase px-5 py-3 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3">
                      <Link href={`/admin/orders/${order._id}`} className="text-gold hover:text-gold-light font-mono text-[11px]">
                        {order.orderId}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-smoke">{order.shippingAddress.fullName}</td>
                    <td className="px-5 py-3 text-ivory">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3">
                      <span className="text-[10px] font-sans px-2 py-0.5 border rounded-sm text-ash border-white/10">
                        {order.paymentMethod}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <span className={`text-[10px] font-sans px-2 py-0.5 border rounded-sm ${getStatusColor(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-ash text-[11px]">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
