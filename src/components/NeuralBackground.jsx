import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./NeuralBackground.module.css";

// Node colours come from the active theme's --neural-* tokens (see variables.css).
const readPalette = () => {
  const css = getComputedStyle(document.documentElement);
  const rgb = (name, fallback) => {
    const parts = css.getPropertyValue(name).split(",").map((v) => Number(v.trim()));
    return parts.length === 3 && parts.every((v) => Number.isFinite(v)) ? parts : fallback;
  };
  const line = Number(css.getPropertyValue("--neural-line")) || 0.3;
  return {
    colors: [rgb("--neural-1", [34, 211, 238]), rgb("--neural-2", [139, 92, 246]), rgb("--neural-3", [255, 122, 26])],
    line,
  };
};

/** Animated neural-network canvas: drifting nodes, linking lines, mouse-reactive. */
export default function NeuralBackground() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let nodes = [];
    let linkDistance = 150;
    let frame = 0;
    let inView = true;
    let pageVisible = !document.hidden;
    const mouse = { x: -9999, y: -9999 };
    let palette = readPalette();

    const setup = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const mobile = width < 768;
      const count = mobile ? 36 : Math.min(110, Math.max(60, Math.round((width * height) / 15000)));
      linkDistance = mobile ? 110 : 150;
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.8,
        c: Math.random() < 0.1 ? 2 : Math.random() < 0.55 ? 0 : 1,
      }));
    };

    const draw = (animate) => {
      ctx.clearRect(0, 0, width, height);

      for (const n of nodes) {
        if (animate) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 160 && dist > 0) {
            const force = (160 - dist) / 160;
            n.x += (dx / dist) * force * 1.2;
            n.y += (dy / dist) * force * 1.2;
          }
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.max(0, Math.min(width, n.x));
          n.y = Math.max(0, Math.min(height, n.y));
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < linkDistance) {
            const [r, g, bl] = palette.colors[a.c];
            ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${(1 - dist / linkDistance) * palette.line})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (md < 200) {
          const [mr, mg, mb] = palette.colors[0];
          ctx.strokeStyle = `rgba(${mr}, ${mg}, ${mb}, ${(1 - md / 200) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const [r, g, b] = palette.colors[n.c];
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.14)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.9)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw(true);
      frame = window.requestAnimationFrame(loop);
    };

    const sync = () => {
      const shouldRun = !reduce && inView && pageVisible;
      if (shouldRun && !frame) frame = window.requestAnimationFrame(loop);
      if (!shouldRun && frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    setup();
    draw(false);

    const resizeObserver = new ResizeObserver(() => {
      setup();
      draw(false);
    });
    resizeObserver.observe(canvas);

    const themeObserver = new MutationObserver(() => {
      palette = readPalette();
      draw(false);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const intersection = new IntersectionObserver(([entry]) => {
      inView = Boolean(entry && entry.isIntersecting);
      sync();
    });
    intersection.observe(canvas);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      sync();
    };
    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const onPointerLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    document.addEventListener("visibilitychange", onVisibility);
    if (!reduce) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.addEventListener("pointerleave", onPointerLeave);
    }
    sync();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
