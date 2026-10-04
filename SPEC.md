# Weave: product spec

This is the definition of Weave. Every change should move the app toward it.

## Purpose

Rohit has ADHD and wants clear, reliable instructions for life. The internet is full of conflicting
opinions. Weave reads everything he shares, strips it to first principles, cross-checks it, and keeps a
short, ranked answer to one question per category: what are the 10 things most worth knowing or doing,
ranked by how much they give back for what they cost. Then it merges every category into one
**Life Top 10**. He should get the point in seconds without losing anything crucial. Weave does the
reading in the background; he reads only the conclusions.

## Principles

- **First principles, always.** Every source is reduced to what is physically, biologically,
  economically or behaviourally happening. Science, physics and measured reality, not motivation
  or philosophy. Where a question is genuinely philosophical (for example the hard problem),
  label it "philosophy, not established science" rather than deleting it.
- **Mechanism ladder.** Every mechanism is rated: observed (effect measured), correlated (a body or
  brain change goes with it), causal (experiments show the change produces the effect), unknown.
  Never present a correlation as an explanation.
- **Shortest wording that loses nothing crucial.** No commentary on persuasion or framing.
- **No invented numbers.** Real measured effects are shown with their source. Ratings are ratings,
  not fake percentages.
- **Accuracy by code.** Quotes are checked against transcripts. Scores are computed by fixed code from
  rated ingredients, never typed by the AI.
- **Imported prior research is a lead, never support.** Rejected claims are never live.
- **Medication or treatment items** (ADHD and mental health) appear as "discuss with your doctor",
  never as instructions.
- **Budget.** Rohit pays only his existing subscriptions. Per-video work stays light; heavy synthesis
  runs weekly.

## 1. Video card (default view)

```
Title (minutes)
CLAIM      one plain sentence: what the source asserts
HAPPENING  what is physically going on, in simple words
           Science level: observed | correlated | causal | unknown  (+ "philosophy" tag if relevant)
LEFT       the usable core, as an instruction or conclusion
IDEAS      9 total · 7 already in your map · 2 new
```

Everything else (points by section, evidence labels, timestamps, map effects, coverage) sits behind
a "Details" tap. Tapping IDEAS shows which ideas were new and which matched existing claims.

## 2. Repeat detection

For each verified point the routine decides, at first-principles level, whether it is the same idea as
an existing ledger claim even if worded completely differently. If yes, it records the matching claim
id; if unsure, it counts the idea as new. Store per card: ideas_total, ideas_known, ideas_new and the
matches. Ledger claims need stable ids (add an `id` to every entry and backfill existing ones).
Later: per-channel "share of new ideas" to show which sources mostly repeat.

## 3. Takeaways and the Leverage Score (weekly)

A weekly scheduled run (rules in the vault's SYNTHESIS.md) builds, per category, up to 10 takeaways
from the ledger. Each takeaway is either a **practice** (an instruction: do X) or an
**understanding** (a conclusion: the best current answer is X). Rejected claims are excluded;
takeaways resting only on unverified imported claims are marked as such.

The AI rates five ingredients, 1 to 5, each citing the ledger claim ids it rests on:
- **I** impact: size of the benefit, or for understandings how much it changes thinking and action
- **E** evidence: from the ladder and sources. Capped at 2 if only unverified claims support it
- **B** breadth: how many areas of life it improves (convergence across categories raises it)
- **C** cost: time, money, effort, difficulty to sustain (5 = very costly)
- **R** risk: what can go wrong and how badly (5 = serious)

Code computes the score (starting formula, tune only with Rohit's approval):

```
raw   = (I/5) * (E/5) * (0.8 + 0.05*B) / (0.6 + 0.1*C) * (1 - 0.15*(R-1))
score = round(100 * min(raw, 1))
range = recompute with E-1 and E+1 (clamped 1..5)
```

Rank by score. If two ranges overlap, show them as roughly tied. Mark the biggest drop in the list
(where value falls off). A future sixth ingredient, Rohit's own results, will adjust scores.

Scores change only when evidence changes. Keep history: each takeaway's rank and score per week,
with a one-line reason for any move ("rose from 7 to 3 after two sleep studies").

**Life Top 10:** merge all categories' takeaways, combine duplicates, reward ideas that converge from
several categories, and rank with the same formula.

Outputs in the vault: `takeaways/<category>.json`, `takeaways/life.json`, `takeaways/changes.json`.

## 4. Layout

- **Home** opens on the Life Top 10, then a two-column grid of category tiles. Each tile shows the
  category name, its current #1 takeaway, and sub-question progress. No horizontal scrolling.
- **Bottom bar:** Home, Categories, and a prominent Add.
- **Category screen** tabs: Top 10, Map (sub-questions and status), Sources (cards), History.
- **Takeaway row:** rank, score bar with its range, the one-line instruction or conclusion, a two-line
  why, and small chips for science level, cost and risk. Tap for the supporting claims and sources.
- Plain, short, sentence-case copy. No em dashes in anything Rohit reads.
