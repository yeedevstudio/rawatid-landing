import React from "react";

import HeroHerpes from "./HeroHerpes";
import HerpesExploreSection from "./HerpesExploreSection";
import HerpesApaItuSection from "./HerpesApaItuSection";
import HerpesDuaJenisSection from "./HerpesDuaJenisSection";
import HerpesPenyebabSection from "./HerpesPenyebabSection";
import HerpesPenularanSection from "./HerpesPenularanSection";
import HerpesRisikoSection from "./HerpesRisikoSection";
import HerpesGejalaSection from "./HerpesGejalaSection";
import HerpesPenangananSection from "./HerpesPenangananSection";
import HerpesKomplikasiSection from "./HerpesKomplikasiSection";
import HerpesPencegahanSection from "./HerpesPencegahanSection";
import HerpesClosingSection from "./HerpesClosingSection";
import RelatedInteraktifSection from "@/common/components/RelatedInteraktifSection";

export default function HerpesSimplexPage() {
  return (
    <>
      <HeroHerpes />
      <HerpesExploreSection />
      <HerpesApaItuSection />
      <HerpesDuaJenisSection />
      <HerpesPenyebabSection />
      <HerpesPenularanSection />
      <HerpesRisikoSection />
      <HerpesGejalaSection />
      <HerpesPenangananSection />
      <HerpesKomplikasiSection />
      <HerpesPencegahanSection />
      <HerpesClosingSection />
      <RelatedInteraktifSection currentSlug="herpes-simplex" />
    </>
  );
}
