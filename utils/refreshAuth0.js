const axios = require('axios').default
const { config } = require('../config')

async function refreshAuth0Token () {
  const options = {
    method: 'POST',
    url: `https://${config.auth0Domain}/oauth/token`,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: {
      grant_type: 'client_credentials',
      client_id: config.auth0ClientId,
      client_secret: config.auth0ClientSecret,
      audience: `https://${config.auth0Domain}/api/v2/`
    }
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  refreshAuth0Token
}
