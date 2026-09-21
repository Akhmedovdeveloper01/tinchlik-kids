# Tinchlik Kids — bog'cha veb-sayti

"Tinchlik Kids" bolalar bog'chasi uchun Next.js (App Router) asosida qurilgan, statik
eksport qilinadigan, ikki tilli (o'zbek/rus) landing-sayt.

## Texnologiyalar

- **Next.js 16** (App Router, TypeScript, `output: "export"` — statik HTML eksport)
- **Tailwind CSS v4** (`src/app/globals.css` ichida `@theme` orqali sozlangan)
- **next-intl** — `/uz` va `/ru` yo'llar orqali ko'p tillilik
- **Framer Motion** — barcha animatsiyalar
- **react-hook-form + zod** — ariza formasi validatsiyasi
- **react-imask** — telefon raqami maskasi
- **canvas-confetti** — muvaffaqiyatli ariza konfetti animatsiyasi
- **embla-carousel-react** — ota-onalar fikrlari karuseli

## Ishga tushirish

```bash
npm install
npm run dev
```

Brauzerda [http://localhost:3000](http://localhost:3000) manzilini oching — u avtomatik
`/uz` (yoki oxirgi tanlangan til) sahifasiga yo'naltiradi.

Production build va statik eksport:

```bash
npm run build
```

Natija `out/` papkasida hosil bo'ladi — bu papkani istalgan oddiy statik hostingga
(masalan, oddiy Apache/Nginx server, Netlify, GitHub Pages, Vercel va h.k.) to'g'ridan-to'g'ri
yuklash mumkin.

## Loyiha tuzilishi

```
src/
├── app/
│   ├── layout.tsx            # ildiz layout (bo'sh, faqat children)
│   ├── page.tsx               # "/" — saqlangan tilga yo'naltiradi
│   ├── sitemap.ts, robots.ts, manifest.ts, icon.svg
│   └── [locale]/
│       ├── layout.tsx         # <html>, shriftlar, metadata, JSON-LD, Header/Footer
│       └── page.tsx           # barcha bo'limlarni yig'adigan bitta landing sahifa
├── components/
│   ├── layout/                # Header, Footer, LangSwitcher, FloatingActions, BackToTop, Loader
│   ├── sections/               # Hero, Stats, About, Program, Groups, Schedule, Pricing,
│   │                           # Gallery, Testimonials, FAQ, ApplicationForm, Contact
│   ├── ui/                    # Button, SectionHeading, CountUp, Lightbox, SectionReveal
│   └── decor/                 # Clouds, Rainbow, WaveDivider, Stars, RainbowIcon, InstagramIcon (inline SVG)
├── config/site.ts             # BARCHA kontakt/narx/matn bo'lmagan ma'lumotlar shu yerda
├── i18n/                      # next-intl routing/navigation/request sozlamalari
└── lib/                       # utils, telegram.ts (Telegram Bot API)
messages/
├── uz.json                    # o'zbekcha matnlar
└── ru.json                    # ruscha matnlar
```

## Ma'lumotlarni o'zgartirish — `src/config/site.ts`

Barcha kontakt ma'lumotlari, narxlar, manzil, ish vaqti va boshqa "qattiq" ma'lumotlar
**bitta faylda** — `src/config/site.ts`. Real ma'lumot kelganda faqat shu faylni
tahrirlash kifoya, komponentlarga tegishning hojati yo'q.

Muhim maydonlar:

- `contact.phone`, `contact.phoneHref` — telefon raqami
- `contact.telegram`, `contact.instagram` — ijtimoiy tarmoqlar
- `contact.address`, `contact.mapEmbedSrc`, `contact.mapDirectionsUrl` — manzil va xarita
- `pricing.young.price`, `pricing.older.price` — oylik to'lovlar (so'mda, raqam sifatida)
- `workingHours` — ish vaqti
- `programs`, `ageGroups`, `schedule` — dastur/guruh/kun tartibi ma'lumotlari (matnlar
  `messages/uz.json` va `messages/ru.json` fayllarida, shu yerda faqat `id` va tartib)
