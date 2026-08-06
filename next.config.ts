import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/how-suo-you-are-test",
        assetPrefix: "/how-suo-you-are-test",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
