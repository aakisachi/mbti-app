// ============================================================
//  16タイプ せいかくラボ — アプリ本体
//  ハッシュルーティング（#/quiz, #/result, #/type/INFP ...）で画面を切り替える
// ============================================================
(function () {
  "use strict";

  var C = TF.core;
  var Q = TF.QUESTIONS;
  var TYPES = TF.TYPES;
  var main = document.getElementById("main");
  var STORE_KEY = "seikaku-lab:v1";
  var THEME_KEY = "seikaku-lab:theme";

  // ============================================================
  //  保存データ
  //  { progress: {answers, idx, done}, result: {type, axes, at},
  //    visits: ["YYYY-MM-DD"], vote: {pref, type}, pendingCompat: "INFP" }
  // ============================================================
  var store = (function () {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
  })();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(store)); } catch (e) {}
  }
  function myType() {
    return store.result && TYPES[store.result.type] ? store.result.type : null;
  }

  // 今日の訪問を記録（スタンプ用）
  (function recordVisit() {
    var today = C.dateKey();
    store.visits = Array.isArray(store.visits) ? store.visits : [];
    if (store.visits.indexOf(today) === -1) {
      store.visits.push(today);
      if (store.visits.length > 400) store.visits = store.visits.slice(-400);
      save();
    }
  })();

  // ============================================================
  //  ユーティリティ
  // ============================================================
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function g(code) { return "g-" + TF.groupOf(code); }
  function animal(code, cls, withLabel) {
    var t = TYPES[code];
    return TF.animalSvg(code, { cls: cls || "animal", title: withLabel ? code + " " + t.nick + "（" + t.animal + "）" : "" });
  }
  function fmt(n) { return Number(n).toLocaleString("ja-JP"); }
  function pct1(n) { return (Math.round(n * 10) / 10).toFixed(1); }
  function jpDate(d) {
    d = d || new Date();
    return (d.getMonth() + 1) + "月" + d.getDate() + "日（" + "日月火水木金土"[d.getDay()] + "）";
  }

  var ICONS = {
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    chevD: '<path d="M6 9l6 6 6-6"/>',
    star: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    warn: '<path d="M12 4l9 16H3z"/><path d="M12 10v4M12 17.5v.5"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z"/>',
    work: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>',
    cloud: '<path d="M7 18a4 4 0 0 1-.5-8A5.5 5.5 0 0 1 17 8.5 4.5 4.5 0 0 1 17 18z"/>',
    sprout: '<path d="M12 21v-9M12 12C12 7 8 5 4 5c0 4 3 7 8 7zM12 14c0-4 3-6 8-6 0 4-3 6-8 6z"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18 14.8c1.8.8 3 2.6 3.5 5.2"/>',
    link: '<path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1"/><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1"/>',
    share: '<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    unlock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 7.5-2"/>',
    refresh: '<path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v4.5h-4.5"/>',
    map: '<path d="M9 4L3 6.5v13.5l6-2.5 6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
    grid: '<rect x="3" y="3" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="3" width="7.5" height="7.5" rx="2"/><rect x="3" y="13.5" width="7.5" height="7.5" rx="2"/><rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    vote: '<path d="M4 13h16v7H4zM8 13V4h8v9"/><path d="M10.5 8l1.2 1.2L14 7"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[name] || "") + "</svg>";
  }
  var X_LOGO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>';
  var LINE_LOGO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.6 2 11c0 3.9 3.5 7.2 8.3 7.9.3.1.8.2.9.5.1.3.1.7 0 1l-.1.9c0 .3-.2 1 .9.5s5.9-3.5 8.1-6C21.4 14.2 22 12.7 22 11c0-4.4-4.5-8-10-8zM8.2 13.4H6.3a.5.5 0 0 1-.5-.5V9.1a.5.5 0 0 1 1 0v3.3h1.4a.5.5 0 0 1 0 1zm2-.5a.5.5 0 0 1-1 0V9.1a.5.5 0 0 1 1 0zm4.6 0a.5.5 0 0 1-.9.3l-2-2.6v2.3a.5.5 0 0 1-1 0V9.1a.5.5 0 0 1 .9-.3l2 2.6V9.1a.5.5 0 0 1 1 0zm3.1-2.4a.5.5 0 0 1 0 1h-1.4v.9h1.4a.5.5 0 0 1 0 1h-1.9a.5.5 0 0 1-.5-.5V9.1c0-.3.2-.5.5-.5h1.9a.5.5 0 0 1 0 1h-1.4v.9z"/></svg>';
  var POD = '<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="rotate(-35 20 20)"><path d="M20 4c6 0 7 8 6.5 16S24 36 20 36s-6-8-6.5-16S14 4 20 4z" fill="#8fce4f" stroke="#2b2118" stroke-width="2.4"/><circle cx="20" cy="12" r="3.6" fill="#b9e58a"/><circle cx="20" cy="20" r="3.8" fill="#b9e58a"/><circle cx="20" cy="28" r="3.6" fill="#b9e58a"/></g></svg>';

  function avatar(who) {
    return '<div class="avatar ' + who + '">' + TF.navArt(who, { face: true, decorative: true }) + "</div>";
  }

  function talk(lines) {
    return '<div class="talk">' + lines.map(function (l) {
      var info = TF.NAV_INFO[l.who];
      return '<div class="talk-row' + (l.who === "metan" ? " right" : "") + '">' +
        avatar(l.who, l.face) +
        '<p class="bubble"><span class="who ' + l.who + '">' + esc(info.name) + "</span>" + esc(l.text) + "</p></div>";
    }).join("") + "</div>";
  }
  function starsHtml(n) {
    var s = "";
    for (var i = 1; i <= 5; i++) s += i <= n ? "★" : '<span class="off">★</span>';
    return '<span class="stars" aria-label="5段階中' + n + '">' + s + "</span>";
  }

  var toastTimer = null;
  function toast(msg) {
    var el = document.getElementById("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove("show"); }, 2600);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }

  // 公開URLの基準（ローカルで開いているときは設定のURLを使う）
  function baseUrl() {
    if (/^https?:$/.test(location.protocol)) return new URL(".", location.href).href;
    return TF.CONFIG.SITE_URL;
  }
  function typeShareUrl(code) { return baseUrl() + "t/" + code.toLowerCase() + ".html"; }
  function appUrl(hash) { return baseUrl() + "index.html" + hash; }
  function hashtags() { return TF.CONFIG.HASHTAGS.map(function (h) { return "#" + h; }).join(" "); }

  // シェアボタン一式
  function shareButtons(text, url, id) {
    var x = "https://x.com/intent/post?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(url);
    var line = "https://line.me/R/share?text=" + encodeURIComponent(text + "\n" + url);
    return '<div class="share-btns">' +
      '<a class="btn btn-x" href="' + esc(x) + '" target="_blank" rel="noopener">' + X_LOGO + "ポスト</a>" +
      '<a class="btn btn-line" href="' + esc(line) + '" target="_blank" rel="noopener">' + LINE_LOGO + "LINE</a>" +
      '<button class="btn" type="button" data-copy="' + esc(url) + '">' + icon("link") + "コピー</button>" +
      '<button class="btn" type="button" data-share="' + esc(id) + '" data-share-text="' + esc(text) + '" data-share-url="' + esc(url) + '">' + icon("share") + "その他</button>" +
      "</div>";
  }

  // ============================================================
  //  ルーター
  // ============================================================
  var current = { path: null };
  var cleanup = [];
  var firstRender = true;
  // キーボードで操作しているか（フォーカス移動の判断に使う）
  var kbMode = false;
  document.addEventListener("keydown", function (e) { if (e.key === "Tab" || /^[1-5]$/.test(e.key) || e.key.indexOf("Arrow") === 0) kbMode = true; });
  document.addEventListener("pointerdown", function () { kbMode = false; });

  function parseHash() {
    var h = location.hash.replace(/^#\/?/, "");
    var qi = h.indexOf("?");
    var path = qi === -1 ? h : h.slice(0, qi);
    var query = new URLSearchParams(qi === -1 ? "" : h.slice(qi + 1));
    var parts = path.split("/").filter(Boolean);
    return { parts: parts, query: query, base: parts[0] || "" };
  }

  function go(hash, replace) {
    if (replace) {
      history.replaceState(null, "", hash);
      route();
    } else {
      location.hash = hash;
    }
  }

  var NAV_OF = { "": "home", quiz: "home", result: "home", type: "types", types: "types", fortune: "fortune", ranking: "ranking", compat: "compat" };

  function route() {
    var r = parseHash();
    cleanup.forEach(function (fn) { try { fn(); } catch (e) {} });
    cleanup = [];

    var samePage = current.path === r.base + "/" + (r.parts[1] || "");
    var prevY = window.scrollY;
    current.path = r.base + "/" + (r.parts[1] || "");

    main.classList.remove("wide");
    var title = "";
    switch (r.base) {
      case "": title = renderHome(); break;
      case "quiz": title = renderQuiz(); break;
      case "result": title = renderResultRoute(); break;
      case "type": title = renderTypeRoute(r.parts[1]); break;
      case "types": title = renderTypes(); break;
      case "fortune": title = renderFortune(r.query); break;
      case "ranking": title = renderRanking(r.query); break;
      case "compat": title = renderCompat(r.query); break;
      case "secrets": title = renderSecrets(); break;
      case "about": title = renderAbout(); break;
      default: go("#/", true); return;
    }
    if (title === null) return; // リダイレクト済み
    document.title = (title ? title + "｜" : "") + TF.CONFIG.SITE_NAME;

    var nav = NAV_OF[r.base];
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      if (a.getAttribute("data-nav") === nav) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });

    if (samePage) {
      window.scrollTo(0, prevY);
    } else {
      window.scrollTo(0, 0);
      // 画面が変わったことをスクリーンリーダーに伝える（初回表示は除く）
      var h1 = main.querySelector("h1");
      if (h1 && !firstRender) {
        h1.setAttribute("tabindex", "-1");
        h1.focus({ preventScroll: true });
      }
    }
    firstRender = false;
  }

  function setView(html, cls) {
    main.innerHTML = '<div class="view ' + (cls || "") + '">' + html + "</div>";
  }

  // ============================================================
  //  ホーム
  // ============================================================
  function stampCard(extraCls) {
    var vs = C.visitStats(store.visits);
    var today = C.dateKey();
    var cells = "";
    for (var i = 6; i >= 0; i--) {
      var key = C.addDays(today, -i);
      var on = !!vs.has[key];
      var d = key.split("-");
      cells += '<li class="stamp' + (on ? " on" : "") + (i === 0 ? " today" : "") + '">' +
        '<span class="s-circle">' + (on ? POD : "") + "</span>" +
        "<span>" + (i === 0 ? "今日" : Number(d[1]) + "/" + Number(d[2])) + "</span></li>";
    }
    var next = TF.SECRETS.filter(function (s) { return s.need > vs.total; })[0];
    var unlocked = TF.SECRETS.filter(function (s) { return s.need <= vs.total; }).length;
    var prevNeed = 0;
    TF.SECRETS.forEach(function (s) { if (s.need <= vs.total) prevNeed = s.need; });
    var progress = next ? Math.round(((vs.total - prevNeed) / (next.need - prevNeed)) * 100) : 100;
    return '<section class="card tile stamp-tile ' + (extraCls || "") + '" aria-labelledby="stampTitle">' +
      '<div class="stamp-head"><h3 id="stampTitle">ずんだスタンプ</h3>' +
      '<span class="streak">' + vs.streak + "日連続 ・ 合計" + vs.total + "日</span></div>" +
      '<ul class="stamps" aria-label="直近7日間の来訪スタンプ">' + cells + "</ul>" +
      (next
        ? '<p>あと<b>' + (next.need - vs.total) + "日</b>来ると、ひみつの会話「" + esc(next.title) + "」が解放されるのだ。</p>" +
          '<div class="meter" aria-hidden="true"><span style="width:' + progress + '%"></span></div>'
        : "<p>すべてのひみつの会話を解放したのだ！</p>") +
      '<a class="text-link small" href="#/secrets">ひみつの会話を見る（' + unlocked + "/" + TF.SECRETS.length + "）</a>" +
      "</section>";
  }

  function marquee() {
    var item = function (c, hidden) {
      return '<a class="mq-item ' + g(c) + '" href="#/type/' + c + '"' + (hidden ? ' tabindex="-1" aria-hidden="true"' : "") + ">" +
        '<span class="mq-face">' + animal(c) + "</span><b>" + c + "</b><span>" + esc(TYPES[c].nick) + "</span></a>";
    };
    return '<nav class="marquee" aria-label="16タイプ一覧">' +
      '<div class="marquee-track">' + TF.TYPE_ORDER.map(function (c) { return item(c, false); }).join("") +
      TF.TYPE_ORDER.map(function (c) { return item(c, true); }).join("") + "</div></nav>";
  }

  function miniMap() {
    var stats = statsCache || C.demoStats();
    return '<div class="mini-map" aria-hidden="true">' + TF.PREFECTURES.map(function (p) {
      var r = C.rankCounts(stats.prefs[p.code]);
      var cls = r.total ? g(r.list[0].type) : "";
      var pos = p.w ? "grid-column:" + (p.x + 1) + " / span " + p.w + ";grid-row:" + (p.y + 1) + " / span " + p.h : "grid-column:" + (p.x + 1) + ";grid-row:" + (p.y + 1);
      return '<i class="' + cls + '" style="' + pos + '"></i>';
    }).join("") + "</div>";
  }

  function renderHome() {
    var p = store.progress;
    var inProgress = p && !p.done && p.answers && p.answers.some(function (a) { return a !== null; });
    var answered = inProgress ? p.answers.filter(function (a) { return a !== null; }).length : 0;
    var mine = myType();
    var today = C.fortune(C.dateKey());
    var top = today[0];
    var myRank = mine ? today.filter(function (f) { return f.type === mine; })[0].rank : null;
    var pairA = mine || "INFP";
    var pairB = TYPES[pairA].best[0].t;
    var pairScore = C.compat(pairA, pairB).score;

    var startBtns = inProgress
      ? '<div class="btn-row"><a class="btn btn-zunda btn-lg" href="#/quiz">続きから（' + answered + "/" + Q.length + "）" + icon("arrowR") + "</a>" +
        '<button class="btn btn-lg" type="button" data-action="restart">最初から</button></div>'
      : '<div class="btn-row"><button class="btn btn-zunda btn-lg" type="button" data-action="restart">' + (mine ? "もう一度診断する" : "診断をはじめる") + icon("arrowR") + "</button>" +
        '<a class="btn btn-lg" href="#/types">16タイプを見る</a></div>';

    var hero = '<section class="hero" aria-labelledby="heroTitle">' +
      '<div class="hero-copy">' +
      '<span class="hero-tag"><span class="dots"><span>' + TF.navArt("zunda", { face: true, decorative: true, eager: true }) + "</span><span>" +
      TF.navArt("metan", { face: true, decorative: true, eager: true }) + "</span></span>ずんだもん × 四国めたん</span>" +
      '<h1 class="hero-title" id="heroTitle">20問で、<br>あなたの<span class="z">タイプ</span>が<br>わかる<span class="m">のだ。</span></h1>' +
      '<p class="hero-lead">直感で答えるだけ。16タイプの中から、あなたにいちばん近いタイプと、相性のいい相手を教えてくれます。</p>' +
      startBtns +
      '<div class="hero-stats"><div><b>20</b><span>質問</span></div><div><b>3</b><span>分くらい</span></div><div><b>16</b><span>タイプ</span></div></div>' +
      "</div>" +
      '<div class="stage" aria-hidden="true">' +
      TF.navArt("zunda", { cls: "chara z", eager: true, decorative: true }) +
      TF.navArt("metan", { cls: "chara m", eager: true, decorative: true }) +
      '<span class="say">ボクたちが案内するのだ！</span></div>' +
      "</section>";

    var myCard = mine
      ? '<a class="card my-type ' + g(mine) + '" href="#/result">' +
        '<div class="disc-sm" style="background:var(--paper)">' + animal(mine) + "</div>" +
        '<div><div class="eyebrow">あなたのタイプ</div><div class="code">' + mine + '</div><div class="nick">' + esc(TYPES[mine].nick) + "</div></div>" +
        icon("arrowR", "arrow") + "</a>"
      : "";

    var podium = today.slice(0, 3).map(function (f) {
      return '<li class="' + g(f.type) + '"><span class="pm-face">' + animal(f.type) + "</span><b>" + f.type + "</b><small>" + f.rank + "位</small></li>";
    }).join("");

    var strip = ["INTJ", "ENTP", "INFJ", "ENFP", "ISTJ", "ESFJ", "ISFP", "ESTP"].map(function (c) {
      return '<span class="' + g(c) + '">' + animal(c) + "</span>";
    }).join("");

    var bento = '<section aria-labelledby="dailyTitle"><div class="h-section"><h2 id="dailyTitle">毎日のおたのしみ</h2></div>' +
      '<div class="bento">' +
      '<a class="card tile fortune" href="#/fortune"><span class="tile-kicker">' + icon("star") + "今日の運勢 ・ 毎日0時に更新</span>" +
      "<h3>今日いちばんツイてるのは<br>" + top.type + "（" + esc(TYPES[top.type].nick) + "）</h3>" +
      "<p>" + (myRank ? "あなたの " + mine + " は今日 <b>" + myRank + "位</b>。ラッキーアイテムもチェック！" : "あなたのタイプは何位？ ラッキーアイテムもチェック！") + "</p>" +
      '<ol class="podium-mini">' + podium + "</ol></a>" +
      '<a class="card tile rank" href="#/ranking"><span class="tile-kicker">' + icon("map") + "県別ランキング</span><h3>あなたの県で<br>多いタイプは？</h3>" + miniMap() + "</a>" +
      '<a class="card tile compat" href="#/compat"><span class="tile-kicker">' + icon("heart") + "相性チェック</span><h3>あの人との<br>相性は？</h3>" +
      '<div class="mini-pair"><span class="' + g(pairA) + '">' + animal(pairA) + '</span><span class="' + g(pairB) + '">' + animal(pairB) + "</span><b>" + pairScore + "%</b></div></a>" +
      stampCard() +
      '<a class="card tile types" href="#/types"><span class="tile-kicker">' + icon("grid") + "16タイプ図鑑</span><h3>16の動物キャラと、くわしい解説</h3>" +
      '<div class="type-strip" aria-hidden="true">' + strip + "</div></a>" +
      "</div></section>";

    main.classList.add("wide");
    setView(hero + '<div class="stack-lg" style="margin-top:var(--s4)">' + marquee() + myCard + bento + "</div>");
    bindCommon();
    return "";
  }

  function restartQuiz() {
    store.progress = { answers: Q.map(function () { return null; }), idx: 0, done: false };
    save();
    go("#/quiz");
  }

  // ============================================================
  //  診断（質問画面）
  // ============================================================
  function renderQuiz() {
    var p = store.progress;
    if (!p || !Array.isArray(p.answers) || p.answers.length !== Q.length) {
      store.progress = p = { answers: Q.map(function () { return null; }), idx: 0, done: false };
      save();
    }
    p.idx = Math.max(0, Math.min(Q.length - 1, p.idx || 0));

    var ticks = Q.map(function () { return "<i></i>"; }).join("");
    setView(
      '<h1 class="sr-only">性格診断の質問</h1>' +
      '<div class="quiz-top">' +
      '<button class="quiz-back" type="button" data-action="prev" aria-label="前の質問にもどる">' + icon("arrowL") + "</button>" +
      '<div style="flex:1;min-width:0"><div class="ticks" role="progressbar" aria-valuemin="0" aria-valuemax="' + Q.length + '" aria-label="回答の進み具合">' + ticks + "</div>" +
      '<div class="quiz-meta"><span class="latin" id="qCount"></span><span id="qLeft"></span></div></div>' +
      "</div>" +
      '<div id="qCard"></div>' +
      '<div class="quiz-guide" id="qGuide" aria-live="polite"></div>' +
      '<p class="kbd-hint"><kbd>1</kbd>〜<kbd>5</kbd> で回答 ・ <kbd>Enter</kbd> で次へ ・ <kbd>←</kbd> で前の質問へ</p>'
    );

    var dir = 0;
    function drawProgress() {
      var answered = p.answers.filter(function (a) { return a !== null; }).length;
      var bar = main.querySelector(".ticks");
      bar.setAttribute("aria-valuenow", String(answered));
      bar.querySelectorAll("i").forEach(function (el, i) {
        el.className = i === p.idx ? "now" : p.answers[i] !== null ? "done" : "";
      });
      document.getElementById("qCount").textContent = "Q" + (p.idx + 1) + " / " + Q.length;
      var leftSec = (Q.length - answered) * 9;
      document.getElementById("qLeft").textContent = answered === Q.length ? "回答完了" : "のこり約" + Math.max(1, Math.ceil(leftSec / 60)) + "分";
    }
    function draw() {
      var q = Q[p.idx];
      drawProgress();
      var cur = p.answers[p.idx];
      var classes = ["l2", "l1", "l0", "lm1", "lm2"];
      var opts = TF.SCALE.map(function (s, i) {
        return '<label class="' + classes[i] + '" title="' + s.label + '">' +
          '<input type="radio" name="q' + p.idx + '" value="' + s.value + '"' + (cur === s.value ? " checked" : "") + ' aria-label="' + s.label + '">' +
          '<span class="dot" aria-hidden="true"></span></label>';
      }).join("");
      var card = document.getElementById("qCard");
      card.innerHTML = '<section class="card q-card ' + (dir < 0 ? "enter-back" : "enter") + '">' +
        '<div class="q-num">QUESTION ' + String(p.idx + 1).padStart(2, "0") + "</div>" +
        '<fieldset><legend class="q-text">' + esc(q.text) + "</legend>" +
        '<div class="likert">' + opts + "</div></fieldset>" +
        '<div class="likert-ends" aria-hidden="true"><span class="a">そう思う</span><span class="d">そう思わない</span></div>' +
        "</section>";
      var line = TF.QUIZ_LINES[p.idx] || TF.QUIZ_LINES[0];
      document.getElementById("qGuide").innerHTML = talk([line]);

      card.querySelectorAll('input[type="radio"]').forEach(function (inp) {
        var v = Number(inp.value);
        // タップ・クリックは回答して次へ。キーボード（矢印・スペース）は選ぶだけで、Enterで次へ。
        inp.addEventListener("click", function () { if (!kbMode) answer(v); });
        inp.addEventListener("change", function () {
          if (kbMode) { p.answers[p.idx] = v; save(); drawProgress(); }
        });
      });
    }

    var busy = false;
    function answer(v) {
      if (busy) return;
      busy = true;
      p.answers[p.idx] = v;
      save();
      var inp = main.querySelector('.likert input[value="' + v + '"]');
      if (inp) inp.checked = true;
      setTimeout(function () {
        busy = false;
        next();
      }, 260);
    }
    function next() {
      if (p.answers[p.idx] === null) { toast("どれかひとつ選んでほしいのだ！"); return; }
      if (p.idx < Q.length - 1) {
        p.idx++;
        dir = 1;
        save();
        draw();
        focusChoice();
      } else {
        finish();
      }
    }
    function prev() {
      if (p.idx === 0) { go("#/"); return; }
      p.idx--;
      dir = -1;
      save();
      draw();
      focusChoice();
    }
    function focusChoice() {
      // キーボード操作中だけ、新しい質問の選択肢へフォーカスを移す
      if (!kbMode) return;
      var sel = main.querySelector(".likert input:checked") || main.querySelector('.likert input[value="0"]');
      if (sel) sel.focus({ preventScroll: true });
    }
    function finish() {
      var miss = p.answers.indexOf(null);
      if (miss !== -1) {
        p.idx = miss;
        save();
        draw();
        toast("まだ答えていない質問があるのだ！");
        return;
      }
      var res = C.computeResult(p.answers);
      store.result = { type: res.type, axes: res.axes, at: Date.now() };
      p.done = true;
      save();
      go("#/result");
    }

    main.querySelector('[data-action="prev"]').addEventListener("click", prev);
    function onKey(e) {
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      var inRadio = e.target && e.target.matches && e.target.matches('input[type="radio"]');
      if (/^[1-5]$/.test(e.key)) { e.preventDefault(); answer(TF.SCALE[Number(e.key) - 1].value); }
      else if (e.key === "Enter" && (inRadio || e.target === document.body)) { e.preventDefault(); next(); }
      else if (inRadio && e.key.indexOf("Arrow") === 0) { return; } // 選択肢の移動はブラウザ標準に任せる
      else if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight" && p.answers[p.idx] !== null) { e.preventDefault(); next(); }
    }
    document.addEventListener("keydown", onKey);
    cleanup.push(function () { document.removeEventListener("keydown", onKey); });
    draw();
    return "診断";
  }

  // ============================================================
  //  結果 / タイプ解説
  // ============================================================
  function renderResultRoute() {
    var mine = myType();
    if (!mine) { go("#/", true); return null; }
    renderTypePage(mine, true);
    return "診断結果 " + mine + " " + TYPES[mine].nick;
  }
  function renderTypeRoute(code) {
    code = String(code || "").toUpperCase();
    if (!TYPES[code]) { go("#/types", true); return null; }
    renderTypePage(code, false);
    return code + " " + TYPES[code].nick;
  }

  function axisBars(axes) {
    return '<div class="axis-list">' + axes.map(function (a) {
      var ax = TF.AXES.filter(function (x) { return x.id === a.id; })[0];
      var leftOn = a.letter === a.left;
      var p = a.pct[a.letter];
      return '<div class="axis-row">' +
        '<div class="axis-title">' + esc(ax.title) + "</div>" +
        '<div class="axis-line">' +
        '<div class="axis-side' + (leftOn ? " on" : "") + '"><b>' + a.left + "</b>" + ax.names[a.left] + "</div>" +
        '<div><div class="axis-track" role="img" aria-label="' + ax.names[a.letter] + "（" + a.letter + "）寄り " + p + '%">' +
        '<span class="axis-fill ' + (leftOn ? "from-left" : "from-right") + '" style="width:' + p + '%"></span></div>' +
        '<div class="axis-pct">' + ax.names[a.letter] + " " + p + "%</div></div>" +
        '<div class="axis-side right' + (!leftOn ? " on" : "") + '"><b>' + a.right + "</b>" + ax.names[a.right] + "</div>" +
        "</div></div>";
    }).join("") + "</div>";
  }

  function infoCard(iconName, title, body, extraCls) {
    return '<section class="card info-card ' + (extraCls || "") + '"><h3><span class="ic">' + icon(iconName) + "</span>" + esc(title) + "</h3>" + body + "</section>";
  }
  function list(items, warn) {
    return '<ul class="dot-list' + (warn ? " warn" : "") + '">' + items.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }

  function voteCard(code) {
    var v = store.vote;
    var opts = TF.PREFECTURES.map(function (p) {
      return '<option value="' + p.code + '"' + (v && v.pref === p.code ? " selected" : "") + ">" + p.name + "</option>";
    }).join("");
    var done = v && v.type === code;
    return '<section class="card" id="voteCard" aria-labelledby="voteTitle">' +
      '<h2 class="sec-title" id="voteTitle">都道府県ランキングに参加</h2>' +
      (done
        ? '<div class="vote-done">' + icon("vote") + "<span>" + esc(TF.prefByCode(v.pref).name) + " の " + code + " として参加中なのだ！</span></div>" +
          '<div class="btn-row" style="margin-top:var(--s4)"><a class="btn btn-zunda btn-sm" href="#/ranking?pref=' + v.pref + '">' + esc(TF.prefByCode(v.pref).name) + "のランキングを見る</a>" +
          '<button class="btn btn-sm" type="button" data-action="vote-change">住んでいる県を変える</button></div>'
        : '<p class="small" style="color:var(--ink-2)">住んでいる都道府県を教えてね。あなたの1票で、県別ランキングが変わるのだ。タイプと都道府県だけを匿名で集計します。</p>' +
          '<div class="vote-row"><label><span class="sr-only">都道府県</span><select class="select" id="votePref"><option value="">都道府県をえらぶ</option>' + opts + "</select></label>" +
          '<button class="btn btn-zunda" type="button" data-action="vote" data-type="' + code + '">参加する</button></div>') +
      "</section>";
  }

  function panelBlock(iconName, title, body) {
    return '<div class="info-card"><h3><span class="ic">' + icon(iconName) + "</span>" + esc(title) + "</h3>" + body + "</div>";
  }

  function renderTypePage(code, isResult) {
    var t = TYPES[code];
    var grp = TF.groupOf(code);
    var mine = myType();
    var res = isResult ? store.result : null;
    var letters = code.split("").map(function (c) { return "<span>" + c + "</span>"; }).join("");

    var pending = "";
    if (isResult && store.pendingCompat && TYPES[store.pendingCompat]) {
      var pc = store.pendingCompat;
      pending = '<a class="card my-type ' + g(pc) + '" href="#/compat?a=' + pc + "&b=" + code + '" style="background:var(--metan-tint)">' +
        '<div class="disc-sm" style="background:var(--paper)">' + animal(pc) + "</div><div><b>友達（" + pc + "）との相性が出たのだ！</b><div class='small muted'>タップして相性を見る</div></div>" + icon("arrowR", "arrow") + "</a>";
    }

    var compatBest = t.best.map(function (b) {
      return '<a class="card compat-card ' + g(b.t) + '" href="#/type/' + b.t + '">' +
        '<div class="disc-sm">' + animal(b.t) + "</div>" +
        '<div><div class="code">' + b.t + '</div><div class="nick">' + esc(TYPES[b.t].nick) + '</div><div class="why">' + esc(b.why) + "</div></div></a>";
    }).join("");
    var compatGood = t.good.map(function (c) {
      return '<a class="card compat-card ' + g(c) + '" href="#/type/' + c + '">' +
        '<div class="disc-sm">' + animal(c) + "</div>" +
        '<div><div class="code">' + c + '</div><div class="nick">' + esc(TYPES[c].nick) + "</div></div></a>";
    }).join("");

    var tabs = [
      { id: "about", label: "特徴", body: '<p class="lead-quote">' + esc(t.title) + "</p><p>" + esc(t.desc) + "</p>" +
        '<div class="info-grid two">' + panelBlock("star", "強み", list(t.strengths)) + panelBlock("warn", "気をつけたいところ", list(t.weak, true)) + "</div>" },
      { id: "life", label: "恋愛・仕事", body: panelBlock("heart", "恋愛・人間関係", "<p>" + esc(t.love) + "</p>") +
        panelBlock("work", "仕事・勉強のスタイル", "<p>" + esc(t.work) + "</p>") +
        panelBlock("compass", "向いている仕事・活動", '<div class="chips">' + t.careers.map(function (c) { return '<span class="chip">' + esc(c) + "</span>"; }).join("") + "</div>") },
      { id: "grow", label: "成長", body: panelBlock("cloud", "ストレスを感じると…", "<p>" + esc(t.stress) + "</p>") + panelBlock("sprout", "成長のヒント", "<p>" + esc(t.growth) + "</p>") },
      { id: "match", label: "相性", body: '<p class="eyebrow">ベストパートナー</p><div class="compat-cards">' + compatBest + "</div>" +
        '<p class="eyebrow" style="margin-top:var(--s2)">なかなか合う</p><div class="compat-mini">' + compatGood + "</div>" }
    ];
    var tabUi = '<section class="card" aria-label="タイプのくわしい解説">' +
      '<div class="seg" role="tablist" aria-label="解説の切り替え">' + tabs.map(function (tb, i) {
        return '<button type="button" role="tab" id="tab-' + tb.id + '" aria-controls="panel-' + tb.id + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' + tb.label + "</button>";
      }).join("") + "</div>" +
      tabs.map(function (tb, i) {
        return '<div class="tab-panel" role="tabpanel" id="panel-' + tb.id + '" aria-labelledby="tab-' + tb.id + '"' + (i ? " hidden" : "") + ">" + tb.body + "</div>";
      }).join("") + "</section>";

    var shareText = isResult
      ? "わたしの性格タイプは【" + code + "｜" + t.nick + "】でした！\n" + t.catch + "\n" + hashtags()
      : "【" + code + "｜" + t.nick + "】" + t.catch + "\n" + hashtags();
    var friendUrl = appUrl("#/compat?a=" + code);

    var html = '' +
      '<div class="' + g(code) + ' stack-lg">' +
      '<article class="dx-card" aria-labelledby="typeTitle">' +
      '<div class="dx-head"><span>' + (isResult ? "あなたの診断結果" : "タイプ解説") + '</span><span class="latin">' + TF.GROUPS[grp].en.toUpperCase() + "</span></div>" +
      '<div class="dx-body">' +
      '<h1 id="typeTitle" class="sr-only">' + code + " " + esc(t.nick) + "</h1>" +
      '<div class="dx-code" aria-hidden="true">' + letters + "</div>" +
      '<div class="dx-nick" aria-hidden="true">' + esc(t.nick) + "</div>" +
      '<p class="dx-catch">「' + esc(t.catch) + "」</p>" +
      '<div class="dx-art">' + animal(code, "animal", true) + "</div>" +
      '<div class="dx-tags"><span class="badge">' + TF.GROUPS[grp].name + "</span>" +
      '<span class="badge soft">' + esc(t.animal) + "タイプ</span>" +
      (!isResult && mine === code ? '<span class="badge soft">あなたのタイプ</span>' : "") + "</div>" +
      "</div>" +
      '<div class="dx-foot">' + TF.navArt("zunda", { face: true, decorative: true }) + "<span>16タイプ せいかくラボ ・ 20問の性格診断</span></div>" +
      "</article>" +
      pending +
      '<section aria-label="ナビゲーターのコメント">' + talk(t.talk) + "</section>" +
      (res ? '<section class="card" aria-labelledby="axisTitle"><h2 class="sec-title" id="axisTitle">あなたの傾き</h2>' + axisBars(res.axes) +
        '<p class="small muted" style="margin-top:var(--s4)">50%に近い指標は、その日の気分で入れ替わることもあります。</p></section>' : "") +
      (res ? '<section class="card" aria-labelledby="shareTitle"><h2 class="sec-title" id="shareTitle">結果をシェアする</h2>' + shareButtons(shareText, typeShareUrl(code), "result") + "</section>" : "") +
      tabUi +
      (res
        ? '<section class="card" aria-labelledby="friendTitle" style="background:var(--metan-tint);border-color:transparent"><h2 class="sec-title" id="friendTitle">友達との相性を診断</h2>' +
          '<p class="small" style="color:var(--ink-2)">このリンクを送ると、友達が診断したあとに、あなたとの相性がわかるのだ。</p>' +
          '<div class="btn-row" style="margin-top:var(--s4)"><button class="btn btn-metan" type="button" data-share="friend" data-share-text="' + esc("わたしは" + code + "だったよ！ 相性を診断してみて！") + '" data-share-url="' + esc(friendUrl) + '">' + icon("users") + "相性診断を送る</button>" +
          '<button class="btn" type="button" data-copy="' + esc(friendUrl) + '">' + icon("link") + "リンクをコピー</button></div></section>" +
          voteCard(code)
        : "") +
      (!isResult
        ? '<section class="card"><h2 class="sec-title">このタイプをシェア</h2>' + shareButtons(shareText, typeShareUrl(code), "type") + "</section>" +
          (mine && mine !== code
            ? '<a class="btn btn-metan btn-block btn-lg" href="#/compat?a=' + mine + "&b=" + code + '">' + icon("heart") + "あなた（" + mine + "）との相性を見る</a>"
            : !mine ? '<button class="btn btn-zunda btn-block btn-lg" type="button" data-action="restart">あなたも診断してみる' + icon("arrowR") + "</button>" : "")
        : "") +
      '<div class="btn-row">' +
      (isResult ? '<button class="btn" type="button" data-action="restart">' + icon("refresh") + "もう一度診断</button>" : "") +
      '<a class="btn" href="#/types">' + icon("grid") + "16タイプ図鑑</a>" +
      '<a class="btn btn-ink" href="#/fortune">' + icon("star") + "今日の運勢</a>" +
      "</div>" +
      "</div>";
    setView(html);
    bindCommon();
    bindTabs();

    // 投票
    var voteBtn = main.querySelector('[data-action="vote"]');
    if (voteBtn) voteBtn.addEventListener("click", function () {
      var sel = document.getElementById("votePref");
      var pref = Number(sel.value);
      if (!pref) { toast("都道府県をえらんでほしいのだ！"); sel.focus(); return; }
      voteBtn.disabled = true;
      TF.stats.submitVote(pref, code).then(function (r) {
        store.vote = { pref: pref, type: code, at: Date.now() };
        save();
        toast(r.demo ? "記録したのだ！（いまはデモ集計なのだ）" : r.ok ? "ランキングに参加したのだ！" : "送信に失敗したのだ…時間をおいて試してね");
        if (!r.ok) voteBtn.disabled = false;
        else route();
      });
    });
    var changeBtn = main.querySelector('[data-action="vote-change"]');
    if (changeBtn) changeBtn.addEventListener("click", function () {
      store.vote = Object.assign({}, store.vote, { type: null });
      save();
      route();
      var sel = document.getElementById("votePref");
      if (sel) sel.focus();
    });
  }

  // タブ（矢印キーで移動できる）
  function bindTabs() {
    var tabs = Array.prototype.slice.call(main.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { select(tab, false); });
      tab.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        else if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === "Home") n = tabs[0];
        else if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  }

  // ============================================================
  //  16タイプ図鑑
  // ============================================================
  function renderTypes() {
    var mine = myType();
    var html = '<div class="page-head"><span class="eyebrow">16 TYPES</span><h1 class="page-title">16タイプ図鑑</h1>' +
      '<p class="page-lead">4つのグループと、16の動物キャラクター。気になるタイプをタップしてね。</p></div>' +
      TF.GROUP_ORDER.map(function (gk) {
        var codes = TF.TYPE_ORDER.filter(function (c) { return TF.groupOf(c) === gk; });
        return '<section class="group-block g-' + gk + '" aria-labelledby="grp-' + gk + '">' +
          '<div class="group-head"><h2 id="grp-' + gk + '">' + TF.GROUPS[gk].name + '</h2><span class="latin">' + TF.GROUPS[gk].en + "</span><p>" + esc(TF.GROUPS[gk].desc) + "</p></div>" +
          '<div class="type-grid">' + codes.map(function (c) {
            var t = TYPES[c];
            return '<a class="card type-card" href="#/type/' + c + '">' +
              (mine === c ? '<span class="badge mine">あなた</span>' : "") +
              '<div class="art">' + animal(c) + "</div>" +
              '<div class="code">' + c + '</div><div class="nick">' + esc(t.nick) + '</div><div class="animal-name">' + esc(t.animal) + "</div></a>";
          }).join("") + "</div></section>";
      }).join("");
    main.classList.add("wide");
    setView(html);
    return "16タイプ図鑑";
  }

  // ============================================================
  //  今日の運勢
  // ============================================================
  function renderFortune() {
    var key = C.dateKey();
    var list = C.fortune(key);
    var mine = myType();
    var mineF = mine ? list.filter(function (f) { return f.type === mine; })[0] : null;

    function item(f) {
      var t = TYPES[f.type];
      var isMine = f.type === mine;
      return '<details class="card f-item ' + g(f.type) + (isMine ? " mine" : "") + '"' + (isMine ? " open" : "") + ' id="f-' + f.type + '">' +
        "<summary>" +
        '<span class="rank-badge" aria-label="' + f.rank + '位">' + f.rank + "</span>" +
        '<div class="disc-sm">' + animal(f.type) + "</div>" +
        '<div class="f-main"><div class="f-code">' + f.type + "<small>" + esc(t.nick) + (isMine ? "（あなた）" : "") + "</small></div>" +
        '<div class="f-head">' + esc(f.headline) + "</div></div>" +
        icon("chevD", "chev") +
        "</summary>" +
        '<div class="f-body">' +
        '<div class="f-stats"><span>総合 ' + starsHtml(f.stars.total) + "</span><span>恋愛 " + starsHtml(f.stars.love) + "</span>" +
        "<span>仕事 " + starsHtml(f.stars.work) + "</span><span>金運 " + starsHtml(f.stars.money) + "</span></div>" +
        '<div class="lucky">' +
        "<div><b>ラッキーアイテム</b>" + esc(f.item) + "</div>" +
        '<div><b>ラッキーカラー</b><span><span class="swatch" style="background:' + f.color.hex + '"></span>' + esc(f.color.name) + "</span></div>" +
        '<div><b>ラッキータイプ</b><a class="text-link" href="#/type/' + f.luckyType + '">' + f.luckyType + "（" + esc(TYPES[f.luckyType].nick) + "）</a></div>" +
        "<div><b>今日のヒント</b>" + esc(f.advice) + "</div>" +
        "</div>" +
        talk([f.comment]) +
        "</div></details>";
    }

    var order = [list[1], list[0], list[2]];
    var podium = '<div class="podium" aria-label="今日のトップ3">' + order.map(function (f) {
      return '<button type="button" class="' + g(f.type) + " r" + f.rank + '" data-open="' + f.type + '" style="all:unset;cursor:pointer;display:grid;justify-items:center;gap:4px">' +
        '<span class="p-face">' + animal(f.type) + "</span>" +
        '<span class="p-step"><span class="p-rank">' + f.rank + '</span><span class="p-code">' + f.type + '</span><span class="p-nick">' + esc(TYPES[f.type].nick) + "</span></span></button>";
    }).join("") + "</div>";

    var head = '<div class="page-head"><span class="eyebrow">DAILY FORTUNE</span><h1 class="page-title">今日の16タイプ運勢</h1>' +
      '<div class="fortune-date"><span class="date">' + jpDate() + '</span><span class="countdown" id="countdown"></span></div></div>';

    var myCard = mineF
      ? '<section class="card my-fortune ' + g(mine) + '" aria-label="あなたの今日の運勢">' +
        '<div style="display:flex;gap:var(--s4);align-items:center">' +
        '<div class="disc-sm" style="width:76px;height:76px;background:var(--paper)">' + animal(mine) + "</div>" +
        '<div><div class="small" style="font-weight:800;color:var(--ink-2)">' + mine + "（" + esc(TYPES[mine].nick) + "）の今日の順位</div>" +
        '<div class="rank-big">' + mineF.rank + "<small>位</small></div></div></div>" +
        '<p style="margin-top:var(--s3);font-weight:800">' + esc(mineF.headline) + "</p>" +
        '<p class="small" style="margin-top:var(--s1);color:var(--ink-2)">ラッキーアイテムは「' + esc(mineF.item) + "」。くわしくは下のリストで。</p>" +
        "</section>"
      : '<section class="card tint" style="display:flex;gap:var(--s3);align-items:center">' + avatar("zunda") +
        '<div style="flex:1"><b>診断すると、あなたの順位がひと目でわかるのだ！</b><div style="margin-top:var(--s2)"><button class="btn btn-sm btn-zunda" type="button" data-action="restart">診断する（約3分）</button></div></div></section>';

    var html = head + '<div class="stack-lg">' + podium + myCard +
      '<section aria-labelledby="allTitle"><div class="h-section"><h2 id="allTitle">16タイプの順位</h2></div><div class="fortune-list">' + list.map(item).join("") + "</div></section>" +
      '<section class="card tint center"><p style="font-weight:800">運勢は毎日0時に更新されるのだ。</p>' +
      '<p class="small muted" style="margin-top:var(--s1)">毎日見に来て、ずんだスタンプを集めると「ひみつの会話」が解放されます。</p>' +
      '<div class="btn-row" style="margin-top:var(--s4);justify-content:center"><a class="btn btn-sm" href="#/secrets">ひみつの会話を見る</a>' +
      '<button class="btn btn-sm" type="button" data-share="fortune" data-share-text="' + esc("今日の16タイプ運勢" + (mineF ? "、" + mine + "は" + mineF.rank + "位だった！" : "ランキング！") + " " + hashtags()) + '" data-share-url="' + esc(appUrl("#/fortune")) + '">' + icon("share") + "シェア</button></div></section>" +
      "</div>";
    setView(html);
    bindCommon();
    main.querySelectorAll("[data-open]").forEach(function (b) {
      b.addEventListener("click", function () {
        var d = document.getElementById("f-" + b.getAttribute("data-open"));
        if (d) { d.open = true; d.scrollIntoView({ behavior: "smooth", block: "center" }); }
      });
    });

    // 次の更新までのカウントダウン（日付が変わったら再描画）
    function tick() {
      var now = new Date();
      if (C.dateKey(now) !== key) { route(); return; }
      var nx = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      var ms = nx - now;
      var hh = Math.floor(ms / 3600000), mm = Math.floor((ms % 3600000) / 60000);
      var el = document.getElementById("countdown");
      if (el) el.innerHTML = "次の更新まで <b>" + hh + "</b>時間<b>" + mm + "</b>分";
    }
    tick();
    var timer = setInterval(tick, 30000);
    cleanup.push(function () { clearInterval(timer); });
    return "今日の運勢";
  }

  // ============================================================
  //  都道府県ランキング
  // ============================================================
  var statsCache = null;
  function withStats(cb) {
    if (statsCache) { cb(statsCache); return; }
    TF.stats.getStats().then(function (s) { statsCache = s; cb(s); });
  }

  function renderRanking(query) {
    var tab = query.get("tab") === "type" ? "type" : "pref";
    var mine = myType();
    var votedPref = store.vote && store.vote.pref;
    var selPref = query.get("pref") === "all" ? "all" : Number(query.get("pref")) || votedPref || 13;
    var selType = TYPES[String(query.get("type") || "").toUpperCase()] ? String(query.get("type")).toUpperCase() : mine || "INFP";

    var head = '<div class="page-head"><span class="eyebrow">PREFECTURE RANKING</span><h1 class="page-title">都道府県タイプランキング</h1>' +
      '<p class="page-lead">あなたの県で多いのは、どのタイプ？ 地図のマスをタップしてね。</p></div>';
    var seg = '<div class="seg" role="group" aria-label="表示の切り替え">' +
      '<button type="button" data-tab="pref" aria-pressed="' + (tab === "pref") + '">県から見る</button>' +
      '<button type="button" data-tab="type" aria-pressed="' + (tab === "type") + '">タイプから見る</button></div>';

    main.classList.add("wide");
    setView(head + '<div class="stack" style="margin-top:14px">' + '<div id="demoFlag"></div>' + seg + '<div id="rankBody"><div class="card center muted">集計データを読み込み中なのだ…</div></div></div>');

    main.querySelectorAll("[data-tab]").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = b.getAttribute("data-tab");
        go("#/ranking?tab=" + t + (t === "type" ? "&type=" + selType : "&pref=" + selPref), true);
      });
    });

    withStats(function (stats) {
      if (!document.getElementById("rankBody")) return; // 画面が変わっていたら何もしない
      if (stats.demo) {
        document.getElementById("demoFlag").innerHTML = '<div class="demo-flag">' + icon("warn") + "<span>" +
          (stats.error ? "集計サーバーに接続できなかったため、" : "") +
          "いまは<b>デモデータ（架空の数値）</b>を表示しています。集計サーバーを設定すると、このサイトで診断した人の投票から本物のランキングを表示します。</span></div>";
      }
      var body = document.getElementById("rankBody");
      body.innerHTML = tab === "pref" ? prefView(stats, selPref) : typeView(stats, selType);
      bindRanking(stats, tab, selPref, selType);
    });
    return "都道府県ランキング";
  }

  function tileMap(stats, opts) {
    // opts.color(pref) -> { cls, style, code }
    var tiles = TF.PREFECTURES.map(function (p) {
      var c = opts.color(p);
      var span = p.w ? "grid-column:" + (p.x + 1) + " / span " + p.w + ";grid-row:" + (p.y + 1) + " / span " + p.h + ";" : "grid-column:" + (p.x + 1) + ";grid-row:" + (p.y + 1) + ";";
      return '<button type="button" class="jtile ' + (c.cls || "") + (p.w ? " big" : "") + (store.vote && store.vote.pref === p.code ? " mine" : "") + '" style="' + span + (c.style || "") + '" data-pref="' + p.code + '" aria-pressed="' + (opts.selected === p.code) + '" aria-label="' + p.name + (c.label ? "：" + c.label : "") + '">' +
        "<span>" + p.short + (c.code ? '<span class="t-code">' + c.code + "</span>" : "") + "</span></button>";
    }).join("");
    return '<div class="map-wrap"><div class="jmap">' + tiles + "</div>" + '<div class="map-legend">' + opts.legend + "</div></div>";
  }

  function rankRows(list, limit, mine) {
    return '<ol class="rank-rows">' + list.slice(0, limit).map(function (x) {
      var max = list[0].pct || 1;
      return '<li class="rank-row ' + g(x.type) + (x.rank <= 3 ? " top" : "") + (x.type === mine ? " mine" : "") + '">' +
        '<span class="rn">' + x.rank + "</span>" +
        '<a class="disc-sm" href="#/type/' + x.type + '" aria-label="' + x.type + 'の解説">' + animal(x.type) + "</a>" +
        '<div><div class="r-label"><span>' + x.type + " " + esc(TYPES[x.type].nick) + (x.type === mine ? "（あなた）" : "") + "</span><small>" + pct1(x.pct) + "%</small></div>" +
        '<div class="r-bar"><span style="width:' + (x.pct / max) * 100 + '%"></span></div></div></li>';
    }).join("") + "</ol>";
  }

  function prefView(stats, selPref) {
    var mine = myType();
    var legend = '<h3>色は、その県で<br>いちばん多いタイプの<br>グループなのだ</h3><div class="legend-items">' +
      TF.GROUP_ORDER.map(function (gk) { return '<span class="g-' + gk + '"><i></i>' + TF.GROUPS[gk].name + "</span>"; }).join("") + "</div>";
    var map = tileMap(stats, {
      selected: selPref,
      legend: legend,
      color: function (p) {
        var r = C.rankCounts(stats.prefs[p.code]);
        if (!r.total) return { cls: "", label: "データなし" };
        var top = r.list[0].type;
        return { cls: g(top), code: top, label: "1位 " + top };
      }
    });

    var title, counts;
    if (selPref === "all") { title = "全国"; counts = C.nationalCounts(stats); }
    else { var pref = TF.prefByCode(selPref) || TF.prefByCode(13); title = pref.name; counts = stats.prefs[pref.code] || {}; }
    var r = C.rankCounts(counts);
    var myRow = mine ? r.list.filter(function (x) { return x.type === mine; })[0] : null;

    var detail = '<section class="card" aria-labelledby="prefTitle" id="prefDetail">' +
      '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap">' +
      '<h2 class="sec-title" id="prefTitle">' + esc(title) + "で多いタイプ</h2>" +
      '<span class="small muted">回答 ' + fmt(r.total) + "人</span></div>" +
      (r.total === 0
        ? '<p class="muted" style="margin-top:12px">まだデータがないのだ。最初の1人になってほしいのだ！</p>'
        : (r.total < 30 ? '<p class="small muted" style="margin-top:6px">※回答数が少ないため参考値です</p>' : "") +
          (myRow ? '<p style="margin:10px 0 4px;font-weight:700">あなたの <b>' + mine + "</b> は " + esc(title) + " で <b>" + myRow.rank + "位</b>（" + pct1(myRow.pct) + "%）</p>" : "") +
          '<div style="margin-top:12px" id="rankList">' + rankRows(r.list, 5, mine) + "</div>" +
          '<div class="btn-row" style="margin-top:14px"><button class="btn btn-sm" type="button" data-action="rank-all">16タイプすべて見る</button></div>') +
      '<div class="btn-row" style="margin-top:10px">' +
      (selPref !== "all" ? '<button class="btn btn-sm btn-ghost" type="button" data-pref-go="all">全国のランキング</button>' : "") +
      '<button class="btn btn-sm btn-ghost" type="button" data-share="pref" data-share-text="' + esc(title + "でいちばん多い性格タイプは " + (r.list[0] ? r.list[0].type : "?") + " ！ " + hashtags()) + '" data-share-url="' + esc(appUrl("#/ranking?pref=" + selPref)) + '">' + icon("share") + "シェア</button></div>" +
      "</section>";

    return '<div class="info-grid two">' +
      '<section class="card" aria-label="都道府県タイル地図">' + map + "</section>" +
      detail + "</div>" + voteCta();
  }

  function typeView(stats, selType) {
    var t = TYPES[selType];
    var nat = C.rankCounts(C.nationalCounts(stats));
    var natRow = nat.list.filter(function (x) { return x.type === selType; })[0];
    var list = C.prefRankingForType(stats, selType);
    var maxPct = list.length ? list[0].pct : 1;
    var minPct = list.length ? list[list.length - 1].pct : 0;

    var picker = '<div class="type-picker" role="group" aria-label="タイプをえらぶ">' + TF.TYPE_ORDER.map(function (c) {
      return '<button type="button" class="' + g(c) + '" data-type-go="' + c + '" aria-pressed="' + (c === selType) + '">' + c + "</button>";
    }).join("") + "</div>";

    var legend = '<h3>' + selType + ' が<br>多い県ほど<br>色が濃いのだ</h3><div class="legend-items"><span>少 <i style="background:var(--surface-2)"></i><i style="background:color-mix(in srgb, var(--g) 50%, var(--paper))"></i><i style="background:var(--g)"></i> 多</span></div>';
    var map = '<div class="' + g(selType) + '">' + tileMap(stats, {
      selected: null,
      legend: legend,
      color: function (p) {
        var item = list.filter(function (x) { return x.pref.code === p.code; })[0];
        if (!item) return { label: "データなし" };
        var k = maxPct === minPct ? 0.5 : (item.pct - minPct) / (maxPct - minPct);
        var mix = Math.round(10 + k * 85);
        return { style: "background:color-mix(in srgb, var(--g) " + mix + "%, var(--paper));", label: pct1(item.pct) + "%" };
      }
    }) + "</div>";

    var rows = '<ol class="rank-rows">' + list.slice(0, 10).map(function (x) {
      return '<li class="rank-row ' + g(selType) + (x.rank <= 3 ? " top" : "") + '">' +
        '<span class="rn">' + x.rank + "</span>" +
        '<span class="disc-sm" style="font-weight:900;font-size:12px">' + esc(x.pref.short) + "</span>" +
        '<div><div class="r-label"><span>' + esc(x.pref.name) + "</span><small>" + pct1(x.pct) + "%</small></div>" +
        '<div class="r-bar"><span style="width:' + (x.pct / (maxPct || 1)) * 100 + '%"></span></div></div></li>';
    }).join("") + "</ol>";

    return '<section class="card">' + picker + "</section>" +
      '<div class="info-grid two" style="margin-top:14px">' +
      '<section class="card" aria-label="' + selType + 'の割合の地図">' + map + "</section>" +
      '<section class="card ' + g(selType) + '" aria-labelledby="typeRankTitle">' +
      '<div style="display:flex;gap:12px;align-items:center;margin-bottom:12px"><div class="disc-sm">' + animal(selType) + "</div>" +
      '<div><h2 id="typeRankTitle" style="font-size:18px">' + selType + "（" + esc(t.nick) + "）が多い県</h2>" +
      '<p class="small muted">全国平均 ' + (natRow ? pct1(natRow.pct) : "0.0") + "%</p></div></div>" +
      (list.length ? rows : '<p class="muted">まだデータがないのだ。</p>') +
      "</section></div>" + voteCta();
  }

  function voteCta() {
    var mine = myType();
    if (store.vote && store.vote.type) return "";
    if (mine) {
      return '<section class="card" style="background:var(--metan-tint);margin-top:14px;display:flex;gap:12px;align-items:center">' + avatar("metan", "smile") +
        '<div style="flex:1"><b>あなたの1票で、ランキングが変わるわよ。</b><div style="margin-top:8px"><a class="btn btn-sm btn-metan" href="#/result">結果ページから参加する</a></div></div></section>';
    }
    return '<section class="card" style="background:var(--zunda-tint);margin-top:14px;display:flex;gap:12px;align-items:center">' + avatar("zunda", "happy") +
      '<div style="flex:1"><b>診断すると、ランキングに参加できるのだ！</b><div style="margin-top:8px"><button class="btn btn-sm btn-metan" type="button" data-action="restart">診断する（約3分）</button></div></div></section>';
  }

  function bindRanking(stats, tab, selPref, selType) {
    bindCommon();
    main.querySelectorAll("[data-pref]").forEach(function (b) {
      b.addEventListener("click", function () {
        var code = Number(b.getAttribute("data-pref"));
        if (tab === "type") { go("#/ranking?pref=" + code, false); return; }
        go("#/ranking?pref=" + code, true);
        var d = document.getElementById("prefDetail");
        if (d && window.matchMedia("(max-width: 639px)").matches) d.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    main.querySelectorAll("[data-pref-go]").forEach(function (b) {
      b.addEventListener("click", function () { go("#/ranking?pref=" + b.getAttribute("data-pref-go"), true); });
    });
    main.querySelectorAll("[data-type-go]").forEach(function (b) {
      b.addEventListener("click", function () { go("#/ranking?tab=type&type=" + b.getAttribute("data-type-go"), true); });
    });
    var all = main.querySelector('[data-action="rank-all"]');
    if (all) all.addEventListener("click", function () {
      var counts = selPref === "all" ? C.nationalCounts(stats) : stats.prefs[selPref] || {};
      document.getElementById("rankList").innerHTML = rankRows(C.rankCounts(counts).list, 16, myType());
      all.remove();
    });
  }

  // ============================================================
  //  相性チェック
  // ============================================================
  var COMPAT_TALK = {
    best: [{ who: "zunda", face: "surprise", text: "これは…運命級の相性なのだ！！" }, { who: "metan", face: "smile", text: "お互いの足りないところを、自然に補い合えるペアね。" }],
    good: [{ who: "zunda", face: "happy", text: "とっても良い相性なのだ！" }, { who: "metan", face: "smile", text: "一緒にいると、肩の力が抜ける関係になれそうね。" }],
    same: [{ who: "zunda", face: "happy", text: "同じタイプどうし！ 言わなくても通じ合えるのだ。" }, { who: "metan", face: "normal", text: "ただし、苦手なところも同じだから、ふたりで気をつけて。" }],
    normal: [{ who: "zunda", face: "normal", text: "ほどよい距離感で、長く付き合えるふたりなのだ。" }, { who: "metan", face: "smile", text: "違いを面白がれたら、ぐっと仲が深まるわよ。" }],
    spice: [{ who: "zunda", face: "think", text: "考え方がけっこう違うふたりなのだ…！" }, { who: "metan", face: "smile", text: "だからこそ、新しい世界を見せ合える刺激的な関係よ。" }]
  };

  function renderCompat(query) {
    var mine = myType();
    var a = String(query.get("a") || "").toUpperCase();
    var b = String(query.get("b") || "").toUpperCase();
    // 友達から届いたリンク（?a=XXXX だけ）で、まだ診断していない人には案内を出す
    var invited = !!TYPES[a] && !TYPES[b] && !mine;
    if (!TYPES[a]) a = mine || "INFP";
    if (!TYPES[b]) b = mine && mine !== a ? mine : (invited ? null : "ENTJ");
    if (store.pendingCompat && store.pendingCompat === a && b === mine) {
      store.pendingCompat = null; // 相性を見たので「届いた相性」の案内は消す
      save();
    }

    var options = function (sel) {
      return TF.TYPE_ORDER.map(function (c) {
        return '<option value="' + c + '"' + (c === sel ? " selected" : "") + ">" + c + " " + TYPES[c].nick + "</option>";
      }).join("");
    };
    var slot = function (id, code, label) {
      return '<div class="compat-slot' + (code ? " " + g(code) : "") + '">' +
        '<div class="art">' + (code ? animal(code) : '<span class="latin" style="font-size:2.4rem;font-weight:700;color:var(--ink-3)">?</span>') + "</div>" +
        '<label><span class="sr-only">' + label + '</span><select class="select" id="' + id + '">' + (code ? "" : '<option value="">えらぶ</option>') + options(code) + "</select></label></div>";
    };

    var html = '<div class="page-head"><span class="eyebrow">COMPATIBILITY</span><h1 class="page-title">相性チェック</h1>' +
      '<p class="page-lead">ふたりのタイプを選ぶと、ずんだもんとめたんが相性を判定するのだ。</p></div>' +
      '<div class="stack">';

    if (invited) {
      html += '<section class="card" style="background:var(--metan-tint);border-color:transparent">' +
        talk([{ who: "metan", face: "smile", text: "友達（" + a + "）から相性診断が届いているわよ。" }, { who: "zunda", face: "happy", text: "あなたのタイプを選ぶか、まだの人は診断してほしいのだ！" }]) +
        '<div class="btn-row" style="margin-top:var(--s4)"><button class="btn btn-zunda" type="button" data-action="compat-diagnose" data-a="' + a + '">診断して相性を見る' + icon("arrowR") + "</button></div></section>";
    }

    html += '<section class="card"><div class="compat-pick">' + slot("compatA", a, "1人目のタイプ") + '<span class="compat-x" aria-hidden="true">×</span>' + slot("compatB", b, "2人目のタイプ") + "</div></section>";

    if (a && b) {
      var r = C.compat(a, b);
      var lv = TF.COMPAT_LEVELS[r.level];
      var url = appUrl("#/compat?a=" + a + "&b=" + b);
      html += '<section class="card center score" aria-labelledby="compatResult">' +
        '<div class="score-ring" style="--p:' + r.score + '" role="img" aria-label="相性 ' + r.score + '%"><div><span><small>相性</small><b>' + r.score + "</b><small>%</small></span></div></div>" +
        '<h2 id="compatResult">' + esc(lv.label) + "</h2>" +
        (r.why ? '<p style="color:var(--ink-2)">' + esc(r.why) + "</p>" : "") +
        "</section>" +
        '<section class="card"><h2 class="sec-title">4つの指標で見ると…</h2><div class="axis-notes">' +
        r.axes.map(function (n) {
          return '<div class="axis-note"><span class="tag ' + (n.same ? "same" : "diff") + '">' + (n.same ? "同じ" : "ちがう") + "</span><div><b>" + esc(n.title) + "</b><br>" + esc(n.text) + "</div></div>";
        }).join("") + "</div></section>" +
        "<section>" + talk(COMPAT_TALK[r.level]) + "</section>" +
        '<section class="card"><h2 class="sec-title">この相性をシェア</h2>' +
        shareButtons(a + "（" + TYPES[a].nick + "）× " + b + "（" + TYPES[b].nick + "）の相性は " + r.score + "%！ " + hashtags(), url, "compat") + "</section>";
    }

    if (mine) {
      var friendUrl = appUrl("#/compat?a=" + mine);
      html += '<section class="card" style="background:var(--zunda-tint);border-color:transparent"><h2 class="sec-title">友達に相性診断を送る</h2>' +
        '<p class="small" style="color:var(--ink-2)">リンクを開いた友達が診断すると、あなた（' + mine + "）との相性が表示されるのだ！</p>" +
        '<div class="btn-row" style="margin-top:var(--s4)"><button class="btn btn-zunda" type="button" data-share="friend" data-share-text="' + esc("わたしは" + mine + "だったよ！ 相性を診断してみて！") + '" data-share-url="' + esc(friendUrl) + '">' + icon("users") + "送る</button>" +
        '<button class="btn" type="button" data-copy="' + esc(friendUrl) + '">' + icon("link") + "リンクをコピー</button></div></section>";
    }
    html += "</div>";
    setView(html);
    bindCommon();

    ["compatA", "compatB"].forEach(function (id) {
      document.getElementById(id).addEventListener("change", function () {
        var va = document.getElementById("compatA").value;
        var vb = document.getElementById("compatB").value;
        go("#/compat?a=" + va + (vb ? "&b=" + vb : ""), true);
      });
    });
    var diag = main.querySelector('[data-action="compat-diagnose"]');
    if (diag) diag.addEventListener("click", function () {
      store.pendingCompat = diag.getAttribute("data-a");
      save();
      restartQuiz();
    });
    return "相性チェック";
  }

  // ============================================================
  //  ひみつの会話
  // ============================================================
  function renderSecrets() {
    var vs = C.visitStats(store.visits);
    var html = '<div class="page-head"><span class="eyebrow">SECRET TALKS</span><h1 class="page-title">ひみつの会話</h1>' +
      '<p class="page-lead">サイトに来た日数（合計 <b>' + vs.total + "日</b>）に応じて、ずんだもんとめたんの会話が解放されるのだ。</p></div>" +
      '<div class="stack">' + stampCard() +
      TF.SECRETS.map(function (s, i) {
        var open = s.need <= vs.total;
        if (!open) {
          return '<div class="card secret locked"><div class="row">' + icon("lock", "lock") +
            "<span>？？？</span><span class=\"need\">あと" + (s.need - vs.total) + "日で解放</span></div></div>";
        }
        return '<details class="card secret"' + (i === 0 ? " open" : "") + "><summary>" + icon("unlock", "lock") + "<span>" + esc(s.title) + '</span><span class="need">' + s.need + "日目</span></summary>" +
          '<div class="s-body">' + talk(s.talk) + "</div></details>";
      }).join("") + "</div>";
    setView(html);
    return "ひみつの会話";
  }

  // ============================================================
  //  この診断について
  // ============================================================
  function renderAbout() {
    var html = '<div class="page-head"><span class="eyebrow">ABOUT</span><h1 class="page-title">この診断について</h1></div>' +
      '<div class="stack-lg">' +
      '<div class="nav-duo">' +
      '<figure>' + TF.navArt("zunda", {}) + '<figcaption>ずんだもん</figcaption></figure>' +
      '<figure class="metan">' + TF.navArt("metan", {}) + '<figcaption>四国めたん</figcaption></figure></div>' +
      '<section class="card prose"><h2 class="sec-title">どんな診断？</h2>' +
      "<p>「外向／内向」など4つの指標それぞれについて、あなたがどちら寄りかを20問の回答から計算し、16タイプのどれに近いかを判定します。</p>" +
      "<p>各指標は5問ずつ。「とてもそう思う」〜「まったくそう思わない」の5段階の回答を点数にして、どちらにどれくらい傾いているかを％で表示しています。</p></section>" +
      '<section><h2 class="sec-title">4つの指標</h2><div class="axis-explain">' +
      TF.AXES.map(function (ax) {
        return '<div class="card"><b>' + esc(ax.title) + '</b><div class="pair">' +
          [ax.left, ax.right].map(function (l) {
            return '<div class="pole"><b><span>' + l + "</span>" + ax.names[l] + "</b>" + esc(ax.desc[l]) + "</div>";
          }).join("") + "</div></div>";
      }).join("") + "</div></section>" +
      '<section class="card prose"><h2 class="sec-title">4つのグループ</h2>' +
      TF.GROUP_ORDER.map(function (gk) { return '<p class="g-' + gk + '"><b style="color:var(--g-ink)">' + TF.GROUPS[gk].name + "</b>：" + esc(TF.GROUPS[gk].desc) + "</p>"; }).join("") + "</section>" +
      '<section class="card prose"><h2 class="sec-title">ご注意</h2>' +
      "<p>この診断はエンターテインメントを目的とした非公式のものです。結果はあなたの性格の一面を切り取ったもので、能力や適性を決めつけるものではありません。</p>" +
      "<p>MBTI<sup>®</sup>は The Myers-Briggs Company の登録商標です。本サイトは同社および公式のMBTI検査とは関係ありません。タイプ名・キャラクター・解説文はすべて本サイトのオリジナルです。</p>" +
      "<p>都道府県ランキングは、このサイトで診断した人の任意の投票をもとにした集計です。回答者の偏りがあるため、統計的に正確な分布ではありません。</p></section>" +
      '<section class="card"><h2 class="sec-title">ナビゲーター</h2>' +
      talk([
        { who: "zunda", face: "happy", text: "ずんだもんなのだ！ ずんだ餅の妖精なのだ。" },
        { who: "metan", face: "smile", text: "四国めたんよ。この子のお目付け役ってところね。" }
      ]) +
      '<p class="small muted" style="margin-top:var(--s4)">ずんだもん・四国めたん © <a class="text-link" href="https://zunko.jp/guideline.html" target="_blank" rel="noopener">東北ずん子・ずんだもんプロジェクト</a>（SSS合同会社）。キャラクター利用ガイドラインに基づいて使用しており、公式のサービスではありません。</p></section>' +
      '<div class="btn-row"><button class="btn btn-zunda btn-lg" type="button" data-action="restart">診断をはじめる' + icon("arrowR") + "</button></div>" +
      "</div>";
    setView(html);
    bindCommon();
    return "この診断について";
  }

  // ============================================================
  //  共通のボタン動作
  // ============================================================
  function bindCommon() {
    main.querySelectorAll('[data-action="restart"]').forEach(function (b) {
      b.addEventListener("click", restartQuiz);
    });
    main.querySelectorAll("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        copyText(b.getAttribute("data-copy")).then(function (ok) {
          toast(ok ? "リンクをコピーしたのだ！" : "コピーできなかったのだ…");
        });
      });
    });
    main.querySelectorAll("[data-share]").forEach(function (b) {
      b.addEventListener("click", function () {
        var text = b.getAttribute("data-share-text");
        var url = b.getAttribute("data-share-url");
        if (navigator.share) {
          navigator.share({ title: TF.CONFIG.SITE_NAME, text: text, url: url }).catch(function () {});
        } else {
          copyText(text + "\n" + url).then(function (ok) {
            toast(ok ? "シェア用の文章をコピーしたのだ！" : "コピーできなかったのだ…");
          });
        }
      });
    });
  }

  // ============================================================
  //  テーマ切り替え
  // ============================================================
  function currentTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function syncThemeBtn() {
    var btn = document.getElementById("themeBtn");
    btn.setAttribute("aria-label", currentTheme() === "dark" ? "ライトモードに切り替え" : "ダークモードに切り替え");
  }
  document.getElementById("themeBtn").addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    syncThemeBtn();
  });
  syncThemeBtn();

  // ============================================================
  //  起動
  // ============================================================
  // 旧URL・シェアページからの ?type=INFP を解説ページへ
  (function legacyRedirect() {
    var params = new URLSearchParams(location.search);
    var t = String(params.get("type") || "").toUpperCase();
    if (TYPES[t] && !location.hash) history.replaceState(null, "", location.pathname + "#/type/" + t);
  })();
  try { localStorage.removeItem("mbti_state"); } catch (e) {} // 旧バージョンの保存データを掃除

  window.addEventListener("hashchange", route);
  route();
})();
