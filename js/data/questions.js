// ============================================================
//  質問データ（4指標 × 5問 = 20問、5段階回答）
//  agree: 「そう思う」と答えたときに傾く文字
// ============================================================
var TF = (globalThis.TF = globalThis.TF || {});

TF.AXES = [
  {
    id: "EI", left: "E", right: "I", title: "エネルギーの向き",
    names: { E: "外向", I: "内向" },
    en: { E: "Extraversion", I: "Introversion" },
    desc: {
      E: "人と関わったり外に出たりすることで、元気がわいてくる。",
      I: "ひとりの時間や静かな環境で、元気を充電する。"
    }
  },
  {
    id: "SN", left: "S", right: "N", title: "ものの見方",
    names: { S: "感覚", N: "直観" },
    en: { S: "Sensing", N: "Intuition" },
    desc: {
      S: "目の前の事実や、実際の経験を大切にする。",
      N: "ひらめきやパターン、未来の可能性に目が向く。"
    }
  },
  {
    id: "TF", left: "T", right: "F", title: "判断のしかた",
    names: { T: "思考", F: "感情" },
    en: { T: "Thinking", F: "Feeling" },
    desc: {
      T: "論理や一貫性、公平さを軸に決める。",
      F: "人の気持ちや、その場の調和を軸に決める。"
    }
  },
  {
    id: "JP", left: "J", right: "P", title: "外の世界との接し方",
    names: { J: "判断", P: "知覚" },
    en: { J: "Judging", P: "Perceiving" },
    desc: {
      J: "計画を立てて、きっちり進めると安心する。",
      P: "予定は柔らかく。その場の流れに合わせたい。"
    }
  }
];

// 回答の選択肢（value は -2〜+2。+2 = とてもそう思う）
TF.SCALE = [
  { value: 2, label: "とてもそう思う" },
  { value: 1, label: "ややそう思う" },
  { value: 0, label: "どちらともいえない" },
  { value: -1, label: "あまりそう思わない" },
  { value: -2, label: "まったくそう思わない" }
];

// 軸ごとに5問。出題順は TF.QUESTIONS の並び順（軸が交互になるよう並べています）。
TF.QUESTIONS = [
  { axis: "EI", agree: "E", text: "初対面の人とも、わりとすぐに打ち解けられる。" },
  { axis: "SN", agree: "S", text: "説明を聞くときは、抽象的な話より具体例がほしい。" },
  { axis: "TF", agree: "T", text: "友達に相談されると、まず解決策を考えてしまう。" },
  { axis: "JP", agree: "J", text: "旅行の前には、しっかり計画を立てておきたい。" },

  { axis: "EI", agree: "I", text: "休日は、家でひとりで過ごすといちばん回復できる。" },
  { axis: "SN", agree: "N", text: "「もしも〜だったら」と空想するのが好きだ。" },
  { axis: "TF", agree: "F", text: "正しさよりも、相手の気持ちを優先したくなる。" },
  { axis: "JP", agree: "P", text: "締め切りギリギリになってから、本気が出る。" },

  { axis: "EI", agree: "E", text: "考えるより先に、話しながら考えをまとめるほうだ。" },
  { axis: "SN", agree: "S", text: "新しいやり方より、実績のあるやり方を信頼する。" },
  { axis: "TF", agree: "T", text: "議論では、相手が誰でも矛盾は指摘したい。" },
  { axis: "JP", agree: "J", text: "部屋や机は、いつも整理整頓されているほうだ。" },

  { axis: "EI", agree: "I", text: "大人数の集まりのあとは、どっと疲れを感じる。" },
  { axis: "SN", agree: "N", text: "細かい部分より、全体の意味やつながりが気になる。" },
  { axis: "TF", agree: "F", text: "何かを決めるとき、関わる人がどう感じるかを重視する。" },
  { axis: "JP", agree: "P", text: "予定が急に変わっても、むしろワクワクする。" },

  { axis: "EI", agree: "E", text: "グループの中では、自分から話題をふることが多い。" },
  { axis: "SN", agree: "S", text: "目の前の現実的な問題を片づけるのが得意だ。" },
  { axis: "TF", agree: "T", text: "人を評価するときは、気持ちより成果や能力を見る。" },
  { axis: "JP", agree: "J", text: "やることリストを作って、ひとつずつ消すのが好きだ。" }
];

// 質問中にナビゲーターがかける一言（質問番号ごと）
TF.QUIZ_LINES = [
  { who: "zunda", face: "happy", text: "直感で答えるのがコツなのだ！" },
  { who: "metan", face: "normal", text: "「どちらともいえない」は、なるべく少なめにね。" },
  { who: "zunda", face: "normal", text: "正解はないから、気楽にいくのだ〜。" },
  { who: "metan", face: "smile", text: "理想の自分じゃなく、ふだんの自分で答えてね。" },
  { who: "zunda", face: "happy", text: "いい調子なのだ！" },
  { who: "metan", face: "smile", text: "ふふ、あなたのこと、少しずつ見えてきたわ。" },
  { who: "zunda", face: "normal", text: "ずんだ餅を食べながらでもOKなのだ。" },
  { who: "metan", face: "normal", text: "迷ったら、最初に浮かんだほうを選びなさい。" },
  { who: "zunda", face: "happy", text: "もうすぐ半分なのだ！" },
  { who: "metan", face: "smile", text: "ちょうど半分よ。あと10問、がんばって。" },
  { who: "zunda", face: "happy", text: "ボクもワクワクしてきたのだ！" },
  { who: "metan", face: "normal", text: "深く考えすぎないのがポイントよ。" },
  { who: "zunda", face: "think", text: "あなたは何タイプかな〜？" },
  { who: "metan", face: "normal", text: "残り7問。集中力、続いてる？" },
  { who: "zunda", face: "happy", text: "ラストスパートなのだ！" },
  { who: "metan", face: "smile", text: "あと5問ね。もう少しよ。" },
  { who: "zunda", face: "surprise", text: "ドキドキしてきたのだ…！" },
  { who: "metan", face: "smile", text: "結果はもうすぐそこよ。" },
  { who: "zunda", face: "happy", text: "あと2問なのだ！" },
  { who: "metan", face: "smile", text: "最後の質問よ。" }
];
