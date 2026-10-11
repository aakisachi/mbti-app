// ============================================================
//  都道府県ランキングの集計サーバーとのやりとり
//  TF.CONFIG.STATS_ENDPOINT（Google Apps Script のURL）が空ならデモデータを使う
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

(function () {
  var CACHE_KEY = "seikaku-lab:stats-cache";
  var CACHE_MS = 5 * 60 * 1000;

  function endpoint() {
    return (TF.CONFIG && TF.CONFIG.STATS_ENDPOINT) || "";
  }

  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var c = JSON.parse(raw);
      if (Date.now() - c.at > CACHE_MS) return null;
      return c.data;
    } catch (e) { return null; }
  }
  function writeCache(data) {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data: data })); } catch (e) {}
  }

  // サーバーの返す形を検証して、使える形に整える
  function normalize(json) {
    if (!json || typeof json !== "object" || !json.prefs) throw new Error("invalid stats");
    var prefs = {};
    Object.keys(json.prefs).forEach(function (code) {
      var src = json.prefs[code] || {};
      var row = {};
      TF.TYPE_ORDER.forEach(function (t) {
        var n = Number(src[t]);
        row[t] = isFinite(n) && n > 0 ? Math.floor(n) : 0;
      });
      prefs[code] = row;
    });
    return { demo: false, updatedAt: json.updatedAt || null, prefs: prefs };
  }

  /**
   * 集計データを取得する。失敗したらデモデータにフォールバック。
   * @returns {Promise<{demo:boolean, error?:boolean, updatedAt, prefs}>}
   */
  function getStats() {
    var url = endpoint();
    if (!url) return Promise.resolve(TF.core.demoStats());
    var cached = readCache();
    if (cached) return Promise.resolve(cached);
    return fetch(url, { method: "GET", cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(function (json) {
        var data = normalize(json);
        writeCache(data);
        return data;
      })
      .catch(function () {
        var demo = TF.core.demoStats();
        demo.error = true;
        return demo;
      });
  }

  // 端末ごとのランダムID（同じ端末からの投票は上書きされる）
  function deviceId() {
    var key = "seikaku-lab:device";
    try {
      var id = localStorage.getItem(key);
      if (!id) {
        id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(16).slice(2));
        localStorage.setItem(key, id);
      }
      return id;
    } catch (e) {
      return "anon-" + Math.random().toString(16).slice(2);
    }
  }

  /**
   * 投票を送る。サーバー未設定なら端末内に記録するだけ。
   */
  function submitVote(prefCode, type) {
    var url = endpoint();
    try { sessionStorage.removeItem(CACHE_KEY); } catch (e) {}
    if (!url) return Promise.resolve({ ok: true, demo: true });
    var body = JSON.stringify({ id: deviceId(), pref: Number(prefCode), type: type });
    // text/plain で送るとプリフライトが発生しない（Apps Script 向け）
    return fetch(url, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: body })
      .then(function () { return { ok: true, demo: false }; })
      .catch(function () { return { ok: false, demo: false }; });
  }

  TF.stats = { getStats: getStats, submitVote: submitVote, isLive: function () { return !!endpoint(); } };
})();
