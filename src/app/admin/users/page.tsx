"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { formatPrice, formatDate } from "@/lib/utils";
import { Search, X, Users, ExternalLink } from "lucide-react";

interface UserWithStats {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  orderCount: number;
  orderTotal: number;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [page, setPage] = useState(1);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "20" });
      if (search) params.set("search", search);
      const { data } = await axios.get(`/api/admin/users?${params}`);
      if (data.success) {
        setUsers(data.data);
        setPagination(data.pagination);
      }
    } finally {
      setIsLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    const t = setTimeout(fetchUsers, 400);
    return () => clearTimeout(t);
  }, [fetchUsers]);

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <span className="w-6 h-px bg-gold" />
          <span className="text-gold text-[10px] font-sans tracking-[0.3em] uppercase">Management</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl text-ivory">Customers</h1>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gold" strokeWidth={1.5} />
            <span className="text-ash text-sm font-body">{pagination.total} registered users</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="input-luxury pl-9 text-sm py-2.5"
        />
        {search && (
          <button onClick={() => { setSearch(""); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-ivory">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-graphite border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/5">
                {["Customer", "Phone", "Orders", "Total Spent", "Joined", "View Orders"].map((h) => (
                  <th key={h} className="text-left text-ash text-[10px] tracking-[0.15em] uppercase px-4 py-3 font-normal whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array(8).fill(null).map((_, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {Array(6).fill(null).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="skeleton h-4 rounded w-24" /></td>
                    ))}
                  </tr>
                ))
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-ash py-16 font-body">
                    {search ? "No users found matching your search" : "No registered users yet"}
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      {/* Avatar + Name/Email */}
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-gold text-xs font-sans font-semibold uppercase">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-ivory text-xs font-sans font-medium">{user.name}</p>
                          <p className="text-ash text-[10px]">{user.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-smoke text-xs">
                      {user.phone || <span className="text-graphite-soft">—</span>}
                    </td>

                    <td className="px-4 py-3">
                      <span className={`text-xs font-sans font-medium ${user.orderCount > 0 ? "text-gold" : "text-graphite-soft"}`}>
                        {user.orderCount}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-ivory text-xs font-sans">
                        {user.orderTotal > 0 ? formatPrice(user.orderTotal) : <span className="text-graphite-soft">—</span>}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-ash text-[11px] whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>

                    <td className="px-4 py-3">
                      {user.orderCount > 0 ? (
                        <Link
                          href={`/admin/orders?search=${encodeURIComponent(user.email)}`}
                          className="flex items-center gap-1.5 text-gold hover:text-gold-light text-[10px] font-sans tracking-wider uppercase transition-colors group"
                        >
                          View Orders
                          <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                      ) : (
                        <span className="text-graphite-soft text-[10px] font-sans">No orders</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-white/5">
            <p className="text-ash text-[11px] font-sans">Page {pagination.page} of {pagination.pages}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={page <= 1}
                className="text-ash text-[11px] font-sans px-3 py-1.5 border border-white/10 hover:border-gold/30 hover:text-gold transition-all disabled:opacity-30 rounded-sm"
              >
                Prev
              </button>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= pagination.pages}
                className="text-ash text-[11px] font-sans px-3 py-1.5 border border-white/10 hover:border-gold/30 hover:text-gold transition-all disabled:opacity-30 rounded-sm"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
