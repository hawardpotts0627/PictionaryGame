const STORAGE_KEY = "phone-pictionary-v1";

const colors = [
  { name: "赤", value: "#e64f55", second: "#ffb45c" },
  { name: "青", value: "#3f88ff", second: "#6ee7f2" },
  { name: "緑", value: "#2fbf71", second: "#e6d65a" },
  { name: "黄", value: "#eab308", second: "#f97316" },
  { name: "紫", value: "#a855f7", second: "#f472b6" },
  { name: "水", value: "#06b6d4", second: "#34d399" },
  { name: "橙", value: "#f97316", second: "#fb7185" },
  { name: "白", value: "#e5e7eb", second: "#94a3b8" },
];

const categories = ["もの", "動物", "場所", "動作", "概念", "作品風", "美術部向け"];
const difficulties = ["導入", "普通", "難", "激ムズ", "伝説"];

const baseWords = {
  "もの": ["万年筆", "折りたたみ傘", "石膏像", "虫眼鏡", "砂時計", "蓄音機", "鉛筆削り", "鍵束", "彫刻刀", "天球儀", "黒電話", "ランタン", "顕微鏡", "メトロノーム", "チェス盤", "タイプライター", "羅針盤", "招き猫", "絵の具箱", "壊れた時計"],
  "動物": ["カメレオン", "フクロウ", "クラゲ", "アルマジロ", "タツノオトシゴ", "孔雀", "ヤドカリ", "カモノハシ", "ハリネズミ", "ナマケモノ", "マンタ", "イグアナ", "ペリカン", "サンショウウオ", "キリン", "シーラカンス", "カワウソ", "オオカミ", "トナカイ", "カブトムシ"],
  "場所": ["地下鉄のホーム", "古本屋", "美術室", "灯台", "温室", "映画館の客席", "神社の参道", "水族館", "屋上庭園", "深夜のコンビニ", "駅前広場", "天文台", "市場", "廃校", "港", "図書館", "画材店", "研究室", "サーカス小屋", "裁判所"],
  "動作": ["綱渡りをする", "寝坊して走る", "内緒話をする", "転びそうになる", "料理を焦がす", "写真を現像する", "傘を忘れる", "鏡を磨く", "落とし物を探す", "拍手を浴びる", "花束を渡す", "迷子になる", "変装する", "発掘する", "謝る", "合図を送る", "爆笑する", "封印を解く", "早着替えする", "地図を読む"],
  "概念": ["遠近法", "重力", "嫉妬", "静寂", "タイムスリップ", "既視感", "偶然", "反射", "孤独", "勝利", "混乱", "透明", "記憶", "成長", "矛盾", "流行", "バランス", "余白", "緊張感", "リズム"],
  "作品風": ["浮世絵風の猫", "キュビスムの自転車", "印象派の雨", "漫画の必殺技", "映画ポスター風の朝食", "古代壁画のスマホ", "抽象画の運動会", "劇画調のプリン", "絵本風の裁判", "広告ポスターの宇宙人", "版画風の温泉", "水墨画のロボット", "ロゴ風の失恋", "ポップアートの寿司", "写実的な魔法", "ステンドグラスの昼寝", "粘土アニメ風の会議", "標識風の友情", "美術館ポスターの遅刻", "図鑑風の怪盗"],
  "美術部向け": ["クロッキー中の焦り", "パースが崩壊した街", "筆洗バケツ", "乾いていない油絵", "デッサン人形の反乱", "講評会の沈黙", "締切前夜", "影だけで描く友情", "石膏像と目が合う", "構図に悩む人", "補色だけの夕焼け", "消しゴムのかす", "透明水彩のにじみ", "木炭で描いた雷", "巨大なイーゼル", "モデルが動いた瞬間", "額縁の中の部室", "下描きが本番を超える", "絵の具の沼", "一点透視の迷路"],
};

const modifiers = [
  "", "を5秒で説明する絵", "を真上から見た絵", "を影だけで表す", "を怒らせた状態",
  "が未来にある姿", "を小学生にも伝わるように", "を一筆書き風に", "を巨大化させる",
  "を透明に見せる", "を古代文明風に", "が失敗した瞬間", "を静物画っぽく",
  "をポスターとして描く", "を反対語と一緒に描く",
];

