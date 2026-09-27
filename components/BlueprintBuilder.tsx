"use client";

import Link from "next/link";
import { type FormEvent, type KeyboardEvent, type PointerEvent, type ReactNode, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import { areas } from "@/data/areas";
import { type Block, type BlockVariant, type FeatureGroup, blocksFor, blueprintPresets, featureGroups } from "@/data/blueprint";
import { projects } from "@/data/projects";

/**
 * "Your website blueprint": pick an industry and we draw the plan for your home page
 * (a plan, not a design, so nobody judges it on taste). On tablets and up it's a
 * whiteboard: drag any section anywhere, resize it from the corner, add and remove
 * features; pins, the sitemap, and the list we're sent follow reading order. Phones get
 * the same blueprint as a list with arrows. "Send me my blueprint" hands the plan to the
 * free-check form. It renders finished on load; the drawing animation only plays after
 * a visitor asks for it.
 */

const towns = areas.map((area) => area.city);
const domain = (name: string) => `${name.toLowerCase().replace(/[^a-z0-9]+/g, "") || "yourbusiness"}.com`;
const presetFor = (slug: string) => blueprintPresets.find((preset) => preset.slug === slug)!;

type Rect = { x: number; y: number; w: number; h: number };
type Layout = Record<string, Rect>;
type Anim = { name: "bp-draw" | "bp-new"; delay: number };

/** The whiteboard is drawn in units (about a pixel on a desktop screen) and scaled to fit. */
const W = 660;
const M = 14;
const GAP = 12;
const COL = (W - 2 * M - GAP) / 2;
const SNAP = 6;
const LOCKED = ["nav", "hero", "footer"] as const;
const isLocked = (id: string) => (LOCKED as readonly string[]).includes(id);
const snap = (v: number) => Math.round(v / SNAP) * SNAP;
const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const heights: Record<BlockVariant, number> = {
  rows: 116,
  cards: 116,
  media: 122,
  bars: 102,
  chips: 102,
  form: 108,
  gallery: 126,
  slots: 108,
  map: 116,
  quotes: 108,
  faq: 108,
  email: 96,
  team: 116,
  callout: 96,
  products: 132,
  social: 126,
  stats: 108,
  steps: 108,
  logos: 96,
  compare: 122,
  chat: 116,
  banner: 96,
  calendar: 132,
  split: 122,
};

/** Neat default: menu and hero across the top, sections two to a row in order, footer under them. */
function autoLayout(ids: string[], byId: Map<string, Block>): Layout {
  const layout: Layout = {
    nav: { x: M, y: M, w: W - 2 * M, h: 48 },
    hero: { x: M, y: M + 48 + GAP, w: W - 2 * M, h: 150 },
  };
  let y = M + 48 + GAP + 150 + GAP;
  const placed = ids.filter((id) => byId.has(id));
  for (let i = 0; i < placed.length; i += 2) {
    const row = placed.slice(i, i + 2);
    row.forEach((id, c) => {
      layout[id] = { x: M + c * (COL + GAP), y, w: COL, h: heights[byId.get(id)!.variant] };
    });
    y += Math.max(...row.map((id) => layout[id].h)) + GAP;
  }
  layout.footer = { x: M, y, w: W - 2 * M, h: 48 };
  return layout;
}

/** Top to bottom, then left to right: sections that start within half a grid row of each other read as one row. */
function readingOrder(ids: string[], layout: Layout) {
  const byTop = ids.filter((id) => layout[id]).sort((a, b) => layout[a].y - layout[b].y);
  const rows: string[][] = [];
  for (const id of byTop) {
    const row = rows.at(-1);
    if (row && layout[id].y - layout[row[0]].y < 24) row.push(id);
    else rows.push([id]);
  }
  return rows.flatMap((row) => row.sort((a, b) => layout[a].x - layout[b].x));
}

export default function BlueprintBuilder() {
  const initial = presetFor("churches");
  const initialById = new Map(blocksFor(initial).map((block) => [block.id, block]));

  const [name, setName] = useState("");
  const [slug, setSlug] = useState(initial.slug);
  const [town, setTown] = useState(towns[0]);
  /** Everything on the sheet, in a stable order (so keyboard focus never jumps). */
  const [stack, setStack] = useState<string[]>(["nav", "hero", ...initial.defaults, "footer"]);
  /** Which piece sits on top where they overlap: the last one touched. */
  const [zs, setZs] = useState<Record<string, number>>({});
  const topZ = useRef(0);
  const [layout, setLayout] = useState<Layout>(() => autoLayout(initial.defaults, initialById));
  const [anims, setAnims] = useState<Record<string, Anim>>({});
  const [epoch, setEpoch] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [announce, setAnnounce] = useState("");
  const [scale, setScale] = useState(1);
  const [tab, setTab] = useState<FeatureGroup | "all">("industry");
  const [query, setQuery] = useState("");
  const board = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; mode: "move" | "resize"; px: number; py: number; start: Rect } | null>(null);

  const preset = presetFor(slug);
  const all = blocksFor(preset);
  const byId = new Map(all.map((block) => [block.id, block]));
  const sections = stack.filter((id) => !isLocked(id) && byId.has(id));
  const ordered = readingOrder(sections, layout);
  const placed = ordered.map((id) => byId.get(id)!);
  const number = new Map(ordered.map((id, i) => [id, i + 1]));
  const onBoard = new Set(sections);
  const groupLabel = (id: FeatureGroup) => featureGroups.find((g) => g.id === id)!.label.replace("{noun}", preset.noun);
  const groups = featureGroups
    .map((g) => ({ ...g, label: groupLabel(g.id), blocks: all.filter((block) => block.group === g.id) }))
    .filter((g) => g.blocks.length);
  const needle = query.trim().toLowerCase();
  const shown = needle
    ? all.filter((block) => `${block.tag} ${block.legend}`.toLowerCase().includes(needle))
    : tab === "all"
      ? all
      : all.filter((block) => block.group === tab);
  const pages = [...new Set(["Home", ...placed.flatMap((block) => (block.page ? [block.page] : [])), ...preset.pages])];
  const display = name.trim() || preset.example;
  const project = preset.project ? projects.find((p) => p.slug === preset.project) : undefined;
  const onSheet = stack.filter((id) => layout[id]);
  const boardHeight = Math.max(520, ...onSheet.map((id) => layout[id].y + layout[id].h + M));

  useEffect(() => {
    const el = board.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function draw(nextSlug = slug) {
    const next = presetFor(nextSlug);
    const nextById = new Map(blocksFor(next).map((block) => [block.id, block]));
    if (nextSlug !== slug) {
      setTab("industry");
      setQuery("");
    }
    setSlug(nextSlug);
    setStack(["nav", "hero", ...next.defaults, "footer"]);
    setLayout(autoLayout(next.defaults, nextById));
    setZs({});
    const order = ["nav", "hero", ...next.defaults, "footer"];
    setAnims(Object.fromEntries(order.map((id, i) => [id, { name: "bp-draw", delay: 100 + i * 90 }])));
    setEpoch((e) => e + 1);
    setAnnounce(`Blueprint drawn: a ${next.noun} home page with ${next.defaults.length} sections.`);
  }

  function tidy() {
    setLayout(autoLayout(ordered, byId));
    setAnnounce("Sections tidied into two columns, in the same order.");
  }

  function focusLater(selector: string) {
    requestAnimationFrame(() => document.querySelector<HTMLElement>(selector)?.focus());
  }

  function add(id: string) {
    const block = byId.get(id);
    if (!block) return;
    const h = heights[block.variant];
    const bottom = Math.max(M, ...onSheet.filter((key) => key !== "footer").map((key) => layout[key].y + layout[key].h + GAP));
    const next = { ...layout, [id]: { x: M, y: bottom, w: COL, h } };
    const footer = layout.footer;
    if (footer && footer.y < bottom + h + GAP) next.footer = { ...footer, y: bottom + h + GAP };
    setLayout(next);
    setStack([...stack.filter((x) => x !== "footer"), id, "footer"]);
    setZs((current) => ({ ...current, [id]: ++topZ.current }));
    setAnims((current) => ({ ...current, [id]: { name: "bp-new", delay: 0 } }));
    setAnnounce(`${block.tag} added. Drag it where you want it.`);
  }

  function remove(id: string) {
    setStack(stack.filter((x) => x !== id));
    setAnnounce(`${byId.get(id)?.tag} removed. You can add it back from the feature menu.`);
  }

  /** Phones: move a section up or down the list, then re-flow the columns in that order. */
  function step(id: string, dir: -1 | 1) {
    const from = ordered.indexOf(id);
    const to = from + dir;
    if (from < 0 || to < 0 || to >= ordered.length) return;
    const next = [...ordered];
    next.splice(from, 1);
    next.splice(to, 0, id);
    setLayout(autoLayout(next, byId));
    setAnnounce(`${byId.get(id)?.tag} moved to position ${to + 1} of ${next.length}.`);
    const edge = dir === -1 ? to === 0 : to === next.length - 1;
    const which = edge ? (dir === -1 ? "down" : "up") : dir === -1 ? "up" : "down";
    focusLater(`[data-bp-row="${id}"] [data-bp="${which}"]`);
  }

  function front(id: string) {
    setZs((current) => ({ ...current, [id]: ++topZ.current }));
  }

  function onDown(event: PointerEvent<HTMLElement>, id: string, mode: "move" | "resize") {
    if (event.button !== 0) return;
    if (mode === "move" && (event.target as HTMLElement).closest("button, [data-bp-resize]")) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id, mode, px: event.clientX, py: event.clientY, start: layout[id] };
    setActive(id);
    front(id);
  }

  function onMove(event: PointerEvent<HTMLElement>) {
    const d = drag.current;
    if (!d) return;
    const dx = (event.clientX - d.px) / scale;
    const dy = (event.clientY - d.py) / scale;
    const { x, y, w, h } = d.start;
    const next =
      d.mode === "move"
        ? { x: clamp(snap(x + dx), 0, W - w), y: clamp(snap(y + dy), 0, boardHeight + 60), w, h }
        : { x, y, w: clamp(snap(w + dx), 120, W - x), h: Math.max(56, snap(h + dy)) };
    setLayout((current) => ({ ...current, [d.id]: next }));
  }

  function onUp() {
    const d = drag.current;
    drag.current = null;
    setActive(null);
    if (d) {
      const label = labelFor(d.id);
      setAnnounce(d.mode === "move" ? `${label} moved.` : `${label} resized.`);
    }
  }

  function onKey(event: KeyboardEvent<HTMLElement>, id: string) {
    const r = layout[id];
    if (!r) return;
    if ((event.key === "Delete" || event.key === "Backspace") && !isLocked(id)) {
      event.preventDefault();
      remove(id);
      return;
    }
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-12, 0],
      ArrowRight: [12, 0],
      ArrowUp: [0, -12],
      ArrowDown: [0, 12],
    };
    const delta = moves[event.key];
    if (!delta) return;
    event.preventDefault();
    const [dx, dy] = delta;
    const next = event.shiftKey
      ? { ...r, w: clamp(r.w + dx, 120, W - r.x), h: Math.max(56, r.h + dy) }
      : { ...r, x: clamp(r.x + dx, 0, W - r.w), y: Math.max(0, r.y + dy) };
    setLayout({ ...layout, [id]: next });
    front(id);
  }

  function labelFor(id: string) {
    return id === "nav" ? "Menu" : id === "hero" ? "Hero" : id === "footer" ? "Footer" : (byId.get(id)?.tag ?? id);
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    draw();
  }

  const send = `/free-website-check/?${new URLSearchParams({
    business: name.trim(),
    industry: preset.noun,
    town,
    blueprint: placed.map((block) => block.tag).join("|"),
  })}#request`;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
      <form onSubmit={onSubmit} className="grid content-start gap-7 lg:col-span-4">
        <div>
          <label htmlFor="bp-name" className="t-mono text-mist">
            Business name
          </label>
          <input
            id="bp-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={40}
            autoComplete="organization"
            placeholder={`e.g. ${preset.example}`}
            className="mt-3 w-full rounded-xl bg-navy-2 px-4 py-3.5 text-lg text-cream ring-1 ring-cream/20 placeholder:text-mist/70 focus:ring-2 focus:ring-orange focus:outline-none"
          />
        </div>

        <fieldset>
          <legend className="t-mono text-mist">What you do</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {blueprintPresets.map((p) => (
              <label key={p.slug} className="cursor-pointer">
                <input
                  type="radio"
                  name="bp-industry"
                  value={p.slug}
                  checked={slug === p.slug}
                  onChange={() => draw(p.slug)}
                  className="peer sr-only"
                />
                <span className="inline-flex rounded-full px-4 py-2 text-sm font-bold ring-1 ring-cream/25 transition-colors peer-checked:bg-orange peer-checked:text-navy peer-checked:ring-orange peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange hover:ring-cream/60">
                  {p.chip}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="bp-town" className="t-mono text-mist">
            Town
          </label>
          <select
            id="bp-town"
            value={town}
            onChange={(event) => setTown(event.target.value)}
            className="mt-3 w-full rounded-xl bg-navy-2 px-4 py-3.5 text-cream ring-1 ring-cream/20 focus:ring-2 focus:ring-orange focus:outline-none"
          >
            {towns.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="inline-flex items-center gap-2.5 rounded-full bg-orange px-6 py-3.5 text-[0.95rem] font-bold text-navy shadow-[0_8px_24px_-12px_rgba(251,79,20,0.7)] transition-colors hover:bg-orange-soft"
          >
            Draw my blueprint
          </button>
        </div>

        <div className="rounded-2xl p-5 ring-1 ring-cream/15">
          <p className="t-mono text-mist">Make it yours</p>
          <ul className="mt-3 hidden gap-2 text-sm text-cream/85 md:grid">
            <Hint mark="✥">Drag any section to move it, even the menu and footer</Hint>
            <Hint mark="◢">Drag a section&rsquo;s corner to resize it</Hint>
            <Hint mark="×">Pick from dozens of features below, or remove what you don&rsquo;t need</Hint>
            <Hint mark="▦">Tidy up snaps everything back into neat columns</Hint>
          </ul>
          <ul className="mt-3 grid gap-2 text-sm text-cream/85 md:hidden">
            <Hint mark="↕">Use the arrows to reorder sections</Hint>
            <Hint mark="×">Remove anything you don&rsquo;t need</Hint>
            <Hint mark="+">Pick from dozens of features under the blueprint</Hint>
          </ul>
        </div>

        <p id="bp-keys" className="sr-only">
          Arrow keys move this section. Shift and arrow keys resize it. Delete removes it.
        </p>
        <p role="status" className="sr-only">
          {announce}
        </p>
      </form>

      <div className="min-w-0 lg:col-span-8">
        <div className="bp-sheet relative rounded-[10px] p-4 text-cream shadow-[0_50px_90px_-30px_rgba(0,0,0,0.7)] ring-1 ring-cream/20 sm:p-7">
          <span aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-[5px] border-[1.5px] border-cream/45" />

          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="bp-tag text-orange-soft">Site plan · Home page</p>
              <p className="t-h3 mt-1 truncate">{domain(display)}</p>
            </div>
            <Dimension label="Desktop · 1440 px" className="hidden w-44 sm:flex" />
          </div>

          {/* Tablets and up: the whiteboard */}
          <div
            ref={board}
            className="relative mt-5 hidden overflow-hidden rounded-[6px] border-[1.5px] border-cream/80 md:block"
            style={{ height: boardHeight * scale + 3 }}
          >
            <div
              className="absolute top-0 left-0 origin-top-left"
              style={{ width: W, height: boardHeight, transform: `scale(${scale})` }}
            >
              {stack.map((id) => {
                const r = layout[id];
                if (!r || (!isLocked(id) && !byId.has(id))) return null;
                const anim = anims[id];
                const moving = active === id;
                const block = byId.get(id);
                return (
                  <div
                    key={`${epoch}-${id}`}
                    role="group"
                    aria-roledescription="movable section"
                    aria-label={isLocked(id) ? labelFor(id) : `Section ${number.get(id)}: ${labelFor(id)}`}
                    aria-describedby="bp-keys"
                    tabIndex={0}
                    onPointerDown={(event) => onDown(event, id, "move")}
                    onPointerMove={onMove}
                    onPointerUp={onUp}
                    onPointerCancel={onUp}
                    onKeyDown={(event) => onKey(event, id)}
                    className={`${anim ? anim.name : ""} group absolute cursor-grab touch-none overflow-hidden rounded-[5px] border-[1.5px] select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                      moving
                        ? "cursor-grabbing border-solid border-orange-soft bg-[#0f4278] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
                        : `transition-[left,top,width,height] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            id === "nav" || id === "footer" ? "border-cream/60" : "border-dashed border-cream/55"
                          } bg-[#0b3563] hover:border-cream/90`
                    }`}
                    style={{
                      left: r.x,
                      top: r.y,
                      width: r.w,
                      height: r.h,
                      zIndex: moving ? 1000 : zs[id],
                      animationDelay: anim?.delay ? `${anim.delay}ms` : undefined,
                    }}
                  >
                    {id === "nav" ? (
                      <NavDrawing name={display} nav={preset.nav} cta={preset.ctas[0]} />
                    ) : id === "hero" ? (
                      <HeroDrawing headline={preset.headline.replaceAll("{town}", town)} ctas={preset.ctas} />
                    ) : id === "footer" ? (
                      <p className="bp-tag px-3 py-3.5">Footer · hours, contact, and social links</p>
                    ) : block ? (
                      <div className="flex h-full flex-col gap-2 p-2.5 pr-9">
                        <p className="flex items-center gap-2">
                          <span className="bp-pin">{number.get(id)}</span>
                          <span className="bp-tag truncate">{block.tag}</span>
                        </p>
                        <p className="text-[0.74rem] leading-snug text-cream/90">{block.legend}</p>
                        <div className="mt-auto" aria-hidden="true">
                          <Sketch block={block} />
                        </div>
                      </div>
                    ) : null}

                    {!isLocked(id) ? (
                      <button
                        type="button"
                        aria-label={`Remove ${labelFor(id)}`}
                        onClick={() => remove(id)}
                        className="absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-md font-mono text-base text-cream/80 hover:bg-cream/10 hover:text-cream"
                      >
                        ×
                      </button>
                    ) : null}
                    <span
                      data-bp-resize
                      aria-hidden="true"
                      onPointerDown={(event) => onDown(event, id, "resize")}
                      onPointerMove={onMove}
                      onPointerUp={onUp}
                      onPointerCancel={onUp}
                      className="absolute right-0 bottom-0 flex h-6 w-6 cursor-nwse-resize items-end justify-end p-1 text-cream/55 group-hover:text-orange-soft"
                    >
                      <svg viewBox="0 0 10 10" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9 1 1 9M9 5 5 9" />
                      </svg>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Phones: the same blueprint as a list */}
          <div className="relative mt-5 rounded-[6px] border-[1.5px] border-cream/80 p-2.5 md:hidden">
            <NavDrawing name={display} nav={preset.nav} cta={preset.ctas[0]} compact />
            <div className="mt-2.5 rounded-[5px] border-[1.5px] border-dashed border-cream/55">
              <HeroDrawing headline={preset.headline.replaceAll("{town}", town)} ctas={preset.ctas} />
            </div>
            <ol aria-label="Home page sections, in order" className="mt-2.5 grid gap-2.5">
              {placed.map((block, index) => {
                const anim = anims[block.id];
                return (
                  <li
                    key={`${epoch}-${block.id}`}
                    data-bp-row={block.id}
                    className={`${anim ? anim.name : ""} flex items-center gap-2 rounded-[5px] border-[1.5px] border-dashed border-cream/55 bg-[#0b3563]/70 py-1.5 pr-1 pl-2`}
                    style={anim?.delay ? { animationDelay: `${anim.delay}ms` } : undefined}
                  >
                    <span className="bp-pin">{index + 1}</span>
                    <div className="min-w-0 flex-1">
                      <p className="bp-tag">{block.tag}</p>
                      <p className="mt-0.5 text-[0.8rem] leading-snug text-cream/90">{block.legend}</p>
                    </div>
                    <div className="flex shrink-0 items-center">
                      <RowButton
                        label={`Move ${block.tag} up`}
                        data="up"
                        disabled={index === 0}
                        onClick={() => step(block.id, -1)}
                      >
                        ↑
                      </RowButton>
                      <RowButton
                        label={`Move ${block.tag} down`}
                        data="down"
                        disabled={index === placed.length - 1}
                        onClick={() => step(block.id, 1)}
                      >
                        ↓
                      </RowButton>
                      <RowButton label={`Remove ${block.tag}`} data="remove" onClick={() => remove(block.id)}>
                        ×
                      </RowButton>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="bp-tag mt-2.5 rounded-[5px] border-[1.5px] border-cream/45 px-3 py-2.5">
              Footer · hours, contact, and social links
            </p>
          </div>

          {/* Phone outline, sitemap, and title block */}
          <div className="relative mt-5 grid gap-5 border-t-[1.5px] border-cream/45 pt-5 sm:grid-cols-[auto_1fr_1fr]">
            <div className="hidden sm:block">
              <Dimension label="390 px" className="mb-2 flex w-28" />
              <div className="flex h-52 w-28 flex-col gap-1.5 overflow-hidden rounded-[14px] border-[1.5px] border-cream/80 p-2">
                <span className="h-2 w-10 rounded-sm bg-cream/35" />
                <span className="mt-1 h-8 shrink-0 rounded-[3px] border border-dashed border-cream/55" />
                {placed.slice(0, 5).map((block) => (
                  <span
                    key={block.id}
                    className="truncate rounded-[3px] border border-dashed border-cream/45 px-1 py-1 font-mono text-[0.5rem] text-cream/75 uppercase"
                  >
                    {block.tag}
                  </span>
                ))}
              </div>
              <p className="bp-tag mt-2 text-orange-soft">Phone-first</p>
            </div>

            <div>
              <p className="bp-tag text-orange-soft">Sitemap · {pages.length} pages</p>
              <ul className="mt-3 grid gap-1 font-mono text-xs">
                {pages.map((page, i) => (
                  <li key={page}>
                    <span aria-hidden="true" className="text-cream/60">
                      {i === 0 ? "┌ " : i === pages.length - 1 ? "└ " : "├ "}
                    </span>
                    {page}
                  </li>
                ))}
              </ul>
            </div>

            <dl className="grid content-start gap-3 font-mono text-[0.68rem] tracking-[0.08em] uppercase sm:border-l-[1.5px] sm:border-cream/45 sm:pl-5">
              <div>
                <dt className="text-cream/70">Drawn for</dt>
                <dd className="mt-0.5 break-words">{display}</dd>
              </div>
              <div>
                <dt className="text-cream/70">Drawn by</dt>
                <dd className="mt-0.5">5280 Web Solutions</dd>
              </div>
              <div>
                <dt className="text-cream/70">Sheet</dt>
                <dd className="mt-0.5">1 of 1 · {town}, CO</dd>
              </div>
              <div>
                <dt className="text-cream/70">Plan</dt>
                <dd className="mt-0.5">
                  {placed.length} features · {pages.length} pages
                </dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="t-mono text-mist">Add or remove features</p>
            <div className="flex gap-5">
              <button
                type="button"
                onClick={tidy}
                className="hidden text-sm font-semibold text-mist underline underline-offset-4 hover:text-cream md:inline"
              >
                Tidy up
              </button>
              <button
                type="button"
                onClick={() => draw()}
                className="text-sm font-semibold text-mist underline underline-offset-4 hover:text-cream"
              >
                Start over
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <label htmlFor="bp-search" className="sr-only">
              Search features
            </label>
            <input
              id="bp-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${all.length} features`}
              className="w-full rounded-full bg-navy-2 px-4 py-2.5 text-sm text-cream ring-1 ring-cream/20 placeholder:text-mist/70 focus:ring-2 focus:ring-orange focus:outline-none sm:w-64"
            />
            <p className="text-sm text-mist">
              <span className="font-bold text-cream">{sections.length}</span> on your blueprint · {all.length - sections.length} more
              to try
            </p>
          </div>

          <div role="group" aria-label="Feature categories" className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible">
            {[{ id: "all" as const, label: "All", blocks: all }, ...groups].map((g) => {
              const on = g.blocks.filter((block) => onBoard.has(block.id)).length;
              const current = !needle && tab === g.id;
              return (
                <button
                  key={g.id}
                  type="button"
                  aria-pressed={current}
                  onClick={() => {
                    setTab(g.id);
                    setQuery("");
                  }}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-sm font-bold ring-1 transition-colors ${
                    current ? "bg-cream text-navy ring-cream" : "text-cream ring-cream/25 hover:ring-cream/60"
                  }`}
                >
                  {g.label}
                  <span className={`font-mono text-xs ${current ? "text-navy/70" : "text-mist"}`}>
                    {on ? `${on}/` : ""}
                    {g.blocks.length}
                  </span>
                </button>
              );
            })}
          </div>

          {shown.length ? (
            <ul aria-label={needle ? `Features matching ${query.trim()}` : "Features"} className="mt-4 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {shown.map((block) => {
                const added = onBoard.has(block.id);
                return (
                  <li key={block.id}>
                    <button
                      type="button"
                      data-bp-add={block.id}
                      aria-pressed={added}
                      onClick={() => (added ? remove(block.id) : add(block.id))}
                      className={`group/f flex h-full w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left transition-colors ${
                        added
                          ? "border-[1.5px] border-orange bg-orange/15"
                          : "border-[1.5px] border-dashed border-cream/25 hover:border-cream/60 hover:bg-cream/5"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          added ? "bg-orange text-navy" : "text-orange-soft ring-[1.5px] ring-orange-soft/70"
                        }`}
                      >
                        {added ? "✓" : "+"}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-bold text-cream">{block.tag}</span>
                        <span className="mt-0.5 block text-[0.8rem] leading-snug text-mist">{block.legend}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-mist">
              Nothing matches &ldquo;{query.trim()}&rdquo;. Try another word, or{" "}
              <button type="button" onClick={() => setQuery("")} className="font-semibold text-cream underline underline-offset-4">
                see them all
              </button>
              .
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="t-h3">Your blueprint is ready.</p>
            <p className="mt-1.5 max-w-md text-mist">
              The design comes next, drawn from scratch with you.{" "}
              <Link
                href={project ? `/work/${project.slug}/` : "/work/"}
                className="font-semibold text-cream underline underline-offset-4 hover:text-orange-soft"
              >
                {project ? `See what we built for a ${preset.noun} like yours` : "See the sites we've built"}
              </Link>
            </p>
          </div>
          <Button href={send} className="shrink-0">
            Send me my blueprint
          </Button>
        </div>
      </div>
    </div>
  );
}

function Hint({ mark, children }: { mark: string; children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span aria-hidden="true" className="w-4 shrink-0 text-center font-bold text-orange-soft">
        {mark}
      </span>
      <span>{children}</span>
    </li>
  );
}

function NavDrawing({ name, nav, cta, compact = false }: { name: string; nav: string[]; cta: string; compact?: boolean }) {
  return (
    <div className={`flex h-full items-center justify-between gap-3 ${compact ? "border-b-[1.5px] border-cream/45 pb-2.5" : "px-3 pr-7"}`}>
      <span className="flex min-w-0 items-center gap-2">
        <span className="h-5 w-5 shrink-0 rounded-[4px] border-[1.5px] border-dashed border-cream/60" />
        <span className="truncate font-mono text-xs font-medium">{name}</span>
      </span>
      {compact ? null : (
        <span className="bp-tag flex gap-4">
          {nav.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </span>
      )}
      <span className="bp-tag shrink-0 rounded-full border-[1.5px] border-cream/80 px-2.5 py-1 text-cream">{cta}</span>
    </div>
  );
}

function HeroDrawing({ headline, ctas }: { headline: string; ctas: [string, string] }) {
  return (
    <div className="flex h-full items-end justify-between gap-4 p-3">
      <div className="min-w-0">
        <p className="bp-tag">Hero</p>
        <p className="t-h3 mt-1.5">&ldquo;{headline}&rdquo;</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="bp-tag rounded-full border-[1.5px] border-cream/80 px-2.5 py-1 text-cream">{ctas[0]}</span>
          <span className="bp-tag rounded-full border-[1.5px] border-dashed border-cream/55 px-2.5 py-1">{ctas[1]}</span>
        </div>
      </div>
      <span className="bp-tag hidden h-20 w-32 shrink-0 items-center justify-center rounded-[4px] border-[1.5px] border-dashed border-cream/45 sm:flex">
        Photo
      </span>
    </div>
  );
}

function RowButton({
  label,
  data,
  disabled,
  onClick,
  children,
}: {
  label: string;
  data: string;
  disabled?: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      data-bp={data}
      disabled={disabled}
      onClick={onClick}
      className="flex h-9 w-8 items-center justify-center rounded-md font-mono text-base text-cream/80 transition-colors hover:bg-cream/10 hover:text-cream disabled:pointer-events-none disabled:opacity-25"
    >
      {children}
    </button>
  );
}

function Dimension({ label, className = "" }: { label: string; className?: string }) {
  return (
    <span className={`items-center gap-2 font-mono text-[0.62rem] tracking-[0.06em] text-orange-soft uppercase ${className}`}>
      <span className="bp-dim flex-1" />
      <span className="shrink-0">{label}</span>
      <span className="bp-dim flex-1" />
    </span>
  );
}

const dash = "rounded-[3px] border border-dashed border-cream/50";

/** A tiny line drawing of the section, so it reads like a blueprint. */
function Sketch({ block }: { block: Block }) {
  const cell = "font-mono text-[0.58rem] leading-none text-cream/80";
  switch (block.variant) {
    case "rows":
      return (
        <div className="grid gap-1.5">
          {block.rows?.map(([label, value]) => (
            <span key={label} className={`flex justify-between gap-2 ${cell}`}>
              <span className="truncate">{label}</span>
              <span>{value}</span>
            </span>
          ))}
        </div>
      );
    case "cards":
      return (
        <div className="grid grid-cols-3 gap-1">
          {block.items?.map((item) => (
            <span key={item} className={`${dash} ${cell} truncate px-1 py-2 text-center`}>
              {item}
            </span>
          ))}
        </div>
      );
    case "media":
      return <span className={`${dash} ${cell} flex h-9 items-center justify-center`}>{block.button ?? "▶ Video"}</span>;
    case "bars":
      return (
        <div className="grid gap-1.5">
          <span className="bp-bar w-full" />
          <span className="bp-bar w-4/5" />
          <span className="bp-bar w-3/5" />
        </div>
      );
    case "chips":
      return (
        <div className="flex gap-1">
          {block.items?.map((item, i) => (
            <span key={item} className={`${i === 1 ? "rounded-[3px] border border-cream/80" : dash} ${cell} px-1.5 py-1.5`}>
              {item}
            </span>
          ))}
        </div>
      );
    case "form":
      return (
        <div className="flex gap-1">
          {block.items?.map((item) => (
            <span key={item} className={`${dash} ${cell} flex-1 truncate px-1 py-1.5`}>
              {item}
            </span>
          ))}
          <span className={`rounded-[3px] border border-cream/80 ${cell} px-1.5 py-1.5`}>{block.button}</span>
        </div>
      );
    case "gallery":
    case "social":
      return (
        <div className="grid grid-cols-4 gap-1">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`${dash} ${cell} flex aspect-[4/3] items-center justify-center`}>
              {block.variant === "social" && i === 0 ? "@" : null}
            </span>
          ))}
        </div>
      );
    case "slots":
      return (
        <div className="grid grid-cols-4 gap-1">
          {block.items?.map((item, i) => (
            <span
              key={item}
              className={`${i === 1 ? "rounded-[3px] border border-cream/80" : dash} ${cell} py-1.5 text-center`}
            >
              {item}
            </span>
          ))}
        </div>
      );
    case "map":
      return <span className={`${dash} ${cell} flex h-9 items-center justify-center`}>⌖ Map</span>;
    case "quotes":
      return (
        <div className="grid gap-1.5">
          <span className={`${cell} tracking-[0.2em]`}>★★★★★</span>
          <span className="bp-bar w-full" />
          <span className="bp-bar w-2/3" />
        </div>
      );
    case "faq":
      return (
        <div className="grid gap-1">
          {["Question", "Question"].map((q, i) => (
            <span key={i} className={`${dash} ${cell} flex justify-between px-1.5 py-1`}>
              {q}
              <span>+</span>
            </span>
          ))}
        </div>
      );
    case "email":
      return (
        <div className="flex gap-1">
          <span className={`${dash} ${cell} flex-1 px-1.5 py-1.5`}>Email</span>
          <span className={`rounded-[3px] border border-cream/80 ${cell} px-1.5 py-1.5`}>Join</span>
        </div>
      );
    case "team":
      return (
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="grid flex-1 justify-items-center gap-1">
              <span className="h-5 w-5 rounded-full border border-dashed border-cream/55" />
              <span className="bp-bar w-full" />
            </span>
          ))}
        </div>
      );
    case "callout":
      return (
        <span className={`block truncate rounded-full border border-cream/80 ${cell} px-2 py-2 text-center`}>
          {block.button}
        </span>
      );
    case "products":
      return (
        <div className="grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="grid gap-1">
              <span className={`${dash} aspect-[4/3]`} />
              <span className="bp-bar w-3/4" />
            </span>
          ))}
        </div>
      );
    case "stats":
      return (
        <div className="flex gap-3">
          {block.rows?.map(([value, label]) => (
            <span key={label} className="grid gap-1">
              <span className="font-display text-base leading-none font-bold text-cream">{value}</span>
              <span className={cell}>{label}</span>
            </span>
          ))}
        </div>
      );
    case "steps":
      return (
        <div className="flex items-center gap-1">
          {block.items?.map((item, i) => (
            <span key={item} className="flex min-w-0 flex-1 items-center gap-1">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-cream/80 font-mono text-[0.5rem]">
                {i + 1}
              </span>
              <span className={`${cell} truncate`}>{item}</span>
              {i < (block.items?.length ?? 0) - 1 ? <span className="h-px min-w-2 flex-1 bg-cream/40" /> : null}
            </span>
          ))}
        </div>
      );
    case "logos":
      return (
        <div className="flex gap-1">
          {block.items?.map((item, i) => (
            <span key={i} className={`${dash} ${cell} flex-1 truncate py-2 text-center uppercase`}>
              {item}
            </span>
          ))}
        </div>
      );
    case "compare":
      return (
        <div className="relative grid h-12 grid-cols-2">
          <span className={`${dash} ${cell} flex items-center justify-center rounded-r-none`}>Before</span>
          <span className={`${dash} ${cell} flex items-center justify-center rounded-l-none border-l-0`}>After</span>
          <span className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cream/80 bg-[#0b3563]" />
        </div>
      );
    case "chat":
      return (
        <div className="flex items-end gap-2">
          <div className="grid flex-1 gap-1">
            <span className="bp-bar w-3/5" />
            <span className="bp-bar ml-auto w-2/5" />
          </div>
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-cream/80 ${cell}`}>…</span>
        </div>
      );
    case "banner":
      return (
        <span className={`block truncate rounded-[3px] border border-cream/80 ${cell} px-2 py-1.5 text-center`}>
          {block.button}
        </span>
      );
    case "calendar":
      return (
        <div className="grid grid-cols-7 gap-0.5">
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-[2px] ${i === 3 || i === 9 ? "border border-cream/80 bg-cream/15" : "border border-dashed border-cream/35"}`}
            />
          ))}
        </div>
      );
    case "split":
      return (
        <div className="grid grid-cols-2 gap-2">
          <span className={`${dash} ${cell} flex h-10 items-center justify-center`}>Photo</span>
          <span className="grid content-center gap-1.5">
            <span className="bp-bar w-full" />
            <span className="bp-bar w-4/5" />
            <span className="bp-bar w-1/2" />
          </span>
        </div>
      );
  }
}
