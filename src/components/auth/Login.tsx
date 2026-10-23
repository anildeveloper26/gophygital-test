import { type FormEvent, useState } from "react";
import { login, type PublicUser } from "../../lib/auth";

interface UserCreds {
  email: string;
  password: string;
}

type FieldErrors = Partial<Record<keyof UserCreds, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate({ email, password }: UserCreds): FieldErrors {
  const errors: FieldErrors = {};
  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = "Please enter a valid email address";
  }
  if (!password) {
    errors.password = "Password is required";
  }
  return errors;
}

const inputClass =
  "w-full rounded-lg border bg-white/70 px-4 py-3 text-sm outline-none transition placeholder:text-[#8a9e98] focus:ring-2";
const okInput = "border-[#cbded7] focus:border-[#6eaaa0] focus:ring-[#6eaaa0]/20";
const badInput = "border-red-400 focus:border-red-500 focus:ring-red-500/20";

export function Login({ onLogin }: { onLogin: (user: PublicUser) => void }) {
  const [user, setUser] = useState<UserCreds>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError("");

    const fieldErrors = validate(user);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSubmitting(true);
    const loggedIn = await login(user.email, user.password);
    setSubmitting(false);

    if (!loggedIn) {
      setFormError("Invalid email or password");
      return;
    }
    onLogin(loggedIn);
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[radial-gradient(circle_at_78%_25%,rgba(206,232,221,0.3),transparent_35%),linear-gradient(135deg,#d7eee9_0%,#f5f8f5_45%,#e4f3eb_100%)] px-4 font-sans text-[#294b4e]">
      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/60 bg-white/50 p-8 shadow-xl shadow-[#294b4e]/10 backdrop-blur-md"
      >
        <h1 className="mb-2 text-center text-3xl font-semibold">
          Welcome Back
        </h1>

        <p className="mb-8 text-center text-sm text-[#6b8580]">
          Sign in to your account
        </p>

        {formError && (
          <p
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {formError}
          </p>
        )}

        <div className="mb-5 flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>

          <input
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
            id="email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${inputClass} ${errors.email ? badInput : okInput}`}
          />
          {errors.email && (
            <p id="email-error" className="text-xs text-red-600">
              {errors.email}
            </p>
          )}
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>

          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            className={`${inputClass} ${errors.password ? badInput : okInput}`}
          />
          {errors.password && (
            <p id="password-error" className="text-xs text-red-600">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-[#477f75] px-4 py-3 font-medium text-white transition hover:bg-[#376b62] focus:outline-none focus:ring-2 focus:ring-[#477f75]/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
