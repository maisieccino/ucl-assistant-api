const moment = require(`moment`)
const {
  ROOMBOOKINGS_DATA_URL,
  ROOMBOOKINGS_FREEROOMS_URL,
} = require(`../constants/apiRoutes`)
const axios = require(`axios`)

const { UCLAPI_TOKEN } = process.env

const getRoomBookings = async ({ roomid, siteid, date }) => {
  if (!roomid) {
    throw new Error(`Must provide a roomid!`)
  }
  if (!siteid) {
    throw new Error(`Must provide a siteid`)
  }

  return (await axios.get(ROOMBOOKINGS_DATA_URL, {
    params: {
      token: UCLAPI_TOKEN,
      roomid,
      siteid,
      date,
    },
  })).data
}

const getFreeRooms = async (
  startDateTime = new Date().toISOString(),
  endDateTime = moment()
    .endOf(`day`)
    .toISOString(),
) => {

  return (await axios.get(ROOMBOOKINGS_FREEROOMS_URL, {
    params: {
      token: UCLAPI_TOKEN,
      start_datetime: startDateTime,
      end_datetime: endDateTime,
    },
  })).data
}

module.exports = {
  getRoomBookings,
  getFreeRooms,
}
