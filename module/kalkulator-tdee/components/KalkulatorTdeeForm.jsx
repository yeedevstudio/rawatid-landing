"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IconUserFilled, IconChevronDown, IconCheck } from "@tabler/icons-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  BodyFields,
  CARD_CLASS,
  CalculatorHeading,
  IconBox,
  InfoBox,
  SubmitButton,
} from "@/module/kalkulator-kalori/components/FormFields";
import CalorieResult from "@/module/kalkulator-kalori/components/CalorieResult";
import { useBodyForm, useStoredResult, useUserProfile } from "@/module/kalkulator-kalori/hooks";
import {
  getErrorMessage,
  isBodyComplete,
  normalizeActivityLevels,
  num,
  toBodyPayload,
} from "@/module/kalkulator-kalori/utils";
import {
  TDEE_HISTORY_URL,
  TDEE_INFO_SECTIONS,
  TDEE_PENDING_LOGIN_KEY,
  TDEE_RESULT_KEY,
} from "../constants";

const FULL_NAME = "Total Daily Energy Expenditure";

// Tampilkan persis seperti data.tdee dari response (mis. 2420.3), tanpa pembulatan.
const showRawTdee = (v) => String(v);

// Dropdown custom (bukan <select>) supaya tetap bisa dibuka saat data sedang
// dimuat, gagal dimuat, atau kosong — dan menampilkan keterangannya di dalam.
function ActivitySelect({ value, onChange, options, isLoading, error }) {
  const [open, setOpen] = useState(false);
  const selected = options.find((a) => String(a.id) === value);

  return (
    <div>
      <p className="text-base md:text-lg text-neutral-90 mb-5">Tingkat Aktivitas</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            className={`flex items-center w-full h-11 rounded-md border bg-white overflow-hidden text-left transition-colors ${
              open ? "border-green" : "border-gray-200"
            }`}
          >
            <IconBox icon={IconUserFilled} />
            <span
              className={`flex-1 min-w-0 truncate px-3 text-base md:text-sm ${
                selected ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {selected?.label || "Aktivitas Sedang"}
            </span>
            <IconChevronDown
              size={18}
              className={`mr-3 shrink-0 text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] p-1">
          {isLoading ? (
            <p className="px-3 py-2.5 text-sm text-gray-500">Memuat tingkat aktivitas...</p>
          ) : error ? (
            <p className="px-3 py-2.5 text-sm text-red-500">{error}</p>
          ) : !options.length ? (
            <p className="px-3 py-2.5 text-sm text-gray-500">Data tingkat aktivitas belum tersedia.</p>
          ) : (
            <ul role="listbox" aria-label="Tingkat Aktivitas" className="max-h-64 overflow-y-auto">
              {options.map((a) => {
                const isActive = String(a.id) === value;
                return (
                  <li key={a.id} role="option" aria-selected={isActive}>
                    <button
                      type="button"
                      onClick={() => {
                        onChange(String(a.id));
                        setOpen(false);
                      }}
                      className={`flex items-center justify-between w-full rounded px-3 py-2.5 text-left text-sm transition-colors ${
                        isActive ? "bg-green/10 text-green" : "text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      {a.label}
                      {isActive ? <IconCheck size={16} className="shrink-0" /> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

function TdeeForm({ onResult, profile }) {
  const form = useBodyForm(profile);
  const [aktivitas, setAktivitas] = useState("");
  const [loading, setLoading] = useState(false);
  const [activityLevels, setActivityLevels] = useState([]);
  const [isLoadingLevels, setIsLoadingLevels] = useState(true);
  const [levelsError, setLevelsError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setIsLoadingLevels(true);
        setLevelsError("");
        const res = await fetch("/api/tdee/physical-activity-levels", { signal: controller.signal });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Gagal memuat tingkat aktivitas");
        setActivityLevels(normalizeActivityLevels(json));
      } catch (e) {
        if (e?.name !== "AbortError") setLevelsError(e?.message || "Gagal memuat tingkat aktivitas");
      } finally {
        setIsLoadingLevels(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const isComplete = isBodyComplete(form.values) && Boolean(aktivitas);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isComplete || loading) return;

    const input = { ...toBodyPayload(form.values), physicalActivityLevelId: Number(aktivitas) };

    setLoading(true);
    try {
      const res = await fetch("/api/tdee/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      const json = await res.json();

      if (!res.ok) {
        toast.error(getErrorMessage(json, "Gagal menghitung TDEE. Silakan coba lagi."));
        return;
      }

      // Bentuk response sukses belum bisa dicek (data tingkat aktivitas masih
      // kosong), jadi field dibaca dari beberapa kemungkinan nama.
      const d = json?.data ?? json ?? {};
      const tdee = num(d.tdee, d.TDEE);
      if (tdee === null) {
        toast.error("Respons tidak valid dari server.");
        return;
      }

      const level = activityLevels.find((a) => a.id === input.physicalActivityLevelId);
      toast.success(json?.message || "TDEE berhasil dihitung!");
      onResult({
        ...input,
        bmr: num(d.bmr, d.BMR),
        pal_value: num(d.pal_value, d.palValue, d.pal, level?.palValue),
        tdee,
      });
    } catch {
      toast.error("Terjadi kesalahan jaringan. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <CalculatorHeading
        abbr="TDEE"
        fullName={FULL_NAME}
        subtitle="Hitung perkiraan berapa banyak kalori yang dibakar per hari berdasarkan tubuh dan aktivitas fisik harian kamu."
      />

      <form onSubmit={handleSubmit} className={`${CARD_CLASS} p-6 md:px-12 md:py-10`}>
        <div className="flex flex-col gap-5">
          <BodyFields form={form} />
          <ActivitySelect
            value={aktivitas}
            onChange={setAktivitas}
            options={activityLevels}
            isLoading={isLoadingLevels}
            error={levelsError}
          />
          <SubmitButton disabled={!isComplete} loading={loading}>
            Hitung TDEE
          </SubmitButton>
        </div>
      </form>

      <InfoBox sections={TDEE_INFO_SECTIONS} />
    </div>
  );
}

export default function KalkulatorTdeeForm() {
  const profile = useUserProfile();
  const { result, save, reset } = useStoredResult(TDEE_RESULT_KEY);

  if (result) {
    return (
      <CalorieResult
        abbr="TDEE"
        fullName={FULL_NAME}
        value={result.tdee}
        formatValue={showRawTdee}
        paragraphs={[
          "Disarankan untuk mengkonsumsi makanan dengan total kalori harian di sekitaran angka tersebut jika anda ingin mempertahan berat badan anda saat ini.",
          "Namun jika tujuannya untuk menurunkan berat badan, disarankan untuk memiliki asumsi kalori harian lebih rendah dari angka tersebut, dan jika tujuan untuk menambah berat badan, makan disarankan untuk memiliki asupan kalori harian diatas angka tersebut.",
        ]}
        infoSections={TDEE_INFO_SECTIONS}
        save={{
          pendingLoginKey: TDEE_PENDING_LOGIN_KEY,
          historyApi: "/api/tdee/history",
          historyUrl: TDEE_HISTORY_URL,
          body: {
            age: result.age,
            sex: result.sex,
            weight: result.weight,
            height: result.height,
            bmr: result.bmr,
            physicalActivityLevelId: result.physicalActivityLevelId,
            pal_value: result.pal_value,
            tdee: result.tdee,
          },
        }}
        onReset={reset}
      />
    );
  }

  return <TdeeForm onResult={save} profile={profile} />;
}
