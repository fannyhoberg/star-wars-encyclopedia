import { Col, Container, Row } from "react-bootstrap";

const LoadingGIF = () => {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Row>
          <Col className="text-center">
            <iframe
              src="https://giphy.com/embed/3ornka9rAaKRA2Rkac"
              width="480"
              height="204"
              allowFullScreen
              title="Loading GIF"
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/starwars-movie-star-wars-3ornka9rAaKRA2Rkac"></a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoadingGIF;
