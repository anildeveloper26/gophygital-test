import type { PublicUser } from "../../lib/auth";
import { AdminView } from "./AdminView";
import { StudentView } from "./StudentView";

interface Props {
  user: PublicUser;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: Props) {
  return (
    <div className="min-h-screen bg-[linear-gradient(135deg,#d7eee9_0%,#f5f8f5_45%,#e4f3eb_100%)] font-sans text-[#294b4e]">
      <header className="sticky top-0 z-10 border-b border-white/60 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-lg font-semibold">School User Data</p>
            <p className="text-sm text-[#6b8580]">
              Signed in as <span className="font-medium">{user.username}</span>{" "}
              <span className="ml-1 rounded-full bg-[#477f75]/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#477f75]">
                {user.userType}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-[#cbded7] bg-white/70 px-4 py-2 text-sm font-medium transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-[#477f75]/40"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {user.userType === "admin" ? (
          <AdminView />
        ) : (
          <StudentView user={user} />
        )}
      </main>
    </div>
  );
}
