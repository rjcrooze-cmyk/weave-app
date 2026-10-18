# Curious Much?: briefing for Claude

Rohit's question bank. One job: capture every question or debatable point that comes to his mind,
with the time, so nothing is lost. Answering them comes later and is not built yet.

## Repos

- **weave-app** (this repo, public, GitHub Pages at rjcrooze-cmyk.github.io/weave-app): the phone app.
  One self-contained `index.html`, `manifest.webmanifest`, `sw.js`, icons. No build step, no secrets.
  `ask/` only redirects to the root (the app lived there briefly).
- **weave-vault** (private): the data. Each question is one file,
  `questions/YYYY-MM/<YYYY-MM-DD-HHMMSS>-<rand>.json` with `{text, asked_at, how}`.
  `asked_at` is local time with offset (IST). `how` is `voice` or `typed`.

The old Weave research app (cards, ledger, synthesis) is on the `weave-backup` branch of both repos.

## How the app works

- Opens and starts listening (Android Chrome speech recognition, `en-IN`). The engine stops on
  every pause, so the app restarts it and keeps adding text. Only Stop (or leaving the app, or a
  5 minute safety cap) ends a question.
- Saves to the vault with the GitHub contents API using a fine-grained key stored on the phone
  (localStorage `weave.token`). Unsent questions queue on the phone and send when online.

## Rules

- Keep it simple. Plain, sentence-case copy. No em dashes in anything Rohit reads.
- `gh(path)` must never add a trailing slash (a redirect shows up as "Failed to fetch").
- Never put secrets in this public repo.
- Merge finished changes into `main`; the phone loads `main`. After a change, tell Rohit to fully
  close and reopen the app.
