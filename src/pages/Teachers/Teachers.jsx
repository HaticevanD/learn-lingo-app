import { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useTeachers } from "../../hooks/useTeachers";
import { useFavorites } from "../../hooks/useFavorites";
import TeacherFilters from "../../components/TeacherFilters/TeacherFilters";
import TeacherList from "../../components/TeacherList/TeacherList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";

import styles from "./Teachers.module.css";

const TEACHERS_PER_PAGE = 4;

const Teachers = () => {
  const { openTrialLessonModal } = useOutletContext();

  const { teachers, isLoading, error } = useTeachers();
  const { favoriteIds: favorites, toggleFavorite } = useFavorites();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);

  const availableLanguages = useMemo(() => {
    const languages = teachers.flatMap((teacher) => teacher.languages ?? []);

    return [...new Set(languages)].sort();
  }, [teachers]);

  const availableLevels = useMemo(() => {
    const levels = teachers.flatMap((teacher) => teacher.levels ?? []);

    return [...new Set(levels)].sort();
  }, [teachers]);

  const availablePrices = useMemo(() => {
    const prices = teachers
      .map((teacher) => teacher.price_per_hour)
      .filter((price) => price !== undefined);

    return [...new Set(prices)].sort(
      (firstPrice, secondPrice) => firstPrice - secondPrice,
    );
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const matchesLanguage =
        !selectedLanguage || teacher.languages?.includes(selectedLanguage);

      const matchesLevel =
        !selectedLevel || teacher.levels?.includes(selectedLevel);

      const matchesPrice =
        !selectedPrice || teacher.price_per_hour === Number(selectedPrice);

      return matchesLanguage && matchesLevel && matchesPrice;
    });
  }, [teachers, selectedLanguage, selectedLevel, selectedPrice]);

  useEffect(() => {
    setVisibleCount(TEACHERS_PER_PAGE);
  }, [selectedLanguage, selectedLevel, selectedPrice]);

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);

  const hasMoreTeachers = visibleCount < filteredTeachers.length;

  const handleLoadMore = () => {
    setVisibleCount((currentCount) => currentCount + TEACHERS_PER_PAGE);
  };

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
        <TeacherFilters
          language={selectedLanguage}
          level={selectedLevel}
          price={selectedPrice}
          languages={availableLanguages}
          levels={availableLevels}
          prices={availablePrices}
          onLanguageChange={setSelectedLanguage}
          onLevelChange={setSelectedLevel}
          onPriceChange={setSelectedPrice}
        />

        <TeacherList
          teachers={visibleTeachers}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onBookLesson={openTrialLessonModal}
        />

        {hasMoreTeachers && <LoadMoreButton onClick={handleLoadMore} />}
      </div>
    </main>
  );
};

export default Teachers;
