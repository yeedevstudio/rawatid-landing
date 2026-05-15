import React from "react";
import CacarAirExploreSection from "./CacarAirExploreSection";
import CacarAirHeroSection from "./CacarAirHeroSection";
import CacarAirKenapaPentingSection from "./CacarAirKenapaPentingSection";
import CacarAirGejalaSection from "./CacarAirGejalaSection";
import CacarAirKomplikasiSection from "./CacarAirKomplikasiSection";
import CacarAirMitosFaktaSection from "./CacarAirMitosFaktaSection";
import CacarAirPencegahanSection from "./CacarAirPencegahanSection";
import CacarAirPenangananSection from "./CacarAirPenangananSection";
import CacarAirPenularanSection from "./CacarAirPenularanSection";
import CacarAirPerbandinganSection from "./CacarAirPerbandinganSection";
import CacarAirPengertianSection from "./CacarAirPengertianSection";

export default function CacarAirPage() {
  return (
    <>
      <CacarAirHeroSection />
      <CacarAirKenapaPentingSection />
      <CacarAirExploreSection />
      <CacarAirPengertianSection />
      <CacarAirPerbandinganSection />
      <CacarAirGejalaSection />
      <CacarAirPenularanSection />
      <CacarAirPenangananSection />
      <CacarAirKomplikasiSection />
      <CacarAirPencegahanSection />
      <CacarAirMitosFaktaSection />
    </>
  );
}
