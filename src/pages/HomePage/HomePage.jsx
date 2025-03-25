import { useEffect, useState } from "react";
import { fetchTrandingMov } from "../../tmdbapi";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchTrandingMov();
        setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div>
      <h1 className={css.title}>Trending today</h1>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
