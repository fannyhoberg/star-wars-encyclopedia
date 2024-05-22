import { Button, Col, Container, Row } from "react-bootstrap";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { useEffect, useState } from "react";
import { FilmDetail, FilmResult } from "../Types/StarWarsAPI.types";
import { useNavigate } from "react-router-dom";
import FilmDetails from "../components/FilmDetails";

const Films = () => {
  const [result, setResult] = useState<FilmResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detail, setDetail] = useState<FilmDetail | null>(null);

  const navigate = useNavigate();

  const films = async () => {
    setResult(null);
    setIsLoading(true);
    setError(null);
    setDetail(null);

    try {
      const data = await StarWarsAPI.getFilms();
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

  // const getFilmDetails = async (id: number) => {
  //   setResult(null);
  //   setDetail(null);
  //   navigate(`/films/${id}`);

  //   try {
  //     const data = await StarWarsAPI.getFilm(id);

  //     setDetail(data);
  //   } catch (err) {
  //     if (err instanceof Error) {
  //       setError(err.message);
  //     } else {
  //       setError("The force is not strong with this one 🥲");
  //     }
  //   }
  // };

  useEffect(() => {
    films();
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
                      alt={res.title}
                    />
                    <div className="card-body">
                      <span className="card-title">
                        Episode {res.episode_id}
                      </span>
                      <h3 className="card-title">{res.title}</h3>
                      <span className="card-title">{res.director}</span>
                    </div>
                    <div>
                      {/* <Button onClick={() => getFilmDetails(res.id)}>
                        Read more
                      </Button> */}
                      <Button onClick={() => navigate(`/films/${res.id}`)}>
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

      {/* {detail && <FilmDetails detail={detail}></FilmDetails>} */}
    </>
  );
};

export default Films;
