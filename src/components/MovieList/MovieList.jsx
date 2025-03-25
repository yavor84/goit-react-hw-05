import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map((movie) => {
        return (
          <li className={css.item} key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <div className={css.wrapper}>
                <img
                  className={css.img}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : defaultImg
                  }
                  alt={movie.title}
                />
              </div>
              <p className={css.title}>{movie.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
