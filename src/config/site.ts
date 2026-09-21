/**
 * Markazlashtirilgan sayt konfiguratsiyasi.
 * Barcha kontakt ma'lumotlari, narxlar va TODO bilan belgilangan
 * taxminiy (placeholder) qiymatlar shu faylda joylashgan.
 * Real ma'lumot kelganda faqat shu faylni tahrirlash kifoya.
 */

export const siteConfig = {
  name: "Tinchlik Kids",
  foundedMonth: "Fevral",
  foundedYear: 2026,

  contact: {
    phone: "+998 90 730 20 21",
    phoneHref: "tel:+998907302021",
    // TODO: Telegram kanal/bot havolasini qo'ying (masalan, https://t.me/tinchlik_kids)
    telegram: "https://t.me/tinchlik_kids",
    instagram: "https://instagram.com/tinchlik_kids",
    instagramHandle: "@tinchlik_kids",
    // Ikkala filial ham shu yerda ro'yxatlangan. Yangi filial qo'shish yoki
    // manzilni o'zgartirish uchun shu massivni tahrirlang — Aloqa bo'limi
    // avtomatik moslashadi.
    branches: [
      {
        id: "main",
        address: "Mahmud Tarobiy ko'chasi, 42-uy yonida, Toshkent",
        // TODO: Google Maps'dan aniq koordinatalarni oling va iframe src'ni yangilang
        mapEmbedSrc:
          "https://www.google.com/maps?q=Mahmud+Tarobiy+ko'chasi+42,+Toshkent&output=embed",
        mapDirectionsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=Mahmud+Tarobiy+ko'chasi+42,+Toshkent",
      },
      {
        id: "branch2",
        address: "Mahmud Tarobiy ko'chasi, 40A-uy yonida, Toshkent",
        // TODO: Google Maps'dan aniq koordinatalarni oling va iframe src'ni yangilang
        mapEmbedSrc:
          "https://www.google.com/maps?q=Mahmud+Tarobiy+ko'chasi+40A,+Toshkent&output=embed",
        mapDirectionsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=Mahmud+Tarobiy+ko'chasi+40A,+Toshkent",
      },
    ],
  },

  ageRange: { min: 2, max: 7 },
  groupsCount: 7,
  programCount: 5,

  pricing: {
    currency: "so'm",
    young: {
      ageLabelKey: "young", // 2-3 yosh
      price: 1_800_000,
    },
    older: {
      ageLabelKey: "older", // katta yoshdagilar
      price: 1_600_000,
    },
  },

  // TODO: Ish vaqtini aniqlashtiring (hozircha taxminiy standart bog'cha vaqti qo'yilgan)
  workingHours: {
    weekdays: "07:30 - 19:00",
    weekend: "Dam olish kuni",
  },

  // TODO: Rasmiy mashg'ulot nomlari va tavsiflarini bog'chadan so'rab tasdiqlang
  programs: [
    { id: "english", icon: "Languages" },
    { id: "logic", icon: "Brain" },
    { id: "art", icon: "Palette" },
    { id: "music", icon: "Music" },
    { id: "sport", icon: "Dumbbell" },
  ],

  ageGroups: [
    { id: "toddler", range: "2-3" },
    { id: "middle", range: "3-5" },
    { id: "senior", range: "5-7" },
  ],

  // TODO: Kun tartibi vaqtlarini bog'chaning haqiqiy jadvali bilan almashtiring
  schedule: [
    { id: "breakfast", time: "08:00" },
    { id: "morningActivity", time: "09:00" },
    { id: "walk", time: "10:30" },
    { id: "lunch", time: "12:00" },
    { id: "nap", time: "13:00" },
    { id: "afternoonActivity", time: "15:30" },
    { id: "snack", time: "16:30" },
    { id: "freePlay", time: "17:00" },
    { id: "pickup", time: "18:00" },
  ],

  gallery: {
    // TODO: public/images/gallery/ papkasiga haqiqiy rasmlarni joylang.
    // Hozircha 1.svg...8.svg placeholder rasmlar turibdi. Haqiqiy rasm qo'shganda
    // fayl nomini saqlab .webp formatga o'tkazing va pastdagi `ext` ni "webp" ga o'zgartiring.
    count: 8,
    basePath: "/images/gallery",
    ext: "svg",
  },

  // TODO: Haqiqiy ota-onalar fikrlarini ism va rasm bilan almashtiring
  testimonials: [
    { id: 1, avatarSeed: "parent1" },
    { id: 2, avatarSeed: "parent2" },
    { id: 3, avatarSeed: "parent3" },
  ],

  // TODO: Xodimlar ma'lumotini qo'shish kerak bo'lsa shu yerga array qo'shiladi
  staff: [],

  telegramBot: {
    // .env.example faylida NEXT_PUBLIC_TG_BOT_TOKEN va NEXT_PUBLIC_TG_CHAT_ID sifatida saqlanadi
    tokenEnv: "NEXT_PUBLIC_TG_BOT_TOKEN",
    chatIdEnv: "NEXT_PUBLIC_TG_CHAT_ID",
  },

  seo: {
    siteUrl: "https://tinchlikkids.uz", // TODO: haqiqiy domenni kiriting
  },
} as const;

export type SiteConfig = typeof siteConfig;
