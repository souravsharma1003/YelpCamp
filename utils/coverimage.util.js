const axios = require("axios");

const url = "https://api.pexels.com/v1/search";

module.exports = async (q) => {
  try {
    const randomPage = Math.floor(Math.random() * 50) + 1; // pages 1–50

    const response = await axios.get(url, {
      params: {
        query: q,
        per_page: 15,
        page: randomPage
      },
      headers: {
        Authorization: process.env.PEXEL_KEY
      }
    });

    const photos = response.data.photos;

    if (!photos || photos.length === 0) {
      return null;
    }

    const randomPhoto =
      photos[Math.floor(Math.random() * photos.length)];

    return randomPhoto;
  } catch (error) {
    console.error(
      "Pexels API Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};
