const STORAGE_KEY = "phone-pictionary-v2";
const SETTINGS_VERSION = 2;
const DEFAULT_SETTINGS = { teamCount: 2, limit: 20, seconds: 120, rounds: 0 };

const colors = [
  { name: "Red", value: "#e64f55", second: "#ffb45c" },
  { name: "Blue", value: "#3f88ff", second: "#6ee7f2" },
  { name: "Green", value: "#2fbf71", second: "#e6d65a" },
  { name: "Yellow", value: "#eab308", second: "#f97316" },
  { name: "Purple", value: "#a855f7", second: "#f472b6" },
  { name: "Cyan", value: "#06b6d4", second: "#34d399" },
  { name: "Orange", value: "#f97316", second: "#fb7185" },
  { name: "White", value: "#e5e7eb", second: "#94a3b8" },
];

const categories = ["Animals", "Actions", "Objects", "Places", "Art", "Ideas"];

const subjects = {
  Animals: [
    "a chameleon", "an owl", "a jellyfish", "an armadillo", "a seahorse", "a peacock",
    "a hermit crab", "a platypus", "a hedgehog", "a sloth", "a manta ray", "an iguana",
    "a pelican", "a salamander", "a giraffe", "a coelacanth", "an otter", "a wolf",
    "a reindeer", "a rhinoceros beetle", "a red panda", "a capybara", "a flamingo",
    "an octopus", "a pangolin", "a narwhal", "a meerkat", "a whale shark", "a toucan",
    "a dragonfly", "a raccoon dog", "a lynx", "a koala", "a sea turtle", "a snow leopard",
    "a poison dart frog", "a praying mantis", "a mole", "a bat", "a fox", "a swan",
    "a crocodile", "a lobster", "a squirrel", "a camel", "a penguin", "a shark",
    "a snail", "a beetle", "a ram", "a falcon", "a panda", "a crab", "a rabbit",
    "a horse", "a goat", "a tiger", "an elephant", "a lion", "a zebra", "a crane",
    "a frog", "a lizard", "a seal", "a dolphin", "a gorilla", "a buffalo", "a duck",
    "a sheep", "a rooster", "a butterfly", "a spider", "a scorpion", "a starfish",
    "a squid", "a walrus", "a hyena", "a boar", "a hummingbird", "an anteater"
  ],
  Actions: [
    "running late", "whispering a secret", "balancing on a rope", "burning dinner",
    "searching for lost keys", "taking a dramatic bow", "building a tiny bridge",
    "falling asleep in class", "opening a mysterious box", "dodging a surprise rainstorm",
    "posing for a portrait", "digging up a treasure", "escaping a maze", "throwing a parade",
    "carrying too many bags", "signaling from far away", "trying not to laugh", "changing costumes",
    "reading a confusing map", "making a grand apology", "fixing a broken bicycle",
    "hiding a birthday present", "painting without looking", "landing on the moon"
  ],
  Objects: [
    "a fountain pen", "a folding umbrella", "a plaster bust", "a magnifying glass",
    "an hourglass", "a gramophone", "a pencil sharpener", "a bunch of keys",
    "a carving knife", "a globe", "an old telephone", "a lantern", "a microscope",
    "a metronome", "a chessboard", "a typewriter", "a compass", "a paint box",
    "a broken clock", "a telescope", "a mirror", "a mask", "a suitcase", "a paper crane",
    "a teapot", "a violin", "a camera", "a pair of scissors", "a treasure map",
    "a light bulb", "a crown", "a ladder", "a vase", "a robot vacuum"
  ],
  Places: [
    "a subway platform", "a used bookshop", "an art room", "a lighthouse", "a greenhouse",
    "a movie theater", "a shrine path", "an aquarium", "a rooftop garden", "a night convenience store",
    "a train station plaza", "an observatory", "a market", "an abandoned school", "a harbor",
    "a library", "an art supply store", "a laboratory", "a circus tent", "a courtroom",
    "a museum hallway", "a mountain cabin", "a desert oasis", "a crowded kitchen",
    "a rainy bus stop", "a floating island", "a secret basement", "a winter festival"
  ],
  Art: [
    "a cat in a woodblock print", "a bicycle in cubist style", "rain in impressionist style",
    "a comic book finishing move", "breakfast as a movie poster", "a phone in an ancient mural",
    "a sports day as abstract art", "pudding in a dramatic manga style", "a courtroom in a picture book",
    "an alien in an advertisement poster", "a hot spring as a linocut", "a robot in ink wash style",
    "heartbreak as a logo", "sushi in pop art style", "realistic magic", "a nap in stained glass",
    "a meeting in clay animation style", "friendship as a warning sign", "being late as a museum poster",
    "a phantom thief in encyclopedia style", "a landscape made of only triangles", "a portrait without a face"
  ],
  Ideas: [
    "perspective", "gravity", "jealousy", "silence", "time travel", "deja vu", "coincidence",
    "reflection", "loneliness", "victory", "confusion", "transparency", "memory", "growth",
    "contradiction", "trend", "balance", "negative space", "tension", "rhythm", "nostalgia",
    "luck", "camouflage", "echo", "patience", "speed", "symmetry", "a secret", "a promise"
  ],
};

