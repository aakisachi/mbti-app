// Node からブラウザ用のデータファイルを読み込むための小さなヘルパー
// （各ファイルは globalThis.TF に値を登録する作りになっています）
const path = require("path");

const FILES = [
  "js/config.js",
  "js/data/questions.js",
  "js/data/types.js",
  "js/data/prefectures.js",
  "js/data/fortune.js",
  "js/art/animals.js",
  "js/art/navigators.js",
  "js/lib/core.js"
];

module.exports = function loadData() {
  const root = path.join(__dirname, "..");
  FILES.forEach((f) => require(path.join(root, f)));
  return globalThis.TF;
};
