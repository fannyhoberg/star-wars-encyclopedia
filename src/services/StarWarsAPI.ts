import axios from "axios";
import {
  CharacterDetail,
  FilmDetail,
  FilmResult,
  PeopleResult,
} from "../Types/StarWarsAPI.types";

export const getFilms = async (page: number) => {
  const res = await axios.get<FilmResult>(
    `https://swapi.thehiveresistance.com/api/films?page=${page}`
  );
  return res.data;
};

export const getFilm = async (id: number) => {
  const res = await axios.get<FilmDetail>(
    `https://swapi.thehiveresistance.com/api/films/${id}`
  );
  return res.data;
};

export const getPeople = async (page: number) => {
  const res = await axios.get<PeopleResult>(
    `https://swapi.thehiveresistance.com/api/people?page=${page}`
  );
  return res.data;
};

export const getPerson = async (id: number) => {
  const res = await axios.get<CharacterDetail>(
    `https://swapi.thehiveresistance.com/api/people/${id}`
  );
  return res.data;
};
