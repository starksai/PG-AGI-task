export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
}

export interface TMDBResponse {
  page: number;
  results: Movie[];
}


const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function fetchTrendingMovies(): Promise<TMDBResponse> {
  const res = await fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Failed to fetch TMDB data');
  return res.json();
}