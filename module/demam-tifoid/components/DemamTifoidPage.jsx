import React from "react";
import HeroDemamTifoid from "./HeroDemamTifoid";
import JelajahiInfoTifoid from "./JelajahiInfoTifoid";
import ApaItuTifoid from "./ApaItuTifoid";
import PenyebabTifoid from "./PenyebabTifoid";
import EpidemiologiTifoid from "./EpidemiologiTifoid";
import GejalaTifoid from "./GejalaTifoid";
import PenangananTifoid from "./PenangananTifoid";
import KomplikasiTifoid from "./KomplikasiTifoid";
import PencegahanTifoid from "./PencegahanTifoid";
import MitosFaktaTifoid from "./MitosFaktaTifoid";
import RelatedInteraktifSection from "@/common/components/RelatedInteraktifSection";

export default function DemamTifoidPage() {
  return (
    <>
      <HeroDemamTifoid />
      <JelajahiInfoTifoid />
      <ApaItuTifoid />
      <PenyebabTifoid />
      <EpidemiologiTifoid />
      <GejalaTifoid />
      <PenangananTifoid />
      <KomplikasiTifoid />
      <PencegahanTifoid />
      <MitosFaktaTifoid />
      <RelatedInteraktifSection currentSlug="demam-tifoid" />
    </>
  );
}
