"use client";
import { useState } from "react";
import { CODE_SOLUTIONS } from "../../lib/data";

// ─── SYNTAX HIGHLIGHTER ──────────────────────────────────────────────────────
function highlight(line, lang) {
  const keywords =
    lang === "python"
      ? ["def", "return", "if", "for", "in", "not", "and", "or", "None", "True", "False", "class", "import", "from", "elif", "else", "while"]
      : ["function", "return", "const", "let", "var", "if", "for", "in", "of", "new", "class", "import", "export", "default", "void", "int", "public", "private", "map", "Map", "HashMap", "vector", "auto", "bool", "string", "null", "undefined"];
  let h = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  h = h.replace(/(\/\/.*$|#.*)$/, '<span class="com">$1</span>');
  h = h.replace(/("[^"]*"|'[^']*')/g, '<span class="str">$1</span>');
  h = h.replace(/\b(\d+)\b/g, '<span class="num">$1</span>');
  keywords.forEach((k) => {
    h = h.replace(new RegExp(`\\b(${k})\\b`, "g"), '<span class="kw">$1</span>');
  });
  return h;
}

function SyntaxCode({ code, lang }) {
  return (
    <pre>
      {code.split("\n").map((line, i) => (
        <div key={i} style={{ display: "flex", gap: "16px" }}>
          <span style={{ color: "#333", userSelect: "none", minWidth: "20px", textAlign: "right" }}>{i + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: highlight(line, lang) }} />
        </div>
      ))}
    </pre>
  );
}

// ─── TWO SUM VISUALIZER ──────────────────────────────────────────────────────
function TwoSumVisualizer() {
  const nums = [2, 7, 11, 15];
  const [step, setStep] = useState(0);

  const steps = [
    { highlight: [0], hash: [], found: [], desc: "i=0: num=2, complement=7. Not in map. Store {2:0}" },
    { highlight: [0, 1], hash: [{ k: 2, v: 0 }], found: [], desc: "i=1: num=7, complement=2. Found in map! Return [0,1] ✓" },
    { highlight: [], hash: [{ k: 2, v: 0 }], found: [0, 1], desc: "✅ Found! nums[0]+nums[1] = 2+7 = 9 = target" },
  ];
  const cur = steps[Math.min(step, steps.length - 1)];

  return (
    <div className="visual-container">
      <div className="vis-title">Two Sum — Visual Walkthrough</div>
      <div className="vis-desc">Array: [2, 7, 11, 15] | Target: 9</div>

      <div style={{ marginBottom: "8px", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>ARRAY</div>
      <div className="array-vis">
        {nums.map((n, i) => (
          <div key={i} className={`array-cell ${cur.found.includes(i) ? "found" : cur.highlight.includes(i) ? "highlight" : ""}`}>
            {n}<span className="array-idx">[{i}]</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "20px", marginBottom: "8px", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--muted)" }}>HASHMAP</div>
      <div className="hashmap-vis">
        {cur.hash.length === 0
          ? <div className="hash-row" style={{ color: "var(--muted)" }}>empty {"{}"}</div>
          : cur.hash.map((h, i) => (
            <div className="hash-row" key={i}>
              <span className="hash-key">{h.k}</span>
              <span className="hash-arrow">→</span>
              <span className="hash-val">{h.v}</span>
            </div>
          ))}
      </div>

      <div className="vis-controls">
        <button className="btn btn-outline btn-sm" onClick={() => setStep(Math.max(0, step - 1))}>← Prev</button>
        <button className="btn btn-primary btn-sm" onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Next →</button>
        <div className="vis-step">{cur.desc}</div>
      </div>
    </div>
  );
}

// ─── PROBLEM PAGE ─────────────────────────────────────────────────────────────
// Props:
//   problem    → the problem object to display
//   solved     → array of solved problem IDs
//   onBack     → function to go back to problems list

export default function ProblemPage({ problem, solved, onBack }) {
  const [activeTab, setActiveTab] = useState("problem");
  const [lang, setLang] = useState("python");

  const TABS = [
    { id: "problem", label: "📋 Problem"          },
    { id: "visual",  label: "🎨 Visual Explanation"},
    { id: "code",    label: "💻 Code Solution"     },
    { id: "pdf",     label: "📄 PDF Download"      },
  ];

  return (
    <div className="prob-page">
      <div className="con">
        {/* Header */}
        <div style={{ padding: "32px 0 24px", borderBottom: "1px solid var(--border)", marginBottom: "24px" }}>
          <button className="back-btn" onClick={onBack}>← Back to Problems</button>
          <h1 className="prob-page-title">{problem.title}</h1>
          <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            <span className={`badge badge-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
            <span className="badge badge-topic">{problem.topic}</span>
            {solved.includes(problem.id) && (
              <span className="badge" style={{ background: "rgba(0,255,135,0.1)", color: "var(--green)", border: "1px solid rgba(0,255,135,0.2)" }}>
                ✓ Solved
              </span>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`tab ${activeTab === t.id ? "active" : ""}`} onClick={() => setActiveTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="anim">
          {/* Problem Statement */}
          {activeTab === "problem" && (
            <div className="prob-statement">
              <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to target.</p>
              <h3>Example 1</h3>
              <div className="example-box">Input: nums = [2,7,11,15], target = 9{"\n"}Output: [0,1]</div>
              <h3>Constraints</h3>
              <p>• 2 ≤ nums.length ≤ 10⁴</p>
              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(0,255,135,0.04)", border: "1px solid rgba(0,255,135,0.15)", borderRadius: "8px" }}>
                <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--green)", marginBottom: "4px" }}>💡 Hint</div>
                <div style={{ fontSize: "13px", color: "var(--muted)" }}>Use a HashMap to store numbers you've seen. For each number, check if complement exists.</div>
              </div>
            </div>
          )}

          {/* Visual */}
          {activeTab === "visual" && <TwoSumVisualizer />}

          {/* Code */}
          {activeTab === "code" && (
            <div className="code-block">
              <div className="code-header">
                <div className="code-dots">
                  <div className="code-dot" style={{ background: "#f87171" }} />
                  <div className="code-dot" style={{ background: "#fbbf24" }} />
                  <div className="code-dot" style={{ background: "var(--green)" }} />
                </div>
                <div className="lang-tabs">
                  {["python", "javascript", "java", "cpp"].map((l) => (
                    <button key={l} className={`lang-tab ${lang === l ? "active" : ""}`} onClick={() => setLang(l)}>{l}</button>
                  ))}
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText(CODE_SOLUTIONS[lang])}>
                  Copy
                </button>
              </div>
              <SyntaxCode code={CODE_SOLUTIONS[lang]} lang={lang} />
            </div>
          )}

          {/* PDF */}
          {activeTab === "pdf" && (
            <div className="visual-container" style={{ textAlign: "center", padding: "60px 32px" }}>
              <div style={{ fontSize: "56px", marginBottom: "20px" }}>📄</div>
              <div className="vis-title" style={{ fontSize: "22px", marginBottom: "8px" }}>Hinglish PDF — {problem.title}</div>
              <div className="vis-desc" style={{ maxWidth: "400px", margin: "0 auto 28px" }}>
                Download complete explanation in Hinglish with diagrams and complexity analysis.
              </div>
              <button className="btn btn-primary" style={{ fontSize: "15px", padding: "12px 32px" }}>
                ⬇ Download PDF (Free)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
