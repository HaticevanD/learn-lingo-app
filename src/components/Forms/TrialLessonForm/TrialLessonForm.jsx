import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useAuth } from "../../../hooks/useAuth";
import styles from "./TrialLessonForm.module.css";

const reasons = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const trialLessonSchema = yup.object({
  reason: yup.string().required("Please select a reason"),
  fullName: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(2, "Full name must contain at least 2 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(/^[+\d][\d\s()-]{7,}$/, "Enter a valid phone number"),
});

const TrialLessonForm = ({ teacher, onSuccess }) => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(trialLessonSchema),
    defaultValues: {
      reason: "Career and business",
      fullName: user?.displayName || "",
      email: user?.email || "",
      phone: "",
    },
  });

  const onSubmit = async (formData) => {
    const trialLesson = {
      ...formData,
      teacherId: teacher.id,
      teacherName: `${teacher.name} ${teacher.surname}`,
    };

    console.log("Trial lesson:", trialLesson);

    onSuccess?.();
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Book trial lesson</h2>

      <p className={styles.description}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={styles.teacher}>
        <img
          className={styles.teacherAvatar}
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          width="44"
          height="44"
        />

        <div>
          <p className={styles.teacherLabel}>Your teacher</p>

          <p className={styles.teacherName}>
            {teacher.name} {teacher.surname}
          </p>
        </div>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>
            What is your main reason for learning English?
          </legend>

          <div className={styles.reasons}>
            {reasons.map((reason) => (
              <label className={styles.radioLabel} key={reason}>
                <input
                  className={styles.radioInput}
                  type="radio"
                  value={reason}
                  {...register("reason")}
                />

                <span className={styles.customRadio} aria-hidden="true" />

                <span>{reason}</span>
              </label>
            ))}
          </div>

          {errors.reason && (
            <p className={styles.errorMessage}>{errors.reason.message}</p>
          )}
        </fieldset>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.visuallyHidden} htmlFor="trial-full-name">
              Full name
            </label>

            <input
              className={styles.input}
              id="trial-full-name"
              type="text"
              placeholder="Full Name"
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              {...register("fullName")}
            />

            {errors.fullName && (
              <p className={styles.errorMessage}>{errors.fullName.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.visuallyHidden} htmlFor="trial-email">
              Email
            </label>

            <input
              className={styles.input}
              id="trial-email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              {...register("email")}
            />

            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>

          <div className={styles.field}>
            <label className={styles.visuallyHidden} htmlFor="trial-phone">
              Phone number
            </label>

            <input
              className={styles.input}
              id="trial-phone"
              type="tel"
              placeholder="Phone number"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
              {...register("phone")}
            />

            {errors.phone && (
              <p className={styles.errorMessage}>{errors.phone.message}</p>
            )}
          </div>
        </div>

        <button
          className={styles.submitButton}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Booking..." : "Book"}
        </button>
      </form>
    </div>
  );
};

export default TrialLessonForm;
