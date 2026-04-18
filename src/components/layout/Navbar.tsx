"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Package,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAppSelector, useAppDispatch } from "@/hooks/useStore";
import { toggleCart } from "@/lib/store/cartSlice";
import { useUserAuth } from "@/context/UserAuthContext";
import AuthModal from "@/components/ui/AuthModal";

const NAV_LINKS = [
  { href: "/store", label: "Home" },
  { href: "/store/products", label: "Collection" },
  { href: "/store/products?category=Interior", label: "Interior" },
  { href: "/store/products?category=Exterior", label: "Exterior" },
  { href: "/store/products?category=Tech+Accessories", label: "Tech" },
];

export default function Navbar() {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((s) => s.cart.items);
  const wishlistItems = useAppSelector((s) => s.wishlist.items);
  const { user, logout, isLoading: authLoading } = useUserAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "register">("login");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const openLogin = () => {
    setAuthTab("login");
    setAuthModalOpen(true);
  };
  const openRegister = () => {
    setAuthTab("register");
    setAuthModalOpen(true);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled
            ? "bg-obsidian/95 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */} 
             {/* <Link href="/store" className="group flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 border border-gold/60 rotate-45 group-hover:border-gold transition-colors duration-300" />
                <div className="absolute inset-1.5 bg-gold/20 rotate-45 group-hover:bg-gold/30 transition-colors duration-300" />
              </div>
              <div>
                <span className="text-ivory font-display text-xl tracking-widest">AUTO<span className="text-gold">VIBE</span></span>
                <p className="text-ash text-[7px] font-sans tracking-[0.3em] uppercase -mt-0.5">Premium Accessories</p>
              </div>
            </Link> */}
            <Link href="/store" className="group flex items-center gap-3">
              <div className="relative w-10 h-10 flex-shrink-0">
                <img
                  src="/logo.jpeg"
                  alt="AV"
                  // className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  className="w-full h-full object-contain mix-blend-lighten group-hover:scale-105 transition-transform duration-300"

                />
              </div>
              <div>
                <span className="text-ivory font-display text-xl tracking-widest">
                  AUTO<span className="text-gold">VIBE</span>
                </span>
                <p className="text-ash text-[7px] font-sans tracking-[0.3em] uppercase -mt-0.5">
                  Premium Accessories
                </p>
              </div>
            </Link>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-[10px] font-sans tracking-[0.2em] uppercase transition-colors duration-200 py-1",
                    pathname === link.href
                      ? "text-gold"
                      : "text-smoke hover:text-ivory",
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-smoke hover:text-gold transition-colors"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>

              <Link
                href="/store/wishlist"
                className="relative text-smoke hover:text-gold transition-colors"
              >
                <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-gold text-obsidian text-[7px] font-bold flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => dispatch(toggleCart())}
                className="relative text-smoke hover:text-gold transition-colors"
              >
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 1.5 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-gold text-obsidian text-[7px] font-bold flex items-center justify-center rounded-full"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>

              {/* User Auth — desktop */}
              {!authLoading &&
                (user ? (
                  <div ref={userMenuRef} className="relative hidden lg:block">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-1.5 text-smoke hover:text-gold transition-colors"
                    >
                      <div className="w-7 h-7 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center">
                        <span className="text-gold text-[11px] font-sans font-semibold uppercase">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-200",
                          userMenuOpen && "rotate-180",
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 top-full mt-2 w-52 bg-graphite border border-white/8 rounded-sm shadow-glass overflow-hidden z-50"
                        >
                          <div className="px-4 py-3 border-b border-white/5">
                            <p className="text-ivory text-xs font-sans font-medium truncate">
                              {user.name}
                            </p>
                            <p className="text-ash text-[10px] font-sans truncate mt-0.5">
                              {user.email}
                            </p>
                          </div>
                          <div className="py-1.5">
                            <Link
                              href="/store/account"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-smoke hover:text-gold hover:bg-white/[0.03] transition-all text-xs font-sans tracking-wider uppercase"
                            >
                              <User className="w-3.5 h-3.5" strokeWidth={1.5} />{" "}
                              My Account
                            </Link>
                            <Link
                              href="/store/account/orders"
                              onClick={() => setUserMenuOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-smoke hover:text-gold hover:bg-white/[0.03] transition-all text-xs font-sans tracking-wider uppercase"
                            >
                              <Package
                                className="w-3.5 h-3.5"
                                strokeWidth={1.5}
                              />{" "}
                              My Orders
                            </Link>
                          </div>
                          <div className="border-t border-white/5 py-1.5">
                            <button
                              onClick={() => {
                                setUserMenuOpen(false);
                                logout();
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all text-xs font-sans tracking-wider uppercase"
                            >
                              <LogOut
                                className="w-3.5 h-3.5"
                                strokeWidth={1.5}
                              />{" "}
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <button
                    onClick={openLogin}
                    className="hidden lg:flex items-center gap-1.5 text-[10px] font-sans tracking-[0.15em] uppercase text-ash hover:text-gold border border-white/10 hover:border-gold/30 px-3 py-1.5 rounded-sm transition-all duration-200"
                  >
                    <User className="w-3.5 h-3.5" strokeWidth={1.5} /> Sign In
                  </button>
                ))}

              <button
                className="lg:hidden text-smoke hover:text-gold transition-colors"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              >
                {isMobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-obsidian/98 backdrop-blur-xl flex flex-col pt-24 px-8"
          >
            <nav className="flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    className="text-ivory font-display text-3xl hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 pt-6 border-t border-white/10 flex flex-col gap-4"
              >
                {user ? (
                  <>
                    <p className="text-gold text-sm font-sans">
                      Hello, {user.name}
                    </p>
                    <Link
                      href="/store/account/orders"
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2 text-smoke font-sans text-sm tracking-wider uppercase"
                    >
                      <Package className="w-4 h-4 text-gold" /> My Orders
                    </Link>
                    <button
                      onClick={() => {
                        setIsMobileOpen(false);
                        logout();
                      }}
                      className="flex items-center gap-2 text-red-400 font-sans text-sm tracking-wider uppercase text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setIsMobileOpen(false);
                        openLogin();
                      }}
                      className="text-gold font-sans text-sm tracking-wider uppercase text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        setIsMobileOpen(false);
                        openRegister();
                      }}
                      className="text-ash font-sans text-sm tracking-wider uppercase text-left"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </motion.div>
            </nav>
            <div className="mt-auto pb-12 border-t border-white/10 pt-8">
              <p className="text-ash text-[10px] font-sans tracking-[0.3em] uppercase">
                Luxury Redefined
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-obsidian/95 backdrop-blur-xl flex items-start justify-center pt-32"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="w-full max-w-2xl px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="border-b border-gold/30 flex items-center gap-4 pb-4">
                <Search className="w-5 h-5 text-gold flex-shrink-0" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search accessories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && searchQuery.trim()) {
                      setSearchOpen(false);
                      window.location.href = `/store/products?search=${encodeURIComponent(searchQuery)}`;
                    }
                    if (e.key === "Escape") setSearchOpen(false);
                  }}
                  className="flex-1 bg-transparent text-ivory font-body text-2xl placeholder-graphite-soft focus:outline-none"
                />
                <button onClick={() => setSearchOpen(false)}>
                  <X className="w-5 h-5 text-ash hover:text-ivory transition-colors" />
                </button>
              </div>
              <p className="text-ash text-[10px] font-sans tracking-[0.2em] uppercase mt-4">
                Press Enter to search
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultTab={authTab}
      />
    </>
  );
}
