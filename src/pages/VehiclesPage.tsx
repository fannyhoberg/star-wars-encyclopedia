import { useEffect, useState } from "react";
import { VehiclesResult } from "../Types/StarWarsAPI.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { Button, Col, Container, Row } from "react-bootstrap";
import Pagination from "../components/Pagination";

const VehiclesPage = () => {
  const [result, setResult] = useState<VehiclesResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const navigate = useNavigate();

  const people = async (page: number) => {
    setResult(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await StarWarsAPI.getVehicles(page);
      await new Promise((r) => setTimeout(r, 1000));

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

  const previousPage = async () => {
    const newPage = page - 1;
    setSearchParams({ page: newPage.toString() });
    setPage(newPage);
  };

  const nextPage = async () => {
    const newPage = page + 1;
    setSearchParams({ page: newPage.toString() });
    setPage(newPage);
  };

  useEffect(() => {
    setPage(currentPage);
    people(currentPage);
  }, [currentPage]);

  return (
    <>
      {isLoading && (
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
      )}

      {error && (
        <Container
          fluid
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "50vh" }}
        >
          <Row>
            <Col className="text-center">
              <h1>{error}</h1>

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
      )}

      {result !== null && (
        <div>
          <Container fluid className="custom-container">
            <p>Showing {result.total} vehicles</p>

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
                  <div className="card h-100 custom-card-no-image">
                    <div className="card-body">
                      <h3 className="card-title">{res.name}</h3>
                      <p>Model: {res.model}</p>
                      <p>Vehicle class: {res.vehicle_class}</p>
                      <p>Film count: {res.films_count}</p>
                      <p>Pilot count: {res.pilots_count}</p>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                      <Button
                        className="custom-button"
                        onClick={() => navigate(`/vehicles/${res.id}`)}
                      >
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
            onNextPage={nextPage}
            onPreviousPage={previousPage}
            page={result.current_page}
            totalPages={result.last_page}
          />
        </div>
      )}
    </>
  );
};

export default VehiclesPage;
