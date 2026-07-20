import { useState } from "react";
import styles from "./TeacherCard.module.css";

const TeacherCard = ({ teacher, isFavorite = false, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const {
    avatar_url,
    name,
    surname,
    languages = [],
    lesson_info,
    conditions = [],
    experience,
    rating,
    reviews = [],
    price_per_hour,
    lessons_done,
    levels = [],
  } = teacher;

  const handleToggleDetails = () => {
    setIsExpanded((currentValue) => !currentValue);
  };

  return (
    <article className={styles.card}>
      <div className={styles.avatarWrapper}>
        <img
          className={styles.avatar}
          src={avatar_url}
          alt={`${name} ${surname}`}
          width="96"
          height="96"
        />

        <span
          className={styles.onlineIndicator}
          aria-label="Teacher is online"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.topRow}>
          <div>
            <p className={styles.role}>Languages</p>
            <h2 className={styles.name}>
              {name} {surname}
            </h2>
          </div>

          <button
            className={`${styles.favoriteButton} ${
              isFavorite ? styles.favoriteActive : ""
            }`}
            type="button"
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
            aria-label={
              isFavorite
                ? `Remove ${name} ${surname} from favorites`
                : `Add ${name} ${surname} to favorites`
            }
          >
            <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
          </button>
        </div>

        <ul className={styles.statistics}>
          <li className={styles.statisticItem}>Lessons online</li>

          <li className={styles.statisticItem}>Lessons done: {lessons_done}</li>

          <li className={styles.statisticItem}>
            <span aria-hidden="true">★</span>
            Rating: {rating}
          </li>

          <li className={styles.statisticItem}>
            Price / 1 hour:{" "}
            <span className={styles.price}>{price_per_hour}$</span>
          </li>
        </ul>

        <dl className={styles.information}>
          <div className={styles.informationRow}>
            <dt>Speaks:</dt>
            <dd className={styles.languages}>{languages.join(", ")}</dd>
          </div>

          <div className={styles.informationRow}>
            <dt>Lesson info:</dt>
            <dd>{lesson_info}</dd>
          </div>

          <div className={styles.informationRow}>
            <dt>Conditions:</dt>
            <dd>{conditions.join(" ")}</dd>
          </div>
        </dl>

        {isExpanded && (
          <div className={styles.details}>
            <p className={styles.experience}>{experience}</p>

            {reviews.length > 0 && (
              <ul className={styles.reviews}>
                {reviews.map((review, index) => (
                  <li
                    className={styles.review}
                    key={`${review.reviewer_name}-${index}`}
                  >
                    <div className={styles.reviewHeader}>
                      <span className={styles.reviewAvatar}>
                        {review.reviewer_name?.charAt(0).toUpperCase()}
                      </span>

                      <div>
                        <p className={styles.reviewerName}>
                          {review.reviewer_name}
                        </p>

                        <p className={styles.reviewRating}>
                          <span aria-hidden="true">★</span>
                          {review.reviewer_rating}
                        </p>
                      </div>
                    </div>

                    <p className={styles.reviewComment}>{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button
          className={styles.readMoreButton}
          type="button"
          onClick={handleToggleDetails}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>

        <ul className={styles.levels}>
          {levels.map((level) => (
            <li className={styles.levelItem} key={level}>
              #{level}
            </li>
          ))}
        </ul>

        {isExpanded && (
          <button className={styles.bookButton} type="button">
            Book trial lesson
          </button>
        )}
      </div>
    </article>
  );
};

export default TeacherCard;
