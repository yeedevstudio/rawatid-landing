"use client";

import RiwayatKalori from "@/module/kalkulator-kalori/components/RiwayatKalori";
import { BMR_CALCULATOR_URL, BMR_RESULT_KEY } from "@/module/kalkulator-bmr/constants";

export default function RiwayatBmr() {
  return (
    <RiwayatKalori
      metric="bmr"
      abbr="BMR"
      apiBase="/api/bmr"
      calculatorUrl={BMR_CALCULATOR_URL}
      resultKey={BMR_RESULT_KEY}
    />
  );
}
