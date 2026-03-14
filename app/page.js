"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";

// ── Styles ──
import styles from "../lib/styles";

// ── Shared Components ──
import Navbar    from "../components/Navbar";
import AuthModal from "../components/AuthModal";

// ── Page Components ──
import HeroSection    from "../components/home/HeroSection";
import ProblemsGrid   from "../components/home/ProblemsGrid";
import ProblemPage    from "../components/problem/ProblemPage";
import RoadmapPage    from "../components/roadmap/RoadmapPage";
import PlaygroundPage from "../components/playground/PlaygroundPage";
import DashboardPage  from "../components/dashboard/DashboardPage";
import PremiumPage    from "../components/premium/PremiumPage";
import AdminPanel     from "../components/admin/AdminPanel";

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const { data: session } = useSession();

  // ── Navigation ──
  const [page, setPage] = useState("home");
  const nav = (p) => { setPage(p); window.scrollTo(0, 0); };

  // ── Auth Modal ──
  const [authModal, setAuthModal] = useState(null); // "login" | "signup" | null

  // ── Problem State ──
  const [activeProblem, setActiveProblem] = useState(null);
  const openProblem = (p) => { setActiveProblem(p); nav("problem"); };

  // ── User Data ──
  const [bookmarks, setBookmarks] = useState([1, 3]);
  const [solved] = useState([1, 4, 7, 9]);

  const toggleBookmark = (id, e) => {
    e.stopPropagation();
    if (!session) { setAuthModal("login"); return; }
    setBookmarks((b) => b.includes(id) ? b.filter((x) => x !== id) : [...b, id]);
  };

  return (
    <>
      <style suppressHydrationWarning>{styles}</style>

      {/* Auth Modal */}
      {authModal && (
        <AuthModal
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSwitch={(m) => setAuthModal(m)}
        />
      )}

      {/* Navbar (on every page) */}
      <Navbar
        page={page}
        onNavigate={nav}
        onAuthOpen={(m) => setAuthModal(m)}
      />

      {/* ── Pages ── */}
      {page === "home" && (
        <>
          <HeroSection session={session} onNavigate={nav} onAuthOpen={(m) => setAuthModal(m)} />
          <ProblemsGrid
            solved={solved}
            bookmarks={bookmarks}
            onBookmark={toggleBookmark}
            onOpenProblem={openProblem}
            session={session}
          />
        </>
      )}

      {page === "problem" && activeProblem && (
        <ProblemPage
          problem={activeProblem}
          solved={solved}
          onBack={() => nav("home")}
        />
      )}

      {page === "roadmap"    && <RoadmapPage />}
      {page === "playground" && <PlaygroundPage />}

      {page === "dashboard" && (
        <DashboardPage
          session={session}
          solved={solved}
          onNavigate={nav}
          onAuthOpen={(m) => setAuthModal(m)}
          onOpenProblem={openProblem}
        />
      )}

      {page === "premium" && (
        <PremiumPage
          session={session}
          onAuthOpen={(m) => setAuthModal(m)}
        />
      )}

      {page === "admin" && (
        <AdminPanel
          session={session}
          onNavigate={nav}
        />
      )}

      {/* Footer (hide on playground) */}
      {page !== "playground" && (
        <footer className="footer">
          <div className="con footer-inner">
            <div>
              <div className="logo" style={{ marginBottom: "6px" }}>
                <div className="logo-dot" /> Codes on Notes
              </div>
              <div className="footer-text">DSA explained visually, in Hinglish.</div>
            </div>
            <div className="footer-links">
              {["Instagram", "YouTube", "GitHub", "Contact"].map((l) => (
                <span key={l} className="footer-link">{l}</span>
              ))}
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
