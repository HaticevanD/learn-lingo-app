import { useEffect, useState } from "react";

const STORAGE_KEY = "favoriteTeachers";

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    try {
      return JSON.parse(storedFavorites);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const isFavorite = (teacherId) => {
    return favoriteIds.includes(teacherId);
  };

  const toggleFavorite = (teacherId) => {
    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(teacherId)) {
        return currentFavorites.filter((id) => id !== teacherId);
      }

      return [...currentFavorites, teacherId];
    });
  };

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
  };
};
