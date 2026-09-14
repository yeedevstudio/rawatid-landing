"use client";

import RiwayatKalori from "@/module/kalkulator-kalori/components/RiwayatKalori";
import { TDEE_CALCULATOR_URL, TDEE_RESULT_KEY } from "@/module/kalkulator-tdee/constants";

export default function RiwayatTdee() {
  return (
    <RiwayatKalori
      metric="tdee"
      abbr="TDEE"
      apiBase="/api/tdee"
      calculatorUrl={TDEE_CALCULATOR_URL}
      resultKey={TDEE_RESULT_KEY}
      showActivity
    />
  );
}
