# 5280 Web Solutions

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

## Deploy (GitHub Pages + 5280webs.com)

1. Push the repo to GitHub.
2. Deploy the `out/` folder, either with a GitHub Actions Pages workflow or by publishing `out/` to a `gh-pages` branch.
3. `public/CNAME` already contains `5280webs.com`. At the domain registrar, point the apex A records to GitHub Pages (185.199.108.153, .109.153, .110.153, .111.153) and add a `www` CNAME to `milehighpatriot.github.io`.
4. In the repo's Pages settings, turn on **Enforce HTTPS**.
5. Submit `https://5280webs.com/sitemap.xml` in Google Search Console.

## Still to add

- Real client projects in `data/projects.ts` as they launch
- Cookie-free analytics (Cloudflare Web Analytics or Plausible)

## Photo credits

Both photos are free to use commercially. Their licenses require the credit lines already shown on the site:

- **Front Range + downtown Denver at sunset** (hero, footer, 404, share image): DarlArthurS, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Downtown_Denver_Skyline_at_Sunset.jpg). Credit is in the footer (`photoCredit` in `data/site.ts`).
- **Car wash tunnel** (before/after slider): Visitor7, [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/), via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Inside_a_Carwash-2.jpg). Credit is under the slider.
