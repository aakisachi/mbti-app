#!/usr/bin/env node
// ============================================================
//  シェア用ページ（t/infp.html など）を生成する
//  SNS がリンクを読み込むと、タイプごとのタイトルと画像（OGP）が表示され、
//  人が開くとアプリのタイプ解説ページへ移動します。
//  使い方: node tools/build-share-pages.js
// ============================================================
const fs = require("fs");
const path = require("path");
const TF = require("./load-data")();

const root = path.join(__dirname, "..");
const outDir = path.join(root, "t");
fs.mkdirSync(outDir, { recursive: true });

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const site = TF.CONFIG.SITE_URL;

TF.TYPE_ORDER.forEach((code) => {
  const t = TF.TYPES[code];
  const lower = code.toLowerCase();
  const title = `${code}「${t.nick}」｜${TF.CONFIG.SITE_NAME}`;
  const desc = `${t.catch}。${t.desc.slice(0, 70)}… 20問でわかる16タイプ性格診断。`;
  const url = `${site}t/${lower}.html`;
  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${esc(url)}">
<link rel="icon" href="../favicon.svg" type="image/svg+xml">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${esc(TF.CONFIG.SITE_NAME)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(site)}og/${lower}.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="ja_JP">
<meta name="twitter:card" content="summary_large_image">
<script>location.replace("../index.html#/type/${code}");</script>
</head>
<body style="font-family:sans-serif;text-align:center;padding:40px 16px">
<p><a href="../index.html#/type/${code}">${esc(code)}「${esc(t.nick)}」の解説ページへ</a></p>
</body>
</html>
`;
  fs.writeFileSync(path.join(outDir, `${lower}.html`), html);
});

console.log(`t/ に ${TF.TYPE_ORDER.length} ページを書き出しました`);
