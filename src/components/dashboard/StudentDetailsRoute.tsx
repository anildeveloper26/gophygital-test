import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getStudentById } from "../../lib/auth";
import { paths } from "../../routes/paths";
import { UserDetailsModal } from "./UserDetailsModal";

export function StudentDetailsRoute() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const student = getStudentById(studentId);

  if (!student) return <Navigate to={paths.adminStudents} replace />;

  return (
    <UserDetailsModal
      user={student}
      onClose={() => navigate(paths.adminStudents)}
    />
  );
}
