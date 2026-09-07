"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/");
    }, 1000);
  };

  const handleFillDemo = () => {
    setLoginInput("01712345678");
    setPassword("demo12345");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-100 shadow-xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#303d6e] flex items-center justify-center mx-auto mb-3 font-bold">
            <User size={24} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            কাস্টমার লগইন
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            আপনার মোবাইল নম্বর অথবা ইমেইল দিয়ে প্রবেশ করুন
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1 uppercase">
              মোবাইল নম্বর বা ইমেইল
            </label>
            <input
              type="text"
              required
              placeholder="017xxxxxxxx অথবা email@domain.com"
              value={loginInput}
              onChange={(e) => setLoginInput(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#303d6e]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1 uppercase">
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#303d6e]"
              />
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

          <div className="flex items-center justify-between text-xs pt-1">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[#303d6e] font-bold hover:underline"
            >
              💡 ডেমো ক্রেডেনশিয়াল ফিল করুন
            </button>
            <Link href="/forgot-password" className="text-slate-400 hover:text-slate-700">
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#303d6e] hover:bg-indigo-900 text-white font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20 transition-all active:scale-98 disabled:opacity-50"
          >
            {isSubmitting ? "লগইন হচ্ছে..." : <>লগইন করুন <ArrowRight size={16} /></>}
          </button>
        </form>

        <div className="border-t border-slate-100 pt-5 text-center text-xs text-slate-500">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/register" className="text-[#303d6e] font-extrabold hover:underline">
            রেজিস্ট্রেশন করুন
          </Link>
        </div>
      </div>
    </div>
  );
}
