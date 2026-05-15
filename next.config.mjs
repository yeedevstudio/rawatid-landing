/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow search engines and ad networks to crawl the site
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
    ];
  },
  redirects: async () => {
    return [
      { source: "/cacar-air", destination: "/interaktif/cacar-air", permanent: true },
      { source: "/herpes-simplex", destination: "/interaktif/herpes-simplex", permanent: true },
      { source: "/dbd", destination: "/interaktif/dbd", permanent: true },
      { source: "/hepatitis", destination: "/interaktif/hepatitis", permanent: true },
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
