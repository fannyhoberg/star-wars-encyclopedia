import axios from "axios";
import { FilmResult } from "../Types/StarWarsAPI.types";

export const getFilms = async () => {
  const res = await axios.get<FilmResult>(
    "https://swapi.thehiveresistance.com/api/films/"
  );
  return res.data;
};
