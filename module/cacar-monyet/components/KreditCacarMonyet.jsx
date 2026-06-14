import React from "react";

const CREDITS = [
  {
    role: "Medical Writer",
    names: ["dr. Iffah Rizki Hasanah"],
  },
  {
    role: "Visual & Development",
    names: ["Sitti Tsarwa Akin", "Raisulwathan", "Khalil Maulana"],
  },
  {
    role: "Pengarah Produksi",
    names: ["Yaumil Ikhsan"],
  },
];

export default function KreditCacarMonyet() {
  return (
    <section className="w-full bg-white px-5 py-12 md:px-12 md:py-16 lg:px-20 lg:py-20 xl:px-24">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
        {CREDITS.map(({ role, names }) => (
          <div
            key={role}
            className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-[0px_0px_12.1px_0px_#0000001A] md:p-8"
          >
            <p className="text-[16px] font-bold text-neutral-800 md:text-[17px]">{role}</p>
            <div className="mt-3 flex flex-col items-center gap-1">
              {names.map((name) => (
                <p key={name} className="text-[14px] text-neutral-600 md:text-[15px]">{name}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
