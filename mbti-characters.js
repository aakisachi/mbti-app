// ========== 16 original cute character SVGs ==========
// Each character is a round-faced figure with a distinctive
// prop + color + expression that hints at the type's essence.
// Kept intentionally simple & hand-drawn to match project tone.
//
// All share the base viewBox 0 0 200 220 and a consistent
// stroke/weight so they look like a family.

const INK = "#2a2418";
const SW = 2.5;

function base(skin, bodyFill, accessoryHex, parts) {
  return `
<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">
  <!-- body -->
  <path d="M 60 205 Q 60 155 100 155 Q 140 155 140 205 Z"
        fill="${bodyFill}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
  <!-- neck / shoulder hint -->
  <path d="M 80 160 Q 100 168 120 160" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
  <!-- head -->
  <circle cx="100" cy="100" r="60" fill="${skin}" stroke="${INK}" stroke-width="${SW}"/>
  ${parts}
</svg>`;
}

// helpers
const mouthSmile = (y = 118) =>
  `<path d="M 85 ${y} Q 100 ${y+10} 115 ${y}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>`;
const mouthSmall = (y = 120) =>
  `<path d="M 92 ${y} Q 100 ${y+4} 108 ${y}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>`;
const mouthGrin = (y = 118) =>
  `<path d="M 82 ${y} Q 100 ${y+14} 118 ${y} L 100 ${y+2} Z" fill="${INK}" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>`;
const mouthOpen = (y = 120) =>
  `<ellipse cx="100" cy="${y+4}" rx="7" ry="5" fill="${INK}"/>`;
const mouthFlat = (y = 120) =>
  `<path d="M 90 ${y} L 110 ${y}" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>`;
const mouthWave = (y = 120) =>
  `<path d="M 88 ${y} Q 94 ${y-3} 100 ${y} T 112 ${y}" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>`;

const eyesDot = (dy = 0) =>
  `<circle cx="82" cy="${100+dy}" r="4" fill="${INK}"/>
   <circle cx="118" cy="${100+dy}" r="4" fill="${INK}"/>`;
const eyesCurve = () =>
  `<path d="M 77 102 Q 82 96 87 102" stroke="${INK}" stroke-width="${SW}" fill="none" stroke-linecap="round"/>
   <path d="M 113 102 Q 118 96 123 102" stroke="${INK}" stroke-width="${SW}" fill="none" stroke-linecap="round"/>`;
const eyesSparkle = () =>
  `<circle cx="82" cy="100" r="5" fill="${INK}"/><circle cx="84" cy="98" r="1.5" fill="#fff"/>
   <circle cx="118" cy="100" r="5" fill="${INK}"/><circle cx="120" cy="98" r="1.5" fill="#fff"/>`;
const eyesGlasses = () =>
  `<circle cx="82" cy="102" r="13" fill="#fffaf0" stroke="${INK}" stroke-width="${SW}"/>
   <circle cx="118" cy="102" r="13" fill="#fffaf0" stroke="${INK}" stroke-width="${SW}"/>
   <path d="M 95 102 L 105 102" stroke="${INK}" stroke-width="${SW}"/>
   <circle cx="82" cy="103" r="3" fill="${INK}"/>
   <circle cx="118" cy="103" r="3" fill="${INK}"/>`;
const eyesClosed = () =>
  `<path d="M 74 100 Q 82 106 90 100" stroke="${INK}" stroke-width="${SW}" fill="none" stroke-linecap="round"/>
   <path d="M 110 100 Q 118 106 126 100" stroke="${INK}" stroke-width="${SW}" fill="none" stroke-linecap="round"/>`;
const blush = () =>
  `<circle cx="72" cy="118" r="5" fill="#f3a89e" opacity=".7"/>
   <circle cx="128" cy="118" r="5" fill="#f3a89e" opacity=".7"/>`;

const SKIN = "#fde3c4";

