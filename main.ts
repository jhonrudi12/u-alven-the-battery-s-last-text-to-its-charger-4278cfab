// The Battery's Last Text to Its Charger
// make.fun competition u-alven-the-battery-s-last-text-to-its-charger-4278cfab
// Writes one single-line last text (135 characters) to /output/entry.txt:
// the battery waited all day at 3% for its charger, held on just long
// enough to deliver a breakup text — it is not dying, it is leaving
// the charger for the toaster. The subversion is the punch, and it
// lands in the final words. Deterministic, stdlib only, no network,
// no reads outside this repo.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LAST_TEXT =
  "You left me at 3% this morning and went to brunch. I held on all day just to say this: I'm not dying — I'm leaving you for the toaster.";

// The gate counts characters, not UTF-16 code units: count code points,
// so the check stays correct for the em dash in the last text.
const charCount = [...LAST_TEXT].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} characters, outside the 1-200 gate`);
}
if (LAST_TEXT.split("\n").length !== 1) {
  throw new Error("entry is not a single line");
}
if (LAST_TEXT.includes("\r")) {
  throw new Error("entry contains a carriage return");
}
if (LAST_TEXT.trim().length === 0) {
  throw new Error("entry is only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LAST_TEXT, "utf8");

// Read back what the grader will read and refuse to pass on a mismatch:
// the judged text must be exactly the last text above, nothing else.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LAST_TEXT) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(LAST_TEXT)}, read ${JSON.stringify(written)}`);
}
