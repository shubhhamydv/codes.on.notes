"use client";

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
// Props:
//   session    → NextAuth session (to decide CTA behavior)
//   onNavigate → function(page) to navigate
//   onAuthOpen → function(mode) to open auth modal

export default function HeroSection({ session, onNavigate, onAuthOpen }) {
  return (
    <section className="hero">
      <div className="hero-grid" />
      <div className="hero-glow" />

      <div className="con" style={{ position: "relative" }}>
        {/* Tag */}
        <div className="anim" style={{ display: "flex", justifyContent: "center" }}>
          <div className="hero-tag">✦ @codes.on.notes — DSA Made Visual</div>
        </div>

        {/* Title */}
        <h1 className="hero-title anim anim-delay-1">
          Master DSA<br /><span>Visually</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-sub anim anim-delay-2">
          LeetCode problems explained in Hinglish with visual intuition,
          code walkthroughs, and downloadable PDF notes.
        </p>

        {/* CTA Buttons */}
        <div className="hero-btns anim anim-delay-3">
          <button
            className="btn btn-primary"
            onClick={() => session ? onNavigate("home") : onAuthOpen("signup")}
          >
            Start Solving →
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate("roadmap")}>
            Explore Roadmap
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats anim anim-delay-4">
          {[["150+", "Problems"], ["50K+", "Students"], ["12", "Topics"], ["4", "Languages"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div className="stat-num"><span>{num}</span></div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
