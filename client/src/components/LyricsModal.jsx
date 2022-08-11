import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const LyricsModal = ({ name, artist, handleClose }) => {
  const [lyrics, setLyrics] = useState();

  useEffect(() => {
    axios
      .get("/lyrics", {
        params: {
          name: name,
          artist: artist,
        },
      })
      .then((res) => {
        setLyrics(res.data.lyrics)

      });
  }, []);

  return (
    <Modal show={true} style={{"whiteSpace": "pre-line"}}>
    <Modal.Header closeButton onClick={()=>handleClose()}>
      <Modal.Title>{name}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{lyrics}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={()=>handleClose()}>Close</Button>
    </Modal.Footer>
  </Modal>
  );
};

export default LyricsModal;
