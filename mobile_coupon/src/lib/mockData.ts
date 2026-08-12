export type Category =
  | "Todos"
  | "Comida"
  | "Entretenimiento"
  | "Belleza"
  | "Servicios";

export interface Coupon {
  id: string;
  businessName: string;
  category: Exclude<Category, "Todos">;
  location: string;
  imageUrl: string;
  logoUrl: string;
  promoTitle: string;
  promoDescription: string;
  schedule: string;
  phone: string;
  instagram: string;
  discount: string;
  expiresAt: string;
  /** Deterministic code shown after redemption */
  couponCode: string;
}

export const mockCoupons: Coupon[] = [
  {
    id: "1",
    businessName: "Burger Palace",
    category: "Comida",
    location: "Centro Histórico",
    imageUrl:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    logoUrl:
      "https://api.dicebear.com/8.x/shapes/svg?seed=BurgerPalace&backgroundColor=f97316",
    promoTitle: "2×1 en Hamburguesas Clásicas",
    promoDescription:
      "Pide dos hamburguesas clásicas y paga solo una. Válido en consumo en sucursal, de martes a domingo.",
    schedule: "Mar–Dom · 12:00 – 23:00",
    phone: "+52 555 110 2233",
    instagram: "@burgerpalace_mx",
    discount: "50% OFF",
    expiresAt: "31 Ago 2026",
    couponCode: "CUPON-BP2X1",
  },
  {
    id: "2",
    businessName: "Cine Local",
    category: "Entretenimiento",
    location: "Plaza Revolución",
    imageUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&q=80",
    logoUrl:
      "https://api.dicebear.com/8.x/shapes/svg?seed=CineLocal&backgroundColor=6366f1",
    promoTitle: "Entrada + Palomitas por $99",
    promoDescription:
      "Disfruta cualquier función de la cartelera e incluye palomitas medianas. Aplica de lunes a jueves.",
    schedule: "Lun–Jue · 14:00 – 22:00",
    phone: "+52 555 230 4455",
    instagram: "@cinelocal_oficial",
    discount: "$99 COMBO",
    expiresAt: "15 Sep 2026",
    couponCode: "CUPON-CL99P",
  },
  {
    id: "3",
    businessName: "Spa Express",
    category: "Belleza",
    location: "Zona Rosa",
    imageUrl:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80",
    logoUrl:
      "https://api.dicebear.com/8.x/shapes/svg?seed=SpaExpress&backgroundColor=ec4899",
    promoTitle: "Masaje Relajante 60 min – 30% OFF",
    promoDescription:
      "Sesión completa de masaje sueco o de tejidos profundos con 30% de descuento. Previa cita.",
    schedule: "Lun–Sáb · 10:00 – 20:00",
    phone: "+52 555 340 6677",
    instagram: "@spaexpress_zr",
    discount: "30% OFF",
    expiresAt: "30 Sep 2026",
    couponCode: "CUPON-SE30M",
  },
  {
    id: "4",
    businessName: "TechFix Pro",
    category: "Servicios",
    location: "Col. Narvarte",
    imageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    logoUrl:
      "https://api.dicebear.com/8.x/shapes/svg?seed=TechFixPro&backgroundColor=0ea5e9",
    promoTitle: "Diagnóstico Gratis + 20% OFF en Reparación",
    promoDescription:
      "Lleva tu celular o laptop. Diagnóstico sin costo y 20% de descuento en la reparación que elijas.",
    schedule: "Lun–Vie · 09:00 – 19:00",
    phone: "+52 555 450 8899",
    instagram: "@techfixpro_mx",
    discount: "GRATIS diag.",
    expiresAt: "20 Sep 2026",
    couponCode: "CUPON-TF20R",
  },
  {
    id: "5",
    businessName: "La Pizzería Nostra",
    category: "Comida",
    location: "Col. Del Valle",
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
    logoUrl:
      "https://api.dicebear.com/8.x/shapes/svg?seed=PizzeriaNostra&backgroundColor=ef4444",
    promoTitle: "Pizza Grande + Refresco Familiar Gratis",
    promoDescription:
      "En la compra de cualquier pizza grande llévate un refresco familiar sin costo. Solo para llevar.",
    schedule: "Todos los días · 13:00 – 23:30",
    phone: "+52 555 560 1122",
    instagram: "@pizzeriannostra",
    discount: "REGALO",
    expiresAt: "10 Sep 2026",
    couponCode: "CUPON-PN1RFR",
  },
];
