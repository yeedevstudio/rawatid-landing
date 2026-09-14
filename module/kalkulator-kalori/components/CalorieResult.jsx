"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconRefresh, IconBookmarkFilled } from "@tabler/icons-react";
import { authFetch, clearSession } from "@/common/utils/auth";
import { CARD_CLASS, InfoBox } from "./FormFields";
import { formatKkal, getErrorMessage } from "../utils";

// Halaman hasil Kalkulator TDEE / BMR: kartu nilai kkal, kotak info, lalu
// tombol Cek Ulang & Simpan Hasil.
//
// save: { abbr, pendingLoginKey, historyApi, historyUrl, body }
// formatValue: cara menampilkan nilai kkal (default dibulatkan tanpa desimal).
export default function CalorieResult({
  abbr,
  fullName,
  value,
  formatValue = formatKkal,
  paragraphs,
  infoSections,
  save,
  onReset,
}) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) {
      // Tamu: hasil sudah tersimpan di localStorage. Tandai supaya setelah
      // login user diarahkan kembali ke halaman hasil ini untuk menyimpannya.
      localStorage.setItem(save.pendingLoginKey, "1");
      toast.info(`Silakan masuk atau daftar untuk menyimpan hasil ${abbr} kamu.`);
      router.push("/signin");
      return;
    }

    setSaving(true);
    try {
      const res = await authFetch(save.historyApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(save.body),
      });
      const json = await res.json();

      if (res.status === 401 || /token/i.test(json?.message || "")) {
        clearSession();
        toast.error("Sesi Anda telah berakhir. Silakan masuk kembali.");
        router.push("/signin");
        return;
      }

      if (!res.ok) {
        toast.error(getErrorMessage(json, `Gagal menyimpan hasil ${abbr}.`));
        return;
      }

      toast.success(json?.message || `Hasil ${abbr} berhasil disimpan!`);
      router.push(save.historyUrl);
    } catch {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full">
      <div className={`${CARD_CLASS} p-6 md:px-14 md:py-9`}>
        <h1 className="text-center text-lg md:text-2xl text-gray-900 max-w-xl mx-auto">
          Hasil Perhitungan {abbr} atau <i>{fullName}</i> anda adalah :
        </h1>
        <p className="mt-6 md:mt-8 text-center text-4xl md:text-6xl font-semibold text-green">
          {formatValue(value)} kkal
        </p>
        <div className="mt-8 md:mt-10 space-y-5 text-sm md:text-base text-gray-800 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      <InfoBox sections={infoSections} />

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7 mt-10">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[200px] h-[52px] px-8 rounded-md border border-green text-green font-medium text-base md:text-lg hover:bg-green/5 transition-colors"
        >
          <IconRefresh size={22} />
          Cek Ulang
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 w-full sm:w-auto sm:min-w-[200px] h-[52px] px-8 rounded-md bg-green text-white font-medium text-base md:text-lg hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <IconBookmarkFilled size={22} />
          {saving ? "Menyimpan..." : "Simpan Hasil"}
        </button>
      </div>
    </div>
  );
}
