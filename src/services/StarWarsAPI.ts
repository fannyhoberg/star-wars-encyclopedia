import axios from "axios";
import {
  PeopleDetail,
  FilmDetail,
  FilmResult,
  PeopleResult,
  PlanetResult,
  PlanetDetail,
  SpeciesDetail,
  SpeciesResult,
  StarShipsResult,
  StarshipsDetails,
} from "../Types/StarWarsAPI.types";

// Films
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

// People
export const getPeople = async (page: number) => {
  const res = await axios.get<PeopleResult>(
    `https://swapi.thehiveresistance.com/api/people?page=${page}`
  );
  return res.data;
};

export const getPerson = async (id: number) => {
  const res = await axios.get<PeopleDetail>(
    `https://swapi.thehiveresistance.com/api/people/${id}`
  );
  return res.data;
};

// Planets
export const getPlanets = async (page: number) => {
  const res = await axios.get<PlanetResult>(
    `https://swapi.thehiveresistance.com/api/planets/?page=${page}`
  );
  return res.data;
};

export const getPlanet = async (id: number) => {
  const res = await axios.get<PlanetDetail>(
    `https://swapi.thehiveresistance.com/api/planets/${id}`
  );
  return res.data;
};

// Species
export const getAllSpecies = async (page: number) => {
  const res = await axios.get<SpeciesResult>(
    `https://swapi.thehiveresistance.com/api/species/?page=${page}`
  );
  return res.data;
};

export const getSpecies = async (id: number) => {
  const res = await axios.get<SpeciesDetail>(
    `https://swapi.thehiveresistance.com/api/species/${id}`
  );
  return res.data;
};

// Starships
export const getStarships = async (page: number) => {
  const res = await axios.get<StarShipsResult>(
    `https://swapi.thehiveresistance.com/api/starships/?page=${page}`
  );
  return res.data;
};

export const getStarship = async (id: number) => {
  const res = await axios.get<StarshipsDetails>(
    `https://swapi.thehiveresistance.com/api/starships/${id}`
  );
  return res.data;
};
