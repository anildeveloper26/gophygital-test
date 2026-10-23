import { useMemo } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { getStudents } from "../../lib/auth";
import { paths } from "../../routes/paths";
import { UserDetailsModal } from "./UserDetailsModal";

export function StudentDetailsRoute() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { search } = useLocation();
  const listLocation = { pathname: paths.adminStudents, search };

  const student = useMemo(
    () => getStudents().find((s) => String(s.id) === studentId),
    [studentId],
  );

  if (!student) return <Navigate to={listLocation} replace />;

  return (
    <UserDetailsModal user={student} onClose={() => navigate(listLocation)} />
  );
}
