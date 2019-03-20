const Koa = require("koa");
const Router = require("koa-router");
const { jwt } = require("../middleware/auth");
const { getUserData } = require("./user");
const { getPersonalTimetable } = require("./timetable");
const { peopleSearch } = require("./people");
const { roomsSearch, getEquipment } = require("./rooms");
const { loadOrFetch } = require("../redis");
const { getRoomBookings, getFreeRooms } = require("./roombookings");
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
  WORKSPACE_SURVEYS_PATH,
  WORKSPACE_EQUIPMENT_PATH,
  PEOPLE_SEARCH_PATH,
  ROOMS_SEARCH_PATH,
} = require("../redis/keys");
const {
  WORKSPACE_SUMMARY_TTL,
  WORKSPACE_HISTORIC_DATA_TTL,
  WORKSPACE_SURVEYS_TTL,
  WORKSPACE_EQUIPMENT_TTL,
  PEOPLE_SEARCH_TTL,
  ROOMS_SEARCH_TTL,
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
  const data = await loadOrFetch(
    ctx,
    `${PEOPLE_SEARCH_PATH}/${ctx.query.query}`,
    async () => peopleSearch(ctx.query.query),
    PEOPLE_SEARCH_TTL,
  );
  ctx.body = data;
});

router.get("/search/rooms", jwt, async ctx => {
  ctx.assert(
    (ctx.query.query || "").length >= 3,
    400,
    "Query must be at least four characters long",
  );
  const data = await loadOrFetch(
    ctx,
    `${ROOMS_SEARCH_PATH}/${ctx.query.query}`,
    async () => roomsSearch(ctx.query.query),
    ROOMS_SEARCH_TTL,
  );
  ctx.body = data;
});

router.get("/equipment", jwt, async ctx => {
  ctx.assert(ctx.query.roomid, "Must specify roomid");
  ctx.assert(ctx.query.siteid, "Must specify siteid");
  const data = await loadOrFetch(
    ctx,
    `${WORKSPACE_EQUIPMENT_PATH}/${ctx.query.roomid}/${ctx.query.siteid}`,
    async () => getEquipment(ctx.query.roomid, ctx.query.siteid),
    WORKSPACE_EQUIPMENT_TTL,
  );
  ctx.body = data;
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
  const surveyFilter = ctx.query.survey_filter
    ? ctx.query.survey_filter
    : "student";
  ctx.body = await loadOrFetch(
    ctx,
    `${WORKSPACE_SURVEYS_PATH}/${surveyFilter}`,
    async () => getWorkspaces(surveyFilter),
    WORKSPACE_SURVEYS_TTL,
  );
});

router.get("/roombookings", jwt, async ctx => {
  ctx.assert(ctx.query.roomid, 400, "Please include a roomid");
  ctx.assert(ctx.query.siteid, 400, "Please include a siteid");
  ctx.assert(ctx.query.date, 400, "Please include a date");
  ctx.body = await getRoomBookings({
    roomid: ctx.query.roomid,
    siteid: ctx.query.siteid,
    date: ctx.query.date,
  });
});

router.get("/freerooms", jwt, async ctx => {
  ctx.body = await getFreeRooms();
});

app.use(router.routes());
app.use(router.allowedMethods());

module.exports = app;
