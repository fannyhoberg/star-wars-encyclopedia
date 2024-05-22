import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { PeopleResult } from "../Types/StarWarsAPI.types";
import { Button, Col, Container, Row } from "react-bootstrap";
import Pagination from "../components/Pagination";

const People = () => {
  const [result, setResult] = useState<PeopleResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const people = async (page: number) => {
    setResult(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await StarWarsAPI.getPeople(page);
      await new Promise((r) => setTimeout(r, 1000));

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
    people(page);
  }, [page]);

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
          <p>Showing {result.total} people</p>
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
                  <div className="card h-100">
                    <div>
                      <img
                        src={res.image_url}
                        className="card-img-top"
                        alt={res.name}
                      />
                    </div>
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
          <Pagination
            previousPage={result.from > 1}
            nextPage={result.current_page < result.last_page}
            onNextPage={() => {
              setPage((prevValue) => prevValue + 1);
            }}
            onPreviousPage={() => {
              setPage((prevValue) => prevValue - 1);
            }}
            page={result.current_page}
            totalPages={result.last_page}
          />
        </div>
      )}
    </>
  );
};

export default People;
