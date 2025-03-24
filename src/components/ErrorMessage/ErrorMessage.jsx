import css from "./ErrorMessage.module.css";

function ErrorMessage() {
  return (
    <p className={css.message}>
      Something went wrong. Please try reloading the page!
    </p>
  );
}

export default ErrorMessage;
