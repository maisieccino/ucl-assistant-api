const Koa = require("koa");
const Router = require("koa-router");
const { jwt } = require("../middleware/auth");
const { getUserData } = require("./user");
const { getPersonalTimetable } = require("./timetable");
const { peopleSearch } = require("./people");
const { roomsSearch } = require("./rooms");
const { loadOrFetch } = require("../redis");
const {
  getWorkspaces,
  getImage,
  getLiveImage,
  getSeatingInfo,
  getAllSeatInfo,
  getHistoricSeatInfo,
} = require("./workspaces");
const {
  WORKSPACE_SUMMARY_PATH,
  WORKSPACE_HISTORIC_DATA_PATH,
} = require("../redis/keys");
const {
  WORKSPACE_SUMMARY_TTL,
  WORKSPACE_HISTORIC_DATA_TTL,
} = require("../redis/ttl");

const app = new Koa();
const router = new Router();

router.get("/user", jwt, async ctx => {
  ctx.body = await getUserData(ctx.state.user.apiToken);
});

router.get("/timetable", jwt, async ctx => {
  const date = ctx.query.date || null;
  ctx.body = await getPersonalTimetable(ctx.state.user.apiToken, date);
});

router.get("/search/people", jwt, async ctx => {
  ctx.assert(
    (ctx.query.query || "").length >= 3,
    400,
    "Query must be at least three characters long",
  );
  ctx.body = await peopleSearch(ctx.query.query);
});

router.get("/search/rooms", jwt, async ctx => {
  ctx.assert(
    (ctx.query.query || "").length >= 3,
    400,
    "Query must be at least four characters long",
  );
  ctx.body = await roomsSearch(ctx.query.query);
});

router.get("/workspaces/getimage/:id.png", jwt, async ctx => {
  ctx.assert(ctx.params.id, 400);
  ctx.response.headers["Content-Type"] = "image/png";
  ctx.state.jsonify = false;
  const res = await getImage(ctx.params.id);
  ctx.body = res.body;
});

router.get("/workspaces/getliveimage/map.svg", jwt, async ctx => {
  ctx.assert(ctx.query.survey_id);
  ctx.assert(ctx.query.map_id);
  ctx.response.headers["Content-Type"] = "image/svg+xml";
  ctx.state.jsonify = false;
  const res = await getLiveImage(ctx.query.survey_id, ctx.query.map_id);
  ctx.body = res.body;
});

router.get("/workspaces/summary", jwt, async ctx => {
  const data = await loadOrFetch(
    ctx,
    WORKSPACE_SUMMARY_PATH,
    async () => getAllSeatInfo(),
    WORKSPACE_SUMMARY_TTL,
  );
  ctx.body = data;
});

router.get("/workspaces/historic", jwt, async ctx => {
  ctx.assert(ctx.query.id, 400, "Need to include a survey id.");
  const data = await loadOrFetch(
    ctx,
    `${WORKSPACE_HISTORIC_DATA_PATH}/${ctx.query.id}`,
    async () => getHistoricSeatInfo(ctx.query.id),
    WORKSPACE_HISTORIC_DATA_TTL,
  );
  ctx.body = data;
});

router.get("/workspaces/:id/seatinfo", jwt, async ctx => {
  ctx.assert(ctx.params.id, 400);
  ctx.body = await getSeatingInfo(ctx.params.id);
});

router.get("/workspaces", jwt, async ctx => {
  ctx.body = getWorkspaces();
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
