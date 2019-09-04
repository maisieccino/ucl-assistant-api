const {
  ROOMS_SEARCH_URL,
  ROOMS_EQUIPMENT_URL,
} = require(`../constants/apiRoutes`)
const axios = require(`axios`)

const { UCLAPI_TOKEN } = process.env

const roomsSearch = async query => {
  if (!query || query.length <= 3) {
    throw new Error(`Must provide a query!`)
  }

  return axios.get(ROOMS_SEARCH_URL, {
    params: {
      token: UCLAPI_TOKEN,
      roomname: query,
    },
  })
}

const getEquipment = async (roomid, siteid) => {
  if (!roomid || !siteid) {
    throw new Error(`Must specify roomid and siteid`)
  }

  return axios.get(ROOMS_EQUIPMENT_URL, {
    params: {
      token: UCLAPI_TOKEN,
      roomid,
      siteid,
    },
  })
}

module.exports = {
  roomsSearch,
  getEquipment,
}
