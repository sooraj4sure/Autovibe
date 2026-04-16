"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Login failed";
      toast.error(msg, {
        style: { background: "#1E1E1E", color: "#EDD99A", border: "1px solid rgba(201,161,74,0.2)" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-luxury-radial opacity-50" />
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(201,161,74,1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,161,74,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 border border-gold/40 rotate-45 mb-5">
            <div className="absolute inset-2 bg-gold/10 rotate-45" />
            <Lock className="w-5 h-5 text-gold -rotate-45 relative z-10" />
          </div>
          <h1 className="font-display text-3xl text-ivory">Admin Portal</h1>
          <p className="text-ash text-[10px] font-sans tracking-[0.3em] uppercase mt-2">
            AutoVibe Control Centre
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-graphite border border-white/5 rounded-sm p-7 shadow-glass space-y-5">
          <div>
            <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@Autovibe.com"
              required
              autoComplete="email"
              className="input-luxury"
            />
          </div>

          <div>
            <label className="block text-ash text-[10px] font-sans tracking-[0.2em] uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                autoComplete="current-password"
                className="input-luxury pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-gold transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full mt-2"
            isLoading={isLoading}
          >
            Access Dashboard
          </Button>
        </form>

        <p className="text-center text-graphite-soft text-[9px] font-sans tracking-widest uppercase mt-6">
          Restricted Access · AutoVibe Admin
        </p>
      </motion.div>
    </div>
  );
}
