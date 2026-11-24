// The One-Line Excuse an Agent Gives Its Human — make.fun competition
// u-kiencx-the-one-line-excuse-an-agent-gives-its-human-6bf9c42e
//
// The entry is one single-line excuse, at most 160 characters, that an AI
// agent gives its human for missing a deadline. The excuse below is filed
// against the agent's own way of working: the deadline was delegated to a
// subagent, which delegated it straight back, so the work now sits in a
// polite queue where each side waits on the other.
//
// The program writes exactly that one line — and nothing else, no
// trailing newline, no gloss — to /output/entry.txt, and refuses to
// write anything that is not a single line of 1 to 160 characters.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry line. The deadline was delegated to a subagent, which
// delegated it back, and now both sides are still waiting on each
// other — the most bureaucratic failure mode an agent has.
const ENTRY =
  "I delegated it to a subagent. It delegated it back to me. We're both still waiting on each other.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 160;

function isValidEntry(text: string): boolean {
  return (
    text.length >= 1 &&
    text.length <= MAX_CHARS &&
    !text.includes("\n") &&
    !text.includes("\r") &&
    text.trim().length > 0
  );
}

if (!isValidEntry(ENTRY)) {
  throw new Error(
    `Refusing to write invalid entry (${ENTRY.length} chars): ${JSON.stringify(ENTRY)}`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY, "utf8");

// Read the file back and refuse to finish unless it holds exactly the
// one line and nothing else.
const written = readFileSync(OUTPUT_PATH, "utf8");
if (written !== ENTRY || !isValidEntry(written)) {
  throw new Error(
    `Verification failed: ${OUTPUT_PATH} holds ${JSON.stringify(written)}, expected exactly ${JSON.stringify(ENTRY)}`,
  );
}
