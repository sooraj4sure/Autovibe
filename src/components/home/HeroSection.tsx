"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.6;
    }
  }, []);

  const scrollDown = () => {
    const next = document.getElementById("featured");
    next?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen min-h-[640px] flex items-center overflow-hidden">
      {/* Background gradient (fallback / overlay) */}
      <div className="absolute inset-0 bg-luxury-radial" />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,161,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,161,74,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Large decorative text */}
      <div
        className="absolute right-0 bottom-12 text-[clamp(80px,18vw,220px)] font-display text-white/[0.02] leading-none select-none pointer-events-none"
        aria-hidden
      >
        AUTO VIBE
      </div>

      {/* Gold accent lines */}
      <div className="absolute top-1/2 -translate-y-1/2 right-0 w-px h-2/3 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}


          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-[clamp(48px,7vw,96px)] leading-[0.95] text-ivory mb-6"
          >
            Define Your
            <br />
            <span className="text-gold italic">Drive</span>
            <br />
            <span className="text-smoke/60">In Luxury</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-ash font-body text-lg leading-relaxed mb-10 max-w-xl"
          >
            Luxurious accessories for the modern motorist. Where engineering
            precision meets aesthetic mastery.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Link href="/store/products">
              <Button variant="gold" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Explore Collection
              </Button>
            </Link>
            <Link href="/store/products?featured=true">
              <Button variant="outline" size="lg">
                Featured Pieces
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex gap-10 mt-16 pt-8 border-t border-white/5"
          >
            {[
              { num: "500+", label: "Premium Products" },
              { num: "15K+", label: "Happy Customers" },
              { num: "100%", label: "Authentic Quality" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-gold font-display text-2xl">{num}</p>
                <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-ash hover:text-gold transition-colors group"
      >
        <span className="text-[9px] font-sans tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
