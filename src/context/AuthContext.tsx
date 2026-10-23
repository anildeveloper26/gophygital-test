import { createContext, type ReactNode, useContext, useState } from "react";
import {
  getCurrentUser,
  login as loginUser,
  logout as logoutUser,
  type PublicUser,
} from "../lib/auth";

interface AuthContextValue {
  user: PublicUser | null;
  login: (email: string, password: string) => Promise<PublicUser | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(getCurrentUser);

  async function login(email: string, password: string) {
    const loggedIn = await loginUser(email, password);
    if (loggedIn) setUser(loggedIn);
    return loggedIn;
  }

  function logout() {
    logoutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export function useCurrentUser(): PublicUser {
  const { user } = useAuth();
  if (!user) throw new Error("useCurrentUser used outside a protected route");
  return user;
}