- `gallery.count`, `gallery.ext` — galereya rasmlari soni va formati
- `seo.siteUrl` — saytning haqiqiy domeni (SEO metama'lumotlar uchun)

## Matnlarni tahrirlash — `messages/uz.json` va `messages/ru.json`

Saytdagi **barcha matnlar** shu ikki faylda. Kodda hech qanday qattiq yozilgan matn yo'q.
Yangi matn qo'shsangiz, ikkala faylga ham (uz va ru) mos kalitni qo'shishni unutmang —
aks holda o'sha til sahifasida xatolik chiqadi.

`TODO:` bilan boshlangan qiymatlar — hali tasdiqlanmagan yoki noma'lum ma'lumotlar
(pastdagi ro'yxatga qarang).

## Rasmlarni almashtirish

Galereya rasmlari ro'yxati `src/config/site.ts` dagi `gallery.images` massivida —
har bir qator bitta rasmning yo'li. Hozircha 1-4-o'rinlarda haqiqiy suratlar bor
(`public/images/gallery/1.webp` — tashqi ko'rinish, `2.webp` — kirish qismi,
`3.webp` — Navro'z bayrami, `4.webp` — guruh mashg'uloti), qolgan 5-8-o'rinlarda
rang-barang placeholder SVG turibdi.

Yangi rasm qo'shish yoki placeholder'ni almashtirish uchun:

1. Rasmni `.webp` formatida tayyorlang (tavsiya etilgan o'lcham: kamida 800×800px, kvadrat)
2. `public/images/gallery/` papkasiga saqlang (masalan, `3.webp`)
3. `src/config/site.ts` dagi `gallery.images` massivida mos qatorni yangi yo'lga
   almashtiring (masalan, `"/images/gallery/3.svg"` ni `"/images/gallery/3.webp"` ga)

## Video qo'shish

"Bog'chamiz hayotidan" bo'limida saytga to'g'ridan-to'g'ri yuklangan MP4 videolar
ko'rsatiladi.

Videolar ro'yxati `src/config/site.ts` dagi `videos` massivida — hozircha 3 ta
placeholder video bor (`public/videos/1.mp4`, `2.mp4`, `3.mp4` — bir xil fondagi
qisqa "TODO" kliplar). Haqiqiy video bilan almashtirish uchun:

1. Videongizni H.264/MP4 formatga, 720p'ga va tахminan 2–4 MB'gacha siqing.
   Terminalda `ffmpeg` o'rnatilgan bo'lsa, quyidagi buyruqni ishlating
   (vertikal 9:16 video uchun, masalan telefonda olingan):

   ```bash
   ffmpeg -i kirish-video.mp4 \
     -vf "scale=720:-2" \
     -c:v libx264 -preset slow -crf 26 \
     -c:a aac -b:a 96k \
     -movflags +faststart \
     chiqish-video.mp4
   ```

   - `scale=720:-2` — kenglikni 720px'ga tushiradi (balandlik nisbatga qarab
     avtomatik hisoblanadi)
   - `-crf 26` — sifat/hajm balansi (kichikroq fayl uchun 28–30 ga oshiring,
     sifatliroq uchun 22–24 ga tushiring)
   - Natijaviy fayl hajmini `ls -lh chiqish-video.mp4` bilan tekshiring —
     2–4 MB atrofida bo'lishi kerak

2. Faylni `public/videos/` papkasiga saqlang (masalan, `4.mp4`)
3. Video uchun "poster" (birinchi kadr) rasmini tayyorlang:

   ```bash
   ffmpeg -i public/videos/4.mp4 -vframes 1 -q:v 3 public/images/videos/4.webp
   ```

4. `src/config/site.ts` dagi `videos` massiviga yangi obyekt qo'shing (yoki
   placeholder'ni almashtiring):

   ```ts
   {
     id: "video4",
     src: "/videos/4.mp4",
     poster: "/images/videos/4.webp",
     title_uz: "Ertalabki mashg'ulot",
     title_ru: "Утреннее занятие",
   },
   ```

Open Graph rasmi uchun `public/og-image.jpg` (1200×630px) faylini qo'shing — bu ijtimoiy
tarmoqlarda havola ulashilganda ko'rinadigan rasm.

## Telegram botni ulash

Ariza formasi to'ldirilganda ma'lumotlar Telegram bot orqali sizga yuboriladi.

1. Telegram'da [@BotFather](https://t.me/BotFather) ga yozib yangi bot yarating, u sizga
   **bot token** beradi
2. O'sha bot bilan shaxsiy chatni boshlang (yoki botni kerakli guruhga qo'shing) va
   **chat ID**ni aniqlang (masalan, [@userinfobot](https://t.me/userinfobot) yordamida)
3. Loyiha ildizida `.env.example` faylidan nusxa olib `.env.local` yarating:

   ```bash
   cp .env.example .env.local
   ```

4. `.env.local` faylga token va chat ID'ni yozing:

   ```
   NEXT_PUBLIC_TG_BOT_TOKEN=1234567890:AAExampleTokenHere
   NEXT_PUBLIC_TG_CHAT_ID=123456789
   ```

5. Loyihani qayta build qiling (`npm run build`)

**Eslatma:** Agar bu ikkala qiymat ham bo'sh qoldirilsa, forma yuborilganda foydalanuvchi
avtomatik ravishda `tel:+998907302021` qo'ng'iroq sahifasiga yo'naltiriladi — sayt hech
qanday backend'siz ham ishlayveradi.

## Hostingga joylash

### Variant 1 — Vercel (eng oson)

```bash
npx vercel
```

Vercel `next.config.ts` dagi `output: "export"` sozlamasini avtomatik aniqlab, statik
sayt sifatida joylaydi. Muhit o'zgaruvchilarini (`NEXT_PUBLIC_TG_BOT_TOKEN`,
`NEXT_PUBLIC_TG_CHAT_ID`) Vercel loyihasi sozlamalarida qo'shishni unutmang.

### Variant 2 — oddiy statik hosting

```bash
npm run build
```

`out/` papkasi ichidagi barcha fayllarni hosting serveringizga (masalan, cPanel,
Nginx, Netlify, GitHub Pages) yuklang. Bu — to'liq statik HTML/CSS/JS fayllar
to'plami, hech qanday Node.js server talab qilinmaydi.

> **Muhim:** Muhit o'zgaruvchilari (`.env.local`) build vaqtida saytga "quyiladi" —
> shuning uchun Telegram sozlamalarini o'zgartirgandan keyin har safar `npm run build`
> ni qayta ishga tushirish kerak.

## Til almashtirish qanday ishlaydi

Header'dagi UZ/RU tugmasi bosilganda tanlov `localStorage`ga saqlanadi. Foydalanuvchi
saytga qaytganda ("/") avtomatik o'sha saqlangan tilga yo'naltiriladi (standart — o'zbek).

---

## TODO — to'ldirilishi kerak bo'lgan ma'lumotlar

Loyihada `// TODO:` yoki `TODO:` bilan belgilangan barcha joylar quyida ro'yxatda:

1. **`src/config/site.ts`**
   - Google Maps'dagi aniq koordinatalar — ikkala filial uchun ham
     (`contact.branches[].mapEmbedSrc`, `contact.branches[].mapDirectionsUrl`)
   - Ish vaqti (`workingHours`) — hozircha taxminiy `07:30–19:00` qo'yilgan
   - Kun tartibi vaqtlari (`schedule[].time`) — hozircha taxminiy vaqtlar
   - Haqiqiy domen (`seo.siteUrl`) — hozircha `https://tinchlikkids.uz`

   > **Eslatma:** Aloqa bo'limi endi ikkita filialni ko'rsatadi —
   > `contact.branches` massivida `main` (Mahmud Tarobiy, 42-uy) va `branch2`
   > (Mahmud Tarobiy, 40A-uy, yangi ochilgan) bor. Yangi filial qo'shish yoki
   > o'chirish uchun shu massivni tahrirlang, Aloqa bo'limidagi tablar
   > avtomatik moslashadi. Filial nomlari (tab yorlig'i) `messages/*.json`
   > dagi `contact.branches` kalitida.

2. **`messages/uz.json` va `messages/ru.json`** (ikkalasida ham bir xil joylarda)
   - `program.items.*.desc` — 5 ta mashg'ulotning rasmiy tavsiflari
   - `groups.tabs.*.desc` — 3 ta yosh guruhining rasmiy tavsiflari
   - `schedule.subtitle` — kun tartibi vaqtlarini tasdiqlash
   - `gallery.subtitle` — placeholder ekanligi haqida eslatma (rasmlar almashtirilgach o'chiring)
   - `testimonials.items.1/2/3` — haqiqiy ism va fikrlar
   - `faq.items[3]` (ovqatlanish) va `faq.items[4]` (ish vaqti) — aniq javoblar

3. **`public/images/gallery/`** — qolgan 4 ta placeholder SVG rasm o'rniga haqiqiy
   fotosuratlar (1-4-o'rin allaqachon haqiqiy suratlar bilan to'ldirilgan;
   yuqoridagi "Rasmlarni almashtirish" bo'limiga qarang)

4. **`public/videos/1.mp4`, `2.mp4`, `3.mp4`** — hozircha bir xil fondagi qisqa
   placeholder kliplar. Haqiqiy videolar bilan almashtiring va `src/config/site.ts`
   dagi `videos[].title_uz` / `title_ru` sarlavhalarini yozing (yuqoridagi
   "Video qo'shish" bo'limiga qarang)

5. **`public/og-image.jpg`** — ijtimoiy tarmoqlarda ulashish uchun 1200×630px rasm
   (hozircha `src/app/[locale]/layout.tsx` da yo'lga havola bor, lekin fayl yo'q)

6. **Telegram bot** — `.env.example` asosida `.env.local` yaratib, token va chat ID
   kiritish (yuqoridagi "Telegram botni ulash" bo'limiga qarang)

7. **Xodimlar** — agar sahifada xodimlar bo'limi kerak bo'lsa, `src/config/site.ts`
   dagi bo'sh `staff` massivini to'ldirib, mos komponent qo'shish kerak (hozirda
   texnik topshiriqda alohida bo'lim so'ralmagan, shuning uchun UI qo'shilmagan)
