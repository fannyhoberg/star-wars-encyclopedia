import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { Button, Col, Container, Row } from "react-bootstrap";
import Pagination from "../components/Pagination";
import { StarShipsResult } from "../Types/StarWarsAPI.types";
import LoadingGIF from "../components/LoadingGIF";
import ErrorGIF from "../components/ErrorGIF";

const Starships = () => {
  const [result, setResult] = useState<StarShipsResult | null>(null);
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
      const data = await StarWarsAPI.getStarships(page);
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
      {isLoading && <LoadingGIF />}

      {error && (
        <>
          <h1>{error}</h1>
          <ErrorGIF />
        </>
      )}

      {result !== null && (
        <div>
          <Container>
            <p>Showing {result.total} starships</p>

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
                      <p>Film count: {res.films_count}</p>
                      <p>Pilot count: {res.pilots_count}</p>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                      <Button
                        className="custom-button"
                        onClick={() => navigate(`/starships/${res.id}`)}
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

export default Starships;
