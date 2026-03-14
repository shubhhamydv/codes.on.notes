"use client";
import { PREMIUM_PLANS } from "../../lib/data";

// ─── PREMIUM PAGE ─────────────────────────────────────────────────────────────
// Props:
//   session    → NextAuth session
//   onAuthOpen → function(mode) to open auth modal

export default function PremiumPage({ session, onAuthOpen }) {
  const handleGetAccess = () => {
    if (!session) {
      onAuthOpen("signup");
      return;
    }
    // TODO: Connect to Stripe checkout via /api/stripe/checkout
    // const res = await fetch("/api/stripe/checkout", { method: "POST", body: ... })
    alert("Stripe integration coming soon!");
  };

  return (
    <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
      <div className="con">
        {/* Header */}
        <div style={{ padding: "40px 0 32px", borderBottom: "1px solid var(--border)", marginBottom: "32px", textAlign: "center" }}>
          <div className="hero-tag" style={{ display: "inline-flex", margin: "0 auto 16px" }}>
            ⭐ Premium Access
          </div>
          <h1 className="section-title" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
            Go Premium. Go Further.
          </h1>
          <p style={{ color: "var(--muted)", fontSize: "16px", maxWidth: "480px", margin: "12px auto 0" }}>
            Unlock curated DSA sheets, company-wise problems, and visual interview prep bundles.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="premium-grid">
          {PREMIUM_PLANS.map((plan) => (
            <div className="premium-card anim" key={plan.title}>
              <div className="premium-icon">{plan.icon}</div>
              <div className="premium-title">{plan.title}</div>
              <div className="premium-desc">{plan.desc}</div>
              <div className="premium-price">{plan.price}</div>
              <button className="btn btn-primary btn-full" onClick={handleGetAccess}>
                Get Access →
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginTop: "48px", padding: "32px", background: "var(--bg2)", borderRadius: "14px", border: "1px solid var(--border)" }}>
          <div className="section-tag">FAQ</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>Common Questions</h2>
          {[
            ["How long is access valid?", "All plans come with 1 year of access from purchase date."],
            ["Can I get a refund?", "Yes, 7-day no questions asked refund policy."],
            ["Is payment secure?", "Yes, payments are processed securely via Stripe."],
          ].map(([q, a]) => (
            <div key={q} style={{ marginBottom: "16px", paddingBottom: "16px", borderBottom: "1px solid var(--border)" }}>
              <div style={{ fontWeight: 600, marginBottom: "4px" }}>{q}</div>
              <div style={{ fontSize: "13px", color: "var(--muted)" }}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
