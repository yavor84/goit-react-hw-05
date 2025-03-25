import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../tmdbapi";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function getReviews() {
      if (!movieId) return;
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      <ul className={css.listReviews}>
        {reviews.length ? (
          reviews.map((review) => (
            <li key={review.id} className={css.item}>
              <p className={css.name}>👤{review.author}</p>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p className={css.noRewiews}>No reviews for this movie</p>
        )}
      </ul>
    </div>
  );
}

export default MovieReviews;
