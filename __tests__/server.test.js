/**
 * @jest-environment node
 * https://github.com/axios/axios/issues/1754#issuecomment-435784235
 */
require(`dotenv`).config()
const request = require(`supertest`)
const app = require(`../server`)

const indexRoutes = require(`../constants/indexRoutes`)

describe(`test server`, () => {

  let server

  beforeAll(() => {
    server = app.listen()
  })

  afterAll(() => {
    server.close()
  })

  it(`responds with route indexes at /`, async () => {
    return await request(server)
      .get(`/`)
      .expect(200, { content: indexRoutes, error: `` })
  })

  it(`should pong when we ping`, async () => {
    return await request(server)
      .get(`/ping`)
      .expect(200, { content: `pong!`, error: `` })
  })

  it(`returns list of workspaces at /workspaces`, async () => {
    const { body } = await request(server).get(`/workspaces`)
    // ignore occupancy data because that will change a lot
    expect(body.content.map(({ id, name }) => ({ id, name }))).toMatchSnapshot()
  })

  it(`returns list of workspaces with summarised occupancy data at /workspaces/summary`, async () => {
    const { body } = await request(server).get(`/workspaces/summary`)
    // ignore occupancy data because that will change a lot
    expect(body.content.map(({ id, name }) => ({ id, name }))).toMatchSnapshot()
    body.content.forEach(workspace => {
      expect(workspace.maps.reduce((acc, cur) => acc + cur.occupied, 0) === workspace.occupied)
    })
  })
})
