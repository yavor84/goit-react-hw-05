import { BeatLoader } from "react-spinners";
import css from "./Loader.module.css";

function Loader() {
  return (
    <div className={css.loader}>
      <BeatLoader color="#048a81" margin={10} size={18} />
    </div>
  );
}

export default Loader;
