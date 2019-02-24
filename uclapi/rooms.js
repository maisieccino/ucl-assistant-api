const { ROOMS_SEARCH_URL, ROOMS_EQUIPMENT_URL } = require("./constants");
const JSONRequest = require("../JSONRequest");

const { UCLAPI_TOKEN } = process.env;

const roomsSearch = async query => {
  if (!query || query.length <= 3) {
    throw new Error("Must provide a query!");
  }

  const url = `${ROOMS_SEARCH_URL}?token=${UCLAPI_TOKEN}&roomname=${query}`;

  return JSONRequest(url);
};

const getEquipment = async (roomid, siteid) => {
  if (!roomid || !siteid) {
    throw new Error("Must specify roomid and siteid");
  }

  const url = `${ROOMS_EQUIPMENT_URL}?token=${UCLAPI_TOKEN}&roomid=${roomid}&siteid=${siteid}`;

  return JSONRequest(url);
};

module.exports = {
  roomsSearch,
  getEquipment,
};
