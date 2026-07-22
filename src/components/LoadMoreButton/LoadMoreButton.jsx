import styles from "./LoadMoreButton.module.css";

const LoadMoreButton = ({ onClick, disabled = false }) => {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {disabled ? "Loading..." : "Load more"}
    </button>
  );
};

export default LoadMoreButton;
