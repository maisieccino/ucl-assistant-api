/**
 * @jest-environment node
 * https://github.com/axios/axios/issues/1754#issuecomment-435784235
 */
require(`dotenv`).config()
const axios = require(`axios`)

const indexRoutes = require(`../constants/indexRoutes`)

describe(`test server`, () => {
  // assumes server is running
  const port = process.env.PORT || 3000
  const request = axios.create({
    baseURL: `http://localhost:${port}`,
    timeout: 5000,
  })

  it(`responds with route indexes at /`, async () => {
    const response = await request.get(`/`)
    expect(response.data.content).toEqual(indexRoutes)
  })

  it(`should pong when we ping`, async () => {
    const response = await request.get(`/ping`)
    expect(response.data.content).toEqual(`pong!`)
  })
})
