"use client";
import { ROADMAP } from "../../lib/data";

// ─── ROADMAP PAGE ─────────────────────────────────────────────────────────────
// No props needed — reads from data.js

export default function RoadmapPage() {
  return (
    <div className="roadmap-section">
      <div className="con">
        {/* Header */}
        <div style={{ padding: "32px 0 28px", borderBottom: "1px solid var(--border)", marginBottom: "28px" }}>
          <div className="section-tag">Learning Path</div>
          <h1 className="section-title">DSA Roadmap</h1>
          <p className="section-sub">Track your progress from arrays to advanced algorithms.</p>
        </div>

        {/* Roadmap Levels */}
        <div className="roadmap-grid">
          {ROADMAP.map((level, li) => (
            <div
              key={level.level}
              className="roadmap-level anim"
              style={{ animationDelay: `${li * 0.1}s`, opacity: 0 }}
            >
              {/* Level Header */}
              <div className="roadmap-level-header">
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: level.color, boxShadow: `0 0 10px ${level.color}` }} />
                <div className="level-badge" style={{ background: `${level.color}15`, color: level.color, border: `1px solid ${level.color}30` }}>
                  {level.level}
                </div>
                <div style={{ marginLeft: "auto", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>
                  {level.topics.reduce((a, t) => a + t.done, 0)}/
                  {level.topics.reduce((a, t) => a + t.problems, 0)} solved
                </div>
              </div>

              {/* Topics */}
              <div className="roadmap-topics">
                {level.topics.map((topic) => (
                  <div className="topic-card" key={topic.name}>
                    <div className="topic-name">{topic.name}</div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${(topic.done / topic.problems) * 100}%`, background: level.color }}
                      />
                    </div>
                    <div className="progress-text">{topic.done}/{topic.problems} problems</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
