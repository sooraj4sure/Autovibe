"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
}

interface UserAuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export function UserAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verify token on mount
  const verify = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/user/me");
      if (data.success) setUser(data.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { verify(); }, [verify]);

  const login = async (email: string, password: string) => {
    const { data } = await axios.post("/api/user/login", { email, password });
    if (!data.success) throw new Error(data.error || "Login failed");
    setUser(data.data);
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const { data } = await axios.post("/api/user/register", { name, email, password, phone });
    if (!data.success) throw new Error(data.error || "Registration failed");
    setUser(data.data);
  };

  const logout = async () => {
    await axios.post("/api/user/logout");
    setUser(null);
    router.push("/store");
  };

  return (
    <UserAuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const ctx = useContext(UserAuthContext);
  if (!ctx) throw new Error("useUserAuth must be used within UserAuthProvider");
  return ctx;
}
