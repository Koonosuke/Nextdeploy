/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["2025hakkasonn01.s3.ap-northeast-1.amazonaws.com"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "https://goport.onrender.com", // ← RenderのAPI URL
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, Content-Type, Authorization, X-Requested-With",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
