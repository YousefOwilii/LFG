const repoName = 'LFG';

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

  // ✅ Corrected for GitHub Pages
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,

  trailingSlash: true,

  pageExtensions: ['tsx', 'ts', 'jsx', 'js'].filter(ext => !ext.includes('bak')),
};

module.exports = nextConfig;
