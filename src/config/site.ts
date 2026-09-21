/**
 * Markazlashtirilgan sayt konfiguratsiyasi.
 * Barcha kontakt ma'lumotlari, narxlar va TODO bilan belgilangan
 * taxminiy (placeholder) qiymatlar shu faylda joylashgan.
 * Real ma'lumot kelganda faqat shu faylni tahrirlash kifoya.
 */

export const siteConfig = {
  name: "Tinchlik Kids",
  foundedYear: 2019,

  contact: {
    phone: "+998 90 730 20 21",
    phoneHref: "tel:+998907302021",
    telegram: "https://t.me/Tinchlik_kids",
    instagram: "https://instagram.com/tinchlik_kids",
    instagramHandle: "@tinchlik_kids",
    // Ikkala filial ham shu yerda ro'yxatlangan. Yangi filial qo'shish yoki
    // manzilni o'zgartirish uchun shu massivni tahrirlang — Aloqa bo'limi
    // avtomatik moslashadi.
    branches: [
      {
        id: "main",
        address: "Mahmud Tarobiy ko'chasi, 42-uy yonida, Navoiy",
        // TODO: Google Maps'dan aniq koordinatalarni oling va iframe src'ni yangilang
        mapEmbedSrc:
          "https://www.google.com/maps?q=Mahmud+Tarobiy+ko'chasi+42,+Toshkent&output=embed",
        mapDirectionsUrl:
          "https://www.google.com/maps/dir/?api=1&destination=Mahmud+Tarobiy+ko'chasi+42,+Toshkent",
      },
      {
        id: "branch2",
        address: "Mahmud Tarobiy ko'chasi, 40A-uy yonida, Navoiy",
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
    // Har bir qator — public/images/gallery/ papkasidagi bitta rasm yo'li.
    // Haqiqiy rasm qo'shganda mos yo'lni shu yerga yozing (.webp tavsiya etiladi).
    // TODO: qolgan 4 ta joyni ham haqiqiy fotosuratlar bilan almashtiring
    images: [
      "/images/gallery/1.webp", // bog'chaning tashqi ko'rinishi
      "/images/gallery/2.webp", // bog'chaning kirish qismi
      "/images/gallery/3.webp", // Navro'z bayrami
      "/images/gallery/4.webp", // guruh mashg'uloti
      "/images/gallery/5.svg",
      "/images/gallery/6.svg",
      "/images/gallery/7.svg",
      "/images/gallery/8.svg",
    ],
  },

  // TODO: Haqiqiy videolar bilan almashtiring (public/videos/ papkasiga MP4 joylang).
  // README.md dagi "Video qo'shish" bo'limida ffmpeg orqali siqish bo'yicha ko'rsatma bor.
  videos: [
    {
      id: "video1",
      src: "/videos/1.mp4",
      poster: "/images/videos/1.webp",
      title_uz: "Video 1 — TODO: sarlavha qo'ying",
      title_ru: "Видео 1 — TODO: добавьте заголовок",
    },
    {
      id: "video2",
      src: "/videos/2.mp4",
      poster: "/images/videos/2.webp",
      title_uz: "Video 2 — TODO: sarlavha qo'ying",
      title_ru: "Видео 2 — TODO: добавьте заголовок",
    },
    {
      id: "video3",
      src: "/videos/3.mp4",
      poster: "/images/videos/3.webp",
      title_uz: "Video 3 — TODO: sarlavha qo'ying",
      title_ru: "Видео 3 — TODO: добавьте заголовок",
    },
  ],

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
