require("dotenv").config();
const sinon = require("sinon");
const JSONRequest = require("../JSONRequest");
const { PEOPLE_SEARCH_URL } = require("../constants/apiRoutes");

const { peopleSearch } = require("../uclapi/people");

describe("people", () => {
  it("should send a valid search request", async () => {
    // const query = 'William McGonagall'
    // const jsonreq = sinon.mock(JSONRequest)
    // jsonreq.expects('JSONRequest').once().withExactArgs(
    //   `${PEOPLE_SEARCH_URL}?token=${
    //     process.env.UCLAPI_TOKEN
    //   }&query=${query}`
    // )
    // console.log(peopleSearch(query))
    // jsonreq.verify()
  });
});
