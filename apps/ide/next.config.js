/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@a2ide/ui', '@a2ide/types'],
  experimental: {
    serverComponentsExternalPackages: ['monaco-editor']
  }
}

module.exports = nextConfig
