// node --test tests/
const test = require("node:test");
const assert = require("node:assert/strict");
const TF = require("../tools/load-data")();
const C = TF.core;

const N = TF.QUESTIONS.length;
const fill = (v) => TF.QUESTIONS.map(() => v);

// ---------------------------------------------------------- 質問データ
test("質問は20問で、4指標×5問ずつ", () => {
  assert.equal(N, 20);
  TF.AXES.forEach((ax) => {
    const qs = TF.QUESTIONS.filter((q) => q.axis === ax.id);
    assert.equal(qs.length, 5, ax.id);
    qs.forEach((q) => assert.ok([ax.left, ax.right].includes(q.agree), q.text));
  });
  assert.equal(TF.QUIZ_LINES.length, N);
});

// ---------------------------------------------------------- スコア計算
test("全部「とてもそう思う」は ESTJ（各指標で多数派の向きに 60%）", () => {
  const r = C.computeResult(fill(2));
  assert.equal(r.type, "ESTJ");
  r.axes.forEach((a) => assert.equal(a.pct[a.letter], 60));
});

test("全部「どちらともいえない」は同点 → INFP / 50%", () => {
  const r = C.computeResult(fill(0));
  assert.equal(r.type, "INFP");
  r.axes.forEach((a) => assert.equal(a.pct[a.left], 50));
});

test("各タイプに振り切った回答で、そのタイプが100%になる", () => {
  TF.TYPE_ORDER.forEach((code) => {
    const answers = TF.QUESTIONS.map((q) => {
      const target = code[TF.AXES.findIndex((a) => a.id === q.axis)];
      return q.agree === target ? 2 : -2;
    });
    const r = C.computeResult(answers);
    assert.equal(r.type, code);
    r.axes.forEach((a) => assert.equal(a.pct[a.letter], 100));
  });
});

test("割合は常に合計100％・0〜100の範囲", () => {
  const rand = C.rng(42);
  for (let i = 0; i < 300; i++) {
    const answers = TF.QUESTIONS.map(() => Math.floor(rand() * 5) - 2);
    const r = C.computeResult(answers);
    assert.match(r.type, /^[EI][SN][TF][JP]$/);
    r.axes.forEach((a) => {
      assert.equal(a.pct[a.left] + a.pct[a.right], 100);
      assert.ok(a.pct[a.letter] >= 50, "選ばれた文字が多数派");
    });
  }
});

test("同点のときは、その指標で最初に傾いた回答を優先する", () => {
  const answers = fill(0);
  const eiIdx = TF.QUESTIONS.map((q, i) => (q.axis === "EI" ? i : -1)).filter((i) => i >= 0);
  // 1問目(E寄り)で+1、2問目(I寄り)で+1 → 合計0。最初は E 方向
  answers[eiIdx[0]] = 1;
  answers[eiIdx[1]] = 1;
  assert.equal(C.computeResult(answers).type[0], "E");
});

// ---------------------------------------------------------- タイプデータ
test("16タイプすべてに必要なデータがそろっている", () => {
  assert.equal(TF.TYPE_ORDER.length, 16);
  assert.equal(new Set(TF.TYPE_ORDER).size, 16);
  const keys = ["animal", "nick", "catch", "title", "desc", "strengths", "weak", "love", "work", "stress", "growth", "careers", "best", "good", "talk"];
  TF.TYPE_ORDER.forEach((code) => {
    const f = TF.TYPES[code].fact;
    assert.ok(f && f.title && f.text, `${code}.fact`);
  });
  const nicks = new Set();
  const animals = new Set();
  TF.TYPE_ORDER.forEach((code) => {
    const t = TF.TYPES[code];
    keys.forEach((k) => assert.ok(t[k] && t[k].length, `${code}.${k}`));
    t.best.forEach((b) => { assert.ok(TF.TYPES[b.t], `${code} best ${b.t}`); assert.notEqual(b.t, code); assert.ok(b.why); });
    t.good.forEach((c) => { assert.ok(TF.TYPES[c], `${code} good ${c}`); assert.notEqual(c, code); });
    t.talk.forEach((l) => assert.ok(["zunda", "metan"].includes(l.who)));
    nicks.add(t.nick);
    animals.add(t.animal);
    assert.ok(TF.animalSvg(code).startsWith("<svg"), `${code} の動物SVG`);
  });
  assert.equal(nicks.size, 16, "ニックネームが重複していない");
  assert.equal(animals.size, 16, "動物が重複していない");
});

test("他サイトの有名な呼び名（16Personalities）を使っていない", () => {
  const taken = ["建築家", "論理学者", "指揮官", "討論者", "提唱者", "仲介者", "主人公", "運動家", "管理者", "擁護者", "幹部", "領事", "巨匠", "冒険家", "起業家", "エンターテイナー"];
  TF.TYPE_ORDER.forEach((code) => {
    const nick = TF.TYPES[code].nick;
    taken.forEach((w) => assert.ok(!nick.includes(w), `${code}: ${nick}`));
  });
});

