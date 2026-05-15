import React from "react";

import HeroHepatitis from "./HeroHepatitis";
import HepatitisExploreSection from "./HepatitisExploreSection";
import HepatitisApaItuSection from "./HepatitisApaItuSection";
import HepatitisPenyebabSection from "./HepatitisPenyebabSection";
import HepatitisPenularanSection from "./HepatitisPenularanSection";
import HepatitisGejalaSection from "./HepatitisGejalaSection";
import HepatitisKomplikasiSection from "./HepatitisKomplikasiSection";
import HepatitisPencegahanSection from "./HepatitisPencegahanSection";
import HepatitisClosingSection from "./HepatitisClosingSection";

export default function HepatitisPage() {
  return (
    <>
      <HeroHepatitis />
      <HepatitisExploreSection />
      <HepatitisApaItuSection />
      <HepatitisPenyebabSection />
      <HepatitisPenularanSection />
      <HepatitisGejalaSection />
      <HepatitisKomplikasiSection />
      <HepatitisPencegahanSection />
      <HepatitisClosingSection />
    </>
  );
}
