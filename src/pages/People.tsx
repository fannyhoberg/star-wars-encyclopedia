import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { PeopleResult } from "../Types/StarWarsAPI.types";
import { Button, Col, Container, Row } from "react-bootstrap";

const People = () => {
  const [result, setResult] = useState<PeopleResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const people = async () => {
    setResult(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await StarWarsAPI.getPeople();
      await new Promise((r) => setTimeout(r, 2000));

      console.log("data", data);

      setResult(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("The force is not strong with this one 🥲");
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    people();
  }, []);

  return (
    <>
      {isLoading && (
        <div>
          <iframe
            src="https://giphy.com/embed/3ornka9rAaKRA2Rkac"
            width="480"
            height="204"
            allowFullScreen
          ></iframe>
          <p>
            <a href="https://giphy.com/gifs/starwars-movie-star-wars-3ornka9rAaKRA2Rkac"></a>
          </p>
        </div>
      )}

      {error && <p>{error}</p>}

      {result !== null && (
        <div>
          <p>Showing {result.total} films</p>
          <Container fluid className="custom-container">
            <Row className="g-3">
              {result.data.map((res) => (
                <Col
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  key={res.id}
                  className="d-flex"
                >
                  <div className="card h-50">
                    <img
                      src={res.image_url}
                      className="card-img-top"
                      alt={res.name}
                    />
                    <div className="card-body">
                      <h3 className="card-title">{res.name}</h3>
                    </div>
                    <div>
                      <Button onClick={() => navigate(`/people/${res.id}`)}>
                        Read more
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default People;
