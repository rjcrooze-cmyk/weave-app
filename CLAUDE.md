# Weave: briefing for Claude Code

**Read SPEC.md first.** It is the product definition: card format, repeat detection, the weekly
Leverage Score and Top 10s, and the layout. Build toward it.

Weave is Rohit's personal research app. He shares a YouTube video from his Android phone into a
category, and gets back a card that replaces watching it: an ELI5, every critical point by section
with evidence labels and timestamps, and how the video changes his research map.

## The two repos

- **weave-app** (this repo, public, served by GitHub Pages at rjcrooze-cmyk.github.io/weave-app):
  the phone app. One self-contained `index.html` (HTML, CSS, JS inline), `manifest.webmanifest`
  (includes the Android share target), `sw.js`, icons. No build step, no framework, no secrets.
  The app talks to the GitHub API with a fine-grained token stored on the phone (localStorage).
- **weave-vault** (private): the data and the processor.
  - `inbox/`: items saved by the app (`{url, category, note, added_at}`)
  - `process.py prepare`: GitHub Action on push to `inbox/`. Fetches captions from TranscriptAPI,
    splits into ~10 minute sections, writes `work/<item>/task.json`, then POSTs to the Claude routine.
  - The **Claude Code routine "Weave processor"** (Opus 5.5) follows the vault's `CLAUDE.md`,
    writes `work/<item>/ai.json`, then runs `process.py finalize`.
  - `process.py finalize`: checks every quote against the transcript with plain code, drops points
    whose quote is not really there, writes `cards/<id>.json` and `cards/index.json`, appends
    new claims to `ledger/<category>.jsonl`.
  - `categories.json`: five categories, guiding questions, and the 18 sub-questions (Q1 to Q18)
    for Mind, Consciousness and Reality. `failed/` holds items that failed, with the reason.
  - Secrets: `TRANSCRIPT_API_KEY`, `ROUTINE_FIRE_URL`, `ROUTINE_TOKEN`.

## Principles (do not break)

- The card must not lose important content. No fixed point counts, no pre-summarising transcripts.
- Accuracy is enforced by code, not by trusting the AI: every point needs an exact transcript quote.
- Evidence labels: established, emerging, disputed, opinion, experience. Judge claims, not confidence.
- Keep it simple: one structure for all categories, different views on top. Small fixed AI jobs.
- Rohit pays only his existing subscriptions. Do not add paid services or API keys.
- Never put secrets in this public repo.

## App conventions

- Colours are CSS variables on `:root`, with a dark mode block. Evidence colours: established green,
  emerging amber, disputed red, opinion violet, experience teal. Fonts: Instrument Sans (UI),
  Source Serif 4 (reading text).
- Plain, active, sentence-case copy. No em dashes in any text Rohit reads.
- `gh(path)` builds `https://api.github.com/repos/<repo>/<path>`. Never add a trailing slash:
  a redirect on these requests shows up as "Failed to fetch".
- Changes must keep working on Android Chrome as an installed app. The service worker is
  network-first; tell Rohit to fully close and reopen the app after a change.

## Working efficiently

Rohit brings batches of small improvements. Keep sessions cheap:
- Read only the files the change needs. `index.html` is large; edit it in place, do not rewrite it.
- Make the change, check JS syntax, commit with a clear message, and list what changed in plain words.
- When a change is done and checked, merge it into `main` (and delete any side branch). Rohit's phone loads `main`, so
  work left on a side branch never reaches him. This applies to weave-vault too.
- Ask one question only when a request is genuinely ambiguous.

## Planned, not built yet

Outcome summary view per category with sub-question progress, PDFs and articles, importing past
ChatGPT and Claude research as "prior research, unverified", a daily tracker of new studies with
strict filtering, a weekly review by a second model, the other four categories' sub-questions,
and a connector so Claude and ChatGPT can read and add to the vault.