function scoreFor(index) {
  const roll = (index * 37) % 100;
  if (roll < 24) return 1;
  if (roll < 46) return 2;
  if (roll < 64) return 3;
  if (roll < 78) return 4;
  if (roll < 88) return 5;
  if (roll < 94) return 6;
  if (roll < 97) return 7;
  if (roll < 99) return 8;
  return index % 5 === 0 ? 10 : 9;
}

function difficultyFor(score) {
  if (score <= 2) return "導入";
  if (score <= 4) return "普通";
  if (score <= 6) return "難";
  if (score <= 8) return "激ムズ";
  return "伝説";
}

function defaultCards() {
  const cards = [];
  let id = 1;
  for (const category of categories) {
    for (const word of baseWords[category]) {
      for (const mod of modifiers) {
        const score = scoreFor(id);
        const hardMod = score >= 8 && mod === "" ? "を比喩だけで表す" : mod;
        cards.push({
          id: `c${id}`,
          text: `${word}${hardMod}`,
          category,
          score,
          difficulty: difficultyFor(score),
        });
        id += 1;
        if (cards.length === 999) return cards;
      }
    }
  }
  return cards.slice(0, 999);
}

function makeTeams(count = 3) {
  return colors.slice(0, count).map((color, index) => ({
    id: `t${index + 1}`,
    name: `${color.name}チーム`,
    color: color.value,
    second: color.second,
    score: 0,
    log: [],
  }));
}

function freshState() {
  return {
    cards: defaultCards(),
    teams: makeTeams(3),
    settings: { teamCount: 3, limit: 8, seconds: 120, rounds: 0 },
    currentTeam: 0,
    round: 1,
    deck: [],
    drawn: [],
    running: false,
    timeLeft: 120,
    turnStarted: false,
    turnNumber: 1,
    currentCardId: null,
    ended: false,
  };
}

let state = loadState();
let timer = null;

const $ = (id) => document.getElementById(id);

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.cards?.length) {
      return {
        ...freshState(),
        ...saved,
        running: false,
        turnStarted: false,
        timeLeft: saved.settings?.seconds || 120,
        drawn: [],
        currentCardId: null,
      };
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return freshState();
}

