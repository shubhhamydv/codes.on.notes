"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

// ─── AUTH MODAL ───────────────────────────────────────────────────────────────
// Props:
//   mode     → "login" | "signup"
//   onClose  → function to close modal
//   onSwitch → function to switch between login/signup

export default function AuthModal({ mode, onClose, onSwitch }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (mode === "signup") {
        // ── REGISTER ──
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || "Registration failed"); setLoading(false); return; }
        setSuccess("Account created! Signing you in...");
        await signIn("credentials", { email: form.email, password: form.password, redirect: false });
        setTimeout(() => onClose(), 800);
      } else {
        // ── LOGIN ──
        const result = await signIn("credentials", {
          email: form.email, password: form.password, redirect: false,
        });
        if (result?.error) { setError("Invalid email or password"); setLoading(false); return; }
        setSuccess("Welcome back! 🎉");
        setTimeout(() => onClose(), 800);
      }
    } catch (e) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>✕</button>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <div className="logo-dot" />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "14px" }}>
            Codes on Notes
          </span>
        </div>

        <div className="modal-title">
          {mode === "login" ? "Welcome back 👋" : "Create account"}
        </div>
        <div className="modal-sub">
          {mode === "login"
            ? "Sign in to track your progress and streaks."
            : "Join 50K+ students mastering DSA visually."}
        </div>

        {/* OAuth Buttons */}
        <button className="oauth-btn" onClick={() => signIn("google", { callbackUrl: "/" })}>
          <span>🔵</span> Continue with Google
        </button>
        <button className="oauth-btn" onClick={() => signIn("github", { callbackUrl: "/" })}>
          <span>⚫</span> Continue with GitHub
        </button>

        <div className="divider">
          <div className="divider-line" />
          <span className="divider-text">or</span>
          <div className="divider-line" />
        </div>

        {/* Banners */}
        {success && <div className="success-banner">✓ {success}</div>}
        {error && <div className="error-banner">⚠ {error}</div>}

        {/* Name field (signup only) */}
        {mode === "signup" && (
          <div className="form-group">
            <label className="form-label">FULL NAME</label>
            <input
              className="form-input"
              placeholder="Rahul Sharma"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>
        )}

        {/* Email */}
        <div className="form-group">
          <label className="form-label">EMAIL</label>
          <input
            className="form-input"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="form-group">
          <label className="form-label">PASSWORD</label>
          <input
            className="form-input"
            type="password"
            placeholder={mode === "signup" ? "Min 8 characters" : "••••••••"}
            value={form.password}
            onChange={(e) => update("password", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />
        </div>

        {/* Submit */}
        <button
          className="btn btn-primary btn-full"
          onClick={handleSubmit}
          disabled={loading}
          style={{ marginTop: "4px" }}
        >
          {loading ? "⟳ Please wait..." : mode === "login" ? "Sign In →" : "Create Account →"}
        </button>

        {/* Switch mode */}
        <div className="modal-switch">
          {mode === "login" ? (
            <>Don't have an account? <span onClick={() => onSwitch("signup")}>Sign up free</span></>
          ) : (
            <>Already have an account? <span onClick={() => onSwitch("login")}>Sign in</span></>
          )}
        </div>
      </div>
    </div>
  );
}
