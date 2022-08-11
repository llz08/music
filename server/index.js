require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const songlyrics = require("songlyrics").default;
const {save, get, deleteOne} = require("../database/controllers");

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
    })
    .catch((err) => console.log(err));
});

// handle Search function
app.post("/search", (req, res) => {
  spotifyApi
    .searchTracks(req.body.searchKey)
    .then((data) => {
      res.send(data);
    })
    .then((err) => console.error(err));
});

// save favorites
app.post("/save", (req, res) => {
  save(req.body)
  .then(data=>{
    console.log(data)
    res.send(data)})
  .catch(err=>console.log(err))
});

//get favorites
app.get("/favorites", (req, res) => {
  get()
  .then(data=>res.send(data))
  .catch(err=>console.log(err))
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
  songlyrics(req.query.name + req.query.artist)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 3000;
app.listen(process.env.PORT, (req, res) => {
  console.log(`Server running at http://localhost:${PORT}`);
});