// ========== Per-type characters ==========
window.MBTI_CHARS = {

  // ---- ANALYSTS (紫系・緑系) ----
  INTJ: base(SKIN, "#5a8bb0", "#2a2418", `
    <!-- hat/cape hood -->
    <path d="M 40 92 Q 100 28 160 92" fill="#2a2418" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <path d="M 48 96 Q 100 70 152 96" fill="#3a4756" stroke="${INK}" stroke-width="${SW}"/>
    ${eyesDot()}
    ${mouthSmall(122)}
    <!-- blueprint scroll beside shoulder -->
    <rect x="40" y="170" width="26" height="32" rx="3" fill="#fffaf0" stroke="${INK}" stroke-width="${SW}"/>
    <path d="M 46 180 h14 M 46 186 h10 M 46 192 h12" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
  `),

  INTP: base(SKIN, "#6ab3a8", "#2a2418", `
    <!-- messy hair tufts -->
    <path d="M 55 78 Q 60 56 82 60 Q 100 44 118 60 Q 140 56 145 78"
          fill="#5a4a3a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesGlasses()}
    ${mouthSmall()}
    <!-- floating question bubble -->
    <circle cx="165" cy="55" r="18" fill="#fffaf0" stroke="${INK}" stroke-width="${SW}"/>
    <text x="165" y="62" text-anchor="middle" font-size="20" font-weight="700" fill="${INK}" font-family="Georgia,serif">?</text>
    <path d="M 150 70 l -4 6 l 7 -2 Z" fill="#fffaf0" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
  `),

  ENTJ: base(SKIN, "#e87a4a", "#2a2418", `
    <!-- slick hair -->
    <path d="M 45 82 Q 70 40 100 55 Q 130 40 155 82 Q 120 66 100 70 Q 80 66 45 82 Z"
          fill="#2a2418" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesDot()}
    <path d="M 75 92 L 89 92 M 111 92 L 125 92" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
    ${mouthGrin()}
    <!-- tie -->
    <path d="M 100 160 L 94 172 L 100 196 L 106 172 Z" fill="#c9a13a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
  `),

  ENTP: base(SKIN, "#a56ab3", "#2a2418", `
    <!-- wild hair -->
    <path d="M 50 82 Q 60 36 90 56 Q 100 40 110 56 Q 140 36 150 82"
          fill="#7a5a3a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesSparkle()}
    <!-- raised brow -->
    <path d="M 72 85 L 92 90" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
    <path d="M 108 90 L 128 85" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
    ${mouthGrin(118)}
    <!-- lightbulb idea -->
    <path d="M 160 50 a 12 12 0 1 1 -16 14 l 0 8 l 16 0 l 0 -8 a 12 12 0 0 1 0 -14 Z"
          fill="#f5d76e" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <path d="M 148 76 l 8 0" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
  `),

  // ---- DIPLOMATS ----
  INFJ: base(SKIN, "#8aa85c", "#2a2418", `
    <!-- long hair -->
    <path d="M 40 105 Q 30 60 80 50 Q 100 38 120 50 Q 170 60 160 105 L 160 130 Q 100 120 40 130 Z"
          fill="#3a2a1a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <circle cx="100" cy="100" r="60" fill="${SKIN}" stroke="${INK}" stroke-width="${SW}"/>
    <path d="M 40 105 Q 42 75 70 66 Q 100 56 130 66 Q 158 75 160 105"
          fill="#3a2a1a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesClosed()}
    ${mouthSmall(120)}
    ${blush()}
    <!-- small star -->
    <path d="M 160 150 l 3 6 l 6 1 l -5 5 l 1 6 l -5 -3 l -5 3 l 1 -6 l -5 -5 l 6 -1 Z"
          fill="#f5d76e" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
  `),

  INFP: base(SKIN, "#d98a7a", "#2a2418", `
    <!-- fringe with flower -->
    <path d="M 45 90 Q 55 50 100 55 Q 145 50 155 90 Q 130 70 100 74 Q 70 70 45 90 Z"
          fill="#6a4a6a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <!-- flower -->
    <circle cx="60" cy="75" r="5" fill="#fffaf0" stroke="${INK}" stroke-width="1.8"/>
    <circle cx="68" cy="72" r="5" fill="#fffaf0" stroke="${INK}" stroke-width="1.8"/>
    <circle cx="66" cy="82" r="5" fill="#fffaf0" stroke="${INK}" stroke-width="1.8"/>
    <circle cx="54" cy="83" r="5" fill="#fffaf0" stroke="${INK}" stroke-width="1.8"/>
    <circle cx="61" cy="79" r="3" fill="#f5d76e" stroke="${INK}" stroke-width="1.2"/>
    ${eyesCurve()}
    ${mouthWave(122)}
    ${blush()}
    <!-- heart -->
    <path d="M 160 140 c -6 -8 -16 0 -8 8 l 8 8 l 8 -8 c 8 -8 -2 -16 -8 -8 Z"
          fill="#e8838a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
  `),

  ENFJ: base(SKIN, "#c9a13a", "#2a2418", `
    <!-- stylish wavy hair -->
    <path d="M 48 90 Q 50 45 100 48 Q 150 45 152 90 Q 130 64 100 68 Q 70 64 48 90 Z"
          fill="#b07540" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesSparkle()}
    ${mouthGrin(118)}
    ${blush()}
    <!-- microphone/megaphone -->
    <path d="M 155 150 L 180 140 L 180 170 L 155 160 Z"
          fill="#e87a4a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <path d="M 145 150 L 155 148 L 155 162 L 145 160 Z" fill="#fffaf0" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
  `),

  ENFP: base(SKIN, "#e87a4a", "#2a2418", `
    <!-- bouncy curls -->
    <circle cx="55" cy="70" r="14" fill="#c24a2a" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="80" cy="52" r="14" fill="#c24a2a" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="110" cy="48" r="14" fill="#c24a2a" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="140" cy="56" r="14" fill="#c24a2a" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="148" cy="78" r="14" fill="#c24a2a" stroke="${INK}" stroke-width="${SW}"/>
    ${eyesSparkle()}
    ${mouthGrin(118)}
    ${blush()}
    <!-- confetti dots -->
    <circle cx="30" cy="40" r="4" fill="#f5d76e" stroke="${INK}" stroke-width="1.5"/>
    <circle cx="172" cy="30" r="4" fill="#8aa85c" stroke="${INK}" stroke-width="1.5"/>
    <rect x="180" y="95" width="8" height="8" fill="#a56ab3" stroke="${INK}" stroke-width="1.5" transform="rotate(15 184 99)"/>
  `),

  // ---- SENTINELS ----
  ISTJ: base(SKIN, "#5a8bb0", "#2a2418", `
    <!-- neat side-part -->
    <path d="M 48 88 Q 52 46 100 52 Q 148 46 152 88 Q 120 66 100 70 L 88 58 Q 70 64 48 88 Z"
          fill="#3a2a1a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesDot()}
    <path d="M 76 90 L 92 88 M 108 88 L 124 90" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
    ${mouthFlat(124)}
    <!-- clipboard -->
    <rect x="38" y="170" width="28" height="36" rx="3" fill="#fffaf0" stroke="${INK}" stroke-width="${SW}"/>
    <rect x="44" y="166" width="16" height="6" rx="2" fill="#c9a13a" stroke="${INK}" stroke-width="${SW}"/>
    <path d="M 44 184 h16 M 44 190 h12 M 44 196 h14" stroke="${INK}" stroke-width="1.6" stroke-linecap="round"/>
  `),

  ISFJ: base(SKIN, "#d98a7a", "#2a2418", `
    <!-- headscarf style soft hair -->
    <path d="M 48 95 Q 50 55 100 52 Q 150 55 152 95 Q 130 78 100 80 Q 70 78 48 95 Z"
          fill="#3a2a1a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesCurve()}
    ${mouthSmile(120)}
    ${blush()}
    <!-- steaming cup -->
    <path d="M 150 160 l 0 24 a 10 10 0 0 0 20 0 l 0 -24 Z"
          fill="#fffaf0" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <path d="M 170 166 a 8 6 0 0 1 0 12" fill="none" stroke="${INK}" stroke-width="${SW}"/>
    <path d="M 156 148 q 2 -6 0 -10 M 164 148 q 2 -6 0 -10" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round" fill="none"/>
  `),

  ESTJ: base(SKIN, "#c9a13a", "#2a2418", `
    <!-- short neat hair -->
    <path d="M 48 88 Q 55 50 100 52 Q 145 50 152 88 Q 130 72 100 74 Q 70 72 48 88 Z"
          fill="#2a2418" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesDot()}
    <path d="M 74 90 L 92 86 M 108 86 L 126 90" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
    ${mouthFlat(122)}
    <!-- whistle on neck -->
    <path d="M 100 160 L 118 168 L 130 162" stroke="${INK}" stroke-width="${SW}" fill="none" stroke-linecap="round"/>
    <circle cx="132" cy="162" r="6" fill="#e87a4a" stroke="${INK}" stroke-width="${SW}"/>
  `),

  ESFJ: base(SKIN, "#e87a4a", "#2a2418", `
    <!-- bouncy hair -->
    <path d="M 46 92 Q 50 50 100 50 Q 150 50 154 92 Q 132 66 100 70 Q 68 66 46 92 Z"
          fill="#c9a13a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesCurve()}
    ${mouthGrin(118)}
    ${blush()}
    <!-- flower bouquet -->
    <circle cx="148" cy="148" r="8" fill="#e8838a" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="160" cy="152" r="8" fill="#f5d76e" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="154" cy="140" r="8" fill="#8aa85c" stroke="${INK}" stroke-width="${SW}"/>
    <path d="M 154 158 L 160 185" stroke="#5a4a3a" stroke-width="3" stroke-linecap="round"/>
  `),

  // ---- EXPLORERS ----
  ISTP: base(SKIN, "#6ab3a8", "#2a2418", `
    <!-- beanie -->
    <path d="M 44 90 Q 48 48 100 46 Q 152 48 156 90 Z"
          fill="#3a4756" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <path d="M 44 90 L 156 90" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="100" cy="44" r="6" fill="#e87a4a" stroke="${INK}" stroke-width="${SW}"/>
    ${eyesDot()}
    ${mouthFlat(120)}
    <!-- wrench -->
    <path d="M 150 150 l 20 -20 a 10 10 0 0 0 -14 -14 l -6 6 a 6 6 0 0 0 4 10 l -18 18 a 4 4 0 1 0 6 6 Z"
          fill="#aaa" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
  `),

  ISFP: base(SKIN, "#a56ab3", "#2a2418", `
    <!-- soft hair + flower -->
    <path d="M 45 95 Q 48 48 100 46 Q 152 48 155 95 Q 130 75 100 78 Q 70 75 45 95 Z"
          fill="#3a2a1a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <path d="M 138 70 q -8 -10 0 -18 q 10 4 6 14 z" fill="#e8838a" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
    ${eyesCurve()}
    ${mouthWave(120)}
    ${blush()}
    <!-- paint palette -->
    <ellipse cx="160" cy="170" rx="20" ry="14" fill="#fffaf0" stroke="${INK}" stroke-width="${SW}"/>
    <circle cx="152" cy="166" r="3" fill="#e87a4a"/>
    <circle cx="162" cy="162" r="3" fill="#8aa85c"/>
    <circle cx="170" cy="170" r="3" fill="#5a8bb0"/>
    <circle cx="162" cy="176" r="3" fill="#c9a13a"/>
  `),

  ESTP: base(SKIN, "#e87a4a", "#2a2418", `
    <!-- sporty cap -->
    <path d="M 40 90 Q 48 58 100 58 Q 152 58 160 90 Z"
          fill="#c24a2a" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    <path d="M 40 90 L 180 90 Q 180 100 170 102 L 40 90 Z" fill="#2a2418" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesSparkle()}
    <!-- cheeky smirk -->
    <path d="M 85 120 Q 100 130 118 118" fill="none" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
    <path d="M 118 118 l 6 -2" stroke="${INK}" stroke-width="${SW}" stroke-linecap="round"/>
    <!-- thumbs up -->
    <path d="M 150 172 l 4 -12 a 3 3 0 0 1 6 0 l 0 10 l 10 0 l -2 14 l -14 0 Z"
          fill="#f5d76e" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
  `),

  ESFP: base(SKIN, "#c9a13a", "#2a2418", `
    <!-- big hair -->
    <path d="M 42 90 Q 38 40 100 44 Q 162 40 158 90 Q 130 62 100 66 Q 70 62 42 90 Z"
          fill="#2a2418" stroke="${INK}" stroke-width="${SW}" stroke-linejoin="round"/>
    ${eyesSparkle()}
    ${mouthOpen(118)}
    ${blush()}
    <!-- music notes -->
    <path d="M 30 80 l 0 -22 l 10 -3 l 0 22 M 28 80 a 4 3 0 1 0 4 0 M 38 77 a 4 3 0 1 0 4 0"
          fill="${INK}" stroke="${INK}" stroke-width="1.8"/>
    <!-- star -->
    <path d="M 170 45 l 3 7 l 7 1 l -5 5 l 1 7 l -6 -3 l -6 3 l 1 -7 l -5 -5 l 7 -1 Z"
          fill="#e87a4a" stroke="${INK}" stroke-width="1.8" stroke-linejoin="round"/>
  `),

};
