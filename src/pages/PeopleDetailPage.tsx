import { useEffect, useState } from "react";
import * as StarWarsAPI from "../services/StarWarsAPI";

import { useParams } from "react-router-dom";
import { PeopleDetail } from "../Types/StarWarsAPI.types";
import PeopleDetails from "../components/PeopleDetails";

const PeopleDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [detail, setDetail] = useState<PeopleDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getFilmDetails = async () => {
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
    getFilmDetails();
  }, []);
  return (
    <>
      {isLoading && <p>Loading...</p>}

      {error && <div>{error}</div>}

      {detail && <PeopleDetails detail={detail}></PeopleDetails>}
      <div>People detail page</div>
    </>
  );
};

export default PeopleDetailPage;
