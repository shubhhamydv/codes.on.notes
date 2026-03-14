"use client";
import { useState } from "react";
import { PROBLEMS, FEATURES } from "../../lib/data";

// ─── PROBLEMS GRID ────────────────────────────────────────────────────────────
// Props:
//   solved        → array of solved problem IDs
//   bookmarks     → array of bookmarked problem IDs
//   onBookmark    → function(id, event) to toggle bookmark
//   onOpenProblem → function(problem) to open a problem
//   session       → NextAuth session

export default function ProblemsGrid({ solved, bookmarks, onBookmark, onOpenProblem, session }) {
  const [search, setSearch] = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");

  const topics = ["All", ...new Set(PROBLEMS.map((p) => p.topic))];

  const filtered = PROBLEMS.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.title.toLowerCase().includes(q) || p.topic.toLowerCase().includes(q)) &&
      (diffFilter === "All" || p.difficulty === diffFilter) &&
      (topicFilter === "All" || p.topic === topicFilter)
    );
  });

  return (
    <>
      {/* ── PROBLEMS LIST ── */}
      <section className="section">
        <div className="con">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="section-tag">Problems</div>
              <h2 className="section-title">All Problems</h2>
              <p className="section-sub">{filtered.length} problems • {solved.length} solved</p>
            </div>
          </div>

          {/* Filters */}
          <div className="filters">
            <div className="search-wrap">
              <span className="search-icon">⌕</span>
              <input
                className="search-input"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                className={`filter-btn ${diffFilter === d ? "active" : ""}`}
                onClick={() => setDiffFilter(d)}
              >
                {d}
              </button>
            ))}
            <select
              className="filter-btn"
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              style={{ cursor: "pointer" }}
            >
              {topics.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          {/* Problem Cards */}
          <div className="prob-grid">
            {filtered.map((p, i) => (
              <div
                key={p.id}
                className="prob-card anim"
                style={{ animationDelay: `${i * 0.04}s`, opacity: 0 }}
                onClick={() => onOpenProblem(p)}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div className="prob-title">{p.title}</div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {p.premium && <span style={{ fontSize: "14px" }}>⭐</span>}
                    <button
                      className={`icon-btn ${bookmarks.includes(p.id) ? "active" : ""}`}
                      onClick={(e) => onBookmark(p.id, e)}
                    >
                      {bookmarks.includes(p.id) ? "🔖" : "🏷"}
                    </button>
                  </div>
                </div>
                <div className="prob-desc">{p.desc}</div>
                <div className="prob-footer">
                  <span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                  <span className="badge badge-topic">{p.topic}</span>
                  {solved.includes(p.id) && <div className="solved-dot" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section className="section" style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)" }}>
        <div className="con">
          <div className="section-tag" style={{ justifyContent: "center" }}>Why Codes on Notes</div>
          <h2 className="section-title" style={{ textAlign: "center", marginBottom: "40px" }}>
            Everything you need to crack DSA
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
            {FEATURES.map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: "20px", background: "var(--bg3)", borderRadius: "12px", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: "24px", marginBottom: "10px" }}>{icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "14px", marginBottom: "6px" }}>{title}</div>
                <div style={{ fontSize: "13px", color: "var(--muted)", lineHeight: "1.5" }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
