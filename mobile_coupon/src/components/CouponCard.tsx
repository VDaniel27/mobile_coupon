"use client";

import Image from "next/image";
import {
  MapPin,
  Clock,
  Phone,
  Instagram,
  Tag,
  Ticket,
  CheckCircle2,
} from "lucide-react";
import type { Coupon } from "@/lib/mockData";

interface CouponCardProps {
  coupon: Coupon;
  isUsed: boolean;
  onGetCoupon: (coupon: Coupon) => void;
}

const categoryColors: Record<string, string> = {
  Comida: "bg-orange-100 text-orange-700",
  Entretenimiento: "bg-indigo-100 text-indigo-700",
  Belleza: "bg-pink-100 text-pink-700",
  Servicios: "bg-sky-100 text-sky-700",
};

export default function CouponCard({
  coupon,
  isUsed,
  onGetCoupon,
}: CouponCardProps) {
  const catColor =
    categoryColors[coupon.category] ?? "bg-slate-100 text-slate-600";

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-slate-100 active:scale-[0.98] transition-transform duration-150">
      {/* Hero image */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={coupon.imageUrl}
          alt={coupon.businessName}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority={coupon.id === "1"}
        />
        {/* Discount badge */}
        <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
          {coupon.discount}
        </span>
        {/* Used overlay */}
        {isUsed && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-slate-700 font-bold text-sm px-4 py-2 rounded-full flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-green-500" />
              Utilizado este mes
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Business header */}
        <div className="flex items-start gap-3">
          <div className="relative h-11 w-11 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100 shadow-sm">
            <Image
              src={coupon.logoUrl}
              alt={`Logo ${coupon.businessName}`}
              fill
              sizes="44px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <h2 className="font-bold text-slate-800 text-base leading-tight truncate">
              {coupon.businessName}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${catColor}`}
              >
                {coupon.category}
              </span>
              <span className="flex items-center gap-0.5 text-xs text-slate-400">
                <MapPin size={11} />
                {coupon.location}
              </span>
            </div>
          </div>
        </div>

        {/* Promo title */}
        <div className="bg-purple-50 border border-purple-100 rounded-xl px-3 py-2.5 flex items-start gap-2">
          <Tag size={15} className="text-purple-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-xs font-semibold text-purple-500 uppercase tracking-wide leading-none mb-0.5">
              Promoción
            </p>
            <p className="text-sm font-bold text-slate-800 leading-snug">
              {coupon.promoTitle}
            </p>
          </div>
        </div>

        {/* Meta info */}
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2 text-xs text-slate-500">
            <Clock size={13} className="flex-shrink-0 text-slate-400" />
            {coupon.schedule}
          </li>
          <li className="flex items-center gap-2 text-xs text-slate-500">
            <Phone size={13} className="flex-shrink-0 text-slate-400" />
            {coupon.phone}
          </li>
          <li className="flex items-center gap-2 text-xs text-slate-500">
            <Instagram size={13} className="flex-shrink-0 text-slate-400" />
            {coupon.instagram}
          </li>
        </ul>

        {/* Expiry */}
        <p className="text-xs text-slate-400">
          Válido hasta:{" "}
          <span className="font-semibold text-slate-500">{coupon.expiresAt}</span>
        </p>

        {/* CTA button */}
        <button
          onClick={() => !isUsed && onGetCoupon(coupon)}
          disabled={isUsed}
          aria-label={
            isUsed
              ? "Cupón ya utilizado este mes"
              : `Obtener cupón de ${coupon.businessName}`
          }
          className={`mt-auto w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            isUsed
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-md shadow-purple-200 active:scale-95 hover:shadow-lg hover:from-purple-700 hover:to-violet-600"
          }`}
        >
          {isUsed ? (
            <>
              <CheckCircle2 size={16} />
              Cupón Ya Utilizado este mes
            </>
          ) : (
            <>
              <Ticket size={16} />
              Obtener Cupón
            </>
          )}
        </button>
      </div>
    </article>
  );
}
