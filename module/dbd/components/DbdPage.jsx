import React from "react";
import DbdApaItuSection from "./DbdApaItuSection";
import DbdExploreSection from "./DbdExploreSection";
import DbdGejalaSection from "./DbdGejalaSection";
import DbdHeroSection from "./DbdHeroSection";
import DbdKomplikasiSection from "./DbdKomplikasiSection";
import DbdMitosFaktaSection from "./DbdMitosFaktaSection";
import DbdPenangananSection from "./DbdPenangananSection";
import DbdPencegahanSection from "./DbdPencegahanSection";
import DbdPenyebabRisikoSection from "./DbdPenyebabRisikoSection";
import DbdSerotipeSection from "./DbdSerotipeSection";

export default function DbdPage() {
  return (
    <>
      <DbdHeroSection />
      <DbdExploreSection />
      <DbdApaItuSection />
      <DbdSerotipeSection />
      <DbdPenyebabRisikoSection />
      <DbdGejalaSection />
      <DbdPenangananSection />
      <DbdKomplikasiSection />
      <DbdPencegahanSection />
      <DbdMitosFaktaSection />
    </>
  );
}
