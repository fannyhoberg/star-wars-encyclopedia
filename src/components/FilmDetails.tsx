import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrayData, FilmDetail } from "../Types/StarWarsAPI.types";

type FilmDetailsProps = {
  detail: FilmDetail;
};

const FilmDetails: React.FC<FilmDetailsProps> = ({ detail }) => {
  const navigate = useNavigate();

  const handlePeopleUrl = (charId: number) => {
    navigate(`/people/${charId}`);
  };

  return (
    <>
      <Container>
        <div>
          <Button onClick={() => navigate(-1)}>Back to previous</Button>
        </div>
        <div>
          <Button onClick={() => navigate(`/films/`)}>Back to Films</Button>
        </div>

        <div className="card h-50 custom-card-size">
          <img
            src={detail.image_url}
            className="card-img-top"
            alt={detail.title}
          />
          <div className="card-body">
            <h2 className="card-title">{detail.title}</h2>
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
              {detail.planets.map((plan) => (
                <p>{plan.name}</p>
              ))}
            </div>

            <div className="card-title">
              <h4>Starships: </h4>
              {detail.starships.map((star) => (
                <p>{star.name}</p>
              ))}
            </div>
            <div className="card-title">
              <h4>Species: </h4>
              {detail.species.map((spec) => (
                <p>{spec.name}</p>
              ))}
            </div>
            <div className="card-title">
              <h4>Vehicles: </h4>
              {detail.vehicles.map((vehicle) => (
                <p>{vehicle.name}</p>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default FilmDetails;
