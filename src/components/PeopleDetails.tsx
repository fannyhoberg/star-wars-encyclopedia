import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrayFilm, PeopleDetail } from "../Types/StarWarsAPI.types";

type PeopleDetailsProps = {
  detail: PeopleDetail;
};

const PeopleDetails: React.FC<PeopleDetailsProps> = ({ detail }) => {
  const navigate = useNavigate();

  const handleFilmsUrl = (filmId: number) => {
    navigate(`/films/${filmId}`);
  };

  return (
    <Container>
      <div>
        <Button onClick={() => navigate(-1)}>Back to previous</Button>
      </div>
      <div>
        <Button onClick={() => navigate(`/people/`)}>Back to People</Button>
      </div>

      <div className="card h-50 custom-card-size">
        <img
          src={detail.image_url}
          className="card-img-top"
          alt={detail.name}
        />
        <div className="card-body">
          <h2 className="card-title">{detail.name}</h2>
          <p>Birth Year: {detail.birth_year}</p>
          <p>Eye Color: {detail.eye_color}</p>
          <p>Hair Color: {detail.hair_color}</p>
          <p>Height: {detail.height}</p>
          <p>Mass: {detail.mass}</p>
          <p>Skin Color: {detail.skin_color}</p>
          <div className="card-title">
            <h4>Affiliations: </h4>
            {detail.affiliations.map((affiliation: string, index: number) => (
              <p key={index}>{affiliation}</p>
            ))}
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
          {/* <div className="card-title">
            <h4>Homeworld: </h4>
            {detail.homeworld.map((home: ArrayData) => (
              <p>{home.name}</p>
            ))}
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default PeopleDetails;
