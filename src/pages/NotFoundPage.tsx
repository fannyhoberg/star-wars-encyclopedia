import { Col, Container, Row } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <>
      <Container
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Row>
          <Col className="text-center">
            <h1>404 Not Found</h1>

            <iframe
              src="https://giphy.com/embed/3o84sF21zQYacFcl68"
              width="480"
              height="201"
              allowFullScreen
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/starwars-movie-star-wars-3o84sF21zQYacFcl68"></a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFoundPage;
