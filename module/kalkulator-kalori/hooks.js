"use client";

import { useEffect, useState } from "react";
import { authFetch, getToken, getUser } from "@/common/utils/auth";
import { toAge, toSex } from "./utils";

// Profil user yang login, diambil sekali. Dipanggil di komponen induk supaya
// datanya tetap ada saat berpindah antara form dan hasil ("Cek Ulang").
export function useUserProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const token = getToken();
    const userId = getUser()?.id;
    if (!token || !userId) return;

    let active = true;
    (async () => {
      try {
        const res = await authFetch(`/api/users/${userId}`, { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        if (active) setProfile(json?.data ?? json?.user ?? json ?? {});
      } catch {
        /* diam: isi otomatis hanya pelengkap */
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return profile;
}

// Form jenis kelamin, berat, tinggi, dan usia. Terisi otomatis dari profil
// untuk field yang masih kosong dan datanya ada di profil.
export function useBodyForm(profile) {
  const [sex, setSex] = useState("");
  const [beratBadan, setBeratBadan] = useState("");
  const [tinggiBadan, setTinggiBadan] = useState("");
  const [usia, setUsia] = useState("");

  useEffect(() => {
    if (!profile) return;

    const mappedSex = toSex(profile.gender);
    if (mappedSex) setSex((prev) => prev || mappedSex);

    const age = profile.birthDate ? toAge(profile.birthDate) : null;
    if (age) setUsia((prev) => prev || String(age));

    if (profile.height != null && profile.height !== "")
      setTinggiBadan((prev) => prev || String(profile.height));
    if (profile.weight != null && profile.weight !== "")
      setBeratBadan((prev) => prev || String(profile.weight));
  }, [profile]);

  return {
    values: { sex, beratBadan, tinggiBadan, usia },
    setSex,
    setBeratBadan,
    setTinggiBadan,
    setUsia,
  };
}

// Hasil perhitungan terakhir disimpan di localStorage supaya tetap tampil
// setelah tamu login lewat tombol "Simpan Hasil".
export function useStoredResult(storageKey) {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      setResult(JSON.parse(saved));
    } catch {
      localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  const save = (data) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
    setResult(data);
  };

  const reset = () => {
    localStorage.removeItem(storageKey);
    setResult(null);
  };

  return { result, save, reset };
}
