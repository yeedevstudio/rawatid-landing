import React from "react";
import HeroCacarMonyet from "./HeroCacarMonyet";
import JelajahiCacarMonyet from "./JelajahiCacarMonyet";
import ApaItuCacarMonyet from "./ApaItuCacarMonyet";
import KladeCacarMonyet from "./KladeCacarMonyet";
import PenyebabCacarMonyet from "./PenyebabCacarMonyet";
import FaktorRisikoCacarMonyet from "./FaktorRisikoCacarMonyet";
import GejalaCacarMonyet from "./GejalaCacarMonyet";
import PenangananCacarMonyet from "./PenangananCacarMonyet";
import KreditCacarMonyet from "./KreditCacarMonyet";
import RelatedInteraktifSection from "@/common/components/RelatedInteraktifSection";

export default function CacarMonyetPage() {
  return (
    <>
      <HeroCacarMonyet />
      <JelajahiCacarMonyet />
      <ApaItuCacarMonyet />
      <KladeCacarMonyet />
      <PenyebabCacarMonyet />
      <FaktorRisikoCacarMonyet />
      <GejalaCacarMonyet />
      <PenangananCacarMonyet />
      <KreditCacarMonyet />
      <RelatedInteraktifSection currentSlug="cacar-monyet" />
    </>
  );
}
