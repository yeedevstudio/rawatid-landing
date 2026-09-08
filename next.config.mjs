/** @type {import('next').NextConfig} */
const nextConfig = {
 
  htmlLimitedBots: /.*/,

 
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
        ],
      },
      {
       
        source: "/:dir(image|images|dummy)/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  redirects: async () => {
    return [
     
      {
        source: "/contact",
        destination: "/tentang-kami#hubungi",
        permanent: true,
      },
      {
        source: "/alat-kesehatan",
        destination: "/alat-kesehatan/kalkulator-bmi",
        permanent: true,
      },
      {
        source: "/sistem-faskes",
        destination: "/sistem-faskes/rekam-medis-elektronik",
        permanent: true,
      },
      { source: "/cacar-air", destination: "/interaktif/cacar-air", permanent: true },
      { source: "/herpes-simplex", destination: "/interaktif/herpes-simplex", permanent: true },
      { source: "/dbd", destination: "/interaktif/dbd", permanent: true },
      { source: "/hepatitis", destination: "/interaktif/hepatitis", permanent: true },
      { source: "/demam-tifoid", destination: "/interaktif/demam-tifoid", permanent: true },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: "/drug-ingredients/public/:path*",
        destination: "https://cm-api.rawat.id/drug-ingredients/public/:path*",
      },
      {
        source: "/drugs/public",
        destination: "https://cm-api.rawat.id/drugs/public",
      },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "blog.rawat.id",
      },
      {
        protocol: "https",
        hostname: "www.rawat.id",
      },
      {
        protocol: "https",
        hostname: "rawat.id",
      },
      {
        protocol: "https",
        hostname: "cm-api.rawat.id",
      },
    ],
  },
};

export default nextConfig;
