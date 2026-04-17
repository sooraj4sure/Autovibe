import { motion } from "framer-motion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — AutoVibe",
  description: "Learn about AutoVibe and our mission to redefine automotive luxury.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Our Story</span>
          </div>
          <h1 className="font-display text-5xl text-ivory mb-6">About AutoVibe</h1>
          <p className="text-ash font-body text-lg leading-relaxed">
            AutoVibe was born from a singular obsession — elevating the driving experience through premium accessories that blend engineering precision with aesthetic mastery.
          </p>
        </div>

        <div className="space-y-10 border-t border-white/5 pt-10">
          {[
            {
              title: "Who We Are",
              content:
                "We are a Delhi-based automotive accessories brand dedicated to bringing luxury and functionality together. Every product in our collection is carefully curated to meet the standards of the modern motorist who refuses to compromise.",
            },
            {
              title: "Our Mission",
              content:
                "To make premium car accessories accessible to every driver who values quality. We believe your vehicle is an extension of your personality — and it deserves nothing but the best.",
            },
            {
              title: "Why AutoVibe",
              content:
                "From carbon fibre accents to high-end seat covers, every item we stock is handpicked for quality, durability, and design. We don't sell ordinary — we sell extraordinary.",
            },
          ].map(({ title, content }) => (
            <div key={title} className="bg-graphite border border-white/5 rounded-sm p-8">
              <h2 className="font-display text-2xl text-ivory mb-4">{title}</h2>
              <p className="text-ash font-body leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-3 gap-6">
          {[
            { num: "500+", label: "Premium Products" },
            { num: "15K+", label: "Happy Customers" },
            { num: "100%", label: "Authentic Quality" },
          ].map(({ num, label }) => (
            <div key={label} className="bg-graphite border border-white/5 rounded-sm p-6 text-center">
              <p className="text-gold font-display text-3xl mb-1">{num}</p>
              <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}