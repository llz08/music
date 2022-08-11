import React from "react";
import MusicEntry from "./MusicEntry.jsx";
import Container from "react-bootstrap/Container";
import LyricsModal from "./LyricsModal.jsx";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Results = ({ results, handlePlay, defaultData }) => {
  return (
    <Container>
      <Row xs={3} md={4} className="g-4">
        {results.map((item) => {
          {
            if (defaultData) {
              return (
                <Col>
                  <MusicEntry
                  item={item}
                    name={item.name}
                    key={item.id}
                    artist={item.artists[0].name}
                    album={item.images[1].url}
                    uri={item.uri}
                    handlePlay={handlePlay}
                  ></MusicEntry>
                </Col>
              );
            } else {
              return (
                <Col>
                  <MusicEntry
                  item={item}
                    name={item.name}
                    key={item.id}
                    artist={item.artists[0].name}
                    album={item.album.images[1].url}
                    uri={item.uri}
                    handlePlay={handlePlay}
                  ></MusicEntry>
                </Col>
              );
            }
          }
        })}
      </Row>
    </Container>
  );
};

// item.album.images? item.album.images[1].url :

export default Results;
