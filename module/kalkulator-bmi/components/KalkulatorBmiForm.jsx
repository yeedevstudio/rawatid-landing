"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconGenderMale,
  IconGenderFemale,
  IconUser,
  IconRuler,
  IconWeight,
  IconRefresh,
  IconBookmark,
  IconShieldExclamation,
  IconHelpCircle,
  IconChevronDown,
} from "@tabler/icons-react";
import DatePicker from "@/common/components/DatePicker";
import { format } from "date-fns";
import { authFetch, clearSession } from "@/common/utils/auth";

const CATEGORIES = [
  {
    key: "kurus",
    label: "Kurus",
    range: "< 18.5",
    minBmi: -Infinity,
    maxBmi: 18.5,
    titleColor: "text-blue-500",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-600",
    activeBorder: "border-blue-400",
    barColor: "#3b82f6",
    circleBg: "bg-blue-50",
    description: "Berat badan Anda berada di bawah kisaran normal",
    manImage: "/image/kurusman.svg",
    girlImage: "/image/kurusgirl.svg",
    tips: [
      "Tingkatkan asupan kalori dengan makanan bergizi seperti kacang-kacangan, alpukat, dan daging tanpa lemak.",
      "Makan lebih sering dengan porsi kecil, minimal 5–6 kali sehari untuk membantu menambah berat badan.",
      "Lakukan latihan kekuatan seperti angkat beban untuk membangun massa otot secara sehat.",
    ],
  },
  {
    key: "normal",
    label: "Normal",
    range: "18.5 – 22.9",
    minBmi: 18.5,
    maxBmi: 23,
    titleColor: "text-green",
    badgeBg: "bg-green-100",
    badgeText: "text-green",
    activeBorder: "border-green",
    barColor: "#22c55e",
    circleBg: "bg-green-50",
    description: "Berat badan Anda ideal dan berada dalam kisaran normal.",
    manImage: "/image/normalman.svg",
    girlImage: "/image/normalgirl.svg",
    tips: [
      "Konsumsi makanan bergizi seimbang, perbanyak sayur dan buah.",
      "Lakukan aktivitas fisik minimal 30 menit setiap hari seperti jalan kaki, bersepeda, atau olahraga ringan.",
      "Tidur yang cukup dan kelola stres dengan baik untuk menjaga metabolisme tubuh.",
    ],
  },
  {
    key: "overweight",
    label: "Overweight",
    range: "23 – 27.4",
    minBmi: 23,
    maxBmi: 27.5,
    titleColor: "text-orange-500",
    badgeBg: "bg-orange-100",
    badgeText: "text-orange-600",
    activeBorder: "border-orange-400",
    barColor: "#fb923c",
    circleBg: "bg-orange-50",
    description:
      "Berat badan Anda lebih tinggi dari kisaran normal. Jaga pola hidup sehat agar tetap bugar.",
    manImage: "/image/overman.svg",
    girlImage: "/image/overgirl.svg",
    tips: [
      "Kurangi konsumsi makanan tinggi gula, garam, dan lemak jenuh seperti makanan cepat saji.",
      "Tambah aktivitas fisik menjadi minimal 45 menit per hari dengan olahraga sedang.",
      "Pantau berat badan secara rutin setiap minggu untuk mendeteksi perubahan lebih awal.",
    ],
  },
  {
    key: "obesitas1",
    label: "Obesitas I",
    range: "27.5 – 32.4",
    minBmi: 27.5,
    maxBmi: 32.5,
    titleColor: "text-red-400",
    badgeBg: "bg-red-100",
    badgeText: "text-red-500",
    activeBorder: "border-red-400",
    barColor: "#f87171",
    circleBg: "bg-red-50",
    description:
      "Berat badan Anda tergolong obesitas tingkat I. Disarankan untuk mulai menjaga pola makan dan aktivitas fisik.",
    manImage: "/image/obeman.svg",
    girlImage: "/image/obegirl.svg",
    tips: [
      "Konsultasikan dengan dokter atau ahli gizi untuk mendapatkan program diet yang tepat dan aman.",
      "Lakukan olahraga rutin minimal 60 menit per hari dengan intensitas sedang.",
      "Hindari minuman manis dan perbanyak konsumsi air putih minimal 8 gelas sehari.",
    ],
  },
  {
    key: "obesitas2",
    label: "Obesitas II",
    range: "≥ 32.5",
    minBmi: 32.5,
    maxBmi: Infinity,
    titleColor: "text-red-600",
    badgeBg: "bg-red-100",
    badgeText: "text-red-700",
    activeBorder: "border-red-600",
    barColor: "#b91c1c",
    circleBg: "bg-red-50",
    description:
      "Berat badan Anda tergolong obesitas tingkat II. Segera konsultasikan dengan tenaga kesehatan.",
    manImage: "/image/obe2man.svg",
    girlImage: "/image/obe2girl.svg",
    tips: [
      "Segera konsultasikan kondisi Anda ke dokter untuk evaluasi risiko kesehatan lebih lanjut.",
      "Ikuti program penurunan berat badan terstruktur di bawah pengawasan tenaga medis.",
      "Hindari diet ekstrem tanpa pengawasan; utamakan perubahan gaya hidup bertahap dan berkelanjutan.",
    ],
  },
];

