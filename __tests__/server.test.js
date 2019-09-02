/**
 * @jest-environment node
 * https://github.com/axios/axios/issues/1754#issuecomment-435784235
 */
require(`dotenv`).config()
const request = require(`supertest`)
const server = require(`../server`)

const indexRoutes = require(`../constants/indexRoutes`)

describe(`test server`, () => {
  it(`responds with route indexes at /`, async () => {
    return await request(server.listen())
      .get(`/`)
      .expect(200, { content: indexRoutes, error: `` })
  })

  it(`should pong when we ping`, async () => {
    return await request(server.listen())
      .get(`/ping`)
      .expect(200, { content: `pong!`, error: `` })
  })
})
