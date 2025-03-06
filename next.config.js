/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SPORTSDATAIO_API_KEY: process.env.SPORTSDATAIO_API_KEY,
    ODDS_API_KEY: process.env.ODDS_API_KEY,
  },
}

module.exports = nextConfig 