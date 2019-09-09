const moment = require(`moment`)
const {
  MODULE_TIMETABLE_URL,
  PERSONAL_TIMETABLE_URL,
} = require(`../constants/apiRoutes`)
const axios = require(`axios`)

const getPersonalTimetable = async (token, date = null) => {
  let params = {
    client_secret: process.env.UCLAPI_CLIENT_SECRET,
    token,
  }
  if (date) {
    params[`date_filter`] = moment(date).format(`YYYY-MM-DD`)
  }
  return (await axios.get(PERSONAL_TIMETABLE_URL, { params })).data
}

const getModuleTimetable = async (token, module) => (await axios.get(MODULE_TIMETABLE_URL, {
  params: {
    client_secret: process.env.UCLAPI_CLIENT_SECRET,
    token,
    modules: module,
  },
})).data

module.exports = {
  getModuleTimetable,
  getPersonalTimetable,
}
