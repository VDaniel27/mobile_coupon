"use client";

import { useState, useMemo } from "react";
import { Search, Star, Bell, ChevronRight, X } from "lucide-react";
import { mockCoupons, type Category, type Coupon } from "@/lib/mockData";
import CouponCard from "@/components/CouponCard";
import CouponModal from "@/components/CouponModal";

const CATEGORIES: Category[] = [
  "Todos",
  "Comida",
  "Entretenimiento",
  "Belleza",
  "Servicios",
];

const categoryEmoji: Record<Category, string> = {
  Todos: "🎁",
  Comida: "🍔",
  Entretenimiento: "🎬",
  Belleza: "💅",
  Servicios: "🔧",
};

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  /** Set of coupon IDs that have been redeemed this month */
  const [usedCoupons, setUsedCoupons] = useState<Set<string>>(new Set());

  // Derived: filtered list
  const filteredCoupons = useMemo(() => {
    const q = query.trim().toLowerCase();
    return mockCoupons.filter((c) => {
      const matchesCategory =
        activeCategory === "Todos" || c.category === activeCategory;
      const matchesQuery =
        !q ||
        c.businessName.toLowerCase().includes(q) ||
        c.promoTitle.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, activeCategory]);

  const handleConfirmCoupon = (couponId: string) => {
    setUsedCoupons((prev) => new Set(prev).add(couponId));
  };

  const handleOpenModal = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const handleCloseModal = () => {
    setSelectedCoupon(null);
  };

  const usedCount = usedCoupons.size;

  return (
    <div className="flex flex-col min-h-screen bg-slate-100 max-w-md mx-auto">
      {/* ── FIXED HEADER ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between">
            {/* Logo / Brand */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-violet-400 flex items-center justify-center shadow">
                <Star size={16} className="text-white fill-white" />
              </div>
              <div>
                <h1 className="text-base font-black text-slate-800 leading-none">
                  Club Beneficios
                </h1>
                <p className="text-xs text-slate-400 leading-none mt-0.5">
                  Tu app de descuentos locales
                </p>
              </div>
            </div>

            {/* Right: subscription badge + bell */}
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                Suscripción Activa
              </span>
              <button
                className="p-2 rounded-full bg-slate-100 text-slate-500 relative"
                aria-label="Notificaciones"
              >
                <Bell size={16} />
                {usedCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {usedCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar comercio o promoción…"
              className="w-full bg-slate-100 rounded-xl pl-9 pr-9 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-purple-300 transition"
              aria-label="Buscar cupones"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                aria-label="Limpiar búsqueda"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-200"
                  : "bg-white text-slate-600 border-slate-200 hover:border-purple-300"
              }`}
              aria-pressed={activeCategory === cat}
            >
              <span>{categoryEmoji[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 px-4 pt-4 pb-8">
        {/* Summary bar */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-slate-700">
            {filteredCoupons.length === 0
              ? "Sin resultados"
              : `${filteredCoupons.length} ${
                  filteredCoupons.length === 1 ? "beneficio" : "beneficios"
                } disponibles`}
          </p>
          {usedCount > 0 && (
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <span className="text-green-500 font-semibold">{usedCount}</span>{" "}
              usados este mes
              <ChevronRight size={12} />
            </span>
          )}
        </div>

        {/* Grid */}
        {filteredCoupons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <span className="text-5xl">🔍</span>
            <p className="font-bold text-slate-700">
              No encontramos resultados
            </p>
            <p className="text-sm text-slate-400 max-w-[220px]">
              Intenta con otro término o elige una categoría diferente.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setActiveCategory("Todos");
              }}
              className="mt-2 text-sm font-semibold text-purple-600 underline underline-offset-2"
            >
              Ver todos los cupones
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredCoupons.map((coupon) => (
              <CouponCard
                key={coupon.id}
                coupon={coupon}
                isUsed={usedCoupons.has(coupon.id)}
                onGetCoupon={handleOpenModal}
              />
            ))}
          </div>
        )}
      </main>

      {/* ── BOTTOM NAV (decorative, shows active tab) ── */}
      <nav className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-2 flex justify-around items-center z-40">
        {[
          { emoji: "🏠", label: "Inicio", active: true },
          { emoji: "🎫", label: "Mis Cupones", active: false },
          { emoji: "🗺️", label: "Mapa", active: false },
          { emoji: "👤", label: "Perfil", active: false },
        ].map(({ emoji, label, active }) => (
          <button
            key={label}
            className="flex flex-col items-center gap-0.5"
            aria-current={active ? "page" : undefined}
          >
            <span className="text-xl">{emoji}</span>
            <span
              className={`text-[10px] font-semibold ${
                active ? "text-purple-600" : "text-slate-400"
              }`}
            >
              {label}
            </span>
            {active && (
              <span className="w-1 h-1 rounded-full bg-purple-600" />
            )}
          </button>
        ))}
      </nav>

      {/* ── COUPON MODAL ── */}
      {selectedCoupon && (
        <CouponModal
          coupon={selectedCoupon}
          isUsed={usedCoupons.has(selectedCoupon.id)}
          onConfirm={handleConfirmCoupon}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
