import { useCurrentUser } from "../../context/AuthContext";
import { UserDetails } from "./UserDetails";

export function StudentView() {
  const user = useCurrentUser();
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-white/60 bg-white/50 p-6 shadow-xl shadow-[#294b4e]/10 backdrop-blur-md">
      <h1 className="mb-1 text-2xl font-semibold">My Details</h1>
      <p className="mb-6 text-sm text-[#6b8580]">
        Your profile information
      </p>
      <UserDetails user={user} />
    </section>
  );
}
