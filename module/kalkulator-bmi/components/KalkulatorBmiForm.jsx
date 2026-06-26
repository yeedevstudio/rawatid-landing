"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import {
  IconGenderMale,
  IconGenderFemale,
  IconUser,
  IconRuler,
  IconWeight,
  IconRefresh,
  IconBookmark,
} from "@tabler/icons-react";
import DatePicker from "@/common/components/DatePicker";
import { format } from "date-fns";

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
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 h-full px-4 text-sm outline-none bg-transparent placeholder:text-gray-400"
        />
        <span className="pr-4 text-sm text-gray-400 shrink-0">{unit}</span>
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
    </div>
  );
}

function BmiResult({ data, onReset }) {
  const { bmi, sex, weight, height, percentile, category } = data;
  const activeCategory = getCategoryByBmi(bmi);
  const isGirl = sex === 2;
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/bmi/history", {
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

      if (!res.ok) {
        toast.error(json.message || "Gagal menyimpan hasil BMI.");
        return;
      }

      toast.success(json.message || "Hasil BMI berhasil disimpan!");
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
      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-3 min-w-max md:min-w-0 md:grid md:grid-cols-5 md:gap-4">
          {CATEGORIES.map((cat) => {
            const isActive = cat.key === activeCategory.key;
            const imageSrc = isGirl ? cat.girlImage : cat.manImage;

            return (
              <div
                key={cat.key}
                className={`flex flex-col items-center rounded-2xl border-2 pt-4 pb-4 px-3 w-52 md:w-auto transition-all shadow-sm ${
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
