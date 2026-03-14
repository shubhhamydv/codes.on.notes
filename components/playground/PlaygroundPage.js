"use client";
import { useState } from "react";

const DEFAULT_CODE = `# Write your solution here
def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

print(twoSum([2, 7, 11, 15], 9))`;

// ─── PLAYGROUND PAGE ──────────────────────────────────────────────────────────
// Code editor + output panel
// TODO: Connect to Judge0 API via /api/execute for real code execution

export default function PlaygroundPage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [lang, setLang] = useState("Python 3");

  const runCode = async () => {
    setRunning(true);
    setOutput("");

    // ── Uncomment below to use real Judge0 execution ──
    // try {
    //   const res = await fetch("/api/execute", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ code, language: lang }),
    //   });
    //   const data = await res.json();
    //   setOutput(data.output || data.error);
    // } catch (e) {
    //   setOutput("Error connecting to executor.");
    // }

    // ── Simulated output for now ──
    setTimeout(() => {
      setOutput("[0, 1]\n\n✓ Executed in 42ms\n✓ Memory: 14.3 MB");
      setRunning(false);
    }, 900);
  };

  return (
    <div className="playground-section">
      <div className="con">
        {/* Header */}
        <div style={{ padding: "20px 0 16px", borderBottom: "1px solid var(--border)", marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div className="section-tag">Playground</div>
            <h1 className="section-title" style={{ fontSize: "24px" }}>Code Playground</h1>
          </div>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <select
              className="filter-btn"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              style={{ cursor: "pointer", fontFamily: "var(--font-mono)" }}
            >
              <option>Python 3</option>
              <option>JavaScript</option>
              <option>Java</option>
              <option>C++</option>
            </select>
            <button className="btn btn-primary" onClick={runCode} disabled={running} style={{ minWidth: "90px" }}>
              {running ? "⟳ Running..." : "▶ Run"}
            </button>
          </div>
        </div>

        {/* Editor + Output */}
        <div className="pg-layout">
          {/* Editor Panel */}
          <div className="pg-panel">
            <div className="pg-header">
              <span className="pg-title">editor.py</span>
              <div className="code-dots">
                <div className="code-dot" style={{ background: "#f87171" }} />
                <div className="code-dot" style={{ background: "#fbbf24" }} />
                <div className="code-dot" style={{ background: "var(--green)" }} />
              </div>
            </div>
            <div className="pg-body">
              <textarea
                className="pg-editor"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="pg-panel">
            <div className="pg-header">
              <span className="pg-title">output</span>
              {output && <span style={{ fontSize: "11px", color: "var(--green)", fontFamily: "var(--font-mono)" }}>✓ Done</span>}
            </div>
            <div className="pg-body">
              {output
                ? <div className="pg-output">{output}</div>
                : <div style={{ padding: "20px", color: "var(--muted)", fontSize: "13px", fontFamily: "var(--font-mono)" }}>
                    {running ? "⟳ Executing..." : "// Click Run to execute your code"}
                  </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
