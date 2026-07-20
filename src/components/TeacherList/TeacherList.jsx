import TeacherCard from "../TeacherCard/TeacherCard";
import styles from "./TeacherList.module.css";

const TeacherList = ({ teachers, favorites = [], onToggleFavorite }) => {
  if (!teachers.length) {
    return <p className={styles.emptyMessage}>No teachers found.</p>;
  }

  return (
    <ul className={styles.list}>
      {teachers.map((teacher) => (
        <li className={styles.listItem} key={teacher.id}>
          <TeacherCard
            teacher={teacher}
            isFavorite={favorites.includes(teacher.id)}
            onToggleFavorite={() => onToggleFavorite?.(teacher.id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TeacherList;
