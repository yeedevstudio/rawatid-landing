const CREDITS = [
  { role: "Medical Writer", names: ["dr. Iffah Rizki Hasanah"] },
  { role: "Visual & Development", names: ["Sitti Tsarwa Akin", "Raisulwathan", "Khalil Maulana"] },
  { role: "Pengarah Produksi", names: ["Yaumil Ikhsan"] },
];

export default function KreditFluBurung() {
  return (
    <section className="w-full bg-white px-5 py-10 md:px-12 lg:px-20 xl:px-24">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
        {CREDITS.map((c) => (
          <div
            key={c.role}
            className="flex flex-col items-center gap-2 rounded-2xl bg-white p-6 text-center shadow-[0px_0px_12.1px_0px_#0000001A] md:p-8"
          >
            <span className="text-[14px] font-bold text-neutral-900 md:text-[15px]">{c.role}</span>
            {c.names.map((name) => (
              <span key={name} className="text-[13px] text-neutral-600 md:text-[14px]">{name}</span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
