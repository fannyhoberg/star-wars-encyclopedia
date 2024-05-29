import { useEffect, useState } from "react";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { ArrayData, FilmDetail } from "../Types/StarWarsAPI.types";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container } from "react-bootstrap";

const FilmDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<FilmDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getFilmDetails = async () => {
      setIsLoading(true);
      setError(null);
      setDetail(null);

      try {
        const data = await StarWarsAPI.getFilm(Number(id));

        setDetail(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("The force is not strong with this one 🥲");
        }
      }
      setIsLoading(false);
    };
    getFilmDetails();
  }, []);
  return (
    <>
      {isLoading && <p>Loading...</p>}

      {error && <div>{error}</div>}

      {detail && (
        <Container>
          <div>
            <Button className="primary-button" onClick={() => navigate(-1)}>
              Back to previous
            </Button>
          </div>

          <div className="card h-50 custom-card-size">
            <div className="custom-img-size">
              <img
                src={detail.image_url}
                className="card-img-top"
                alt={detail.title}
              />
            </div>
            <div className="card-body">
              <h2 className="card-title">{detail.title}</h2>
              <p>Episode: {detail.episode_id}</p>

              <p>Director: {detail.director}</p>
              <p>Producer: {detail.producer}</p>
              <p>Release date: {detail.release_date}</p>
              <p>
                <i>{detail.opening_crawl}</i>
              </p>
              <div className="card-title">
                <h4>Characters: </h4>
                {detail.characters.map((char: ArrayData) => (
                  <p
                    key={char.id}
                    onClick={() => navigate(`/people/${char.id}`)}
                    className="custom-link"
                  >
                    <strong>{char.name}</strong>
                  </p>
                ))}
              </div>
              <div className="card-title">
                <h4>Planets: </h4>
                {detail.planets.map((plan) => (
                  <p
                    key={plan.id}
                    className="custom-link"
                    onClick={() => navigate(`/planets/${plan.id}`)}
                  >
                    <strong>{plan.name}</strong>
                  </p>
                ))}
              </div>

              <div className="card-title">
                <h4>Species: </h4>
                {detail.species.map((spec) => (
                  <p
                    key={spec.id}
                    className="custom-link"
                    onClick={() => navigate(`/species/${spec.id}`)}
                  >
                    <strong>{spec.name}</strong>
                  </p>
                ))}
              </div>

              {/* <div className="card-title">
                    <h4>Starships: </h4>
                    {detail.starships.map((star) => (
                      <p>{star.name}</p>
                    ))}
                  </div>

                  
                  <div className="card-title">
                    <h4>Vehicles: </h4>
                    {detail.vehicles.map((vehicle) => (
                      <p>{vehicle.name}</p>
                    ))}
                  </div> */}
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default FilmDetailPage;
