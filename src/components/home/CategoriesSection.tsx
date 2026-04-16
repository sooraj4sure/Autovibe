"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowUpRight } from "lucide-react";

const CATEGORIES = [
  {
    name: "Interior",
    description: "Transform your cabin into a sanctuary of luxury",
    count: "120+ Products",
    gradient: "from-amber-900/40 to-obsidian",
    icon: "🪑",
  },
  {
    name: "Exterior",
    description: "Command attention with bold exterior styling",
    count: "85+ Products",
    gradient: "from-slate-800/60 to-obsidian",
    icon: "🚗",
  },
  {
    name: "Tech Accessories",
    description: "Cutting-edge technology for the modern driver",
    count: "95+ Products",
    gradient: "from-blue-900/30 to-obsidian",
    icon: "📱",
  },
  {
    name: "Performance",
    description: "Unleash the full potential of your machine",
    count: "60+ Products",
    gradient: "from-red-900/30 to-obsidian",
    icon: "⚡",
  },
  {
    name: "Lighting",
    description: "Illuminate the night with precision optics",
    count: "75+ Products",
    gradient: "from-yellow-900/30 to-obsidian",
    icon: "💡",
  },
  {
    name: "Audio",
    description: "Concert hall acoustics in your cockpit",
    count: "40+ Products",
    gradient: "from-purple-900/30 to-obsidian",
    icon: "🔊",
  },
];

export default function CategoriesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">
              Shop By Category
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl text-ivory">
              Curated
              <br />
              <span className="text-gold italic">Collections</span>
            </h2>
            <Link
              href="/store/products"
              className="text-ash text-[11px] font-sans tracking-[0.2em] uppercase hover:text-gold transition-colors flex items-center gap-2 group"
            >
              View All
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link
                href={`/store/products?category=${encodeURIComponent(cat.name)}`}
                className="group relative block bg-graphite border border-white/5 rounded-sm overflow-hidden hover:border-gold/25 transition-all duration-500 hover:shadow-card-hover"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-60 group-hover:opacity-80 transition-opacity duration-500`} />

                <div className="relative p-6 sm:p-8">
                  <span className="text-3xl mb-4 block">{cat.icon}</span>
                  <h3 className="text-ivory font-display text-xl mb-1 group-hover:text-gold transition-colors duration-300">
                    {cat.name}
                  </h3>
                  <p className="text-ash text-xs font-body leading-relaxed mb-3 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gold/70 text-[9px] font-sans tracking-[0.2em] uppercase">
                      {cat.count}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-gold/0 group-hover:text-gold/70 transition-all duration-300 -translate-x-2 group-hover:translate-x-0 -translate-y-1 group-hover:translate-y-0" />
                  </div>
                </div>

                {/* Bottom gold line reveal */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/40 transition-colors duration-500" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
