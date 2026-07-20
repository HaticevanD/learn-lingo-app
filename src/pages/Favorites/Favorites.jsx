import { useTeachers } from "../../hooks/useTeachers";
import { useFavorites } from "../../hooks/useFavorites";
import TeacherList from "../../components/TeacherList/TeacherList";
import styles from "./Favorites.module.css";

const Favorites = () => {
  const { teachers, isLoading, error } = useTeachers();

  const { favoriteIds: favorites, toggleFavorite } = useFavorites();

  const favoriteTeachers = teachers.filter((teacher) =>
    favorites.includes(teacher.id),
  );

  if (isLoading) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.statusMessage}>Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <p className={styles.errorMessage}>Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Favorites</h1>

        {favoriteTeachers.length === 0 ? (
          <p className={styles.emptyMessage}>
            You have not added any teachers to favorites yet.
          </p>
        ) : (
          <TeacherList
            teachers={favoriteTeachers}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>
    </main>
  );
};

export default Favorites;
