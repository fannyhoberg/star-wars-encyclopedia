import { Col, Container, Row } from "react-bootstrap";

const ErrorGIF = () => {
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
              src="https://giphy.com/embed/3ohuPel436qciQZ8fC"
              width="480"
              height="204"
              allowFullScreen
              title="Error GIF"
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/starwars-star-wars-done-3ohuPel436qciQZ8fC"></a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ErrorGIF;
