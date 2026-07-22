import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";

import { database } from "../services/firebase";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const teachersRef = ref(database, "teachers");
        const snapshot = await get(teachersRef);

        if (isCancelled) {
          return;
        }

        if (!snapshot.exists()) {
          setTeachers([]);
          return;
        }

        const teachersData = snapshot.val();

        const teacherList = Object.entries(teachersData).map(
          ([id, teacher]) => ({
            id: String(id),
            ...teacher,
          }),
        );

        setTeachers(teacherList);
      } catch (error) {
        if (!isCancelled) {
          console.error("Teachers could not be loaded:", error);
          setError(error.message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchTeachers();

    return () => {
      isCancelled = true;
    };
  }, []);

  return {
    teachers,
    isLoading,
    error,
  };
};
