const { PEOPLE_SEARCH_URL } = require(`../constants/apiRoutes`)
const axios = require(`axios`)

const peopleSearch = async query => {
  if (!query || query.length <= 3) {
    throw new Error(`Must provide a query!`)
  }

  return (await axios.get(PEOPLE_SEARCH_URL, {
    params: {
      token: process.env.UCLAPI_TOKEN,
      query,
    },
  })).data
}

module.exports = { peopleSearch }