const challenges = [
  { add: 0, text: (s) => `Draw ${s}.` },
  { add: 1, text: (s) => `Draw ${s} in motion.` },
  { add: 1, text: (s) => `Draw ${s} from above.` },
  { add: 2, text: (s) => `Draw ${s} using only simple shapes.` },
  { add: 2, text: (s) => `Draw ${s} as if it is huge.` },
  { add: 3, text: (s) => `Draw ${s} without using its most obvious shape.` },
  { add: 4, text: (s) => `Draw ${s} as a poster that people can understand quickly.` },
  { add: 5, text: (s) => `Draw ${s} as a clever visual metaphor.` },
];

function hashText(text) {
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function baseScore(category, subject) {
  const longWord = subject.length > 18 ? 1 : 0;
  if (category === "Animals") return 1 + (hashText(subject) % 3) + longWord;
  if (category === "Ideas") return 3 + (hashText(subject) % 3);
  if (category === "Art") return 3 + (hashText(subject) % 2);
  return 2 + (hashText(subject) % 3);
}

function scoreFor(category, subject, challenge, id) {
  let score = baseScore(category, subject) + challenge.add;
  if (id % 149 === 0) score += 2;
  if (id % 97 === 0) score += 1;
  return Math.max(1, Math.min(10, score));
}

function difficultyFor(score) {
  if (score <= 2) return "Easy";
  if (score <= 4) return "Medium";
  if (score <= 6) return "Hard";
  if (score <= 8) return "Expert";
  return "Legendary";
}

function photoQuery(category, subject, score) {
  if (category === "Animals") return subject.replace(/^(a|an) /, "");
  if (score >= 8) return `${subject.replace(/^(a|an) /, "")}, drawing reference`;
  return "";
}

function defaultCards() {
  const cards = [];
  let id = 1;
  for (const category of categories) {
    for (const subject of subjects[category]) {
      for (const challenge of challenges) {
        const score = scoreFor(category, subject, challenge, id);
        const imageQuery = photoQuery(category, subject, score);
        cards.push({
          id: `c${id}`,
          text: challenge.text(subject),
          category,
          score,
          difficulty: difficultyFor(score),
          imageQuery,
        });
        id += 1;
      }
    }
  }
  return cards.slice(0, 999);
}

function makeTeams(count = DEFAULT_SETTINGS.teamCount) {
  return colors.slice(0, count).map((color, index) => ({
    id: `t${index + 1}`,
    name: `${color.name} Team`,
    color: color.value,
    second: color.second,
    score: 0,
    log: [],
  }));
}

function freshState() {
  return {
    schemaVersion: SETTINGS_VERSION,
    cards: defaultCards(),
    teams: makeTeams(DEFAULT_SETTINGS.teamCount),
    settings: { ...DEFAULT_SETTINGS },
    currentTeam: 0,
    round: 1,
    deck: [],
    drawn: [],
    running: false,
    timeLeft: DEFAULT_SETTINGS.seconds,
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
      const base = freshState();
      const migratedSettings = saved.schemaVersion === SETTINGS_VERSION ? saved.settings : { ...DEFAULT_SETTINGS };
      return {
        ...base,
        cards: saved.schemaVersion === SETTINGS_VERSION ? saved.cards : base.cards,
        teams: saved.schemaVersion === SETTINGS_VERSION ? saved.teams : makeTeams(DEFAULT_SETTINGS.teamCount),
        settings: migratedSettings,
        currentTeam: saved.schemaVersion === SETTINGS_VERSION ? saved.currentTeam || 0 : 0,
        round: saved.schemaVersion === SETTINGS_VERSION ? saved.round || 1 : 1,
        deck: saved.schemaVersion === SETTINGS_VERSION ? saved.deck || [] : [],
        turnNumber: saved.schemaVersion === SETTINGS_VERSION ? saved.turnNumber || 1 : 1,
        running: false,
        turnStarted: false,
        timeLeft: migratedSettings.seconds || DEFAULT_SETTINGS.seconds,
        drawn: [],
        currentCardId: null,
        ended: false,
        schemaVersion: SETTINGS_VERSION,
      };
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return freshState();
}

function saveState() {
  const saved = {
    schemaVersion: SETTINGS_VERSION,
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
  return state.teams[state.currentTeam] || state.teams[0];
}

function cardById(id) {
  return state.cards.find((card) => card.id === id);
}

function cardNumber(card) {
  const match = /^c(\d+)$/.exec(card.id);
  if (match) return `No. ${match[1]}`;
  const addedCards = state.cards.filter((item) => !/^c\d+$/.test(item.id));
  const addedIndex = Math.max(0, addedCards.findIndex((item) => item.id === card.id));
  return `No. A${addedIndex + 1} (added)`;
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

function imageUrl(card) {
  if (!card?.imageQuery) return "";
  const query = encodeURIComponent(card.imageQuery.toLowerCase().replace(/[^\w\s,-]/g, "").trim());
  const lock = hashText(card.id + card.imageQuery) % 9999;
  return `https://loremflickr.com/640/420/${query}?lock=${lock}`;
}

function renderPromptImage(card) {
  const box = $("promptImage");
  const url = imageUrl(card);
  if (!url) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }
  box.hidden = false;
  box.innerHTML = `<img src="${escapeAttr(url)}" alt="Reference photo for ${escapeAttr(card.text)}" loading="lazy" onerror="this.parentElement.hidden=true" />`;
}

function render() {
  setTheme();
  $("currentTeam").textContent = currentTeam().name;
  $("roundStatus").textContent = state.ended ? "Finished" : state.settings.rounds ? `Round ${state.round}/${state.settings.rounds}` : `Round ${state.round} / ∞`;
  $("timeLeft").textContent = formatTime(state.timeLeft);
  $("timerHint").textContent = state.running ? "Running" : state.turnStarted ? "Pause / resume" : "Tap to start";
  $("drawButton").disabled = !state.turnStarted || (!state.running && state.timeLeft === 0) || state.drawn.length >= state.settings.limit || state.ended;
  $("giveUpButton").disabled = !state.turnStarted || state.ended;
  $("nextButton").disabled = state.ended;
  $("turnCount").textContent = state.drawn.length;
  $("turnLimit").textContent = state.settings.limit;

  const current = cardById(state.currentCardId);
  renderPromptImage(current);
  $("promptCategory").textContent = current ? `${cardNumber(current)} / ${current.category}` : state.turnStarted ? "Draw a card." : "Start the timer, then draw cards.";
  $("promptText").textContent = current ? current.text : state.ended ? "Game finished" : "Ready";
  $("promptDifficulty").textContent = current ? current.difficulty : state.turnStarted ? "Turn started" : "Not started";
  $("promptScore").textContent = current ? `${current.score} pts` : "0 pts";

  renderDrawn();
  renderScoreboard();
  renderHost();
  saveState();
}

function renderDrawn() {
  const list = $("drawnList");
  if (!state.drawn.length) {
    list.innerHTML = `<div class="empty">No cards drawn this turn yet.</div>`;
    return;
  }
  list.innerHTML = state.drawn.map((entry) => {
    const card = cardById(entry.id);
    if (!card) return "";
    return `
      <div class="drawn-card ${entry.scored ? "scored" : ""}">
        <div>
          <p class="card-title">${escapeHtml(card.text)}</p>
          <span class="card-info">${cardNumber(card)} / ${card.category} / ${card.difficulty} / ${card.score} pts</span>
        </div>
        <button class="score-button ${entry.scored ? "on" : ""}" data-score="${entry.id}" type="button">
          ${entry.scored ? "Undo" : `+${card.score}`}
        </button>
      </div>`;
  }).join("");
}

function renderScoreboard() {
  const sorted = [...state.teams].sort((a, b) => b.score - a.score);
  $("leaderTitle").textContent = sorted[0] ? `${sorted[0].name} ${sorted[0].score} pts` : "";
  $("scoreboard").innerHTML = sorted.map((team, index) => `
    <div class="score-row" data-team="${team.id}">
      <i class="team-dot" style="background:${team.color}"></i>
      <div>
        <p class="card-title">${index + 1}. ${escapeHtml(team.name)}</p>
        <span class="card-info">${team.log.length} scored cards</span>
      </div>
      <button class="detail-button" data-detail="${team.id}" type="button">${team.score} pts</button>
      <div class="score-detail">
        ${team.log.length ? team.log.slice().reverse().map((log) => `Turn ${log.turn} / Round ${log.round}: ${escapeHtml(log.cardNo || "No. ?")} / ${escapeHtml(log.text)} (${log.score} pts)`).join("<br>") : "No scored cards yet."}
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
    $("newCardScore").innerHTML = Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1} pts</option>`).join("");
    $("newCardScore").value = "3";
  }

  renderLibrary();
}

function renderLibrary() {
  const q = $("cardSearch").value.trim().toLowerCase();
  const cards = state.cards.filter((card) => !q || card.text.toLowerCase().includes(q) || card.category.toLowerCase().includes(q)).slice(0, 80);
  $("libraryList").innerHTML = cards.map((card) => `
    <div class="library-item">
      <span class="card-number">${escapeHtml(cardNumber(card))}</span>
      <input data-card-text="${card.id}" value="${escapeAttr(card.text)}" />
      <select data-card-score="${card.id}">
        ${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${card.score === i + 1 ? "selected" : ""}>${i + 1}</option>`).join("")}
      </select>
      <button class="mini-button" data-delete-card="${card.id}" type="button">Delete</button>
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
    team.log.push({ cardId: id, cardNo: cardNumber(card), text: card.text, score: card.score, turn: state.turnNumber, round: state.round });
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

function resetToDefaults() {
  clearInterval(timer);
  const cards = state.cards;
  state = freshState();
  state.cards = cards;
  state.deck = [];
  ensureDeck();
  render();
}

function addCard() {
  const text = $("newCardText").value.trim();
  if (!text) return;
  const score = Number($("newCardScore").value);
  const category = $("newCardCategory").value;
  state.cards.push({
    id: `u${Date.now()}`,
    text,
    category,
    score,
    difficulty: difficultyFor(score),
    imageQuery: category === "Animals" || score >= 8 ? text.replace(/^Draw /, "").replace(/[.]/g, "") : "",
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
  if (patch.score) {
    card.difficulty = difficultyFor(card.score);
    card.imageQuery = card.category === "Animals" || card.score >= 8 ? card.text.replace(/^Draw /, "").replace(/[.]/g, "") : "";
  }
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
  if (target.id === "resetDefaults") resetToDefaults();
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
      card.imageQuery = card.category === "Animals" || card.score >= 8 ? target.value.replace(/^Draw /, "").replace(/[.]/g, "") : "";
      saveState();
    }
  }
});

ensureDeck();
render();
