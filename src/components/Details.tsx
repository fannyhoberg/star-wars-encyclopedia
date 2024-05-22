import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as StarWarsAPI from "../services/StarWarsAPI";
import { Button, Container } from "react-bootstrap";
import { ArrayData, ArrayFilm } from "../Types/StarWarsAPI.types";

interface DetailViewProps {
  type: string;
}

const DetailView: React.FC<DetailViewProps> = ({ type }) => {
  //   const { type, id } = useParams();
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [detail, setDetail] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePeopleUrl = (charId: number) => {
    navigate(`/people/${charId}`);
  };

  const handleFilmsUrl = (filmId: number) => {
    navigate(`/films/${filmId}`);
  };

  useEffect(() => {
    setIsLoading(true);

    const fetchDetail = async () => {
      try {
        let data;
        switch (type) {
          case "films":
            data = await StarWarsAPI.getFilm(parseInt(id!));
            break;
          case "characters":
            data = await StarWarsAPI.getPerson(parseInt(id!));
            break;

          default:
            throw new Error("Unknown type");
        }
        setDetail(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "The force is not strong with this one 🥲"
        );
      }
      setIsLoading(false);
    };

    fetchDetail();
  }, [type, id]);

  if (!detail) {
    return;
  }

  return (
    <>
      {error && <div>{error}</div>}
      {isLoading && <div>Loading...</div>}

      <Container>
        <Button onClick={() => navigate(-1)}>Back</Button>
        <div className="card h-50 custom-card-size">
          <img
            src={detail.image_url}
            className="card-img-top"
            alt={detail.title || detail.name}
          />
          <div className="card-body">
            <h2 className="card-title">{detail.title || detail.name}</h2>
            {type === "films" && detail.characters && (
              <>
                <p>Episode: {detail.episode_id}</p>
                <p>Director: {detail.director}</p>
                <p>Producer: {detail.producer}</p>
                <p>Release date: {detail.release_date}</p>
                <p>{detail.opening_crawl}</p>
                <div className="card-title">
                  <h4>Characters: </h4>
                  {detail.characters.map((char: ArrayData) => (
                    <p
                      key={char.id}
                      onClick={() => handlePeopleUrl(char.id)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {char.name}
                    </p>
                  ))}
                </div>
                <div className="card-title">
                  <h4>Planets: </h4>
                  {detail.planets.map((plan: ArrayData) => (
                    <p
                      key={plan.id}
                      onClick={() => handlePeopleUrl(plan.id)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {plan.name}
                    </p>
                  ))}
                </div>
              </>
            )}
            {type === "characters" && detail.films && (
              <>
                <p>Birth Year: {detail.birth_year}</p>
                <p>Eye Color: {detail.eye_color}</p>
                <p>Hair Color: {detail.hair_color}</p>
                <p>Height: {detail.height}</p>
                <p>Mass: {detail.mass}</p>
                <p>Skin Color: {detail.skin_color}</p>
                <div className="card-title">
                  <h4>Affiliations: </h4>
                  {detail.affiliations.map(
                    (affiliation: string, index: number) => (
                      <p key={index}>{affiliation}</p>
                    )
                  )}
                </div>
                <div className="card-title">
                  <h4>Films: </h4>
                  {detail.films.map((film: ArrayFilm) => (
                    <p
                      key={film.id}
                      onClick={() => handleFilmsUrl(film.id)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      {film.title}
                    </p>
                  ))}
                </div>
                <div className="card-title">
                  <h4>Homeworld: </h4>
                  <p
                    onClick={() => navigate(`/planets/${detail.homeworld.id}`)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {detail.homeworld.name}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default DetailView;
