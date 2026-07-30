const memories = [
  { name: "Metro Card", icon: "▣", note: "moving through the city, from A to B" },
  { name: "Coffee Stain", icon: "◯", note: "warmth, a pause, a small comfort" },
  { name: "Dried Leaf", icon: "⌁", note: "found in the park, quiet, a touch of nature" },
  { name: "Receipt", icon: "▤", note: "a random shop, a moment I might forget" },
  { name: "Red String", icon: "⌇", note: "a memory, a connection, something invisible" },
  { name: "Photo Strip", icon: "▥", note: "faces, laughter, people who were there" },
  { name: "Small Stone", icon: "●", note: "heavy in my pocket, light in my hand" },
  { name: "Key", icon: "⚿", note: "a door, a place, for a while" },
  { name: "Mask", icon: "▱", note: "protection, habit, part of the time" },
  { name: "Bus Ticket", icon: "▭", note: "a short ride, a short decision" },
  { name: "Perfume Sample", icon: "│", note: "a smell that brings back a scene" },
  { name: "Sticky Note", icon: "□", note: "something small but important" },
  { name: "Paper Clip", icon: "⌘", note: "tiny, but holds things together" },
  { name: "Concert Ticket", icon: "♪", note: "a night that felt different" },
  { name: "Pencil Stub", icon: "✎", note: "ideas, notes, unfinished thoughts" },
  { name: "Crumpled Paper", icon: "✦", note: "a thought I did not keep" },
  { name: "Coin", icon: "◉", note: "small change, many times" },
  { name: "Empty Pocket", icon: "⋯", note: "something I lost, or never had" }
];

const pocketButtons = [...document.querySelectorAll(".pocket")];
const table = document.getElementById("memoryTable");
const template = document.getElementById("memoryTemplate");
const placeholder = document.getElementById("tablePlaceholder");
const progressText = document.getElementById("progressText");
const memoryTitle = document.getElementById("memoryTitle");
const memoryDescription = document.getElementById("memoryDescription");
const startButton = document.getElementById("startPerformance");
const resetButton = document.getElementById("resetAll");
const soundButton = document.getElementById("soundToggle");

let revealed = 0;
let performanceTimer = null;
let soundOn = true;
let dragTarget = null;
let dragOffset = { x: 0, y: 0 };

const pocketSequences = [
  [17, 6, 7],
  [0, 1, 5],
  [13, 16, 3],
  [2, 8, 14],
  [4, 12, 15],
  [9, 10, 11]
];

function tone(index) {
  if (!soundOn) return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 180 + index * 12;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.035, context.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.62);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.65);
  oscillator.addEventListener("ended", () => context.close());
}

function randomPosition(card) {
  const maxX = Math.max(10, table.clientWidth - card.offsetWidth - 12);
  const maxY = Math.max(10, table.clientHeight - card.offsetHeight - 12);
  return {
    x: 10 + Math.random() * (maxX - 10),
    y: 10 + Math.random() * (maxY - 10)
  };
}

function revealMemory(index) {
  if (table.querySelector(`[data-memory-index="${index}"]`)) return;
  placeholder.hidden = true;

  const memory = memories[index];
  const card = template.content.firstElementChild.cloneNode(true);
  card.dataset.memoryIndex = index;
  card.querySelector(".memory-icon").textContent = memory.icon;
  card.querySelector(".memory-number").textContent = String(index + 1).padStart(2, "0");
  card.querySelector(".memory-name").textContent = memory.name;
  card.querySelector(".memory-note").textContent = memory.note;

  table.appendChild(card);
  const pos = randomPosition(card);
  card.style.left = `${pos.x}px`;
  card.style.top = `${pos.y}px`;

  card.addEventListener("pointerdown", beginDrag);
  card.addEventListener("click", () => showMemory(index));

  revealed += 1;
  progressText.textContent = `${revealed} / ${memories.length} objects revealed`;
  showMemory(index);
  tone(index);
}

function showMemory(index) {
  const memory = memories[index];
  memoryTitle.textContent = memory.name;
  memoryDescription.textContent = memory.note.charAt(0).toUpperCase() + memory.note.slice(1) + ".";
}

