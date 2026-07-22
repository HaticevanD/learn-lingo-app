import { push, ref, serverTimestamp, set } from "firebase/database";
import { database } from "./firebase";

export const createTrialLesson = async (lessonData) => {
  const trialLessonsRef = ref(database, "trialLessons");
  const newLessonRef = push(trialLessonsRef);

  await set(newLessonRef, {
    ...lessonData,
    createdAt: serverTimestamp(),
  });

  return newLessonRef.key;
};
