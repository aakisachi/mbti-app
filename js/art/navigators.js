// ============================================================
//  ナビゲーター：ずんだもん・四国めたん
//  イラストは img/ フォルダの画像を使用
//  ずんだもん・四国めたん © 東北ずん子・ずんだもんプロジェクト（SSS合同会社）
//  ガイドライン: https://zunko.jp/guideline.html
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

(function () {
  TF.NAV_INFO = {
    zunda: { name: "ずんだもん", file: "zundamon", first: "ボク" },
    metan: { name: "四国めたん", file: "metan", first: "わたくし" }
  };

  // 画像の置き場所（OGP生成スクリプトなどから差し替えられるようにしておく）
  TF.ASSET_BASE = TF.ASSET_BASE || "img/";

  /**
   * ナビゲーターの画像タグ
   * @param {"zunda"|"metan"} who
   * @param {object} [opt] { face: true で顔アップ, cls: class名, eager: true で先読み }
   */
  TF.navArt = function (who, opt) {
    opt = opt || {};
    var info = TF.NAV_INFO[who] || TF.NAV_INFO.zunda;
    var src = TF.ASSET_BASE + info.file + (opt.face ? "-face" : "") + ".webp";
    var size = opt.face ? ' width="256" height="256"' : ' width="' + (who === "metan" ? 427 : 422) + '" height="880"';
    return '<img class="' + (opt.cls || "nav-art") + '" src="' + src + '" alt="' + (opt.decorative ? "" : info.name) + '"' + size +
      (opt.eager ? "" : ' loading="lazy"') + ' decoding="async">';
  };
})();
