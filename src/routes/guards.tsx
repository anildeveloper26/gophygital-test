import type { ReactNode } from "react";
import { type Location, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { UserType } from "../lib/auth";
import { homePathFor, paths } from "./paths";

export function ProtectedRoute({ allow }: { allow: UserType }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={paths.login} replace state={{ from: location }} />;
  }
  if (user.userType !== allow) {
    return <Navigate to={homePathFor(user)} replace />;
  }
  return <Outlet />;
}

export function GuestOnlyRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  if (user) {
    const from = (location.state as { from?: Location } | null)?.from;
    const target = from ? from.pathname + from.search : homePathFor(user);
    return <Navigate to={target} replace />;
  }
  return children;
}

export function HomeRedirect() {
  const { user } = useAuth();
  return <Navigate to={user ? homePathFor(user) : paths.login} replace />;
}
