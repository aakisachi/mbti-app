// ============================================================
//  16タイプの動物キャラクター（オリジナルSVG）
//  動物の組み合わせは、動画「全16タイプを動物に例えると【MBTI動物図鑑】」と同じ
//  すべて viewBox 0 0 200 200。身につけている小物の色はグループ色。
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

(function () {
  var K = "#2b2118"; // 線の色
  var W = 3;         // 線の太さ
  var ST = 'stroke="' + K + '" stroke-width="' + W + '" stroke-linejoin="round" stroke-linecap="round"';
  var st = function (w) { return 'stroke="' + K + '" stroke-width="' + w + '" stroke-linejoin="round" stroke-linecap="round"'; };

  var G = { NT: "#8a6cf0", NF: "#3ea36b", SJ: "#3d8bd9", SP: "#f08a24" };
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

  // ---------- 各タイプ（動画「MBTI動物図鑑」の16匹） ----------
  var ART = {};
  var S2 = st(2), S25 = st(2.5);

  // 太い線で描く「しっぽ・腕・鼻」用（外側の黒線＋中の色）
  function tube(d, fill, w) {
    w = w || 12;
    return '<path d="' + d + '" fill="none" stroke="' + K + '" stroke-width="' + (w + 6) + '" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="' + fill + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round"/>';
  }

  // INTJ カラス：自作の針金フックを持つ、静かな記憶力
  ART.INTJ = function () {
    var c = "#34303c", wing = "#24212b", belly = "#4a4555", beak = "#6f6a78";
    return `
      <path d="M94 42 C90 26 100 20 104 30 C108 20 118 24 112 42 Z" fill="${c}" ${ST}/>
      <path d="M100 38 C150 38 168 82 166 122 C164 164 140 188 100 188 C60 188 36 164 34 122 C32 82 50 38 100 38 Z" fill="${c}" ${ST}/>
      <path d="M40 112 C22 136 28 168 58 176 C50 154 48 132 40 112 Z" fill="${wing}" ${ST}/>
      <path d="M64 150 C64 132 82 126 100 126 C118 126 136 132 136 150 C136 170 120 182 100 182 C80 182 64 170 64 150 Z" fill="${belly}"/>
      <path d="M66 96 A12 10 0 0 0 90 96 Z" fill="#fff" ${S2}/>
      <path d="M110 96 A12 10 0 0 0 134 96 Z" fill="#fff" ${S2}/>
      <circle cx="80" cy="99.5" r="4.6" fill="${K}"/><circle cx="124" cy="99.5" r="4.6" fill="${K}"/>
      <circle cx="78.6" cy="98" r="1.4" fill="#fff"/><circle cx="122.6" cy="98" r="1.4" fill="#fff"/>
      <path d="M62 95.5 L94 95.5 M106 95.5 L138 95.5" ${st(3.4)}/>
      <path d="M86 108 L114 108 L100 132 Z" fill="${beak}" ${ST}/>
      <path d="M89 115 L111 115" stroke="#4d4955" stroke-width="2"/>
      ${cheeks(66, 134, 116, "#ff9fae")}
      <path d="M100 140 L86 132 L86 148 Z M100 140 L114 132 L114 148 Z" fill="${G.NT}" ${S2}/>
      <circle cx="100" cy="140" r="4" fill="${G.NT}" ${S2}/>
      <path d="M152 162 L152 124 Q152 112 163 112 Q173 112 173 122 L173 128" fill="none" stroke="#2b2118" stroke-width="7" stroke-linecap="round"/>
      <path d="M152 162 L152 124 Q152 112 163 112 Q173 112 173 122 L173 128" fill="none" stroke="#d9c27a" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M160 112 C178 128 176 154 150 168 C152 148 152 130 160 112 Z" fill="${wing}" ${ST}/>
      <path d="M84 186 l-6 8 M88 187 v9 M92 186 l6 8 M108 186 l-6 8 M112 187 v9 M116 186 l6 8" stroke="${beak}" stroke-width="4" stroke-linecap="round"/>
    `;
  };

  // INTP タコ：脳が9個、会議は終わらない
  ART.INTP = function () {
    var c = "#ef7f70", light = "#fbb8ae", deep = "#d9604f";
    var legs = [[52, 166, 30], [76, 176, 12], [100, 180, 0], [124, 176, -12], [148, 166, -30]].map(function (l) {
      return '<ellipse cx="' + l[0] + '" cy="' + l[1] + '" rx="13" ry="24" transform="rotate(' + l[2] + ' ' + l[0] + ' ' + l[1] + ')" fill="' + c + '" ' + ST + '/>' +
        '<circle cx="' + (l[0] - l[2] * 0.25) + '" cy="' + (l[1] + 12) + '" r="3.2" fill="' + light + '" ' + st(1.4) + '/>';
    }).join("");
    return `
      ${legs}
      <path d="M100 26 C150 26 166 66 162 102 C159 130 140 148 100 148 C60 148 41 130 38 102 C34 66 50 26 100 26 Z" fill="${c}" ${ST}/>
      <circle cx="72" cy="56" r="7" fill="${light}"/><circle cx="128" cy="50" r="5" fill="${light}"/><circle cx="112" cy="40" r="4" fill="${light}"/>
      <circle cx="78" cy="104" r="16" fill="#fff" fill-opacity=".4" stroke="${G.NT}" stroke-width="4"/>
      <circle cx="122" cy="104" r="16" fill="#fff" fill-opacity=".4" stroke="${G.NT}" stroke-width="4"/>
      <path d="M94 103 Q100 98 106 103" fill="none" stroke="${G.NT}" stroke-width="4"/>
      ${eyesDot(78, 122, 105, 5.6)}
      ${cheeks(60, 140, 124, "#ff6f8a")}
      <ellipse cx="100" cy="128" rx="6" ry="5" fill="${deep}" ${st(2.2)}/>
      <circle cx="160" cy="30" r="15" fill="#fff" ${ST}/><circle cx="144" cy="50" r="5" fill="#fff" ${S2}/>
      <text x="160" y="37" text-anchor="middle" font-size="19" font-weight="900" fill="${G.NT}" font-family="Arial, sans-serif">9</text>
    `;
  };

  // ENTJ シャチ：かわいい顔して、頂点（王冠つき）
  ART.ENTJ = function () {
    var c = "#262630";
    return `
      <path d="M96 50 C100 24 114 12 126 10 C120 26 118 40 120 52 Z" fill="${c}" ${ST}/>
      <path d="M100 44 C150 44 170 88 166 126 C162 166 136 186 100 186 C64 186 38 166 34 126 C30 88 50 44 100 44 Z" fill="${c}" ${ST}/>
      <path d="M42 138 C20 146 16 168 32 172 C46 172 52 158 50 146 Z" fill="${c}" ${ST}/>
      <path d="M158 138 C180 146 184 168 168 172 C154 172 148 158 150 146 Z" fill="${c}" ${ST}/>
      <path d="M100 116 C74 116 60 138 62 160 C66 182 134 182 138 160 C140 138 126 116 100 116 Z" fill="#fbfbf8"/>
      <ellipse cx="68" cy="88" rx="15" ry="9" transform="rotate(-18 68 88)" fill="#fbfbf8"/>
      <ellipse cx="132" cy="88" rx="15" ry="9" transform="rotate(18 132 88)" fill="#fbfbf8"/>
      ${eyesSparkle(82, 118, 104, 6.4)}
      <path d="M72 94 L88 97 M128 94 L112 97" stroke="#fbfbf8" stroke-width="3.2" stroke-linecap="round"/>
      ${cheeks(70, 130, 128)}
      <path d="M88 128 Q100 138 114 126" fill="none" ${st(2.8)}/>
      <path d="M58 44 L62 26 L72 38 L80 22 L88 38 L96 28 L98 46 Z" fill="#f5c542" ${S25} transform="rotate(-14 78 36)"/>
      <circle cx="80" cy="30" r="2.6" fill="${G.NT}" transform="rotate(-14 78 36)"/>
    `;
  };

  // ENTP キツネ：思いついたら、頭から（ゴーグルと電球）
  ART.ENTP = function () {
    var c = "#ef8a3c", white = "#fff6ea", dark = "#5a3a26";
    var head = "M100 152 C70 152 38 132 36 102 C34 74 58 54 100 54 C142 54 166 74 164 102 C162 132 130 152 100 152 Z";
    return `
      <path d="M126 178 C176 182 194 132 168 102 C166 136 150 158 122 162 Z" fill="${c}" ${ST}/>
      <path d="M168 102 C182 116 186 134 182 148 C172 140 166 122 168 102 Z" fill="${white}" ${ST}/>
      ${body(c, 36)}
      <path d="M86 160 Q100 190 114 160 Z" fill="${white}"/>
      <path d="M52 82 L44 22 L92 58 Z" fill="${c}" ${ST}/>
      <path d="M148 82 L156 22 L108 58 Z" fill="${c}" ${ST}/>
      <path d="M57 70 L52 38 L80 58 Z" fill="${dark}"/><path d="M143 70 L148 38 L120 58 Z" fill="${dark}"/>
      <path d="${head}" fill="${c}"/>
      <path d="M100 152 C78 152 50 138 42 114 C60 120 80 118 100 130 C120 118 140 120 158 114 C150 138 122 152 100 152 Z" fill="${white}"/>
      <path d="${head}" fill="none" ${ST}/>
      <path d="M38 80 Q100 62 162 80" fill="none" stroke="${G.NT}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="80" cy="72" r="13" fill="#c9ecff" ${ST}/><circle cx="120" cy="72" r="13" fill="#c9ecff" ${ST}/>
      <path d="M75 67 l5 -3 M115 67 l5 -3" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
      ${eyeDot(78, 104, 6)}${eyeHappy(122, 104, 7)}
      <ellipse cx="100" cy="134" rx="6.5" ry="4.5" fill="${K}"/>
      <path d="M88 141 Q100 148 113 138" fill="none" ${st(2.6)}/>
      ${cheeks(64, 136, 118)}
      <circle cx="172" cy="36" r="13" fill="#ffe26a" ${ST}/>
      <rect x="166" y="48" width="12" height="8" rx="2" fill="#b8c0cc" ${S2}/>
      <path d="M172 14 v-6 M154 22 l-4 -4 M190 22 l4 -4" ${st(2.5)}/>
    `;
  };

  // INFJ オオカミ：世界一、誤解されてる（月と緑のスカーフ）
  ART.INFJ = function () {
    var c = "#8f99a8", light = "#eef1f5";
    var head = "M100 156 C78 156 64 146 52 138 L40 132 L50 126 L36 116 L48 110 C40 76 62 54 100 54 C138 54 160 76 152 110 L164 116 L150 126 L160 132 L148 138 C136 146 122 156 100 156 Z";
    return `
      ${body(c, 38)}
      <path d="M62 156 Q100 172 138 156 L138 166 Q100 182 62 166 Z" fill="${G.NF}" ${ST}/>
      <path d="M120 166 L130 194 L114 192 Z" fill="${G.NF}" ${ST}/>
      <path d="M52 82 L50 22 L90 56 Z" fill="${c}" ${ST}/>
      <path d="M148 82 L150 22 L110 56 Z" fill="${c}" ${ST}/>
      <path d="M58 72 L57 38 L80 58 Z" fill="#59636f"/><path d="M142 72 L143 38 L120 58 Z" fill="#59636f"/>
      <path d="${head}" fill="${c}"/>
      <path d="M100 156 C84 156 72 148 66 138 C74 126 86 118 100 118 C114 118 126 126 134 138 C128 148 116 156 100 156 Z" fill="${light}"/>
      <path d="M100 62 L94 88 L100 98 L106 88 Z" fill="${light}"/>
      <path d="${head}" fill="none" ${ST}/>
      <path d="M92 128 Q100 124 108 128 Q104 135 100 135 Q96 135 92 128 Z" fill="${K}"/>
      ${mouthY(100, 135)}
      ${eyesClosed(80, 120, 104, 7)}
      ${cheeks(68, 132, 120)}
      <path d="M168 22 A16 16 0 1 0 184 46 A12 12 0 1 1 168 22 Z" fill="#f5d76e" ${S2}/>
    `;
  };

  // INFP ハムスター：本音は、持ち帰り（頬袋パンパン）
  ART.INFP = function () {
    var c = "#f2c08a", white = "#fff6ea", pink = "#f7b8b0";
    return `
      <circle cx="60" cy="62" r="15" fill="${c}" ${ST}/><circle cx="140" cy="62" r="15" fill="${c}" ${ST}/>
      <circle cx="60" cy="62" r="7.5" fill="${pink}"/><circle cx="140" cy="62" r="7.5" fill="${pink}"/>
      <ellipse cx="100" cy="120" rx="68" ry="64" fill="${c}" ${ST}/>
      <path d="M100 92 C70 92 54 114 58 140 C62 170 80 182 100 182 C120 182 138 170 142 140 C146 114 130 92 100 92 Z" fill="${white}"/>
      <ellipse cx="52" cy="128" rx="24" ry="21" fill="${white}" ${ST}/>
      <ellipse cx="148" cy="128" rx="24" ry="21" fill="${white}" ${ST}/>
      <ellipse cx="50" cy="126" rx="9" ry="5" fill="${PINK}" opacity=".55"/><ellipse cx="150" cy="126" rx="9" ry="5" fill="${PINK}" opacity=".55"/>
      ${eyesSparkle(82, 118, 106, 6.2)}
      <path d="M96 118 L104 118 L100 123 Z" fill="#f08aa0" ${st(1.6)}/>
      ${mouthY(100, 123)}
      <ellipse cx="100" cy="154" rx="8" ry="12" fill="#6e5a48" ${S2}/>
      <path d="M100 144 v20" stroke="#efe3d2" stroke-width="2"/>
      <ellipse cx="88" cy="154" rx="7" ry="6" fill="${pink}" ${S2}/><ellipse cx="112" cy="154" rx="7" ry="6" fill="${pink}" ${S2}/>
      <ellipse cx="78" cy="184" rx="10" ry="5" fill="${pink}" ${S2}/><ellipse cx="122" cy="184" rx="10" ry="5" fill="${pink}" ${S2}/>
      <path d="M100 58 C92 46 98 36 110 38 C112 50 106 56 100 58 Z" fill="${G.NF}" ${S2}/>
      <path d="M100 58 L100 64" ${S2}/>
    `;
  };

  // ENFJ ゾウ：優しさに、証拠がある（鼻でハート）
  ART.ENFJ = function () {
    var c = "#a9b4c8", inner = "#f3c4cd";
    return `
      ${body(c, 40)}
      <path d="M64 156 Q100 170 136 156 L100 194 Z" fill="${G.NF}" ${ST}/>
      <circle cx="92" cy="170" r="2.4" fill="#fff"/><circle cx="108" cy="170" r="2.4" fill="#fff"/><circle cx="100" cy="182" r="2.4" fill="#fff"/>
      <ellipse cx="46" cy="102" rx="34" ry="40" fill="${c}" ${ST}/><ellipse cx="154" cy="102" rx="34" ry="40" fill="${c}" ${ST}/>
      <ellipse cx="50" cy="104" rx="20" ry="26" fill="${inner}"/><ellipse cx="150" cy="104" rx="20" ry="26" fill="${inner}"/>
      <ellipse cx="100" cy="100" rx="50" ry="48" fill="${c}" ${ST}/>
      <path d="M96 52 C94 44 100 40 104 46" fill="none" ${S25}/>
      ${tube("M100 112 C100 138 96 154 110 160 C122 164 130 150 122 144", c, 16)}
      ${heart(132, 130, 9, "#ff7aa2")}
      ${eyesHappy(78, 122, 96, 7)}
      ${cheeks(68, 132, 112)}
    `;
  };

  // ENFP カワウソ：人生、全部おもちゃ（小石でジャグリング）
  ART.ENFP = function () {
    var c = "#a87452", light = "#ead2b7", stone = "#b9c0c9";
    return `
      ${body(c, 38)}
      <ellipse cx="100" cy="168" rx="10" ry="8" fill="${stone}" ${S2}/>
      <ellipse cx="86" cy="170" rx="9" ry="7" fill="${c}" ${ST}/><ellipse cx="114" cy="170" rx="9" ry="7" fill="${c}" ${ST}/>
      <circle cx="50" cy="86" r="10" fill="${c}" ${ST}/><circle cx="150" cy="86" r="10" fill="${c}" ${ST}/>
      <circle cx="50" cy="86" r="4.5" fill="#6d4a33"/><circle cx="150" cy="86" r="4.5" fill="#6d4a33"/>
      <ellipse cx="100" cy="104" rx="56" ry="50" fill="${c}" ${ST}/>
      <ellipse cx="100" cy="124" rx="36" ry="24" fill="${light}"/>
      <path d="M92 114 Q100 110 108 114 Q104 121 100 121 Q96 121 92 114 Z" fill="${K}"/>
      <path d="M100 121 v3" ${st(2.5)}/>
      ${mouthOpen(100, 124, 0.9)}
      <circle cx="82" cy="126" r="1.6" fill="${K}"/><circle cx="78" cy="132" r="1.6" fill="${K}"/><circle cx="118" cy="126" r="1.6" fill="${K}"/><circle cx="122" cy="132" r="1.6" fill="${K}"/>
      ${eyesSparkle(78, 122, 102, 6.5)}
      ${cheeks(66, 134, 116)}
      <ellipse cx="100" cy="68" rx="58" ry="10" fill="${G.NF}" ${ST}/>
      <path d="M60 68 C62 32 138 32 140 68 Z" fill="${G.NF}" ${ST}/>
      <path d="M62 60 Q100 52 138 60" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".85"/>
      <path d="M150 54 Q168 30 182 48" fill="none" stroke="${K}" stroke-width="2" stroke-dasharray="3 5" stroke-linecap="round"/>
      <ellipse cx="150" cy="56" rx="8" ry="6.5" fill="${stone}" ${S2}/>
      <ellipse cx="182" cy="50" rx="7" ry="6" fill="${stone}" ${S2}/>
      ${star(30, 120, 6, "#ffd84d")}
    `;
  };

  // ISTJ ビーバー：気になったら、直すまで（ヘルメットと補修用の枝）
  ART.ISTJ = function () {
    var c = "#9c6b45", light = "#e8c9a5";
    return `
      <ellipse cx="154" cy="174" rx="30" ry="14" transform="rotate(-25 154 174)" fill="#6b4a33" ${ST}/>
      <path d="M140 168 l20 -8 M144 178 l22 -10 M150 186 l20 -9 M146 162 l10 20 M158 158 l10 20" stroke="#4d3524" stroke-width="2" stroke-linecap="round"/>
      ${body(c, 38)}
      <ellipse cx="100" cy="184" rx="22" ry="13" fill="${light}"/>
      ${tube("M30 160 L72 146", "#a8743f", 8)}
      <path d="M32 152 C26 142 32 136 40 140 C40 148 36 152 32 152 Z" fill="${G.NF}" ${st(1.8)}/>
      <ellipse cx="72" cy="150" rx="9" ry="7" fill="${c}" ${ST}/>
      <circle cx="50" cy="90" r="9" fill="${c}" ${ST}/><circle cx="150" cy="90" r="9" fill="${c}" ${ST}/>
      <ellipse cx="100" cy="106" rx="54" ry="50" fill="${c}" ${ST}/>
      <ellipse cx="100" cy="126" rx="26" ry="18" fill="${light}"/>
      <path d="M91 114 Q100 109 109 114 Q105 121 100 121 Q95 121 91 114 Z" fill="${K}"/>
      <path d="M100 121 v4 M90 126 Q100 131 110 126" fill="none" ${st(2.5)}/>
      <rect x="93" y="127" width="14" height="12" rx="2" fill="#fff" ${S2}/>
      <path d="M100 127 v12" ${st(1.5)}/>
      ${eyesDot(80, 120, 100, 6)}
      <path d="M70 88 L88 91 M130 88 L112 91" ${st(3.5)}/>
      ${cheeks(68, 132, 116)}
      <path d="M50 78 C50 34 150 34 150 78 Z" fill="${G.SJ}" ${ST}/>
      <path d="M92 42 Q100 38 108 42 L108 78 L92 78 Z" fill="#6ba7e3" ${S2}/>
      <rect x="42" y="74" width="116" height="10" rx="5" fill="${G.SJ}" ${ST}/>
    `;
  };

  // ISFJ 秋田犬：見返りなしで、待てる（青い首輪）
  ART.ISFJ = function () {
    var c = "#e7a066", white = "#fff7ec", inner = "#c47a43";
    return `
      ${tube("M132 172 C160 172 168 146 152 138 C140 132 134 148 146 152", c, 16)}
      ${body(c, 38)}
      <path d="M80 160 Q100 176 120 160 L120 196 L80 196 Z" fill="${white}"/>
      <path d="M66 158 Q100 172 134 158 L134 166 Q100 180 66 166 Z" fill="${G.SJ}" ${ST}/>
      <circle cx="100" cy="176" r="6" fill="#f5c542" ${S2}/>
      <path d="M54 82 L58 34 L92 62 Z" fill="${c}" ${ST}/><path d="M146 82 L142 34 L108 62 Z" fill="${c}" ${ST}/>
      <path d="M61 72 L63 46 L82 62 Z" fill="${inner}"/><path d="M139 72 L137 46 L118 62 Z" fill="${inner}"/>
      <ellipse cx="100" cy="106" rx="56" ry="50" fill="${c}" ${ST}/>
      <path d="M100 154 C76 154 54 142 52 120 C62 110 80 112 100 124 C120 112 138 110 148 120 C146 142 124 154 100 154 Z" fill="${white}"/>
      <ellipse cx="80" cy="88" rx="6" ry="4" fill="${white}"/><ellipse cx="120" cy="88" rx="6" ry="4" fill="${white}"/>
      ${eyesDot(80, 120, 102, 5.6)}
      <ellipse cx="100" cy="126" rx="9" ry="6.5" fill="${K}"/><ellipse cx="97" cy="124" rx="2.6" ry="1.8" fill="#fff"/>
      ${mouthY(100, 132)}
      ${cheeks(66, 134, 120)}
    `;
  };

  // ESTJ ボーダーコリー：仕事が、ごほうび（笛と青いバンダナ）
  ART.ESTJ = function () {
    var c = "#2c2b31", white = "#fbfaf6";
    return `
      ${tube("M136 176 C164 172 176 150 168 132", c, 14)}
      ${body(c, 38)}
      <path d="M84 158 L100 196 L116 158 Z" fill="${white}"/>
      <path d="M64 156 Q100 170 136 156 L100 190 Z" fill="${G.SJ}" ${ST}/>
      <path d="M54 84 L56 38 L90 62 Z" fill="${c}" ${ST}/>
      <path d="M146 84 L144 38 L110 62 Z" fill="${c}" ${ST}/>
      <path d="M56 38 L50 54 L66 50 Z M144 38 L150 54 L134 50 Z" fill="${c}" ${S2}/>
      <path d="M61 70 L62 52 L78 63 Z M139 70 L138 52 L122 63 Z" fill="#55525c"/>
      <ellipse cx="100" cy="106" rx="54" ry="50" fill="${c}" ${ST}/>
      <path d="M100 58 C95 78 92 96 90 112 C76 118 66 132 70 146 C80 158 120 158 130 146 C134 132 124 118 110 112 C108 96 105 78 100 58 Z" fill="${white}"/>
      ${eyesSparkle(78, 122, 102, 6.2)}
      <path d="M68 90 L86 93 M132 90 L114 93" stroke="${white}" stroke-width="3.2" stroke-linecap="round"/>
      <ellipse cx="100" cy="128" rx="9" ry="6.5" fill="${K}"/>
      <path d="M100 134 v3" ${st(2.5)}/>
      ${mouthOpen(100, 137, 0.85)}
      ${cheeks(76, 124, 132)}
      <path d="M88 156 L100 172 L112 156" fill="none" stroke="#f5c542" stroke-width="2.5"/>
      <rect x="93" y="170" width="16" height="9" rx="4" fill="#c9d1db" ${S2}/>
    `;
  };

  // ESFJ カピバラ：輪の真ん中が、定位置（頭にタオルと小鳥）
  ART.ESFJ = function () {
    var c = "#b98a5e", deep = "#8f6541";
    return `
      ${body(c, 42)}
      <circle cx="60" cy="66" r="9" fill="${c}" ${ST}/><circle cx="140" cy="66" r="9" fill="${c}" ${ST}/>
      <path d="M52 94 C52 64 74 54 100 54 C126 54 148 64 148 94 L150 132 C150 158 128 168 100 168 C72 168 50 158 50 132 Z" fill="${c}" ${ST}/>
      <path d="M62 132 C62 116 80 110 100 110 C120 110 138 116 138 132 C138 152 122 162 100 162 C78 162 62 152 62 132 Z" fill="${deep}" opacity=".45"/>
      <ellipse cx="90" cy="128" rx="4" ry="6" fill="${K}"/><ellipse cx="110" cy="128" rx="4" ry="6" fill="${K}"/>
      <path d="M92 146 Q100 152 108 146" fill="none" ${st(2.6)}/>
      ${eyesClosed(76, 124, 94, 8)}
      ${cheeks(66, 134, 108)}
      <rect x="70" y="40" width="60" height="20" rx="7" fill="${G.SJ}" ${ST}/>
      <path d="M80 40 v20 M90 40 v20" stroke="#fff" stroke-width="3" opacity=".7"/>
      <circle cx="112" cy="28" r="11" fill="#ffd84d" ${ST}/>
      <path d="M122 27 L131 30 L122 33 Z" fill="#f08a24" ${st(1.6)}/>
      <circle cx="115" cy="25" r="2" fill="${K}"/>
      <path d="M104 30 Q100 36 106 36" fill="none" ${st(2)}/>
    `;
  };

  // ISTP ラッコ：マイ道具で、生きていく（お気に入りの石）
  ART.ISTP = function () {
    var c = "#8a6248", face = "#efdcc4", stone = "#9aa3ad";
    return `
      <path d="M14 184 Q34 172 54 184 T94 184 T134 184 T174 184 T200 184 L200 200 L14 200 Z" fill="#a9dcf5" opacity=".9"/>
      ${body(c, 42)}
      <ellipse cx="100" cy="166" rx="13" ry="10" fill="${stone}" ${S2}/>
      <path d="M92 162 l6 -3 M104 160 l5 4" stroke="#7d8692" stroke-width="2" stroke-linecap="round"/>
      <ellipse cx="84" cy="168" rx="9" ry="7" fill="${c}" ${ST}/><ellipse cx="116" cy="168" rx="9" ry="7" fill="${c}" ${ST}/>
      <circle cx="54" cy="74" r="8" fill="${c}" ${ST}/><circle cx="146" cy="74" r="8" fill="${c}" ${ST}/>
      <ellipse cx="100" cy="98" rx="54" ry="48" fill="${c}" ${ST}/>
      <ellipse cx="100" cy="106" rx="44" ry="38" fill="${face}"/>
      ${eyesJito(80, 120, 98, 7.5)}
      <path d="M90 110 Q100 105 110 110 Q106 118 100 118 Q94 118 90 110 Z" fill="${K}"/>
      <path d="M100 118 v3 M92 124 Q100 128 108 124" fill="none" ${st(2.4)}/>
      <circle cx="80" cy="118" r="1.6" fill="${K}"/><circle cx="76" cy="124" r="1.6" fill="${K}"/><circle cx="120" cy="118" r="1.6" fill="${K}"/><circle cx="124" cy="124" r="1.6" fill="${K}"/>
      ${cheeks(66, 134, 112)}
      <path d="M122 176 C118 166 128 160 134 166 C140 160 150 166 146 176 Z" fill="${G.SP}" ${S2}/>
      <path d="M128 170 L133 175 M138 169 L140 175" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
    `;
  };

  // ISFP ネコ：気分屋なのに、全部絵になる（ベレー帽と絵筆）
  ART.ISFP = function () {
    var c = "#fbf6ee", orange = "#f2a35b", dark = "#4a3e3a";
    return `
      ${tube("M136 180 C176 178 186 142 168 122", c, 11)}
      ${body(c, 42)}
      <ellipse cx="82" cy="193" rx="10" ry="6" fill="${c}" ${ST}/><ellipse cx="118" cy="193" rx="10" ry="6" fill="${c}" ${ST}/>
      <g transform="rotate(26 152 150)">
        <rect x="148" y="122" width="8" height="48" rx="3" fill="#c8935a" ${S2}/>
        <rect x="147" y="113" width="10" height="10" fill="#b8c0cc" ${S2}/>
        <path d="M147 113 Q152 94 157 113 Z" fill="${G.SP}" ${S2}/>
      </g>
      <path d="M50 78 L50 26 L92 52 Z" fill="${c}" ${ST}/><path d="M150 78 L150 26 L108 52 Z" fill="${c}" ${ST}/>
      <path d="M57 64 L57 40 L80 54 Z" fill="#f4b6c2"/><path d="M143 64 L143 40 L120 54 Z" fill="#f4b6c2"/>
      <ellipse cx="100" cy="102" rx="62" ry="54" fill="${c}" ${ST}/>
      <path d="M56 70 C70 58 84 60 90 72 C80 86 62 86 52 82 Z" fill="${orange}"/>
      <path d="M126 64 C140 60 154 70 154 84 C142 88 130 82 126 64 Z" fill="${dark}"/>
      <ellipse cx="100" cy="102" rx="62" ry="54" fill="none" ${ST}/>
      ${eyesClosed(78, 122, 104, 8)}
      <path d="M96 116 L104 116 L100 121 Z" fill="#f08aa0" ${S2}/>
      ${mouthW(100, 123)}
      <path d="M62 120 L40 116 M62 126 L40 128 M138 120 L160 116 M138 126 L160 128" ${S2}/>
      ${cheeks(70, 130, 118)}
      <path d="M48 60 C52 28 132 22 148 52 C124 58 78 62 48 60 Z" fill="${G.SP}" ${ST}/>
      <path d="M100 30 l3 -9" ${st(3.5)}/>
    `;
  };

  // ESTP カンガルー：後ろへは、歩けない（ボクシンググローブ）
  ART.ESTP = function () {
    var c = "#d99c60", light = "#f6dcb8", inner = "#f3b3a8", glove = "#f0702a";
    return `
      ${tube("M64 178 C30 182 18 168 24 150", c, 18)}
      ${body(c, 40)}
      <path d="M78 170 Q100 184 122 170" fill="none" ${S25}/>
      <ellipse cx="100" cy="182" rx="20" ry="10" fill="${light}"/>
      <ellipse cx="72" cy="44" rx="12" ry="30" transform="rotate(-14 72 44)" fill="${c}" ${ST}/>
      <ellipse cx="128" cy="44" rx="12" ry="30" transform="rotate(14 128 44)" fill="${c}" ${ST}/>
      <ellipse cx="72" cy="46" rx="5" ry="20" transform="rotate(-14 72 46)" fill="${inner}"/>
      <ellipse cx="128" cy="46" rx="5" ry="20" transform="rotate(14 128 46)" fill="${inner}"/>
      <ellipse cx="100" cy="104" rx="50" ry="46" fill="${c}" ${ST}/>
      <ellipse cx="100" cy="124" rx="26" ry="18" fill="${light}"/>
      ${eyesSparkle(80, 120, 100, 6.2)}
      <path d="M70 88 L88 91 M130 88 L112 91" ${st(3.4)}/>
      <ellipse cx="100" cy="116" rx="8" ry="5.5" fill="${K}"/>
      <path d="M100 121 v3" ${st(2.5)}/>
      <path d="M88 126 Q100 140 112 126 Q100 130 88 126 Z" fill="${K}" ${S2}/>
      <path d="M104 128 l3 4 l3 -4 Z" fill="#fff"/>
      ${cheeks(66, 134, 116)}
      <circle cx="68" cy="156" r="17" fill="${glove}" ${ST}/><circle cx="132" cy="156" r="17" fill="${glove}" ${ST}/>
      <path d="M58 168 Q68 174 78 168 M122 168 Q132 174 142 168" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>
      <path d="M62 150 q6 -6 12 0 M126 150 q6 -6 12 0" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>
    `;
  };

  // ESFP イルカ：拍手で、生きてる（ボールとしぶき）
  ART.ESFP = function () {
    var c = "#7fb7e2", belly = "#f6fbff", snout = "#a9d0ee";
    return `
      <path d="M96 46 C100 24 114 14 126 14 C118 28 116 40 118 52 Z" fill="${c}" ${ST}/>
      <path d="M100 40 C148 40 166 80 162 118 C158 158 134 182 100 182 C66 182 42 158 38 118 C34 80 52 40 100 40 Z" fill="${c}" ${ST}/>
      <path d="M42 136 C22 140 16 160 30 166 C44 168 50 154 50 144 Z" fill="${c}" ${ST}/>
      <path d="M158 136 C178 140 184 160 170 166 C156 168 150 154 150 144 Z" fill="${c}" ${ST}/>
      <path d="M100 116 C78 116 66 134 68 154 C72 176 128 176 132 154 C134 134 122 116 100 116 Z" fill="${belly}"/>
      <path d="M84 112 Q100 102 116 112 Q120 128 100 132 Q80 128 84 112 Z" fill="${snout}" ${S25}/>
      <path d="M88 122 Q100 128 112 122" fill="none" ${st(2.4)}/>
      ${eyesSparkle(76, 124, 94, 6.6)}
      ${cheeks(66, 134, 110)}
      <circle cx="48" cy="40" r="17" fill="#fff" ${ST}/>
      <path d="M48 23 C40 32 40 48 48 57 C56 48 56 32 48 23 Z" fill="${G.SP}"/>
      <path d="M31 40 L65 40" stroke="${G.SP}" stroke-width="4"/>
      <circle cx="48" cy="40" r="17" fill="none" ${ST}/>
      <path d="M150 70 q4 -8 8 0 q-4 6 -8 0 Z M170 92 q3 -6 6 0 q-3 5 -6 0 Z M24 92 q3 -6 6 0 q-3 5 -6 0 Z" fill="#a9dcf5" ${st(1.6)}/>
    `;
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
