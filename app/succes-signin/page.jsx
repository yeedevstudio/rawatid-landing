import Link from "next/link";
import { IconShieldCheck } from "@tabler/icons-react";

export const metadata = {
  title: "Berhasil Masuk | Rawat.id",
};

export default async function SuccesSigninPage({ searchParams }) {
  const params = await searchParams;
  // ?from=bmi → user arrived here through the "Simpan Hasil BMI" flow.
  const fromBmi = params?.from === "bmi";

  const buttonLabel = fromBmi ? "Lihat Riwayat Pemeriksaan BMI" : "Lihat Profil Akun";
  const buttonHref = fromBmi ? "/alat-kesehatan/kalkulator-bmi" : "/perbarui-akun";

  return (
    <div className="min-h-[calc(100vh-85px)] flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] p-10 md:p-12">
        {/* Checkmark */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-greenImage flex items-center justify-center">
            <svg
              className="w-9 h-9 text-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl font-bold text-green mb-3">
          Berhasil masuk!
        </h1>

        {/* Description */}
        <p className="text-center text-gray-600 text-sm leading-relaxed mb-6">
          Kamu berhasil masuk ke{" "}
          <span className="text-green font-semibold">Rawat.ID</span>.
        </p>

        {/* Divider */}
        <hr className="border-gray-200 mb-6" />

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <IconShieldCheck size={20} className="text-green shrink-0" />
          <p className="text-sm text-gray-500">
            Data kesehatanmu aman dan hanya bisa dilihat oleh kamu.
          </p>
        </div>

        {/* Button */}
        <Link
          href={buttonHref}
          className="block w-full text-center py-3 rounded-lg bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors"
        >
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
