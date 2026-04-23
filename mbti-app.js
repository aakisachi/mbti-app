// ============== MBTI Quiz App ==============
(() => {
  const Q = window.MBTI_QUESTIONS;
  const T = window.MBTI_TYPES;
  const C = window.MBTI_CHARS;

  const $ = (id) => document.getElementById(id);
  const screens = {
    start: $("screen-start"),
    question: $("screen-question"),
    result: $("screen-result"),
    detail: $("screen-detail")
  };

  const state = {
    idx: 0,
    answers: [],
    type: null,
    screen: "start",
    history: []
  };

  // ---------- navigation ----------
  function show(name, push = true) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    if (push && state.screen !== name) state.history.push(state.screen);
    state.screen = name;
    $("backBtn").style.visibility = (name === "start") ? "hidden" : "visible";
    window.scrollTo({ top: 0, behavior: "smooth" });
    persist();
  }

  function goBack() {
    if (state.screen === "question" && state.idx > 0) {
      state.idx--;
      state.answers.pop();
      renderQuestion();
      return;
    }
    const prev = state.history.pop();
    if (prev) {
      state.screen = prev;
      Object.values(screens).forEach((s) => s.classList.remove("active"));
      screens[prev].classList.add("active");
      $("backBtn").style.visibility = (prev === "start") ? "hidden" : "visible";
    } else {
      show("start", false);
    }
  }

  // ---------- questions ----------
  function renderQuestion() {
    const q = Q[state.idx];
    $("qNumber").textContent = `QUESTION ${String(state.idx + 1).padStart(2, "0")}`;
    $("qTitle").textContent = q.title;
    const pct = ((state.idx) / Q.length) * 100;
    $("progFill").style.width = pct + "%";
    $("progText").textContent = `${state.idx + 1} / ${Q.length}`;

    const wrap = $("choices");
    wrap.innerHTML = "";
    q.choices.forEach((c, i) => {
      const btn = document.createElement("button");
      btn.className = "choice";
      btn.style.animationDelay = (0.08 * i) + "s";
      btn.innerHTML = `
        <div class="choice-icon">${c.icon}</div>
        <div class="choice-text">
          <b>${c.label}</b>
          <small>${c.sub}</small>
        </div>
      `;
      btn.addEventListener("click", () => answer(c.value, btn));
      wrap.appendChild(btn);
    });
  }

  function answer(value, btn) {
    // highlight briefly
    btn.classList.add("selected");
    setTimeout(() => {
      state.answers.push(value);
      state.idx++;
      if (state.idx < Q.length) {
        renderQuestion();
        // fill progress to current
        const pct = (state.idx / Q.length) * 100;
        $("progFill").style.width = pct + "%";
      } else {
        finish();
      }
      persist();
    }, 220);
  }

  function finish() {
    const type = state.answers.join("");
    state.type = type;
    renderResult(type);
    show("result");
  }

  // ---------- result ----------
  function renderResult(type) {
    const t = T[type];
    if (!t) { return; }
    $("resType").textContent = type;
    $("resNick").textContent = t.nick;
    $("resCatch").textContent = t.catch;
    $("charSvg").innerHTML = C[type] || "";
    // type color accent
    document.documentElement.style.setProperty("--accent-e", t.color);
    // axes
    const axisMeta = [
      { i: 0, a: ["E","外向 Extraverted"], b: ["I","内向 Introverted"] },
      { i: 1, a: ["S","感覚 Sensing"], b: ["N","直感 Intuition"] },
      { i: 2, a: ["T","思考 Thinking"], b: ["F","感情 Feeling"] },
      { i: 3, a: ["J","判断 Judging"], b: ["P","知覚 Perceiving"] },
    ];
    const wrap = $("axes");
    wrap.innerHTML = "";
    axisMeta.forEach((m) => {
      const letter = type[m.i];
      const chosen = (letter === m.a[0]) ? m.a : m.b;
      const other = (letter === m.a[0]) ? m.b : m.a;
      const el = document.createElement("div");
      el.className = "axis";
      el.innerHTML = `
        <div class="axis-pill">${letter}</div>
        <div class="axis-label">
          <b>${chosen[1].split(" ")[0]}</b>
          <span>${chosen[1].split(" ")[1] || ""} · not ${other[1].split(" ")[0]}</span>
        </div>
      `;
      wrap.appendChild(el);
    });
  }

  // ---------- detail ----------
  function renderDetail(type) {
    const t = T[type];
    if (!t) return;
    $("miniChar").innerHTML = C[type] || "";
    $("detType").textContent = `${type} · ${t.nick}`;
    $("detTitle").textContent = t.title;
    $("detDesc").textContent = t.desc;

    const fill = (id, list) => {
      const ul = $(id);
      ul.innerHTML = "";
      list.forEach((x) => {
        const li = document.createElement("li");
        li.textContent = x;
        ul.appendChild(li);
      });
    };
    fill("detStrengths", t.strengths);
    fill("detWeak", t.weak);
    fill("detCareer", t.career);

    const cg = $("detCompat");
    cg.innerHTML = "";
    t.compat.forEach((c) => {
      const cell = document.createElement("div");
      cell.className = `compat-cell ${c.r}`;
      cell.innerHTML = `${c.t}<small>${c.r === "good" ? "とても合う" : "なかなか合う"}</small>`;
      cg.appendChild(cell);
    });
  }

  // ---------- buttons ----------
  $("startBtn").addEventListener("click", () => {
    state.idx = 0;
    state.answers = [];
    renderQuestion();
    show("question");
  });
  $("retryBtn").addEventListener("click", () => {
    state.idx = 0;
    state.answers = [];
    state.type = null;
    state.history = [];
    renderQuestion();
    show("question", false);
  });
  $("detailBtn").addEventListener("click", () => {
    renderDetail(state.type);
    show("detail");
  });
  $("backToResult").addEventListener("click", () => {
    show("result", false);
  });
  $("restartBtn").addEventListener("click", () => {
    state.idx = 0;
    state.answers = [];
    state.type = null;
    state.history = [];
    show("start", false);
  });
  $("backBtn").addEventListener("click", goBack);

  // ---------- persistence ----------
  function persist() {
    try {
      localStorage.setItem("mbti_state", JSON.stringify({
        idx: state.idx, answers: state.answers,
        type: state.type, screen: state.screen
      }));
    } catch {}
  }
  function restore() {
    try {
      const raw = localStorage.getItem("mbti_state");
      if (!raw) return;
      const s = JSON.parse(raw);
      if (!s || !s.screen) return;
      state.idx = s.idx || 0;
      state.answers = s.answers || [];
      state.type = s.type || null;
      if (s.screen === "question" && state.idx < Q.length) {
        renderQuestion();
        show("question", false);
      } else if (s.screen === "result" && state.type) {
        renderResult(state.type);
        show("result", false);
      } else if (s.screen === "detail" && state.type) {
        renderResult(state.type);
        renderDetail(state.type);
        show("detail", false);
      }
    } catch {}
  }

  // ---------- Tweaks ----------
  const defaults = JSON.parse(
    document.getElementById("tweak-defaults").textContent
      .replace(/\/\*EDITMODE-(BEGIN|END)\*\//g, "")
      .trim()
  );
  const tweakEl = $("tweaks");
  const ACCENTS = [
    { name: "朱 (orange)", v: "#e87a4a" },
    { name: "青 (blue)", v: "#5a8bb0" },
    { name: "緑 (green)", v: "#8aa85c" },
    { name: "紫 (purple)", v: "#a56ab3" },
    { name: "黄 (yellow)", v: "#c9a13a" },
    { name: "墨 (ink)", v: "#2a2418" }
  ];
  const FONTS = {
    maru: '"Hiragino Maru Gothic ProN", "Rounded Mplus 1c", "Yu Gothic", system-ui, sans-serif',
    yu: '"Yu Gothic", "Hiragino Sans", system-ui, sans-serif',
    mincho: '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
    mono: 'ui-monospace, "SFMono-Regular", Menlo, monospace'
  };

  function applyTweaks(t) {
    document.documentElement.style.setProperty("--accent-e", t.accent);
    document.body.style.fontFamily = FONTS[t.fontFamily] || FONTS.maru;
    // reflect in UI
    document.querySelectorAll("#accentSwatches .swatch").forEach((s) => {
      s.classList.toggle("active", s.dataset.v === t.accent);
    });
    const fs = $("fontSelect");
    if (fs) fs.value = t.fontFamily;
  }

  function buildTweaks() {
    const sw = $("accentSwatches");
    sw.innerHTML = "";
    ACCENTS.forEach((a) => {
      const el = document.createElement("div");
      el.className = "swatch";
      el.style.background = a.v;
      el.dataset.v = a.v;
      el.title = a.name;
      el.addEventListener("click", () => {
        defaults.accent = a.v;
        applyTweaks(defaults);
        pushEdits({ accent: a.v });
      });
      sw.appendChild(el);
    });
    $("fontSelect").addEventListener("change", (e) => {
      defaults.fontFamily = e.target.value;
      applyTweaks(defaults);
      pushEdits({ fontFamily: e.target.value });
    });
    // force-type dropdown for preview
    const ft = $("forceType");
    (window.MBTI_TYPE_ORDER || []).forEach((t) => {
      const o = document.createElement("option");
      o.value = t; o.textContent = `${t} ${T[t].nick}`;
      ft.appendChild(o);
    });
    ft.addEventListener("change", (e) => {
      if (!e.target.value) return;
      state.type = e.target.value;
      state.answers = e.target.value.split("");
      renderResult(state.type);
      renderDetail(state.type);
      show("result");
    });
  }

  function pushEdits(edits) {
    try { window.parent.postMessage({ type: "__edit_mode_set_keys", edits }, "*"); } catch {}
  }

  // Edit-mode protocol
  window.addEventListener("message", (e) => {
    const d = e.data || {};
    if (d.type === "__activate_edit_mode") tweakEl.classList.add("open");
    if (d.type === "__deactivate_edit_mode") tweakEl.classList.remove("open");
  });

  buildTweaks();
  applyTweaks(defaults);

  try { window.parent.postMessage({ type: "__edit_mode_available" }, "*"); } catch {}

  // init
  restore();
  if (state.screen === "start") renderQuestion(); // prepare
})();
