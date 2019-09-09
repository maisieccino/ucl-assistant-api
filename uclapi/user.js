const { USER_TOKEN_URL, USER_DATA_URL } = require(`../constants/apiRoutes`)
const axios = require(`axios`)

const getToken = async code => (await axios.get(USER_TOKEN_URL, {
  params: {
    client_id: process.env.UCLAPI_CLIENT_ID,
    client_secret: process.env.UCLAPI_CLIENT_SECRET,
    code,
  },
})).data

const getUserData = async token => (await axios.get(USER_DATA_URL, {
  params: {
    client_secret: process.env.UCLAPI_CLIENT_SECRET,
    token,
  },
})).data

module.exports = {
  getToken,
  getUserData,
}
