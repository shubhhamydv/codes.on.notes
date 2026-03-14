"use client";
import { useSession } from "next-auth/react";
import UserMenu from "./UserMenu";

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
// Props:
//   page        → current active page name
//   onNavigate  → function(page) to navigate
//   onAuthOpen  → function(mode) to open auth modal ("login" | "signup")

const NAV_LINKS = [
  { page: "home",       label: "Problems"   },
  { page: "roadmap",    label: "Roadmap"    },
  { page: "playground", label: "Playground" },
  { page: "premium",    label: "Premium"    },
  { page: "dashboard",  label: "Dashboard"  },
];

export default function Navbar({ page, onNavigate, onAuthOpen }) {
  const { data: session, status } = useSession();

  return (
    <nav className="nav">
      <div className="con nav-inner">

        {/* Logo */}
        <div className="logo" onClick={() => onNavigate("home")}>
          <div className="logo-dot" />
          Codes on Notes
        </div>

        {/* Nav links */}
        <div className="nav-links">
          {NAV_LINKS.map(({ page: p, label }) => (
            <button
              key={p}
              className={`nav-link ${page === p ? "active" : ""}`}
              onClick={() => onNavigate(p)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Right side: Login/Signup OR user avatar */}
        <div className="nav-actions">
          {status === "loading" ? (
            // Loading skeleton
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--bg3)", border: "1px solid var(--border)" }} />
          ) : session ? (
            <UserMenu session={session} onNavigate={onNavigate} />
          ) : (
            <>
              <button className="btn btn-ghost btn-sm" onClick={() => onAuthOpen("login")}>
                Log In
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => onAuthOpen("signup")}>
                Sign Up
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}
