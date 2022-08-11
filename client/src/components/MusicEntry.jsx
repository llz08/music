import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import LyricsModal from "./LyricsModal.jsx";
import Button from "react-bootstrap/Button";
import axios from "axios";

const MusicEntry = ({ name, artist, album, uri, handlePlay, item }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    handlePlay(uri);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLike = () => {
    axios.post('/save', {
      item
    })
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  };

  return (
    <>
      <Card className="cards" >
        <Card.Img variant="top" src={album} onClick={handleClick}></Card.Img>
        <Card.Body onClick={handleClick}>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{artist}</Card.Text>
        </Card.Body>
        <div>
          <Button className="btn" variant="outline-light" onClick={handleLike}>
            Add to Favorites
          </Button>
          <Button className="btn" variant="outline-light" onClick={()=>setOpenModal(true)} disable={true}>
            Lyrics
          </Button>
        </div>
      </Card>

      {openModal ? (
        <LyricsModal
          name={name}
          artist={artist}
          handleClose={handleClose}
        ></LyricsModal>
      ) : null}
    </>
  );
};

export default MusicEntry;