function getCategoryByBmi(bmi) {
  return CATEGORIES.find((c) => bmi >= c.minBmi && bmi < c.maxBmi) ?? CATEGORIES[1];
}

function InputField({ label, icon: Icon, placeholder, unit, value, onChange, error }) {
  return (
    <div>
      <p className="text-sm md:text-base font-medium text-neutral-90 mb-2">{label}</p>
      <div
        className={`flex items-center h-12 rounded-lg border bg-white overflow-hidden ${
          error ? "border-red-500" : "border-gray-200"
        }`}
      >
        <div className="flex items-center justify-center w-12 h-full bg-green shrink-0">
          <Icon size={16} color="white" />
        </div>
        <input
          type="number"
          inputMode="decimal"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 min-w-0 h-full px-4 text-base md:text-sm outline-none bg-transparent placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="pl-1 pr-4 text-sm text-gray-400 shrink-0">{unit}</span>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function BmiForm({ onResult }) {
  const [sex, setSex] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [tinggiBadan, setTinggiBadan] = useState("");
  const [beratBadan, setBeratBadan] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!sex) newErrors.sex = "Pilih jenis kelamin";
    if (!dateOfBirth) newErrors.dateOfBirth = "Tanggal lahir wajib diisi";
    if (!tinggiBadan || Number(tinggiBadan) <= 0)
      newErrors.tinggiBadan = "Masukkan tinggi badan yang valid";
    if (!beratBadan || Number(beratBadan) <= 0)
      newErrors.beratBadan = "Masukkan berat badan yang valid";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getErrorMessage = (json) => {
    if (json?.message) return json.message;
    if (Array.isArray(json?.errors) && json.errors.length > 0) {
      return json.errors.map((e) => e.message ?? e).join(", ");
    }
    if (typeof json?.errors === "object" && json.errors !== null) {
      return Object.values(json.errors).flat().join(", ");
    }
    return "Gagal menghitung BMI. Silakan coba lagi.";
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/bmi/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weight: parseFloat(beratBadan),
          height: parseFloat(tinggiBadan),
          sex,
          dateOfBirth: format(dateOfBirth, "yyyy-MM-dd"),
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(getErrorMessage(json));
        return;
      }

      if (!json.data) {
        toast.error("Respons tidak valid dari server.");
        return;
      }

      toast.success(json.message || "BMI berhasil dihitung!");
      const resultData = {
        ...json.data,
        sex,
        weight: parseFloat(beratBadan),
        height: parseFloat(tinggiBadan),
      };
      localStorage.setItem("bmi_result", JSON.stringify(resultData));
      onResult(resultData);
    } catch {
      toast.error("Terjadi kesalahan jaringan. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-green">Kalkulator BMI</h1>
        <p className="text-green mt-1 text-sm md:text-base">
          Hitung Indeks massa tubuh Anda
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-6 md:p-8 max-w-2xl mx-auto">
        {/* Gender */}
        <div className="mb-6">
          <p className="text-center text-base md:text-lg font-medium text-neutral-90 mb-4">
            Pilih Jenis Kelamin
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: 1, label: "Laki-laki", Icon: IconGenderMale },
              { value: 2, label: "Perempuan", Icon: IconGenderFemale },
            ].map(({ value, label, Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setSex(value);
                  if (errors.sex) setErrors((prev) => ({ ...prev, sex: "" }));
                }}
                className={`flex flex-col items-center justify-center gap-2 py-4 md:py-6 rounded-xl border-2 transition-all ${
                  sex === value
                    ? "border-green bg-green/5"
                    : "border-gray-200 hover:border-green/40"
                }`}
              >
                <Icon size={28} className={sex === value ? "text-green" : "text-gray-400"} />
                <span
                  className={`text-sm md:text-base font-medium ${
                    sex === value ? "text-green" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
          {errors.sex && (
            <p className="text-red-500 text-xs mt-1 text-center">{errors.sex}</p>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-sm md:text-base font-medium text-neutral-90 mb-2">Tanggal Lahir</p>
            <DatePicker
              value={dateOfBirth}
              onChange={(date) => {
                setDateOfBirth(date);
                if (errors.dateOfBirth) setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
              }}
              maxDate={new Date()}
              minDate={new Date(1940, 0, 1)}
              error={errors.dateOfBirth}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
            )}
          </div>
          <InputField
            label="Tinggi Badan"
            icon={IconRuler}
            placeholder="Contoh: 170"
            unit="cm"
            value={tinggiBadan}
            onChange={(e) => {
              setTinggiBadan(e.target.value);
              if (errors.tinggiBadan) setErrors((prev) => ({ ...prev, tinggiBadan: "" }));
            }}
            error={errors.tinggiBadan}
          />
          <InputField
            label="Berat Badan"
            icon={IconWeight}
            placeholder="Contoh: 65"
            unit="kg"
            value={beratBadan}
            onChange={(e) => {
              setBeratBadan(e.target.value);
              if (errors.beratBadan) setErrors((prev) => ({ ...prev, beratBadan: "" }));
            }}
            error={errors.beratBadan}
          />

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-4 rounded-xl bg-green text-white font-semibold text-base hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
          >
            {loading ? "Menghitung..." : "Hitung BMI"}
          </button>
        </div>
      </div>

      <DisclaimerSection />
      <FaqSection />
    </div>
  );
}

const FAQ_ITEMS = [
  {
    question: "Apa itu BMI atau IMT?",
    answer: (
      <>
        <p className="mb-4">
          <em>Body Mass Index (BMI)</em> atau yang juga dikenal dengan Indeks Massa Tubuh (IMT)
          adalah nilai ukur untuk mengevaluasi status gizi dengan menggunakan perbandingan antara
          berat badan dan tinggi badan.
        </p>
        <p className="mb-4">
          Nilai BMI digunakan untuk mengevaluasi apakah berat badan seseorang sudah ideal atau belum
          dan sebagai alat skrining awal untuk mengetahui risiko seseorang terhadap suatu penyakit.
        </p>
        <p className="mb-4">
          Nilai BMI yang tinggi menandakan bahwa seseorang memiliki berat badan di atas angka ideal,
          bisa jadi overweight atau obesitas. Sedangkan BMI yang rendah menandakan seseorang memiliki
          berat badan di bawah angka ideal, bisa jadi karena kekurangan gizi atau memiliki kondisi
          medis tertentu.
        </p>
        <p>
          Meskipun begitu, perhitungan BMI atau IMT ini hanya bisa digunakan sebagai skrining awal.
          Untuk mengetahui status gizi dan risiko penyakit yang valid, Kamu tetap harus melakukan
          konsultasi dan pemeriksaan lebih lanjut dengan dokter dan ahli gizi di fasilitas kesehatan.
        </p>
      </>
    ),
  },
  {
    question: "Beberapa Kondisi yang Perlu Diperhatikan Ketika Melakukan Tes BMI",
    answer: (
      <>
        <p className="mb-4">
          Meskipun <em>Body Mass Index (BMI)</em> atau Indeks Massa Tubuh (IMT) adalah metode praktis
          berstandar <em>World Health Organization (WHO)</em> untuk skrining awal status gizi, metode
          ini memiliki beberapa pengecualian:
        </p>
        <ul className="list-disc pl-5 space-y-3 mb-4">
          <li>
            Tidak membedakan lemak dan otot, BMI tidak bisa membedakan mana berat dari lemak dan mana
            berat dari otot. Seorang atlet bisa saja memiliki BMI di atas normal karena ototnya yang
            besar, namun hal ini sama sekali bukan masalah kesehatan.
          </li>
          <li>
            Bias untuk usia lanjut, seiring bertambahnya usia, massa otot cenderung menyusut dan
            digantikan oleh lemak. Seseorang bisa saja memiliki BMI normal, padahal kadar lemak di
            tubuhnya tinggi sehingga berisiko buruk bagi kesehatan.
          </li>
          <li>
            Bias pada wanita yang sedang hamil, kenaikan berat badan alami selama masa kehamilan akan
            mendongkrak angka BMI. Oleh karena itu, wanita hamil disarankan menggunakan berat badannya
            sebelum hamil untuk perhitungan yang akurat.
          </li>
        </ul>
        <p>
          Terlepas dari keterbatasan di atas, BMI tetap merupakan alat ukur yang paling mudah, cepat,
          dan diakui secara global untuk menilai risiko kesehatan dan berat badan seseorang secara
          umum.
        </p>
      </>
    ),
  },
  {
    question: "Bagaimana Rawat ID Menghitung BMI Kamu?",
    answer: (
      <>
        <p className="mb-4">
          Rawat ID menghitung <em>Body Mass Index (BMI)</em> atau Indeks Massa Tubuh (IMT) Kamu dengan
          rumus dasar yang membandingkan berat badan (dalam kilogram) dengan tinggi badan (dalam meter
          persegi).
        </p>
        <p className="mb-4">
          Agar hasil yang didapatkan akurat dan terpercaya, seluruh sistem perhitungan kami mengacu
          secara ketat pada standar resmi yang ditetapkan oleh{" "}
          <em>World Health Organization (WHO)</em>. Karena komposisi dan perkembangan tubuh manusia
          berbeda-beda pada setiap fase kehidupan, Rawat ID menyesuaikan pengukuran BMI ke dalam tiga
          kelompok usia standar WHO:
        </p>
        <ul className="list-disc pl-5 space-y-3 mb-4">
          <li>
            <strong className="font-semibold">Usia 0–5 Tahun</strong>, pada masa emas pertumbuhan ini,
            pengukuran BMI digunakan bersama grafik pertumbuhan khusus untuk memantau status gizi
            secara presisi, guna mencegah stunting, gizi buruk, maupun risiko kelebihan berat badan
            dini.
          </li>
          <li>
            <strong className="font-semibold">Usia 5–19 Tahun</strong>, karena anak-anak dan remaja
            masih dalam masa pertumbuhan dan pubertas, nilai BMI pada rentang usia ini tidak bisa
            disamaratakan. Rawat ID memproses hasilnya dengan mempertimbangkan faktor umur dan jenis
            kelamin berdasarkan kurva pertumbuhan WHO.
          </li>
          <li>
            <strong className="font-semibold">Usia di Atas 19 Tahun</strong>, untuk orang dewasa yang
            masa pertumbuhannya sudah berhenti, Rawat ID menggunakan metode perhitungan persentase BMI
            standar dengan ambang batas (kategori kurus, normal, overweight, atau obesitas) yang
            berlaku secara umum.
          </li>
        </ul>
        <p>
          Dengan sistem yang terkalibrasi berdasarkan kelompok usia ini, diharapkan perhitungan nilai
          BMI Kamu menjadi lebih relevan, akurat, dan sesuai dengan standar kesehatan global.
        </p>
      </>
    ),
  },
  {
    question: "Mengapa Saya Harus Mengukur BMI?",
    answer: (
      <>
        <p className="mb-4">
          Mengetahui <em>Body Mass Index (BMI)</em> adalah langkah awal yang krusial untuk memantau
          rasio lemak tubuh terhadap tinggi badan. Menjaga BMI pada rentang yang sehat secara umum akan
          mengarah pada kualitas hidup yang lebih baik, sehat, dan bahagia.
        </p>
        <p className="mb-4">
          Selain itu, data BMI juga sangat berguna bagi Kamu dan tenaga kesehatan sebagai bahan
          pertimbangan dalam mengambil keputusan terkait perawatan tubuh Kamu.
        </p>
        <p className="mb-4">
          Angka BMI yang tinggi sering kali menjadi indikator awal atau peringatan terhadap peluang
          munculnya penyakit serius. Beberapa masalah kesehatan yang berkaitan erat dengan BMI tinggi.
        </p>
        <p className="mb-4">
          Meski sangat berguna, penting untuk dipahami bahwa BMI hanyalah{" "}
          <strong className="font-semibold">alat skrining awal</strong>, bukan tolok ukur diagnosis
          pasti untuk menentukan tingkat kegemukan atau status kesehatan seseorang.
        </p>
        <p className="mb-4">
          Jika hasil BMI Kamu menunjukkan angka yang tinggi, hal tersebut tidak selalu langsung
          diartikan sebagai kondisi medis yang gawat.
        </p>
        <p>
          Namun, untuk memastikan apakah ada risiko kesehatan yang nyata, Kamu tetap sangat disarankan
          untuk melakukan pemeriksaan dan penilaian lebih lanjut secara langsung dengan dokter atau
          tenaga kesehatan profesional.
        </p>
      </>
    ),
  },
  {
    question: "Bagaimana Jika Seseorang Kekurangan Berat Badan?",
    answer: (
      <>
        <p className="mb-4">
          Menurut <em>World Health Organization (WHO)</em>, seseorang dikategorikan kekurangan berat
          badan (underweight) jika hasil Body Mass Index (BMI) mereka berada di bawah 18.5.
        </p>
        <p className="mb-4">
          Kondisi ini bisa jadi merupakan indikator medis bahwa tubuh mungkin tidak mendapatkan kalori
          atau nutrisi yang cukup untuk berfungsi secara optimal.
        </p>
        <p className="mb-4">
          Berada di bawah berat badan normal dalam jangka waktu yang lama dapat memicu berbagai
          komplikasi kesehatan, antara lain:
        </p>
        <ul className="list-disc pl-5 space-y-3 mb-4">
          <li>
            Sistem kekebalan tubuh melemah, sehingga tubuh kesulitan melawan infeksi, lebih mudah sakit,
            dan butuh waktu lebih lama untuk sembuh.
          </li>
          <li>
            Kekurangan nutrisi, seperti kurangnya asupan vitamin dan mineral penting yang bisa
            menyebabkan anemia atau rambut rontok.
          </li>
          <li>
            Memiliki risiko osteoporosis, karena tulang membutuhkan berat badan dan nutrisi yang cukup
            untuk menjaga kepadatannya. Kekurangan berat badan meningkatkan risiko tulang rapuh dan
            patah tulang di kemudian hari.
          </li>
          <li>
            Memiliki gangguan kesuburan, pada wanita, underweight dapat menyebabkan siklus menstruasi
            tidak teratur atau berhenti yang bisa berdampak pada tingkat kesuburan.
          </li>
        </ul>
        <p>
          Jika dari skrining awal BMI menunjukkan kamu kekurangan berat badan, konsultasikan kondisi
          kesehatanmu ke dokter dan ahli gizi di fasilitas kesehatan terdekat untuk mendapatkan
          pemeriksaan lebih lanjut.
        </p>
      </>
    ),
  },
  {
    question: "Bagaimana Jika Seseorang Kelebihan Berat Badan?",
    answer: (
      <>
        <p className="mb-4">
          Menurut <em>World Health Organization (WHO)</em>, seseorang dikategorikan kelebihan berat
          badan (overweight) jika hasil Body Mass Index (BMI) mereka berada di kisaran 25.0 hingga
          29.9. Jika angka BMI mencapai 30.0 atau lebih, kondisi tersebut sudah masuk ke dalam kategori
          obesitas.
        </p>
        <p className="mb-4">
          Berada di atas batas berat badan normal menunjukkan adanya penumpukan lemak berlebih yang
          dapat mengganggu kesehatan.
        </p>
        <p className="mb-4">
          Kelebihan berat badan yang dibiarkan terus-menerus dapat meningkatkan risiko berbagai
          penyakit kronis, di antaranya:
        </p>
        <ul className="list-disc pl-5 space-y-3">
          <li>
            Risiko terkena penyakit kardiovaskular yang disebabkan oleh kerja jantung meningkat,
            sehingga risiko hipertensi atau darah tinggi, penyakit jantung koroner, dan stroke menjadi
            lebih tinggi.
          </li>
          <li>
            Risiko terkena diabetes tipe 2, karena lemak tubuh yang berlebih, terutama di area perut,
            dapat menyebabkan sel tubuh menjadi kebal terhadap insulin atau terjadi resistensi insulin
            sehingga kadar gula darah melonjak.
          </li>
          <li>
            Risiko terjadinya gangguan muskuloskeletal, karena berat badan berlebih memberikan tekanan
            berlebih pada persendian seperti lutut dan pinggul yang sangat berisiko memicu osteoarthritis
            atau pengapuran sendi.
          </li>
          <li>
            Risiko terjadinya gangguan pernapasan seperti sleep apnea atau gangguan di mana pernapasan
            sering berhenti sejenak saat tidur. Hal ini sangat umum terjadi pada orang yang memiliki
            berat badan berlebih.
          </li>
          <li>
            Risiko terjadinya kanker tertentu, WHO mencatat bahwa kelebihan berat badan dan obesitas
            berkaitan erat dengan peningkatan risiko beberapa jenis kanker, seperti kanker payudara,
            usus besar, ginjal, dan hati.
          </li>
        </ul>
      </>
    ),
  },
];

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-2xl mx-auto mt-10">
      <h2 className="flex items-center gap-2 font-[family-name:var(--font-poppins)] text-[20px] font-medium leading-[1.4] tracking-normal text-neutral-90 mb-6">
        <IconHelpCircle size={26} className="text-neutral-90" />
        Pertanyaan yang sering ditanyakan (FAQ)
      </h2>

      <div className="flex flex-col gap-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border overflow-hidden transition-colors ${
                isOpen ? "bg-[#EBF6F9] border-[#D8EDEE]" : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 text-left px-5 md:px-6 py-5"
              >
                <h2 className="text-base md:text-lg font-semibold text-green">
                  {item.question}
                </h2>
                <IconChevronDown
                  size={22}
                  className={`shrink-0 text-green transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 md:px-6 pb-5 -mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DisclaimerSection() {
  const ageGroups = [
    "Usia 0-5 tahun (Balita)",
    "Usia 5-19 tahun (Anak dan Remaja)",
    "Usia di atas 19 tahun (Dewasa)",
  ];

  return (
    <section
      className="max-w-2xl mx-auto mt-6 rounded-2xl p-6 md:p-8 text-[#8A3A3E]"
      style={{ backgroundColor: "#F2DFE3" }}
    >
      <span
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white text-sm md:text-base font-semibold"
        style={{ backgroundColor: "#EBA5A7" }}
      >
        <IconShieldExclamation size={20} />
        Disclaimer &amp; Informasi Pengukuran
      </span>

      <div className="mt-6">
        <h2 className="text-lg md:text-xl font-bold text-[#7A2E33] mb-3">
          Bukan Pengganti Diagnosis Medis
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4">
          Kalkulator BMI Rawat ID dirancang sebagai alat skrining awal mandiri untuk memberikan
          gambaran umum mengenai status gizi dan risiko kesehatan.
        </p>
        <p className="text-sm md:text-base leading-relaxed">
          Alat ini <strong className="font-bold text-[#7A2E33]">bukanlah diagnosis medis</strong> dan
          tidak dapat menggantikan saran, diagnosis, atau perawatan dari profesional medis. Kami sangat
          menyarankan Anda untuk berkonsultasi lebih lanjut dengan dokter atau ahli gizi guna memastikan
          kondisi kesehatan dan status gizi Anda secara akurat.
        </p>
      </div>

      <hr className="my-6 border-t border-[#E0B5B8]" />

      <div>
        <h2 className="text-lg md:text-xl font-bold text-[#7A2E33] mb-3">
          Standar Pengukuran Internasional (WHO)
        </h2>
        <p className="text-sm md:text-base leading-relaxed mb-4">
          Perhitungan BMI atau Indeks Massa Tubuh (IMT) di Rawat ID dilakukan dengan membandingkan
          rasio berat dan tinggi badan. Seluruh sistem perhitungan kami mengacu secara ketat pada
          standar resmi <em>World Health Organization (WHO)</em>.
        </p>
        <p className="text-sm md:text-base leading-relaxed mb-4">
          Untuk menjamin tingkat akurasi yang relevan dengan tahap perkembangan tubuh, Rawat ID telah
          menerapkan penyesuaian metode pengukuran WHO ke dalam tiga kelompok usia, yaitu:
        </p>

        <div className="flex flex-col gap-3 mb-4">
          {ageGroups.map((label) => (
            <div
              key={label}
              className="px-4 py-3 rounded-xl text-sm md:text-base font-medium text-[#7A2E33]"
              style={{ backgroundColor: "#E3AEB1" }}
            >
              {label}
            </div>
          ))}
        </div>

        <p className="text-sm md:text-base leading-relaxed">
          Dengan sistem yang terkalibrasi berdasarkan kelompok usia ini, diharapkan perhitungan nilai
          BMI kamu menjadi lebih relevan, akurat, dan sesuai dengan standar kesehatan global.
        </p>
      </div>
    </section>
  );
}

function BmiResult({ data, onReset }) {
  const { bmi, sex, weight, height, percentile, category } = data;
  const activeCategory = getCategoryByBmi(bmi);
  const isGirl = sex === 2;
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const scrollRef = useRef(null);
  const activeCardRef = useRef(null);

  // On mobile, center the user's active category card on load.
  useEffect(() => {
    const container = scrollRef.current;
    const card = activeCardRef.current;
    if (!container || !card) return;
    if (window.innerWidth >= 768) return;
    const left = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
    container.scrollTo({ left, behavior: "auto" });
  }, []);

  const handleSave = async () => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      toast.info("Silakan masuk terlebih dahulu untuk menyimpan hasil.");
      router.push("/signin");
      return;
    }

    setSaving(true);
    try {
      const res = await authFetch("/api/bmi/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bmi: parseFloat(Number(bmi).toFixed(2)),
          percentile: parseFloat(percentile) || 0,
          category: category ?? activeCategory.label,
          weight: parseFloat(weight) || 0,
          height: parseFloat(height) || 0,
        }),
      });

      const json = await res.json();

      const isAuthError =
        res.status === 401 ||
        /token/i.test(json?.message || "");

      if (isAuthError) {
        clearSession();
        toast.error("Sesi Anda telah berakhir. Silakan masuk kembali.");
        router.push("/signin");
        return;
      }

      if (!res.ok) {
        toast.error(json.message || "Gagal menyimpan hasil BMI.");
        return;
      }

      toast.success(json.message || "Hasil BMI berhasil disimpan!");
      router.push("/riwayat-bmi");
    } catch {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      {/* BMI Value */}
      <div className="text-center mb-8">
        <p className="text-gray-500 text-sm md:text-base mb-1">BMI Kamu</p>
        <p className="text-5xl md:text-6xl font-bold text-green">
          {Number(bmi).toFixed(2)}
        </p>
      </div>

      {/* Category Cards */}
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory md:snap-none"
      >
        <div className="flex gap-3 md:grid md:grid-cols-5 md:gap-4">
          {CATEGORIES.map((cat) => {
            const isActive = cat.key === activeCategory.key;
            const imageSrc = isGirl ? cat.girlImage : cat.manImage;

            return (
              <div
                key={cat.key}
                ref={isActive ? activeCardRef : null}
                className={`flex flex-col items-center rounded-2xl border-2 pt-4 pb-4 px-3 w-full shrink-0 snap-center md:w-auto md:shrink transition-all shadow-sm ${
                  isActive
                    ? `${cat.activeBorder} bg-white`
                    : "border-gray-200 bg-white opacity-75"
                }`}
              >
                {/* Label */}
                <span
                  className={`text-sm font-semibold px-4 py-1 rounded-full mb-4 ${
                    isActive
                      ? `${cat.badgeBg} ${cat.titleColor}`
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {cat.label}
                </span>

                {/* Body image */}
                <div className="relative w-full h-48 md:h-64 mb-4">
                  <Image
                    src={imageSrc}
                    alt={cat.label}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Range badge */}
                <span
                  className={`text-sm font-bold px-4 py-1 rounded-full mb-3 ${
                    isActive
                      ? `${cat.badgeBg} ${cat.badgeText}`
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {cat.range}
                </span>

                {/* Description */}
                <p className="text-xs text-center text-gray-500 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Bar */}
      <div className="mt-6">
        {/* Bar + indicator */}
        <div className="relative">
          <div className="flex rounded-full overflow-hidden h-3">
            {CATEGORIES.map((cat) => (
              <div key={cat.key} className="flex-1" style={{ backgroundColor: cat.barColor }} />
            ))}
          </div>
          {/* Triangle indicator */}
          <div
            className="absolute top-full mt-1 -translate-x-1/2 flex flex-col items-center"
            style={{
              left: `${(CATEGORIES.indexOf(activeCategory) * 20) + 10}%`,
            }}
          >
            {/* Triangle pointing up */}
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "6px solid transparent",
                borderRight: "6px solid transparent",
                borderBottom: `8px solid ${activeCategory.barColor}`,
              }}
            />
          </div>
        </div>

        <div className="hidden md:flex mt-5">
          {CATEGORIES.map((cat) => (
            <div key={cat.key} className="flex-1 text-center">
              <span className={`text-xs font-medium ${cat.badgeText}`}>{cat.range}</span>
            </div>
          ))}
        </div>
        <div className="flex md:hidden mt-4 gap-2 flex-wrap justify-center">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.key}
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                cat.key === activeCategory.key ? `${cat.badgeBg} ${cat.badgeText}` : "bg-gray-100 text-gray-400"
              }`}
            >
              {cat.label}: {cat.range}
            </span>
          ))}
        </div>
      </div>

      {/* Tips */}
      <div className="mt-6 border border-gray-200 rounded-2xl p-5 md:p-6">
        <p className={`font-semibold text-base mb-3 ${activeCategory.titleColor}`}>
          3 Tips untuk Anda
        </p>
        <ol className="flex flex-col gap-2">
          {activeCategory.tips.map((tip, i) => (
            <li key={i} className="text-sm text-gray-700 leading-relaxed">
              {i + 1}. {tip}
            </li>
          ))}
        </ol>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
        <button
          onClick={onReset}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-green text-green font-semibold text-sm hover:bg-green/5 transition-colors"
        >
          <IconRefresh size={18} />
          Cek Ulang
        </button>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <IconBookmark size={18} />
          {saving ? "Menyimpan..." : "Simpan Hasil"}
        </button>
      </div>
    </div>
  );
}

export default function KalkulatorBmiForm() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("bmi_result");
    if (saved) {
      try {
        setResult(JSON.parse(saved));
      } catch {
        localStorage.removeItem("bmi_result");
      }
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem("bmi_result");
    setResult(null);
  };

  if (result) {
    return <BmiResult data={result} onReset={handleReset} />;
  }

  return <BmiForm onResult={setResult} />;
}