test("動物は動画「MBTI動物図鑑」と同じ組み合わせ", () => {
  const zukan = {
    INTJ: "カラス", INTP: "タコ", ENTJ: "シャチ", ENTP: "キツネ",
    INFJ: "オオカミ", INFP: "ハムスター", ENFJ: "ゾウ", ENFP: "カワウソ",
    ISTJ: "ビーバー", ISFJ: "秋田犬", ESTJ: "ボーダーコリー", ESFJ: "カピバラ",
    ISTP: "ラッコ", ISFP: "ネコ", ESTP: "カンガルー", ESFP: "イルカ"
  };
  Object.keys(zukan).forEach((code) => assert.equal(TF.TYPES[code].animal, zukan[code], code));
});

test("グループ判定", () => {
  assert.equal(TF.groupOf("INTJ"), "NT");
  assert.equal(TF.groupOf("ENFP"), "NF");
  assert.equal(TF.groupOf("ISFJ"), "SJ");
  assert.equal(TF.groupOf("ESTP"), "SP");
});

// ---------------------------------------------------------- 相性
test("相性は対称で、55〜99%の範囲", () => {
  TF.TYPE_ORDER.forEach((a) => {
    TF.TYPE_ORDER.forEach((b) => {
      const x = C.compat(a, b);
      const y = C.compat(b, a);
      assert.equal(x.score, y.score, `${a}-${b}`);
      assert.equal(x.level, y.level);
      assert.ok(x.score >= 55 && x.score <= 99);
      assert.equal(x.axes.length, 4);
    });
  });
});

test("ベストパートナーは最高ランクで、理由つき", () => {
  TF.TYPE_ORDER.forEach((a) => {
    TF.TYPES[a].best.forEach((b) => {
      const r = C.compat(a, b.t);
      assert.equal(r.level, "best");
      assert.ok(r.score >= 92);
      assert.ok(r.why);
    });
  });
  assert.equal(C.compat("INFP", "INFP").level, "same");
});

// ---------------------------------------------------------- 運勢
test("運勢は日付ごとに固定で、16タイプの並べ替えになっている", () => {
  const a = C.fortune("2026-10-11");
  const b = C.fortune("2026-10-11");
  const c = C.fortune("2026-10-12");
  assert.deepEqual(a, b);
  assert.notDeepEqual(a.map((x) => x.type), c.map((x) => x.type));
  assert.deepEqual(a.map((x) => x.type).sort(), TF.TYPE_ORDER.slice().sort());
  a.forEach((x, i) => {
    assert.equal(x.rank, i + 1);
    assert.notEqual(x.luckyType, x.type);
    Object.values(x.stars).forEach((s) => assert.ok(s >= 1 && s <= 5));
  });
});

// ---------------------------------------------------------- スタンプ
test("訪問スタンプの連続日数と合計", () => {
  const v = C.visitStats(["2026-10-09", "2026-10-10", "2026-10-11", "2026-10-11", "2026-10-01"], "2026-10-11");
  assert.equal(v.total, 4);
  assert.equal(v.streak, 3);
  assert.equal(C.visitStats(["2026-10-09"], "2026-10-11").streak, 0);
  assert.equal(C.addDays("2026-03-01", -1), "2026-02-28");
  assert.equal(C.addDays("2026-12-31", 1), "2027-01-01");
});

test("ひみつの会話は日数の少ない順", () => {
  for (let i = 1; i < TF.SECRETS.length; i++) assert.ok(TF.SECRETS[i].need > TF.SECRETS[i - 1].need);
});

// ---------------------------------------------------------- 都道府県
test("都道府県は47件で、タイル地図の位置が重ならない", () => {
  assert.equal(TF.PREFECTURES.length, 47);
  assert.equal(new Set(TF.PREFECTURES.map((p) => p.code)).size, 47);
  const used = new Set();
  TF.PREFECTURES.forEach((p) => {
    for (let dx = 0; dx < (p.w || 1); dx++) {
      for (let dy = 0; dy < (p.h || 1); dy++) {
        const key = `${p.x + dx},${p.y + dy}`;
        assert.ok(!used.has(key), `${p.name} が ${key} で重なっている`);
        assert.ok(p.x + dx < 12 && p.y + dy < 12, `${p.name} が地図の外`);
        used.add(key);
      }
    }
  });
});

test("デモ集計とランキング計算", () => {
  const s1 = C.demoStats();
  const s2 = C.demoStats();
  assert.deepEqual(s1, s2);
  assert.equal(s1.demo, true);
  assert.equal(Object.keys(s1.prefs).length, 47);
  const r = C.rankCounts(s1.prefs[13]);
  assert.equal(r.list.length, 16);
  for (let i = 1; i < r.list.length; i++) assert.ok(r.list[i - 1].count >= r.list[i].count);
  const sum = r.list.reduce((s, x) => s + x.pct, 0);
  assert.ok(Math.abs(sum - 100) < 1e-6);
  const empty = C.rankCounts({});
  assert.equal(empty.total, 0);
  empty.list.forEach((x) => assert.equal(x.pct, 0));
  const byType = C.prefRankingForType(s1, "INFP");
  assert.equal(byType.length, 47);
  assert.ok(byType[0].pct >= byType[46].pct);
});
