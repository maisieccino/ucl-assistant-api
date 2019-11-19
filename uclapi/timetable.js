const moment = require(`moment`)
const {
  MODULE_TIMETABLE_URL,
  PERSONAL_TIMETABLE_URL,
} = require(`../constants/apiRoutes`)
const axios = require(`axios`)

const getPersonalTimetable = async (token, date = null) => {
  const params = {
    client_secret: process.env.UCLAPI_CLIENT_SECRET,
    token,
  }
  if (date) {
    params[`date_filter`] = moment(date).format(`YYYY-MM-DD`)
  }
  const { data, headers } = await axios.get(PERSONAL_TIMETABLE_URL, { params })
  return {
    lastModified: headers[`last-modified`],
    data,
  }
}

const getModuleTimetable = async (token, timetableModule) => {
  const { data, headers } = await axios.get(MODULE_TIMETABLE_URL, {
    params: {
      client_secret: process.env.UCLAPI_CLIENT_SECRET,
      token,
      modules: timetableModule,
    },
  })
  return {
    lastModified: headers[`last-modified`],
    data,
  }
}

module.exports = {
  getModuleTimetable,
  getPersonalTimetable,
}
