"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Crown,
  CheckCircle2,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const { user, isLoggedIn, login, logout } = useAuthStore();

  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const isAdmin =
        loginInput.toLowerCase().includes("admin") || loginInput === "01849832178";

      const authUser = {
        id: isAdmin ? "usr_admin" : "usr_customer",
        name: isAdmin ? "ShopGenie Admin" : "সম্মানিত গ্রাহক",
        phone: loginInput.includes("@") ? "01712345678" : loginInput,
        email: loginInput.includes("@") ? loginInput : "customer@shopgenie.com",
        role: (isAdmin ? "admin" : "customer") as "admin" | "customer",
      };

      login(authUser);
      setSuccessMsg(`স্বাগতম, ${authUser.name}! সফলভাবে লগইন হয়েছে।`);

      setTimeout(() => {
        if (isAdmin) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      }, 700);
    }, 600);
  };

  const handleQuickAdminLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      login({
        id: "usr_admin",
        name: "ShopGenie Admin",
        phone: "01849832178",
        email: "admin@shopgenie.com",
        role: "admin",
      });
      setIsSubmitting(false);
      setSuccessMsg("অ্যাডমিন হিসেবে লগইন সফল! ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে...");
      setTimeout(() => router.push("/admin"), 600);
    }, 400);
  };

  const handleQuickCustomerLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      login({
        id: "usr_customer_1",
        name: "মাহফুজুল হক",
        phone: "01712345678",
        email: "mahfuz@gmail.com",
        role: "customer",
      });
      setIsSubmitting(false);
      setSuccessMsg("কাস্টমার হিসেবে সফলভাবে লগইন হয়েছে!");
      setTimeout(() => router.push("/"), 600);
    }, 400);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/80 shadow-xl space-y-6">
        {/* If Already Logged In */}
        {isLoggedIn && user ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-[#303d6e] flex items-center justify-center mx-auto border-2 border-indigo-100 shadow-sm">
              {user.role === "admin" ? <Crown size={32} className="text-amber-500" /> : <User size={32} />}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-[#303d6e] mb-2">
                {user.role === "admin" ? "👑 সিস্টেম অ্যাডমিনিস্ট্রেটর" : "👤 সাধারণ গ্রাহক"}
              </div>
              <h2 className="text-xl font-black text-slate-900">{user.name}</h2>
              <p className="text-xs text-slate-500 mt-0.5">{user.email || user.phone}</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-400 font-medium">মোবাইল:</span>
                <span className="font-bold text-slate-800">{user.phone}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 font-medium">অ্যাক্সেস লেভেল:</span>
                <span className="font-bold text-indigo-700 capitalize">{user.role}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              {user.role === "admin" ? (
                <Link
                  href="/admin"
                  className="w-full bg-[#303d6e] hover:bg-indigo-950 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Crown size={16} /> অ্যাডমিন ড্যাশবোর্ডে প্রবেশ করুন
                </Link>
              ) : (
                <Link
                  href="/order-track"
                  className="w-full bg-[#303d6e] hover:bg-indigo-950 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  📦 আপনার অর্ডার ট্র্যাক করুন
                </Link>
              )}

              <Link
                href="/"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-4 rounded-xl text-sm transition-colors text-center"
              >
                হোমপেজে যান
              </Link>

              <button
                type="button"
                onClick={logout}
                className="w-full bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <LogOut size={14} /> লগআউট করুন
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#303d6e] flex items-center justify-center mx-auto mb-3 font-bold border border-indigo-100">
                <ShieldCheck size={26} />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                লগইন করুন
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                আপনার মোবাইল নম্বর অথবা ইমেইল দিয়ে নিরাপদ একাউন্টে প্রবেশ করুন
              </p>
            </div>

            {/* Success Notification */}
            {successMsg && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Quick 1-Click Demo Logins */}
            <div className="space-y-2 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center mb-1 flex items-center justify-center gap-1">
                <Sparkles size={12} className="text-amber-500" /> দ্রুত ১-ক্লিক ডেমো লগইন
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleQuickAdminLogin}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#303d6e] hover:bg-indigo-950 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 disabled:opacity-50"
                >
                  <Crown size={14} className="text-amber-400" />
                  <span>অ্যাডমিন লগইন</span>
                </button>

                <button
                  type="button"
                  onClick={handleQuickCustomerLogin}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 disabled:opacity-50"
                >
                  <User size={14} className="text-[#303d6e]" />
                  <span>কাস্টমার লগইন</span>
                </button>
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="shrink-0 mx-3 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                অথবা ফরম পূরণ করুন
              </span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {/* Form */}
            <form onSubmit={handleStandardLogin} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase">
                  মোবাইল নম্বর বা ইমেইল
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="017xxxxxxxx অথবা admin@shopgenie.com"
                    value={loginInput}
                    onChange={(e) => setLoginInput(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#303d6e] focus:bg-white transition-all"
                  />
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase">
                  পাসওয়ার্ড
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#303d6e] focus:bg-white transition-all"
                  />
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#303d6e] hover:bg-indigo-900 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20 transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  "লগইন হচ্ছে..."
                ) : (
                  <>
                    প্রবেশ করুন <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            <div className="border-t border-slate-100 pt-4 text-center text-xs text-slate-500">
              অ্যাকাউন্ট নেই?{" "}
              <button
                type="button"
                onClick={handleQuickCustomerLogin}
                className="text-[#303d6e] font-extrabold hover:underline"
              >
                ১-ক্লিক ইনস্ট্যান্ট একাউন্ট তৈরি করুন
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
