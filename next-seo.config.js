const canonicalUrl = "https://rawat.id";
const metaImage =
  "https://res.cloudinary.com/ddugt5n5v/image/upload/v1737400229/RawatID02_q8ouek.png";
const metaDescription =
  "Digitalisasi Rekam Medis dengan Rawat.ID, Pekerjaan nakes jadi lebih mudah, pelayanan jadi lebih berkualitas, faskes jadi lebih untung!";
const metaKeywords =
  "Rawat.Id, faskes, Sistem Informasi Manajemen Kesehatan, Kesehatan, Rekam Medis, Rawat";

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
