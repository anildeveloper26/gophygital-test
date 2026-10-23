import type { PublicUser } from "../lib/auth";

export const paths = {
  login: "/login",
  adminStudents: "/admin/students",
  studentProfile: "/student/profile",
} as const;

export function homePathFor(user: PublicUser) {
  return user.userType === "admin" ? paths.adminStudents : paths.studentProfile;
}
