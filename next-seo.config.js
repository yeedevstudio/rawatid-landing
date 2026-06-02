const canonicalUrl = "https://rawat.id";

const metaImage = "https://res.cloudinary.com/ddugt5n5v/image/upload/v1737400229/RawatID02_q8ouek.png";

const metaDescription = "Memberikan solusi dan berbagai informasi kesehatan terbaik untuk merawat kesehatanmu";

const metaKeywords =
  "Rawat ID, Informasi Kesehatan, Informasi Penyakit, Gejala Penyakit, Diagnosis Penyakit, Penanganan Penyakit, Pengobatan Penyakit, Informasi Obat, Manfaat Obat, Kandungan Obat, Efek Samping Obat, Interaksi Obat, Tips Hidup Sehat, Menu Diet, Menu Sehat, Kalkulator Kesehatan, Hidup Sehat, Mencegah Penyakit, Kesehatan Mental, Tips Kesehatan, Tips Penyakit, Informasi Rumah Sakit, Informasi Klinik, Informasi Tenaga Kesehatan, Informasi Fasilitas Kesehatan, Direktori Kesehatan, Kesehatan Masyarakat, Tips Menjaga Kesehatan, Tips Mencegah Penyakit";

const defaultSEOConfig = {
  defaultTitle: "Rawat ID",
  description: metaDescription,
  keywords: metaKeywords,
  canonical: canonicalUrl,
  openGraph: {
    canonical: canonicalUrl,
    title: "Rawat ID",
    description: metaDescription,
    type: "website",
    images: [
      {
        url: metaImage,
        alt: "rawat.id og-image",
        width: 800,
        height: 600,
      },
      {
        url: metaImage,
        alt: "rawat.id og-image",
        width: 1200,
        height: 630,
      },
      {
        url: metaImage,
        alt: "rawat.id og-image",
        width: 1600,
        height: 900,
      },
    ],
    site_name: "rawat.id",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
