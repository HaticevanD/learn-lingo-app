import { useCallback, useEffect, useMemo, useState } from "react";
import { get, ref } from "firebase/database";

import { database } from "../services/firebase";

const TEACHERS_PER_PAGE = 4;

const fetchTeachersByIds = async (teacherIds) => {
  if (teacherIds.length === 0) {
    return [];
  }

  const snapshots = await Promise.all(
    teacherIds.map((teacherId) => get(ref(database, `teachers/${teacherId}`))),
  );

  return snapshots
    .map((snapshot, index) => {
      if (!snapshot.exists()) {
        return null;
      }

      return {
        id: String(teacherIds[index]),
        ...snapshot.val(),
      };
    })
    .filter(Boolean);
};

export const usePaginatedTeachers = (teacherIds = []) => {
  const [teachers, setTeachers] = useState([]);
  const [loadedIdCount, setLoadedIdCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const teacherIdsKey = teacherIds.map(String).join(",");

  const normalizedIds = useMemo(() => {
    return teacherIds.map(String);
  }, [teacherIdsKey]);

  const loadPage = useCallback(
    async (startIndex) => {
      const pageIds = normalizedIds.slice(
        startIndex,
        startIndex + TEACHERS_PER_PAGE,
      );

      const pageTeachers = await fetchTeachersByIds(pageIds);

      return {
        pageIds,
        pageTeachers,
      };
    },
    [normalizedIds],
  );

  useEffect(() => {
    let isCancelled = false;

    const loadInitialPage = async () => {
      setIsLoading(true);
      setError(null);
      setTeachers([]);
      setLoadedIdCount(0);

      if (normalizedIds.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const { pageIds, pageTeachers } = await loadPage(0);

        if (isCancelled) {
          return;
        }

        setTeachers(pageTeachers);

        setLoadedIdCount(pageIds.length);
      } catch (error) {
        if (!isCancelled) {
          console.error("Initial teachers could not be loaded:", error);

          setError(
            error instanceof Error
              ? error.message
              : "Teachers could not be loaded.",
          );
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadInitialPage();

    return () => {
      isCancelled = true;
    };
  }, [loadPage, normalizedIds.length]);

  const loadMoreTeachers = async () => {
    if (isLoading || isLoadingMore || loadedIdCount >= normalizedIds.length) {
      return;
    }

    try {
      setIsLoadingMore(true);
      setError(null);

      const { pageIds, pageTeachers } = await loadPage(loadedIdCount);

      setTeachers((currentTeachers) => {
        const teachersMap = new Map(
          currentTeachers.map((teacher) => [String(teacher.id), teacher]),
        );

        pageTeachers.forEach((teacher) => {
          teachersMap.set(String(teacher.id), teacher);
        });

        return Array.from(teachersMap.values());
      });

      setLoadedIdCount((currentCount) => currentCount + pageIds.length);
    } catch (error) {
      console.error("More teachers could not be loaded:", error);

      setError(
        error instanceof Error
          ? error.message
          : "More teachers could not be loaded.",
      );
    } finally {
      setIsLoadingMore(false);
    }
  };

  const hasMoreTeachers = loadedIdCount < normalizedIds.length;

  return {
    teachers,
    isLoading,
    isLoadingMore,
    error,
    hasMoreTeachers,
    loadMoreTeachers,
  };
};
