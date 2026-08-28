"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  IconEye,
  IconEyeOff,
  IconCircle,
  IconCircleCheck,
  IconLockExclamation,
} from "@tabler/icons-react";

const PASSWORD_RULES = [
  { key: "length", label: "Minimal 8 karakter", test: (p) => p.length >= 8 },
  {
    key: "case",
    label: "Mengandung huruf besar dan huruf kecil",
    test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p),
  },
  {
    key: "numsym",
    label: "Mengandung angka atau simbol",
    test: (p) => /[0-9]/.test(p) || /[^A-Za-z0-9]/.test(p),
  },
];

const isPasswordValid = (p) => PASSWORD_RULES.every((r) => r.test(p));

function PasswordRequirements({ value }) {
  return (
    <div className="rounded-lg bg-gray-50 border border-gray-100 p-3">
      <p className="text-xs font-semibold text-gray-700 mb-2">Syarat Kata Sandi:</p>
      <ul className="flex flex-col gap-1.5">
        {PASSWORD_RULES.map((r) => {
          const ok = r.test(value);
          return (
            <li
              key={r.key}
              className={`flex items-center gap-2 text-xs ${ok ? "text-green" : "text-gray-500"}`}
            >
              {ok ? (
                <IconCircleCheck size={15} className="shrink-0" />
              ) : (
                <IconCircle size={15} className="shrink-0 text-gray-300" />
              )}
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function PasswordField({ label, placeholder, value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="new-password"
          className={`w-full px-4 py-3 pr-11 rounded-lg border text-sm outline-none transition-colors ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-300 focus:border-green"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {show ? <IconEyeOff size={18} /> : <IconEye size={18} />}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const getErrorMessage = (json) => {
  if (json?.message) return json.message;
  if (Array.isArray(json?.errors) && json.errors.length > 0)
    return json.errors.map((e) => e.message ?? e).join(", ");
  if (typeof json?.errors === "object" && json.errors !== null)
    return Object.values(json.errors).flat().join(", ");
  return "Gagal mengatur ulang password. Silakan coba lagi.";
};

export default function ResetPasswordForm({ token }) {
  const router = useRouter();
  const [values, setValues] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.password) newErrors.password = "Password baru wajib diisi";
    else if (!isPasswordValid(values.password))
      newErrors.password = "Password belum memenuhi syarat di bawah";

    if (!values.confirmPassword)
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    else if (values.confirmPassword !== values.password)
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          new_password: values.password,
          confirm_password: values.confirmPassword,
        }),
      });

      const data = await res.json().catch(() => ({}));

      
      if (!res.ok || data?.status === "error") {
        toast.error(getErrorMessage(data));
        return;
      }

      setDone(true);
      toast.success(data?.message ?? "Password berhasil diperbarui.");
    } catch {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  
  if (!token) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-greenImage flex items-center justify-center">
            <IconLockExclamation size={34} className="text-green" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tautan tidak valid</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Tautan reset password ini tidak lengkap atau sudah kedaluwarsa. Silakan minta
            tautan baru melalui halaman lupa password.
          </p>
        </div>

        <Link
          href="/forgot-password"
          className="block w-full text-center py-3 rounded-lg bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors"
        >
          Minta Tautan Baru
        </Link>

        <Link
          href="/signin"
          className="text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          Kembali ke halaman masuk
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-center">
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

        <div className="text-center">
          <h1 className="text-2xl font-bold text-green mb-2">Password berhasil diubah</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sekarang kamu bisa masuk ke{" "}
            <span className="text-green font-semibold">Rawat.ID</span> memakai password
            baru kamu.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/signin")}
          className="w-full py-3 rounded-lg bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors"
        >
          Masuk Sekarang
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Atur Ulang Password</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Buat password baru untuk akun Rawat.ID kamu.
        </p>
      </div>

      <PasswordField
        label="Password Baru"
        placeholder="••••••••••"
        value={values.password}
        onChange={handleChange("password")}
        error={errors.password}
      />

      <PasswordRequirements value={values.password} />

      <PasswordField
        label="Konfirmasi Password Baru"
        placeholder="••••••••••"
        value={values.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Menyimpan..." : "Simpan Password Baru"}
      </button>

      <Link
        href="/signin"
        className="text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        Kembali ke halaman masuk
      </Link>
    </form>
  );
}
