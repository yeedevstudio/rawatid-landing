"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export function CheckboxTerms({ onChange }) {
  const [checked, setChecked] = useState(false);

  const handleCheckboxChange = (isChecked) => {
    setChecked(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <div className="flex items-center space-x-2 my-5">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={(isChecked) => handleCheckboxChange(isChecked)}
      />
      <label
        htmlFor="terms"
        className="text-xs md:text-lg font-normal text-neutral90 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Saya menyetujui Syarat dan Ketentuan dan kebijakan privasi Aplikasi
        Rawat.ID
      </label>
    </div>
  );
}
