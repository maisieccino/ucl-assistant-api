const { ROOMS_SEARCH_URL } = require("./constants");
const JSONRequest = require("../JSONRequest");

const roomsSearch = async query => {
  if (!query || query.length <= 3) {
    throw new Error("Must provide a query!");
  }

  const url = `${ROOMS_SEARCH_URL}?token=${
    process.env.UCLAPI_TOKEN
  }&roomname=${query}`;

  return JSONRequest(url);
};

module.exports = { roomsSearch };
