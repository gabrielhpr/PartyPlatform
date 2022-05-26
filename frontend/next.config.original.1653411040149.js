/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // webpack: (config, { dev }) => {
  //   config.module.rules.push(
  //     {
  //       test: /\.spec.js$/,
  //       loader: 'ignore-loader'
  //     }
  //   );
  //   return config;
  // }
}

module.exports = nextConfig
