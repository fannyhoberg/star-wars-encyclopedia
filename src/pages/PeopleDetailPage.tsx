import { useEffect, useState } from "react";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { useNavigate, useParams } from "react-router-dom";
import { ArrayData, ArrayFilm, PeopleDetail } from "../Types/StarWarsAPI.types";
import { Button, Container } from "react-bootstrap";

const PeopleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<PeopleDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getPersonDetails = async () => {
      setIsLoading(true);
      setError(null);
      setDetail(null);

      try {
        const data = await StarWarsAPI.getPerson(Number(id));
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
    getPersonDetails();
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
                alt={detail.name}
              />
            </div>

            <div className="card-body">
              <div className="card-title custom-space-between">
                <h2>{detail.name}</h2>
                <p>Birth Year: {detail.birth_year}</p>
                <p>Eye Color: {detail.eye_color}</p>
                <p>Hair Color: {detail.hair_color}</p>
                <p>Height: {detail.height}</p>
                <p>Mass: {detail.mass}</p>
                <p>Skin Color: {detail.skin_color}</p>
              </div>

              <div className="card-title custom-space-between">
                <h3>Homeworld </h3>
                <p
                  className="custom-link"
                  onClick={() => navigate(`/planets/${detail.homeworld.id}`)}
                >
                  <strong>{detail.homeworld.name}</strong>
                </p>
              </div>

              <div className="card-title custom-space-between">
                <h3>Films </h3>
                {detail.films.map((film: ArrayFilm) => (
                  <p
                    key={film.id}
                    className="custom-link"
                    onClick={() => navigate(`/films/${film.id}`)}
                  >
                    <strong>{film.title}</strong>
                  </p>
                ))}
              </div>

              <div className="card-title custom-space-between">
                <h3>Species: </h3>

                {detail.species.length > 0 ? (
                  detail.species.map((res: ArrayData) => (
                    <p
                      key={res.id}
                      className="custom-link"
                      onClick={() => navigate(`/people/${res.id}`)}
                    >
                      <strong>{res.name}</strong>
                    </p>
                  ))
                ) : (
                  <p>Human?</p>
                )}
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

export default PeopleDetailPage;
