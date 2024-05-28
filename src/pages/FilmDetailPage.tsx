import { useEffect, useState } from "react";
import * as StarWarsAPI from "../services/StarWarsAPI";
import FilmDetails from "../components/FilmDetails";
import { FilmDetail } from "../Types/StarWarsAPI.types";
import { useParams } from "react-router-dom";

const FilmDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<FilmDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFilmDetails = async () => {
      setIsLoading(true);
      setError(null);
      setDetail(null);

      try {
        const data = await StarWarsAPI.getFilm(Number(id));

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

      {/* {detail && <Details detail={detail}></Details>} */}
      {detail && <FilmDetails detail={detail}></FilmDetails>}

      <div>FilmDetailPage</div>
    </>
  );
};

export default FilmDetailPage;
