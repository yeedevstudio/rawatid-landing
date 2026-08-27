"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { IconArrowLeft, IconMailFilled } from "@tabler/icons-react";
import { CM_API_DEV_BASE } from "@/common/constant/api";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Cooldown before the user may request another reset email, in seconds.
const RESEND_COOLDOWN = 60;

const getErrorMessage = (json) => {
  if (json?.message) return json.message;
  if (Array.isArray(json?.errors) && json.errors.length > 0)
    return json.errors.map((e) => e.message ?? e).join(", ");
  if (typeof json?.errors === "object" && json.errors !== null)
    return Object.values(json.errors).flat().join(", ");
  return "Gagal mengirim tautan reset password. Silakan coba lagi.";
};

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const validate = (value) => {
    if (!value.trim()) return "Email wajib diisi";
    if (!EMAIL_PATTERN.test(value.trim())) return "Format email tidak valid";
    return "";
  };

  const sendRequest = async () => {
    const validationError = validate(email);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${CM_API_DEV_BASE}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      // Backend membalas 200 tapi tetap bisa membawa status "error".
      if (!res.ok || data?.status === "error") {
        toast.error(getErrorMessage(data));
        return;
      }

      setSent(true);
      setCooldown(RESEND_COOLDOWN);
      toast.success(data?.message ?? "Tautan reset password telah dikirim.");
    } catch {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  if (sent) {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-greenImage flex items-center justify-center">
            <IconMailFilled size={34} className="text-green" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-green mb-2">Cek email kamu</h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Kami sudah mengirim tautan untuk mengatur ulang password ke{" "}
            <span className="text-gray-800 font-semibold break-all">{email.trim()}</span>.
            Tautan hanya berlaku untuk waktu terbatas.
          </p>
        </div>

        <hr className="border-gray-200" />

        <p className="text-center text-sm text-gray-500 leading-relaxed">
          Tidak menerima email? Periksa folder spam atau promosi terlebih dahulu.
        </p>

        <button
          type="button"
          onClick={sendRequest}
          disabled={loading || cooldown > 0}
          className="w-full py-3 rounded-lg bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading
            ? "Mengirim..."
            : cooldown > 0
              ? `Kirim ulang dalam ${cooldown}s`
              : "Kirim ulang tautan"}
        </button>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setError("");
          }}
          className="text-sm text-green font-medium hover:underline"
        >
          Gunakan email lain
        </button>

        <Link
          href="/signin"
          className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <IconArrowLeft size={16} />
          Kembali ke halaman masuk
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Lupa Password?</h1>
        <p className="text-gray-500 text-sm leading-relaxed">
          Masukkan email yang terdaftar di Rawat.ID. Kami akan mengirimkan tautan untuk
          mengatur ulang password kamu.
        </p>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Masukkan email kamu"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors ${
            error ? "border-red-400 focus:border-red-500" : "border-gray-300 focus:border-green"
          }`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Mengirim..." : "Kirim Tautan Reset"}
      </button>

      <Link
        href="/signin"
        className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
      >
        <IconArrowLeft size={16} />
        Kembali ke halaman masuk
      </Link>

      <p className="text-center text-sm text-gray-500">
        Belum punya akun?{" "}
        <Link href="/signup" className="text-green font-semibold hover:underline">
          Daftar
        </Link>
      </p>
    </form>
  );
}
