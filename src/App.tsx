import { useState } from "react";
import { Login } from "./components/auth/Login";
import { Dashboard } from "./components/dashboard/Dashboard";
import { getCurrentUser, logout, type PublicUser } from "./lib/auth";

// No router: the session decides which screen is shown. Without a logged-in
// user the dashboard can never render, so it is protected by construction.
export default function App() {
  const [user, setUser] = useState<PublicUser | null>(getCurrentUser);

  function handleLogout() {
    logout();
    setUser(null);
  }

  return user ? (
    <Dashboard user={user} onLogout={handleLogout} />
  ) : (
    <Login onLogin={setUser} />
  );
}
