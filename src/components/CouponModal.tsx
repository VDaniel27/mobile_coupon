"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import {
  X,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Ticket,
  CheckCircle2,
  Copy,
  ShieldCheck,
} from "lucide-react";
import type { Coupon } from "@/lib/mockData";

interface CouponModalProps {
  coupon: Coupon | null;
  isUsed: boolean;
  onConfirm: (couponId: string) => void;
  onClose: () => void;
}

/** Simple deterministic QR-like grid built from the coupon code characters */
function SimulatedQR({ code }: { code: string }) {
  // Build a 7×7 pseudo-random grid seeded from the code string
  const seed = code
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const size = 7;
  const cells = Array.from({ length: size * size }, (_, i) => {
    // Always fill corners (finder patterns)
    const row = Math.floor(i / size);
    const col = i % size;
    const corner =
      (row < 2 && col < 2) ||
      (row < 2 && col >= size - 2) ||
      (row >= size - 2 && col < 2);
    if (corner) return true;
    return ((seed * (i + 7)) % 17) > 7;
  });

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="grid gap-0.5 p-3 bg-white rounded-xl shadow-inner border border-slate-200"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
        aria-label="Código QR simulado"
      >
        {cells.map((filled, i) => (
          <div
            key={i}
            className={`w-6 h-6 rounded-sm ${filled ? "bg-slate-900" : "bg-white"}`}
          />
        ))}
      </div>
      <p className="text-xs text-slate-400">QR simulado · Solo demo</p>
    </div>
  );
}

export default function CouponModal({
  coupon,
  isUsed,
  onConfirm,
  onClose,
}: CouponModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  if (!coupon) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.couponCode).catch(() => {
      /* silently fail on insecure contexts */
    });
  };

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm p-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Cupón de ${coupon.businessName}`}
    >
      {/* Sheet panel */}
      <div className="w-full max-w-md bg-white rounded-t-3xl overflow-y-auto max-h-[92dvh] pb-8 animate-slide-up">
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>

        {/* Close button */}
        <div className="flex justify-end px-4 pt-1">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 active:scale-90 transition-all"
            aria-label="Cerrar modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Hero */}
        <div className="relative h-44 mx-4 rounded-2xl overflow-hidden">
          <Image
            src={coupon.imageUrl}
            alt={coupon.businessName}
            fill
            sizes="(max-width: 768px) 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <span className="absolute bottom-3 left-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            {coupon.discount}
          </span>
        </div>

        {/* Business info */}
        <div className="px-4 pt-4 flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-xl overflow-hidden border border-slate-100 flex-shrink-0">
            <Image
              src={coupon.logoUrl}
              alt={`Logo ${coupon.businessName}`}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-800 leading-tight">
              {coupon.businessName}
            </h2>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin size={11} />
              {coupon.location}
            </span>
          </div>
        </div>

        {/* Promo detail */}
        <div className="mx-4 mt-4 bg-purple-50 border border-purple-100 rounded-2xl p-4">
          <p className="text-xs font-semibold text-purple-500 uppercase tracking-wide mb-1">
            Promoción incluida
          </p>
          <p className="text-base font-bold text-slate-800">{coupon.promoTitle}</p>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            {coupon.promoDescription}
          </p>
        </div>

        {/* Meta */}
        <ul className="mx-4 mt-3 space-y-2">
          {[
            { icon: Clock, text: coupon.schedule },
            { icon: Phone, text: coupon.phone },
            { icon: Instagram, text: coupon.instagram },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-sm text-slate-500">
              <Icon size={14} className="text-slate-400 flex-shrink-0" />
              {text}
            </li>
          ))}
        </ul>

        <div className="h-px bg-slate-100 mx-4 my-4" />

        {/* ── REDEEMED STATE ── */}
        {isUsed ? (
          <div className="mx-4 mb-6 flex flex-col items-center gap-4">
            {/* Success banner */}
            <div className="w-full bg-green-50 border border-green-200 rounded-2xl p-4 flex items-start gap-3">
              <CheckCircle2 size={22} className="text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-green-700 text-sm">
                  ¡Cupón Canjeado con éxito!
                </p>
                <p className="text-green-600 text-xs mt-0.5 leading-relaxed">
                  Muestra este código en el establecimiento para recibir tu beneficio.
                </p>
              </div>
            </div>

            {/* Unique code */}
            <div className="w-full bg-slate-900 rounded-2xl px-4 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 mb-1">Código único</p>
                <p className="text-2xl font-black text-white tracking-widest font-mono">
                  {coupon.couponCode}
                </p>
              </div>
              <button
                onClick={handleCopy}
                className="p-2.5 bg-white/10 rounded-xl text-white hover:bg-white/20 active:scale-90 transition-all"
                aria-label="Copiar código"
              >
                <Copy size={18} />
              </button>
            </div>

            {/* Simulated QR */}
            <SimulatedQR code={coupon.couponCode} />

            {/* Anti-cloning note */}
            <div className="w-full flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
              <ShieldCheck size={14} className="text-amber-500 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                Uso único por mes. Válido hasta{" "}
                <strong>{coupon.expiresAt}</strong>.
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 active:scale-95 transition-all"
            >
              Cerrar
            </button>
          </div>
        ) : (
          /* ── PRE-CONFIRM STATE ── */
          <div className="mx-4 mb-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-3 py-2.5">
              <ShieldCheck size={14} className="text-blue-500 flex-shrink-0" />
              <p className="text-xs text-blue-700">
                Solo podrás usar este cupón <strong>una vez al mes</strong>.
                Confirma cuando estés en el establecimiento.
              </p>
            </div>

            <button
              onClick={() => onConfirm(coupon.id)}
              className="w-full py-4 rounded-xl font-extrabold text-base bg-gradient-to-r from-purple-600 to-violet-500 text-white shadow-lg shadow-purple-200 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Ticket size={18} />
              Confirmar y Usar Ahora
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl font-semibold text-sm text-slate-500 active:scale-95 transition-all"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
