# 16タイプ せいかくラボ

ずんだもん＆四国めたんがナビゲートする、20問・約3分の16タイプ性格診断サイトです。
ビルド不要の静的サイト（HTML / CSS / JavaScript）なので、GitHub Pages などにそのまま置けば動きます。

## できること

| 機能 | 内容 |
| --- | --- |
| 性格診断 | 4指標×5問＝20問。5段階で回答し、各指標の傾きを％で表示 |
| 結果ページ | 16の動物キャラクター、強み・注意点・恋愛・仕事・ストレス・成長のヒント・相性 |
| シェア | X / LINE / リンクコピー / スマホの共有メニュー。タイプごとにSNS用の画像（OGP）つき |
| 今日の運勢 | 16タイプの順位が毎日0時に変わる。ラッキーアイテム・カラー・ラッキータイプ |
| 県別ランキング | 47都道府県のタイル地図。県ごとの多いタイプ／タイプごとの多い県 |
| 相性チェック | 2タイプの相性スコアと4指標ごとの解説。友達に「相性診断リンク」を送れる |
| ずんだスタンプ | 来た日にスタンプ。日数に応じて「ひみつの会話」が解放される |
| 16タイプ図鑑 | 4グループ×4タイプの一覧と解説ページ |

そのほか、ダークモード、キーボード操作（1〜5キーで回答）、「動きを減らす」設定への対応、途中保存（続きから再開）があります。

## 公開する（GitHub Pages）

1. このブランチを `main` にマージします。
2. GitHub のリポジトリで **Settings → Pages** を開きます。
3. **Build and deployment** の Source を「Deploy from a branch」、Branch を `main` / `/ (root)` にして Save します。
4. 数分後、`https://aakisachi.github.io/mbti-app/` で公開されます。

公開URLが違う場合（独自ドメインなど）は、次の3か所を書き換えてください。

- `js/config.js` の `SITE_URL`
- `index.html` の `canonical` / `og:url` / `og:image`
- そのあと `npm run build:pages` でシェア用ページを作り直す

## 都道府県ランキングを本物のデータにする（任意）

設定しないあいだは、ランキングに**デモデータ（架空の数値）**を、その旨を明記して表示します。
Google スプレッドシートと Apps Script を使うと、無料で本物の集計に切り替えられます。

1. Google スプレッドシートを新規作成します（名前は自由）。
2. メニューの **拡張機能 → Apps Script** を開き、`gas/Code.gs` の中身を全部貼り付けて保存します。
3. 右上の **デプロイ → 新しいデプロイ** を選び、種類を「ウェブアプリ」にします。
   - 次のユーザーとして実行：**自分**
   - アクセスできるユーザー：**全員**
4. 「デプロイ」を押し、表示された **ウェブアプリのURL** をコピーします（Google のアクセス許可を求められたら許可してください）。
5. `js/config.js` の `STATS_ENDPOINT: ""` の `""` の中に、そのURLを貼り付けて公開します。

集計されるのは「端末ごとのランダムID・都道府県・タイプ・日時」だけです。同じ端末から何度投票しても1票として上書きされます。
なお、このサイトで診断した人の投票なので、実際の人口分布とは異なります（サイト上でもそう説明しています）。

## 開発

```
index.html            画面の骨組み
css/style.css         デザイン（ライト／ダーク）
js/config.js          公開URL・集計サーバーURLなどの設定
js/data/*.js          質問・16タイプ・都道府県・運勢のデータ
js/art/*.js           動物キャラクターとナビゲーターのSVGイラスト
js/lib/core.js        スコア計算・相性・運勢などのロジック（画面に依存しない）
js/lib/stats.js       集計サーバーとの通信
js/app.js             画面の切り替えと描画
gas/Code.gs           集計サーバー（Google Apps Script）
t/*.html              SNSシェア用ページ（タイプごとのOGP）
og/*.png              SNSシェア用画像
tools/                シェアページ・OGP画像の生成スクリプト
tests/                ロジックのテスト
```

ローカルで見るときは `index.html` をブラウザで開くだけでOKです。

```sh
npm test               # ロジックのテスト（Node.js 18 以上）
npm run build:pages    # t/*.html を作り直す（タイプのデータや SITE_URL を変えたとき）
npm install            # OGP画像の生成に使う playwright-core を入れる
npm run build:og       # og/*.png を作り直す（CHROMIUM_PATH で Chromium の場所を指定可）
```

## クレジット・注意

- 本サイトはエンターテインメントを目的とした非公式の性格診断です。
- MBTI® は The Myers-Briggs Company の登録商標です。本サイトは同社および公式のMBTI検査とは関係ありません。タイプのニックネーム・動物キャラクター・解説文はすべてオリジナルです。
- ずんだもん・四国めたん © 東北ずん子・ずんだもんプロジェクト（SSS合同会社）。本サイトのイラストは[キャラクター利用ガイドライン](https://zunko.jp/guideline.html)に基づくファンアートです。商用利用する場合などは、必ず最新のガイドラインを確認してください。
- フォント：[Dela Gothic One](https://fonts.google.com/specimen/Dela+Gothic+One)、[Zen Maru Gothic](https://fonts.google.com/specimen/Zen+Maru+Gothic)（SIL Open Font License）
