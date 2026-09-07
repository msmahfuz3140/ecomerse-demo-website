import Link from "next/link";
import {
  Zap,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  ArrowRight,
  Sparkles,
  Store,
} from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import PromoAdBanners from "@/components/home/PromoAdBanners";
import { api } from "@/lib/api";

export default async function HomePage() {
  const [products, categories, vendors] = await Promise.all([
    api.getProducts(),
    api.getCategories(),
    api.getVendors(),
  ]);

  const hotDeals = products.filter((p) => p.isHotDeal);
  const electronicsProducts = products.filter(
    (p) => (typeof p.category === "object" ? p.category.slug : p.category) === "electronics"
  );
  const womenProducts = products.filter((p) => {
    const slug = typeof p.category === "object" ? p.category.slug : p.category;
    return slug === "womens-fashion" || slug === "beauty-cosmetics";
  });
  const babyProducts = products.filter(
    (p) => (typeof p.category === "object" ? p.category.slug : p.category) === "baby-kids"
  );
  const homeElectricProducts = products.filter(
    (p) => (typeof p.category === "object" ? p.category.slug : p.category) === "home-appliances"
  );
  const fashionProducts = products.filter(
    (p) => (typeof p.category === "object" ? p.category.slug : p.category) === "fashion"
  );

  return (
    <div className="space-y-12 pb-16 bg-[#f8fafc]">
      {/* 1. Hero Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1a223f] via-[#243058] to-[#303d6e] text-white p-8 sm:p-12 lg:p-16 shadow-xl border border-indigo-900/40">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs uppercase px-3 py-1 rounded-full shadow">
              <Sparkles size={14} className="fill-slate-950" /> প্রিমিয়াম কালেকশন ২০২৬
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              সেরা গ্যাজেট ও ফ্যাশন এখন হাতের মুঠোয়
            </h1>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
              অরিজিনাল ব্র্যান্ডের স্মার্টফোন এক্সেসরিজ, কাস্টমাইজড পিসি ও ট্রেন্ডি ফ্যাশন কালেকশন পাচ্ছেন সুলভ মূল্যে, দ্রুততম ক্যাশ অন ডেলিভারিতে।
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/#hot-deals"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold px-6 py-3.5 rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-amber-400/20 transition-all hover:scale-105 active:scale-95"
              >
                হট ডিল দেখুন <ArrowRight size={17} />
              </Link>
              <Link
                href="/sellers"
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-2xl text-sm border border-white/20 backdrop-blur-md transition-all"
              >
                ভেরিফাইড শপসমূহ
              </Link>
            </div>
          </div>

          {/* Decorative glowing circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        </div>
      </section>

      {/* 2. Trust Badges / Value Proposition */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-[#303d6e] flex items-center justify-center shrink-0 border border-indigo-100">
              <Truck size={22} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">দ্রুততম ডেলিভারি</h4>
              <p className="text-[11px] text-slate-500 font-medium">সারা বাংলাদেশে ক্যাশ অন ডেলিভারি</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">১০০% আসল পণ্য</h4>
              <p className="text-[11px] text-slate-500 font-medium">অফিশিয়াল ব্র্যান্ড ওয়ারেন্টি</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <RotateCcw size={22} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">৭ দিনের রিটার্ন</h4>
              <p className="text-[11px] text-slate-500 font-medium">সহজ রিফান্ড ও রিটার্ন সুবিধা</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-2">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
              <Headphones size={22} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">লাইভ সাপোর্ট</h4>
              <p className="text-[11px] text-slate-500 font-medium">২৪/৭ কাস্টমার কেয়ার সার্ভিস</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Top Categories */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              পপুলার ক্যাটাগরি
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              আপনার পছন্দের ক্যাটাগরি থেকে ব্রাউজ করুন
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:shadow-lg hover:border-indigo-200 transition-all text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 mb-3 group-hover:scale-105 transition-transform border border-slate-100">
                <img
                  src={cat.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#303d6e] transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Promotional Advertisement Banners (New Feature) */}
      <PromoAdBanners />

      {/* 5. Hot Deals Section */}
      <section id="hot-deals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 rounded-3xl p-6 sm:p-8 shadow-xl text-white mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-red-600 flex items-center justify-center font-bold shadow">
                <Zap size={26} className="fill-red-600" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
                  হট ডিল কালেকশন <span className="text-xs bg-amber-400 text-slate-900 font-bold px-2.5 py-0.5 rounded-full">সীমিত স্টক</span>
                </h2>
                <p className="text-xs text-rose-100 font-medium mt-0.5">
                  সবচেয়ে বেশি বিক্রিত পণ্যগুলোতে বিশাল ডিসকাউন্ট অফার
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-black bg-black/30 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 w-fit">
              <span>অফার শেষ হতে বাকি:</span>
              <span className="bg-white text-slate-900 px-2 py-1 rounded-md">12h</span> :
              <span className="bg-white text-slate-900 px-2 py-1 rounded-md">35m</span> :
              <span className="bg-white text-slate-900 px-2 py-1 rounded-md">40s</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {(hotDeals.length > 0 ? hotDeals : products).slice(0, 4).map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </section>

      {/* 6. Electronics Showcase */}
      {electronicsProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Electronics & Gaming Setup
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                লেটেস্ট কম্পিউটার, এক্সেসরিজ ও মনিটর
              </p>
            </div>
            <Link
              href="/category/electronics"
              className="text-xs sm:text-sm font-bold text-[#303d6e] hover:underline flex items-center gap-1"
            >
              সব দেখুন <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {electronicsProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 7. Women's Exclusive Fashion & Beauty */}
      {womenProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-50 px-2.5 py-0.5 rounded-full">
                  Women's Exclusive
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                মেয়েদের ফ্যাশন ও রূপচর্চা কালেকশন
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                আসল ঐতিহ্যবাহী জামদানি শাড়ি, পার্টি থ্রি-পিস, হ্যান্ডব্যাগ ও ব্রাইটনিং সিরাম
              </p>
            </div>
            <Link
              href="/category/womens-fashion"
              className="text-xs sm:text-sm font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1"
            >
              সব দেখুন <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {womenProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 8. Baby & Kids Care Collection */}
      {babyProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Baby & Toddlers
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                বেবি ও বাচ্চাদের কালেকশন
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                ১০০% অর্গানিক নরম সুতি রম্পার, ফিডার সেট, ফোল্ডিং স্ট্রোলার ও শিক্ষণীয় খেলনা
              </p>
            </div>
            <Link
              href="/category/baby-kids"
              className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              সব দেখুন <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {babyProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 9. Smart Home & Kitchen Electric Appliances */}
      {homeElectricProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Smart Home
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                হোম ও কিচেন ইলেকট্রনিক্স
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                ডিজিটাল এয়ার ফ্রায়ার, মিক্সার ব্লেন্ডার, স্টিম আয়রন ও অটোমেটিক রোবট ক্লিনার
              </p>
            </div>
            <Link
              href="/category/home-appliances"
              className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              সব দেখুন <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {homeElectricProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 10. Men's Fashion Showcase */}
      {fashionProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Trendy Men's Fashion
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                প্রিমিয়াম সুতি শার্ট ও স্ট্রেচ চিনো প্যান্ট কালেকশন
              </p>
            </div>
            <Link
              href="/category/fashion"
              className="text-xs sm:text-sm font-bold text-[#303d6e] hover:underline flex items-center gap-1"
            >
              সব দেখুন <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {fashionProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* 8. Multi-Vendor / Verified Sellers Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#303d6e] flex items-center justify-center font-bold border border-indigo-100">
              <Store size={18} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                আমাদের ভেরিফাইড শপসমূহ
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                টপ-রেটেড বিশ্বস্ত বিক্রেতাদের অফিশিয়াল স্টোর
              </p>
            </div>
          </div>
          <Link
            href="/sellers"
            className="text-xs sm:text-sm font-bold text-[#303d6e] hover:underline flex items-center gap-1"
          >
            সকল সেলার <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {vendors.map((v) => (
            <div
              key={v._id}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-lg transition-all overflow-hidden flex flex-col justify-between"
            >
              <div
                className="h-28 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${v.banner})` }}
              >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
              </div>

              <div className="px-6 pb-6 pt-0 relative flex-1 flex flex-col justify-between">
                <div className="flex items-end justify-between -mt-10 mb-3">
                  <img
                    src={v.logo}
                    alt={v.shopName}
                    className="w-18 h-18 rounded-2xl object-cover border-4 border-white shadow-md bg-white shrink-0"
                  />
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-extrabold px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck size={13} /> Verified Shop
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-slate-900 mb-1">{v.shopName}</h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {v.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
                  <span className="font-semibold">⭐ {v.rating} ({v.reviewCount} রিভিউ)</span>
                  <Link
                    href={`/shop/${v.slug}`}
                    className="bg-[#303d6e] hover:bg-indigo-900 text-white font-bold px-4 py-2 rounded-xl transition-colors text-xs"
                  >
                    শপ ভিজিট করুন
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
