"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Arjun Mehta",
    role: "Porsche 911 Owner",
    text: "The interior carbon fibre trim set transformed my cockpit entirely. The precision of the fitment and the quality of materials is on par with factory OEM parts — if not better.",
    rating: 5,
  },
  {
    name: "Priya Singhania",
    role: "Mercedes AMG Enthusiast",
    text: "I've ordered from luxury auto boutiques across Europe, and AutoVibe delivers at the same standard. Fast shipping, impeccable packaging, and products that look even better in person.",
    rating: 5,
  },
  {
    name: "Vikram Nair",
    role: "BMW M Series Collector",
    text: "The M-Sport steering wheel accent kit is absolutely stunning. Customer service was white-glove and they helped me choose the right finish for my interior. Highly recommended.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 bg-obsidian-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(201,161,74,1) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-10 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">
              Client Stories
            </span>
            <span className="w-10 h-px bg-gold" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-ivory">
            Words From Our
            <br />
            <span className="text-gold italic">Patrons</span>
          </h2>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="relative bg-graphite border border-white/5 rounded-sm p-8 hover:border-gold/20 transition-all duration-500 group"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gold/20 mb-6 group-hover:text-gold/30 transition-colors" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array(t.rating).fill(null).map((_, j) => (
                  <Star key={j} className="w-3 h-3 fill-gold text-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-smoke font-body text-base leading-relaxed mb-8 italic">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-6">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-gold font-display text-lg">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-ivory text-sm font-sans font-medium">{t.name}</p>
                  <p className="text-ash text-[10px] font-sans tracking-wider uppercase mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>

              {/* Hover accent */}
              <div className="absolute bottom-0 left-6 right-6 h-px bg-gold/0 group-hover:bg-gold/30 transition-colors duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
