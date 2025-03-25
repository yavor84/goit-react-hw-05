import { Suspense, useEffect, useRef, useState } from "react";
import { fetchMovieDetails } from "../../tmdbapi";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import Movie from "../../components/Movie/Movie";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function getMovie() {
      if (!movieId) return;
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getMovie();
  }, [movieId]);

  return (
    <div className={css.container}>
      {!isLoading && (
        <Link to={backLinkRef.current} className={css.backLinkRef}>
          ⬅ Go back
        </Link>
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && <Movie movie={movie} />}
      <ul className={css.list}>
        <li>
          <NavLink className={css.navLink} to="cast">
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink className={css.navLink} to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<p>Loading page...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}

export default MovieDetailsPage;
