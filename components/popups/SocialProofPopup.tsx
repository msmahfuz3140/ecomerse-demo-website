"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShieldCheck } from "lucide-react";
import { api } from "@/lib/api";

interface NotificationItem {
  name: string;
  product_name: string;
  time: string;
  image: string;
  product_url: string;
}

export default function SocialProofPopup() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    api.getSalesNotifications().then((items) => {
      if (items && items.length > 0) {
        setNotifications(items);
      }
    });
  }, []);

  useEffect(() => {
    if (notifications.length === 0 || isMuted) return;

    const showInterval = setInterval(() => {
      setIsVisible(true);
      setCurrentIndex((prev) => (prev + 1) % notifications.length);

      // Auto hide after 5 seconds
      const hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(hideTimer);
    }, 12000);

    // Initial trigger after 4s
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    return () => {
      clearInterval(showInterval);
      clearTimeout(initialTimer);
    };
  }, [notifications, isMuted]);

  const handleClose = () => {
    setIsVisible(false);
    setIsMuted(true);
    // Mute for 2 minutes
    setTimeout(() => setIsMuted(false), 120000);
  };

  if (!isVisible || notifications.length === 0) return null;

  const currentItem = notifications[currentIndex];

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 z-40 max-w-xs w-full bg-white rounded-2xl p-3.5 shadow-2xl border-l-4 border-[#303d6e] border-y border-r border-slate-100 flex items-center gap-3 transition-all duration-300 animate-slide-up">
      {/* Product Image */}
      <img
        src={currentItem.image}
        alt={currentItem.product_name}
        className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0 shadow-sm"
      />

      {/* Details */}
      <div className="flex-1 min-w-0 pr-4">
        <p className="text-xs font-bold text-slate-900 truncate">
          <span className="text-[#303d6e]">{currentItem.name}</span> just ordered
        </p>
        <Link
          href={currentItem.product_url}
          className="text-xs text-slate-700 font-semibold line-clamp-1 hover:text-[#303d6e] transition-colors"
        >
          {currentItem.product_name}
        </Link>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-slate-400 font-medium">{currentItem.time}</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
            <ShieldCheck size={11} /> Verified
          </span>
        </div>
      </div>

      {/* Dismiss Button */}
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors p-1"
        aria-label="Dismiss Notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
