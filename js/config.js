// ============================================================
//  サイト設定
//  公開URLや集計サーバーを変えたいときは、ここだけ書き換えればOK。
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

TF.CONFIG = {
  // サイト名
  SITE_NAME: "16タイプ せいかくラボ",

  // 公開URL（末尾スラッシュあり）。シェア用ページやOGP画像の絶対URLに使います。
  // GitHub Pages で公開する場合: https://<ユーザー名>.github.io/<リポジトリ名>/
  SITE_URL: "https://aakisachi.github.io/mbti-app/",

  // 都道府県ランキングの集計サーバー（Google Apps Script のウェブアプリURL）。
  // 空文字のあいだは、ランキングを「準備中」と表示し、投票フォームも出しません。設定方法は README を参照。
  STATS_ENDPOINT: "https://script.google.com/macros/s/AKfycbwQHKJi2b7081fMEu8tXNj2fJqidP4aG3FdPyq18P7ELc4PhF414rLstq40OtodtqZ9_w/exec",

  // 動画「全16タイプを動物に例えると【MBTI動物図鑑】」のURL（YouTubeなど）。
  // 設定すると、各タイプの「なぜこの動物？」に動画へのボタンが出ます。
  ANIMAL_VIDEO_URL: "https://youtu.be/BtRgBOsQQQw",

  // シェア時のハッシュタグ
  HASHTAGS: ["せいかくラボ", "16タイプ診断"]
};
