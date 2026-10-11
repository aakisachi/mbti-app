/**
 * 16タイプ せいかくラボ — 都道府県ランキング集計サーバー（Google Apps Script）
 *
 * 使い方（くわしくは README.md）
 *  1. Google スプレッドシートを新規作成
 *  2. 拡張機能 → Apps Script を開き、このファイルの中身を貼り付けて保存
 *  3. デプロイ → 新しいデプロイ → 種類「ウェブアプリ」
 *     - 次のユーザーとして実行: 自分
 *     - アクセスできるユーザー: 全員
 *  4. 表示された「ウェブアプリのURL」を js/config.js の STATS_ENDPOINT に貼る
 *
 * 保存するのは「端末ごとのランダムID・都道府県コード・タイプ・更新日時」だけです。
 */

var SHEET_NAME = "votes";
var CACHE_KEY = "stats-v1";
var CACHE_SECONDS = 120;
var TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"
];

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(["id", "pref", "type", "updatedAt"]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** 投票を受け付ける（同じIDからの投票は上書き） */
function doPost(e) {
  var body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return json_({ ok: false, error: "bad json" });
  }
  var id = String(body.id || "");
  var pref = Number(body.pref);
  var type = String(body.type || "").toUpperCase();
  if (!/^[A-Za-z0-9-]{8,64}$/.test(id) || !(pref >= 1 && pref <= 47) || TYPES.indexOf(type) === -1) {
    return json_({ ok: false, error: "invalid" });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var sh = getSheet_();
    var found = sh.getRange("A:A").createTextFinder(id).matchEntireCell(true).findNext();
    var row = [id, pref, type, new Date()];
    if (found && found.getRow() > 1) {
      sh.getRange(found.getRow(), 1, 1, 4).setValues([row]);
    } else {
      sh.appendRow(row);
    }
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

/** 集計結果を返す: { updatedAt, total, prefs: { "13": { "INFP": 12, ... } } } */
function doGet() {
  var cache = CacheService.getScriptCache();
  var hit = cache.get(CACHE_KEY);
  if (hit) return ContentService.createTextOutput(hit).setMimeType(ContentService.MimeType.JSON);

  var sh = getSheet_();
  var last = sh.getLastRow();
  var prefs = {};
  var total = 0;
  if (last >= 2) {
    var values = sh.getRange(2, 2, last - 1, 2).getValues();
    values.forEach(function (r) {
      var p = Number(r[0]);
      var t = String(r[1]);
      if (!(p >= 1 && p <= 47) || TYPES.indexOf(t) === -1) return;
      if (!prefs[p]) prefs[p] = {};
      prefs[p][t] = (prefs[p][t] || 0) + 1;
      total++;
    });
  }
  var out = JSON.stringify({ updatedAt: new Date().toISOString(), total: total, prefs: prefs });
  cache.put(CACHE_KEY, out, CACHE_SECONDS);
  return ContentService.createTextOutput(out).setMimeType(ContentService.MimeType.JSON);
}
