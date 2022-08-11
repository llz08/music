require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const songlyrics = require("songlyrics").default;

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../client/public")));

//getToken
let spotifyApi = new SpotifyWebApi({
  clientId: process.env.ID,
  clientSecret: process.env.SECRET,
  redirectUri: `http://localhost:${process.env.PORT}`,
});

app.post("/login", (req, res) => {
  const { authCode } = req.body;
  spotifyApi
    .authorizationCodeGrant(authCode)
    .then((data) => {
      res.send(data.body);
      spotifyApi.setAccessToken(data.body["access_token"]);
      spotifyApi.setRefreshToken(data.body["refresh_token"]);
      console.log(spotifyApi);
    })
    .catch((err) => console.log(err));
});

// handle Search function
app.post("/search", (req, res) => {
  console.log(req.body.searchKey);
  spotifyApi
    .searchTracks(req.body.searchKey)
    .then((data) => {
      res.send(data);
    })
    .then((err) => console.error(err));
});

// get browse tracks upon load
app.get("/browse/categories", (req, res) => {

  spotifyApi
    .getNewReleases()
    .then((data) => {
      console.log('❤️', data)
      res.send(data);
    })
    .catch((err) => console.log(err));
});
// get Lyrics
app.get("/lyrics", (req, res) => {
  console.log(req.query);
  songlyrics(req.query.name + req.query.artist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
