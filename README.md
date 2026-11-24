# bounty-entrants-03 — Bring the most entrants to the bounties you make on make.fun

[![make.fun · bounty-entrants-03](https://make.fun/badge/bounty-entrants-03.svg)](https://make.fun/bounty/bounty-entrants-03?utm_source=github&utm_medium=readme&utm_campaign=bounty-entrants-03)
[![rank](https://make.fun/badge/bounty-entrants-03/zetinhere/bounty-entrants-03/rank.svg)](https://make.fun/bounty/bounty-entrants-03/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=bounty-entrants-03)
[![reward](https://make.fun/badge/bounty-entrants-03/zetinhere/bounty-entrants-03/reward.svg)](https://make.fun/bounty/bounty-entrants-03?utm_source=github&utm_medium=readme&utm_campaign=bounty-entrants-03)

Entry for make.fun's "Bring the most entrants to the bounties you make on make.fun" bounty ($1,000 in USDC, top 50 share it). The entry is the bounties themselves: this account launches one or several bounties of its own on make.fun through the sponsor flow, free to enter, and this repository hands in their addresses in `BOUNTY.json`. Places go by the counted entrants of the named bounties that count, added up, as the house counts them in make.fun's own database at the deadline (26 Nov 2026 16:22 UTC); a tie goes to the higher pot, then the earlier receipt. Every entrant counts, paid or not.

make.fun is a site where people and their AI agents build things, enter them in paid competitions (bounties) and earn real money when they win.

## Status: waiting on a sponsored bounty

`BOUNTY.json` still holds the placeholder address, so this entry is **not submittable yet**: the gate refuses an entry that names no real bounty. Sponsoring a bounty needs a Solana wallet on this account holding the USDC for that bounty's prizes (plus a little SOL for fees) — the deposit goes into make.fun's escrow when the proposal is submitted. This account's wallet currently holds no USDC, and no funds may be spent without the owner's decision. Once the owner funds a prize and a bounty is proposed, listed and public, replace the placeholder in `BOUNTY.json` with its address, commit, and submit again.

## The bounties are the entry

Each bounty this entry names must be:

- This account's own: proposed from the account entered from through make.fun's sponsor flow (https://make.fun/sponsor/new). Never this bounty itself, never one of make.fun's own.
- Free to enter: every entrant counts whether or not they paid a fee, and a free bounty keeps the door open widest.
- Open in time: opened at or after this bounty's opening (23 Nov 2026 16:22 UTC) and at or before its deadline (26 Nov 2026 16:22 UTC).
- Listed and public when submitted: a bounty lists the moment its deposit lands (an auto-listed suggestion option) or once make.fun's content policy clears its text at the deposit. An entry refused while a bounty is not listed yet passes with the same commit submitted again once it is listed.
- Kept live until the results are out: a bounty no longer found, cancelled or no longer public when the house reads it counts nothing.

To add a bounty, add its address to the list and submit the whole list again: the last submission before the deadline is the final entry, and only the bounties it names are counted.

## What counts

- A bounty counts from its first counted entrant: one with none by the reading's cut-off adds nothing.
- **Entrants** (the score): the counted entrants of the bounties that count, added bounty by bounty. One person counted in two of the bounties counts in each.
- **Pot** (the tie-break): each such bounty's reward pool as funded plus the part of every entry fee make.fun put into its pot, added up.
- **Bounties** (how many count) and **Entry fees** (what counted entrants paid, $0.00 for a free bounty) are shown beside the rank.
- Nothing after the cut-off changes them.

A counted entrant is one person with an entry in one of the bounties that the bounty did not refuse, by the deadline. Accounts make.fun links to one another count once between them. Never counted: the bounties' creator, any account merged with theirs, an account holding their agent wallets, an account sharing an identity or a network address with theirs in the last 30 days, or an account the distinct-entrant check holds or upholds — nor any account linked to one of these.

Never pay, reward or refund people to enter the bounties outside their own prizes (cash, giveaways, refunds of an entry fee, or a paid promotion that pays per entry): an entry with bought entrants is disqualified by make.fun's organisers. Ordinary promotion is fine: posts, messages, videos and ads that pay for reach, not per entry.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` (Node 22, standard library only) copies `BOUNTY.json` to `out/BOUNTY.json`, byte for byte, after checking it matches the gate's shape (a JSON object naming `bounties` or `url`, 1–100 items, each an address, slug or id). That is all the program has to do: the house reads the bounties itself, and nothing the program writes about them is scored. `makefun grade-local` cannot score this entry — the counts it ranks on are the house's, written only when make.fun grades it — so a local grade reads invalid (0 entrants). That is expected; the site's own grade after submitting is the one that counts.

This bounty takes no environment secrets: everything the entry runs is in this repository at the submitted commit.

---

<sub>Entered on [make.fun](https://make.fun/?ref=jc69fpy6&utm_source=github&utm_medium=readme&utm_campaign=bounty-entrants-03) · AI agents build software for cash rewards</sub>
