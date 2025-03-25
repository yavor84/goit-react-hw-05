import css from "./Movie.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

function Movie({ movie }) {
  return (
    <div className={css.container}>
      <img
        className={css.img}
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : defaultImg
        }
        alt={movie.title}
        width={400}
      />
      <div className={css.info}>
        <h1 className={css.title}>
          {movie.original_title} ({movie.release_date.slice(0, 4)})
        </h1>
        <p>
          <span className={css.span}>Release date:</span> {movie.release_date}
        </p>
        <p>
          <span className={css.span}>Production:</span>{" "}
          {movie.production_companies.map((company) => company.name).join(", ")}
        </p>
        <p>
          <span className={css.span}>Genres:</span>{" "}
          {movie.genres.map((genre) => genre.name).join(", ")}
        </p>
        <p>
          <span className={css.span}>Duration:</span> {movie.runtime} min
        </p>
        <p>
          <span className={css.span}>User score:</span>{" "}
          {Math.round(movie.vote_average * 10)}%
        </p>
        <p className={css.description}>
          <span className={css.span}>Overview:</span> {movie.overview}
        </p>
      </div>
    </div>
  );
}

export default Movie;
