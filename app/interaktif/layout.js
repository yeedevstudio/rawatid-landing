// page.js di route ini "use client", sehingga tidak boleh meng-export metadata.
// Metadata-nya dipasang di layout ini agar title-nya tidak jatuh ke default root.
export const metadata = {
  title: "Artikel Interaktif Rawat ID - Memberikan Solusi dan Informasi Terbaik untuk Merawat Kesehatanmu",
  alternates: {
    canonical: "https://www.rawat.id/interaktif",
  },
};

export default function InteraktifLayout({ children }) {
  return children;
}
