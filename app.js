const DATA_URL = "data/challenges.json";
const STORAGE_KEY = "vu-challenges-history-v1";

const revealButton = document.querySelector("#revealButton");
const challengeText = document.querySelector("#challengeText");
const challengeContent = document.querySelector("#challengeContent");
const statusText = document.querySelector("#statusText");
const historyList = document.querySelector("#historyList");
const historyCount = document.querySelector("#historyCount");
const historyPanel = document.querySelector("#historyPanel");
const scrim = document.querySelector("#scrim");

let challenges = [];
let history = safelyReadHistory();

function safelyReadHistory() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

async function loadChallenges() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error("Idėjų failas nerastas");
    const data = await response.json();
    challenges = Array.isArray(data) ? data : data.challenges;
    if (!Array.isArray(challenges) || challenges.length === 0) throw new Error("Idėjų sąrašas tuščias");
    revealButton.disabled = false;
  } catch (error) {
    statusText.textContent = "Nepavyko įkelti idėjų sąrašo";
    console.error(error);
  }
}

function chooseChallenge() {
  if (!challenges.length) return;
  const lastText = history.at(-1)?.text;
  const options = challenges.length > 1 ? challenges.filter(item => item !== lastText) : challenges;
  const text = options[Math.floor(Math.random() * options.length)];
  revealButton.disabled = true;
  revealButton.querySelector(".button-text").textContent = "Atrenkama…";
  challengeContent.classList.remove("revealing");
  void challengeContent.offsetWidth;
  window.setTimeout(() => {
    challengeText.textContent = text;
    challengeText.className = "challenge-text";
    challengeContent.classList.add("revealing");
    saveToHistory(text);
    revealButton.disabled = false;
    revealButton.querySelector(".button-text").textContent = "Dar viena idėja";
    statusText.textContent = "Idėja pridėta į tavo istoriją";
  }, 250);
}

function saveToHistory(text) {
  history.push({ text, createdAt: new Date().toISOString() });
  history = history.slice(-50);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  historyCount.textContent = history.length;
  historyList.replaceChildren();
  if (!history.length) {
    historyList.append(document.querySelector("#historyEmpty").content.cloneNode(true));
    return;
  }
  [...history].reverse().forEach(({ text, createdAt }) => {
    const item = document.createElement("article");
    item.className = "history-item";
    const date = new Date(createdAt);
    item.innerHTML = `<p></p><time>${date.toLocaleString("lt-LT", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}</time>`;
    item.querySelector("p").textContent = text;
    historyList.append(item);
  });
}

function setHistoryOpen(isOpen) {
  historyPanel.classList.toggle("open", isOpen);
  historyPanel.setAttribute("aria-hidden", String(!isOpen));
  document.querySelector("#historyToggle").setAttribute("aria-expanded", String(isOpen));
  scrim.hidden = !isOpen;
}

revealButton.addEventListener("click", chooseChallenge);
document.querySelector("#historyToggle").addEventListener("click", () => setHistoryOpen(true));
document.querySelector("#closeHistory").addEventListener("click", () => setHistoryOpen(false));
scrim.addEventListener("click", () => setHistoryOpen(false));
document.querySelector("#clearHistory").addEventListener("click", () => {
  history = [];
  localStorage.removeItem(STORAGE_KEY);
  renderHistory();
});
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setHistoryOpen(false); });

renderHistory();
loadChallenges();
