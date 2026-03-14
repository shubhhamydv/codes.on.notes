"use client";
import { useState } from "react";
import { PROBLEMS } from "../../lib/data";

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
// Props:
//   session    → NextAuth session (must have role === "ADMIN")
//   onNavigate → function(page) to redirect non-admins

const MOCK_USERS = [
  { id: 1, name: "Rahul Sharma",   email: "rahul@example.com",  role: "USER",  solved: 12, joined: "Jan 2024" },
  { id: 2, name: "Priya Singh",    email: "priya@example.com",  role: "USER",  solved: 8,  joined: "Feb 2024" },
  { id: 3, name: "Arjun Mehta",    email: "arjun@example.com",  role: "ADMIN", solved: 45, joined: "Dec 2023" },
  { id: 4, name: "Sneha Patel",    email: "sneha@example.com",  role: "USER",  solved: 3,  joined: "Mar 2024" },
];

export default function AdminPanel({ session, onNavigate }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddProblem, setShowAddProblem] = useState(false);
  const [newProblem, setNewProblem] = useState({ title: "", difficulty: "Easy", topic: "", desc: "" });

  // Block non-admins
  if (!session || session.user?.role !== "ADMIN") {
    return (
      <div className="admin-section">
        <div className="con" style={{ textAlign: "center", padding: "80px 20px" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚫</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>
            Access Denied
          </div>
          <div style={{ color: "var(--muted)", marginBottom: "24px" }}>
            You need admin privileges to view this page.
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate("home")}>← Go Home</button>
        </div>
      </div>
    );
  }

  const handleAddProblem = async () => {
    // TODO: Connect to API
    // const res = await fetch("/api/problems", { method: "POST", body: JSON.stringify(newProblem) })
    alert("Problem added! (Connect /api/problems POST to save to DB)");
    setShowAddProblem(false);
  };

  const TABS = [
    { id: "overview",  label: "📊 Overview"  },
    { id: "problems",  label: "📋 Problems"  },
    { id: "users",     label: "👥 Users"     },
    { id: "uploads",   label: "📁 Uploads"   },
  ];

  return (
    <div className="admin-section">
      <div className="con">
        {/* Header */}
        <div style={{ padding: "20px 0", borderBottom: "1px solid var(--border)", marginBottom: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="section-tag">Admin</div>
            <h1 className="section-title" style={{ fontSize: "24px" }}>Admin Panel</h1>
          </div>
          <span style={{ padding: "4px 12px", borderRadius: "6px", background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)", fontSize: "12px", fontFamily: "var(--font-mono)" }}>
            🔧 ADMIN
          </span>
        </div>

        <div className="admin-grid">
          {/* Sidebar */}
          <div className="admin-sidebar">
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--muted)", padding: "4px 12px", marginBottom: "4px", letterSpacing: "0.05em" }}>
              NAVIGATION
            </div>
            {TABS.map((t) => (
              <div
                key={t.id}
                className={`admin-nav-item ${activeTab === t.id ? "active" : ""}`}
                onClick={() => setActiveTab(t.id)}
              >
                {t.label}
              </div>
            ))}
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
              <div className="admin-nav-item" onClick={() => onNavigate("home")}>← Back to Site</div>
            </div>
          </div>

          {/* Main */}
          <div>

            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <>
                <div className="admin-stat-grid">
                  {[
                    ["Total Users", "1,284", "👥"],
                    ["Problems",    `${PROBLEMS.length}`,  "📋"],
                    ["Premium Users","347",  "⭐"],
                    ["Revenue",     "₹1.2L", "💰"],
                  ].map(([label, num, icon]) => (
                    <div className="admin-stat" key={label}>
                      <div style={{ fontSize: "20px", marginBottom: "4px" }}>{icon}</div>
                      <div className="admin-stat-num">{num}</div>
                      <div className="admin-stat-lbl">{label}</div>
                    </div>
                  ))}
                </div>
                <div className="admin-card">
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 600, marginBottom: "12px" }}>
                    Recent Activity
                  </div>
                  {[
                    ["New user registered", "rahul@example.com", "2 min ago"],
                    ["Problem solved", "Two Sum by priya@example.com", "5 min ago"],
                    ["Premium purchased", "FAANG Sheet by arjun@example.com", "12 min ago"],
                    ["PDF downloaded", "Sliding Window by sneha@example.com", "18 min ago"],
                  ].map(([action, detail, time]) => (
                    <div key={action + time} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "13px" }}>{action}</div>
                        <div style={{ fontSize: "12px", color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{detail}</div>
                      </div>
                      <div style={{ fontSize: "11px", color: "var(--muted)", fontFamily: "var(--font-mono)", whiteSpace: "nowrap" }}>{time}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── PROBLEMS ── */}
            {activeTab === "problems" && (
              <div className="admin-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 600 }}>
                    Problems ({PROBLEMS.length})
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={() => setShowAddProblem(!showAddProblem)}>
                    + Add Problem
                  </button>
                </div>

                {/* Add Problem Form */}
                {showAddProblem && (
                  <div style={{ background: "var(--bg3)", border: "1px solid var(--border2)", borderRadius: "10px", padding: "20px", marginBottom: "20px" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "16px" }}>New Problem</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      <div className="form-group">
                        <label className="form-label">TITLE</label>
                        <input className="form-input" placeholder="Two Sum" value={newProblem.title} onChange={(e) => setNewProblem({ ...newProblem, title: e.target.value })} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">TOPIC</label>
                        <input className="form-input" placeholder="Array" value={newProblem.topic} onChange={(e) => setNewProblem({ ...newProblem, topic: e.target.value })} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">DESCRIPTION</label>
                      <input className="form-input" placeholder="Brief description..." value={newProblem.desc} onChange={(e) => setNewProblem({ ...newProblem, desc: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">DIFFICULTY</label>
                      <select className="form-input" value={newProblem.difficulty} onChange={(e) => setNewProblem({ ...newProblem, difficulty: e.target.value })}>
                        <option>Easy</option><option>Medium</option><option>Hard</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button className="btn btn-primary btn-sm" onClick={handleAddProblem}>Save Problem</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => setShowAddProblem(false)}>Cancel</button>
                    </div>
                  </div>
                )}

                {/* Problems Table */}
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>TITLE</th>
                      <th>DIFFICULTY</th>
                      <th>TOPIC</th>
                      <th>PREMIUM</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PROBLEMS.map((p) => (
                      <tr key={p.id}>
                        <td>{p.title}</td>
                        <td><span className={`badge badge-${p.difficulty.toLowerCase()}`}>{p.difficulty}</span></td>
                        <td><span className="badge badge-topic">{p.topic}</span></td>
                        <td>{p.premium ? "⭐" : "—"}</td>
                        <td>
                          <div style={{ display: "flex", gap: "6px" }}>
                            <button className="btn btn-ghost btn-sm">Edit</button>
                            <button className="btn btn-sm" style={{ background: "rgba(248,113,113,0.1)", color: "#f87171", border: "1px solid rgba(248,113,113,0.2)" }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── USERS ── */}
            {activeTab === "users" && (
              <div className="admin-card">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
                  Users ({MOCK_USERS.length})
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>ROLE</th>
                      <th>SOLVED</th>
                      <th>JOINED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USERS.map((u) => (
                      <tr key={u.id}>
                        <td>{u.name}</td>
                        <td style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--muted)" }}>{u.email}</td>
                        <td>
                          <span style={{
                            padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontFamily: "var(--font-mono)",
                            background: u.role === "ADMIN" ? "rgba(248,113,113,0.1)" : "rgba(129,140,248,0.1)",
                            color: u.role === "ADMIN" ? "#f87171" : "var(--purple)",
                            border: `1px solid ${u.role === "ADMIN" ? "rgba(248,113,113,0.2)" : "rgba(129,140,248,0.2)"}`,
                          }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ fontFamily: "var(--font-mono)" }}>{u.solved}</td>
                        <td style={{ color: "var(--muted)", fontSize: "12px" }}>{u.joined}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ── UPLOADS ── */}
            {activeTab === "uploads" && (
              <div className="admin-card">
                <div style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
                  PDF & Image Uploads
                </div>
                <div style={{ border: "2px dashed var(--border2)", borderRadius: "10px", padding: "48px", textAlign: "center" }}>
                  <div style={{ fontSize: "40px", marginBottom: "12px" }}>☁️</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, marginBottom: "6px" }}>Drop files here</div>
                  <div style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "20px" }}>
                    Upload PDFs or images to Cloudinary
                  </div>
                  <button className="btn btn-primary">Choose Files</button>
                  <div style={{ fontSize: "11px", color: "var(--muted)", marginTop: "12px", fontFamily: "var(--font-mono)" }}>
                    {/* TODO: Connect to /api/admin/upload (Cloudinary) */}
                    Connect to /api/admin/upload to enable
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
