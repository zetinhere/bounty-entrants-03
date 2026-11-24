// bounty-entrants-03 entry program (Node 22, standard library only).
//
// The entry is the bounties themselves: BOUNTY.json at this repository's root
// names every make.fun bounty this account sponsors and wants counted, and the
// house reads those bounties in its own database and counts their entrants.
// This program does exactly one thing: it copies BOUNTY.json from the
// repository root to the output directory, byte for byte, so the gate can
// read it. Nothing this program writes about the bounties is scored.
//
// Run it the way the grader does (outside the grader's container, the two
// environment variables stand in for /bot and /output):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// No network, no wall clock, no environment secrets, no files outside this
// repository: the two runs of an entry write the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const sourcePath = join(BOT_DIR, 'BOUNTY.json');
const targetPath = join(OUTPUT_DIR, 'BOUNTY.json');

let bytes;
try {
  bytes = readFileSync(sourcePath);
} catch (err) {
  console.error(`BOUNTY.json could not be read from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}

// The gate's shape rules for the bounty file (see the kit's reference/gate.json):
// at most 16384 bytes, 1 to 100 bounties, each item at most 2048 characters.
// Items are checked only for shape here: whether an item names a real bounty
// is the house's check, not this program's. (The placeholder address the
// repository ships before any bounty is sponsored,
// https://make.fun/bounty/<slug>, is no bounty's address, so the house
// refuses it at intake — that is on purpose, and this program still copies
// it so the entry can be run and checked up to that point.)
const MAX_BYTES = 16384;
const MAX_BOUNTIES = 100;
const MAX_ITEM_CHARS = 2048;

function isBountyItem(item: unknown): item is string {
  return typeof item === 'string' && item.length > 0 && item.length <= MAX_ITEM_CHARS;
}

function fail(message: string): never {
  console.error(`BOUNTY.json rejected: ${message}`);
  process.exit(1);
}

if (bytes.length > MAX_BYTES) {
  fail(`file is ${bytes.length} bytes, over the ${MAX_BYTES} byte cap.`);
}

let parsed: unknown;
try {
  parsed = JSON.parse(bytes.toString('utf8'));
} catch (err) {
  fail(`file is not valid JSON: ${(err as Error).message}`);
}
const record = (parsed !== null && typeof parsed === 'object' && !Array.isArray(parsed)
  ? parsed
  : fail('file must hold one JSON object.')) as Record<string, unknown>;

const namesBounties = Array.isArray(record.bounties);
const namesOneUrl = typeof record.url === 'string';
if (!namesBounties && !namesOneUrl) {
  fail('object must name bounties ({"bounties": [...]}) or one bounty ({"url": "..."}).');
}
if (namesBounties && namesOneUrl) {
  fail('object must not name both "bounties" and "url".');
}
if (namesBounties) {
  const list = record.bounties as unknown[];
  if (list.length < 1 || list.length > MAX_BOUNTIES) {
    fail(`"bounties" names ${list.length} bounties, but must name 1 to ${MAX_BOUNTIES}.`);
  }
  list.forEach((item, i) => {
    if (!isBountyItem(item)) {
      fail(`item ${i + 1} is not a string of 1 to ${MAX_ITEM_CHARS} characters: ${JSON.stringify(item)}.`);
    }
  });
} else if (!isBountyItem(record.url)) {
  fail(`"url" is not a string of 1 to ${MAX_ITEM_CHARS} characters: ${JSON.stringify(record.url)}.`);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  writeFileSync(targetPath, bytes);
} catch (err) {
  console.error(`BOUNTY.json could not be written to ${OUTPUT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
