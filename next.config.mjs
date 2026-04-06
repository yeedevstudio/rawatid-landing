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
    ],
  },
};

export default nextConfig;
