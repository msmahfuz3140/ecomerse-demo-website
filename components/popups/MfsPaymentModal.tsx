"use client";

import { useState, useEffect } from "react";
import {
  X,
  Lock,
  Phone,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  MessageSquare,
  Sparkles,
  HelpCircle,
} from "lucide-react";

interface MfsPaymentModalProps {
  isOpen: boolean;
  gateway: "bkash" | "nagad";
  amount: number;
  customerPhone: string;
  onClose: () => void;
  onSuccess: (paymentData: { method: string; trxId: string; senderPhone: string }) => void;
}

export default function MfsPaymentModal({
  isOpen,
  gateway,
  amount,
  customerPhone,
  onClose,
  onSuccess,
}: MfsPaymentModalProps) {
  const isBkash = gateway === "bkash";

  // Brand Colors & Text
  const brandColor = isBkash ? "#E2136E" : "#F7941D";
  const brandName = isBkash ? "bKash" : "Nagad";
  const helpline = isBkash ? "16247" : "16167";

  // Step: 1 = Phone Number, 2 = OTP, 3 = PIN, 4 = Processing/Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [phone, setPhone] = useState(customerPhone || "01712345678");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("482910");
  const [pin, setPin] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showSmsBanner, setShowSmsBanner] = useState(false);

  useEffect(() => {
    if (customerPhone) {
      setPhone(customerPhone);
    }
  }, [customerPhone]);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setOtp("");
      setPin("");
      setErrorMsg("");
      setIsProcessing(false);
      setShowSmsBanner(false);
    }
  }, [isOpen]);

  // Resend OTP countdown
  useEffect(() => {
    if (step === 2 && countdown > 0) {
      const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [step, countdown]);

  if (!isOpen) return null;

  // Generate random realistic TrxID
  const generateTrxId = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let res = isBkash ? "BK" : "NG";
    for (let i = 0; i < 8; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  };

  // Step 1: Submit Phone Number
  const handleProceedToOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const cleanPhone = phone.replace(/\s+/g, "");
    if (!/^01[3-9]\d{8}$/.test(cleanPhone)) {
      setErrorMsg("সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন: 017xxxxxxxx)");
      return;
    }

    if (!agreeTerms) {
      setErrorMsg("শর্তাবলীতে সম্মতি দেওয়া আবশ্যক।");
      return;
    }

    // Generate random 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setStep(2);
    setCountdown(30);

    // Show simulated SMS notification toast
    setTimeout(() => {
      setShowSmsBanner(true);
    }, 600);
  };

  // Step 2: Submit OTP
  const handleConfirmOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (otp.trim().length !== 6) {
      setErrorMsg("অনুগ্রহ করে ৬ ডিজিটের ভেরিফিকেশন কোড দিন।");
      return;
    }

    setStep(3);
    setShowSmsBanner(false);
  };

  // Step 3: Submit PIN and Complete Payment
  const handleConfirmPin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (pin.trim().length < 4) {
      setErrorMsg("অনুগ্রহ করে আপনার সঠিক পিন (PIN) নম্বর দিন।");
      return;
    }

    setIsProcessing(true);
    setStep(4);

    const trxId = generateTrxId();

    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        method: isBkash ? "bkash_auto" : "nagad_auto",
        trxId,
        senderPhone: phone,
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      {/* Simulated Incoming SMS Push Banner */}
      {showSmsBanner && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 max-w-sm w-full mx-auto bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl border border-slate-700 flex items-start gap-3 animate-slide-down">
          <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <MessageSquare size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="font-bold text-white uppercase">{brandName} SMS</span>
              <span>এখনই</span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5 font-medium">
              আপনার ভেরিফিকেশন কোড (OTP) হলো: <strong className="text-amber-400 font-mono text-sm">{generatedOtp}</strong>। কাউকে এই কোড বলবেন না।
            </p>
            <button
              type="button"
              onClick={() => {
                setOtp(generatedOtp);
                setShowSmsBanner(false);
              }}
              className="mt-1.5 text-[11px] font-bold text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles size={12} /> ওটিপি কোডটি স্বয়ংক্রিয়ভাবে বসান
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowSmsBanner(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Payment Gateway Modal Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-scaleUp">
        {/* Brand Header Bar */}
        <div
          style={{ backgroundColor: brandColor }}
          className="text-white px-6 py-4 flex items-center justify-between shadow-sm relative overflow-hidden"
        >
          <div className="flex items-center gap-3">
            {/* Logo Badge */}
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md shrink-0">
              {isBkash ? (
                <span className="font-black text-base text-[#E2136E] tracking-tight">bKash</span>
              ) : (
                <span className="font-black text-sm text-[#F7941D] tracking-tight">নগদ</span>
              )}
            </div>
            <div>
              <span className="font-black text-base tracking-tight block leading-tight">
                {brandName} Payment Gateway
              </span>
              <span className="text-[11px] text-white/80 font-medium block">
                ShopGenie Online Merchant
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Invoice Amount Summary Strip */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>পেমেন্টের পরিমাণ:</span>
          </div>
          <div className="text-base font-black text-slate-900 font-mono">
            ৳ {amount.toLocaleString()}
          </div>
        </div>

        {/* Error Notification */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
            {errorMsg}
          </div>
        )}

        {/* STEP 1: PHONE NUMBER INPUT */}
        {step === 1 && (
          <form onSubmit={handleProceedToOtp} className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black text-slate-800">
                আপনার {brandName} একাউন্ট নম্বর দিন
              </h3>
              <p className="text-xs text-slate-400">
                যে একাউন্ট থেকে মূল্য পরিশোধ করতে চান
              </p>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase">
                {brandName} Account Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl text-base font-mono font-bold text-slate-900 focus:outline-none focus:border-[#E2136E] focus:bg-white transition-all"
                />
                <Phone size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded accent-[#E2136E]"
              />
              <span>
                আমি {brandName}-এর পেমেন্ট শর্তাবলী এবং নিয়মে সম্মতি প্রকাশ করছি।
              </span>
            </label>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                CLOSE
              </button>

              <button
                type="submit"
                style={{ backgroundColor: brandColor }}
                className="w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md hover:brightness-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-97"
              >
                <span>PROCEED</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: OTP VERIFICATION */}
        {step === 2 && (
          <form onSubmit={handleConfirmOtp} className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black text-slate-800">
                ভেরিফিকেশন কোড (OTP) লিখুন
              </h3>
              <p className="text-xs text-slate-500">
                <strong className="text-slate-800">{phone}</strong> নম্বরে ৬ ডিজিটের কোড পাঠানো হয়েছে
              </p>
            </div>

            <div>
              <div className="relative">
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="• • • • • •"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full py-3 px-4 text-center tracking-[0.5em] bg-slate-50 border-2 border-slate-200 rounded-xl text-xl font-mono font-black text-slate-900 focus:outline-none focus:border-[#E2136E] focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-between text-xs mt-2 text-slate-500">
                <button
                  type="button"
                  onClick={() => setOtp(generatedOtp)}
                  className="font-bold text-[#E2136E] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={13} /> কোড অটো-ফিল করুন ({generatedOtp})
                </button>

                <span>
                  {countdown > 0 ? (
                    `পুনরায় পাঠান ${countdown}s`
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setCountdown(30);
                        setShowSmsBanner(true);
                      }}
                      className="font-bold text-slate-700 hover:underline cursor-pointer"
                    >
                      কোড আসেনি? পাঠান
                    </button>
                  )}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                BACK
              </button>

              <button
                type="submit"
                style={{ backgroundColor: brandColor }}
                className="w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md hover:brightness-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-97"
              >
                <span>CONFIRM</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: PIN ENTRY */}
        {step === 3 && (
          <form onSubmit={handleConfirmPin} className="p-6 space-y-5">
            <div className="text-center space-y-1">
              <h3 className="text-sm font-black text-slate-800">
                আপনার {brandName} একাউন্টের পিন (PIN) দিন
              </h3>
              <p className="text-xs text-slate-400">
                ৫ ডিজিটের গোপন পিন নম্বর প্রদান করুন
              </p>
            </div>

            <div>
              <div className="relative">
                <input
                  type="password"
                  maxLength={5}
                  required
                  placeholder="•••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
                  className="w-full py-3 px-4 text-center tracking-[0.5em] bg-slate-50 border-2 border-slate-200 rounded-xl text-2xl font-mono font-black text-slate-900 focus:outline-none focus:border-[#E2136E] focus:bg-white"
                />
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>

              <div className="flex items-center justify-between text-xs mt-2 text-slate-500">
                <button
                  type="button"
                  onClick={() => setPin("12345")}
                  className="font-bold text-[#E2136E] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles size={13} /> ডেমো পিন দিন (12345)
                </button>
                <span className="text-[10px] text-slate-400">নিরাপদ ও এনক্রিপ্টেড</span>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-800 flex items-center gap-2">
              <ShieldCheck size={16} className="shrink-0 text-amber-600" />
              <span>কারো সাথে আপনার পিন নম্বর শেয়ার করবেন না।</span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                BACK
              </button>

              <button
                type="submit"
                style={{ backgroundColor: brandColor }}
                className="w-full py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md hover:brightness-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-97"
              >
                <span>CONFIRM PAYMENT</span>
                <CheckCircle2 size={14} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: PROCESSING / SUCCESS SCREEN */}
        {step === 4 && (
          <div className="p-8 text-center space-y-4">
            <div
              style={{ backgroundColor: `${brandColor}15`, color: brandColor }}
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner"
            >
              {isProcessing ? (
                <RefreshCw size={28} className="animate-spin" />
              ) : (
                <CheckCircle2 size={36} />
              )}
            </div>

            <div>
              <h3 className="text-base font-black text-slate-900">
                {isProcessing ? "পেমেন্ট প্রসেসিং হচ্ছে..." : "পেমেন্ট সফল হয়েছে!"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isProcessing
                  ? "অনুগ্রহ করে অপেক্ষা করুন, আপনার অর্ডারটি নিশ্চিত করা হচ্ছে"
                  : "অর্ডার কনফার্মেশন পেজে রিডাইরেক্ট করা হচ্ছে..."}
              </p>
            </div>

            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-3">
              <div
                style={{ backgroundColor: brandColor }}
                className="h-full w-full animate-[loading_1.8s_ease-in-out_infinite]"
              ></div>
            </div>
          </div>
        )}

        {/* Brand Gateway Footer */}
        <div className="bg-slate-50 px-6 py-2.5 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck size={12} className="text-emerald-500" /> 128-bit SSL Secure
          </span>
          <span>হেল্পলাইন: <strong>{helpline}</strong></span>
        </div>
      </div>
    </div>
  );
}
