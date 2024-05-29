import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as StarWarsAPI from "../services/StarWarsAPI";
import {
  ArrayData,
  ArrayFilm,
  SpeciesDetail,
} from "../Types/StarWarsAPI.types";
import { Button, Container } from "react-bootstrap";

const SpeciesDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<SpeciesDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getFilmDetails = async () => {
      setIsLoading(true);
      setError(null);
      setDetail(null);

      try {
        const data = await StarWarsAPI.getSpecies(Number(id));

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
              <p>Classification: {detail.classification}</p>
              <p>Designation: {detail.designation}</p>
              <p>Average height: {detail.average_height}</p>
              <p>Average lifespan: {detail.average_lifespan}</p>
              <p>Eye colors: {detail.eye_colors}</p>
              <p>Hair color: {detail.hair_colors}</p>
              <p>Skin colors: {detail.skin_colors}</p>
              <p>Language: {detail.language}</p>
              {detail.homeworld !== null && (
                <>
                  <h4>Homeworld </h4>
                  <p
                    className="custom-link"
                    onClick={() => navigate(`/planets/${detail.homeworld.id}`)}
                  >
                    <strong>{detail.homeworld.name}</strong>
                  </p>
                </>
              )}

              <h4>People</h4>
              {detail.people.length > 0 ? (
                detail.people.map((res: ArrayData) => (
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

export default SpeciesDetailPage;
