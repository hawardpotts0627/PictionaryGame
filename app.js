const STORAGE_KEY = "phone-pictionary-v2";
const SETTINGS_VERSION = 8;
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

const categories = ["Animals", "People", "Objects", "Places", "Countries", "States"];

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
  People: [
    "a chef", "a detective", "a teacher", "a musician", "a firefighter", "an astronaut",
    "a librarian", "a magician", "a gardener", "a photographer", "a scientist", "a sailor",
    "a doctor", "a pilot", "a judge", "a dancer", "a delivery driver", "a museum guard",
    "a baker", "a carpenter", "a reporter", "a mountain climber", "a barber", "a tailor",
    "a street performer", "a tour guide", "a game designer", "a weather forecaster",
    "a train conductor", "a zookeeper", "a fortune teller", "a race car driver"
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
  Countries: [
    "Japan", "France", "Brazil", "Egypt", "India", "Canada", "Mexico", "Italy", "Kenya",
    "Australia", "Norway", "Thailand", "Greece", "Peru", "Morocco", "Iceland", "Turkey",
    "South Korea", "Spain", "Germany", "Vietnam", "New Zealand", "Argentina", "Finland",
    "Indonesia", "South Africa", "Chile", "Portugal", "Switzerland", "Mongolia"
  ],
  States: [
    "a power outage", "a sudden rainstorm", "a long silence", "a crowded elevator",
    "a messy room", "a surprise birthday party", "a lost child", "a broken window",
    "a spilled drink", "a missing wallet", "a traffic jam", "a school fire drill",
    "a locked door", "a phone with no battery", "a sleepy morning", "a noisy classroom",
    "a very windy day", "a forgotten umbrella", "a suitcase that will not close",
    "a kitchen full of smoke", "a hallway full of balloons", "a waiting room",
    "a secret note", "a line that never moves", "a team celebrating", "a team arguing",
    "a child hiding", "a person getting bad news", "a person feeling relieved",
    "a person trying to stay awake", "a room after a party", "a desk before a deadline"
  ],
};

const animalActions = [
  { add: 0, text: "sleeping" },
  { add: 1, text: "jumping over a fence" },
  { add: 1, text: "chasing a ball" },
  { add: 1, text: "hiding behind a tree" },
  { add: 1, text: "guarding a doorway" },
  { add: 1, text: "stealing a snack" },
  { add: 2, text: "wearing a tiny crown" },
  { add: 2, text: "balancing on a rock" },
  { add: 2, text: "riding a skateboard" },
  { add: 2, text: "checking a mailbox" },
  { add: 3, text: "carrying an oversized backpack" },
  { add: 3, text: "looking at its reflection" },
  { add: 3, text: "stealing a sandwich" },
  { add: 3, text: "waiting at a bus stop" },
  { add: 3, text: "wearing rain boots" },
  { add: 4, text: "lost in tall grass" },
  { add: 4, text: "hosting a tiny tea party" },
  { add: 4, text: "driving a toy car" },
  { add: 4, text: "solving a puzzle" },
  { add: 4, text: "performing a magic trick" },
  { add: 5, text: "leading a parade" },
  { add: 5, text: "conducting an orchestra" },
  { add: 5, text: "serving as a museum guide" },
  { add: 5, text: "building a blanket fort" },
  { add: 6, text: "guarding a treasure chest" },
  { add: 6, text: "teaching a class" },
  { add: 7, text: "trying to look innocent after causing trouble" },
  { add: 7, text: "announcing breaking news on television" },
  { add: 8, text: "interrupting a wedding" },
];

const objectChallenges = [
  { add: 0, text: (s) => `Draw ${s}.` },
  { add: 1, text: (s) => `Draw someone finding ${s}.` },
  { add: 1, text: (s) => `Draw ${s} under a table.` },
  { add: 2, text: (s) => `Draw ${s} during a storm.` },
  { add: 2, text: (s) => `Draw ${s} being used the wrong way.` },
  { add: 2, text: (s) => `Draw ${s} hidden in a messy room.` },
  { add: 3, text: (s) => `Draw ${s} being repaired in a hurry.` },
  { add: 3, text: (s) => `Draw ${s} causing a small accident.` },
  { add: 3, text: (s) => `Draw ${s} as the only clue in a mystery.` },
  { add: 4, text: (s) => `Draw ${s} floating down a river.` },
  { add: 4, text: (s) => `Draw ${s} being protected like a treasure.` },
  { add: 4, text: (s) => `Draw ${s} arriving in the mail.` },
  { add: 5, text: (s) => `Draw ${s} becoming the center of attention.` },
  { add: 5, text: (s) => `Draw ${s} in a museum display case.` },
  { add: 6, text: (s) => `Draw ${s} causing everyone to panic.` },
  { add: 7, text: (s) => `Draw ${s} being treated like a dangerous object.` },
];

