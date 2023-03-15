/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    // Required:
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/:api*',
        destination: 'http://localhost:8080/:api*',
      },
    ];
  },

  webpack: (config, { isServer }) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    });
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }

    return config;
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
