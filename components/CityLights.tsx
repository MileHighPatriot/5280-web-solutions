"use client";

import { useEffect, useRef } from "react";

type Light = {
  x: number;
  y: number;
  r: number;
  rise: number;
  drift: number;
  phase: number;
};

/**
 * A few dozen soft orange points drifting slowly upward, like city lights seen through haze.
 * Decorative and deliberately cheap: it starts only after the page has loaded and gone idle,
 * draws at about 30 frames a second, stops while it's off screen or the tab is hidden, and never
 * starts at all under reduced motion, data-saver, or on low-power devices.
 * Place it inside a `relative` box; it fills that box.
 */
export default function CityLights({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData ||
      (navigator.hardwareConcurrency ?? 8) <= 4
    ) {
      return;
    }

    // One pre-drawn glow, stamped for every light: far cheaper than a gradient per point per frame.
    const sprite = document.createElement("canvas");
    sprite.width = sprite.height = 64;
    const paint = sprite.getContext("2d");
    if (!paint) return;
    const glow = paint.createRadialGradient(32, 32, 0, 32, 32, 32);
    glow.addColorStop(0, "rgba(255,176,122,1)");
    glow.addColorStop(0.25, "rgba(251,79,20,0.55)");
    glow.addColorStop(1, "rgba(251,79,20,0)");
    paint.fillStyle = glow;
    paint.fillRect(0, 0, 64, 64);

    const scale = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = 0;
    let height = 0;
    let lights: Light[] = [];
    let frame = 0;
    let last = 0;
    let visible = false;
    let started = false;

    const size = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      const count = Math.min(44, Math.round((width * height) / 26000));
      lights = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 2 + Math.random() * 7,
        rise: 4 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 6,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (now: number) => {
      frame = requestAnimationFrame(draw);
      if (now - last < 33) return;
      const step = Math.min(0.1, (now - last) / 1000);
      last = now;
      context.clearRect(0, 0, width, height);
      for (const light of lights) {
        light.y -= light.rise * step;
        light.x += light.drift * step;
        if (light.y < -20) {
          light.y = height + 20;
          light.x = Math.random() * width;
        }
        context.globalAlpha =
          0.14 + 0.3 * (0.5 + 0.5 * Math.sin(now / 1400 + light.phase));
        context.drawImage(
          sprite,
          light.x - light.r * 2,
          light.y - light.r * 2,
          light.r * 4,
          light.r * 4,
        );
      }
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const play = () => {
      if (!frame && started && visible && !document.hidden)
        frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else stop();
    });
    const onVisibility = () => (document.hidden ? stop() : play());

    const canIdle = typeof window.requestIdleCallback === "function";
    let idle = 0;
    const begin = () => {
      started = true;
      size();
      observer.observe(canvas);
      document.addEventListener("visibilitychange", onVisibility);
      window.addEventListener("resize", size);
    };
    const whenLoaded = () => {
      idle = canIdle
        ? window.requestIdleCallback(begin, { timeout: 3000 })
        : window.setTimeout(begin, 900);
    };
    if (document.readyState === "complete") whenLoaded();
    else window.addEventListener("load", whenLoaded, { once: true });

    return () => {
      window.removeEventListener("load", whenLoaded);
      if (canIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", size);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full mix-blend-screen ${className}`}
    />
  );
}
