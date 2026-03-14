"use client";
import { useState, useEffect, useRef } from "react";
import { signOut } from "next-auth/react";

// ─── USER MENU (avatar + dropdown) ───────────────────────────────────────────
// Props:
//   session    → NextAuth session object
//   onNavigate → function(page) to navigate to a page

export default function UserMenu({ session, onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const initial = session?.user?.name?.[0]?.toUpperCase() || "U";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="user-menu" ref={ref}>
      {/* Avatar button */}
      <button className="user-avatar" onClick={() => setOpen(!open)}>
        {initial}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="user-dropdown">
          <div className="dropdown-name">
            {session?.user?.name || session?.user?.email}
          </div>
          <div className="dropdown-item" onClick={() => { onNavigate("dashboard"); setOpen(false); }}>
            📊 Dashboard
          </div>
          <div className="dropdown-item" onClick={() => { onNavigate("roadmap"); setOpen(false); }}>
            🗺️ My Roadmap
          </div>
          <div className="dropdown-item" onClick={() => { onNavigate("premium"); setOpen(false); }}>
            ⭐ Premium
          </div>

          {/* Show admin panel link if user is admin */}
          {session?.user?.role === "ADMIN" && (
            <div className="dropdown-item" onClick={() => { onNavigate("admin"); setOpen(false); }}>
              🔧 Admin Panel
            </div>
          )}

          <div className="dropdown-divider" />
          <div
            className="dropdown-item"
            style={{ color: "#f87171" }}
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            🚪 Sign Out
          </div>
        </div>
      )}
    </div>
  );
}
