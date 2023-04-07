//const jwt = require("jsonwebtoken");
const config = require("config");
const axios = require("axios");
var querystring = require('querystring');
module.exports = async function (req, res, next) {
  try {
    const accessToken = req.header("Authorization");
    const basic = `${config.get("CLIENT_ID")}:${config.get("CLIENT_SECRET")}`;
    const encodedToken = Buffer.from(basic).toString('base64');

    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
    const isValidAccessToken = await axios.post(config.get("AUTH_URL") + "introspect", querystring.stringify({
      token: accessToken

    }), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        'Authorization': 'Basic ' + encodedToken
      }
    });
    if (isValidAccessToken.data === 'expired token')
      res.status(401).send("Invalid token.");
    else
      next();

  } catch (error) {

    res.status(401).send("Invalid token.");
  }

};
