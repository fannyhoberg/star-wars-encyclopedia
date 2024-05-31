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
            <div className="card-body ">
              <div className="card-title custom-space-between">
                <h2>{detail.title}</h2>
                <p>Episode: {detail.episode_id}</p>

                <p>Director: {detail.director}</p>
                <p>Producer: {detail.producer}</p>
                <p>Release date: {detail.release_date}</p>
                <p>
                  <i>{detail.opening_crawl}</i>
                </p>
              </div>

              <div className="card-title custom-space-between">
                <h3>Characters: </h3>
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

              <div className="card-title custom-space-between">
                <h3>Planets: </h3>
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

              <div className="card-title custom-space-between">
                <h3>Species: </h3>
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

              <div className="card-title custom-space-between">
                <h3>Starships: </h3>
                {detail.starships.length > 0 ? (
                  detail.starships.map((star) => (
                    <p
                      key={star.id}
                      className="custom-link"
                      onClick={() => navigate(`/starships/${star.id}`)}
                    >
                      <strong>{star.name}</strong>
                    </p>
                  ))
                ) : (
                  <p>0</p>
                )}
              </div>

              <div className="card-title custom-space-between">
                <h3>Vehicles: </h3>
                {detail.vehicles.length > 0 ? (
                  detail.vehicles.map((res) => (
                    <p
                      key={res.id}
                      className="custom-link"
                      onClick={() => navigate(`/vehicles/${res.id}`)}
                    >
                      <strong>{res.name}</strong>
                    </p>
                  ))
                ) : (
                  <p>0</p>
                )}
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default FilmDetailPage;
