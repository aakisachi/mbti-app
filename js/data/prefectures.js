// ============================================================
//  都道府県データ（JISコード順）
//  x, y はタイル地図上の位置（12列 × 12行）。北海道は2×2マス。
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

TF.PREFECTURES = [
  { code: 1,  name: "北海道",   short: "北海道", region: "北海道", x: 10, y: 0, w: 2, h: 2 },
  { code: 2,  name: "青森県",   short: "青森", region: "東北", x: 11, y: 2 },
  { code: 3,  name: "岩手県",   short: "岩手", region: "東北", x: 11, y: 3 },
  { code: 4,  name: "宮城県",   short: "宮城", region: "東北", x: 11, y: 4 },
  { code: 5,  name: "秋田県",   short: "秋田", region: "東北", x: 10, y: 3 },
  { code: 6,  name: "山形県",   short: "山形", region: "東北", x: 10, y: 4 },
  { code: 7,  name: "福島県",   short: "福島", region: "東北", x: 10, y: 5 },
  { code: 8,  name: "茨城県",   short: "茨城", region: "関東", x: 11, y: 7 },
  { code: 9,  name: "栃木県",   short: "栃木", region: "関東", x: 11, y: 6 },
  { code: 10, name: "群馬県",   short: "群馬", region: "関東", x: 10, y: 6 },
  { code: 11, name: "埼玉県",   short: "埼玉", region: "関東", x: 10, y: 7 },
  { code: 12, name: "千葉県",   short: "千葉", region: "関東", x: 11, y: 8 },
  { code: 13, name: "東京都",   short: "東京", region: "関東", x: 10, y: 8 },
  { code: 14, name: "神奈川県", short: "神奈川", region: "関東", x: 10, y: 9 },
  { code: 15, name: "新潟県",   short: "新潟", region: "中部", x: 9, y: 5 },
  { code: 16, name: "富山県",   short: "富山", region: "中部", x: 8, y: 5 },
  { code: 17, name: "石川県",   short: "石川", region: "中部", x: 7, y: 5 },
  { code: 18, name: "福井県",   short: "福井", region: "中部", x: 7, y: 6 },
  { code: 19, name: "山梨県",   short: "山梨", region: "中部", x: 9, y: 7 },
  { code: 20, name: "長野県",   short: "長野", region: "中部", x: 9, y: 6 },
  { code: 21, name: "岐阜県",   short: "岐阜", region: "中部", x: 8, y: 6 },
  { code: 22, name: "静岡県",   short: "静岡", region: "中部", x: 9, y: 8 },
  { code: 23, name: "愛知県",   short: "愛知", region: "中部", x: 8, y: 7 },
  { code: 24, name: "三重県",   short: "三重", region: "近畿", x: 8, y: 8 },
  { code: 25, name: "滋賀県",   short: "滋賀", region: "近畿", x: 7, y: 7 },
  { code: 26, name: "京都府",   short: "京都", region: "近畿", x: 6, y: 7 },
  { code: 27, name: "大阪府",   short: "大阪", region: "近畿", x: 6, y: 8 },
  { code: 28, name: "兵庫県",   short: "兵庫", region: "近畿", x: 5, y: 7 },
  { code: 29, name: "奈良県",   short: "奈良", region: "近畿", x: 7, y: 8 },
  { code: 30, name: "和歌山県", short: "和歌山", region: "近畿", x: 6, y: 9 },
  { code: 31, name: "鳥取県",   short: "鳥取", region: "中国", x: 4, y: 6 },
  { code: 32, name: "島根県",   short: "島根", region: "中国", x: 3, y: 6 },
  { code: 33, name: "岡山県",   short: "岡山", region: "中国", x: 4, y: 7 },
  { code: 34, name: "広島県",   short: "広島", region: "中国", x: 3, y: 7 },
  { code: 35, name: "山口県",   short: "山口", region: "中国", x: 2, y: 7 },
  { code: 36, name: "徳島県",   short: "徳島", region: "四国", x: 4, y: 10 },
  { code: 37, name: "香川県",   short: "香川", region: "四国", x: 4, y: 9 },
  { code: 38, name: "愛媛県",   short: "愛媛", region: "四国", x: 3, y: 9 },
  { code: 39, name: "高知県",   short: "高知", region: "四国", x: 3, y: 10 },
  { code: 40, name: "福岡県",   short: "福岡", region: "九州・沖縄", x: 1, y: 8 },
  { code: 41, name: "佐賀県",   short: "佐賀", region: "九州・沖縄", x: 0, y: 8 },
  { code: 42, name: "長崎県",   short: "長崎", region: "九州・沖縄", x: 0, y: 9 },
  { code: 43, name: "熊本県",   short: "熊本", region: "九州・沖縄", x: 1, y: 9 },
  { code: 44, name: "大分県",   short: "大分", region: "九州・沖縄", x: 2, y: 8 },
  { code: 45, name: "宮崎県",   short: "宮崎", region: "九州・沖縄", x: 2, y: 9 },
  { code: 46, name: "鹿児島県", short: "鹿児島", region: "九州・沖縄", x: 1, y: 10 },
  { code: 47, name: "沖縄県",   short: "沖縄", region: "九州・沖縄", x: 0, y: 11 }
];

TF.prefByCode = function (code) {
  code = Number(code);
  for (var i = 0; i < TF.PREFECTURES.length; i++) {
    if (TF.PREFECTURES[i].code === code) return TF.PREFECTURES[i];
  }
  return null;
};
