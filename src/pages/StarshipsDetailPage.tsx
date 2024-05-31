import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as StarWarsAPI from "../services/StarWarsAPI";
import {
  ArrayData,
  ArrayFilm,
  StarshipsDetails,
} from "../Types/StarWarsAPI.types";
import { Button, Container } from "react-bootstrap";

const StarshipsDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<StarshipsDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getFilmDetails = async () => {
      setIsLoading(true);
      setError(null);
      setDetail(null);

      try {
        const data = await StarWarsAPI.getStarship(Number(id));

        console.log("data", data);

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
            <div className="card-body custom-card-size-no-image">
              <h2 className="card-title">{detail.name}</h2>
              <p>Model: {detail.model}</p>
              <p>Starship class: {detail.starship_class}</p>
              <p>Manufacturer: {detail.manufacturer}</p>
              <p>Cost in credits: {detail.cost_in_credits}</p>
              <p>Length: {detail.length}</p>
              <p>Crew: {detail.crew}</p>
              <p>Passengers: {detail.passengers}</p>
              <p>Max atmosphere speed: {detail.max_atmosphering_speed}</p>
              <p>Hyperdrive rating: {detail.hyperdrive_rating}</p>
              <p>MGLT: {detail.MGLT}</p>
              <p>Cargo capacity: {detail.cargo_capacity}</p>
              <p>Consumables: {detail.consumables}</p>
              <h4>Pilots </h4>
              {detail.pilots.length > 0 ? (
                detail.pilots.map((res: ArrayData) => (
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

              <h4>Films </h4>

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
          </div>
        </Container>
      )}
    </>
  );
};

export default StarshipsDetailPage;
