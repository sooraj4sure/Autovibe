"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, User, Mail, Lock, Phone, Loader2 } from "lucide-react";
import { useUserAuth } from "@/context/UserAuthContext";
import toast from "react-hot-toast";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "login" | "register"; // --------------------
};

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { login, register } = useUserAuth();

  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [regForm, setRegForm] = useState({ name: "", email: "", password: "", phone: "" });

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      toast.success("Welcome back ✨");
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(regForm.name, regForm.email, regForm.password, regForm.phone);
      toast.success("Account created 💛");
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* CENTER WRAPPER */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-md"
            >
              {/* MODAL */}
              <div className="bg-[#121212]/90 border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] backdrop-blur-xl max-h-[90vh] overflow-y-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <div>
                    <h2 className="text-white text-lg tracking-wide">
                      {tab === "login" ? "Welcome Back" : "Create Account"}
                    </h2>
                    <p className="text-gray-400 text-xs">
                      {tab === "login" ? "Sign in to continue" : "Join AutoVibe"}
                    </p>
                  </div>

                  <button onClick={onClose}>
                    <X className="text-gray-400 hover:text-white" />
                  </button>
                </div>

                {/* TABS */}
                <div className="flex border-b border-white/10">
                  {["login", "register"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setTab(t as any)}
                      className={`flex-1 py-3 text-sm transition ${
                        tab === t
                          ? "text-yellow-400 border-b-2 border-yellow-400"
                          : "text-gray-400"
                      }`}
                    >
                      {t === "login" ? "Login" : "Register"}
                    </button>
                  ))}
                </div>

                {/* FORM */}
                <div className="p-6 space-y-4">

                  {tab === "login" ? (
                    <form onSubmit={handleLogin} className="space-y-4">

                      {/* EMAIL */}
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={loginForm.email}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, email: e.target.value })
                          }
                          className="w-full pl-10 pr-3 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-yellow-400 outline-none"
                        />
                      </div>

                      {/* PASSWORD */}
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                        <input
                          type={showPwd ? "text" : "password"}
                          placeholder="Password"
                          value={loginForm.password}
                          onChange={(e) =>
                            setLoginForm({ ...loginForm, password: e.target.value })
                          }
                          className="w-full pl-10 pr-10 py-2 bg-black/40 border border-white/10 rounded-lg text-white focus:border-yellow-400 outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPwd(!showPwd)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                        >
                          {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      {/* BUTTON */}
                      <button className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition">
                        {loading ? "Loading..." : "Login"}
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-4">

                      <input
                        type="text"
                        placeholder="Full Name"
                        value={regForm.name}
                        onChange={(e) =>
                          setRegForm({ ...regForm, name: e.target.value })
                        }
                        className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-white"
                      />

                      <input
                        type="email"
                        placeholder="Email"
                        value={regForm.email}
                        onChange={(e) =>
                          setRegForm({ ...regForm, email: e.target.value })
                        }
                        className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-white"
                      />

                      <input
                        type="password"
                        placeholder="Password"
                        value={regForm.password}
                        onChange={(e) =>
                          setRegForm({ ...regForm, password: e.target.value })
                        }
                        className="w-full p-2 bg-black/40 border border-white/10 rounded-lg text-white"
                      />

                      <button className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-medium transition">
                        {loading ? "Loading..." : "Create Account"}
                      </button>
                    </form>
                  )}

                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}