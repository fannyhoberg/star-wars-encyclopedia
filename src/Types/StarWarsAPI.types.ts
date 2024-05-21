interface DataResult {
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
  data: DataResult[];
  total: number;
}
