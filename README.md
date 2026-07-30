# Pocket Memory

**Pocket Memory** is an interactive digital performance about a black puffer coat used as a portable archive.

Each pocket contains small fragments of everyday experience: a metro card, a coffee stain, a dried leaf, a key, a photo strip, an empty pocket, and more. Visitors can click the coat to release the objects, read their short associations, and drag them into a personal memory map.

## Experience

- Click any pocket to reveal three objects.
- Drag the revealed objects across the memory surface.
- Select an object to revisit its description.
- Use **Start performance** to run the complete sequence automatically.
- Toggle the minimal sound response on or off.
- Use **Reset** to close the coat and begin again.

## Concept

The coat is treated as a wearable archive rather than only clothing. The order in which the objects leave the pockets creates one version of the experience. Their later arrangement creates another version based on memory, association, distance, uncertainty, and feeling.

The project explores:

- time built into an unfolding sequence;
- process as performance;
- ordinary objects as documentary fragments;
- memory as an arrangement that can always change.

## Technology

The project is a static website built with HTML, CSS, and vanilla JavaScript. It has no build step or external dependencies.

## Run locally

Open `index.html` directly in a browser, or run a small static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages

A Pages deployment workflow is included. After GitHub Pages is enabled for this repository with **GitHub Actions** as the source, pushes to `main` will deploy automatically.
