import React from "react";
import HeroSection from "./HeroSection";
import SupportSection from "./SupportSection";
import InteractiveKontenSection from "./InteractiveKontenSection";
import ClinicSolutionSection from "./ClinicSolutionSection";
import KesehatanArticleSection from "./KesehatanArticleSection";
import RawatDiriSection from "./RawatDiriSection";
import LatestArticleSection from "./LatestArticleSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SupportSection />
      <InteractiveKontenSection />
      <ClinicSolutionSection />
      <KesehatanArticleSection />
      <RawatDiriSection />
      <LatestArticleSection />
    </>
  );
}
