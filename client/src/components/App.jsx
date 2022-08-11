import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header.jsx";
import SearchBar from "./Searchbar.jsx";
import Results from "./Results.jsx";
import Player from "./Player.jsx";

function App() {
  const [results, setResults] = useState([]);
  const [track, setTrack] = useState();
  const [defaultData, setDefaultData] = useState(true);
  const token = window.localStorage.getItem("token");

  const handleSearch = (searchKey) => {
    axios
      .post("/search", { searchKey })
      .then((res) => {
        setDefaultData(false);
        setResults(res.data.body.tracks.items);
      })
      .catch((err) => console.log(err));
  };
  const handlePlay = (uri) => {
    setTrack([uri]);
  };
  // get player's "browse" tab by default

  const getNewReleases = () => {
    axios
      .get("/browse/categories")
      .then((res) => {
        setDefaultData(true);
        setResults(res.data.body.albums.items);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getNewReleases();
  }, [token]);

  return (
    <div>
      <Header getNewReleases={getNewReleases}></Header>
      {/* <Login></Login> */}
      <SearchBar handleSearch={handleSearch}></SearchBar>
      {track ? <Player track={track} token={token}></Player> : null}
      <Results
        results={results}
        handlePlay={handlePlay}
        defaultData={defaultData}
      ></Results>
    </div>
  );
}

export default App;
