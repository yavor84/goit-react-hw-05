import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import MovieList from "../../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import { fetchSearchMovies } from "../../tmdbapi";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (!query) return;

    const searchMovies = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchSearchMovies(query);
        setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextParams = new URLSearchParams(searchParams);

    if (event.target.search.value.trim() !== "") {
      nextParams.set("query", event.target.search.value.trim());
    } else {
      nextParams.delete("query");
    }
    setSearchParams(nextParams);
    event.target.reset();
  };

  return (
    <div className={css.formContainer}>
      <h1 className={css.title}>Search movies</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          name="search"
          autoComplete="off"
          autoFocus
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movies && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