const placeChallenges = [
  { add: 0, text: (s) => `Draw ${s}.` },
  { add: 1, text: (s) => `Draw a lost tourist at ${s}.` },
  { add: 1, text: (s) => `Draw ${s} during heavy rain.` },
  { add: 2, text: (s) => `Draw a hidden door at ${s}.` },
  { add: 2, text: (s) => `Draw ${s} at midnight.` },
  { add: 2, text: (s) => `Draw a long line of people at ${s}.` },
  { add: 3, text: (s) => `Draw ${s} after everyone has gone home.` },
  { add: 3, text: (s) => `Draw ${s} during a power outage.` },
  { add: 3, text: (s) => `Draw a surprise performance at ${s}.` },
  { add: 4, text: (s) => `Draw ${s} being flooded with balloons.` },
  { add: 4, text: (s) => `Draw ${s} with one object completely out of place.` },
  { add: 5, text: (s) => `Draw ${s} being used for the wrong purpose.` },
  { add: 5, text: (s) => `Draw ${s} during a very awkward silence.` },
  { add: 6, text: (s) => `Draw ${s} after something has gone badly wrong.` },
  { add: 7, text: (s) => `Draw ${s} during an emergency announcement.` },
];

const peopleActions = [
  { add: 0, text: "running late for an appointment" },
  { add: 1, text: "whispering a secret" },
  { add: 1, text: "balancing on a rope" },
  { add: 1, text: "searching for lost keys" },
  { add: 1, text: "trying to carry a huge cake" },
  { add: 1, text: "waiting for an important phone call" },
  { add: 2, text: "opening a mysterious box" },
  { add: 2, text: "dodging a sudden rainstorm" },
  { add: 2, text: "carrying too many bags" },
  { add: 2, text: "getting locked out" },
  { add: 2, text: "explaining a plan on a whiteboard" },
  { add: 3, text: "trying not to laugh" },
  { add: 3, text: "reading a confusing map" },
  { add: 3, text: "fixing a broken bicycle" },
  { add: 3, text: "chasing a runaway hat" },
  { add: 3, text: "protecting a tiny plant" },
  { add: 4, text: "hiding a birthday present" },
  { add: 4, text: "arriving at the wrong building" },
  { add: 4, text: "pretending to understand a strange machine" },
  { add: 4, text: "leading a tour in the wrong direction" },
  { add: 5, text: "arguing with their own reflection" },
  { add: 5, text: "escaping from a maze" },
  { add: 5, text: "trying to impress a very bored audience" },
  { add: 5, text: "calming down two angry customers" },
  { add: 6, text: "explaining a mistake to a crowd" },
  { add: 7, text: "pretending everything is fine during a disaster" },
  { add: 7, text: "being interviewed on live television" },
  { add: 8, text: "realizing they forgot something very important" },
];

const countryChallenges = [
  { add: 2, text: (s) => `Draw ${s} using famous food, landmarks, or clothing.` },
  { add: 3, text: (s) => `Draw a traveler arriving in ${s}.` },
  { add: 4, text: (s) => `Draw a festival in ${s}.` },
  { add: 5, text: (s) => `Draw ${s} as a crowded souvenir table.` },
  { add: 5, text: (s) => `Draw a sports fan visiting ${s}.` },
  { add: 6, text: (s) => `Draw a postcard from ${s} with three clues.` },
  { add: 6, text: (s) => `Draw a school trip to ${s}.` },
  { add: 7, text: (s) => `Draw a weather report from ${s}.` },
  { add: 8, text: (s) => `Draw someone packing a suitcase for ${s}.` },
];

