// ============================================================
//  画面に依存しないロジック（Node のテストからも読み込めます）
//  - 診断スコアの計算
//  - 相性スコア
//  - 日替わり運勢
//  - 訪問スタンプ
//  - 都道府県データの集計
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

(function () {
  // ---------------------------------------------------------- 乱数
  // 文字列から32bitのシードを作る
  function hashString(str) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }
  // シード付き乱数（mulberry32）
  function rng(seed) {
    var a = seed >>> 0;
    return function () {
      a = (a + 0x6d2b79f5) >>> 0;
      var t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(list, rand) {
    var a = list.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
    return a;
  }
  function pick(list, rand) {
    return list[Math.floor(rand() * list.length)];
  }

  // ---------------------------------------------------------- 日付
  function dateKey(d) {
    d = d || new Date();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  function addDays(key, n) {
    var p = key.split("-").map(Number);
    var d = new Date(p[0], p[1] - 1, p[2] + n);
    return dateKey(d);
  }

  // ---------------------------------------------------------- 診断スコア
  /**
   * answers: 質問と同じ長さの配列。値は -2〜+2（未回答は null）
   * 戻り値: { type, axes: [{ id, left, right, letter, pct: {E:62, I:38} }] }
   */
  function computeResult(answers, questions, axes) {
    questions = questions || TF.QUESTIONS;
    axes = axes || TF.AXES;
    var letters = "";
    var outAxes = axes.map(function (ax) {
      var sum = 0, max = 0, firstSign = 0;
      questions.forEach(function (q, i) {
        if (q.axis !== ax.id) return;
        var v = answers[i];
        if (typeof v !== "number") return;
        var signed = q.agree === ax.left ? v : -v;
        if (firstSign === 0 && signed !== 0) firstSign = signed > 0 ? 1 : -1;
        sum += signed;
        max += 2;
      });
      var leftPct = max === 0 ? 50 : Math.round(50 + (sum / max) * 50);
      leftPct = Math.max(0, Math.min(100, leftPct));
      var letter;
      if (sum > 0) letter = ax.left;
      else if (sum < 0) letter = ax.right;
      else letter = firstSign > 0 ? ax.left : ax.right; // 同点のときは最初に傾いた回答を優先
      letters += letter;
      var pct = {};
      pct[ax.left] = leftPct;
      pct[ax.right] = 100 - leftPct;
      return { id: ax.id, left: ax.left, right: ax.right, letter: letter, pct: pct };
    });
    return { type: letters, axes: outAxes };
  }

  // ---------------------------------------------------------- 相性
  var AXIS_TALK = {
    EI: {
      same: { E: "ふたりともにぎやか派。一緒に出かけると、楽しさが倍増！", I: "ふたりとも静かな時間が好き。言葉が少なくても心地よい関係に。" },
      diff: "にぎやかさと落ち着きのバランス型。お互いの「充電方法」を尊重するのがコツ。"
    },
    SN: {
      same: { S: "現実的な感覚が近く、会話のテンポが合いやすいふたり。", N: "ひらめきや空想の話で、どこまでも盛り上がれるふたり。" },
      diff: "地に足のついた視点と、未来を見る視点。足りないところを補い合えます。"
    },
    TF: {
      same: { T: "筋道を立てて話せるので、ケンカしても仲直りが早い。", F: "気持ちを大切にし合える、やさしい関係。" },
      diff: "論理と気持ち、両方の目線が揃う最強コンビ。ただし言い方には気をつけて。"
    },
    JP: {
      same: { J: "計画派どうし。予定がスムーズに決まって快適！", P: "自由派どうし。その場のノリで、思わぬ冒険が始まるかも。" },
      diff: "きっちり派とのんびり派。役割分担すると、最高のチームに。"
    }
  };

  /**
   * 2つのタイプの相性を計算する（a, b の順番は結果に影響しない）
   */
  function compat(a, b, types) {
    types = types || TF.TYPES;
    var ta = types[a], tb = types[b];
    var score = 62;
    // 認知の近さ（S/N が同じだと話が合う）と、補い合い（E/I, J/P が逆）を評価
    if (a[1] === b[1]) score += 10;
    if (a[0] !== b[0]) score += 5;
    if (a[3] !== b[3]) score += 5;
    if (a[2] === b[2]) score += 3;
    if (a === b) score = 80;

    var level = "normal";
    var bestOf = function (t, other) { return t.best.some(function (x) { return x.t === other; }); };
    var goodOf = function (t, other) { return t.good.indexOf(other) !== -1; };
    if (bestOf(ta, b) || bestOf(tb, a)) { score = Math.max(score, 94); level = "best"; }
    else if (goodOf(ta, b) || goodOf(tb, a)) { score = Math.max(score, 86); level = "good"; }
    else if (a === b) level = "same";
    else if (score >= 80) level = "good";
    else if (score < 70) level = "spice";

    // 同じ組み合わせなら毎回同じになる、ちょっとした揺らぎ
    var key = [a, b].sort().join("-");
    score += (hashString(key) % 5) - 2;
    score = Math.max(55, Math.min(99, score));

    var axisNotes = TF.AXES.map(function (ax, i) {
      var la = a[i], lb = b[i];
      return {
        id: ax.id,
        title: ax.title,
        same: la === lb,
        text: la === lb ? AXIS_TALK[ax.id].same[la] : AXIS_TALK[ax.id].diff
      };
    });

    // 「ベストパートナー」に挙がっていれば、その理由を添える
    var why = null;
    ta.best.forEach(function (x) { if (!why && x.t === b) why = x.why; });
    tb.best.forEach(function (x) { if (!why && x.t === a) why = x.why; });

    return { a: a, b: b, score: score, level: level, axes: axisNotes, why: why };
  }

  TF.COMPAT_LEVELS = {
    best: { label: "運命級の相性", short: "最高" },
    good: { label: "とても良い相性", short: "良好" },
    same: { label: "似たものどうし", short: "同類" },
    normal: { label: "ほどよい相性", short: "ふつう" },
    spice: { label: "刺激しあう相性", short: "刺激的" }
  };

  // ---------------------------------------------------------- 今日の運勢
  function stars(rand, base) {
    // base: 1〜5 の目安。±1 の揺らぎ
    var v = base + Math.floor(rand() * 3) - 1;
    return Math.max(1, Math.min(5, v));
  }
  function tierOf(rank) {
    return rank <= 4 ? 0 : rank <= 12 ? 1 : 2;
  }

  /**
   * 指定日の16タイプ運勢ランキングを返す
   */
  function fortune(key, typeOrder, pool) {
    key = key || dateKey();
    typeOrder = typeOrder || TF.TYPE_ORDER;
    pool = pool || TF.FORTUNE;
    var rand = rng(hashString("fortune:" + key));
    var order = shuffle(typeOrder, rand);
    return order.map(function (code, i) {
      var rank = i + 1;
      var r = rng(hashString("fortune:" + key + ":" + code));
      var tier = tierOf(rank);
      var base = tier === 0 ? 5 : tier === 1 ? 3 : 2;
      return {
        rank: rank,
        type: code,
        tier: tier,
        headline: pick(pool.headline[tier], r),
        advice: pick(pool.advice, r),
        item: pick(pool.items, r),
        color: pick(pool.colors, r),
        luckyType: pick(typeOrder.filter(function (t) { return t !== code; }), r),
        stars: { total: base >= 5 ? 5 : stars(r, base), love: stars(r, base), work: stars(r, base), money: stars(r, base) },
        comment: pick(pool.comments[tier], r)
      };
    });
  }

  // ---------------------------------------------------------- 訪問スタンプ
  /**
   * visits: "YYYY-MM-DD" の配列（重複可）
   * 戻り値: { total, streak, days: Set }
   */
  function visitStats(visits, today) {
    today = today || dateKey();
    var set = {};
    (visits || []).forEach(function (v) { set[v] = true; });
    var total = Object.keys(set).length;
    var streak = 0;
    var cur = today;
    while (set[cur]) { streak++; cur = addDays(cur, -1); }
    return { total: total, streak: streak, has: set };
  }

  // ---------------------------------------------------------- 都道府県データ
  /**
   * 1つの地域（県 or 全国）の件数から、割合つきランキングを作る
   */
  function rankCounts(counts, typeOrder) {
    typeOrder = typeOrder || TF.TYPE_ORDER;
    counts = counts || {};
    var total = typeOrder.reduce(function (s, t) { return s + (counts[t] || 0); }, 0);
    var list = typeOrder.map(function (t) {
      var c = counts[t] || 0;
      return { type: t, count: c, pct: total ? (c / total) * 100 : 0 };
    });
    list.sort(function (x, y) { return y.count - x.count || typeOrder.indexOf(x.type) - typeOrder.indexOf(y.type); });
    list.forEach(function (x, i) { x.rank = i + 1; });
    return { total: total, list: list };
  }

  function nationalCounts(stats, typeOrder) {
    typeOrder = typeOrder || TF.TYPE_ORDER;
    var sum = {};
    typeOrder.forEach(function (t) { sum[t] = 0; });
    Object.keys(stats.prefs || {}).forEach(function (code) {
      var c = stats.prefs[code];
      typeOrder.forEach(function (t) { sum[t] += c[t] || 0; });
    });
    return sum;
  }

  /**
   * 指定タイプの割合が高い都道府県ランキング
   */
  function prefRankingForType(stats, type, prefs) {
    prefs = prefs || TF.PREFECTURES;
    var list = prefs.map(function (p) {
      var r = rankCounts(stats.prefs[p.code]);
      var item = r.list.filter(function (x) { return x.type === type; })[0];
      return { pref: p, pct: item ? item.pct : 0, count: item ? item.count : 0, total: r.total };
    }).filter(function (x) { return x.total > 0; });
    list.sort(function (a, b) { return b.pct - a.pct; });
    list.forEach(function (x, i) { x.rank = i + 1; });
    return list;
  }

  TF.core = {
    hashString: hashString,
    rng: rng,
    shuffle: shuffle,
    dateKey: dateKey,
    addDays: addDays,
    computeResult: computeResult,
    compat: compat,
    fortune: fortune,
    visitStats: visitStats,
    rankCounts: rankCounts,
    nationalCounts: nationalCounts,
    prefRankingForType: prefRankingForType
  };
})();
