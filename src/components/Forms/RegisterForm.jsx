import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { auth } from "../../services/firebase";

const registerSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must contain at least 2 characters"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must contain at least 6 characters"),
});

function RegisterForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ name, email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      await updateProfile(userCredential.user, {
        displayName: name,
      });

      reset();
      onSuccess?.();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setError("email", {
          type: "server",
          message: "This email address is already registered",
        });
        return;
      }

      if (error.code === "auth/invalid-email") {
        setError("email", {
          type: "server",
          message: "Enter a valid email address",
        });
        return;
      }

      if (error.code === "auth/weak-password") {
        setError("password", {
          type: "server",
          message: "Password must contain at least 6 characters",
        });
        return;
      }

      setError("root", {
        type: "server",
        message: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div>
      <h2 id="registration-title">Registration</h2>

      <p>
        Thank you for your interest in our platform. Please provide the
        following details to create an account.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="registration-name">Name</label>

          <input
            id="registration-name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />

          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="registration-email">Email</label>

          <input
            id="registration-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="registration-password">Password</label>

          <input
            id="registration-password"
            type="password"
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {errors.root && <p>{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
