import { useEffect, useRef, useState } from "react";
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
    <div>
      <Link to={backLinkRef.current}>&#129092; Go back</Link>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {movie && <Movie movie={movie} />}
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
