"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";
import DatePicker from "@/common/components/DatePicker";
import { authFetch, clearSession } from "@/common/utils/auth";
import {
  IconCamera,
  IconUserEdit,
  IconHistory,
  IconLogout,
  IconGenderMale,
  IconGenderFemale,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

const BLOOD_TYPES = ["A", "B", "AB", "O"];

const getInitials = (name) => {
  const words = String(name || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const mapGender = (g) => {
  const v = String(g ?? "").trim().toLowerCase();
  if (["1", "male", "laki-laki", "l", "pria"].includes(v)) return 1;
  if (["2", "female", "perempuan", "p", "wanita"].includes(v)) return 2;
  return 1;
};

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-base font-medium text-gray-700 mb-2">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 rounded-lg border border-gray-300 text-sm outline-none transition-colors focus:border-green";

function PasswordInput({ value, onChange, placeholder, error }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass} pr-11 ${
          error ? "border-red-400 focus:border-red-500" : ""
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
  );
}

export default function PerbaruiAkun() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: null,
    gender: 1,
    address: "",
    height: "",
    weight: "",
    bloodType: "O",
  });
  const [pwd, setPwd] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });

  const setField = (key) => (val) => setForm((prev) => ({ ...prev, [key]: val }));

  useEffect(() => {
    const t = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!t) {
      router.replace("/signin");
      return;
    }
    setToken(t);

    let id = null;
    try {
      const raw = localStorage.getItem("user");
      id = raw ? JSON.parse(raw)?.id : null;
    } catch {
      id = null;
    }
    if (!id) {
      toast.error("Tidak dapat menemukan data akun. Silakan masuk kembali.");
      setLoading(false);
      return;
    }
    setUserId(id);

    (async () => {
      try {
        const res = await authFetch(`/api/users/${id}`, { cache: "no-store" });
        const json = await res.json();
        if (res.status === 401) {
          clearSession();
          router.replace("/signin");
          return;
        }
        const u = json?.data ?? json?.user ?? json ?? {};
        setUsername(u.username ?? "");
        setAvatarUrl(u.profileImage ?? u.profile_image ?? u.image ?? u.avatar ?? "");
        setForm({
          name: u.name ?? "",
          email: u.email ?? "",
          phone: u.phone ?? "",
          birthDate: u.birthDate ? new Date(u.birthDate) : null,
          gender: mapGender(u.gender),
          address: u.address ?? "",
          height: u.height ?? "",
          weight: u.weight ?? "",
          bloodType: u.bloodType ?? "O",
        });
      } catch {
        toast.error("Gagal memuat data akun.");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push("/");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // allow re-selecting the same file
    if (!file || !userId) return;

    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 5 MB.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("image", file);

      const res = await authFetch(`/api/users/${userId}/profile-image`, {
        method: "POST",
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.message || "Gagal mengunggah foto.");
        return;
      }

      const uploaded =
        json?.data?.profileImage ??
        json?.data?.image ??
        json?.data?.url ??
        json?.profileImage ??
        json?.image ??
        json?.url ??
        preview;
      setAvatarUrl(uploaded);
      toast.success(json?.message || "Foto profil berhasil diperbarui!");
    } catch {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setUploadingImage(false);
    }
  };

  const validate = () => {
    if (!form.name.trim()) {
      toast.error("Nama lengkap wajib diisi.");
      return false;
    }
    if (!form.email.trim()) {
      toast.error("Email wajib diisi.");
      return false;
    }
    const wantsPasswordChange =
      pwd.oldPassword || pwd.newPassword || pwd.confirmPassword;
    if (wantsPasswordChange) {
      if (!pwd.oldPassword) {
        toast.error("Password lama wajib diisi.");
        return false;
      }
      if (!pwd.newPassword || pwd.newPassword.length < 6) {
        toast.error("Password baru minimal 6 karakter.");
        return false;
      }
      if (pwd.newPassword !== pwd.confirmPassword) {
        toast.error("Konfirmasi password baru tidak cocok.");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!userId || !token) return;
    if (!validate()) return;

    setSaving(true);
    try {
      const body = {
        username: username || form.email,
        name: form.name.trim(),
        email: form.email.trim(),
        gender: form.gender,
        phone: form.phone,
        address: form.address,
        height: Number(form.height) || 0,
        weight: Number(form.weight) || 0,
        birthDate: form.birthDate ? format(form.birthDate, "yyyy-MM-dd") : null,
        isActive: 1,
        bloodType: form.bloodType,
      };

      const res = await authFetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json?.message || "Gagal menyimpan perubahan.");
        return;
      }

      // Optional password change via separate endpoint.
      if (pwd.newPassword) {
        const pres = await authFetch(`/api/users/${userId}/password`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            oldPassword: pwd.oldPassword,
            newPassword: pwd.newPassword,
          }),
        });
        const pjson = await pres.json();
        if (!pres.ok) {
          toast.error(pjson?.message || "Profil tersimpan, tetapi password gagal diperbarui.");
          return;
        }
        setPwd({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }

      // Keep the cached user in sync so the header greeting updates.
      try {
        const raw = localStorage.getItem("user");
        const cached = raw ? JSON.parse(raw) : {};
        localStorage.setItem(
          "user",
          JSON.stringify({ ...cached, name: form.name.trim(), email: form.email.trim() })
        );
      } catch {
        /* ignore */
      }

      toast.success(json?.message || "Perubahan berhasil disimpan!");
    } catch {
      toast.error("Terjadi kesalahan jaringan.");
    } finally {
      setSaving(false);
    }
  };

  const initials = getInitials(form.name);
  const confirmMismatch =
    pwd.confirmPassword.length > 0 && pwd.newPassword !== pwd.confirmPassword;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-green mb-1">Profil Saya</h1>
      <p className="text-green/70 mb-6">Kelola informasi akun dan data pribadi kamu.</p>
      <hr className="border-gray-200 mb-8" />

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="lg:w-72 shrink-0">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt="Foto profil"
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-greenImage text-2xl font-bold text-green">
                  {initials}
                </span>
              )}
              {uploadingImage && (
                <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 text-white text-xs">
                  Mengunggah...
                </span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                aria-label="Ubah foto profil"
                className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow text-green hover:bg-gray-50 disabled:opacity-60"
              >
                <IconCamera size={18} />
              </button>
            </div>
            <p className="mt-4 text-lg font-semibold text-gray-800">{form.name || "Pengguna"}</p>
            <p className="text-sm text-gray-500">{form.email}</p>
          </div>

          <hr className="border-gray-200 my-6" />

          <nav className="flex flex-col gap-1">
            <span className="flex items-center gap-3 px-4 py-3 rounded-xl bg-greenImage/50 text-green font-semibold">
              <IconUserEdit size={22} />
              Perbarui Akun
            </span>
            <Link
              href="/riwayat-bmi"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              <IconHistory size={22} />
              Riwayat Pemeriksaan BMI
            </Link>
          </nav>

          <hr className="border-gray-200 my-6" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-xl transition-colors w-full"
          >
            <IconLogout size={22} />
            Keluar
          </button>
        </aside>

        {/* Form */}
        <div className="flex-1 lg:border-l lg:border-gray-200 lg:pl-12">
          {loading ? (
            <div className="py-24 text-center text-gray-400">Memuat data akun...</div>
          ) : (
            <div className="flex flex-col gap-10 max-w-2xl">
              {/* Informasi Dasar */}
              <section>
                <h2 className="text-xl font-bold text-gray-800">Informasi Dasar</h2>
                <p className="text-sm text-gray-500 mb-5">Perbarui data diri kamu.</p>
                <div className="flex flex-col gap-5">
                  <Field label="Nama lengkap">
                    <input
                      className={inputClass}
                      value={form.name}
                      onChange={(e) => setField("name")(e.target.value)}
                      placeholder="Nama lengkap"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      className={inputClass}
                      value={form.email}
                      onChange={(e) => setField("email")(e.target.value)}
                      placeholder="email@contoh.com"
                    />
                  </Field>
                  <Field label="Nomor telepon">
                    <input
                      className={inputClass}
                      value={form.phone}
                      onChange={(e) => setField("phone")(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                    />
                  </Field>
                  <Field label="Tanggal Lahir">
                    <DatePicker
                      value={form.birthDate}
                      onChange={(date) => setField("birthDate")(date)}
                      maxDate={new Date()}
                      minDate={new Date(1940, 0, 1)}
                    />
                  </Field>
                  <Field label="Jenis Kelamin">
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: 1, label: "Laki-laki", Icon: IconGenderMale },
                        { value: 2, label: "Perempuan", Icon: IconGenderFemale },
                      ].map(({ value, label, Icon }) => {
                        const active = form.gender === value;
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() => setField("gender")(value)}
                            className={`flex flex-col items-center justify-center gap-1 py-4 rounded-xl border-2 transition-all ${
                              active
                                ? "border-green bg-green text-white"
                                : "border-green/40 text-gray-500 hover:border-green"
                            }`}
                          >
                            <Icon size={22} />
                            <span className="text-sm font-medium">{label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Alamat">
                    <textarea
                      rows={3}
                      className={`${inputClass} resize-none`}
                      value={form.address}
                      onChange={(e) => setField("address")(e.target.value)}
                      placeholder="Contoh alamat lengkap"
                    />
                  </Field>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* Data tubuh */}
              <section>
                <h2 className="text-xl font-bold text-gray-800">Data tubuh</h2>
                <p className="text-sm text-gray-500 mb-5">
                  Digunakan untuk kalkulasi BMI dan rekomendasi kesehatan.
                </p>
                <div className="flex flex-col gap-5">
                  <Field label="Tinggi badan">
                    <input
                      type="number"
                      className={inputClass}
                      value={form.height}
                      onChange={(e) => setField("height")(e.target.value)}
                      placeholder="cm"
                    />
                  </Field>
                  <Field label="Berat badan">
                    <input
                      type="number"
                      className={inputClass}
                      value={form.weight}
                      onChange={(e) => setField("weight")(e.target.value)}
                      placeholder="kg"
                    />
                  </Field>
                  <Field label="Golongan darah">
                    <select
                      className={inputClass}
                      value={form.bloodType}
                      onChange={(e) => setField("bloodType")(e.target.value)}
                    >
                      {BLOOD_TYPES.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>
              </section>

              <hr className="border-gray-200" />

              {/* Ubah password */}
              <section>
                <h2 className="text-xl font-bold text-gray-800">Ubah password</h2>
                <p className="text-sm text-gray-500 mb-5">Aktifkan untuk mengganti password akun.</p>
                <div className="flex flex-col gap-5">
                  <Field label="Password lama">
                    <PasswordInput
                      value={pwd.oldPassword}
                      onChange={(e) => setPwd((p) => ({ ...p, oldPassword: e.target.value }))}
                      placeholder="Masukkan password lama"
                    />
                  </Field>
                  <Field label="Password baru">
                    <PasswordInput
                      value={pwd.newPassword}
                      onChange={(e) => setPwd((p) => ({ ...p, newPassword: e.target.value }))}
                      placeholder="Masukkan password baru"
                    />
                  </Field>
                  <Field label="Konfirmasi password baru">
                    <PasswordInput
                      value={pwd.confirmPassword}
                      onChange={(e) => setPwd((p) => ({ ...p, confirmPassword: e.target.value }))}
                      placeholder="Ulangi password baru"
                      error={confirmMismatch}
                    />
                    {confirmMismatch && (
                      <p className="text-red-500 text-xs mt-1">
                        Konfirmasi password tidak cocok dengan password baru.
                      </p>
                    )}
                  </Field>
                </div>
              </section>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="px-6 py-3 rounded-xl border border-green text-green font-semibold hover:bg-green/5 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={saving || confirmMismatch}
                  className="px-6 py-3 rounded-xl bg-green text-white font-semibold hover:bg-greenHover transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {saving ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
