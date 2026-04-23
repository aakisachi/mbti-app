// =========== 4 Questions ===========
// Each question maps a dichotomy: E/I, S/N, T/F, J/P
window.MBTI_QUESTIONS = [
  {
    axis: ["E", "I"],
    title: "週末の理想的な過ごし方は？",
    choices: [
      {
        value: "E",
        label: "友達を集めてワイワイ",
        sub: "人と話すと元気が出るタイプ",
        icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="10" r="3" stroke="#2a2418" stroke-width="1.8"/><circle cx="16" cy="10" r="3" stroke="#2a2418" stroke-width="1.8"/><path d="M3 20c1-3 3-4 5-4s4 1 5 4" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round"/><path d="M11 20c1-3 3-4 5-4s4 1 5 4" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round"/></svg>'
      },
      {
        value: "I",
        label: "家で一人の時間を満喫",
        sub: "静かな時間でチャージするタイプ",
        icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 20V10l8-6 8 6v10" stroke="#2a2418" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 20v-6h6v6" stroke="#2a2418" stroke-width="1.8" stroke-linejoin="round"/></svg>'
      }
    ]
  },
  {
    axis: ["S", "N"],
    title: "新しいアイデアを思いつくとき、あなたは？",
    choices: [
      {
        value: "S",
        label: "見たこと・経験したことから考える",
        sub: "現実とディテールを大切にする",
        icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="4" stroke="#2a2418" stroke-width="1.8"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round"/></svg>'
      },
      {
        value: "N",
        label: "ひらめきや未来を想像する",
        sub: "可能性と全体像を大切にする",
        icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 21h4" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round"/><path d="M12 3a6 6 0 0 0-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3A6 6 0 0 0 12 3z" stroke="#2a2418" stroke-width="1.8" stroke-linejoin="round"/></svg>'
      }
    ]
  },
  {
    axis: ["T", "F"],
    title: "大事な決断をするとき、あなたは？",
    choices: [
      {
        value: "T",
        label: "論理と合理性で判断する",
        sub: "事実と公平さを重んじる",
        icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M5 8h14M4 12l-1 3h4l-1-3M20 12l-1 3h4l-1-3" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      },
      {
        value: "F",
        label: "気持ちや人との調和を大切にする",
        sub: "共感と思いやりを重んじる",
        icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" stroke="#2a2418" stroke-width="1.8" stroke-linejoin="round"/></svg>'
      }
    ]
  },
  {
    axis: ["J", "P"],
    title: "旅行の計画、どっちが近い？",
    choices: [
      {
        value: "J",
        label: "ちゃんと予定を組んで動きたい",
        sub: "計画どおりに進むと安心",
        icon: '<svg viewBox="0 0 24 24" fill="none"><rect x="4" y="5" width="16" height="15" rx="2" stroke="#2a2418" stroke-width="1.8"/><path d="M4 10h16M8 3v4M16 3v4" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round"/><path d="M8 14h3M8 17h6" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round"/></svg>'
      },
      {
        value: "P",
        label: "その場のノリで自由に動きたい",
        sub: "可能性を残しておきたい",
        icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 17c2-8 12-8 14 0" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round"/><circle cx="8" cy="12" r="1.5" fill="#2a2418"/><circle cx="14" cy="10" r="1.5" fill="#2a2418"/><circle cx="18" cy="14" r="1.5" fill="#2a2418"/><path d="M3 20h18" stroke="#2a2418" stroke-width="1.8" stroke-linecap="round"/></svg>'
      }
    ]
  }
];

// =========== 16 Types ===========
window.MBTI_TYPES = {
  INTJ: {
    nick: "せんりゃくかの建築家",
    catch: "未来を設計するひと",
    title: "静かな確信で 未来を組み立てる人",
    color: "#5a8bb0",
    desc: "頭の中に大きな設計図を持ち、コツコツと未来を形にしていく戦略家。人と群れるよりも、自分のビジョンに集中しているときがいちばん生きている感じがします。ムダを嫌い、核心を突く思考が得意。",
    strengths: ["長期的な視点で物事を考えられる", "独立心が強く、一人でも集中できる", "本質を見抜くのが早い", "計画と実行のバランスがよい"],
    weak: ["感情表現が苦手に見られがち", "完璧主義で疲れてしまうことがある", "雑談や社交が少ししんどい"],
    career: ["研究・戦略立案", "エンジニアリング", "執筆・設計"],
    compat: [{t:"ENFP", r:"good"}, {t:"ENTP", r:"good"}, {t:"INFJ", r:"ok"}, {t:"INTP", r:"ok"}]
  },
  INTP: {
    nick: "しこうする探検家",
    catch: "なぜ？を追いかけるひと",
    title: "頭の中で 世界を分解するひと",
    color: "#6ab3a8",
    desc: "「なんで？」「どうして？」が口ぐせ。どんなことも一度自分で分解して納得しないと気がすまない、好奇心のかたまり。自由な発想で、誰も気づかない視点を見つけられます。",
    strengths: ["論理的で創造的な発想ができる", "専門分野を深く掘り下げられる", "柔軟で偏見が少ない", "知的な刺激を楽しめる"],
    weak: ["締め切りや日常のルーティンが苦手", "自分の考えを言語化するのに時間がかかる", "感情のケアを後回しにしがち"],
    career: ["研究・開発", "数学・哲学", "プログラミング"],
    compat: [{t:"ENTJ", r:"good"}, {t:"ENFJ", r:"good"}, {t:"INTJ", r:"ok"}, {t:"ENTP", r:"ok"}]
  },
  ENTJ: {
    nick: "とうきの統率者",
    catch: "道を切り開くひと",
    title: "決めたら進む 強い推進力",
    color: "#e87a4a",
    desc: "目標を立てたら、周りを巻き込んで最速で実現させる力強いリーダー。決断の速さと責任感で、チームを前に進めます。",
    strengths: ["リーダーシップと決断力がある", "目標達成への推進力が強い", "戦略的に物事を考えられる", "効率と結果にこだわれる"],
    weak: ["言い方が直接的になりがち", "感情より結果を優先しすぎることがある", "せっかちに見られることも"],
    career: ["経営・起業", "プロジェクトマネジメント", "コンサルティング"],
    compat: [{t:"INTP", r:"good"}, {t:"INFP", r:"good"}, {t:"ENTP", r:"ok"}, {t:"ENFJ", r:"ok"}]
  },
  ENTP: {
    nick: "ひらめきの発明家",
    catch: "可能性を試すひと",
    title: "アイデアを 飛ばして試すひと",
    color: "#a56ab3",
    desc: "次から次へとアイデアが湧いてくるクリエイティブな発明家。議論や新しい挑戦が大好きで、常識をユーモアで揺さぶります。",
    strengths: ["発想力と瞬発力がある", "議論と交渉が得意", "変化を楽しめる", "カリスマ性がある"],
    weak: ["飽きっぽく、継続が苦手", "細部の詰めを軽んじることがある", "議論が過熱しやすい"],
    career: ["起業・新規事業", "クリエイティブ職", "マーケティング"],
    compat: [{t:"INFJ", r:"good"}, {t:"INTJ", r:"good"}, {t:"ENFP", r:"ok"}, {t:"ENTJ", r:"ok"}]
  },
  INFJ: {
    nick: "しずかな導き手",
    catch: "意味を見つけるひと",
    title: "人の気持ちを 深く読む理想家",
    color: "#8aa85c",
    desc: "物静かだけれど、人の気持ちや物事の本質をしっかり見抜く理想主義者。ひとつの信念を大切にし、他人の成長を深く応援できる人。",
    strengths: ["共感力と直観力が高い", "深く意味のある関係を築ける", "理想を現実にする意思が強い", "静かな説得力がある"],
    weak: ["人に期待しすぎて疲れる", "完璧主義で抱え込みがち", "自分の気持ちは伝えるのが苦手"],
    career: ["カウンセリング・教育", "執筆・編集", "人事・組織開発"],
    compat: [{t:"ENTP", r:"good"}, {t:"ENFP", r:"good"}, {t:"INFP", r:"ok"}, {t:"INTJ", r:"ok"}]
  },
  INFP: {
    nick: "やさしい夢想家",
    catch: "理想をだいじにするひと",
    title: "心の世界を そっと育てる人",
    color: "#d98a7a",
    desc: "やわらかい気持ちの奥に、強い信念を持っている理想主義者。誰かのために静かに動けるやさしさと、物語を描くような想像力をあわせ持ちます。",
    strengths: ["共感力と想像力が豊か", "自分の価値観を大切にできる", "創造的な表現が得意", "一対一の関係で深く繋がれる"],
    weak: ["傷つきやすく、回復に時間が要る", "現実の事務作業が苦手", "自分を責めすぎる傾向"],
    career: ["ライティング・芸術", "心理・福祉", "デザイン"],
    compat: [{t:"ENFJ", r:"good"}, {t:"ENTJ", r:"good"}, {t:"INFJ", r:"ok"}, {t:"ENFP", r:"ok"}]
  },
  ENFJ: {
    nick: "おせっかいな主人公",
    catch: "みんなを照らすひと",
    title: "人の力を 引き出すリーダー",
    color: "#c9a13a",
    desc: "人のよいところを見つけ、引き出すのが得意な、明るいリーダー。場の空気を温め、みんなで一緒に前に進む力を与える人です。",
    strengths: ["高い共感力と影響力", "人を育てるのが得意", "理想を言葉にして伝えられる", "責任感が強い"],
    weak: ["自分より人を優先しすぎて疲れる", "批判に敏感", "抱え込みすぎる"],
    career: ["教育・研修", "組織マネジメント", "NPO・社会活動"],
    compat: [{t:"INFP", r:"good"}, {t:"ISFP", r:"good"}, {t:"INTP", r:"ok"}, {t:"ENFP", r:"ok"}]
  },
  ENFP: {
    nick: "きまぐれな広報",
    catch: "ワクワクを運ぶひと",
    title: "人と可能性に 恋するひと",
    color: "#e87a4a",
    desc: "いつも新しいことにワクワクしていて、まわりに元気を配るムードメーカー。人の可能性を信じ、心が動くと本気で応援できる人です。",
    strengths: ["情熱的でエネルギッシュ", "人の良いところをすぐ見つける", "柔軟で発想が自由", "場を明るくする"],
    weak: ["興味が散らばりやすい", "ルーティン作業が苦手", "感情の波が大きい"],
    career: ["企画・広報", "クリエイティブ", "教育・コーチング"],
    compat: [{t:"INTJ", r:"good"}, {t:"INFJ", r:"good"}, {t:"ENTP", r:"ok"}, {t:"INFP", r:"ok"}]
  },
  ISTJ: {
    nick: "きちょうめんな管理人",
    catch: "まじめに守るひと",
    title: "誠実さと 現実感覚の人",
    color: "#5a8bb0",
    desc: "約束を守り、決めたことを着実にやり遂げる、信頼の象徴みたいな人。派手さよりも、毎日を丁寧に積み上げる美しさを大切にします。",
    strengths: ["責任感が強く誠実", "現実的で堅実", "細部に気を配れる", "長く続ける力がある"],
    weak: ["変化への対応がゆっくり", "頑固に見られがち", "感情表現が控えめ"],
    career: ["事務・法務", "会計・監査", "品質管理"],
    compat: [{t:"ESFP", r:"good"}, {t:"ESTP", r:"good"}, {t:"ISFJ", r:"ok"}, {t:"ISTP", r:"ok"}]
  },
  ISFJ: {
    nick: "しずかな守り手",
    catch: "そっと支えるひと",
    title: "気づかいで 人を支える人",
    color: "#d98a7a",
    desc: "誰かが困っているとすぐ気づいて、さりげなく手を差し伸べられる、あたたかい守り手。みんなの日常を静かにまわしているのは、じつはこのタイプ。",
    strengths: ["思いやりと気配りがある", "責任感が強く忠実", "記憶力がよく細かい", "縁の下で人を支えられる"],
    weak: ["ノーと言うのが苦手", "自分のことを後回しにしがち", "変化に慣れるのに時間がかかる"],
    career: ["看護・介護", "事務・総務", "教育"],
    compat: [{t:"ESTP", r:"good"}, {t:"ESFP", r:"good"}, {t:"ISFP", r:"ok"}, {t:"ISTJ", r:"ok"}]
  },
  ESTJ: {
    nick: "しきるかんとく",
    catch: "まとめて動かすひと",
    title: "現実を整えていく 管理者",
    color: "#c9a13a",
    desc: "ルールと役割をはっきりさせ、チームをしっかり動かす頼れる管理者。言ったことは責任を持ってやるし、やってもらう。組織の背骨のような人。",
    strengths: ["組織力と実行力がある", "責任感が強い", "ルールと秩序を保てる", "決断が速い"],
    weak: ["厳しく見られることがある", "感情の繊細さを後回しにしがち", "変化に抵抗を感じる"],
    career: ["マネジメント", "行政・官公庁", "軍事・警察"],
    compat: [{t:"ISTP", r:"good"}, {t:"ISFP", r:"good"}, {t:"ESFJ", r:"ok"}, {t:"ESTP", r:"ok"}]
  },
  ESFJ: {
    nick: "あったかい世話やき",
    catch: "みんなの幸せを守るひと",
    title: "和を大切にする あたたかい人",
    color: "#e87a4a",
    desc: "人と人のあいだをなめらかにつなぐ、気配りの達人。みんなが笑っている空間をつくるのが大得意で、記念日や節目を大切にします。",
    strengths: ["社交性と共感力がある", "協力と調和を大切にできる", "責任感が強い", "おもてなしが上手"],
    weak: ["人の目を気にしすぎる", "対立を避けすぎて無理することがある", "変化に敏感"],
    career: ["接客・サービス", "看護・介護", "チームリーダー"],
    compat: [{t:"ISFP", r:"good"}, {t:"ISTP", r:"good"}, {t:"ESFP", r:"ok"}, {t:"ENFJ", r:"ok"}]
  },
  ISTP: {
    nick: "クールな職人",
    catch: "手で理解するひと",
    title: "静かに手を動かす職人",
    color: "#6ab3a8",
    desc: "口数は少ないけれど、目の前の仕組みをクールに理解して、手を動かして解決に持っていけるタイプ。自由と独立を何より大切にします。",
    strengths: ["冷静で合理的", "手先と観察力がすぐれる", "柔軟で機転がきく", "危機に強い"],
    weak: ["感情の共有が苦手", "長期的な約束を嫌う", "退屈にめっぽう弱い"],
    career: ["エンジニアリング", "職人・修理・整備", "アウトドア系の仕事"],
    compat: [{t:"ESFJ", r:"good"}, {t:"ESTJ", r:"good"}, {t:"ISFP", r:"ok"}, {t:"ESTP", r:"ok"}]
  },
  ISFP: {
    nick: "しずかな芸術家",
    catch: "今を感じるひと",
    title: "感覚で 世界を捉える芸術家",
    color: "#a56ab3",
    desc: "色や音、空気の変化に敏感で、美しいものをそっと見つけられる感性のひと。争いを好まず、自分のペースと世界観を大切にします。",
    strengths: ["美的感覚と観察力がある", "やさしく謙虚", "柔軟に適応できる", "今この瞬間を生きられる"],
    weak: ["長期計画が苦手", "自己主張が弱くなりがち", "ストレスを抱え込みやすい"],
    career: ["アート・デザイン", "料理・スタイリング", "動物・自然関連"],
    compat: [{t:"ESFJ", r:"good"}, {t:"ENFJ", r:"good"}, {t:"ESTJ", r:"ok"}, {t:"ISFJ", r:"ok"}]
  },
  ESTP: {
    nick: "なまいきな勝負師",
    catch: "いまを駆けぬけるひと",
    title: "瞬発力で 今を動かすひと",
    color: "#e87a4a",
    desc: "チャンスをかぎ分ける嗅覚と、すぐ動く行動力が武器の勝負師。理屈より実践、机上より現場。ピンチでも明るく突破できる頼もしい人。",
    strengths: ["行動力と瞬発力", "場を読む力", "現実的な問題解決力", "社交性がある"],
    weak: ["長期的な計画が苦手", "衝動的になりがち", "退屈に弱い"],
    career: ["営業・交渉", "スポーツ・興行", "起業・投資"],
    compat: [{t:"ISFJ", r:"good"}, {t:"ISTJ", r:"good"}, {t:"ESFP", r:"ok"}, {t:"ISTP", r:"ok"}]
  },
  ESFP: {
    nick: "たのしい主役",
    catch: "その場を輝かせるひと",
    title: "みんなを巻き込む エンターテイナー",
    color: "#c9a13a",
    desc: "いるだけで場が明るくなる、天性のエンターテイナー。楽しむ才能と、人を楽しませる才能を同時に持っている人です。",
    strengths: ["社交性と明るさ", "柔軟で適応力が高い", "観察力が鋭い", "人を楽しませる力"],
    weak: ["長期的な計画が苦手", "批判に弱い", "衝動的になりやすい"],
    career: ["エンタメ・芸能", "接客・営業", "イベント・PR"],
    compat: [{t:"ISTJ", r:"good"}, {t:"ISFJ", r:"good"}, {t:"ESTP", r:"ok"}, {t:"ENFP", r:"ok"}]
  }
};

// Ordered list of 16 for dropdown
window.MBTI_TYPE_ORDER = [
  "INTJ","INTP","ENTJ","ENTP",
  "INFJ","INFP","ENFJ","ENFP",
  "ISTJ","ISFJ","ESTJ","ESFJ",
  "ISTP","ISFP","ESTP","ESFP"
];