function saveState() {
  const saved = {
    cards: state.cards,
    teams: state.teams,
    settings: state.settings,
    currentTeam: state.currentTeam,
    round: state.round,
    deck: state.deck,
    turnNumber: state.turnNumber,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
}

function shuffle(items) {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function ensureDeck() {
  if (!state.deck.length) {
    state.deck = shuffle(state.cards.map((card) => card.id));
  }
}

function currentTeam() {
  return state.teams[state.currentTeam];
}

function cardById(id) {
  return state.cards.find((card) => card.id === id);
}

function formatTime(seconds) {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

function setTheme() {
  const team = currentTeam();
  document.documentElement.style.setProperty("--accent", team.color);
  document.documentElement.style.setProperty("--accent-2", team.second);
}

function render() {
  setTheme();
  $("currentTeam").textContent = currentTeam().name;
  $("roundStatus").textContent = state.ended ? "終了" : state.settings.rounds ? `${state.round}/${state.settings.rounds}周` : `${state.round}周目`;
  $("timeLeft").textContent = formatTime(state.timeLeft);
  $("timerHint").textContent = state.running ? "進行中" : state.turnStarted ? "一時停止/再開" : "タップで開始";
  $("drawButton").disabled = !state.turnStarted || (!state.running && state.timeLeft === 0) || state.drawn.length >= state.settings.limit || state.ended;
  $("giveUpButton").disabled = !state.turnStarted || state.ended;
  $("nextButton").disabled = state.ended;
  $("turnCount").textContent = state.drawn.length;
  $("turnLimit").textContent = state.settings.limit;

  const current = cardById(state.currentCardId);
  $("promptCategory").textContent = current ? current.category : state.turnStarted ? "カードを引いてください" : "タイマー開始後にカードを引けます";
  $("promptText").textContent = current ? current.text : state.ended ? "ゲーム終了" : "準備中";
  $("promptDifficulty").textContent = current ? current.difficulty : state.turnStarted ? "開始済み" : "未開始";
  $("promptScore").textContent = current ? `${current.score}点` : "0点";

  renderDrawn();
  renderScoreboard();
  renderHost();
  saveState();
}

function renderDrawn() {
  const list = $("drawnList");
  if (!state.drawn.length) {
    list.innerHTML = `<div class="empty">このターンのカードはまだありません</div>`;
    return;
  }
  list.innerHTML = state.drawn.map((entry) => {
    const card = cardById(entry.id);
    if (!card) return "";
    return `
      <div class="drawn-card ${entry.scored ? "scored" : ""}">
        <div>
          <p class="card-title">${escapeHtml(card.text)}</p>
          <span class="card-info">${card.category} / ${card.difficulty} / ${card.score}点</span>
        </div>
        <button class="score-button ${entry.scored ? "on" : ""}" data-score="${entry.id}" type="button">
          ${entry.scored ? "取消" : `+${card.score}`}
        </button>
      </div>`;
  }).join("");
}

function renderScoreboard() {
  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  $("leaderTitle").textContent = sorted[0] ? `${sorted[0].name} ${sorted[0].score}点` : "";
  $("scoreboard").innerHTML = sorted.map((team, index) => `
    <div class="score-row" data-team="${team.id}">
      <i class="team-dot" style="background:${team.color}"></i>
      <div>
        <p class="card-title">${index + 1}. ${escapeHtml(team.name)}</p>
        <span class="card-info">${team.log.length} 枚得点</span>
      </div>
      <button class="detail-button" data-detail="${team.id}" type="button">${team.score}点</button>
      <div class="score-detail">
        ${team.log.length ? team.log.slice().reverse().map((log) => `T${log.turn} / ${log.round}周目: ${escapeHtml(log.text)}（${log.score}点）`).join("<br>") : "得点履歴なし"}
      </div>
    </div>
  `).join("");
}

function renderHost() {
  $("teamCountInput").value = state.settings.teamCount;
  $("limitInput").value = state.settings.limit;
  $("timeInput").value = state.settings.seconds;
  $("roundInput").value = String(state.settings.rounds);
  $("libraryCount").textContent = state.cards.length;

  $("teamNameList").innerHTML = state.teams.map((team) => `
    <div class="team-name-row">
      <i style="--team-color:${team.color}"></i>
      <input data-team-name="${team.id}" type="text" value="${escapeAttr(team.name)}" />
    </div>
  `).join("");

  if (!$("newCardCategory").children.length) {
    $("newCardCategory").innerHTML = categories.map((cat) => `<option>${cat}</option>`).join("");
    $("newCardScore").innerHTML = Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}点</option>`).join("");
    $("newCardScore").value = "3";
  }

  renderLibrary();
}

function renderLibrary() {
  const q = $("cardSearch").value.trim().toLowerCase();
  const cards = state.cards.filter((card) => !q || card.text.toLowerCase().includes(q) || card.category.toLowerCase().includes(q)).slice(0, 80);
  $("libraryList").innerHTML = cards.map((card) => `
    <div class="library-item">
      <input data-card-text="${card.id}" value="${escapeAttr(card.text)}" />
      <select data-card-score="${card.id}">
        ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${card.score === i + 1 ? "selected" : ""}>${i + 1}</option>`).join("")}
      </select>
      <button class="mini-button" data-delete-card="${card.id}" type="button">削除</button>
    </div>
  `).join("");
}

function startTimer() {
  if (state.ended) return;
  state.turnStarted = true;
  if (state.timeLeft <= 0) state.timeLeft = state.settings.seconds;
  state.running = !state.running;
  clearInterval(timer);
  if (state.running) {
    timer = setInterval(() => {
      state.timeLeft -= 1;
      if (state.timeLeft <= 0) {
        state.timeLeft = 0;
        clearInterval(timer);
        state.running = false;
        render();
        setTimeout(nextTurn, 650);
        return;
      }
      render();
    }, 1000);
  }
  render();
}

function drawCard() {
  if (!state.turnStarted || state.drawn.length >= state.settings.limit || state.ended) return;
  ensureDeck();
  if (!state.deck.length) ensureDeck();
  const id = state.deck.pop();
  state.currentCardId = id;
  state.drawn.push({ id, scored: false });
  render();
}

function toggleScore(id) {
  const entry = state.drawn.find((item) => item.id === id);
  const card = cardById(id);
  if (!entry || !card) return;
  const team = currentTeam();
  if (entry.scored) {
    entry.scored = false;
    team.score -= card.score;
    const idx = team.log.findIndex((log) => log.cardId === id && log.turn === state.turnNumber);
    if (idx >= 0) team.log.splice(idx, 1);
  } else {
    entry.scored = true;
    team.score += card.score;
    team.log.push({ cardId: id, text: card.text, score: card.score, turn: state.turnNumber, round: state.round });
  }
  render();
}

function nextTurn() {
  if (state.ended) return;
  clearInterval(timer);
  state.running = false;
  state.turnStarted = false;
  state.timeLeft = state.settings.seconds;
  state.drawn = [];
  state.currentCardId = null;

  if (state.currentTeam === state.teams.length - 1) {
    state.currentTeam = 0;
    state.round += 1;
    if (state.settings.rounds && state.round > state.settings.rounds) {
      state.ended = true;
    }
  } else {
    state.currentTeam += 1;
  }
  state.turnNumber += 1;
  render();
}

function giveUp() {
  if (!state.turnStarted || state.ended) return;
  clearInterval(timer);
  state.running = false;
  state.timeLeft = 0;
  render();
  setTimeout(nextTurn, 550);
}

function applySettings() {
  const count = clamp(Number($("teamCountInput").value), 2, 8);
  state.settings = {
    teamCount: count,
    limit: clamp(Number($("limitInput").value), 1, 30),
    seconds: clamp(Number($("timeInput").value), 15, 600),
    rounds: Number($("roundInput").value),
  };
  const old = state.teams;
  state.teams = makeTeams(count).map((team, index) => old[index] ? { ...team, name: old[index].name, score: old[index].score, log: old[index].log || [] } : team);
  state.currentTeam = Math.min(state.currentTeam, state.teams.length - 1);
  if (!state.turnStarted) state.timeLeft = state.settings.seconds;
  render();
}

function resetGame() {
  clearInterval(timer);
  const cards = state.cards;
  const settings = state.settings;
  state = freshState();
  state.cards = cards;
  state.settings = settings;
  state.teams = makeTeams(settings.teamCount);
  state.timeLeft = settings.seconds;
  render();
}

function addCard() {
  const text = $("newCardText").value.trim();
  if (!text) return;
  const score = Number($("newCardScore").value);
  state.cards.push({
    id: `u${Date.now()}`,
    text,
    category: $("newCardCategory").value,
    score,
    difficulty: difficultyFor(score),
  });
  $("newCardText").value = "";
  render();
}

function deleteCard(id) {
  state.cards = state.cards.filter((card) => card.id !== id);
  state.deck = state.deck.filter((cardId) => cardId !== id);
  state.drawn = state.drawn.filter((entry) => entry.id !== id);
  render();
}

function updateCard(id, patch) {
  const card = cardById(id);
  if (!card) return;
  Object.assign(card, patch);
  if (patch.score) card.difficulty = difficultyFor(card.score);
  render();
}

function updateTeamName(id, name) {
  const team = state.teams.find((item) => item.id === id);
  if (team) team.name = name.trim() || team.name;
  render();
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Number.isFinite(value) ? value : min));
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char]));
}

