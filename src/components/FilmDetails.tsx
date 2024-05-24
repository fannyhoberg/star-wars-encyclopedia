import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrayData, FilmDetail } from "../Types/StarWarsAPI.types";

type FilmDetailsProps = {
  detail: FilmDetail;
};

const FilmDetails: React.FC<FilmDetailsProps> = ({ detail }) => {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <div>
          <Button className="primary-button" onClick={() => navigate(-1)}>
            Back to previous
          </Button>
        </div>
        <div>
          <Button
            className="primary-button"
            onClick={() => navigate(`/films/`)}
          >
            Go to Films
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
