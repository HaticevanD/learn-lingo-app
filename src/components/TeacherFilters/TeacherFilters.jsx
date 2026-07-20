import styles from "./TeacherFilters.module.css";

const TeacherFilters = ({
  language,
  level,
  price,
  languages,
  levels,
  prices,
  onLanguageChange,
  onLevelChange,
  onPriceChange,
}) => {
  return (
    <div className={styles.filters}>
      <label className={styles.field}>
        <span className={styles.label}>Languages</span>

        <select
          className={styles.select}
          value={language}
          onChange={(event) => onLanguageChange(event.target.value)}
        >
          <option value="">All languages</option>

          {languages.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Level of knowledge</span>

        <select
          className={styles.select}
          value={level}
          onChange={(event) => onLevelChange(event.target.value)}
        >
          <option value="">All levels</option>

          {levels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Price</span>

        <select
          className={styles.select}
          value={price}
          onChange={(event) => onPriceChange(event.target.value)}
        >
          <option value="">All prices</option>

          {prices.map((item) => (
            <option key={item} value={item}>
              {item} $
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default TeacherFilters;
