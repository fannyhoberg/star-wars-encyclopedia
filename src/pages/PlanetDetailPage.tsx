import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FilmDetail,
  PeopleDetail,
  PlanetDetail,
} from "../Types/StarWarsAPI.types";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { Button, Container } from "react-bootstrap";

const PlanetDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<PlanetDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getFilmDetails = async () => {
      setIsLoading(true);
      setError(null);
      setDetail(null);

      try {
        const data = await StarWarsAPI.getPlanet(Number(id));

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

          <div className="card h-50 custom-card-size-no-image">
            <div className="card-body">
              <div className="card-title custom-space-between">
                <h2>{detail.name}</h2>
                <p>Birth Year: {detail.rotation_period}</p>
                <p>Eye Color: {detail.orbital_period}</p>
                <p>Hair Color: {detail.diameter}</p>
                <p>Height: {detail.climate}</p>
                <p>Mass: {detail.gravity}</p>
                <p>Skin Color: {detail.terrain}</p>
                <p>Surface water: {detail.surface_water}</p>
                <p>Population: {detail.population}</p>
              </div>

              <div className="card-title custom-space-between">
                <h3>Residents</h3>
                {detail.residents.length > 0 ? (
                  detail.residents.map((res: PeopleDetail) => (
                    <p
                      key={res.id}
                      className="custom-link"
                      onClick={() => navigate(`/people/${res.id}`)}
                    >
                      <strong>{res.name}</strong>
                    </p>
                  ))
                ) : (
                  <p>0</p>
                )}
              </div>
              <div className="card-title custom-space-between">
                <h3>Films </h3>
                {detail.films.map((film: FilmDetail) => (
                  <p
                    key={film.id}
                    className="custom-link"
                    onClick={() => navigate(`/films/${film.id}`)}
                  >
                    <strong>{film.title}</strong>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default PlanetDetailPage;
