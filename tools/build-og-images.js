#!/usr/bin/env node
// ============================================================
//  SNSシェア用の画像（og/default.png, og/infp.png ...）を生成する
//  使い方:
//    npm install            # playwright-core を入れる
//    node tools/build-og-images.js
//  Chromium の場所は環境変数 CHROMIUM_PATH で指定できます。
//  tools/.fonts/ に Google Fonts の ttf と fonts.css（Mochiy Pop One / M PLUS Rounded 1c / Fredoka）を置くと
//  オフラインでも同じフォントで描画します。置かない場合は Google Fonts から読み込みます。
// ============================================================
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");

const root = path.join(__dirname, "..");
// ナビゲーターの画像はローカルファイルから読む
globalThis.TF = { ASSET_BASE: "file://" + path.join(root, "img") + "/" };
const TF = require("./load-data")();

const outDir = path.join(root, "og");
const cacheDir = path.join(__dirname, ".cache");
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(cacheDir, { recursive: true });

// css/style.css のグループ色と同じ値
const GROUP = {
  NT: { g: "#8a6cf0", tint: "#f0ebff", ink: "#5b3fc0" },
  NF: { g: "#3ea36b", tint: "#e2f5ea", ink: "#1f7347" },
  SJ: { g: "#3d8bd9", tint: "#e6f1fc", ink: "#1f62a8" },
  SP: { g: "#f08a24", tint: "#fff0de", ink: "#a85406" }
};

function fontCss() {
  const dir = path.join(__dirname, ".fonts");
  const cssFile = path.join(dir, "fonts.css");
  if (fs.existsSync(cssFile)) {
    // Google Fonts の CSS の URL をローカルファイルに置き換える
    return "<style>" + fs.readFileSync(cssFile, "utf8").replace(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/g, (m, u) => {
      return "url(file://" + path.join(dir, path.basename(u)) + ")";
    }) + "</style>";
  }
  return '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&family=M+PLUS+Rounded+1c:wght@500;800&family=Fredoka:wght@600;700&display=block">';
}

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { font-family: "M PLUS Rounded 1c", sans-serif; color: #3a2e2c; background: #ffffff; position: relative; }
  .brand { position: absolute; left: 56px; top: 44px; display: flex; align-items: center; gap: 12px; font-family: "Mochiy Pop One"; font-size: 28px; }
  .brand img { width: 52px; height: 52px; border-radius: 14px; background: #e9f7dc; }
  .brand small { display: block; font-family: "Fredoka"; font-weight: 600; font-size: 14px; letter-spacing: .18em; color: #8b807b; }
`;

function typeHtml(code) {
  const t = TF.TYPES[code];
  const c = GROUP[TF.groupOf(code)];
  const nickSize = t.nick.length <= 6 ? 64 : t.nick.length <= 8 ? 56 : 48;
  return `<!doctype html><html><head><meta charset="utf-8">${fontCss()}<style>${BASE_CSS}
    .card { position: absolute; right: 48px; top: 40px; bottom: 40px; width: 470px; border-radius: 40px; background: ${c.tint}; display: grid; place-items: center; }
    .card .disc { width: 400px; height: 400px; border-radius: 50%; background: #fff; display: grid; place-items: center; }
    .card .disc svg { width: 88%; height: 88%; }
    .copy { position: absolute; left: 56px; top: 150px; width: 600px; }
    .label { font-weight: 800; font-size: 26px; letter-spacing: .12em; color: #6b605c; }
    .code { font-family: "Fredoka"; font-weight: 700; font-size: 172px; line-height: .95; color: ${c.ink}; margin-top: 8px; }
    .nick { font-family: "Mochiy Pop One"; font-size: ${nickSize}px; line-height: 1.25; margin-top: 10px; white-space: nowrap; }
    .catch { font-weight: 800; font-size: 26px; color: #6b605c; margin-top: 14px; }
    .group { display: inline-block; margin-top: 22px; padding: 6px 18px; border-radius: 999px; background: ${c.g}; color: #fff; font-weight: 800; font-size: 22px; }
  </style></head><body>
    <div class="brand"><img src="${TF.ASSET_BASE}zundamon-face.webp"><span><small>16 TYPES</small>せいかくラボ</span></div>
    <div class="copy">
      <div class="label">わたしのタイプは…</div>
      <div class="code">${code}</div>
      <div class="nick">${t.nick}</div>
      <div class="catch">「${t.catch}」</div>
      <div class="group">${TF.GROUPS[TF.groupOf(code)].name}</div>
    </div>
    <div class="card"><div class="disc">${TF.animalSvg(code)}</div></div>
  </body></html>`;
}

function defaultHtml() {
  const row = ["INTJ", "ENFP", "ISFJ", "ESTP", "INFP"].map((c) => {
    const g = GROUP[TF.groupOf(c)];
    return `<div class="mini" style="background:${g.tint}">${TF.animalSvg(c)}</div>`;
  }).join("");
  return `<!doctype html><html><head><meta charset="utf-8">${fontCss()}<style>${BASE_CSS}
    .stage { position: absolute; right: 40px; top: 40px; bottom: 40px; width: 500px; border-radius: 40px; background: #e9f7dc; overflow: hidden; }
    .stage::before { content: ""; position: absolute; left: -10%; right: -10%; bottom: -30%; height: 60%; border-radius: 50%; background: #78c93c; opacity: .55; }
    .stage::after { content: ""; position: absolute; right: -50px; top: -50px; width: 220px; height: 220px; border-radius: 50%; background: #fce8f5; }
    .stage img { position: absolute; bottom: -30px; height: 470px; width: auto; z-index: 1; }
    .stage .z { left: 14px; } .stage .m { right: 6px; }
    .copy { position: absolute; left: 56px; top: 132px; width: 600px; }
    h1 { font-family: "Mochiy Pop One"; font-weight: 400; font-size: 64px; line-height: 1.24; }
    h1 .z { color: #3f7d17; } h1 .m { color: #a83786; }
    .lead { font-weight: 800; font-size: 26px; color: #6b605c; margin-top: 18px; }
    .minis { display: flex; gap: 12px; margin-top: 24px; }
    .mini { width: 84px; height: 84px; border-radius: 50%; display: grid; place-items: center; }
    .mini svg { width: 88%; height: 88%; }
  </style></head><body>
    <div class="brand"><img src="${TF.ASSET_BASE}zundamon-face.webp"><span><small>16 TYPES</small>せいかくラボ</span></div>
    <div class="copy">
      <h1>20問で、<br>あなたの<span class="z">タイプ</span>が<br>わかる<span class="m">のだ。</span></h1>
      <p class="lead">16タイプ ・ 毎日の運勢 ・ 県別ランキング ・ 相性</p>
      <div class="minis">${row}</div>
    </div>
    <div class="stage">${TF.navArt("zunda", { cls: "z", eager: true, decorative: true })}${TF.navArt("metan", { cls: "m", eager: true, decorative: true })}</div>
  </body></html>`;
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const render = async (html, name) => {
    const file = path.join(cacheDir, name + ".html");
    fs.writeFileSync(file, html);
    await page.goto("file://" + file);
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => Promise.all(Array.from(document.images).map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; }))));
    await page.waitForTimeout(150);
    await page.screenshot({ path: path.join(outDir, name + ".png") });
  };
  await render(defaultHtml(), "default");
  for (const code of TF.TYPE_ORDER) await render(typeHtml(code), code.toLowerCase());
  await browser.close();
  console.log(`og/ に ${TF.TYPE_ORDER.length + 1} 枚の画像を書き出しました`);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
