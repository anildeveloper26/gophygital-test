import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[linear-gradient(135deg,#d7eee9_0%,#f5f8f5_45%,#e4f3eb_100%)] px-4 text-center text-[#294b4e]">
      <p className="text-6xl font-semibold text-[#477f75]">404</p>
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="text-sm text-[#6b8580]">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="rounded-lg bg-[#477f75] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#376b62]"
      >
        Go to home
      </Link>
    </div>
  );
}
