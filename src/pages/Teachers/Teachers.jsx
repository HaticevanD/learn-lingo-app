import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";

import { useTeachers } from "../../hooks/useTeachers";
import { usePaginatedTeachers } from "../../hooks/usePaginatedTeachers";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "../../hooks/useAuth";

import TeacherFilters from "../../components/TeacherFilters/TeacherFilters";
import TeacherList from "../../components/TeacherList/TeacherList";
import LoadMoreButton from "../../components/LoadMoreButton/LoadMoreButton";

import styles from "./Teachers.module.css";

const Teachers = () => {
  const outletContext = useOutletContext();

  const openLoginModal = outletContext?.openLoginModal;

  const openTrialLessonModal = outletContext?.openTrialLessonModal;

  const { user } = useAuth();

  const {
    teachers: allTeachers,
    isLoading: isCatalogLoading,
    error: catalogError,
  } = useTeachers();

  const { favoriteIds = [], toggleFavorite } = useFavorites();

  const [selectedLanguage, setSelectedLanguage] = useState("");

  const [selectedLevel, setSelectedLevel] = useState("");

  const [selectedPrice, setSelectedPrice] = useState("");

  const availableLanguages = useMemo(() => {
    const languages = allTeachers.flatMap((teacher) => teacher.languages ?? []);

    return Array.from(new Set(languages)).sort();
  }, [allTeachers]);

  const availableLevels = useMemo(() => {
    const levels = allTeachers.flatMap((teacher) => teacher.levels ?? []);

    return Array.from(new Set(levels)).sort();
  }, [allTeachers]);

  const availablePrices = useMemo(() => {
    const prices = allTeachers
      .map((teacher) => Number(teacher.price_per_hour))
      .filter((price) => Number.isFinite(price));

    return Array.from(new Set(prices)).sort(
      (firstPrice, secondPrice) => firstPrice - secondPrice,
    );
  }, [allTeachers]);

  const filteredTeacherIds = useMemo(() => {
    return allTeachers
      .filter((teacher) => {
        const teacherLanguages = teacher.languages ?? [];

        const teacherLevels = teacher.levels ?? [];

        const teacherPrice = Number(teacher.price_per_hour);

        const matchesLanguage =
          selectedLanguage === "" ||
          teacherLanguages.includes(selectedLanguage);

        const matchesLevel =
          selectedLevel === "" || teacherLevels.includes(selectedLevel);

        const matchesPrice =
          selectedPrice === "" || teacherPrice === Number(selectedPrice);

        return matchesLanguage && matchesLevel && matchesPrice;
      })
      .map((teacher) => String(teacher.id));
  }, [allTeachers, selectedLanguage, selectedLevel, selectedPrice]);

  const {
    teachers,
    isLoading,
    isLoadingMore,
    error: paginationError,
    hasMoreTeachers,
    loadMoreTeachers,
  } = usePaginatedTeachers(filteredTeacherIds);

  const normalizedFavorites = useMemo(() => {
    return favoriteIds.map(String);
  }, [favoriteIds]);

  const handleToggleFavorite = (teacherId) => {
    if (!user) {
      if (typeof openLoginModal === "function") {
        openLoginModal();
      }

      return;
    }

    toggleFavorite(String(teacherId));
  };

  const handleBookLesson = (teacher) => {
    if (typeof openTrialLessonModal === "function") {
      openTrialLessonModal(teacher);
    }
  };

  const currentError = catalogError || paginationError;

  const pageIsLoading = isCatalogLoading || isLoading;

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

        {currentError && (
          <p className={styles.errorMessage}>Error: {currentError}</p>
        )}

        {pageIsLoading ? (
          <p className={styles.statusMessage}>Loading...</p>
        ) : (
          <>
            {teachers.length > 0 ? (
              <TeacherList
                teachers={teachers}
                favorites={normalizedFavorites}
                onToggleFavorite={handleToggleFavorite}
                onBookLesson={handleBookLesson}
              />
            ) : (
              <p className={styles.statusMessage}>No teachers found.</p>
            )}

            {hasMoreTeachers && (
              <LoadMoreButton
                onClick={loadMoreTeachers}
                disabled={isLoadingMore}
              />
            )}

            {isLoadingMore && (
              <p className={styles.statusMessage}>Loading more teachers...</p>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Teachers;
