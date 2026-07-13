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

const getErrorMessage = (json) => {
  if (json?.message) return json.message;
  if (Array.isArray(json?.errors) && json.errors.length > 0)
    return json.errors.map((e) => e.message ?? e).join(", ");
  if (typeof json?.errors === "object" && json.errors !== null)
    return Object.values(json.errors).flat().join(", ");
  return "Login gagal. Periksa kembali email dan password Anda.";
};

export default function SigninForm() {
  const router = useRouter();
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!values.username.trim()) newErrors.username = "Email atau username wajib diisi";
    if (!values.password) newErrors.password = "Password wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: values.username.trim(),
          password: values.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(getErrorMessage(data));
        return;
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        // Guest flow: if the user calculated a BMI result before logging in and
        // pressed "Simpan", show the success screen with BMI-specific wording;
        // its button takes them back to the cached result page to save it.
        if (localStorage.getItem("bmi_pending_login")) {
          localStorage.removeItem("bmi_pending_login");
          router.push("/succes-signin?from=bmi");
          return;
        }
      }

      router.push("/succes-signin");
    } catch {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Selamat Datang di RawatID!</h1>
        <p className="text-gray-500 text-sm">Silakan masuk ke akun Anda.</p>
      </div>

      <InputField
        label="Email atau Username"
        type="text"
        placeholder="Masukkan email atau username"
        value={values.username}
        onChange={handleChange("username")}
        error={errors.username}
      />

      <InputField
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••••"
        value={values.password}
        onChange={handleChange("password")}
        error={errors.password}
        suffix={
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <IconEyeOff size={18} /> : <IconEye size={18} />}
          </button>
        }
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
        <Link href="/forgot-password" className="text-sm text-green font-medium hover:underline">
          Forgot Password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-green text-white font-semibold text-sm hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Memproses..." : "Masuk"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Belum punya akun?{" "}
        <Link href="/signup" className="text-green font-semibold hover:underline">
          Daftar
        </Link>
      </p>
    </form>
  );
}
