const path = require('path')

const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    // Removed providerImportSource to fix createContext error
  },
})
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  output: 'export',
  pageExtensions: ['js', 'jsx', 'mdx'],
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
  },
  webpack: (config) => {
    // Resolve @/ alias (jsconfig.json paths aren't picked up with Babel)
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src'),
    }

    // Optimize bundle size
    config.optimization = {
      ...config.optimization,
      minimize: true,
      splitChunks: {
        chunks: 'all',
        minSize: 20000,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
      },
    }

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    }

    return config
  },
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  // Optimize for production
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
}

module.exports = withBundleAnalyzer(withMDX(nextConfig))
