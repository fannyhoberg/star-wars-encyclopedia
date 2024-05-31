import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <h1>Welcome to the Star Wars Encyclopedia!</h1>
        <p>
          Here you can browse through your favorite characters, movies, and much
          more!
        </p>
        <p>Click on a category below or in the top menu.</p>
      </div>
      <div className="button-container mt-4">
        <Button
          className="custom-button-homepage mx-2 my-2"
          onClick={() => navigate("/films")}
        >
          Films
        </Button>
        <Button
          className="custom-button-homepage mx-2 my-2"
          onClick={() => navigate("/people")}
        >
          People
        </Button>
        <Button
          className="custom-button-homepage mx-2 my-2"
          onClick={() => navigate("/planets")}
        >
          Planets
        </Button>
        <Button
          className="custom-button-homepage mx-2 my-2"
          onClick={() => navigate("/species")}
        >
          Species
        </Button>
        <Button
          className="custom-button-homepage mx-2 my-2"
          onClick={() => navigate("/starships")}
        >
          Starships
        </Button>
        <Button
          className="custom-button-homepage mx-2 my-2"
          onClick={() => navigate("/vehicles")}
        >
          Vehicles
        </Button>
      </div>
    </>
  );
};

export default Home;
