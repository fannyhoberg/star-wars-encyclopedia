import { Button, Col, Container, Row } from "react-bootstrap";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { useEffect, useState } from "react";
import { FilmResult } from "../Types/StarWarsAPI.types";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import LoadingGIF from "../components/LoadingGIF";
import ErrorGIF from "../components/ErrorGIF";

const Films = () => {
  const [result, setResult] = useState<FilmResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const navigate = useNavigate();

  const films = async (page: number) => {
    setResult(null);
    setIsLoading(true);
    setError(null);

    try {
      const data = await StarWarsAPI.getFilms(page);
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
    films(currentPage);
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
            <p>Showing {result.total} films</p>

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
                  <div className="card h-100  custom-card">
                    <div>
                      <img
                        src={res.image_url}
                        className="card-img-top "
                        alt={res.title}
                      />
                    </div>
                    <div className="card-body">
                      <span className="card-title">
                        Episode {res.episode_id}
                      </span>
                      <h3 className="card-title">{res.title}</h3>
                      <span className="card-title">{res.director}</span>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                      <Button
                        className="custom-button"
                        onClick={() => navigate(`/films/${res.id}`)}
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

export default Films;
