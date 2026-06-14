import React from "react";
import HeroFluBurung from "./HeroFluBurung";
import JelajahiFluBurung from "./JelajahiFluBurung";
import ApaItuFluBurung from "./ApaItuFluBurung";
import NomenklaturFluBurung from "./NomenklaturFluBurung";
import PenyebabFluBurung from "./PenyebabFluBurung";
import FaktorRisikoFluBurung from "./FaktorRisikoFluBurung";
import PenularanFluBurung from "./PenularanFluBurung";
import GejalafluBurung from "./GejalafluBurung";
import PerburukanFluBurung from "./PerburukanFluBurung";
import PenangananFluBurung from "./PenangananFluBurung";
import KomplikasiPenderitaFluBurung from "./KomplikasiPenderitaFluBurung";
import KreditFluBurung from "./KreditFluBurung";
import RelatedInteraktifSection from "@/common/components/RelatedInteraktifSection";

export default function FluBurungPage() {
  return (
    <>
      <HeroFluBurung />
      <JelajahiFluBurung />
      <ApaItuFluBurung />
      <NomenklaturFluBurung />
      <PenyebabFluBurung />
      <FaktorRisikoFluBurung />
      <PenularanFluBurung />
      <GejalafluBurung />
      <PerburukanFluBurung />
      <PenangananFluBurung />
      <KomplikasiPenderitaFluBurung />
      <KreditFluBurung />
      <RelatedInteraktifSection currentSlug="flu-burung" />
    </>
  );
}
