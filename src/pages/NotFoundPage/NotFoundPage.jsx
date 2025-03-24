import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <p className={css.title}>
      404 Not found anything!
      <Link to={"/movies"}> Go back</Link>
    </p>
  );
}

export default NotFoundPage;
