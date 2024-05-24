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
            <h1>Could not find what you were looking for</h1>

            <iframe
              src="https://giphy.com/embed/3h2lUwrZKilQKbAK6f"
              width="480"
              height="201"
              allowFullScreen
            ></iframe>
            <p>
              <a href="https://giphy.com/gifs/starwars-star-wars-the-last-jedi-3h2lUwrZKilQKbAK6f"></a>
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default NotFoundPage;
