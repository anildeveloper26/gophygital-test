import bcrypt from "bcryptjs";
import usersData from "../data/users.json";

export type UserType = "admin" | "student";

export interface User {
  id: number;
  username: string;
  userType: UserType;
  password: string;
  email: string;
  language: string;
  address: string;
  standard: string;
  subjects: string[];
}

// Everything the UI may see: the password hash never leaves this module.
export type PublicUser = Omit<User, "password">;

const SESSION_KEY = "school-app:session";

const users = usersData as User[];

function toPublic({ password: _password, ...rest }: User): PublicUser {
  return rest;
}

function findByEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  return users.find((u) => u.email.toLowerCase() === normalized);
}

export async function login(
  email: string,
  password: string,
): Promise<PublicUser | null> {
  const user = findByEmail(email);
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  localStorage.setItem(SESSION_KEY, user.email);
  return toPublic(user);
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getCurrentUser(): PublicUser | null {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  const user = findByEmail(email);
  return user ? toPublic(user) : null;
}

export function getStudents(): PublicUser[] {
  return users.filter((u) => u.userType === "student").map(toPublic);
}
