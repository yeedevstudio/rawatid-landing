"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { IconChevronDown, IconHistory, IconUserEdit, IconLogout } from "@tabler/icons-react";

const getUserName = (user) =>
  user?.name || user?.fullName || user?.full_name || user?.username || "Pengguna";

const getInitials = (name) => {
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
};

const getShortName = (name) => {
  const words = String(name).trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return words[0] || "Pengguna";
  return `${words[0]} ${words[1][0]}`;
};

export default function UserMenu({ user, onLogout }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const name = getUserName(user);
  const initials = getInitials(name);
  const email = user?.email || "";

  const handleLogout = () => {
    setOpen(false);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    onLogout?.();
    router.push("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-3 rounded-xl border border-black/10 pl-2 pr-4 py-2 hover:bg-gray-50 transition-colors"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-greenImage text-sm font-semibold text-green">
          {initials}
        </span>
        <span className="text-base font-semibold text-gray-800">Halo, {getShortName(name)}</span>
        <IconChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-50">
          <div className="bg-gray-100 px-5 py-4">
            <p className="text-lg font-bold text-gray-800 truncate">{name}</p>
            {email && <p className="text-sm text-gray-500 truncate">{email}</p>}
          </div>

          <div className="flex flex-col py-1">
            <Link
              href="/riwayat-bmi"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-green font-semibold hover:bg-gray-50 transition-colors"
            >
              <IconHistory size={22} className="shrink-0" />
              Lihat Riwayat Pemeriksaan BMI
            </Link>

            <div className="mx-5 border-t border-gray-100" />

            <Link
              href="/perbarui-akun"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-5 py-3 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
            >
              <IconUserEdit size={22} className="shrink-0" />
              Perbarui Akun
            </Link>

            <div className="mx-5 border-t border-gray-100" />

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 px-5 py-3 text-red-600 font-semibold hover:bg-gray-50 transition-colors text-left"
            >
              <IconLogout size={22} className="shrink-0" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
