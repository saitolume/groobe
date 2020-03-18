const withImages = require('next-images')

module.exports = withImages({
  env: {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    DOMAIN_PRODUCTION: process.env.DOMAIN_PRODUCTION,
    DOMAIN_DEVELOPMENT: process.env.DOMAIN_DEVELOPMENT
  },
  esModule: true,
  webpack(config) {
    return config
  }
})
