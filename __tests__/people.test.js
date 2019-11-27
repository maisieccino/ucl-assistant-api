require(`dotenv`).config()
const sinon = require(`sinon`)
const axios = require(`axios`)
const { PEOPLE_SEARCH_URL } = require(`../constants/apiRoutes`)

const { peopleSearch } = require(`../uclapi/people`)

describe(`people`, () => {
  it(`should send a valid search request`, async () => {
    const query = `William McGonagall`
    const searchRequest = sinon.mock(axios)

    searchRequest.expects(`get`).once().withExactArgs(
      PEOPLE_SEARCH_URL,
      {
        params: {
          token: process.env.UCLAPI_TOKEN,
          query,
        },
      },
    )

    peopleSearch(query)

    return searchRequest.verify()
  })
})
