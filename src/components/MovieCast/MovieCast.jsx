import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits } from "../../tmdbapi";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getCast() {
      if (!movieId) return;
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieCredits(movieId);
        setCast(data.cast);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.list}>
        {cast.length ? (
          cast.map((el) => (
            <li key={el.id} className={css.item}>
              <img
                className={css.img}
                src={
                  el.profile_path
                    ? `https://image.tmdb.org/t/p/w500${el.profile_path}`
                    : defaultImg
                }
                alt={el.name}
              />
              <p className={css.name}>{el.name}</p>

              <p>({el.character})</p>
            </li>
          ))
        ) : (
          <p className={css.noCast}>No cast for this movie</p>
        )}
      </ul>
    </div>
  );
}

export default MovieCast;
