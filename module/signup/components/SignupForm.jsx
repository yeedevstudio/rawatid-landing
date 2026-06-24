"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconEye, IconEyeOff } from "@tabler/icons-react";

function InputField({ label, type, placeholder, value, onChange, error, suffix }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-colors ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-300 focus:border-green"
          } ${suffix ? "pr-11" : ""}`}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function PasswordField({ label, placeholder, value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <InputField
      label={label}
      type={show ? "text" : "password"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      error={error}
      suffix={
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="text-gray-400 hover:text-gray-600"
        >
          {show ? <IconEyeOff size={18} /> : <IconEye size={18} />}
        </button>
      }
    />
  );
}

const getErrorMessage = (json) => {
  if (json?.message) return json.message;
  if (Array.isArray(json?.errors) && json.errors.length > 0)
    return json.errors.map((e) => e.message ?? e).join(", ");
  if (typeof json?.errors === "object" && json.errors !== null)
    return Object.values(json.errors).flat().join(", ");
  return "Registrasi gagal. Silakan coba lagi.";
};

export default function SignupForm() {
  const router = useRouter();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    const val = e.target.value;
    setValues((prev) => {
      const next = { ...prev, [field]: val };

      setErrors((prevErr) => {
        const nextErr = { ...prevErr, [field]: "" };

        if (field === "password") {
          if (next.confirmPassword && val !== next.confirmPassword) {
            nextErr.confirmPassword = "Password tidak cocok";
          } else {
            nextErr.confirmPassword = "";
          }
        }

        if (field === "confirmPassword") {
          if (val && val !== next.password) {
            nextErr.confirmPassword = "Password tidak cocok";
          } else {
            nextErr.confirmPassword = "";
          }
        }

        return nextErr;
      });

      return next;
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!values.name.trim()) newErrors.name = "Nama lengkap wajib diisi";
    if (!values.email.trim()) newErrors.email = "Email atau username wajib diisi";
    if (!values.password) newErrors.password = "Password wajib diisi";
    else if (values.password.length < 8) newErrors.password = "Password minimal 8 karakter";
    if (!values.confirmPassword) newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    else if (values.password !== values.confirmPassword)
      newErrors.confirmPassword = "Password tidak cocok";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const deriveUsername = (emailOrUsername) => {
    if (emailOrUsername.includes("@")) {
      return emailOrUsername.split("@")[0].toLowerCase().replace(/[^a-z0-9_]/g, "");
    }
    return emailOrUsername.toLowerCase().replace(/[^a-z0-9_]/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.includes("@") ? values.email.trim() : "",
          username: deriveUsername(values.email),
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(getErrorMessage(data));
        return;
      }

      toast.success("Akun berhasil dibuat! Mengalihkan ke halaman masuk...");
      setTimeout(() => router.push("/signin"), 1500);
    } catch {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Daftar Akun Baru</h1>
        <p className="text-gray-500 text-sm">Lengkapi data di bawah ini untuk membuat akun.</p>
      </div>

      <InputField
        label="Nama Lengkap"
        type="text"
        placeholder="Masukkan nama lengkap"
        value={values.name}
        onChange={handleChange("name")}
        error={errors.name}
      />

      <InputField
        label="Email atau Username"
        type="text"
        placeholder="Masukkan email atau username"
        value={values.email}
        onChange={handleChange("email")}
        error={errors.email}
      />

      <PasswordField
        label="Password"
        placeholder="••••••••••"
        value={values.password}
        onChange={handleChange("password")}
        error={errors.password}
      />

      <PasswordField
        label="Konfirmasi Password"
        placeholder="••••••••••"
        value={values.confirmPassword}
        onChange={handleChange("confirmPassword")}
        error={errors.confirmPassword}
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <div
            onClick={() => setRememberMe((v) => !v)}
            className={`w-5 h-5 rounded flex items-center justify-center transition-colors cursor-pointer ${
              rememberMe ? "bg-green" : "border-2 border-gray-300"
            }`}
          >
            {rememberMe && (
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-sm text-gray-700">Remember Me</span>
        </label>
        <Link href="/signin" className="text-sm text-green font-medium hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Mendaftarkan..." : "Daftar"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Sudah punya akun?{" "}
        <Link href="/signin" className="text-green font-semibold hover:underline">
          Masuk
        </Link>
      </p>
    </form>
  );
}
