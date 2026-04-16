"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { Product, ProductFilters, ProductCategory } from "@/types";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const CATEGORIES: (ProductCategory | "")[] = [
  "",
  "Interior",
  "Exterior",
  "Tech Accessories",
  "Performance",
  "Lighting",
  "Wheels & Tyres",
  "Audio",
  "Protection",
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "featured", label: "Featured" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

interface ProductsClientProps {
  initialFilters?: { [key: string]: string | undefined };
}

export default function ProductsClient({ initialFilters = {} }: ProductsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [filters, setFilters] = useState<ProductFilters>({
    category: (initialFilters.category as ProductCategory) || "",
    search: initialFilters.search || "",
    sortBy: (initialFilters.sortBy as ProductFilters["sortBy"]) || "newest",
    minPrice: initialFilters.minPrice ? parseInt(initialFilters.minPrice) : undefined,
    maxPrice: initialFilters.maxPrice ? parseInt(initialFilters.maxPrice) : undefined,
    page: 1,
    limit: 12,
  });

  const fetchProducts = useCallback(async (f: ProductFilters) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (f.category) params.set("category", f.category);
      if (f.search) params.set("search", f.search);
      if (f.sortBy) params.set("sortBy", f.sortBy);
      if (f.minPrice) params.set("minPrice", String(f.minPrice));
      if (f.maxPrice) params.set("maxPrice", String(f.maxPrice));
      params.set("page", String(f.page || 1));
      params.set("limit", String(f.limit || 12));

      const { data } = await axios.get(`/api/products?${params.toString()}`);
      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.pagination.pages);
        setTotal(data.pagination.total);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  const debouncedFetch = useDebouncedCallback((f: ProductFilters) => {
    fetchProducts(f);
  }, 400);

  useEffect(() => {
    debouncedFetch(filters);
  }, [filters, debouncedFetch]);

  const updateFilter = (key: keyof ProductFilters, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ category: "", search: "", sortBy: "newest", page: 1, limit: 12 });
  };

  const hasActiveFilters =
    filters.category || filters.search || filters.minPrice || filters.maxPrice;

  return (
    <div className="min-h-screen bg-obsidian">
      {/* Page header */}
      <div className="page-header pt-28 pb-10 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-3">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">
              Full Collection
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="font-display text-4xl sm:text-5xl text-ivory">
              All
              <span className="text-gold italic"> Accessories</span>
            </h1>
            <p className="text-ash text-sm font-body">
              {total} {total === 1 ? "product" : "products"} found
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter/Sort bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search */}
          <div className="flex-1 min-w-[200px] max-w-sm relative">
            <input
              type="text"
              placeholder="Search accessories..."
              value={filters.search || ""}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="input-luxury text-sm pl-4 pr-9 py-2.5 w-full"
            />
            {filters.search && (
              <button
                onClick={() => updateFilter("search", "")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-ivory"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category filter */}
          <div className="relative">
            <select
              value={filters.category || ""}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="input-luxury text-sm py-2.5 pr-8 appearance-none cursor-pointer min-w-[160px]"
            >
              <option value="">All Categories</option>
              {CATEGORIES.filter(Boolean).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={filters.sortBy || "newest"}
              onChange={(e) => updateFilter("sortBy", e.target.value)}
              className="input-luxury text-sm py-2.5 pr-8 appearance-none cursor-pointer min-w-[180px]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ash pointer-events-none" />
          </div>

          {/* Advanced filters toggle */}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex items-center gap-2 text-ash hover:text-gold transition-colors text-[11px] font-sans tracking-wider uppercase border border-white/10 px-4 py-2.5 rounded-sm hover:border-gold/30"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Price Filter
          </button>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 text-gold text-[11px] font-sans tracking-wider hover:text-gold-light transition-colors"
            >
              <X className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>

        {/* Price filter panel */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-graphite border border-white/5 rounded-sm p-5 mb-6 flex flex-wrap gap-5 items-end">
                <div>
                  <label className="text-ash text-[10px] font-sans tracking-wider uppercase block mb-2">
                    Min Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.minPrice || ""}
                    onChange={(e) =>
                      updateFilter("minPrice", e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    className="input-luxury text-sm py-2 w-32"
                  />
                </div>
                <div>
                  <label className="text-ash text-[10px] font-sans tracking-wider uppercase block mb-2">
                    Max Price (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="100000"
                    value={filters.maxPrice || ""}
                    onChange={(e) =>
                      updateFilter("maxPrice", e.target.value ? parseInt(e.target.value) : undefined)
                    }
                    className="input-luxury text-sm py-2 w-32"
                  />
                </div>
                <button
                  onClick={() => setFiltersOpen(false)}
                  className="text-gold text-[11px] font-sans tracking-wider uppercase border border-gold/30 px-4 py-2 hover:bg-gold/10 transition-colors rounded-sm"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat || "all"}
              onClick={() => updateFilter("category", cat)}
              className={`text-[10px] font-sans tracking-[0.15em] uppercase px-4 py-2 border rounded-sm transition-all duration-200 ${
                filters.category === cat
                  ? "bg-gold text-obsidian border-gold"
                  : "text-ash border-white/10 hover:border-gold/30 hover:text-ivory"
              }`}
            >
              {cat || "All"}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array(12).fill(null).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <p className="text-ivory font-display text-2xl">No products found</p>
            <p className="text-ash font-body">Try adjusting your filters</p>
            <button onClick={clearFilters} className="text-gold text-sm font-sans tracking-wider hover:underline">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => updateFilter("page", (filters.page || 1) - 1)}
              disabled={(filters.page || 1) <= 1}
              className="px-4 py-2 border border-white/10 text-ash text-[11px] font-sans tracking-wider uppercase hover:border-gold/30 hover:text-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => updateFilter("page", p)}
                className={`w-9 h-9 text-sm font-sans border rounded-sm transition-all ${
                  p === (filters.page || 1)
                    ? "bg-gold text-obsidian border-gold font-semibold"
                    : "border-white/10 text-ash hover:border-gold/30 hover:text-ivory"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => updateFilter("page", (filters.page || 1) + 1)}
              disabled={(filters.page || 1) >= totalPages}
              className="px-4 py-2 border border-white/10 text-ash text-[11px] font-sans tracking-wider uppercase hover:border-gold/30 hover:text-gold transition-all disabled:opacity-30 disabled:cursor-not-allowed rounded-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
