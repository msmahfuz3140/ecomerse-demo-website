"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Truck,
  Store,
  User,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { api } from "@/lib/api";
import { ICategory, IProduct } from "@/lib/types";

export default function Navbar() {
  const router = useRouter();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const subtotal = useCartStore((state) => state.getSubtotal());
  const openCart = useCartStore((state) => state.openCartDrawer);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      setIsSearching(true);
      const timer = setTimeout(async () => {
        const results = await api.getProducts({ search: searchQuery.trim() });
        setSearchResults(results.slice(0, 5));
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4 sm:gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#303d6e] to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              SG
            </div>
            <div>
              <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight block leading-none">
                Shop<span className="text-[#303d6e]">Genie</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest block">
                Online Mega Store
              </span>
            </div>
          </Link>

          {/* Search Box with Autocomplete */}
          <div className="flex-1 max-w-2xl relative hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="প্রোডাক্ট খুঁজুন... যেমন: PC, Smartwatch, Shirt"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#303d6e] focus:bg-white transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#303d6e] hover:bg-indigo-800 text-white flex items-center justify-center transition-colors shadow"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Live Autocomplete Results */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="p-2 border-b border-slate-100 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  প্রস্তাবিত পণ্যসমূহ
                </div>
                {searchResults.map((item) => (
                  <Link
                    key={item._id}
                    href={`/product/${item.slug}`}
                    onClick={() => setSearchResults([])}
                    className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-none"
                  >
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                      <p className="text-xs font-bold text-[#303d6e]">৳ {item.basePrice.toLocaleString()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Action Navigation */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Order Tracking */}
            <Link
              href="/order-track"
              className="flex items-center gap-2 text-slate-700 hover:text-[#303d6e] text-sm font-medium transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-600 group-hover:text-[#303d6e] transition-colors">
                <Truck size={17} />
              </div>
              <span className="hidden lg:inline">Track Order</span>
            </Link>

            {/* Sellers */}
            <Link
              href="/sellers"
              className="hidden md:flex items-center gap-2 text-slate-700 hover:text-[#303d6e] text-sm font-medium transition-colors group"
            >
              <div className="w-9 h-9 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-600 group-hover:text-[#303d6e] transition-colors">
                <Store size={17} />
              </div>
              <span>Sellers</span>
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-3 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-slate-50 hover:bg-indigo-50/70 border border-slate-200 transition-all text-left group"
              aria-label="View Cart"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-lg bg-[#303d6e] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                  <ShoppingCart size={18} />
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:block">
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-semibold">
                  কার্ট
                </span>
                <span className="text-xs font-bold text-slate-900 block">
                  ৳ {subtotal.toLocaleString()}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-3 block sm:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="প্রোডাক্ট খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#303d6e]"
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#303d6e] text-white flex items-center justify-center"
              aria-label="Search"
            >
              <Search size={14} />
            </button>
          </form>
        </div>
      </div>

      {/* Sub Navigation / Category Bar */}
      <div className="bg-slate-900 text-white border-t border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-medium">
          {/* Categories Mega Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2 bg-[#303d6e] hover:bg-indigo-800 text-white px-5 py-2.5 font-bold tracking-wide transition-colors"
            >
              <Menu size={16} />
              <span>ALL CATEGORIES</span>
              <ChevronDown size={14} className={`transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 top-full w-64 bg-white text-slate-800 shadow-2xl rounded-b-xl border border-slate-100 overflow-hidden z-50 py-2">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50 hover:text-[#303d6e] transition-colors border-b border-slate-50 last:border-none"
                  >
                    <span className="font-semibold text-sm">{cat.name}</span>
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <span className="text-xs text-slate-400">›</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-slate-300">
            <Link href="/" className="hover:text-white transition-colors py-2.5">Home</Link>
            <Link href="/sellers" className="hover:text-white transition-colors py-2.5">Featured Shops</Link>
            <Link href="/order-track" className="hover:text-white transition-colors py-2.5">Order Tracking</Link>
            <Link href="/contact" className="hover:text-white transition-colors py-2.5">Help & Contact</Link>
          </div>

          <div className="text-amber-400 font-semibold flex items-center gap-1.5">
            ⚡ হট ডিল: সীমিত সময়ের জন্য বিশাল ডিসকাউন্ট!
          </div>
        </div>
      </div>
    </header>
  );
}
