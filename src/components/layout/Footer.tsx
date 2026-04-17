import Link from "next/link";
import { Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const LINKS = {
  shop: [
    { label: "All Products", href: "/store/products" },
    { label: "Interior", href: "/store/products?category=Interior" },
    { label: "Exterior", href: "/store/products?category=Exterior" },
    { label: "Tech Accessories", href: "/store/products?category=Tech+Accessories" },
    { label: "Performance", href: "/store/products?category=Performance" },
  ],
  info: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Shipping Policy", href: "/shipping" },
    { label: "Return Policy", href: "/returns" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-white/5">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/store" className="group flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="w-8 h-8 border border-gold/60 rotate-45 group-hover:border-gold transition-colors duration-300" />
                <div className="absolute inset-1.5 bg-gold/20 rotate-45 group-hover:bg-gold/30 transition-colors duration-300" />
              </div>
              <div>
                <span className="text-ivory font-display text-xl tracking-widest">
                  AUTO<span className="text-gold">VIBE</span>
                </span>
              </div>
            </Link>
            <p className="text-ash text-sm font-body leading-relaxed mb-6">
              Elevating the art of automotive luxury. Premium accessories crafted for discerning collectors and enthusiasts.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 border border-white/10 rounded-sm flex items-center justify-center text-ash hover:text-gold hover:border-gold/40 hover:bg-gold/5 transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-ivory text-[10px] font-sans tracking-[0.25em] uppercase mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-gold" />
              Shop
            </h4>
            <ul className="space-y-3">
              {LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ash text-sm font-body hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h4 className="text-ivory text-[10px] font-sans tracking-[0.25em] uppercase mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-gold" />
              Information
            </h4>
            <ul className="space-y-3">
              {LINKS.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ash text-sm font-body hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-ivory text-[10px] font-sans tracking-[0.25em] uppercase mb-6 flex items-center gap-3">
              <span className="w-4 h-px bg-gold" />
              Contact
            </h4>
            <ul className="space-y-4">
              {[
                { Icon: Mail, text: "caraccessoriesautovibe@gmail.com" },
                { Icon: Phone, text: "+91 9220749166" },
                { Icon: MapPin, text: "Kashmere Gate, Delhi, India" },
              ].map(({ Icon, text }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="w-3.5 h-3.5 text-gold mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-ash text-sm font-body">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="border-y border-gold/10 py-3 overflow-hidden">
        <div className="flex gap-8 animate-[marquee_20s_linear_infinite] whitespace-nowrap">
          {Array(4).fill(null).map((_, i) => (
            <span key={i} className="flex items-center gap-8 text-gold/30 text-[10px] font-sans tracking-[0.3em] uppercase">
              <span>Premium Quality</span>
              <span className="w-1 h-1 rounded-full bg-gold/30" />
              <span>Luxury Defined</span>
              <span className="w-1 h-1 rounded-full bg-gold/30" />
              <span>Crafted for Excellence</span>
              <span className="w-1 h-1 rounded-full bg-gold/30" />
              <span>Free Shipping Above ₹500</span>
              <span className="w-1 h-1 rounded-full bg-gold/30" />
            </span>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-graphite-soft text-[10px] font-sans tracking-wider uppercase">
          © {new Date().getFullYear()} AutoVibe. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {["Visa", "Mastercard", "Razorpay", "UPI"].map((method) => (
            <span key={method} className="text-graphite-soft text-[10px] font-sans tracking-wider border border-white/5 px-2 py-1">
              {method}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
