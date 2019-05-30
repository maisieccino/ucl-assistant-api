const { PEOPLE_SEARCH_URL } = require("../constants/apiRoutes");
const JSONRequest = require("../JSONRequest").JSONRequest;

const peopleSearch = async query => {
  if (!query || query.length <= 3) {
    throw new Error("Must provide a query!");
  }

  const url = `${PEOPLE_SEARCH_URL}?token=${
    process.env.UCLAPI_TOKEN
  }&query=${query}`;

  return JSONRequest(url);
};

module.exports = { peopleSearch };
