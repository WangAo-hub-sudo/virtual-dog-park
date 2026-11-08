# Virtual Dog Park

A small, beginner-friendly website built with plain HTML, CSS, and vanilla
JavaScript (no frameworks, no backend, no external APIs). It has two parts:
a **Dog Encyclopedia** with three popular breeds, and a **My Virtual Dog**
pet simulator where you can adopt a dog, name it, and keep it happy.

All three breed pictures are **original SVG illustrations created for this
project** — they are hand-drawn vector drawings, not real dog photographs,
and no external image website is used.

## Features

- **Dog Encyclopedia** with three breeds: Beagle, Golden Retriever, Poodle.
  Each card shows an illustration plus short notes on size, personality, and
  everyday care.
- **Favorite buttons** — click a breed card's button to highlight it.
- **Time-of-day greeting** in the header (morning / afternoon / evening).
- **Adopt a virtual dog** — pick a breed, type a name, and click **Adopt**.
  The name is trimmed of surrounding spaces, must not be empty, and must be
  at most 20 characters; an error message explains what went wrong.
- **Feed** and **Play** buttons — each raises happiness by 10 (max 100).
- **Next Day** button — advances the day and lowers happiness by 5 (min 0).
- **Growth visuals** — the dog's picture grows and a progress bar fills up as
  it matures; the current stage is also written out as text.
- **Start Over** button — asks for confirmation before deleting the saved dog.
- **Responsive layout** — the breed cards stack in one column on phones and
  sit in three columns on laptops.

## Previewing the page

### Option A — VS Code Live Server (recommended)

1. Install the **Live Server** extension in VS Code.
2. Open this folder (`virtual-dog-park`) in VS Code.
3. Right-click `index.html` in the file explorer and choose
   **"Open with Live Server"**.
4. A browser tab opens at something like `http://127.0.0.1:5500/`.

### Option B — any local static server

From this folder, run one of:

```
python -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

### Option C — just open the file

You can also double-click `index.html` to open it directly in a browser
(URL starts with `file://`). Everything on this page works that way too, but
using a local server is the cleaner way to develop and share it.

## Growth and happiness rules

When you adopt a dog:

- It starts on **Day 1**, at the **Puppy** stage, with **happiness 50 / 100**.
- **Growth stage by day:**
  - Day 1 → **Puppy**
  - Days 2 and 3 → **Young Dog**
  - Day 4 and later → **Adult Dog**
- **Feed** or **Play**: happiness **+10**, never above **100**.
- **Next Day**: day **+1**, happiness **−5**, never below **0**.

The stage is shown both as plain text and with a growing picture/progress
bar, so the visual alone is never the only way to tell what stage the dog is in.

## Where your dog's progress is saved

Your adopted dog (name, breed, day, happiness) is saved in your **own
browser's `localStorage`**, under the key `virtualDogParkPetV1`. That means:

- It stays on this computer, in this browser, after you close the tab.
- It is **not** uploaded anywhere and it is **not** tied to a GitHub account,
  a server, or any online profile.
- If you open the page in a different browser or on a different computer, you
  will start with a new dog.
- Clearing your browser's site data, or clicking **Start Over** and
  confirming, deletes the saved dog.

## Manual testing checklist

Open the page and walk through these steps:

- [ ] The page loads with the title, welcome message, and three breed cards.
- [ ] Each breed card shows its illustration and readable size/personality/care notes.
- [ ] Clicking a breed's **Mark as favorite** button highlights the card and changes the label; clicking again un-highlights it.
- [ ] Leaving the name box empty (or typing only spaces) and clicking **Adopt** shows a helpful red error message.
- [ ] Typing a valid name (e.g. `Bella`) and clicking **Adopt** shows the status card: Day 1, Puppy, happiness 50, with the matching breed picture.
- [ ] Clicking **Feed** and **Play** raises happiness by 10 each; clicking them many times stops at 100.
- [ ] Clicking **Next Day** moves Day 1 → Day 2 → Day 3 → Day 4 and changes the stage label to Puppy → Young Dog → Young Dog → Adult Dog, and the picture/bar grow.
- [ ] After several Next Day clicks, happiness stops at 0 and never goes negative.
- [ ] **Refresh the page** — your dog, its day, and its happiness come back.
- [ ] Clicking **Start Over** and choosing **Cancel** keeps the dog; choosing **OK** clears it and brings back the adoption form.
- [ ] Narrow the browser window (or resize it) — the breed cards stack into one column and text stays readable.

Note: these are suggested manual checks for a person to run in a browser;
they have not been executed by an automated test suite.
