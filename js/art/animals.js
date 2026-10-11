// ============================================================
//  16タイプの動物キャラクター（オリジナルSVG）
//  すべて viewBox 0 0 200 200。身につけている小物の色はグループ色。
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

(function () {
  var K = "#2b2118"; // 線の色
  var W = 3;         // 線の太さ
  var ST = 'stroke="' + K + '" stroke-width="' + W + '" stroke-linejoin="round" stroke-linecap="round"';
  var st = function (w) { return 'stroke="' + K + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"'; };

  var G = { NT: "#7c5cd6", NF: "#3fa45b", SJ: "#2f7fc1", SP: "#e8781e" };
  var PINK = "#ff8f9e";

  // ---------- パーツ ----------
  function eyeDot(x, y, r) {
    r = r || 6;
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + K + '"/>' +
      '<circle cx="' + (x - r * 0.3) + '" cy="' + (y - r * 0.38) + '" r="' + (r * 0.34) + '" fill="#fff"/>';
  }
  function eyesDot(x1, x2, y, r) { return eyeDot(x1, y, r) + eyeDot(x2, y, r); }
  function eyeSparkle(x, y, r) {
    r = r || 7;
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + K + '"/>' +
      '<circle cx="' + (x - r * 0.32) + '" cy="' + (y - r * 0.36) + '" r="' + (r * 0.36) + '" fill="#fff"/>' +
      '<circle cx="' + (x + r * 0.38) + '" cy="' + (y + r * 0.35) + '" r="' + (r * 0.16) + '" fill="#fff"/>';
  }
  function eyesSparkle(x1, x2, y, r) { return eyeSparkle(x1, y, r) + eyeSparkle(x2, y, r); }
  function eyeHappy(x, y, w) {
    w = w || 7;
    return '<path d="M' + (x - w) + ' ' + (y + 2) + ' Q' + x + ' ' + (y - w) + ' ' + (x + w) + ' ' + (y + 2) + '" fill="none" ' + ST + '/>';
  }
  function eyesHappy(x1, x2, y, w) { return eyeHappy(x1, y, w) + eyeHappy(x2, y, w); }
  function eyeClosed(x, y, w) {
    w = w || 7;
    return '<path d="M' + (x - w) + ' ' + y + ' Q' + x + ' ' + (y + w * 0.9) + ' ' + (x + w) + ' ' + y + '" fill="none" ' + ST + '/>' +
      '<path d="M' + (x - w - 1) + ' ' + (y - 1) + ' l-3 -3 M' + (x + w + 1) + ' ' + (y - 1) + ' l3 -3" ' + st(2) + '/>';
  }
  function eyesClosed(x1, x2, y, w) { return eyeClosed(x1, y, w) + eyeClosed(x2, y, w); }
  // ジト目（クール）
  function eyeJito(x, y, w) {
    w = w || 8;
    return '<path d="M' + (x + w) + ' ' + y + ' A' + w + ' ' + (w * 0.85) + ' 0 0 1 ' + (x - w) + ' ' + y + ' Z" fill="' + K + '"/>' +
      '<circle cx="' + (x - w * 0.2) + '" cy="' + (y + w * 0.35) + '" r="' + (w * 0.22) + '" fill="#fff"/>' +
      '<path d="M' + (x - w - 2) + ' ' + (y - 0.5) + ' L' + (x + w + 2) + ' ' + (y - 0.5) + '" ' + ST + '/>';
  }
  function eyesJito(x1, x2, y, w) { return eyeJito(x1, y, w) + eyeJito(x2, y, w); }
  function cheeks(x1, x2, y, c) {
    c = c || PINK;
    return '<ellipse cx="' + x1 + '" cy="' + y + '" rx="7.5" ry="4.5" fill="' + c + '" opacity=".55"/>' +
      '<ellipse cx="' + x2 + '" cy="' + y + '" rx="7.5" ry="4.5" fill="' + c + '" opacity=".55"/>';
  }
  function mouthW(x, y) {
    return '<path d="M' + (x - 9) + ' ' + (y - 1) + ' Q' + (x - 4.5) + ' ' + (y + 5) + ' ' + x + ' ' + (y - 1) + ' Q' + (x + 4.5) + ' ' + (y + 5) + ' ' + (x + 9) + ' ' + (y - 1) + '" fill="none" ' + st(2.6) + '/>';
  }
  function mouthSmile(x, y, w) {
    w = w || 7;
    return '<path d="M' + (x - w) + ' ' + y + ' Q' + x + ' ' + (y + w * 0.9) + ' ' + (x + w) + ' ' + y + '" fill="none" ' + st(2.6) + '/>';
  }
  function mouthY(x, y) {
    return '<path d="M' + x + ' ' + y + ' v4 M' + x + ' ' + (y + 4) + ' Q' + (x - 5) + ' ' + (y + 9) + ' ' + (x - 10) + ' ' + (y + 6) + ' M' + x + ' ' + (y + 4) + ' Q' + (x + 5) + ' ' + (y + 9) + ' ' + (x + 10) + ' ' + (y + 6) + '" fill="none" ' + st(2.6) + '/>';
  }
  function mouthOpen(x, y, s) {
    s = s || 1;
    var w = 9 * s, h = 15 * s;
    return '<path d="M' + (x - w) + ' ' + y + ' Q' + x + ' ' + (y + h) + ' ' + (x + w) + ' ' + y + ' Q' + x + ' ' + (y + 4 * s) + ' ' + (x - w) + ' ' + y + ' Z" fill="' + K + '" ' + st(2) + '/>' +
      '<path d="M' + (x - 5 * s) + ' ' + (y + 7 * s) + ' Q' + x + ' ' + (y + 13 * s) + ' ' + (x + 5 * s) + ' ' + (y + 7 * s) + ' Q' + x + ' ' + (y + 5 * s) + ' ' + (x - 5 * s) + ' ' + (y + 7 * s) + ' Z" fill="#ff7a8a"/>';
  }
  function heart(cx, cy, s, fill) {
    return '<path d="M' + cx + ' ' + (cy + s * 0.9) + ' C' + (cx - s * 1.5) + ' ' + (cy + s * 0.05) + ' ' + (cx - s * 0.95) + ' ' + (cy - s * 1.05) + ' ' + cx + ' ' + (cy - s * 0.35) +
      ' C' + (cx + s * 0.95) + ' ' + (cy - s * 1.05) + ' ' + (cx + s * 1.5) + ' ' + (cy + s * 0.05) + ' ' + cx + ' ' + (cy + s * 0.9) + ' Z" fill="' + fill + '" ' + st(2.2) + '/>';
  }
  function star(cx, cy, r, fill) {
    var pts = [];
    for (var i = 0; i < 10; i++) {
      var a = -Math.PI / 2 + (i * Math.PI) / 5;
      var rr = i % 2 === 0 ? r : r * 0.45;
      pts.push((cx + Math.cos(a) * rr).toFixed(1) + " " + (cy + Math.sin(a) * rr).toFixed(1));
    }
    return '<path d="M' + pts.join(" L") + ' Z" fill="' + fill + '" ' + st(2) + '/>';
  }
  function flower(x, y, c) {
    var s = "";
    for (var i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + (i * 2 * Math.PI) / 5;
      s += '<circle cx="' + (x + Math.cos(a) * 4.6).toFixed(1) + '" cy="' + (y + Math.sin(a) * 4.6).toFixed(1) + '" r="3.8" fill="' + c + '" ' + st(1.6) + '/>';
    }
    return s + '<circle cx="' + x + '" cy="' + y + '" r="2.6" fill="#ffd84d" ' + st(1.4) + '/>';
  }
  function ring(cx, cy, radius, count, r, fill) {
    var s = "";
    for (var i = 0; i < count; i++) {
      var a = (i * 2 * Math.PI) / count;
      s += '<circle cx="' + (cx + Math.cos(a) * radius).toFixed(1) + '" cy="' + (cy + Math.sin(a) * radius).toFixed(1) + '" r="' + r + '" fill="' + fill + '" ' + ST + '/>';
    }
    return s;
  }
  function body(fill, rx) {
    return '<ellipse cx="100" cy="178" rx="' + (rx || 40) + '" ry="22" fill="' + fill + '" ' + ST + '/>';
  }

  // ---------- 各タイプ ----------
  var ART = {};

  // INTJ フクロウ：片眼鏡と蝶ネクタイの軍師
  ART.INTJ = function () {
    var c = "#8f6b4e", dark = "#6f523b", disc = "#f6ead6", belly = "#ead8bb";
    return '' +
      '<path d="M54 64 L40 22 L82 46 Z" fill="' + dark + '" ' + ST + '/>' +
      '<path d="M146 64 L160 22 L118 46 Z" fill="' + dark + '" ' + ST + '/>' +
      '<path d="M100 34 C152 34 170 78 168 122 C166 166 140 190 100 190 C60 190 34 166 32 122 C30 78 48 34 100 34 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M38 112 C22 136 28 168 58 176 C50 154 48 132 38 112 Z" fill="' + dark + '" ' + ST + '/>' +
      '<path d="M162 112 C178 136 172 168 142 176 C150 154 152 132 162 112 Z" fill="' + dark + '" ' + ST + '/>' +
      '<path d="M62 152 C62 130 80 122 100 122 C120 122 138 130 138 152 C138 172 122 184 100 184 C78 184 62 172 62 152 Z" fill="' + belly + '" ' + ST + '/>' +
      '<path d="M82 150 q4 4 8 0 M98 150 q4 4 8 0 M114 150 q-4 4 -8 0 M90 164 q4 4 8 0 M106 164 q4 4 8 0" fill="none" ' + st(2) + '/>' +
      '<circle cx="76" cy="92" r="25" fill="' + disc + '" ' + ST + '/>' +
      '<circle cx="124" cy="92" r="25" fill="' + disc + '" ' + ST + '/>' +
      eyesJito(76, 124, 95, 10) +
      '<path d="M100 104 L92 113 L100 125 L108 113 Z" fill="#f2a33a" ' + ST + '/>' +
      '<circle cx="124" cy="95" r="17" fill="none" stroke="#d4a017" stroke-width="3.5"/>' +
      '<path d="M140 101 Q152 122 146 142" fill="none" stroke="#d4a017" stroke-width="2"/>' +
      '<path d="M100 134 L84 125 L84 143 Z" fill="' + G.NT + '" ' + ST + '/>' +
      '<path d="M100 134 L116 125 L116 143 Z" fill="' + G.NT + '" ' + ST + '/>' +
      '<circle cx="100" cy="134" r="4.5" fill="' + G.NT + '" ' + ST + '/>' +
      '<ellipse cx="82" cy="190" rx="10" ry="5" fill="#f2a33a" ' + ST + '/>' +
      '<ellipse cx="118" cy="190" rx="10" ry="5" fill="#f2a33a" ' + ST + '/>';
  };

  // INTP ネコ：丸メガネと「？」
  ART.INTP = function () {
    var c = "#a9afba", light = "#eceef2";
    return '' +
      '<path d="M136 180 C176 178 186 142 168 122" fill="none" stroke="' + K + '" stroke-width="17" stroke-linecap="round"/>' +
      '<path d="M136 180 C176 178 186 142 168 122" fill="none" stroke="' + c + '" stroke-width="11" stroke-linecap="round"/>' +
      body(c, 42) +
      '<ellipse cx="82" cy="193" rx="10" ry="6" fill="' + light + '" ' + ST + '/>' +
      '<ellipse cx="118" cy="193" rx="10" ry="6" fill="' + light + '" ' + ST + '/>' +
      '<path d="M50 78 L50 26 L92 52 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M150 78 L150 26 L108 52 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M57 64 L57 40 L80 54 Z" fill="#f4b6c2"/>' +
      '<path d="M143 64 L143 40 L120 54 Z" fill="#f4b6c2"/>' +
      '<ellipse cx="100" cy="102" rx="62" ry="54" fill="' + c + '" ' + ST + '/>' +
      '<path d="M100 52 v12 M88 54 l3 10 M112 54 l-3 10" stroke="#7d8492" stroke-width="4" stroke-linecap="round"/>' +
      '<ellipse cx="100" cy="124" rx="21" ry="13" fill="' + light + '"/>' +
      '<circle cx="76" cy="103" r="17" fill="#fff" fill-opacity=".35" stroke="' + G.NT + '" stroke-width="4"/>' +
      '<circle cx="124" cy="103" r="17" fill="#fff" fill-opacity=".35" stroke="' + G.NT + '" stroke-width="4"/>' +
      '<path d="M93 102 Q100 97 107 102" fill="none" stroke="' + G.NT + '" stroke-width="4"/>' +
      eyesDot(76, 124, 104, 6) +
      '<path d="M96 116 L104 116 L100 121 Z" fill="#f08aa0" ' + st(2) + '/>' +
      mouthW(100, 123) +
      '<path d="M62 120 L40 116 M62 126 L40 128 M138 120 L160 116 M138 126 L160 128" ' + st(2) + '/>' +
      '<circle cx="166" cy="40" r="17" fill="#fff" ' + ST + '/>' +
      '<text x="166" y="48" text-anchor="middle" font-size="22" font-weight="900" fill="' + G.NT + '" font-family="Arial, sans-serif">?</text>';
  };

  // ENTJ ライオン：船長の帽子
  ART.ENTJ = function () {
    var face = "#f4c66a", mane = "#d9822b";
    return '' +
      body(face, 40) +
      ring(100, 98, 58, 12, 22, mane) +
      '<circle cx="100" cy="98" r="62" fill="' + mane + '"/>' +
      '<circle cx="60" cy="64" r="14" fill="' + face + '" ' + ST + '/>' +
      '<circle cx="140" cy="64" r="14" fill="' + face + '" ' + ST + '/>' +
      '<circle cx="60" cy="64" r="7" fill="#e8a24a"/>' +
      '<circle cx="140" cy="64" r="7" fill="#e8a24a"/>' +
      '<circle cx="100" cy="102" r="48" fill="' + face + '" ' + ST + '/>' +
      '<ellipse cx="100" cy="122" rx="22" ry="15" fill="#fbe6b8"/>' +
      '<path d="M91 112 Q100 107 109 112 Q105 120 100 120 Q95 120 91 112 Z" fill="#6b3d22" ' + st(2) + '/>' +
      mouthY(100, 120) +
      eyesDot(82, 118, 98, 6) +
      '<path d="M72 86 L90 90 M128 86 L110 90" ' + st(3.5) + '/>' +
      cheeks(72, 128, 112) +
      '<path d="M60 48 C62 22 138 22 140 48 Z" fill="' + G.NT + '" ' + ST + '/>' +
      '<rect x="58" y="44" width="84" height="10" rx="4" fill="' + K + '"/>' +
      '<path d="M66 54 Q100 66 134 54 Z" fill="' + K + '" ' + ST + '/>' +
      star(100, 34, 9, "#f2c94c") +
      '<ellipse cx="80" cy="188" rx="13" ry="8" fill="' + face + '" ' + ST + '/>' +
      '<ellipse cx="120" cy="188" rx="13" ry="8" fill="' + face + '" ' + ST + '/>';
  };

  // ENTP キツネ：ゴーグルと電球
  ART.ENTP = function () {
    var c = "#ef8a3c", white = "#fff6ea", dark = "#5a3a26";
    var head = "M100 152 C70 152 38 132 36 102 C34 74 58 54 100 54 C142 54 166 74 164 102 C162 132 130 152 100 152 Z";
    return '' +
      '<path d="M126 178 C176 182 194 132 168 102 C166 136 150 158 122 162 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M168 102 C182 116 186 134 182 148 C172 140 166 122 168 102 Z" fill="' + white + '" ' + ST + '/>' +
      body(c, 36) +
      '<path d="M86 160 Q100 190 114 160 Z" fill="' + white + '"/>' +
      '<path d="M52 82 L44 22 L92 58 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M148 82 L156 22 L108 58 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M57 70 L52 38 L80 58 Z" fill="' + dark + '"/>' +
      '<path d="M143 70 L148 38 L120 58 Z" fill="' + dark + '"/>' +
      '<path d="' + head + '" fill="' + c + '"/>' +
      '<path d="M100 152 C78 152 50 138 42 114 C60 120 80 118 100 130 C120 118 140 120 158 114 C150 138 122 152 100 152 Z" fill="' + white + '"/>' +
      '<path d="' + head + '" fill="none" ' + ST + '/>' +
      '<path d="M38 80 Q100 62 162 80" fill="none" stroke="' + G.NT + '" stroke-width="7" stroke-linecap="round"/>' +
      '<circle cx="80" cy="72" r="13" fill="#c9ecff" ' + ST + '/>' +
      '<circle cx="120" cy="72" r="13" fill="#c9ecff" ' + ST + '/>' +
      '<path d="M75 67 l5 -3 M115 67 l5 -3" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
      eyeDot(78, 104, 6) + eyeHappy(122, 104, 7) +
      '<ellipse cx="100" cy="134" rx="6.5" ry="4.5" fill="' + K + '"/>' +
      '<path d="M88 141 Q100 148 113 138" fill="none" ' + st(2.6) + '/>' +
      cheeks(64, 136, 118) +
      '<circle cx="172" cy="36" r="13" fill="#ffe26a" ' + ST + '/>' +
      '<rect x="166" y="48" width="12" height="8" rx="2" fill="#b8c0cc" ' + st(2) + '/>' +
      '<path d="M172 14 v-6 M154 22 l-4 -4 M190 22 l4 -4" ' + st(2.5) + '/>';
  };

  // INFJ シカ：星のチャームと緑のスカーフ
  ART.INFJ = function () {
    var c = "#c99a6b", light = "#f3e2c7", antler = "#8b5e3c";
    var antlerL = "M80 64 C76 50 72 40 70 24 M73 44 C64 42 58 36 55 26 M71 32 C74 26 78 22 83 17";
    var antlerR = "M120 64 C124 50 128 40 130 24 M127 44 C136 42 142 36 145 26 M129 32 C126 26 122 22 117 17";
    return '' +
      body(c, 36) +
      '<path d="M66 160 Q100 176 134 160 L134 170 Q100 186 66 170 Z" fill="' + G.NF + '" ' + ST + '/>' +
      '<path d="M118 170 L128 196 L114 194 Z" fill="' + G.NF + '" ' + ST + '/>' +
      '<path d="' + antlerL + ' ' + antlerR + '" fill="none" stroke="' + K + '" stroke-width="11" stroke-linecap="round"/>' +
      '<path d="' + antlerL + ' ' + antlerR + '" fill="none" stroke="' + antler + '" stroke-width="5.5" stroke-linecap="round"/>' +
      '<path d="M58 92 C34 92 20 80 18 70 C34 66 52 74 62 84 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M142 92 C166 92 180 80 182 70 C166 66 148 74 138 84 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M53 87 C40 87 31 82 27 76 C38 74 49 78 55 83 Z" fill="#f4c7b1"/>' +
      '<path d="M147 87 C160 87 169 82 173 76 C162 74 151 78 145 83 Z" fill="#f4c7b1"/>' +
      '<ellipse cx="100" cy="108" rx="50" ry="48" fill="' + c + '" ' + ST + '/>' +
      '<circle cx="88" cy="72" r="3" fill="#fbeedd"/><circle cx="100" cy="68" r="3.5" fill="#fbeedd"/><circle cx="112" cy="72" r="3" fill="#fbeedd"/>' +
      '<ellipse cx="100" cy="132" rx="22" ry="15" fill="' + light + '"/>' +
      '<ellipse cx="100" cy="124" rx="7" ry="5" fill="' + K + '"/>' +
      mouthY(100, 128) +
      eyesClosed(80, 120, 106, 7) +
      cheeks(70, 130, 122) +
      star(150, 34, 9, "#f2d43d");
  };

  // INFP ウサギ：花かんむり
  ART.INFP = function () {
    var c = "#fbf7f2", pink = "#f6b8c4";
    return '' +
      body(c, 38) +
      '<g transform="rotate(-10 80 66)"><ellipse cx="80" cy="36" rx="15" ry="38" fill="' + c + '" ' + ST + '/><ellipse cx="80" cy="40" rx="7" ry="27" fill="' + pink + '"/></g>' +
      '<g transform="rotate(72 124 68)"><ellipse cx="124" cy="36" rx="15" ry="36" fill="' + c + '" ' + ST + '/><ellipse cx="124" cy="40" rx="7" ry="25" fill="' + pink + '"/></g>' +
      '<ellipse cx="100" cy="114" rx="56" ry="50" fill="' + c + '" ' + ST + '/>' +
      '<path d="M56 82 Q100 60 144 82" fill="none" stroke="' + G.NF + '" stroke-width="5" stroke-linecap="round"/>' +
      '<path d="M70 74 q-6 -8 -12 -4 q4 8 12 4 Z M128 70 q6 -8 12 -4 q-4 8 -12 4 Z" fill="' + G.NF + '" ' + st(1.6) + '/>' +
      flower(64, 78, "#f7a1c4") + flower(82, 69, "#ffffff") + flower(100, 66, "#f7a1c4") + flower(118, 69, "#ffffff") + flower(136, 78, "#f7a1c4") +
      eyesSparkle(80, 120, 116, 7) +
      '<path d="M96 128 L104 128 L100 133 Z" fill="#f08aa0" ' + st(1.8) + '/>' +
      mouthY(100, 133) +
      cheeks(68, 132, 130);
  };

  // ENFJ イヌ：緑のバンダナとハート
  ART.ENFJ = function () {
    var c = "#e6a95a", light = "#fbe7c6", ear = "#b9783c";
    return '' +
      body(c, 38) +
      '<path d="M64 156 Q100 170 136 156 L100 196 Z" fill="' + G.NF + '" ' + ST + '/>' +
      '<circle cx="90" cy="170" r="2.5" fill="#fff"/><circle cx="108" cy="168" r="2.5" fill="#fff"/><circle cx="100" cy="182" r="2.5" fill="#fff"/>' +
      '<circle cx="100" cy="102" r="56" fill="' + c + '" ' + ST + '/>' +
      '<path d="M56 66 C34 62 22 100 32 132 C48 132 60 108 64 80 Z" fill="' + ear + '" ' + ST + '/>' +
      '<path d="M144 66 C166 62 178 100 168 132 C152 132 140 108 136 80 Z" fill="' + ear + '" ' + ST + '/>' +
      '<ellipse cx="100" cy="126" rx="28" ry="20" fill="' + light + '"/>' +
      '<ellipse cx="100" cy="114" rx="10" ry="7" fill="' + K + '"/>' +
      '<ellipse cx="97" cy="112" rx="3" ry="2" fill="#fff"/>' +
      '<path d="M100 121 v4" ' + st(2.6) + '/>' +
      mouthOpen(100, 125, 1.1) +
      eyesHappy(78, 122, 96, 8) +
      cheeks(68, 132, 116) +
      heart(162, 40, 11, "#ff7aa2");
  };

  // ENFP カワウソ：旅人のバケットハットと貝がら
  ART.ENFP = function () {
    var c = "#a87452", light = "#ead2b7";
    return '' +
      body(c, 38) +
      '<path d="M84 174 Q100 148 116 174 Q100 182 84 174 Z" fill="#ffb3c7" ' + st(2.2) + '/>' +
      '<path d="M100 156 v20 M92 160 l3 15 M108 160 l-3 15" ' + st(1.5) + '/>' +
      '<ellipse cx="82" cy="172" rx="9" ry="7" fill="' + c + '" ' + ST + '/>' +
      '<ellipse cx="118" cy="172" rx="9" ry="7" fill="' + c + '" ' + ST + '/>' +
      '<circle cx="50" cy="86" r="10" fill="' + c + '" ' + ST + '/><circle cx="150" cy="86" r="10" fill="' + c + '" ' + ST + '/>' +
      '<circle cx="50" cy="86" r="4.5" fill="#6d4a33"/><circle cx="150" cy="86" r="4.5" fill="#6d4a33"/>' +
      '<ellipse cx="100" cy="104" rx="56" ry="50" fill="' + c + '" ' + ST + '/>' +
      '<ellipse cx="100" cy="124" rx="36" ry="24" fill="' + light + '"/>' +
      '<path d="M92 114 Q100 110 108 114 Q104 121 100 121 Q96 121 92 114 Z" fill="' + K + '"/>' +
      '<path d="M100 121 v3" ' + st(2.5) + '/>' +
      mouthOpen(100, 124, 0.9) +
      '<circle cx="82" cy="126" r="1.6" fill="' + K + '"/><circle cx="78" cy="132" r="1.6" fill="' + K + '"/><circle cx="118" cy="126" r="1.6" fill="' + K + '"/><circle cx="122" cy="132" r="1.6" fill="' + K + '"/>' +
      eyesSparkle(78, 122, 102, 6.5) +
      cheeks(66, 134, 116) +
      '<ellipse cx="100" cy="68" rx="58" ry="10" fill="' + G.NF + '" ' + ST + '/>' +
      '<path d="M60 68 C62 32 138 32 140 68 Z" fill="' + G.NF + '" ' + ST + '/>' +
      '<path d="M62 60 Q100 52 138 60" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/>' +
      star(168, 44, 9, "#ffd84d") + star(30, 132, 6, "#ffd84d");
  };

  // ISTJ ペンギン：ネクタイとクリップボード
  ART.ISTJ = function () {
    var c = "#34404f", dark = "#252e3a", white = "#fbfaf7";
    return '' +
      '<path d="M100 28 C150 28 170 76 168 122 C166 166 142 190 100 190 C58 190 34 166 32 122 C30 76 50 28 100 28 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M100 60 C78 50 52 66 54 100 C56 128 66 150 70 168 C80 184 120 184 130 168 C134 150 144 128 146 100 C148 66 122 50 100 60 Z" fill="' + white + '"/>' +
      '<path d="M36 112 C18 130 20 156 40 166 C40 146 42 128 36 112 Z" fill="' + dark + '" ' + ST + '/>' +
      eyesDot(80, 120, 98, 6) +
      '<path d="M88 111 Q100 103 112 111 Q100 124 88 111 Z" fill="#f2a33a" ' + ST + '/>' +
      cheeks(68, 132, 114) +
      '<path d="M94 132 L106 132 L104 140 L96 140 Z" fill="' + G.SJ + '" ' + st(2.2) + '/>' +
      '<path d="M96 140 L104 140 L110 164 L100 174 L90 164 Z" fill="' + G.SJ + '" ' + st(2.2) + '/>' +
      '<ellipse cx="80" cy="190" rx="11" ry="5" fill="#f2a33a" ' + ST + '/>' +
      '<ellipse cx="120" cy="190" rx="11" ry="5" fill="#f2a33a" ' + ST + '/>' +
      '<g transform="rotate(12 156 150)">' +
      '<rect x="140" y="128" width="32" height="42" rx="4" fill="#c8935a" ' + ST + '/>' +
      '<rect x="145" y="136" width="22" height="30" fill="#fff" ' + st(1.5) + '/>' +
      '<rect x="150" y="123" width="12" height="9" rx="2" fill="#9aa3ad" ' + st(2) + '/>' +
      '<path d="M148 145 l3 3 l5 -6 M148 156 l3 3 l5 -6" fill="none" stroke="' + G.SJ + '" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M159 146 h5 M159 157 h5" ' + st(1.6) + '/>' +
      '</g>' +
      '<path d="M164 112 C182 128 180 152 158 160 C158 142 158 128 164 112 Z" fill="' + dark + '" ' + ST + '/>';
  };

  // ISFJ ヒツジ：青いリボンとベル
  ART.ISFJ = function () {
    var wool = "#fffaf0", face = "#fbe3d0";
    return '' +
      body(wool, 40) +
      '<path d="M70 158 Q100 170 130 158 L130 166 Q100 178 70 166 Z" fill="' + G.SJ + '" ' + ST + '/>' +
      '<circle cx="100" cy="176" r="7" fill="#f2c94c" ' + st(2.2) + '/>' +
      '<path d="M100 178 v4" ' + st(2) + '/>' +
      ring(100, 104, 50, 11, 20, wool) +
      '<circle cx="100" cy="104" r="54" fill="' + wool + '"/>' +
      '<ellipse cx="56" cy="110" rx="16" ry="8" transform="rotate(-20 56 110)" fill="' + face + '" ' + ST + '/>' +
      '<ellipse cx="144" cy="110" rx="16" ry="8" transform="rotate(20 144 110)" fill="' + face + '" ' + ST + '/>' +
      '<ellipse cx="100" cy="114" rx="36" ry="38" fill="' + face + '" ' + ST + '/>' +
      '<circle cx="87" cy="82" r="11" fill="' + wool + '" ' + ST + '/>' +
      '<circle cx="113" cy="82" r="11" fill="' + wool + '" ' + ST + '/>' +
      '<circle cx="100" cy="77" r="12" fill="' + wool + '" ' + ST + '/>' +
      eyesHappy(86, 114, 114, 6) +
      '<path d="M96 124 Q100 127 104 124" fill="none" ' + st(2.4) + '/>' +
      mouthSmile(100, 131, 5) +
      cheeks(80, 120, 126) +
      '<path d="M140 62 L126 54 L126 70 Z" fill="' + G.SJ + '" ' + st(2.2) + '/>' +
      '<path d="M140 62 L154 54 L154 70 Z" fill="' + G.SJ + '" ' + st(2.2) + '/>' +
      '<circle cx="140" cy="62" r="4" fill="' + G.SJ + '" ' + st(2) + '/>';
  };

  // ESTJ ビーバー：ヘルメット
  ART.ESTJ = function () {
    var c = "#9c6b45", light = "#e8c9a5";
    return '' +
      '<ellipse cx="154" cy="174" rx="30" ry="14" transform="rotate(-25 154 174)" fill="#6b4a33" ' + ST + '/>' +
      '<path d="M140 168 l20 -8 M144 178 l22 -10 M150 186 l20 -9 M146 162 l10 20 M158 158 l10 20" stroke="#4d3524" stroke-width="2" stroke-linecap="round"/>' +
      body(c, 38) +
      '<ellipse cx="100" cy="184" rx="22" ry="13" fill="' + light + '"/>' +
      '<circle cx="50" cy="90" r="9" fill="' + c + '" ' + ST + '/><circle cx="150" cy="90" r="9" fill="' + c + '" ' + ST + '/>' +
      '<ellipse cx="100" cy="106" rx="54" ry="50" fill="' + c + '" ' + ST + '/>' +
      '<ellipse cx="100" cy="126" rx="26" ry="18" fill="' + light + '"/>' +
      '<path d="M91 114 Q100 109 109 114 Q105 121 100 121 Q95 121 91 114 Z" fill="' + K + '"/>' +
      '<path d="M100 121 v4 M90 126 Q100 131 110 126" fill="none" ' + st(2.5) + '/>' +
      '<rect x="93" y="127" width="14" height="12" rx="2" fill="#fff" ' + st(2) + '/>' +
      '<path d="M100 127 v12" ' + st(1.5) + '/>' +
      eyesDot(80, 120, 100, 6) +
      '<path d="M70 88 L88 91 M130 88 L112 91" ' + st(3.5) + '/>' +
      cheeks(68, 132, 116) +
      '<path d="M50 78 C50 34 150 34 150 78 Z" fill="' + G.SJ + '" ' + ST + '/>' +
      '<path d="M92 42 Q100 38 108 42 L108 78 L92 78 Z" fill="#5aa0d8" ' + st(2) + '/>' +
      '<rect x="42" y="74" width="116" height="10" rx="5" fill="' + G.SJ + '" ' + ST + '/>';
  };

  // ESFJ クマ：青いエプロンとハート
  ART.ESFJ = function () {
    var c = "#b5794a", light = "#efd2b0";
    return '' +
      body(c, 40) +
      '<path d="M74 164 L126 164 L130 198 L70 198 Z" fill="' + G.SJ + '" ' + st(2.4) + '/>' +
      heart(100, 180, 7, "#fff") +
      '<circle cx="54" cy="58" r="18" fill="' + c + '" ' + ST + '/><circle cx="146" cy="58" r="18" fill="' + c + '" ' + ST + '/>' +
      '<circle cx="54" cy="58" r="9" fill="#e3b48a"/><circle cx="146" cy="58" r="9" fill="#e3b48a"/>' +
      '<circle cx="100" cy="106" r="56" fill="' + c + '" ' + ST + '/>' +
      '<ellipse cx="100" cy="126" rx="24" ry="17" fill="' + light + '"/>' +
      '<ellipse cx="100" cy="117" rx="9" ry="6.5" fill="' + K + '"/>' +
      '<ellipse cx="97" cy="115" rx="2.6" ry="1.8" fill="#fff"/>' +
      mouthY(100, 123) +
      eyesHappy(80, 120, 102, 7) +
      cheeks(68, 132, 118);
  };

  // ISTP オオカミ：オレンジのバンダナとスパナ
  ART.ISTP = function () {
    var c = "#8b95a3", light = "#e9edf2";
    var head = "M100 156 C78 156 64 146 52 138 L40 132 L50 126 L36 116 L48 110 C40 76 62 54 100 54 C138 54 160 76 152 110 L164 116 L150 126 L160 132 L148 138 C136 146 122 156 100 156 Z";
    return '' +
      body(c, 38) +
      '<path d="M64 156 Q100 170 136 156 L100 192 Z" fill="' + G.SP + '" ' + ST + '/>' +
      '<circle cx="90" cy="168" r="2.4" fill="' + K + '"/><circle cx="110" cy="168" r="2.4" fill="' + K + '"/><circle cx="100" cy="180" r="2.4" fill="' + K + '"/>' +
      '<path d="M52 82 L50 22 L90 56 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M148 82 L150 22 L110 56 Z" fill="' + c + '" ' + ST + '/>' +
      '<path d="M58 72 L57 38 L80 58 Z" fill="#4f5966"/>' +
      '<path d="M142 72 L143 38 L120 58 Z" fill="#4f5966"/>' +
      '<path d="' + head + '" fill="' + c + '"/>' +
      '<path d="M100 156 C84 156 72 148 66 138 C74 126 86 118 100 118 C114 118 126 126 134 138 C128 148 116 156 100 156 Z" fill="' + light + '"/>' +
      '<path d="M100 62 L94 88 L100 98 L106 88 Z" fill="' + light + '"/>' +
      '<path d="' + head + '" fill="none" ' + ST + '/>' +
      '<path d="M92 128 Q100 124 108 128 Q104 135 100 135 Q96 135 92 128 Z" fill="' + K + '"/>' +
      '<path d="M100 135 v4 M100 139 Q108 144 114 138" fill="none" ' + st(2.6) + '/>' +
      eyesJito(80, 120, 104, 8) +
      '<g transform="rotate(-30 162 150)">' +
      '<rect x="156" y="132" width="12" height="52" rx="5" fill="#c3cad4" ' + ST + '/>' +
      '<path d="M148 126 A14 14 0 0 0 176 126 L170 112 L165 120 L159 120 L154 112 Z" fill="#c3cad4" ' + ST + '/>' +
      '</g>';
  };

  // ISFP パンダ：ベレー帽と絵筆
  ART.ISFP = function () {
    var w = "#fbfaf7";
    return '' +
      body(w, 40) +
      '<ellipse cx="68" cy="172" rx="12" ry="16" fill="' + K + '"/>' +
      '<ellipse cx="132" cy="172" rx="12" ry="16" fill="' + K + '"/>' +
      '<g transform="rotate(28 150 150)">' +
      '<rect x="146" y="120" width="8" height="50" rx="3" fill="#c8935a" ' + st(2.2) + '/>' +
      '<rect x="145" y="111" width="10" height="10" fill="#b8c0cc" ' + st(2.2) + '/>' +
      '<path d="M145 111 Q150 92 155 111 Z" fill="' + G.SP + '" ' + st(2.2) + '/>' +
      '</g>' +
      '<circle cx="56" cy="60" r="17" fill="' + K + '"/><circle cx="144" cy="60" r="17" fill="' + K + '"/>' +
      '<ellipse cx="100" cy="106" rx="58" ry="52" fill="' + w + '" ' + ST + '/>' +
      '<ellipse cx="78" cy="106" rx="14" ry="18" transform="rotate(30 78 106)" fill="' + K + '"/>' +
      '<ellipse cx="122" cy="106" rx="14" ry="18" transform="rotate(-30 122 106)" fill="' + K + '"/>' +
      '<circle cx="80" cy="104" r="5.5" fill="#fff"/><circle cx="120" cy="104" r="5.5" fill="#fff"/>' +
      '<circle cx="81" cy="105" r="3" fill="' + K + '"/><circle cx="119" cy="105" r="3" fill="' + K + '"/>' +
      '<ellipse cx="100" cy="124" rx="7" ry="5" fill="' + K + '"/>' +
      mouthY(100, 128) +
      cheeks(66, 134, 128) +
      '<path d="M54 70 C58 36 136 30 150 60 C128 66 82 70 54 70 Z" fill="' + G.SP + '" ' + ST + '/>' +
      '<path d="M104 38 l3 -9" ' + st(3.5) + '/>';
  };

  // ESTP トラ：はちまき
  ART.ESTP = function () {
    var c = "#f39a3d", white = "#fff4e6";
    return '' +
      body(c, 40) +
      '<path d="M68 168 l10 5 M132 168 l-10 5 M64 180 l9 3 M136 180 l-9 3" ' + st(3.5) + '/>' +
      '<circle cx="54" cy="64" r="15" fill="' + c + '" ' + ST + '/><circle cx="146" cy="64" r="15" fill="' + c + '" ' + ST + '/>' +
      '<circle cx="54" cy="64" r="7" fill="' + white + '"/><circle cx="146" cy="64" r="7" fill="' + white + '"/>' +
      '<ellipse cx="100" cy="106" rx="58" ry="50" fill="' + c + '" ' + ST + '/>' +
      '<path d="M100 152 C78 152 56 144 50 128 C64 120 82 122 100 130 C118 122 136 120 150 128 C144 144 122 152 100 152 Z" fill="' + white + '"/>' +
      '<path d="M100 58 v12 M86 60 l3 9 M114 60 l-3 9" stroke="' + K + '" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M44 102 h12 M45 113 h10 M156 102 h-12 M155 113 h-10" stroke="' + K + '" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M44 84 Q100 68 156 84 L156 94 Q100 78 44 94 Z" fill="#fff" ' + st(2.2) + '/>' +
      '<circle cx="100" cy="81" r="6" fill="#e8493d"/>' +
      '<path d="M154 88 L178 78 L172 94 Z M154 90 L174 104 L160 106 Z" fill="#fff" ' + st(2.2) + '/>' +
      eyesSparkle(80, 120, 110, 6.5) +
      '<path d="M70 99 L88 101 M130 99 L112 101" ' + st(3.2) + '/>' +
      '<path d="M93 128 Q100 124 107 128 Q104 134 100 134 Q96 134 93 128 Z" fill="#e8708a" ' + st(2) + '/>' +
      '<path d="M100 134 v3" ' + st(2.5) + '/>' +
      '<path d="M86 138 Q100 152 114 138 Q100 142 86 138 Z" fill="' + K + '" ' + st(2) + '/>' +
      '<path d="M104 141 l3 5 l3 -5 Z" fill="#fff"/>';
  };

  // ESFP オカメインコ：マイクと音符
  ART.ESFP = function () {
    var gray = "#c7cbd2", yellow = "#fbe07a";
    return '' +
      body(gray, 40) +
      '<path d="M64 166 C58 182 68 196 86 196 C80 186 76 176 76 164 Z" fill="#a9aeb7" ' + ST + '/>' +
      '<path d="M66 176 Q72 184 80 186" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' +
      '<path d="M100 58 C96 32 104 18 120 10 C112 26 113 42 112 58 Z" fill="' + yellow + '" ' + ST + '/>' +
      '<path d="M92 60 C84 38 88 24 98 14 C96 30 98 46 104 58 Z" fill="' + yellow + '" ' + ST + '/>' +
      '<circle cx="100" cy="106" r="54" fill="' + yellow + '" ' + ST + '/>' +
      '<circle cx="70" cy="122" r="12" fill="#f28c3a"/><circle cx="130" cy="122" r="12" fill="#f28c3a"/>' +
      '<path d="M92 116 Q100 108 108 116 Q104 130 100 132 Q96 130 92 116 Z" fill="#9aa0a8" ' + st(2.5) + '/>' +
      eyesSparkle(80, 120, 104, 7) +
      '<g transform="rotate(-20 156 162)">' +
      '<rect x="151" y="152" width="10" height="36" rx="4" fill="' + K + '"/>' +
      '<circle cx="156" cy="146" r="11" fill="#b8c0cc" ' + ST + '/>' +
      '<path d="M148 142 h16 M148 148 h16" ' + st(1.5) + '/>' +
      '</g>' +
      '<path d="M136 176 C146 170 152 164 152 156" fill="none" stroke="' + K + '" stroke-width="12" stroke-linecap="round"/>' +
      '<path d="M136 176 C146 170 152 164 152 156" fill="none" stroke="' + gray + '" stroke-width="6" stroke-linecap="round"/>' +
      '<path d="M30 70 v-22 l12 -4 v22" fill="none" ' + st(2.6) + '/>' +
      '<ellipse cx="27" cy="71" rx="5" ry="4" fill="' + K + '"/><ellipse cx="39" cy="67" rx="5" ry="4" fill="' + K + '"/>' +
      star(168, 46, 10, G.SP);
  };

  /**
   * 動物SVGを返す
   * @param {string} code タイプコード
   * @param {object} [opt] { title: 読み上げ用テキスト, cls: class名 }
   */
  TF.animalSvg = function (code, opt) {
    opt = opt || {};
    var fn = ART[code];
    if (!fn) return "";
    var label = opt.title || "";
    var a11y = label ? ' role="img" aria-label="' + label.replace(/"/g, "&quot;") + '"' : ' aria-hidden="true"';
    return '<svg class="' + (opt.cls || "animal") + '" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"' + a11y + '>' + fn() + '</svg>';
  };
})();
