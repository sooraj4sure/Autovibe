"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ limit: "50" });
      if (search) params.set("search", search);
      const { data } = await axios.get(`/api/products?${params}`);
      if (data.success) setProducts(data.data);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(() => fetchProducts(), 400);
    return () => clearTimeout(t);
  }, [fetchProducts]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This action cannot be undone.`)) return;
    setDeletingId(id);
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      if (data.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        toast.success("Product deleted", {
          style: { background: "#1E1E1E", color: "#C9A14A", border: "1px solid rgba(201,161,74,0.2)" },
        });
      }
    } catch {
      toast.error("Failed to delete product");
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
        <div className="flex items-center justify-between gap-4">
          <h1 className="font-display text-3xl text-ivory">Products</h1>
          <Link href="/admin/products/new">
            <Button variant="gold" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-luxury pl-9 text-sm py-2.5"
        />
      </div>

      {/* Products table */}
      <div className="bg-graphite border border-white/5 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-sans">
            <thead>
              <tr className="border-b border-white/5">
                {["Product", "Category", "Price", "Stock", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-ash text-[10px] tracking-[0.15em] uppercase px-4 py-3 font-normal">
                    {h}
                  </th>
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
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center text-ash py-12 font-body">
                    No products found.{" "}
                    <Link href="/admin/products/new" className="text-gold hover:underline">
                      Add your first product.
                    </Link>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-obsidian flex-shrink-0">
                          {product.images[0] ? (
                            <Image
                              src={product.images[0].url}
                              alt={product.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-graphite-light" />
                          )}
                        </div>
                        <div>
                          <p className="text-ivory text-xs font-medium line-clamp-1 max-w-[180px]">
                            {product.name}
                          </p>
                          <p className="text-ash text-[10px]">SKU: {product.sku}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-sans px-2 py-0.5 border border-white/10 text-ash rounded-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gold font-sans font-medium text-xs">{formatPrice(product.price)}</p>
                      {product.comparePrice && (
                        <p className="text-ash text-[10px] line-through">{formatPrice(product.comparePrice)}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-sans ${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                        {product.stock > 0 ? product.stock : "Out of Stock"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {product.isFeatured && (
                          <span className="text-[9px] bg-gold/10 text-gold border border-gold/20 px-1.5 py-0.5 rounded-sm font-sans">
                            Featured
                          </span>
                        )}
                        <span className={`text-[9px] font-sans px-1.5 py-0.5 rounded-sm border ${product.isActive ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-red-400 bg-red-400/10 border-red-400/20"}`}>
                          {product.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="w-7 h-7 flex items-center justify-center border border-white/10 rounded-sm text-ash hover:text-gold hover:border-gold/30 transition-all"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          disabled={deletingId === product._id}
                          className="w-7 h-7 flex items-center justify-center border border-white/10 rounded-sm text-ash hover:text-red-400 hover:border-red-400/30 transition-all disabled:opacity-40"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
