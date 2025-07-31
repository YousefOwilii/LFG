/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'],
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  output: 'export',
  // For GitHub Pages with repository name in URL
  basePath: '/LFG',
  assetPrefix: '/LFG',
  // Add trailingSlash to ensure proper routing with static export
  trailingSlash: true,
  // Ignore the pages.bak directory
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => !ext.includes('bak')),
};

module.exports = nextConfig; 