import React from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import Container from "react-bootstrap/Container";

const Player = ({ token, track }) => {
  return (
    <Container className='playerContainer'>
      <SpotifyPlayer
      token={token}
      uris={track}
      play={true}
      showSaveIcon={true} />
    </Container>
  );
};

export default Player;
