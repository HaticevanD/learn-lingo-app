import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const STORAGE_KEY = "favoriteTeachers";

export const useFavorites = () => {
  const { isAuthenticated } = useAuth();

  const [favoriteIds, setFavoriteIds] = useState(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY);

    if (!storedFavorites) {
      return [];
    }

    try {
      const parsedFavorites = JSON.parse(storedFavorites);

      return Array.isArray(parsedFavorites) ? parsedFavorites : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const isFavorite = (teacherId) => {
    if (!isAuthenticated) {
      return false;
    }

    return favoriteIds.includes(teacherId);
  };

  const toggleFavorite = (teacherId) => {
    if (!isAuthenticated) {
      return false;
    }

    setFavoriteIds((currentFavorites) => {
      if (currentFavorites.includes(teacherId)) {
        return currentFavorites.filter((id) => id !== teacherId);
      }

      return [...currentFavorites, teacherId];
    });

    return true;
  };

  return {
    favoriteIds: isAuthenticated ? favoriteIds : [],
    isFavorite,
    toggleFavorite,
  };
};
