const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost/music")
  .then(() => console.log("Connected to Mongo Database"))
  .catch(() => console.log("Failed to connect to Mongo Database"));

const musicSchema = new Schema({
  name: String,
  artist: String,
  album: String,
  uri: String,
});

let Music = mongoose.model("Music", musicSchema);

module.exports = Music;
