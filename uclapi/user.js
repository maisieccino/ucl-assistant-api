const { USER_TOKEN_URL, USER_DATA_URL } = require(`../constants/apiRoutes`)
const axios = require(`axios`)

const getToken = code => axios.get(USER_TOKEN_URL, {
  params: {
    client_id: process.env.UCLAPI_CLIENT_ID,
    client_secret: process.env.UCLAPI_CLIENT_SECRET,
    code,
  },
})

const getUserData = token => axios.get(USER_DATA_URL, {
  params: {
    client_secret: process.env.UCLAPI_CLIENT_SECRET,
    token,
  },
})

module.exports = {
  getToken,
  getUserData,
}