function escapeAttr(text) {
  return escapeHtml(text).replace(/`/g, "&#096;");
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) return;
  if (target.id === "timerButton" || target.closest("#timerButton")) startTimer();
  if (target.id === "drawButton") drawCard();
  if (target.id === "nextButton") nextTurn();
  if (target.id === "giveUpButton") giveUp();
  if (target.id === "applySettings") applySettings();
  if (target.id === "resetGame") resetGame();
  if (target.id === "addCard") addCard();
  if (target.id === "themeButton") {
    state.currentTeam = (state.currentTeam + 1) % state.teams.length;
    state.drawn = [];
    state.currentCardId = null;
    state.turnStarted = false;
    state.running = false;
    state.timeLeft = state.settings.seconds;
    clearInterval(timer);
    render();
  }
  const scoreId = target.dataset.score;
  if (scoreId) toggleScore(scoreId);
  const detailId = target.dataset.detail;
  if (detailId) target.closest(".score-row")?.classList.toggle("open");
  const deleteId = target.dataset.deleteCard;
  if (deleteId) deleteCard(deleteId);
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement)) return;
  if (target.dataset.cardScore) updateCard(target.dataset.cardScore, { score: Number(target.value) });
  if (target.dataset.teamName) updateTeamName(target.dataset.teamName, target.value);
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  if (target.id === "cardSearch") renderLibrary();
  if (target.dataset.cardText) {
    const card = cardById(target.dataset.cardText);
    if (card) {
      card.text = target.value;
      saveState();
    }
  }
});

ensureDeck();
render();
