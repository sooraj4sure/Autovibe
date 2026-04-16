"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Package, Heart, User, ArrowRight, LogOut } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import { useAppSelector } from "@/hooks/useStore";

export default function AccountPage() {
  const { user, isLoading, logout } = useUserAuth();
  const router = useRouter();
  const wishlistCount = useAppSelector((s) => s.wishlist.items.length);

  useEffect(() => {
    if (!isLoading && !user) router.push("/store");
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  const ACCOUNT_CARDS = [
    { href: "/store/account/orders", label: "My Orders", sub: "Track your orders and view history", Icon: Package, accent: "text-blue-400" },
    { href: "/store/wishlist", label: "Wishlist", sub: `${wishlistCount} saved item${wishlistCount !== 1 ? "s" : ""}`, Icon: Heart, accent: "text-red-400" },
  ];

  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-2">
            <span className="w-8 h-px bg-gold" />
            <span className="text-gold text-[10px] font-sans tracking-[0.35em] uppercase">Account</span>
          </div>
          <h1 className="font-display text-4xl text-ivory">
            My <span className="text-gold italic">Account</span>
          </h1>
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-graphite border border-white/5 rounded-sm p-6 mb-6 flex items-center gap-5"
        >
          <div className="w-14 h-14 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
            <span className="text-gold font-display text-2xl">{user.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-ivory font-display text-xl">{user.name}</h2>
            <p className="text-ash text-sm font-body mt-0.5">{user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-green-400 text-[10px] font-sans tracking-wider uppercase">Active</span>
          </div>
        </motion.div>

        {/* Quick action cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {ACCOUNT_CARDS.map(({ href, label, sub, Icon, accent }, i) => (
            <motion.div
              key={href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 + 0.1 }}
            >
              <Link
                href={href}
                className="flex items-center gap-4 bg-graphite border border-white/5 rounded-sm p-5 hover:border-gold/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-obsidian border border-white/5 rounded-sm flex items-center justify-center flex-shrink-0">
                  <Icon className={`w-4 h-4 ${accent}`} strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <p className="text-ivory text-sm font-sans font-medium">{label}</p>
                  <p className="text-ash text-[11px] font-body mt-0.5">{sub}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-graphite-soft group-hover:text-gold group-hover:translate-x-1 transition-all duration-200" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Account details */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-graphite border border-white/5 rounded-sm p-6 mb-6"
        >
          <h3 className="text-ivory text-[11px] font-sans tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-gold" /> Account Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-body">
            <div>
              <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Full Name</p>
              <p className="text-ivory">{user.name}</p>
            </div>
            <div>
              <p className="text-ash text-[10px] font-sans tracking-wider uppercase mb-1">Email Address</p>
              <p className="text-ivory">{user.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Sign out */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-400/60 hover:text-red-400 text-[11px] font-sans tracking-wider uppercase transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </button>
        </motion.div>
      </div>
    </div>
  );
}