const stateChallenges = [
  { add: 0, text: (s) => `Draw ${s}.` },
  { add: 1, text: (s) => `Draw a family dealing with ${s}.` },
  { add: 1, text: (s) => `Draw ${s} at school.` },
  { add: 2, text: (s) => `Draw ${s} in a small apartment.` },
  { add: 2, text: (s) => `Draw ${s} during a party.` },
  { add: 3, text: (s) => `Draw someone trying to hide ${s}.` },
  { add: 3, text: (s) => `Draw ${s} causing a misunderstanding.` },
  { add: 4, text: (s) => `Draw ${s} while everyone is in a hurry.` },
  { add: 4, text: (s) => `Draw ${s} in a public place.` },
  { add: 5, text: (s) => `Draw ${s} becoming the main problem of the day.` },
];

const deckLimits = {
  Animals: 560,
  People: 560,
  Objects: 320,
  Places: 420,
  Countries: 150,
  States: 300,
};

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
  if (category === "People") return 2 + (hashText(subject) % 3) + longWord;
  if (category === "Countries") return 3 + (hashText(subject) % 3);
  if (category === "States") return 2 + (hashText(subject) % 3);
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

const referenceSubjects = new Set([
  "chameleon", "jellyfish", "armadillo", "seahorse", "peacock", "hermit crab", "platypus",
  "hedgehog", "sloth", "manta ray", "iguana", "pelican", "salamander", "coelacanth",
  "rhinoceros beetle", "red panda", "capybara", "pangolin", "narwhal", "meerkat",
  "whale shark", "toucan", "dragonfly", "raccoon dog", "lynx", "snow leopard",
  "poison dart frog", "praying mantis", "hummingbird", "anteater", "gramophone",
  "plaster bust", "metronome", "typewriter", "compass", "observatory", "lighthouse",
  "greenhouse", "courtroom", "harbor", "aquarium"
]);

function imageHintsFor(category, subject, score) {
  const cleanSubject = subject.replace(/^(a|an) /, "");
  const hints = [];
  if (category === "Animals" && referenceSubjects.has(cleanSubject)) {
    hints.push({ label: "Animal", title: titleCase(cleanSubject) });
  } else if (category === "Countries") {
    hints.push({ label: "Country", title: subject });
  } else if (score >= 8 && ["Objects", "Places"].includes(category) && referenceSubjects.has(cleanSubject)) {
    hints.push({ label: category.slice(0, -1), title: titleCase(cleanSubject) });
  }
  return hints;
}

function titleCase(text) {
  return text.split(" ").map((word) => word ? word[0].toUpperCase() + word.slice(1) : word).join(" ");
}

function defaultCards() {
  const byCategory = {};
  let id = 1;
  for (const category of categories) {
    byCategory[category] = [];
    for (const subject of subjects[category]) {
      const challengeSet = category === "Animals"
        ? animalActions.map((action) => ({
          add: action.add,
          text: (animal) => `Draw ${animal} ${action.text}.`,
        }))
        : category === "People"
          ? peopleActions.map((action) => ({
            add: action.add,
            text: (person) => `Draw ${person} ${action.text}.`,
          }))
          : category === "Countries"
            ? countryChallenges
            : category === "Places"
              ? placeChallenges
              : category === "States"
                ? stateChallenges
                : objectChallenges;
      for (const challenge of challengeSet) {
        const score = scoreFor(category, subject, challenge, id);
        byCategory[category].push({
          id: `c${id}`,
          text: challenge.text(subject),
          category,
          score,
          difficulty: difficultyFor(score),
          imageHints: imageHintsFor(category, subject, score),
        });
        id += 1;
      }
    }
  }
  return categories.flatMap((category) => balancedTake(byCategory[category], deckLimits[category]));
}

