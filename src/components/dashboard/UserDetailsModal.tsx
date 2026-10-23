import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { PublicUser } from "../../lib/auth";
import { UserDetails } from "./UserDetails";

interface Props {
  user: PublicUser;
  onClose: () => void;
}

export function UserDetailsModal({ user, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <button
        type="button"
        aria-label="Close details"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-[#294b4e]/40 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-details-title"
        className="relative w-full max-w-lg rounded-2xl border border-white/60 bg-white p-6 shadow-2xl"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 id="user-details-title" className="text-xl font-semibold">
            Student Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg px-2 py-1 text-xl leading-none text-[#6b8580] transition hover:bg-[#477f75]/10 hover:text-[#294b4e]"
          >
            &times;
          </button>
        </div>
        <UserDetails user={user} />
      </div>
    </div>,
    document.body,
  );
}
