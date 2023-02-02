/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["api.dicebear.com", "chekt-chat.s3.us-west-004.backblazeb2.com"],
  },
};

module.exports = nextConfig;
