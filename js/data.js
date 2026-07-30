/** Memory objects — one asset file per component from the board. */
const memories = [
  { name: "Metro Card", asset: "assets/objects/metro-card.webp", note: "moving through the city" },
  { name: "Dried Leaf", asset: "assets/objects/dried-leaf.webp", note: "quiet from the park" },
  { name: "Rubber Band", asset: "assets/objects/rubber-band.webp", note: "holding things loosely" },
  { name: "Torn Paper", asset: "assets/objects/torn-paper.webp", note: "a thought unfinished" },
  { name: "Receipt", asset: "assets/objects/receipt.webp", note: "a moment I might forget" },
  { name: "Stone", asset: "assets/objects/stone.webp", note: "heavy in my pocket" },
  { name: "Key", asset: "assets/objects/key.webp", note: "a door, for a while" },
  { name: "Photo Strip", asset: "assets/objects/photo-strip.webp", note: "faces that stayed" },
  { name: "Lip Balm", asset: "assets/objects/lip-balm.webp", note: "a small comfort" },
  { name: "Envelope", asset: "assets/objects/envelope.webp", note: "something unsent" },
  { name: "Paperclip", asset: "assets/objects/paperclip-large.webp", note: "holding fragments together" },
  { name: "Face Covering", asset: "assets/objects/face-mask.webp", note: "protection, habit" },
  { name: "Coin", asset: "assets/objects/coin.webp", note: "small change, many times" },
  { name: "Ticket Stub", asset: "assets/objects/ticket-stub.webp", note: "a short ride" },
  { name: "Clip", asset: "assets/objects/paperclip.webp", note: "tiny, but useful" },
  { name: "Orange Band", asset: "assets/objects/rubber-band-orange.webp", note: "an invisible connection" },
  { name: "Sticky Note", asset: "assets/objects/sticky-note.webp", note: "small but important" },
  { name: "Pencil", asset: "assets/objects/pencil.webp", note: "unfinished thoughts" },
  { name: "Concert Ticket", asset: "assets/objects/concert-ticket.webp", note: "a night that changed speed" },
  { name: "Tissue", asset: "assets/objects/crumpled-tissue.webp", note: "a pause, then gone" },
  { name: "Cloth", asset: "assets/objects/microfiber-cloth.webp", note: "clearing the surface" }
];

/** Six pockets release every board asset (21 objects). */
const sequences = [
  [5, 6, 7, 14],
  [0, 1, 4],
  [18, 12, 13, 19],
  [11, 17, 16],
  [15, 10, 3, 20],
  [8, 9, 2]
];
