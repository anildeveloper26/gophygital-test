import type { PublicUser } from "../../lib/auth";

export function UserDetails({ user }: { user: PublicUser }) {
  const rows: [string, string][] = [
    ["Name", user.username],
    ["Email ID", user.email],
    ["Language", user.language],
    ["Address", user.address],
    ["Standard", user.standard || "-"],
  ];

  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-xs font-semibold uppercase tracking-wide text-[#6b8580]">
            {label}
          </dt>
          <dd className="mt-1 text-sm">{value}</dd>
        </div>
      ))}
      <div className="sm:col-span-2">
        <dt className="text-xs font-semibold uppercase tracking-wide text-[#6b8580]">
          Subjects
        </dt>
        <dd className="mt-2 flex flex-wrap gap-2">
          {user.subjects.length > 0 ? (
            user.subjects.map((subject) => (
              <span
                key={subject}
                className="rounded-full bg-[#477f75]/10 px-3 py-1 text-xs font-medium text-[#376b62]"
              >
                {subject}
              </span>
            ))
          ) : (
            <span className="text-sm">-</span>
          )}
        </dd>
      </div>
    </dl>
  );
}
