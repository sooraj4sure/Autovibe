"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function BrandStatement() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative py-32 overflow-hidden bg-obsidian"
    >
      {/* Large decorative word */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span className="text-[clamp(100px,20vw,260px)] font-display text-white/[0.015] leading-none tracking-tighter">
          PRESTIGE
        </span>
      </div>

      {/* Gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">
              Our Philosophy
            </span>
            <span className="w-10 h-px bg-gold" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-ivory leading-tight mb-8">
            Not just accessories.
            <br />
            <span className="text-gold italic">A statement of who you are.</span>
          </h2>

          <p className="text-ash font-body text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Every curve, every stitch, every precision-engineered component in our collection
            is a testament to the belief that your vehicle is an extension of your identity.
            We source only the finest materials from around the world, because you deserve nothing less.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/store/products">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="lg">
                Our Story
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-16 pt-8 border-t border-white/5"
        >
          {[
            { icon: "📦", label: "Cash on Delivery" },
            { icon: "🛡️", label: "Authentic Materials" },
            { icon: "🚚", label: "Pan-India Shipping" },
            { icon: "↩️", label: "Easy Returns" },
            { icon: "💳", label: "Secure Payments" },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-lg">{icon}</span>
              <span className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
