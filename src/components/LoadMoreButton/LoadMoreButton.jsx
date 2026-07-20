import styles from "./LoadMoreButton.module.css";

const LoadMoreButton = ({ onClick }) => {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      Load more
    </button>
  );
};

export default LoadMoreButton;
