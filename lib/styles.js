// ─── ALL STYLES IN ONE PLACE ──────────────────────────────────────────────────
// Edit this file to change colors, fonts, spacing, etc.

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #080808; --bg2: #111111; --bg3: #181818;
    --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.12);
    --green: #00ff87; --purple: #818cf8; --pink: #f472b6;
    --text: #e8e8e8; --muted: #666; --muted2: #444;
    --font-display: 'Syne', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --font-body: 'DM Sans', sans-serif;
  }
  body { background: var(--bg); color: var(--text); font-family: var(--font-body); }
  .con { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 2px; }

  /* ── BUTTONS ── */
  .btn { padding: 8px 18px; border-radius: 8px; border: none; font-size: 13px; font-weight: 500; cursor: pointer; font-family: var(--font-body); transition: all 0.2s; display: inline-flex; align-items: center; gap: 6px; }
  .btn-ghost { background: transparent; color: var(--muted); border: 1px solid var(--border2); }
  .btn-ghost:hover { color: var(--text); background: var(--bg3); }
  .btn-primary { background: var(--green); color: #000; font-weight: 600; }
  .btn-primary:hover { background: #00e87a; transform: translateY(-1px); box-shadow: 0 0 20px rgba(0,255,135,0.3); }
  .btn-outline { background: transparent; color: var(--text); border: 1px solid var(--border2); }
  .btn-outline:hover { border-color: var(--green); color: var(--green); }
  .btn-sm { padding: 5px 12px; font-size: 12px; }
  .btn-full { width: 100%; justify-content: center; }

  /* ── NAVBAR ── */
  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 60px; background: rgba(8,8,8,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); display: flex; align-items: center; }
  .nav-inner { display: flex; align-items: center; justify-content: space-between; width: 100%; }
  .logo { font-family: var(--font-display); font-weight: 800; font-size: 16px; display: flex; align-items: center; gap: 8px; cursor: pointer; }
  .logo-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--green); box-shadow: 0 0 12px var(--green); animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
  .nav-links { display: flex; gap: 4px; }
  .nav-link { padding: 6px 14px; border-radius: 6px; font-size: 13px; color: var(--muted); cursor: pointer; transition: all 0.2s; border: none; background: none; font-family: var(--font-body); }
  .nav-link:hover, .nav-link.active { color: var(--text); background: var(--bg3); }
  .nav-actions { display: flex; gap: 8px; align-items: center; }

  /* ── AUTH MODAL ── */
  .modal-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(0,0,0,0.8); backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeOverlay 0.2s ease; }
  @keyframes fadeOverlay { from{opacity:0} to{opacity:1} }
  .modal { background: var(--bg2); border: 1px solid var(--border2); border-radius: 16px; padding: 32px; width: 100%; max-width: 400px; position: relative; animation: slideUp 0.25s ease; }
  @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  .modal-close { position: absolute; top: 16px; right: 16px; width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border2); background: transparent; color: var(--muted); cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
  .modal-close:hover { color: var(--text); background: var(--bg3); }
  .modal-title { font-family: var(--font-display); font-size: 22px; font-weight: 700; margin-bottom: 6px; }
  .modal-sub { font-size: 13px; color: var(--muted); margin-bottom: 24px; line-height: 1.5; }
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 12px; font-family: var(--font-mono); color: var(--muted); margin-bottom: 6px; letter-spacing: 0.05em; }
  .form-input { width: 100%; padding: 10px 14px; background: var(--bg3); border: 1px solid var(--border2); border-radius: 8px; color: var(--text); font-size: 14px; font-family: var(--font-body); outline: none; transition: border-color 0.15s; }
  .form-input:focus { border-color: var(--green); }
  .form-input::placeholder { color: var(--muted2); }
  .divider { display: flex; align-items: center; gap: 12px; margin: 20px 0; }
  .divider-line { flex: 1; height: 1px; background: var(--border2); }
  .divider-text { font-size: 12px; color: var(--muted); font-family: var(--font-mono); }
  .oauth-btn { width: 100%; padding: 10px; border-radius: 8px; border: 1px solid var(--border2); background: var(--bg3); color: var(--text); font-size: 13px; cursor: pointer; font-family: var(--font-body); transition: all 0.15s; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 8px; }
  .oauth-btn:hover { background: var(--bg); transform: translateY(-1px); }
  .modal-switch { text-align: center; margin-top: 20px; font-size: 13px; color: var(--muted); }
  .modal-switch span { color: var(--green); cursor: pointer; font-weight: 500; }
  .success-banner { background: rgba(0,255,135,0.1); border: 1px solid rgba(0,255,135,0.2); border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 13px; color: var(--green); font-family: var(--font-mono); }
  .error-banner { background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.2); border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; font-size: 13px; color: #f87171; }

  /* ── USER MENU ── */
  .user-menu { position: relative; }
  .user-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--green), var(--purple)); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 13px; font-weight: 700; color: #000; cursor: pointer; border: none; transition: all 0.15s; }
  .user-avatar:hover { transform: scale(1.05); box-shadow: 0 0 12px rgba(0,255,135,0.3); }
  .user-dropdown { position: absolute; top: 40px; right: 0; background: var(--bg2); border: 1px solid var(--border2); border-radius: 10px; padding: 8px; min-width: 180px; box-shadow: 0 8px 30px rgba(0,0,0,0.4); animation: slideUp 0.15s ease; z-index: 200; }
  .dropdown-item { padding: 8px 12px; border-radius: 6px; font-size: 13px; cursor: pointer; color: var(--muted); transition: all 0.15s; display: flex; align-items: center; gap: 8px; }
  .dropdown-item:hover { color: var(--text); background: var(--bg3); }
  .dropdown-divider { height: 1px; background: var(--border); margin: 4px 0; }
  .dropdown-name { padding: 8px 12px; font-size: 12px; color: var(--muted); font-family: var(--font-mono); border-bottom: 1px solid var(--border); margin-bottom: 4px; }

  /* ── HERO ── */
  .hero { padding-top: 140px; padding-bottom: 80px; position: relative; overflow: hidden; text-align: center; }
  .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent); }
  .hero-glow { position: absolute; width: 600px; height: 300px; background: radial-gradient(ellipse, rgba(0,255,135,0.08) 0%, transparent 70%); top: 60px; left: 50%; transform: translateX(-50%); pointer-events: none; }
  .hero-tag { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; border: 1px solid rgba(0,255,135,0.2); background: rgba(0,255,135,0.05); font-size: 11px; color: var(--green); font-family: var(--font-mono); margin-bottom: 28px; letter-spacing: 0.05em; }
  .hero-title { font-family: var(--font-display); font-size: clamp(42px, 7vw, 80px); font-weight: 800; line-height: 1.0; letter-spacing: -0.03em; background: linear-gradient(135deg, #fff 0%, #888 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 20px; }
  .hero-title span { background: linear-gradient(135deg, var(--green), var(--purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero-sub { font-size: 17px; color: var(--muted); max-width: 500px; margin: 0 auto 36px; line-height: 1.6; font-weight: 300; }
  .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  .hero-stats { display: flex; gap: 40px; justify-content: center; margin-top: 60px; padding-top: 40px; border-top: 1px solid var(--border); }
  .stat-num { font-family: var(--font-display); font-size: 28px; font-weight: 700; }
  .stat-num span { color: var(--green); }
  .stat-label { font-size: 12px; color: var(--muted); margin-top: 2px; font-family: var(--font-mono); }

  /* ── SECTIONS ── */
  .section { padding: 80px 0; }
  .section-tag { font-family: var(--font-mono); font-size: 11px; color: var(--green); letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
  .section-title { font-family: var(--font-display); font-size: clamp(28px, 4vw, 40px); font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px; }
  .section-sub { color: var(--muted); font-size: 15px; max-width: 500px; line-height: 1.6; }

  /* ── PROBLEMS ── */
  .filters { display: flex; gap: 10px; margin-bottom: 24px; flex-wrap: wrap; align-items: center; }
  .search-wrap { flex: 1; min-width: 200px; max-width: 320px; position: relative; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--muted); font-size: 14px; }
  .search-input { width: 100%; padding: 8px 12px 8px 34px; background: var(--bg3); border: 1px solid var(--border2); border-radius: 8px; color: var(--text); font-size: 13px; font-family: var(--font-body); outline: none; }
  .search-input:focus { border-color: var(--green); }
  .filter-btn { padding: 7px 14px; border-radius: 7px; border: 1px solid var(--border2); background: var(--bg3); color: var(--muted); font-size: 12px; cursor: pointer; font-family: var(--font-body); transition: all 0.15s; }
  .filter-btn:hover, .filter-btn.active { border-color: var(--green); color: var(--green); }
  .prob-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px; }
  .prob-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 22px; cursor: pointer; transition: all 0.2s; }
  .prob-card:hover { border-color: var(--border2); transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.3); }
  .prob-title { font-family: var(--font-display); font-size: 15px; font-weight: 600; }
  .prob-desc { font-size: 13px; color: var(--muted); line-height: 1.5; margin: 10px 0 16px; }
  .prob-footer { display: flex; align-items: center; gap: 8px; }
  .badge { padding: 3px 9px; border-radius: 5px; font-size: 11px; font-weight: 500; font-family: var(--font-mono); }
  .badge-easy { background: rgba(0,255,135,0.1); color: var(--green); border: 1px solid rgba(0,255,135,0.2); }
  .badge-medium { background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.2); }
  .badge-hard { background: rgba(248,113,113,0.1); color: #f87171; border: 1px solid rgba(248,113,113,0.2); }
  .badge-topic { background: rgba(129,140,248,0.1); color: var(--purple); border: 1px solid rgba(129,140,248,0.2); }
  .solved-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); box-shadow: 0 0 6px var(--green); margin-left: auto; }
  .icon-btn { width: 28px; height: 28px; border-radius: 6px; border: 1px solid var(--border); background: transparent; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; font-size: 13px; color: var(--muted); }
  .icon-btn:hover { border-color: var(--border2); color: var(--text); }
  .icon-btn.active { color: var(--green); border-color: rgba(0,255,135,0.3); }

  /* ── PROBLEM PAGE ── */
  .prob-page { padding-top: 80px; min-height: 100vh; }
  .back-btn { display: inline-flex; align-items: center; gap: 6px; color: var(--muted); font-size: 13px; cursor: pointer; margin-bottom: 20px; transition: color 0.15s; background: none; border: none; font-family: var(--font-body); }
  .back-btn:hover { color: var(--text); }
  .prob-page-title { font-family: var(--font-display); font-size: 28px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 12px; }
  .tabs { display: flex; gap: 2px; border-bottom: 1px solid var(--border); margin-bottom: 28px; }
  .tab { padding: 10px 18px; font-size: 13px; cursor: pointer; color: var(--muted); border: none; background: none; font-family: var(--font-body); transition: all 0.15s; border-bottom: 2px solid transparent; margin-bottom: -1px; }
  .tab.active { color: var(--green); border-bottom-color: var(--green); }
  .code-block { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
  .code-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid var(--border); background: var(--bg3); }
  .code-dots { display: flex; gap: 6px; }
  .code-dot { width: 10px; height: 10px; border-radius: 50%; }
  .lang-tabs { display: flex; gap: 4px; }
  .lang-tab { padding: 4px 10px; border-radius: 5px; font-size: 11px; font-family: var(--font-mono); cursor: pointer; color: var(--muted); border: none; background: none; transition: all 0.15s; }
  .lang-tab:hover, .lang-tab.active { color: var(--text); background: var(--bg); }
  pre { padding: 20px; overflow-x: auto; font-family: var(--font-mono); font-size: 13px; line-height: 1.7; color: #d4d4d4; }
  .kw { color: #569cd6; } .fn { color: #dcdcaa; } .str { color: #ce9178; }
  .com { color: #6a9955; } .num { color: #b5cea8; } .var { color: #9cdcfe; }
  .prob-statement { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 24px; font-size: 14px; line-height: 1.8; }
  .prob-statement h3 { font-family: var(--font-display); font-size: 16px; margin: 20px 0 8px; }
  .prob-statement p { color: #bbb; margin-bottom: 12px; }
  .prob-statement code { background: var(--bg3); border: 1px solid var(--border2); padding: 2px 6px; border-radius: 4px; font-family: var(--font-mono); font-size: 12px; color: var(--green); }
  .example-box { background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 16px; margin: 8px 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.6; }

  /* ── VISUALIZER ── */
  .visual-container { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 32px; }
  .vis-title { font-family: var(--font-display); font-size: 16px; font-weight: 600; margin-bottom: 8px; }
  .vis-desc { font-size: 13px; color: var(--muted); margin-bottom: 28px; line-height: 1.5; }
  .array-vis { display: flex; gap: 4px; align-items: flex-end; margin: 20px 0; flex-wrap: wrap; }
  .array-cell { width: 52px; height: 52px; border-radius: 8px; background: var(--bg3); border: 1px solid var(--border2); display: flex; align-items: center; justify-content: center; font-family: var(--font-mono); font-size: 16px; font-weight: 600; transition: all 0.3s; flex-direction: column; gap: 2px; }
  .array-cell.highlight { background: rgba(0,255,135,0.15); border-color: var(--green); color: var(--green); box-shadow: 0 0 12px rgba(0,255,135,0.2); }
  .array-cell.found { background: rgba(129,140,248,0.15); border-color: var(--purple); color: var(--purple); box-shadow: 0 0 12px rgba(129,140,248,0.2); }
  .array-idx { font-size: 10px; font-weight: 400; color: var(--muted); }
  .vis-controls { display: flex; gap: 8px; margin-top: 20px; align-items: center; flex-wrap: wrap; }
  .vis-step { font-family: var(--font-mono); font-size: 12px; color: var(--muted); padding: 8px 14px; background: var(--bg3); border-radius: 6px; border: 1px solid var(--border); }
  .hashmap-vis { display: flex; flex-direction: column; gap: 6px; margin: 16px 0; }
  .hash-row { display: flex; align-items: center; gap: 10px; padding: 8px 14px; background: var(--bg3); border: 1px solid var(--border); border-radius: 7px; font-family: var(--font-mono); font-size: 13px; }
  .hash-key { color: var(--green); } .hash-arrow { color: var(--muted); } .hash-val { color: var(--purple); }

  /* ── ROADMAP ── */
  .roadmap-section { padding-top: 80px; min-height: 100vh; }
  .roadmap-grid { display: flex; flex-direction: column; gap: 24px; }
  .roadmap-level { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
  .roadmap-level-header { padding: 20px 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid var(--border); }
  .level-badge { padding: 4px 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 11px; font-weight: 500; }
  .roadmap-topics { padding: 20px 24px; display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 12px; }
  .topic-card { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 16px; cursor: pointer; transition: all 0.2s; }
  .topic-card:hover { border-color: var(--border2); transform: translateY(-1px); }
  .topic-name { font-weight: 600; font-size: 14px; margin-bottom: 10px; }
  .progress-bar-wrap { background: var(--bg2); border-radius: 3px; height: 4px; margin-bottom: 8px; overflow: hidden; }
  .progress-bar-fill { height: 100%; border-radius: 3px; transition: width 0.5s; }
  .progress-text { font-size: 11px; font-family: var(--font-mono); color: var(--muted); }

  /* ── PLAYGROUND ── */
  .playground-section { padding-top: 80px; min-height: 100vh; }
  .pg-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; height: calc(100vh - 120px); }
  .pg-panel { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column; }
  .pg-header { padding: 12px 16px; border-bottom: 1px solid var(--border); background: var(--bg3); display: flex; align-items: center; justify-content: space-between; }
  .pg-title { font-family: var(--font-mono); font-size: 12px; color: var(--muted); }
  .pg-body { flex: 1; overflow: auto; }
  .pg-editor { width: 100%; height: 100%; min-height: 300px; background: transparent; border: none; outline: none; color: var(--text); font-family: var(--font-mono); font-size: 13px; line-height: 1.7; padding: 20px; resize: none; }
  .pg-output { padding: 20px; font-family: var(--font-mono); font-size: 13px; line-height: 1.7; color: var(--green); white-space: pre-wrap; }
  .pg-output.error { color: #f87171; }

  /* ── DASHBOARD ── */
  .dash-section { padding-top: 80px; min-height: 100vh; }
  .dash-grid { display: grid; grid-template-columns: 240px 1fr; gap: 20px; }
  .dash-sidebar { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 20px; height: fit-content; }
  .dash-avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, var(--green), var(--purple)); display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-size: 24px; font-weight: 700; color: #000; margin-bottom: 12px; }
  .dash-name { font-family: var(--font-display); font-size: 18px; font-weight: 700; }
  .dash-handle { font-size: 12px; color: var(--muted); font-family: var(--font-mono); margin-bottom: 20px; }
  .dash-stat-row { display: flex; gap: 8px; margin-bottom: 20px; }
  .dash-stat-card { flex: 1; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; padding: 10px; text-align: center; }
  .dash-stat-num { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--green); }
  .dash-stat-lbl { font-size: 10px; color: var(--muted); font-family: var(--font-mono); }
  .dash-nav-item { padding: 8px 12px; border-radius: 7px; font-size: 13px; cursor: pointer; color: var(--muted); transition: all 0.15s; display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
  .dash-nav-item:hover, .dash-nav-item.active { color: var(--text); background: var(--bg3); }
  .dash-main { display: flex; flex-direction: column; gap: 16px; }
  .dash-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 24px; }
  .dash-card-title { font-family: var(--font-display); font-size: 16px; font-weight: 600; margin-bottom: 16px; }
  .streak-calendar { display: grid; grid-template-columns: repeat(7, 1fr); gap: 4px; }
  .streak-day { aspect-ratio: 1; border-radius: 3px; background: var(--bg3); transition: all 0.15s; }
  .streak-day.active { background: var(--green); box-shadow: 0 0 4px rgba(0,255,135,0.4); }
  .streak-day.today { background: var(--purple); box-shadow: 0 0 4px rgba(129,140,248,0.4); }
  .solved-list { display: flex; flex-direction: column; gap: 8px; }
  .solved-item { display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--bg3); border: 1px solid var(--border); border-radius: 8px; font-size: 13px; cursor: pointer; }
  .solved-check { color: var(--green); font-size: 14px; }

  /* ── PREMIUM ── */
  .premium-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
  .premium-card { background: var(--bg2); border: 1px solid rgba(251,191,36,0.15); border-radius: 14px; padding: 24px; position: relative; overflow: hidden; }
  .premium-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #fbbf24, var(--purple)); }
  .premium-icon { font-size: 28px; margin-bottom: 12px; }
  .premium-title { font-family: var(--font-display); font-size: 17px; font-weight: 700; margin-bottom: 6px; }
  .premium-desc { font-size: 13px; color: var(--muted); line-height: 1.5; margin-bottom: 20px; }
  .premium-price { font-family: var(--font-mono); font-size: 22px; font-weight: 600; color: #fbbf24; margin-bottom: 16px; }

  /* ── ADMIN ── */
  .admin-section { padding-top: 80px; min-height: 100vh; }
  .admin-grid { display: grid; grid-template-columns: 220px 1fr; gap: 20px; }
  .admin-sidebar { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 16px; height: fit-content; }
  .admin-nav-item { padding: 8px 12px; border-radius: 7px; font-size: 13px; cursor: pointer; color: var(--muted); transition: all 0.15s; display: flex; align-items: center; gap: 8px; margin-bottom: 2px; }
  .admin-nav-item:hover, .admin-nav-item.active { color: var(--text); background: var(--bg3); }
  .admin-card { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 24px; margin-bottom: 16px; }
  .admin-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .admin-table th { text-align: left; padding: 10px 14px; font-family: var(--font-mono); font-size: 11px; color: var(--muted); border-bottom: 1px solid var(--border); letter-spacing: 0.05em; }
  .admin-table td { padding: 12px 14px; border-bottom: 1px solid var(--border); color: var(--text); }
  .admin-table tr:hover td { background: var(--bg3); }
  .admin-stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 20px; }
  .admin-stat { background: var(--bg3); border: 1px solid var(--border); border-radius: 10px; padding: 16px; }
  .admin-stat-num { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--green); }
  .admin-stat-lbl { font-size: 12px; color: var(--muted); font-family: var(--font-mono); margin-top: 2px; }

  /* ── FOOTER ── */
  .footer { border-top: 1px solid var(--border); padding: 32px 0; margin-top: 60px; }
  .footer-inner { display: flex; align-items: center; justify-content: space-between; }
  .footer-text { font-size: 12px; color: var(--muted); }
  .footer-links { display: flex; gap: 20px; }
  .footer-link { font-size: 12px; color: var(--muted); cursor: pointer; transition: color 0.15s; }
  .footer-link:hover { color: var(--text); }

  /* ── ANIMATIONS ── */
  @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  .anim { animation: fadeIn 0.4s ease forwards; }
  .anim-delay-1 { animation-delay: 0.05s; opacity: 0; }
  .anim-delay-2 { animation-delay: 0.1s; opacity: 0; }
  .anim-delay-3 { animation-delay: 0.15s; opacity: 0; }
  .anim-delay-4 { animation-delay: 0.2s; opacity: 0; }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .pg-layout { grid-template-columns: 1fr; }
    .dash-grid, .admin-grid { grid-template-columns: 1fr; }
    .prob-grid { grid-template-columns: 1fr; }
    .admin-stat-grid { grid-template-columns: repeat(2, 1fr); }
    .hero-stats { gap: 20px; }
  }
`;

export default styles;
