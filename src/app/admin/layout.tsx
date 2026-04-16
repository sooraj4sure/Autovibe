"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard, Package, ShoppingCart, LogOut, Menu, X, ChevronRight, Users,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AdminAuthProvider, useAdminAuth } from "@/context/AdminAuthContext";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", Icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", Icon: Package },
  { href: "/admin/orders", label: "Orders", Icon: ShoppingCart },
  { href: "/admin/users", label: "Customers", Icon: Users },
];

function AdminSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const { admin, logout } = useAdminAuth();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 bg-obsidian border-r border-white/5 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/5 min-h-[64px]">
        {!collapsed && (
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-6 h-6 border border-gold/60 rotate-45 flex-shrink-0" />
            <span className="text-ivory font-display text-base tracking-widest">
              AV<span className="text-gold">ADMIN</span>
            </span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="text-ash hover:text-gold transition-colors p-1 ml-auto"
        >
          {collapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-6 px-2 space-y-1">
        {NAV.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "admin-sidebar-link",
              pathname === href && "active",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
            {!collapsed && pathname === href && (
              <ChevronRight className="w-3 h-3 ml-auto text-gold/50" />
            )}
          </Link>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="border-t border-white/5 p-3">
        {!collapsed && admin && (
          <div className="px-2 py-2 mb-2">
            <p className="text-ivory text-xs font-sans font-medium truncate">{admin.email}</p>
            <p className="text-gold text-[9px] font-sans tracking-widest uppercase">Administrator</p>
          </div>
        )}
        <button
          onClick={logout}
          className={cn(
            "admin-sidebar-link w-full text-red-400/70 hover:text-red-400 hover:bg-red-400/5",
            collapsed && "justify-center px-2"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { admin, isLoading } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (!isLoading && !admin && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [admin, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  if (pathname === "/admin/login") return <>{children}</>;
  if (!admin) return null;

  return (
    <div className="min-h-screen bg-obsidian-50">
      <AdminSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <main
        className={cn(
          "transition-all duration-300 min-h-screen",
          collapsed ? "ml-16" : "ml-60"
        )}
      >
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
}
