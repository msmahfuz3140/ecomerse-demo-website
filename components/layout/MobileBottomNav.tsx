"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Truck, ShoppingCart, User } from "lucide-react";
import { useCartStore } from "@/lib/store";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const openCart = useCartStore((state) => state.openCartDrawer);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl px-2 py-2 flex items-center justify-around">
      {/* Categories */}
      <Link
        href="/#categories"
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
          pathname === "/categories" ? "text-[#303d6e]" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <Layers size={19} />
        <span>Category</span>
      </Link>

      {/* Tracking */}
      <Link
        href="/order-track"
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
          pathname === "/order-track" ? "text-[#303d6e]" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <Truck size={19} />
        <span>Track</span>
      </Link>

      {/* Home Floating FAB */}
      <Link
        href="/"
        className="flex flex-col items-center -mt-6 group"
        aria-label="Home"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#303d6e] to-indigo-600 text-white flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-105 transition-transform">
          <Home size={22} />
        </div>
        <span className="text-[10px] font-bold text-slate-800 mt-1">Home</span>
      </Link>

      {/* Cart Button */}
      <button
        onClick={openCart}
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 relative transition-colors"
      >
        <div className="relative">
          <ShoppingCart size={19} />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      {/* Login */}
      <Link
        href="/login"
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
          pathname === "/login" ? "text-[#303d6e]" : "text-slate-500 hover:text-slate-800"
        }`}
      >
        <User size={19} />
        <span>Account</span>
      </Link>
    </nav>
  );
}
