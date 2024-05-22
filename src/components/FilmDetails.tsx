import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FilmDetail } from "../Types/StarWarsAPI.types";

type FilmDetailsProps = {
  detail: FilmDetail;
};

const FilmDetails: React.FC<FilmDetailsProps> = ({ detail }) => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Button onClick={() => navigate(-1)}>Go back</Button>

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
              {detail.characters.map((char) => (
                <p>{char.name}</p>
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
