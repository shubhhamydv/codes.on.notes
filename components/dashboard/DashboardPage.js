"use client";
import { signOut } from "next-auth/react";
import { PROBLEMS } from "../../lib/data";

// ─── DASHBOARD PAGE ───────────────────────────────────────────────────────────
// Props:
//   session    → NextAuth session object
//   solved     → array of solved problem IDs
//   onNavigate → function(page) to navigate
//   onAuthOpen → function(mode) to open auth modal
//   onOpenProblem → function(problem) to open a problem

export default function DashboardPage({ session, solved, onNavigate, onAuthOpen, onOpenProblem }) {
  if (!session) {
    // Not logged in state
    return (
      <div className="dash-section">
        <div className="con" style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔒</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
            Sign in to view Dashboard
          </div>
          <div style={{ color: "var(--muted)", marginBottom: "24px" }}>
            Track your progress, streaks, and bookmarks.
          </div>
          <button className="btn btn-primary" onClick={() => onAuthOpen("login")}>
            Sign In →
          </button>
        </div>
      </div>
    );
  }

  const initial = session.user?.name?.[0]?.toUpperCase() || "U";
  const solvedProblems = PROBLEMS.filter((p) => solved.includes(p.id));

  return (
    <div className="dash-section">
      <div className="con">
        {/* Header */}
        <div style={{ padding: "20px 0", borderBottom: "1px solid var(--border)", marginBottom: "24px" }}>
          <div className="section-tag">Dashboard</div>
          <h1 className="section-title" style={{ fontSize: "24px" }}>My Learning</h1>
        </div>

        <div className="dash-grid">
          {/* ── SIDEBAR ── */}
          <div className="dash-sidebar">
            <div className="dash-avatar">{initial}</div>
            <div className="dash-name">{session.user?.name || "User"}</div>
            <div className="dash-handle">{session.user?.email}</div>

            <div className="dash-stat-row">
              <div className="dash-stat-card">
                <div className="dash-stat-num">{solved.length}</div>
                <div className="dash-stat-lbl">Solved</div>
              </div>
              <div className="dash-stat-card">
                <div className="dash-stat-num" style={{ color: "var(--purple)" }}>7</div>
                <div className="dash-stat-lbl">Streak</div>
              </div>
            </div>

            {/* Sidebar Nav */}
            {[["📊", "Overview"], ["✅", "Solved"], ["🔖", "Bookmarks"], ["🗺️", "Roadmap"], ["⭐", "Premium"]].map(([icon, label]) => (
              <div className="dash-nav-item" key={label}>{icon} {label}</div>
            ))}

            <div style={{ marginTop: "12px" }}>
              <button
                className="btn btn-ghost btn-sm btn-full"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                🚪 Sign Out
              </button>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="dash-main">

            {/* Streak Card */}
            <div className="dash-card">
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div>
                  <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "4px" }}>
                    CURRENT STREAK
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "24px" }}>🔥</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 800 }}>7</span>
                    <span style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>days</span>
                  </div>
                </div>
                <div style={{ marginLeft: "auto", textAlign: "right" }}>
                  <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>LONGEST</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700 }}>12 🏆</div>
                </div>
              </div>
              <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", marginBottom: "8px" }}>
                LAST 28 DAYS
              </div>
              <div className="streak-calendar">
                {Array.from({ length: 28 }, (_, i) => (
                  <div
                    key={i}
                    className={`streak-day ${i === 27 ? "today" : [1, 2, 3, 5, 6, 8, 10, 13, 20, 21, 22, 23, 24, 25, 26].includes(i) ? "active" : ""}`}
                  />
                ))}
              </div>
            </div>

            {/* Difficulty Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
              {[["Easy", "#00ff87", 4, 5], ["Medium", "#fbbf24", 0, 12], ["Hard", "#f87171", 0, 8]].map(([d, c, done, total]) => (
                <div className="dash-card" key={d} style={{ padding: "16px" }}>
                  <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: c, marginBottom: "8px" }}>{d}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 700 }}>
                    {done}<span style={{ fontSize: "14px", color: "var(--muted)" }}>/{total}</span>
                  </div>
                  <div className="progress-bar-wrap" style={{ marginTop: "8px" }}>
                    <div className="progress-bar-fill" style={{ width: `${(done / total) * 100}%`, background: c }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Recently Solved */}
            <div className="dash-card">
              <div className="dash-card-title">Recently Solved</div>
              <div className="solved-list">
                {solvedProblems.length === 0 ? (
                  <div style={{ color: "var(--muted)", fontSize: "13px" }}>No problems solved yet. Start solving!</div>
                ) : (
                  solvedProblems.map((p) => (
                    <div
                      className="solved-item"
                      key={p.id}
                      onClick={() => onOpenProblem(p)}
                    >
                      <span className="solved-check">✓</span>
                      <span style={{ flex: 1 }}>{p.title}</span>
                      <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
