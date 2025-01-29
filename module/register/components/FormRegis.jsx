"use client";

import { CheckboxTerms } from "@/common/components/CheckBoxTerms";
import ConfirmDialog from "@/common/components/ConfirmDialog";
import { CustomSelect } from "@/common/components/CustomSelect";
import TextField from "@/common/components/TextField";
import {
  CardServiceValue,
  jenisFaskesOptions,
  rawatIDOptions,
} from "@/common/constant/cardValue";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FormRegis() {
  const router = useRouter();

  const [provinces, setProvinces] = useState([]);
  const [regencies, setRegencies] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [values, setValues] = useState({
    nama_faskes: "",
    jenis_faskes: "",
    paket_pilihan: "",
    provinsi: "",
    kabupaten: "",
    kecamatan: "",
    desa: "",
    telepon: "",
    email: "",
    alamat: "",
    nama_diri: "",
    telp_diri: "",
    email_diri: "",
    jabatan_diri: "",
    link: "",
  });

  const handleValuesChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChange = (prop) => (value) => {
    setValues({ ...values, [prop]: value });
  };

  useEffect(() => {
    async function fetchProvinces() {
      const res = await fetch("/api/wilayah/provinces");
      const data = await res.json();
      setProvinces(data);
    }
    fetchProvinces();
  }, []);

  useEffect(() => {
    if (!values.provinsi) return;
    async function fetchRegencies() {
      setLoadingRegencies(true);
      const res = await fetch(`/api/wilayah/regencies/${values?.provinsi}`);
      const data = await res.json();
      setRegencies(data);
    }
    fetchRegencies();
  }, [values.provinsi]);

  useEffect(() => {
    if (!values.kabupaten) return;
    async function fetchDistricts() {
      setLoadingDistricts(true);
      const res = await fetch(`/api/wilayah/districts/${values?.kabupaten}`);
      const data = await res.json();
      setDistricts(data);
    }
    fetchDistricts();
  }, [values.kabupaten]);

  useEffect(() => {
    if (!values.kecamatan) return;
    async function fetchVillages() {
      setLoadingVillages(true);
      const res = await fetch(`/api/wilayah/villages/${values?.kecamatan}`);
      const data = await res.json();
      setVillages(data);
    }
    fetchVillages();
  }, [values.kecamatan]);

  const provOptions = provinces?.map((prov) => ({
    value: prov.id,
    label: prov.name,
  }));

  const regencyOptions = regencies?.map((regency) => ({
    value: regency.id,
    label: regency.name,
  }));

  const districtOptions = districts?.map((district) => ({
    value: district.id,
    label: district.name,
  }));

  const villageOptions = villages?.map((village) => ({
    value: village.id,
    label: village.name,
  }));

  const paketOptions = CardServiceValue?.map((paket) => ({
    value: paket.id,
    label: paket.title,
  }));

  const handleCheckboxChange = (isChecked) => {
    setIsTermsAccepted(isChecked);
  };

  const handleSubmit = () => {
    setLoadingSubmit(true);
    setTimeout(() => {
      setLoadingSubmit(false);
      toast.success("Registrasi Berhasil!", {
        duration: 3000,
        position: "top-right",
        style: { color: "green", border: "1px solid green" },
      });
    }, 3000);
  };

  return (
    <section className="relative">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-green">
        Registrasi Sekarang
      </h1>
      <div className="my-5 border rounded-lg p-5 grid grid-cols-1 gap-8">
        <div>
          <h2 className="text-md md:text-lg font-normal text-green">
            Data Faskes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2 mb-5">
            <TextField
              id={"faskes"}
              label={"Nama Faskes"}
              type={"text"}
              placeholder={"Masukkan Nama Faskes"}
              values={values.nama_faskes}
              onChange={handleValuesChange("nama_faskes")}
            />
            <CustomSelect
              label={"Jenis Faskes"}
              options={jenisFaskesOptions}
              value={values.jenis_faskes}
              onChange={handleChange("jenis_faskes")}
            />
            <CustomSelect
              label={"Provinsi"}
              options={provOptions}
              value={values.provinsi}
              onChange={handleChange("provinsi")}
            />
            <CustomSelect
              label={"Kabupaten/Kota"}
              options={regencyOptions}
              value={values.kabupaten}
              onChange={handleChange("kabupaten")}
            />
            <CustomSelect
              label={"Kecamatan"}
              options={districtOptions}
              value={values.kecamatan}
              onChange={handleChange("kecamatan")}
            />
            <CustomSelect
              label={"Desa/Kelurahan"}
              options={villageOptions}
              value={values.desa}
              onChange={handleChange("desa")}
            />
            <TextField
              id={"telp_faskes"}
              label={"Nomor Telepon"}
              type={"number"}
              placeholder={"Nomor Telepon"}
              values={values.telepon}
              onChange={handleValuesChange("telepon")}
            />
            <TextField
              id={"email_faskes"}
              label={"Email"}
              type={"email"}
              placeholder={"Email"}
              values={values.email}
              onChange={handleValuesChange("email")}
            />
          </div>
          <div className="grid grid-cols-1 gap-5">
            {/* <CustomSelect
              label={"Paket Rawat.ID"}
              options={paketOptions}
              value={values.paket_pilihan}
              onChange={handleChange("paket_pilihan")}
            /> */}
            <TextField
              id={"alamat_faskes"}
              label={"Alamat"}
              type={"textarea"}
              placeholder={"Masukkan Alamat"}
              values={values.alamat}
              onChange={handleValuesChange("alamat")}
            />
          </div>
        </div>
        <div>
          <h2 className="text-lg font-normal text-green">Data Diri</h2>
          <div className="grid grid-cols-1 gap-5 pt-2">
          <TextField
              id={"nama"}
              label={"Nama"}
              type={"text"}
              placeholder={"Masukkan Nama Penanggung Jawab"}
              values={values.nama_diri}
              onChange={handleValuesChange("nama_diri")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
            <TextField
              id={"telp_diri"}
              label={"Nomor Telepon"}
              type={"number"}
              placeholder={"Nomor Telepon"}
              values={values.telp_diri}
              onChange={handleValuesChange("telp_diri")}
            />
            <TextField
              id={"email_diri"}
              label={"Email"}
              type={"email"}
              placeholder={"Email"}
              values={values.email_diri}
              onChange={handleValuesChange("email_diri")}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 pt-4">
            <CustomSelect
              label={"Jabatan Anda"}
              options={jenisFaskesOptions}
              value={values.jabatan_diri}
              onChange={handleChange("jabatan_diri")}
            />
          </div>
          <div className="grid grid-cols-1 gap-8 pt-4">
            <CustomSelect
              label={"Dari Mana Anda Mengetahui Rawat.ID"}
              options={rawatIDOptions}
              value={values.link}
              onChange={handleChange("link")}
            />
          </div>
          <CheckboxTerms onChange={handleCheckboxChange} />
        </div>
      </div>
      <div className="flex justify-end mb-20">
        <ConfirmDialog
          label={"Registrasi"}
          disable={isTermsAccepted === false}
          handleSubmit={handleSubmit}
          loading={loadingSubmit === true}
        />
      </div>
    </section>
  );
}
