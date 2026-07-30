function createDragController(table) {
  let active = null;
  let offset = { x: 0, y: 0 };

  function move(e) {
    if (!active) return;
    const r = table.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - r.left - offset.x), table.clientWidth - active.offsetWidth);
    const y = Math.min(Math.max(0, e.clientY - r.top - offset.y), table.clientHeight - active.offsetHeight);
    active.style.left = `${x}px`;
    active.style.top = `${y}px`;
  }

  function end(e) {
    if (!active) return;
    active.releasePointerCapture(e.pointerId);
    active.removeEventListener("pointermove", move);
    active.classList.remove("dragging");
    active = null;
  }

  function begin(e) {
    if (e.button !== 0) return;
    active = e.currentTarget;
    const r = active.getBoundingClientRect();
    offset.x = e.clientX - r.left;
    offset.y = e.clientY - r.top;
    active.classList.add("dragging");
    active.setPointerCapture(e.pointerId);
    active.addEventListener("pointermove", move);
    active.addEventListener("pointerup", end, { once: true });
  }

  function clampAll() {
    table.querySelectorAll(".memory-piece").forEach((piece) => {
      piece.style.left = `${Math.max(0, Math.min(parseFloat(piece.style.left) || 0, table.clientWidth - piece.offsetWidth))}px`;
      piece.style.top = `${Math.max(0, Math.min(parseFloat(piece.style.top) || 0, table.clientHeight - piece.offsetHeight))}px`;
    });
  }

  return { begin, clampAll };
}
