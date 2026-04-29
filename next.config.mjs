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
  rewrites: async () => {
    return [
      // Expose CM API endpoints without /api prefix (still same-origin).
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
