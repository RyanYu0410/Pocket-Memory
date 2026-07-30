(function () {
  const pockets = [...document.querySelectorAll(".pocket")];
  const table = document.getElementById("memoryTable");
  const template = document.getElementById("memoryTemplate");
  const placeholder = document.getElementById("tablePlaceholder");
  const progress = document.getElementById("progressText");
  const title = document.getElementById("memoryTitle");
  const description = document.getElementById("memoryDescription");
  const play = document.getElementById("startPerformance");
  const clear = document.getElementById("resetAll");
  const soundButton = document.getElementById("soundToggle");

  let revealed = 0;
  let timer = null;
  let soundOn = true;
  const drag = createDragController(table);

  function randomPosition(piece) {
    return {
      x: Math.random() * Math.max(0, table.clientWidth - piece.offsetWidth),
      y: Math.random() * Math.max(0, table.clientHeight - piece.offsetHeight)
    };
  }

  function show(i) {
    title.textContent = memories[i].name.toLowerCase();
    description.textContent = memories[i].note;
  }

  function reveal(i) {
    if (table.querySelector(`[data-memory-index="${i}"]`)) return;
    placeholder.hidden = true;

    const memory = memories[i];
    const piece = template.content.firstElementChild.cloneNode(true);
    const cutout = piece.querySelector(".cutout");

    piece.dataset.memoryIndex = i;
    piece.style.setProperty("--r", `${(Math.random() * 7 - 3.5).toFixed(1)}deg`);

    cutout.src = `${memory.asset}?v=6`;
    cutout.alt = memory.name;
    cutout.decoding = "async";

    piece.querySelector(".label").textContent = memory.name;
    piece.querySelector(".note").textContent = memory.note;

    table.appendChild(piece);
    const pos = randomPosition(piece);
    piece.style.left = `${pos.x}px`;
    piece.style.top = `${pos.y}px`;

    piece.addEventListener("pointerdown", drag.begin);
    piece.addEventListener("click", () => show(i));

    revealed += 1;
    progress.textContent = `${revealed} / ${memories.length}`;
    show(i);
    tone(i, soundOn);
  }

  function openPocket(button) {
    if (button.classList.contains("opened")) return;
    button.classList.add("opened");
    sequences[Number(button.dataset.pocket)].forEach((index, n) => {
      setTimeout(() => reveal(index), n * 520);
    });
  }

  function reset(announce = true) {
    if (timer) clearInterval(timer);
    timer = null;
    document.body.classList.remove("performance-running");
    table.querySelectorAll(".memory-piece").forEach((piece) => piece.remove());
    pockets.forEach((pocket) => pocket.classList.remove("opened"));
    placeholder.hidden = false;
    revealed = 0;
    progress.textContent = `0 / ${memories.length}`;
    play.disabled = false;
    play.textContent = "play";
    if (announce) {
      title.textContent = "closed";
      description.textContent = "Rearrange them as you remember.";
    }
  }

  function start() {
    reset(false);
    document.body.classList.add("performance-running");
    play.disabled = true;
    play.textContent = "playing";
    title.textContent = "opening";
    description.textContent = "";

    let i = 0;
    openPocket(pockets[i++]);
    timer = setInterval(() => {
      if (i >= pockets.length) {
        clearInterval(timer);
        timer = null;
        document.body.classList.remove("performance-running");
        play.disabled = false;
        play.textContent = "replay";
        title.textContent = "open";
        description.textContent = "Rearrange them as you remember.";
        return;
      }
      openPocket(pockets[i++]);
    }, 2300);
  }

  pockets.forEach((pocket) => pocket.addEventListener("click", () => openPocket(pocket)));
  play.addEventListener("click", start);
  clear.addEventListener("click", () => reset(true));
  soundButton.addEventListener("click", () => {
    soundOn = !soundOn;
    soundButton.textContent = soundOn ? "sound" : "muted";
    soundButton.setAttribute("aria-pressed", String(soundOn));
  });
  window.addEventListener("resize", drag.clampAll);

  progress.textContent = `0 / ${memories.length}`;
})();
