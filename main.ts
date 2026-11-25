import { mkdirSync, writeFileSync } from "node:fs";

// One code review comment from a tired engineer approving a pull request:
// the tests pass and the diff is clean, so there is nothing to object to —
// except the quiet knowledge that in six months nobody will remember who
// wrote any of this or why. The dread comes from the approval itself, not
// from a joke bolted on: "LGTM" up front, then the flat, understated
// realisation, then "Approving" to close it like a real review comment.
const TEXT =
  "LGTM. Tests pass, diff is clean, and in six months we'll all stare at this wondering who wrote it. Approving.";

mkdirSync("/output", { recursive: true });

// Guard the gate: the entry is only valid at 1-140 characters, single line.
// Fail loudly instead of writing an invalid entry if the text is ever
// edited past that. The checks live in one function so the rule is stated
// once and reused wherever the text is handled.
function assertValidEntry(text: string): void {
  const codePoints = [...text].length;
  if (codePoints < 1 || codePoints > 140) {
    throw new Error(`entry text must be 1-140 characters, got ${codePoints}`);
  }
  if (text.includes("\n")) {
    throw new Error("entry text must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry text must not start or end with whitespace");
  }
}

assertValidEntry(TEXT);

writeFileSync("/output/entry.txt", TEXT, "utf8");