function balancedTake(cards, limit) {
  return cards
    .map((card, index) => ({ card, sort: (index % 31) * 10000 + Math.floor(index / 31) }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, limit)
    .map((item) => item.card);
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
      const addedCards = (saved.cards || []).filter((card) => !/^c\d+$/.test(card.id));
      const migratedSettings = saved.schemaVersion === SETTINGS_VERSION ? saved.settings : { ...DEFAULT_SETTINGS };
      return {
        ...base,
        cards: saved.schemaVersion === SETTINGS_VERSION ? saved.cards : [...base.cards, ...addedCards],
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

let imageRequestId = 0;
let activeImageKey = "";
const imageCache = new Map();

function cardImageHints(card) {
  if (!card) return [];
  if (Array.isArray(card.imageHints)) return card.imageHints.slice(0, 2);
  if (card.imageQuery) return [{ label: "Reference", query: card.imageQuery }];
  return [];
}

async function searchReferenceImage(hint) {
  const title = (hint.title || hint.query || "").replace(/[^\w\s-]/g, " ").replace(/\s+/g, " ").trim();
  if (!title) return "";
  const normalized = title.toLowerCase();
  if (imageCache.has(normalized)) return imageCache.get(normalized);
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/\s+/g, "_"))}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("No exact article");
    const data = await response.json();
    const result = data.thumbnail?.source || data.originalimage?.source || "";
    imageCache.set(normalized, result);
    return result;
  } catch {
    imageCache.set(normalized, "");
    return "";
  }
}

function loadImage(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => resolve("");
    img.src = url;
  });
}

async function renderPromptImage(card) {
  const box = $("promptImage");
  const key = card?.id || "";
  if (activeImageKey === key) return;
  activeImageKey = key;
  const requestId = ++imageRequestId;
  const hints = cardImageHints(card);
  box.hidden = true;
  box.innerHTML = "";
  if (!hints.length) {
    return;
  }
  const loaded = [];
  for (const hint of hints) {
    const url = await searchReferenceImage(hint);
    if (requestId !== imageRequestId) return;
    const safeUrl = url ? await loadImage(url) : "";
    if (requestId !== imageRequestId) return;
    if (safeUrl) loaded.push({ ...hint, url: safeUrl });
  }
  if (!loaded.length) {
    box.hidden = true;
    box.innerHTML = "";
    return;
  }
  box.hidden = false;
  box.innerHTML = loaded.map((hint) => `
    <figure>
      <img src="${escapeAttr(hint.url)}" alt="${escapeAttr(hint.label)} reference image" loading="lazy" />
      <figcaption>${escapeHtml(hint.label)}</figcaption>
    </figure>
  `).join("");
}

function render() {
  setTheme();
  $("currentTeam").textContent = currentTeam().name;
  $("roundStatus").textContent = state.ended ? "Finished" : state.settings.rounds ? `Round ${state.round}/${state.settings.rounds}` : `Round ${state.round} / \u221e`;
  $("timeLeft").textContent = formatTime(state.timeLeft);
  $("timerHint").textContent = state.running ? "Running" : state.turnStarted ? "Pause / resume" : "Tap to start";
  $("drawButton").disabled = !state.turnStarted || (!state.running && state.timeLeft === 0) || state.drawn.length >= state.settings.limit || state.ended;
  $("giveUpButton").disabled = !state.turnStarted || state.ended;
  $("nextButton").disabled = state.ended;
  $("turnCount").textContent = state.drawn.length;
  $("turnLimit").textContent = state.settings.limit;

  const current = cardById(state.currentCardId);
  renderPromptImage(current);
  $("promptPanel").classList.toggle("waiting", !current && !state.ended);
  $("promptCategory").textContent = current ? `${cardNumber(current)} / ${current.category}` : state.turnStarted ? "Now draw cards" : "Turn setup";
  $("promptText").textContent = current ? current.text : state.ended ? "Game finished" : state.turnStarted ? "Draw a card when your team is ready." : "Start the timer first.";
  $("promptDifficulty").textContent = current ? current.difficulty : state.turnStarted ? "Timer is running" : "No card yet";
  $("promptScore").textContent = current ? `${current.score} pts` : "";

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
    imageHints: category === "Animals" || score >= 8
      ? [{ label: "Reference", query: text.replace(/^Draw /, "").replace(/[.]/g, "") }]
      : [],
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
    card.imageHints = card.category === "Animals" || card.score >= 8
      ? [{ label: "Reference", query: card.text.replace(/^Draw /, "").replace(/[.]/g, "") }]
      : [];
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
      card.imageHints = card.category === "Animals" || card.score >= 8
        ? [{ label: "Reference", query: target.value.replace(/^Draw /, "").replace(/[.]/g, "") }]
        : [];
      saveState();
    }
  }
});

ensureDeck();
render();
