// ============================================================
//  ナビゲーター：ずんだもん・四国めたん（ファンアートSVG）
//  ずんだもん・四国めたん © 東北ずん子・ずんだもんプロジェクト（SSS合同会社）
//  ガイドライン: https://zunko.jp/guideline.html
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

(function () {
  var K = "#2b2118";
  var st = function (w) { return 'stroke="' + K + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"'; };
  var SKIN = "#fff1e6";

  TF.NAV_INFO = {
    zunda: { name: "ずんだもん", color: "#5fa52f", first: "ボク" },
    metan: { name: "四国めたん", color: "#d9488a", first: "わたくし" }
  };

  // ---------- 顔のパーツ ----------
  function eyes(face, iris, lash) {
    var xs = [80, 120], y = 118, out = "";
    xs.forEach(function (x, i) {
      var flip = i === 0 ? -1 : 1;
      if (face === "happy") {
        out += '<path d="M' + (x - 10) + ' ' + (y + 3) + ' Q' + x + ' ' + (y - 10) + ' ' + (x + 10) + ' ' + (y + 3) + '" fill="none" ' + st(4) + '/>';
        return;
      }
      if (face === "surprise") {
        out += '<circle cx="' + x + '" cy="' + y + '" r="10" fill="#fff" ' + st(2.6) + '/>' +
          '<circle cx="' + x + '" cy="' + y + '" r="4" fill="' + K + '"/>';
        return;
      }
      var py = face === "think" ? y - 3 : y + 1;
      var px = face === "think" ? x + 2 : x;
      out += '<ellipse cx="' + x + '" cy="' + y + '" rx="9.5" ry="11.5" fill="' + iris + '" ' + st(2.4) + '/>' +
        '<ellipse cx="' + px + '" cy="' + (py + 1) + '" rx="5" ry="7" fill="' + K + '"/>' +
        '<circle cx="' + (px - 3.2) + '" cy="' + (py - 4) + '" r="3.2" fill="#fff"/>' +
        '<circle cx="' + (px + 3) + '" cy="' + (py + 4.5) + '" r="1.5" fill="#fff"/>' +
        '<path d="M' + (x - 12) + ' ' + (y - 9) + ' Q' + x + ' ' + (y - 16) + ' ' + (x + 12) + ' ' + (y - 9) + '" fill="none" ' + st(3.6) + '/>';
      if (lash) {
        // めたんのまつげ（外側にはねる）
        var ox = x + flip * 12;
        out += '<path d="M' + ox + ' ' + (y - 9) + ' l' + (flip * 5) + ' -4" ' + st(3) + '/>';
      }
      if (face === "smile") {
        out += '<path d="M' + (x - 9) + ' ' + (y + 9) + ' Q' + x + ' ' + (y + 5) + ' ' + (x + 9) + ' ' + (y + 9) + '" fill="none" stroke="' + SKIN + '" stroke-width="5"/>';
      }
    });
    if (face === "think") {
      out += '<path d="M150 92 q6 10 0 14 q-6 -4 0 -14 Z" fill="#9fd4ff" ' + st(1.8) + '/>';
    }
    return out;
  }
  function mouth(face) {
    switch (face) {
      case "happy":
        return '<path d="M89 137 Q100 156 111 137 Z" fill="' + K + '" ' + st(2.2) + '/>' +
          '<path d="M94 145 Q100 152 106 145 Q100 142 94 145 Z" fill="#ff7a8a"/>';
      case "smile":
        return '<path d="M92 139 Q100 146 108 139" fill="none" ' + st(2.8) + '/>';
      case "surprise":
        return '<ellipse cx="100" cy="143" rx="5" ry="6.5" fill="' + K + '"/>';
      case "think":
        return '<path d="M92 142 q4 -3 8 0 t8 0" fill="none" ' + st(2.6) + '/>';
      default:
        return '<path d="M94 138 Q100 147 106 138 Z" fill="' + K + '" ' + st(2) + '/>';
    }
  }
  function blush() {
    return '<ellipse cx="68" cy="134" rx="8" ry="4.5" fill="#ff8f9e" opacity=".55"/>' +
      '<ellipse cx="132" cy="134" rx="8" ry="4.5" fill="#ff8f9e" opacity=".55"/>';
  }
  var FACE = "M52 110 C52 78 72 60 100 60 C128 60 148 78 148 110 C148 142 128 160 100 160 C72 160 52 142 52 110 Z";

  // ---------- ずんだもん ----------
  function pod(x, y, rot) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')">' +
      '<path d="M0 -34 C12 -34 14 -16 13 0 C12 18 9 34 0 34 C-9 34 -12 18 -13 0 C-14 -16 -12 -34 0 -34 Z" fill="#8fce4f" ' + st(2.8) + '/>' +
      '<circle cx="0" cy="-17" r="6.5" fill="#b9e58a"/><circle cx="0" cy="0" r="7" fill="#b9e58a"/><circle cx="0" cy="17" r="6.5" fill="#b9e58a"/>' +
      '<path d="M0 -34 q-4 -6 -1 -10" fill="none" ' + st(2.4) + '/>' +
      '</g>';
  }
  function zunda(face) {
    var hair = "#a8db6c", deep = "#5fa52f";
    return '' +
      '<path d="M46 112 C40 60 70 36 100 36 C130 36 160 60 154 112 L156 148 C150 156 138 152 136 142 L64 142 C62 152 50 156 44 148 Z" fill="' + hair + '" ' + st(3) + '/>' +
      pod(36, 60, -38) + pod(164, 60, 38) +
      '<rect x="89" y="150" width="22" height="22" fill="' + SKIN + '" ' + st(2.6) + '/>' +
      '<path d="M46 222 C48 186 70 166 100 166 C130 166 152 186 154 222 Z" fill="#fff" ' + st(3) + '/>' +
      '<path d="M50 222 C52 198 64 182 82 172 L92 222 Z" fill="' + deep + '" ' + st(2.6) + '/>' +
      '<path d="M150 222 C148 198 136 182 118 172 L108 222 Z" fill="' + deep + '" ' + st(2.6) + '/>' +
      '<path d="M100 176 L86 168 L86 184 Z M100 176 L114 168 L114 184 Z" fill="' + hair + '" ' + st(2.4) + '/>' +
      '<circle cx="100" cy="176" r="4" fill="' + hair + '" ' + st(2.2) + '/>' +
      '<path d="' + FACE + '" fill="' + SKIN + '" ' + st(3) + '/>' +
      '<path d="M52 100 C47 120 49 140 56 154 C61 140 61 120 59 104 Z" fill="' + hair + '" ' + st(2.6) + '/>' +
      '<path d="M148 100 C153 120 151 140 144 154 C139 140 139 120 141 104 Z" fill="' + hair + '" ' + st(2.6) + '/>' +
      '<path d="M49 108 C47 66 72 46 100 46 C128 46 153 66 151 108 C145 96 137 86 129 80 L125 98 L115 78 L105 96 L97 78 L87 96 L81 80 C71 86 57 96 49 108 Z" fill="' + hair + '" ' + st(3) + '/>' +
      '<path d="M101 46 C96 32 108 26 113 34" fill="none" ' + st(3) + '/>' +
      eyes(face, "#f0a23a", false) + blush() + mouth(face);
  }

  // ---------- 四国めたん ----------
  function drill(x, dir) {
    var segs = [[188, 10, 9], [168, 13, 11], [146, 15, 12], [122, 17, 13]];
    var out = "";
    segs.forEach(function (s) {
      var y = s[0], rx = s[1], ry = s[2];
      out += '<ellipse cx="' + x + '" cy="' + y + '" rx="' + rx + '" ry="' + ry + '" fill="#e9619e" ' + st(2.8) + '/>' +
        '<path d="M' + (x - rx * 0.6) + ' ' + (y - ry * 0.15) + ' Q' + x + ' ' + (y + ry * 0.65) + ' ' + (x + rx * 0.6) + ' ' + (y - ry * 0.15) + '" fill="none" stroke="#b83a75" stroke-width="2" stroke-linecap="round"/>';
    });
    out += '<path d="M' + (x - 10) + ' 104 Q' + x + ' 110 ' + (x + 10) + ' 104 L' + (x + 8) + ' 112 Q' + x + ' 116 ' + (x - 8) + ' 112 Z" fill="#2d2433" ' + st(2) + '/>';
    return out;
  }
  function metan(face) {
    var hair = "#e9619e", dress = "#2d2433";
    return '' +
      '<path d="M42 110 C38 58 68 32 100 32 C132 32 162 58 158 110 L160 176 L40 176 Z" fill="' + hair + '" ' + st(3) + '/>' +
      '<rect x="89" y="150" width="22" height="22" fill="' + SKIN + '" ' + st(2.6) + '/>' +
      '<path d="M46 222 C48 186 70 166 100 166 C130 166 152 186 154 222 Z" fill="' + dress + '" ' + st(3) + '/>' +
      '<path d="M76 170 Q100 188 124 170 L120 182 Q100 198 80 182 Z" fill="#fff" ' + st(2.4) + '/>' +
      '<path d="M100 190 L88 183 L88 197 Z M100 190 L112 183 L112 197 Z" fill="' + hair + '" ' + st(2.2) + '/>' +
      '<circle cx="100" cy="190" r="4" fill="#f2c94c" ' + st(2) + '/>' +
      drill(34, -1) + drill(166, 1) +
      '<path d="' + FACE + '" fill="' + SKIN + '" ' + st(3) + '/>' +
      '<path d="M52 100 C48 118 50 136 55 148 C60 136 60 118 59 104 Z" fill="' + hair + '" ' + st(2.6) + '/>' +
      '<path d="M148 100 C152 118 150 136 145 148 C140 136 140 118 141 104 Z" fill="' + hair + '" ' + st(2.6) + '/>' +
      '<path d="M49 108 C47 64 72 44 100 44 C128 44 153 64 151 108 C143 92 129 78 110 70 L102 90 L95 70 C77 78 59 92 49 108 Z" fill="' + hair + '" ' + st(3) + '/>' +
      '<path d="M60 66 Q100 38 140 66" fill="none" stroke="' + dress + '" stroke-width="7" stroke-linecap="round"/>' +
      '<path d="M140 60 L128 52 L128 68 Z M140 60 L152 52 L152 68 Z" fill="' + dress + '" ' + st(2.2) + '/>' +
      '<circle cx="140" cy="60" r="4" fill="' + hair + '" ' + st(2) + '/>' +
      eyes(face, "#e8b23a", true) + blush() + mouth(face);
  }

  /**
   * ナビゲーターのSVG
   * @param {"zunda"|"metan"} who
   * @param {string} face normal | happy | smile | surprise | think
   * @param {object} [opt] { crop: true で顔アップ, cls }
   */
  TF.navSvg = function (who, face, opt) {
    opt = opt || {};
    var inner = who === "metan" ? metan(face || "normal") : zunda(face || "normal");
    var vb = opt.crop ? "22 24 156 156" : "0 0 200 222";
    var name = TF.NAV_INFO[who].name;
    return '<svg class="' + (opt.cls || "nav-svg") + '" viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + name + '">' + inner + '</svg>';
  };
})();
