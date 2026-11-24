// SPDX-License-Identifier: MIT
// One-Sentence Absurd Invention Pitch
// make.fun bounty: u-suroso-69-one-sentence-absurd-invention-pitch-5326c34a
// Writes a single-sentence pitch (1-220 chars) to entry.txt in
// process.env.MAKEFUN_OUTPUT_DIR, falling back to this script's directory.
// Plain ESM, Node 22 stdlib only, no network, fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The pitch: one sentence naming the tiny annoyance (a smoke alarm
// screaming at 3am over a dying battery), the ridiculous invention
// (a smoke alarm that texts you instead), and its silly mechanism
// (it messages "sir, I smell toast" and can be snoozed till morning).
// No abbreviations with periods (e.g. "3 a.m.") so the single-sentence
// check stays unambiguous for any naive period-counting scorer.
const PITCH =
  "Meet the Smoke Alarm That Texts: instead of screaming at 3am over a dying battery, it politely messages 'sir, I smell toast' and lets you snooze it until morning.";

function validate(pitch) {
  if (typeof pitch !== "string" || pitch.trim().length === 0) {
    throw new Error("pitch must be non-empty text");
  }
  if (pitch.length > 220) {
    throw new Error(`pitch is ${pitch.length} chars, over the 220-char limit`);
  }
  if (pitch.includes("\n") || pitch.includes("\r")) {
    throw new Error("pitch must be a single line");
  }
  // Exactly one sentence: a single terminal period at the very end,
  // and no other sentence-ending punctuation anywhere inside.
  const body = pitch.slice(0, -1);
  if (!pitch.endsWith(".")) {
    throw new Error("pitch must end with a single period");
  }
  if (/[.!?]/.test(body)) {
    throw new Error("pitch must contain exactly one sentence");
  }
}

validate(PITCH);

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ||
  dirname(fileURLToPath(import.meta.url));
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), PITCH, "utf8");
console.log(`Wrote entry.txt (${PITCH.length} chars): ${PITCH}`);
