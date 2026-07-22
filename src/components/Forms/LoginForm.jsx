import { signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { auth } from "../../services/firebase/firebase";

const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter a valid email address"),
  password: yup.string().required("Password is required"),
});

function LoginForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess?.();
    } catch (error) {
      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setError("root", {
          type: "server",
          message: "The email or password is incorrect.",
        });
        return;
      }

      if (error.code === "auth/too-many-requests") {
        setError("root", {
          type: "server",
          message: "Too many attempts. Please try again later.",
        });
        return;
      }

      setError("root", {
        type: "server",
        message: "Login failed. Please try again.",
      });
    }
  };

  return (
    <div>
      <h2 id="login-title">Log in</h2>

      <p>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="login-email">Email</label>

          <input
            id="login-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="login-password">Password</label>

          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            {...register("password")}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {errors.root && <p>{errors.root.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
