export interface FilmDataResult {
  id: number;
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  image_url: string;
  created: string;
  edited: string;
  characters_count: number;
  planets_count: number;
  starships_count: number;
  vehicles_count: number;
  species_count: number;
}

export interface FilmResult {
  data: FilmDataResult[];
  current_page: number;
  total: number;
  from: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
}

export interface FilmDetail {
  id: number;
  title: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  image_url: string;
  created: string;
  edited: string;
  characters: ArrayData[];
  planets: ArrayData[];
  starships: ArrayData[];
  vehicles: ArrayData[];
  species: ArrayData[];
}

export interface ArrayData {
  id: number;
  name: string;
}

export interface ArrayFilm {
  id: number;
  title: string;
}

export interface PeopleDetail {
  id: number;
  name: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  wiki_link: string;
  image_url: string;
  affiliations: string[];
  created: string;
  edited: string;
  homeworld: ArrayData;
  films: ArrayFilm[];
  species: ArrayData[];
  starships: ArrayData[];
  vehicles: ArrayData[];
}

export interface PeopleResult {
  data: PeopleDetail[];
  current_page: number;
  total: number;
  from: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
}

export interface PlanetResult {
  data: PlanetDetail[];
  current_page: number;
  total: number;
  from: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
}

export interface PlanetDetail {
  id: number;
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  created: string;
  edited: string;
  residents_count: number;
  films_count: number;
  residents: PeopleDetail[];
  films: FilmDetail[];
}

export interface SpeciesResult {
  data: SpeciesDetail[];
  current_page: number;
  total: number;
  from: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
}

export interface SpeciesDetail {
  id: number;
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  average_lifespan: string;
  eye_colors: string;
  hair_colors: string;
  skin_colors: string;
  language: string;
  created: string;
  edited: string;
  people_count: number;
  films_count: number;
  people: ArrayData[];
  homeworld: ArrayData;
  films: ArrayFilm[];
}

// export interface Resource {
//   id: string;
//   name: string;
//   image_url?: string;
//   type: "films" | "people" | "planets" | "species" | "starships" | "vehicles";

//   // Films
//   title: string;
//   episode_id: string;
//   opening_crawl: string;
//   director: string;
//   producer: string;
//   release_date: string;
//   created: string;
//   edited: string;
//   characters: ArrayData[];
//   planets: ArrayData[];
//   starships: ArrayData[];
//   vehicles: ArrayData[];
//   species: ArrayData[];

//   // People
//   birth_year: string;
//   eye_color: string;
//   hair_color: string;
//   height: string;
//   mass: string;
//   skin_color: string;
//   wiki_link: string;
//   affiliations: string[];
//   homeworld: ArrayData;
//   films: ArrayFilm[];

//   // Lägg till fler gemensamma attribut här
// }
