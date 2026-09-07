"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Copy, ArrowRight, Truck, Home } from "lucide-react";
import { useState, Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("invoiceId") || "SG-ORDER";
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(invoiceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-xl space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner animate-bounce">
          <CheckCircle size={44} />
        </div>

        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            ধন্যবাদ! আপনার অর্ডারটি সফল হয়েছে
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
            খুব শীঘ্রই আমাদের কাস্টমার প্রতিনিধি আপনার সাথে যোগাযোগ করে ডেলিভারি কনফার্ম করবেন।
          </p>
        </div>

        {/* Invoice Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-dashed border-slate-200 flex items-center justify-between">
          <div className="text-left">
            <span className="text-[11px] text-slate-400 font-semibold block uppercase">
              ইনভয়েস আইডি (Invoice ID):
            </span>
            <span className="text-base font-black text-slate-900 font-mono tracking-wider">
              {invoiceId}
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 transition-colors shadow-xs"
          >
            <Copy size={13} />
            <span>{copied ? "কপি হয়েছে!" : "কপি"}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            href={`/order-track?query=${encodeURIComponent(invoiceId)}`}
            className="w-full bg-[#303d6e] hover:bg-indigo-900 text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-950/20 transition-all"
          >
            <Truck size={17} /> অর্ডার ট্র্যাক করুন
          </Link>

          <Link
            href="/"
            className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Home size={16} /> আরও কেনাকাটা করুন
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center">
      <Suspense fallback={<div className="p-8 text-center text-sm">লোড হচ্ছে...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
