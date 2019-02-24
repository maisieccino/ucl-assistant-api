const moment = require("moment");
const {
  ROOMBOOKINGS_DATA_URL,
  ROOMBOOKINGS_FREEROOMS_URL,
} = require("./constants");
const JSONRequest = require("../JSONRequest");

const { UCLAPI_TOKEN } = process.env;

const getRoomBookings = async ({ roomid, siteid, date }) => {
  if (!roomid) {
    throw new Error("Must provide a roomid!");
  }
  if (!siteid) {
    throw new Error("Must provide a siteid");
  }

  const url = `${ROOMBOOKINGS_DATA_URL}?token=${UCLAPI_TOKEN}&roomid=${roomid}&siteid=${siteid}&date=${date}`;

  return JSONRequest(url);
};

const getFreeRooms = async (
  startDateTime = new Date().toISOString(),
  endDateTime = moment()
    .endOf("day")
    .toISOString(),
) => {
  const url = `${ROOMBOOKINGS_FREEROOMS_URL}?token=${UCLAPI_TOKEN}&start_datetime=${startDateTime}&end_datetime=${endDateTime}`;

  return JSONRequest(url);
};

module.exports = {
  getRoomBookings,
  getFreeRooms,
};
