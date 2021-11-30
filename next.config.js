module.exports = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY, // you can also replace API_KEY value with your own Unsplash API key here
  },
  images: {
    domains: ['images.unsplash.com'],
  },
}
