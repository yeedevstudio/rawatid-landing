import HeroPolio from "./HeroPolio";
import JelajahiInformasi from "./JelajahiInformasi";
import ApaituPlo from "./ApaituPlo";
import DefinisiPolio from "./DefinisiPolio";
import PenyebabPolio from "./PenyebabPolio";
import EpidemiologiPolio from "./EpidemiologiPolio";
import GejalaPolio from "./GejalaPolio";
import PenangananPolio from "./PenangananPolio";
import KomplikasiPolio from "./KomplikasiPolio";
import KomplikasiJangkaPanjang from "./KomplikasiJangkaPanjang";
import PencegahanPolio from "./PencegahanPolio";
import MitosFaktaPolio from "./MitosFaktaPolio";
import RelatedInteraktifSection from "@/common/components/RelatedInteraktifSection";

export default function PolioPage() {
  return (
    <>
      <HeroPolio />
      <JelajahiInformasi />
      <ApaituPlo />
      <DefinisiPolio />
      <PenyebabPolio />
      <EpidemiologiPolio />
      <GejalaPolio />
      <PenangananPolio />
      <KomplikasiPolio />
      <KomplikasiJangkaPanjang />
      <PencegahanPolio />
      <MitosFaktaPolio />
      <RelatedInteraktifSection currentSlug="poliomielitis" />
    </>
  );
}