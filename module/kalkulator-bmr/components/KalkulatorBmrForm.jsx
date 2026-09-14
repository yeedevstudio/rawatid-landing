"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  BodyFields,
  CARD_CLASS,
  CalculatorHeading,
  InfoBox,
  SubmitButton,
} from "@/module/kalkulator-kalori/components/FormFields";
import CalorieResult from "@/module/kalkulator-kalori/components/CalorieResult";
import { useBodyForm, useStoredResult, useUserProfile } from "@/module/kalkulator-kalori/hooks";
import { getErrorMessage, isBodyComplete, num, toBodyPayload } from "@/module/kalkulator-kalori/utils";
import { BMR_HISTORY_URL, BMR_INFO_SECTIONS, BMR_PENDING_LOGIN_KEY, BMR_RESULT_KEY } from "../constants";

const FULL_NAME = "Basal Metabolic Rate";

// Tampilkan persis seperti data.bmr dari response (mis. 1728.8), tanpa pembulatan.
const showRawBmr = (v) => String(v);

function BmrForm({ onResult, profile }) {
  const form = useBodyForm(profile);
  const [loading, setLoading] = useState(false);

  const isComplete = isBodyComplete(form.values);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isComplete || loading) return;

    const input = toBodyPayload(form.values);

    setLoading(true);
    try {
      const res = await fetch("/api/bmr/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();

      if (!res.ok) {
        toast.error(getErrorMessage(json, "Gagal menghitung BMR. Silakan coba lagi."));
        return;
      }

      // Response: { status: "success", data: { bmr: 1642.5, unit: "kcal/day" } }
      const bmr = num(json?.data?.bmr);
      if (bmr === null) {
        toast.error("Respons tidak valid dari server.");
        return;
      }

      toast.success(json?.message || "BMR berhasil dihitung!");
      onResult({ ...input, bmr });
    } catch {
      toast.error("Terjadi kesalahan jaringan. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <CalculatorHeading
        abbr="BMR"
        fullName={FULL_NAME}
        subtitle="Hitung jumlah minimum kalori yang dibakar tubuh saat istirahat untuk mempertahankan fungsi-fungsi penting tubuh."
      />

      <form onSubmit={handleSubmit} className={`${CARD_CLASS} p-6 md:px-12 md:py-10`}>
        <div className="flex flex-col gap-5">
          <BodyFields form={form} />
          <SubmitButton disabled={!isComplete} loading={loading}>
            Hitung BMR
          </SubmitButton>
        </div>
      </form>

      <InfoBox sections={BMR_INFO_SECTIONS} />
    </div>
  );
}

export default function KalkulatorBmrForm() {
  const profile = useUserProfile();
  const { result, save, reset } = useStoredResult(BMR_RESULT_KEY);

  if (result) {
    return (
      <CalorieResult
        abbr="BMR"
        fullName={FULL_NAME}
        value={result.bmr}
        formatValue={showRawBmr}
        paragraphs={[
          "Ini adalah jumlah kalori yang dibutuhkan oleh tubuh anda pada saat istirahat untuk mempertahankan fungsi-fungsi penting tubuh seperti bernapas, memompa darah, memelihara suhu tubuh dan produksi sel.",
          <>
            Anda bisa menggunakan jumlah kalori hasil dari perhitungan <i>Basal Metabolic Rate</i> untuk menghitung
            jumlah kalori harian yang dibutuhkan tubuh saat beraktivitas dengan mengalikan nilai BMR dengan nilai
            aktivitas fisik harian (PAL/Physical Activity Level).
          </>,
        ]}
        infoSections={BMR_INFO_SECTIONS}
        save={{
          pendingLoginKey: BMR_PENDING_LOGIN_KEY,
          historyApi: "/api/bmr/history",
          historyUrl: BMR_HISTORY_URL,
          body: {
            age: result.age,
            sex: result.sex,
            weight: result.weight,
            height: result.height,
            bmr: result.bmr,
          },
        }}
        onReset={reset}
      />
    );
  }

  return <BmrForm onResult={save} profile={profile} />;
}
