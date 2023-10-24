require("dotenv").config();
const express = require("express");
const querystring = require("querystring");
const axios = require("axios");
const app = express();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 * From Spotify Authorization Code
 * https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js
 */
var generateRandomString = function (length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

// app.METHOD(PATH, HANDLER)

app.get("/", (req, res) => {
  res.send("Hello World");
});

const stateKey = "spotify_auth_state";

app.get("/login", (req, res) => {
  // 1: Request user authorization
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = [
    "user-read-private",
    "playlist-read-private",
    "playlist-modify-public",
    "playlist-modify-private"
  ].join(" ");
  const queryParams = querystring.stringify({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    state: state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

app.get("/callback", (req, res) => {
  const code = req.query.code || null;

  // request spotify authorization for upswift
  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      // successfully authorized
      if (response.status === 200) {
        const { access_token, refresh_token, expires_in } = response.data;

        const queryParams = querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token,
          expires_in: expires_in,
        });

        // redirect back to upswift
        res.redirect(`http://localhost:3000/?${queryParams}`);
      } else {
        const invalidParams = querystring.stringify({
          error: "invalid_token",
        });
        res.redirect(`/?${invalidParams}`);
      }
    })
    .catch((error) => {
      res.send(error);
    });
});

app.get("/refresh_token", (req, res) => {
  const { refresh_token } = req.query;

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${new Buffer.from(
        `${CLIENT_ID}:${CLIENT_SECRET}`
      ).toString("base64")}`,
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
});

const port = 8888;
app.listen(port, () => {
  console.log(`Express app running on port ${port}`);
});
