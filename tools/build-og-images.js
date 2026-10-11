#!/usr/bin/env node
// ============================================================
//  SNSシェア用の画像（og/default.png, og/infp.png ...）を生成する
//  使い方:
//    npm install            # playwright-core を入れる
//    node tools/build-og-images.js
//  Chromium の場所は環境変数 CHROMIUM_PATH で指定できます。
//  tools/.fonts/ に Google Fonts の ttf（Dela Gothic One / Zen Maru Gothic）を置くと
//  オフラインでも同じフォントで描画します。置かない場合は Google Fonts から読み込みます。
// ============================================================
const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");
const TF = require("./load-data")();

const root = path.join(__dirname, "..");
const outDir = path.join(root, "og");
const cacheDir = path.join(__dirname, ".cache");
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(cacheDir, { recursive: true });

const GROUP = {
  NT: { g: "#7c5cd6", soft: "#eee8ff", ink: "#5b3fb8" },
  NF: { g: "#3fa45b", soft: "#e3f5e2", ink: "#22743a" },
  SJ: { g: "#2f7fc1", soft: "#e2effa", ink: "#1d5f97" },
  SP: { g: "#e8781e", soft: "#fdeedd", ink: "#a24c08" }
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
  return '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Zen+Maru+Gothic:wght@500;700;900&display=block">';
}

const BASE_CSS = `
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { font-family: "Zen Maru Gothic", sans-serif; color: #2b2118; background: #fbf7ee; }
  .frame { position: absolute; inset: 22px; border: 6px solid #2b2118; border-radius: 40px; overflow: hidden; box-shadow: 10px 10px 0 #2b2118; }
  .dots { position: absolute; inset: 0; background-image: radial-gradient(rgba(43,33,24,.12) 2.4px, transparent 2.8px); background-size: 30px 30px; }
  .brand { font-family: "Dela Gothic One"; font-size: 30px; letter-spacing: .04em; display: flex; align-items: center; gap: 12px; }
  .brand small { font-family: "Zen Maru Gothic"; font-weight: 900; font-size: 16px; letter-spacing: .2em; color: #7c7163; display: block; }
  .chip { display: inline-block; font-weight: 900; font-size: 22px; padding: 6px 20px; border-radius: 999px; border: 4px solid #2b2118; background: #fff; }
`;

function typeHtml(code) {
  const t = TF.TYPES[code];
  const c = GROUP[TF.groupOf(code)];
  return `<!doctype html><html><head><meta charset="utf-8">${fontCss()}<style>${BASE_CSS}
    .frame { background: ${c.soft}; }
    .disc { position: absolute; left: 60px; top: 70px; width: 440px; height: 440px; border-radius: 50%; background: #fff; border: 6px solid #2b2118; box-shadow: 8px 8px 0 #2b2118; display: grid; place-items: center; }
    .disc svg { width: 88%; height: 88%; }
    .right { position: absolute; left: 550px; right: 50px; top: 52px; bottom: 50px; display: flex; flex-direction: column; }
    .label { font-weight: 900; font-size: 26px; letter-spacing: .14em; color: #5e5345; margin-top: 20px; }
    .code { font-family: "Dela Gothic One"; font-size: 150px; line-height: 1; color: ${c.ink}; letter-spacing: .03em; margin-top: 6px; }
    .nick { font-weight: 900; font-size: ${t.nick.length <= 6 ? 56 : t.nick.length <= 8 ? 50 : 44}px; line-height: 1.2; margin-top: 10px; white-space: nowrap; }
    .catch { font-weight: 700; font-size: 24px; color: #5e5345; margin-top: 10px; }
    .foot { margin-top: auto; display: flex; align-items: center; gap: 14px; }
    .ava { width: 64px; height: 64px; border-radius: 50%; border: 4px solid #2b2118; overflow: hidden; }
    .ava svg { width: 100%; height: 100%; }
    .foot p { font-weight: 900; font-size: 22px; }
  </style></head><body>
  <div class="frame"><div class="dots"></div>
    <div class="disc">${TF.animalSvg(code)}</div>
    <div class="right">
      <div class="brand">${TF.CONFIG.SITE_NAME.replace("16タイプ ", "<span><small>16タイプ</small>") + "</span>"}</div>
      <div class="label">わたしのタイプは…</div>
      <div class="code">${code}</div>
      <div class="nick">${t.nick}</div>
      <div class="catch">「${t.catch}」</div>
      <div class="foot">
        <div class="ava" style="background:#e6f5d6">${TF.navSvg("zunda", "happy", { crop: true })}</div>
        <div class="ava" style="background:#fde3ef">${TF.navSvg("metan", "smile", { crop: true })}</div>
        <p>20問でわかる 16タイプ性格診断</p>
      </div>
    </div>
  </div></body></html>`;
}

function defaultHtml() {
  const row = ["INTJ", "ENFP", "ISFJ", "ESTP", "INFP"].map((c) => {
    const g = GROUP[TF.groupOf(c)];
    return `<div class="mini" style="background:${g.soft}">${TF.animalSvg(c)}</div>`;
  }).join("");
  return `<!doctype html><html><head><meta charset="utf-8">${fontCss()}<style>${BASE_CSS}
    .frame { background: #fbf7ee; }
    .chars { position: absolute; right: 30px; bottom: -10px; display: flex; align-items: flex-end; }
    .chars svg { width: 205px; height: auto; }
    .left { position: absolute; left: 64px; top: 56px; width: 700px; }
    h1 { font-family: "Dela Gothic One"; font-weight: 400; font-size: 86px; line-height: 1.12; margin-top: 30px; }
    h1 .z { color: #3d7a1a; } h1 .m { color: #b3306c; }
    .lead { font-weight: 900; font-size: 30px; color: #5e5345; margin-top: 18px; }
    .minis { display: flex; gap: 14px; margin-top: 34px; }
    .mini { width: 92px; height: 92px; border-radius: 50%; border: 4px solid #2b2118; display: grid; place-items: center; }
    .mini svg { width: 88%; height: 88%; }
  </style></head><body>
  <div class="frame"><div class="dots"></div>
    <div class="left">
      <span class="chip">ずんだもん＆めたんがナビゲート</span>
      <h1>20問でわかる<br><span class="z">性格</span><span class="m">タイプ</span>診断</h1>
      <p class="lead">16タイプ ・ 毎日の運勢 ・ 県別ランキング</p>
      <div class="minis">${row}</div>
    </div>
    <div class="chars">${TF.navSvg("zunda", "happy")}${TF.navSvg("metan", "smile")}</div>
  </div></body></html>`;
}

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  const render = async (html, name) => {
    const file = path.join(cacheDir, name + ".html");
    fs.writeFileSync(file, html);
    await page.goto("file://" + file);
    await page.evaluate(() => document.fonts.ready);
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
