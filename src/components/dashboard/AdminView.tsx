import { useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { getStudents } from "../../lib/auth";

const searchInputClass =
  "w-full rounded-lg border border-[#cbded7] bg-white/70 px-4 py-2.5 text-sm outline-none transition placeholder:text-[#8a9e98] focus:border-[#6eaaa0] focus:ring-2 focus:ring-[#6eaaa0]/20";

export function AdminView() {
  const students = getStudents();
  const [nameQuery, setNameQuery] = useState("");
  const [subjectQuery, setSubjectQuery] = useState("");

  const filtered = useMemo(() => {
    const name = nameQuery.trim().toLowerCase();
    const subject = subjectQuery.trim().toLowerCase();
    return students.filter(
      (s) =>
        s.username.toLowerCase().includes(name) &&
        (!subject ||
          s.subjects.some((sub) => sub.toLowerCase().includes(subject))),
    );
  }, [students, nameQuery, subjectQuery]);

  return (
    <section className="rounded-2xl border border-white/60 bg-white/50 p-6 shadow-xl shadow-[#294b4e]/10 backdrop-blur-md">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Students</h1>
        <p className="text-sm text-[#6b8580]">
          {filtered.length} of {students.length} students
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="search-name" className="text-sm font-medium">
            Search by name
          </label>
          <input
            id="search-name"
            type="search"
            value={nameQuery}
            onChange={(e) => setNameQuery(e.target.value)}
            placeholder="e.g. Ravi"
            className={searchInputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="search-subject" className="text-sm font-medium">
            Search by subject
          </label>
          <input
            id="search-subject"
            type="search"
            value={subjectQuery}
            onChange={(e) => setSubjectQuery(e.target.value)}
            placeholder="e.g. Maths"
            className={searchInputClass}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-[#cbded7] px-4 py-10 text-center text-sm text-[#6b8580]">
          No students found
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-[#cbded7] text-xs uppercase tracking-wide text-[#6b8580]">
                <th className="px-3 py-3 font-semibold">Name</th>
                <th className="px-3 py-3 font-semibold">Email ID</th>
                <th className="px-3 py-3 font-semibold">Subjects</th>
                <th className="px-3 py-3 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-[#cbded7]/60 last:border-0 hover:bg-white/60"
                >
                  <td className="px-3 py-3 font-medium">{student.username}</td>
                  <td className="px-3 py-3">{student.email}</td>
                  <td className="px-3 py-3">{student.subjects.join(", ")}</td>
                  <td className="px-3 py-3 text-right">
                    <Link
                      to={String(student.id)}
                      className="inline-block rounded-lg bg-[#477f75] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#376b62] focus:outline-none focus:ring-2 focus:ring-[#477f75]/40"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Outlet />
    </section>
  );
}
