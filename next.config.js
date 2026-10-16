const path = require('path')
const createNextIntlPlugin = require('next-intl/plugin')
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const withNextIntl = createNextIntlPlugin()

const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: ['remark-gfm'],
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
  // `.mdx` = published posts. `dev.mdx` is appended in development only (see the
  // phase function below), so `page.dev.mdx` drafts get a real route under
  // `next dev` but are never discovered, built, or exported in production.
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

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER

  const config = {
    ...nextConfig,
    pageExtensions: isDev
      ? [...nextConfig.pageExtensions, 'dev.mdx']
      : nextConfig.pageExtensions,
  }

  return withBundleAnalyzer(withMDX(withNextIntl(config)))
}
