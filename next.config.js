const withImages = require('next-images')

module.exports = withImages({
  env: {
    PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
    IS_DEV: process.env.NODE_ENV !== 'production',
    DOMAIN: (process.env.NODE_ENV === 'production' ? process.env.DOMAIN_PRODUCTION : process.env.DOMAIN_DEVELOPMENT) || '',
  },
  esModule: true,
  webpack(config) {
    return config
  }
})
