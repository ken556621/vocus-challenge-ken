const {
  DEV_BASE_URL,
  PRD_BASE_URL,
  PORT
} = process.env

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    DEV_BASE_URL,
    PRD_BASE_URL,
    PORT
  }
}
