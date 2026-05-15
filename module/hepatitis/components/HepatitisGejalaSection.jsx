import { IconInfoCircle } from "@tabler/icons-react";
import React from "react";

import { HEPATITIS_CONTENT_INSET } from "@/module/hepatitis/hepatitisLayoutClasses";

const FASE_AWAL = [
  "Demam ringan hingga sedang (37,5–38,5°C)",
  "Mual dan muntah",
  "Nafsu makan menurun drastis",
  "Lemas dan mudah lelah",
  "Nyeri perut bagian kanan atas (di mana hati berada)",
  "Diare (lebih sering pada anak-anak)",
  "Nyeri sendi dan otot",
];

const FASE_IKTERIK = [
  "Kulit dan bagian putih mata (sklera) berubah menjadi kuning — ini disebut ikterus atau jaundice",
  "Urine (air kencing) berubah warna menjadi gelap seperti teh",
  "Feses (tinja) berubah warna menjadi pucat seperti dempul atau tanah liat",
  "Rasa gatal di seluruh tubuh",
  "Hati membesar dan terasa nyeri saat ditekan",
];

const SEGERA_KE_DOKTER = [
  "Kulit atau mata Anda menguning",
  "Urine berubah gelap atau feses berwarna pucat",
  "Nyeri perut kanan atas yang hebat",
  "Muntah terus-menerus hingga tidak bisa makan atau minum",
  "Bingung, mengantuk berlebihan, atau sulit dibangunkan (tanda komplikasi serius)",
  "Gejala flu yang tidak membaik setelah seminggu, terutama jika baru-baru ini mengonsumsi makanan dari warung/restoran yang tidak terjamin kebersihannya",
];

function BulletList({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
          <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#038F7A]" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HepatitisGejalaSection() {
  return (
    <section id="tanda-gejala" className="scroll-mt-24 bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 xl:px-24">
      <div data-aos="fade-up" suppressHydrationWarning className={HEPATITIS_CONTENT_INSET}>
        <div className="space-y-8 md:space-y-10">
          <h2 className="text-[1.375rem] font-semibold leading-tight tracking-tight text-[#038F7A] md:text-[1.5rem] lg:text-[1.625rem] xl:text-[1.6875rem]">
            Tanda &amp; Gejala Hepatitis A
          </h2>

          <div className="space-y-3">
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Gejala Hepatitis A sangat bervariasi. Tidak semua orang yang terinfeksi menunjukkan gejala
              — pada anak-anak di bawah 6 tahun, sekitar 70% infeksi tidak menimbulkan gejala sama sekali.
              Sebaliknya, orang dewasa hampir selalu mengalami gejala, dan gejalanya cenderung lebih berat.
            </p>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px] lg:text-[17px]">
              Masa inkubasi (waktu dari paparan virus hingga gejala muncul) adalah 15–50 hari, dengan
              rata-rata 28 hari.
            </p>
          </div>

          {/* Fase Awal */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Fase Awal (Minggu 1–2): Gejala Mirip Flu
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Pada fase ini, banyak penderita mengira mereka hanya sakit flu biasa:
            </p>
            <BulletList items={FASE_AWAL} />
          </div>

          {/* Fase Ikterik */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Fase Ikterik (Minggu 2–4): Kulit dan Mata Menguning
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Setelah beberapa hari, gejala yang lebih khas mulai muncul:
            </p>
            <BulletList items={FASE_IKTERIK} />
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Perubahan warna ini terjadi karena hati yang meradang tidak bisa memproses bilirubin
              (pigmen kuning hasil pemecahan sel darah merah) dengan baik, sehingga bilirubin menumpuk
              dalam darah dan mewarnai kulit dan mata.
            </p>
          </div>

          {/* Durasi Penyakit */}
          <div className="space-y-3">
            <h3 className="text-[15px] font-semibold leading-snug text-[#038F7A] md:text-[16px] lg:text-[17px]">
              Durasi Penyakit
            </h3>
            <p className="text-[15px] font-normal leading-relaxed text-neutral-700 md:text-[16px]">
              Kebanyakan penderita pulih sepenuhnya dalam waktu 2 bulan. Sekitar 10–15% penderita
              mengalami perjalanan penyakit yang lebih panjang atau berulang hingga 6 bulan, tetapi
              hampir semua akhirnya sembuh total. Hepatitis A tidak menjadi kronis.
            </p>
          </div>

          {/* Callout */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#F5A623]/40 bg-white px-6 py-6 md:px-8 md:py-7">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/60 bg-white text-[#F5A623]">
              <IconInfoCircle className="h-5 w-5 stroke-[1.5]" aria-hidden />
            </div>
            <div className="min-w-0 space-y-2">
              <p className="text-[15px] font-semibold leading-snug text-[#D97706] md:text-[16px]">
                Kapan Harus Segera ke Dokter?
              </p>
              <p className="text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                Segera periksakan diri ke dokter jika:
              </p>
              <ul className="space-y-1">
                {SEGERA_KE_DOKTER.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[14px] leading-relaxed text-neutral-700 md:text-[15px]">
                    <span className="mt-[7px] h-[5px] w-[5px] shrink-0 rounded-full bg-neutral-500" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
