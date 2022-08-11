const Music = require("./db");

//save

let save = (music) => {
  return Music.create({
    music
  })
    .then((doc) => {
      return doc;
    })
    .catch((err) => console.log(err));
};

let get = () => {
  return Music.find()
    .exec()
    .then((doc) => {
      return doc;
    })
    .catch((err) => console.log(err));
};

//delete

let deleteOne = (music) => {
  return Music.deleteOne({
    name: music.name,
    artist: music.artist,
  })
    .then((doc) => console.log("deleted 1 entry"))
    .catch((err) => console.log(err));
};

module.exports = {
  save,
  get,
  deleteOne,
};