function openPocket(button) {
  if (button.classList.contains("opened")) return;
  button.classList.add("opened");
  const sequence = pocketSequences[Number(button.dataset.pocket)];
  sequence.forEach((memoryIndex, i) => {
    window.setTimeout(() => revealMemory(memoryIndex), i * 420);
  });
}

function beginDrag(event) {
  if (event.button !== 0) return;
  dragTarget = event.currentTarget;
  const cardRect = dragTarget.getBoundingClientRect();
  dragOffset.x = event.clientX - cardRect.left;
  dragOffset.y = event.clientY - cardRect.top;
  dragTarget.classList.add("dragging");
  dragTarget.setPointerCapture(event.pointerId);
  dragTarget.addEventListener("pointermove", moveDrag);
  dragTarget.addEventListener("pointerup", endDrag, { once: true });
}

function moveDrag(event) {
  if (!dragTarget) return;
  const tableRect = table.getBoundingClientRect();
  const x = Math.min(
    Math.max(0, event.clientX - tableRect.left - dragOffset.x),
    table.clientWidth - dragTarget.offsetWidth
  );
  const y = Math.min(
    Math.max(0, event.clientY - tableRect.top - dragOffset.y),
    table.clientHeight - dragTarget.offsetHeight
  );
  dragTarget.style.left = `${x}px`;
  dragTarget.style.top = `${y}px`;
}

function endDrag(event) {
  if (!dragTarget) return;
  dragTarget.releasePointerCapture(event.pointerId);
  dragTarget.removeEventListener("pointermove", moveDrag);
  dragTarget.classList.remove("dragging");
  dragTarget = null;
}

function startPerformance() {
  reset(false);
  document.body.classList.add("performance-running");
  startButton.disabled = true;
  startButton.textContent = "Performance running";
  memoryTitle.textContent = "The coat begins to remember.";
  memoryDescription.textContent = "Six pockets open slowly. Each one releases three fragments.";

  let pocketIndex = 0;
  performanceTimer = window.setInterval(() => {
    if (pocketIndex >= pocketButtons.length) {
      window.clearInterval(performanceTimer);
      performanceTimer = null;
      document.body.classList.remove("performance-running");
      startButton.disabled = false;
      startButton.textContent = "Replay performance";
      memoryTitle.textContent = "The map is now yours.";
      memoryDescription.textContent = "Rearrange the objects by memory, feeling, distance, or uncertainty.";
      return;
    }
    openPocket(pocketButtons[pocketIndex]);
    pocketIndex += 1;
  }, 2100);
}

function reset(announce = true) {
  if (performanceTimer) window.clearInterval(performanceTimer);
  performanceTimer = null;
  document.body.classList.remove("performance-running");
  table.querySelectorAll(".memory-card").forEach(card => card.remove());
  pocketButtons.forEach(button => button.classList.remove("opened"));
  placeholder.hidden = false;
  revealed = 0;
  progressText.textContent = `0 / ${memories.length} objects revealed`;
  startButton.disabled = false;
  startButton.textContent = "Start performance";
  if (announce) {
    memoryTitle.textContent = "The coat is still closed.";
    memoryDescription.textContent = "The performance begins before the first object appears.";
  }
}

pocketButtons.forEach(button => button.addEventListener("click", () => openPocket(button)));
startButton.addEventListener("click", startPerformance);
resetButton.addEventListener("click", () => reset(true));
soundButton.addEventListener("click", () => {
  soundOn = !soundOn;
  soundButton.textContent = soundOn ? "Sound on" : "Sound off";
  soundButton.setAttribute("aria-pressed", String(soundOn));
});

window.addEventListener("resize", () => {
  table.querySelectorAll(".memory-card").forEach(card => {
    const left = Math.min(parseFloat(card.style.left) || 0, table.clientWidth - card.offsetWidth);
    const top = Math.min(parseFloat(card.style.top) || 0, table.clientHeight - card.offsetHeight);
    card.style.left = `${Math.max(0, left)}px`;
    card.style.top = `${Math.max(0, top)}px`;
  });
});