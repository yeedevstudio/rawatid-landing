import React from "react";
import HeroSection from "./HeroSection";
import SupportSection from "./SupportSection";
import ClinicSolutionSection from "./ClinicSolutionSection";
import RawatDiriSection from "./RawatDiriSection";
import LatestArticleSection from "./LatestArticleSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SupportSection />
      <ClinicSolutionSection />
      <RawatDiriSection />
      <LatestArticleSection />
    </>
  );
}
