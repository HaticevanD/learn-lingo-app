import { useEffect, useState } from "react";
import { get, ref } from "firebase/database";
import { database } from "../services/firebase";

export const useTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const teachersRef = ref(database, "teachers");
        const snapshot = await get(teachersRef);

        if (snapshot.exists()) {
          const teachersData = snapshot.val();

          const teachers = Object.entries(teachersData).map(
            ([id, teacher]) => ({
              id,
              ...teacher,
            }),
          );

          setTeachers(teachers);
        } else {
          setTeachers([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return { teachers, isLoading, error };
};
