const config = {
  BASE_URL: process.env.NODE_ENV === 'production'
    ? 'https://promoads-be.vercel.app'
    : 'http://localhost:5000'
};

export default config;
