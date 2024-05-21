import { Button, Col, Container, Row } from "react-bootstrap";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { useEffect, useState } from "react";
import { FilmResult } from "../Types/StarWarsAPI.types";
import { useNavigate } from "react-router-dom";

const Films = () => {
  const [result, setResult] = useState<FilmResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  //   const [detail, setDetail] = useState<FilmDetail | null>(null);

  const navigate = useNavigate();

  const films = async () => {
    setResult(null);
    setIsLoading(true);
    setError(null);
    // setDetail(null);

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

  //   const getFilmDetails = async (id: number) => {
  //     setResult(null);
  //     setDetail(null);

  //     try {
  //       const data = await StarWarsAPI.getFilm(id);

  //       setDetail(data);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         setError(err.message);
  //       } else {
  //         setError("The force is not strong with this one 🥲");
  //       }
  //     }
  //   };

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
                      <Button onClick={() => navigate(`/films/${res.id}`)}>
                        Read more
                      </Button>{" "}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}

      {/* {detail && (
        // <DetailView type={films}></DetailView>
        // <Container>
        //   <div className="card h-50 custom-card-size">
        //     <div>
        //       <Button>Back</Button>
        //     </div>

        //     <img
        //       src={detail.image_url}
        //       className="card-img-top"
        //       alt={detail.title}
        //     />
        //     <div className="card-body">
        //       <h2 className="card-title">{detail.title}</h2>
        //       <p>Episode: {detail.episode_id}</p>

        //       <p>Director: {detail.director}</p>
        //       <p>Producer: {detail.producer}</p>
        //       <p>Release date: {detail.release_date}</p>
        //       <p>{detail.opening_crawl}</p>
        //       <div className="card-title">
        //         <h4>Characters: </h4>
        //         {detail.characters.map((char) => (
        //           <p>{char.name}</p>
        //         ))}
        //       </div>
        //       <div className="card-title">
        //         <h4>Planets: </h4>
        //         {detail.planets.map((plan) => (
        //           <p>{plan.name}</p>
        //         ))}
        //       </div>

        //       <div className="card-title">
        //         <h4>Starships: </h4>
        //         {detail.starships.map((star) => (
        //           <p>{star.name}</p>
        //         ))}
        //       </div>
        //       <div className="card-title">
        //         <h4>Species: </h4>
        //         {detail.species.map((spec) => (
        //           <p>{spec.name}</p>
        //         ))}
        //       </div>
        //       <div className="card-title">
        //         <h4>Vehicles: </h4>
        //         {detail.vehicles.map((vehicle) => (
        //           <p>{vehicle.name}</p>
        //         ))}
        //       </div>
        //     </div>
        //   </div>
        // </Container>
      )} */}
    </>
  );
};

export default Films;
