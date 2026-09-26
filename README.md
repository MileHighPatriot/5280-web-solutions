# 5280 Web Solutions

### 👉 [View the live website](https://5280webs.com)

https://5280webs.com

Business website for 5280 Web Solutions (5280webs.com): websites for Front Range small businesses.

Built with **Next.js 16** (static export), **TypeScript**, and **Tailwind CSS v4**. No client-side animation library. The only JavaScript on the page is the mobile menu and the forms.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

## Change prices and copy

Everything editable lives in `data/`:

| File | What's in it |
|---|---|
| `data/pricing.ts` | **All prices**: monthly tiers, setup fees, flat-fee range, hosting, à la carte edit rate, "every build includes," comparison table |
| `data/site.ts` | Business name, phone, email, hours, cities served |
| `data/services.ts` | Services, the 4-step process, industries |
| `data/projects.ts` | Portfolio / case studies (concept projects are labeled automatically) |
| `data/areas.ts` | City pages (`/areas/denver/` etc.) |
| `data/faq.ts` | FAQ answers. Pricing answers pull numbers from `pricing.ts` |

Change a number in `data/pricing.ts` and the pricing page, homepage, city pages, contact form, FAQ, and Google structured data all update.

## Contact forms

Forms send through [Web3Forms](https://web3forms.com) (free) to kohlton@5280webs.com. The access key is in `data/site.ts` (`web3formsKey`). It's public by design, since it only allows sending messages to that inbox. To use a different key, change it there or set `NEXT_PUBLIC_WEB3FORMS_KEY` at build time.

## Deploy

The site is live at **https://5280webs.com**. GitHub Pages publishes the `docs/` folder on `main`, with **Enforce HTTPS** on. After making changes, rebuild it and save:

```bash
npm run pages      # builds the site into docs/ (keeps docs/CNAME)
```

DNS is at Squarespace. The apex A records point to GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153), and `www` is a CNAME to `milehighpatriot.github.io`. The concept sites use subdomains that are also CNAMEs to `milehighpatriot.github.io`: `summit.`, `helix.`, `platte.` and `headgate.5280webs.com`. Each concept repo has a `CNAME` file that claims its subdomain.

## Finish setup: accounts still needed

Each of these is empty in `data/site.ts` (marked `TODO(Kohlton)`). Until it's filled in, that feature hides itself or falls back to "call or text".

| Setting | What it turns on | How to get it (all free) |
|---|---|---|
| `pagespeedKey` | The live speed test on `/free-website-check/`. Without it, Google's shared quota usually refuses, and visitors get "send it to me instead." | [Google Cloud console](https://console.cloud.google.com): new project → enable **PageSpeed Insights API** → Credentials → Create API key. Restrict it to the websites `https://5280webs.com/*` and `https://www.5280webs.com/*` (HTTP referrers) and to the PageSpeed Insights API only. The key is visible in the page by design, so those restrictions are what protect it. |
| `calLink` | A "Book a 20-minute call" button on `/contact/` and `/free-website-check/`. | [cal.com](https://cal.com): create a 20-minute "Intro call" event with availability **Mon–Fri, 8am–6pm** (to match `hours`), then paste the part after `cal.com/`, e.g. `kohlton/intro-call`. |
| `goatcounterCode` | Cookie-free visitor analytics (no cookie banner needed). | [goatcounter.com](https://www.goatcounter.com): sign up and pick a code, e.g. `5280webs`. Paste just the code. |

## Still to add

- Real client projects in `data/projects.ts` as they launch
- A concept project outside construction/trades (salon, restaurant, or cleaning) to pair with Helix on the homepage

## Photo credits

Both photos are free to use commercially. Their licenses require the credit lines already shown on the site:

- **Front Range + downtown Denver at sunset** (hero, footer, 404, share image): DarlArthurS, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Downtown_Denver_Skyline_at_Sunset.jpg). Credit is in the footer (`photoCredit` in `data/site.ts`).
- **Car wash tunnel** (before/after slider): Visitor7, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Inside_a_Carwash-2.jpg). Credit is under the slider.
