"use client";

import { useState, useEffect, useRef } from "react";
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
  PhoneCall,
  Crown,
  LogOut,
  Settings,
  Package,
  ShieldCheck,
  Flame,
  ArrowRight,
} from "lucide-react";
import { useCartStore, useAuthStore } from "@/lib/store";
import { api } from "@/lib/api";
import { ICategory, IProduct } from "@/lib/types";

export default function Navbar() {
  const router = useRouter();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const subtotal = useCartStore((state) => state.getSubtotal());
  const openCart = useCartStore((state) => state.openCartDrawer);

  const { user, isLoggedIn, logout } = useAuthStore();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getCategories().then(setCategories);
  }, []);

  // Close user dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      router.push(`/category/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchResults([]);
    }
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-xs border-b border-slate-200">
      {/* Top Corporate Micro Bar */}
      <div className="bg-[#1e293b] text-slate-300 text-[11px] py-1.5 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="tel:01849832178"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <PhoneCall size={12} className="text-emerald-400" />
              <span>
                হটলাইন: <strong className="text-white">01849-832178</strong>
              </span>
            </a>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-400">
              <Truck size={12} className="text-amber-400" />
              <span>সারাদেশে ৬৪ জেলায় দ্রুত হোম ডেলিভারি</span>
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5">
            <span className="hidden sm:inline-flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck size={13} />
              <span>১০০% অথেনটিক প্রোডাক্ট গ্যারান্টি</span>
            </span>

            {/* Quick Admin Direct Shortcut */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-bold px-2 py-0.5 rounded bg-amber-400/10 hover:bg-amber-400/20 transition-colors border border-amber-400/20"
            >
              <Crown size={12} />
              <span>অ্যাডমিন ড্যাশবোর্ড</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#303d6e] to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
              SG
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-black text-xl sm:text-2xl text-slate-900 tracking-tight block leading-none">
                  Shop<span className="text-[#303d6e]">Genie</span>
                </span>
                <span className="text-[10px] font-bold bg-indigo-50 text-[#303d6e] px-1.5 py-0.5 rounded border border-indigo-100">
                  PRO
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-widest block mt-0.5">
                Modern E-Commerce BD
              </span>
            </div>
          </Link>

          {/* Search Box with Autocomplete */}
          <div className="flex-1 max-w-2xl relative hidden sm:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="প্রোডাক্ট খুঁজুন... যেমন: PC, Smartwatch, Shirt, Canva"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#303d6e] focus:bg-white transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#303d6e] hover:bg-indigo-900 text-white flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                aria-label="Search"
              >
                <Search size={16} />
              </button>
            </form>

            {/* Live Autocomplete Results */}
            {searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
                <div className="p-2.5 bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider flex justify-between">
                  <span>প্রস্তাবিত পণ্যসমূহ</span>
                  <span>{searchResults.length} টি পাওয়া গেছে</span>
                </div>
                {searchResults.map((item) => (
                  <Link
                    key={item._id}
                    href={`/product/${item.slug}`}
                    onClick={() => setSearchResults([])}
                    className="flex items-center gap-3 p-3 hover:bg-indigo-50/50 transition-colors border-b border-slate-50 last:border-none"
                  >
                    <img
                      src={item.mainImage}
                      alt={item.name}
                      className="w-11 h-11 rounded-lg object-cover border border-slate-100 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{item.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#303d6e]">
                          ৳ {item.basePrice.toLocaleString()}
                        </span>
                        {item.oldPrice && (
                          <span className="text-[11px] text-slate-400 line-through">
                            ৳ {item.oldPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Right Actions (Track, Sellers, Auth, Cart) */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Order Tracking */}
            <Link
              href="/order-track"
              className="hidden lg:flex items-center gap-2 text-slate-700 hover:text-[#303d6e] text-xs font-bold transition-colors py-1.5 px-2 rounded-xl hover:bg-slate-50"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Truck size={16} />
              </div>
              <span>ট্র্যাক অর্ডার</span>
            </Link>

            {/* Sellers */}
            <Link
              href="/sellers"
              className="hidden md:flex items-center gap-2 text-slate-700 hover:text-[#303d6e] text-xs font-bold transition-colors py-1.5 px-2 rounded-xl hover:bg-slate-50"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                <Store size={16} />
              </div>
              <span>সেলার শপ</span>
            </Link>

            {/* USER LOGIN / LOGOUT PROFILE DROPDOWN */}
            <div className="relative" ref={userMenuRef}>
              {isLoggedIn && user ? (
                <div>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all cursor-pointer text-left"
                    aria-label="User Menu"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#303d6e] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                      {user.role === "admin" ? (
                        <Crown size={16} className="text-amber-300" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div className="hidden sm:block text-left">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-900 block truncate max-w-[90px]">
                          {user.name.split(" ")[0]}
                        </span>
                        {user.role === "admin" && (
                          <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1 rounded">
                            Admin
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block leading-tight">
                        আমার অ্যাকাউন্ট
                      </span>
                    </div>
                    <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50 animate-fadeIn">
                      <div className="p-3.5 bg-slate-50 border-b border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-[#303d6e] text-white flex items-center justify-center font-bold text-sm">
                            {user.role === "admin" ? <Crown size={18} className="text-amber-400" /> : <User size={18} />}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                            <p className="text-[11px] text-slate-500 truncate">{user.email || user.phone}</p>
                            <span className="inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-[#303d6e] mt-1">
                              {user.role === "admin" ? "👑 সিস্টেম অ্যাডমিন" : "👤 কাস্টমার"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2 space-y-1 text-xs font-semibold text-slate-700">
                        {user.role === "admin" && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors font-bold border border-amber-200/60"
                          >
                            <Crown size={15} className="text-amber-600" />
                            <span>অ্যাডমিন ড্যাশবোর্ড</span>
                          </Link>
                        )}

                        <Link
                          href="/order-track"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                          <Package size={15} className="text-slate-500" />
                          <span>আমার অর্ডারসমূহ</span>
                        </Link>

                        <Link
                          href="/login"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors"
                        >
                          <Settings size={15} className="text-slate-500" />
                          <span>প্রোফাইল তথ্য</span>
                        </Link>

                        <div className="border-t border-slate-100 my-1"></div>

                        <button
                          type="button"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                        >
                          <LogOut size={15} />
                          <span>লগআউট করুন</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200 text-slate-800 hover:text-[#303d6e] transition-all text-xs font-bold group"
                >
                  <div className="w-6 h-6 rounded-md bg-indigo-100 text-[#303d6e] flex items-center justify-center group-hover:bg-[#303d6e] group-hover:text-white transition-colors">
                    <User size={14} />
                  </div>
                  <span className="hidden sm:inline">লগইন</span>
                </Link>
              )}
            </div>

            {/* Cart Trigger */}
            <button
              onClick={openCart}
              className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-[#303d6e] text-white hover:bg-indigo-900 transition-all text-left group shadow-sm cursor-pointer"
              aria-label="View Cart"
            >
              <div className="relative">
                <ShoppingCart size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2.5 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="hidden sm:block">
                <span className="text-[10px] text-indigo-200 uppercase tracking-wider block font-semibold leading-tight">
                  কার্ট
                </span>
                <span className="text-xs font-bold text-white block leading-tight">
                  ৳ {subtotal.toLocaleString()}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="mt-2.5 block sm:hidden">
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

      {/* Sub Navigation / Category Bar (Corporate Light Aesthetic) */}
      <div className="bg-white text-slate-700 border-t border-slate-200 shadow-xs hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-semibold">
          {/* Categories Mega Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2.5 bg-[#303d6e] hover:bg-indigo-950 text-white px-5 py-2.5 font-bold tracking-wide transition-colors shadow-xs cursor-pointer"
            >
              <Menu size={16} />
              <span>সকল ক্যাটাগরি</span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`}
              />
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 top-full w-64 bg-white text-slate-800 shadow-2xl rounded-b-2xl border border-slate-100 overflow-hidden z-50 py-2 animate-fadeIn">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/category/${cat.slug}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 hover:bg-indigo-50 hover:text-[#303d6e] transition-colors border-b border-slate-50 last:border-none"
                  >
                    <span className="font-semibold text-sm">{cat.name}</span>
                    <span className="text-xs text-slate-400">›</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-slate-700">
            <Link href="/" className="hover:text-[#303d6e] transition-colors py-2.5">
              হোম
            </Link>
            <Link href="/sellers" className="hover:text-[#303d6e] transition-colors py-2.5">
              টপ শপসমূহ
            </Link>
            <Link href="/order-track" className="hover:text-[#303d6e] transition-colors py-2.5">
              অর্ডার ট্র্যাকিং
            </Link>
            <Link
              href="/admin"
              className="hover:text-[#303d6e] text-amber-700 font-bold transition-colors py-2.5 flex items-center gap-1"
            >
              <Crown size={13} className="text-amber-600" /> অ্যাডমিন প্যানেল
            </Link>
          </div>

          {/* Promo Badge */}
          <Link
            href="/category/all"
            className="bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border border-rose-200/60"
          >
            <Flame size={14} className="text-rose-600" />
            <span>স্পেশাল ডিসকাউন্ট অফার চলছে!</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
