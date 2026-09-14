"use client";

import {
  IconGenderMale,
  IconGenderFemale,
  IconScaleOutline,
  IconRulerMeasure,
  IconUserFilled,
} from "@tabler/icons-react";

// Nilai sex yang diterima API /tdee/* dan /bmr/*.
const GENDERS = [
  { value: "male", label: "Laki-laki", Icon: IconGenderMale },
  { value: "female", label: "Perempuan", Icon: IconGenderFemale },
];

export const CARD_CLASS = "bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] max-w-3xl mx-auto";

export function IconBox({ icon: Icon }) {
  return (
    <div className="flex items-center justify-center w-11 h-full bg-green shrink-0">
      <Icon size={18} color="white" />
    </div>
  );
}

export function InputField({ label, icon, placeholder, unit, value, onChange, step }) {
  return (
    <div>
      <p className="text-base md:text-lg text-neutral-90 mb-2">{label}</p>
      <div className="flex items-center h-11 rounded-md border border-gray-200 bg-white overflow-hidden">
        <IconBox icon={icon} />
        <input
          type="number"
          inputMode={step === "1" ? "numeric" : "decimal"}
          min="0"
          step={step}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="flex-1 min-w-0 h-full px-3 text-base md:text-sm outline-none bg-transparent placeholder:text-gray-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="pl-1 pr-3 text-sm text-gray-400 shrink-0">{unit}</span>
      </div>
    </div>
  );
}

// Jenis kelamin, berat badan, tinggi badan, dan usia — dipakai oleh form
// dari useBodyForm().
export function BodyFields({ form }) {
  const { values, setSex, setBeratBadan, setTinggiBadan, setUsia } = form;

  return (
    <>
      <div>
        <p className="text-base md:text-lg text-neutral-90 mb-2">Jenis Kelamin</p>
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {GENDERS.map(({ value, label, Icon }) => {
            const isActive = values.sex === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setSex(value)}
                aria-pressed={isActive}
                className={`flex flex-col items-center justify-center gap-1.5 h-[72px] md:h-[84px] rounded-md border transition-colors ${
                  isActive ? "border-green bg-green/5 text-green" : "border-gray-200 text-gray-800 hover:border-green/40"
                }`}
              >
                <Icon size={24} />
                <span className="text-sm">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <InputField
        label="Berat Badan"
        icon={IconScaleOutline}
        placeholder="Contoh: 65"
        unit="kg"
        value={values.beratBadan}
        onChange={(e) => setBeratBadan(e.target.value)}
      />
      <InputField
        label="Tinggi Badan"
        icon={IconRulerMeasure}
        placeholder="Contoh: 170"
        unit="cm"
        value={values.tinggiBadan}
        onChange={(e) => setTinggiBadan(e.target.value)}
      />
      <InputField
        label="Usia"
        icon={IconUserFilled}
        placeholder="Contoh: 25"
        unit="thn"
        step="1"
        value={values.usia}
        onChange={(e) => setUsia(e.target.value)}
      />
    </>
  );
}

export function SubmitButton({ disabled, loading, children }) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className="w-full h-11 rounded-md bg-green text-white text-sm md:text-base font-medium transition-colors hover:bg-greenHover disabled:bg-green/45 disabled:cursor-not-allowed"
    >
      {loading ? "Menghitung..." : children}
    </button>
  );
}

// Judul halaman kalkulator: "Kalkulator XXX (<i>Nama Lengkap</i>)" + subjudul.
export function CalculatorHeading({ abbr, fullName, subtitle }) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-xl md:text-2xl font-semibold text-green">
        Kalkulator {abbr} (<i>{fullName}</i>)
      </h1>
      <p className="text-green mt-2 text-base md:text-lg max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}

// Kotak info hijau di bawah form / hasil. `sections` = [{ title, paragraphs }].
export function InfoBox({ sections }) {
  return (
    <section className="max-w-3xl mx-auto mt-10 rounded-lg border border-green bg-green p-5 md:p-6 text-white">
      {sections.map((s, idx) => (
        <div key={idx}>
          {idx > 0 ? <hr className="my-6 border-white/70" /> : null}
          <h2 className="text-base md:text-lg font-medium">{s.title}</h2>
          <div className="mt-3 space-y-3 text-sm md:text-[15px] leading-relaxed">
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
