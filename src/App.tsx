import { Route, Routes } from "react-router-dom";
import { Login } from "./components/auth/Login";
import { AdminView } from "./components/dashboard/AdminView";
import { DashboardLayout } from "./components/dashboard/DashboardLayout";
import { StudentDetailsRoute } from "./components/dashboard/StudentDetailsRoute";
import { StudentView } from "./components/dashboard/StudentView";
import { NotFound } from "./components/NotFound";
import { GuestOnlyRoute, HomeRedirect, ProtectedRoute } from "./routes/guards";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />

      <Route element={<ProtectedRoute allow="admin" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin/students" element={<AdminView />}>
            <Route path=":studentId" element={<StudentDetailsRoute />} />
          </Route>
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow="student" />}>
        <Route element={<DashboardLayout />}>
          <Route path="/student/profile" element={<StudentView />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
