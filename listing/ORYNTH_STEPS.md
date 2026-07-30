# Orynth Product Submit — recorded flow

URL: https://www.orynth.dev/projects/submit
Account: devorynth@gmail.com (Google)

## Steps (1–13)

1. Click **Product** card (Apps, tools, SaaS…)
2. **Product name** → `#name` (max 40) → **Next**
3. **One line pitch** → `#tagline` (max 50) → **Next**
4. **Where can people try it** → `#websiteUrl` → **Next**
5. **What makes it special** → TipTap (max 500) → **Next**
6. **Logo** → upload SVG/PNG → **Next**
7. **Screenshots** → multi upload → **Next**
8. **Categories** → exactly 3 `#cat-*` → **Next**
9. → **Next** (no Autodev fill)
10. → **Next** (no Autodev fill)
11. **First comment** → TipTap (max 500) → **Next**
12. → **Next**
13. **Submit product** — dashboard approves → clicks **Submit product**
14. **Verify ownership** — download `.txt` → `public/.well-known/ory-verify.txt` → git push + redeploy → click **Verify ownership**

Automation: `src/orynth-submit.ts` (Playwright). Logo SVG → PNG via
`setInputFiles`. Dashboard approval submits; ownership verify follows.

## This ship

```json
{
  "productName": "Solscan Echo",
  "oneLinePitch": "Wallet forensics with emotional timeline",
  "websiteUrl": "https://solscanecho.loomship.xyz",
  "whatMakesItSpecial": "Solscan Echo shows your Solana wallet's token holdings, PnL, and recent trades. The emotional timeline maps your trading psychology with color-coded sentiment waves: green peaks for win streaks, red troughs for losses, blue plateaus for hodl calm. You also get behavioral stats like win rate, average hold time, and an impulsive trade score. No wallet connection needed, just paste any address.",
  "logoAbsolutePath": "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\solscanecho\\listing\\logo.svg",
  "screenshotAbsolutePaths": [
    "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\solscanecho\\listing\\screenshots\\01-home.png",
    "C:\\Users\\noahw\\Downloads\\CodingProjects\\OrynthAutoDev\\projects\\solscanecho\\listing\\screenshots\\02-wallet-7xkxtg2cw87d97txjsdpbd5jbkhetqa83.png"
  ],
  "categories": [
    "Blockchain & Crypto",
    "Data Science & Analytics",
    "Developer Tools"
  ],
  "categoryIds": [
    "cat-blockchain",
    "cat-data-science",
    "cat-developer-tools"
  ],
  "firstComment": "Hey Orynth, I built this because I kept revenge-trading after red days and wanted to see my emotional patterns on-chain. The sentiment wave algorithm reads transaction clusters and calculates hodl patience vs panic sells. Would love feedback on the behavioral metrics, are they actually useful or just noise?"
}
```
