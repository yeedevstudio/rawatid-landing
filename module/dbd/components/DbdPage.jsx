import React from "react";
import DbdApaItuSection from "./DbdApaItuSection";
import DbdExploreSection from "./DbdExploreSection";
import DbdHeroSection from "./DbdHeroSection";
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
    </>
  );
}
