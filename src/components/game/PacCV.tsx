"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  GraduationCap,
  Moon,
  RotateCcw,
  Star,
  Sun,
} from "lucide-react";
import { milestones, qualities, experiences } from "@/lib/cvMilestones";

/* ------------------------------------------------------------------
   PAC-CV — mini-jeu arcade : guide la sphère dans le labyrinthe,
   collecte les pastilles et les 3 diplômes (pop-ups), évite les
   fantômes. Canvas 2D ; boucle en setInterval (robuste sans rAF) ;
   dual theme via variables CSS scopées (voir globals.css).
   ------------------------------------------------------------------ */

// Labyrinthe 19×15 : # mur · . pastille · D diplôme (couleur primaire) ·
// Q qualité (jaune) · E expérience pro (rouge) · G fantôme · P joueur
const MAZE = [
  "###################",
  "#Q.......#.......Q#",
  "#.##.###.#.###.##.#",
  "#........Q........#",
  "#.##.#.#####.#.##.#",
  "#....#...#...#....#",
  "####.### # ###.####",
  "#D  .#  GGG  #.  D#",
  "####.# ##### #.####",
  "#....#...E...#....#",
  "#.##.#.#####.#.##.#",
  "#E.#.....P.....#.E#",
  "##.#.###.#.###.#.##",
  "#........D........#",
  "###################",
];
const COLS = MAZE[0].length;
const ROWS = MAZE.length;
const CELL = 26;
const TICK_MS = 1000 / 50;
const PLAYER_SPEED = 4.4; // cellules/s
const GHOST_SPEED = 3.5;

// Cases spéciales → contenu du CV. Diplômes (ordre narratif : bas = Bac,
// gauche = Licence, droite = Master), qualités et expériences en ordre de
// lecture du labyrinthe.
type ItemKind = "diploma" | "quality" | "experience";
const ITEM_MAP: Record<string, { kind: ItemKind; idx: number }> = {
  "9,13": { kind: "diploma", idx: 0 },
  "1,7": { kind: "diploma", idx: 1 },
  "17,7": { kind: "diploma", idx: 2 },
  "1,1": { kind: "quality", idx: 0 },
  "17,1": { kind: "quality", idx: 1 },
  "9,3": { kind: "quality", idx: 2 },
  "9,9": { kind: "experience", idx: 0 },
  "1,11": { kind: "experience", idx: 1 },
  "17,11": { kind: "experience", idx: 2 },
};

// Contenu affiché dans le pop-up de collecte.
type PopupData = {
  kind: ItemKind;
  cat: string;
  title: string;
  sub: string;
  detail: string;
  place?: string;
};

function popupFor(kind: ItemKind, idx: number): PopupData {
  if (kind === "diploma") {
    const m = milestones[idx];
    return { kind, cat: "Diplôme", title: m.title, sub: m.years, detail: m.detail, place: m.place };
  }
  if (kind === "quality") {
    const q = qualities[idx];
    return { kind, cat: "Qualité", title: q.title, sub: "Ce qui me définit", detail: q.detail };
  }
  const e = experiences[idx];
  return { kind, cat: "Expérience pro", title: e.title, sub: e.years, detail: e.detail, place: e.place };
}

// Couleur CSS var par famille (diplômes = couleur primaire initiale).
const KIND_VAR: Record<ItemKind, string> = {
  diploma: "--wall-glow-primary",
  quality: "--pac-quality",
  experience: "--pac-exp",
};

type Vec = [number, number];
type Entity = { x: number; y: number; dir: Vec | null; queued: Vec | null; speed: number };
type Phase = "ready" | "playing" | "popup" | "gameover" | "win";

const DIRS: Vec[] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
const walkable = (c: number, r: number) =>
  r >= 0 && r < ROWS && c >= 0 && c < COLS && MAZE[r][c] !== "#";

type Colors = {
  mazeBg: string; wallP: string; wallS: string; avatar: string;
  pellet: string; ghosts: string[]; glow: number;
  quality: string; exp: string;
};

function readColors(el: HTMLElement): Colors {
  const s = getComputedStyle(el);
  const v = (name: string, fb: string) => (s.getPropertyValue(name) || fb).trim() || fb;
  return {
    mazeBg: v("--pac-maze-bg", "#121216"),
    wallP: v("--wall-glow-primary", "#00d4ff"),
    wallS: v("--wall-glow-secondary", "#7b2ff7"),
    avatar: v("--pac-avatar", "#f4f4f2"),
    pellet: v("--pac-pellet", "#9fd8ff"),
    ghosts: [v("--ghost-1", "#ff3b5c"), v("--ghost-2", "#ff6ec7"), v("--ghost-3", "#ffa040")],
    glow: Number(v("--pac-glow-strength", "12")) || 12,
    quality: v("--pac-quality", "#ffd23f"),
    exp: v("--pac-exp", "#ff4d5e"),
  };
}

const kindColor = (colors: Colors, kind: ItemKind) =>
  kind === "diploma" ? colors.wallP : kind === "quality" ? colors.quality : colors.exp;

export function PacCV({ pixelFont }: { pixelFont: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mazeLayerRef = useRef<HTMLCanvasElement | null>(null);
  const colorsRef = useRef<Colors | null>(null);

  // État du jeu dans des refs (la boucle ne re-rend pas React à chaque tick)
  const playerRef = useRef<Entity>({ x: 9, y: 11, dir: null, queued: null, speed: PLAYER_SPEED });
  const ghostsRef = useRef<Entity[]>([]);
  const pelletsRef = useRef<Set<string>>(new Set());
  const itemsRef = useRef<Map<string, { kind: ItemKind; idx: number }>>(new Map());
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const phaseRef = useRef<Phase>("ready");
  const tickRef = useRef(0);
  const invincibleRef = useRef(0);

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [phase, setPhaseState] = useState<Phase>("ready");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [popup, setPopup] = useState<PopupData | null>(null);
  const [collected, setCollected] = useState({ diploma: 0, quality: 0, experience: 0 });

  const setPhase = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhaseState(p);
  }, []);

  // --- Init / reset -------------------------------------------------
  const resetPositions = useCallback(() => {
    playerRef.current = { x: 9, y: 11, dir: null, queued: null, speed: PLAYER_SPEED };
    const ghosts: Entity[] = [];
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (MAZE[r][c] === "G")
          ghosts.push({ x: c, y: r, dir: [ghosts.length % 2 ? 1 : -1, 0], queued: null, speed: GHOST_SPEED });
    ghostsRef.current = ghosts;
    trailRef.current = [];
    invincibleRef.current = 60;
  }, []);

  const resetGame = useCallback(() => {
    const pellets = new Set<string>();
    const items = new Map<string, { kind: ItemKind; idx: number }>();
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++) {
        const ch = MAZE[r][c];
        if (ch === ".") pellets.add(`${c},${r}`);
        if (ch === "D" || ch === "Q" || ch === "E") {
          const entry = ITEM_MAP[`${c},${r}`];
          if (entry) items.set(`${c},${r}`, entry);
        }
      }
    pelletsRef.current = pellets;
    itemsRef.current = items;
    resetPositions();
    setScore(0);
    setLives(3);
    setCollected({ diploma: 0, quality: 0, experience: 0 });
    setPopup(null);
    setPhase("ready");
  }, [resetPositions, setPhase]);

  // --- Thème : localStorage → thème du site (.dark) → prefers-color-scheme
  useEffect(() => {
    let initial: "dark" | "light" = "dark";
    try {
      const stored = localStorage.getItem("pac-cv-theme");
      if (stored === "dark" || stored === "light") initial = stored;
      else if (document.documentElement.classList.contains("dark")) initial = "dark";
      else if (window.matchMedia("(prefers-color-scheme: dark)").matches) initial = "dark";
      else initial = "light";
    } catch {}
    setTheme(initial);
  }, []);

  // Visibilité du widget calculée à la volée (synchrone, fiable partout) :
  // le clavier n'est capté que si au moins ~30% du jeu est à l'écran,
  // sinon il volerait les flèches du reste de la page d'accueil.
  const isOnScreen = useCallback(() => {
    const el = containerRef.current;
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight || 0;
    const overlap = Math.min(r.bottom, vh) - Math.max(r.top, 0);
    return overlap > Math.min(r.height, vh) * 0.3;
  }, []);

  useEffect(() => {
    try { localStorage.setItem("pac-cv-theme", theme); } catch {}
    const el = containerRef.current;
    if (!el) return;
    colorsRef.current = readColors(el);
    mazeLayerRef.current = null; // re-render du labyrinthe au prochain tick
  }, [theme]);

  // --- Entrées -------------------------------------------------------
  const steer = useCallback((d: Vec) => {
    playerRef.current.queued = d;
    if (phaseRef.current === "ready") setPhase("playing");
  }, [setPhase]);

  useEffect(() => {
    const KEYS: Record<string, Vec> = {
      ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
      z: [0, -1], s: [0, 1], q: [-1, 0], d: [1, 0],
      w: [0, -1], a: [-1, 0],
    };
    const onKey = (e: KeyboardEvent) => {
      const d = KEYS[e.key];
      if (!d || !isOnScreen()) return;
      if (phaseRef.current === "ready" || phaseRef.current === "playing") {
        e.preventDefault();
        steer(d);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [steer, isOnScreen]);

  // Swipe tactile
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const s = touchStart.current;
    if (!s) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - s.x, dy = t.clientY - s.y;
    if (Math.abs(dx) < 24 && Math.abs(dy) < 24) {
      if (phaseRef.current === "ready") setPhase("playing");
      return;
    }
    steer(Math.abs(dx) > Math.abs(dy) ? [Math.sign(dx) as 1 | -1, 0] : [0, Math.sign(dy) as 1 | -1]);
    touchStart.current = null;
  };

  // --- Boucle de jeu ---------------------------------------------------
  useEffect(() => {
    resetGame();
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = COLS * CELL * dpr;
    canvas.height = ROWS * CELL * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const decide = (e: Entity, isGhost: boolean) => {
      const rx = Math.round(e.x), ry = Math.round(e.y);
      if (e.queued && walkable(rx + e.queued[0], ry + e.queued[1])) {
        e.dir = e.queued;
        e.queued = null;
      }
      if (isGhost) {
        const p = playerRef.current;
        const opts = DIRS.filter(([dx, dy]) => {
          if (!walkable(rx + dx, ry + dy)) return false;
          if (e.dir && dx === -e.dir[0] && dy === -e.dir[1]) return false; // pas de demi-tour
          return true;
        });
        if (opts.length === 0) {
          e.dir = e.dir ? [-e.dir[0], -e.dir[1]] as Vec : null;
        } else if (Math.random() < 0.7) {
          opts.sort((a, b) =>
            (Math.abs(rx + a[0] - p.x) + Math.abs(ry + a[1] - p.y)) -
            (Math.abs(rx + b[0] - p.x) + Math.abs(ry + b[1] - p.y)));
          e.dir = opts[0];
        } else {
          e.dir = opts[Math.floor(Math.random() * opts.length)];
        }
      }
      if (e.dir && !walkable(rx + e.dir[0], ry + e.dir[1])) e.dir = null;
    };

    const stepEntity = (e: Entity, dt: number, isGhost: boolean) => {
      const rx = Math.round(e.x), ry = Math.round(e.y);
      const offX = e.x - rx, offY = e.y - ry;
      const atCenter = Math.abs(offX) < 1e-3 && Math.abs(offY) < 1e-3;

      if (atCenter) { e.x = rx; e.y = ry; decide(e, isGhost); }
      else if (e.queued && e.dir && e.queued[0] === -e.dir[0] && e.queued[1] === -e.dir[1]) {
        e.dir = e.queued; e.queued = null; // demi-tour immédiat (joueur)
      }
      if (!e.dir) return;

      const step = e.speed * dt;
      const nx = e.x + e.dir[0] * step, ny = e.y + e.dir[1] * step;
      const before = (e.x - rx) * e.dir[0] + (e.y - ry) * e.dir[1];
      const after = (nx - rx) * e.dir[0] + (ny - ry) * e.dir[1];

      if (before < 0 && after >= 0) { e.x = rx; e.y = ry; decide(e, isGhost); return; }
      if (after > 0 && !walkable(rx + e.dir[0], ry + e.dir[1])) { e.x = rx; e.y = ry; decide(e, isGhost); return; }
      e.x = nx; e.y = ny;
    };

    const renderMazeLayer = (colors: Colors) => {
      const layer = document.createElement("canvas");
      layer.width = COLS * CELL * dpr;
      layer.height = ROWS * CELL * dpr;
      const lc = layer.getContext("2d");
      if (!lc) return layer;
      lc.scale(dpr, dpr);
      lc.fillStyle = colors.mazeBg;
      lc.fillRect(0, 0, COLS * CELL, ROWS * CELL);
      for (let r = 0; r < ROWS; r++)
        for (let c = 0; c < COLS; c++) {
          if (MAZE[r][c] !== "#") continue;
          const onBorder = r === 0 || c === 0 || r === ROWS - 1 || c === COLS - 1;
          lc.save();
          lc.shadowColor = onBorder ? colors.wallP : colors.wallS;
          lc.shadowBlur = colors.glow;
          lc.strokeStyle = onBorder ? colors.wallP : colors.wallS;
          lc.lineWidth = 2;
          lc.beginPath();
          const pad = 5;
          lc.roundRect(c * CELL + pad, r * CELL + pad, CELL - pad * 2, CELL - pad * 2, 5);
          lc.stroke();
          lc.restore();
        }
      return layer;
    };

    const drawGhost = (x: number, y: number, color: string) => {
      const px = (x + 0.5) * CELL, py = (y + 0.5) * CELL, rr = CELL * 0.36;
      ctx.save();
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(px, py - rr * 0.15, rr, Math.PI, 0);
      const base = py + rr * 0.75;
      ctx.lineTo(px + rr, base);
      for (let i = 0; i < 3; i++) {
        const w = (rr * 2) / 3;
        ctx.quadraticCurveTo(px + rr - w * (i + 0.5), base - rr * 0.42, px + rr - w * (i + 1), base);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
      // yeux
      ctx.fillStyle = "#fdfdfa";
      ctx.beginPath(); ctx.arc(px - rr * 0.34, py - rr * 0.2, rr * 0.24, 0, Math.PI * 2);
      ctx.arc(px + rr * 0.34, py - rr * 0.2, rr * 0.24, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#26262c";
      ctx.beginPath(); ctx.arc(px - rr * 0.28, py - rr * 0.2, rr * 0.11, 0, Math.PI * 2);
      ctx.arc(px + rr * 0.4, py - rr * 0.2, rr * 0.11, 0, Math.PI * 2); ctx.fill();
    };

    const draw = () => {
      const colors = colorsRef.current ?? readColors(container);
      colorsRef.current = colors;
      if (!mazeLayerRef.current) mazeLayerRef.current = renderMazeLayer(colors);

      ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL);
      ctx.drawImage(mazeLayerRef.current, 0, 0, COLS * CELL, ROWS * CELL);

      // pastilles
      ctx.fillStyle = colors.pellet;
      pelletsRef.current.forEach((key) => {
        const [c, r] = key.split(",").map(Number);
        ctx.beginPath();
        ctx.arc((c + 0.5) * CELL, (r + 0.5) * CELL, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // collectibles CV (losanges pulsants, couleur par famille)
      const pulse = 1 + 0.14 * Math.sin(tickRef.current / 9);
      itemsRef.current.forEach(({ kind }, key) => {
        const [c, r] = key.split(",").map(Number);
        const px = (c + 0.5) * CELL, py = (r + 0.5) * CELL, s = CELL * 0.26 * pulse;
        const col = kindColor(colors, kind);
        ctx.save();
        ctx.shadowColor = col;
        ctx.shadowBlur = 10;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.moveTo(px, py - s); ctx.lineTo(px + s, py); ctx.lineTo(px, py + s); ctx.lineTo(px - s, py);
        ctx.closePath(); ctx.fill();
        ctx.restore();
      });

      // sillage du joueur
      const trail = trailRef.current;
      for (let i = 0; i < trail.length; i++) {
        const t = trail[i];
        const a = (i + 1) / (trail.length + 1);
        ctx.fillStyle = colors.wallP;
        ctx.globalAlpha = a * 0.25;
        ctx.beginPath();
        ctx.arc((t.x + 0.5) * CELL, (t.y + 0.5) * CELL, CELL * 0.3 * a, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // joueur (sphère)
      const p = playerRef.current;
      const blink = invincibleRef.current > 0 && Math.floor(tickRef.current / 6) % 2 === 0;
      if (!blink) {
        const px = (p.x + 0.5) * CELL, py = (p.y + 0.5) * CELL, rr = CELL * 0.34;
        ctx.save();
        ctx.shadowColor = colors.wallP;
        ctx.shadowBlur = 12;
        const grad = ctx.createRadialGradient(px - rr * 0.35, py - rr * 0.35, rr * 0.15, px, py, rr);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(1, colors.avatar);
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(px, py, rr, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
      }

      // fantômes
      ghostsRef.current.forEach((g, i) => drawGhost(g.x, g.y, colors.ghosts[i % colors.ghosts.length]));
    };

    const tick = () => {
      tickRef.current++;
      if (phaseRef.current === "playing") {
        const dt = TICK_MS / 1000;
        const p = playerRef.current;
        stepEntity(p, dt, false);
        ghostsRef.current.forEach((g) => stepEntity(g, dt, true));

        if (tickRef.current % 3 === 0) {
          trailRef.current.push({ x: p.x, y: p.y });
          if (trailRef.current.length > 8) trailRef.current.shift();
        }
        if (invincibleRef.current > 0) invincibleRef.current--;

        // collecte
        const key = `${Math.round(p.x)},${Math.round(p.y)}`;
        if (pelletsRef.current.delete(key)) setScore((s) => s + 10);
        const item = itemsRef.current.get(key);
        if (item) {
          itemsRef.current.delete(key);
          setScore((s) => s + 100);
          setCollected((c) => ({ ...c, [item.kind]: c[item.kind] + 1 }));
          setPopup(popupFor(item.kind, item.idx));
          setPhase("popup");
        }
        // victoire
        if (pelletsRef.current.size === 0 && itemsRef.current.size === 0 && phaseRef.current === "playing") {
          setPhase("win");
        }
        // fantômes
        if (invincibleRef.current <= 0) {
          for (const g of ghostsRef.current) {
            if (Math.abs(g.x - p.x) < 0.55 && Math.abs(g.y - p.y) < 0.55) {
              setLives((l) => {
                const left = l - 1;
                if (left <= 0) setPhase("gameover");
                else { resetPositions(); setPhase("ready"); }
                return left;
              });
              break;
            }
          }
        }
      }
      draw();
    };

    const interval = window.setInterval(tick, TICK_MS);
    return () => window.clearInterval(interval);
  }, [resetGame, resetPositions, setPhase]);

  // Pause si l'onglet passe en arrière-plan
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && phaseRef.current === "playing") setPhase("ready");
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [setPhase]);

  const closePopup = () => {
    setPopup(null);
    if (pelletsRef.current.size === 0 && itemsRef.current.size === 0) setPhase("win");
    else setPhase("playing");
  };

  const themeToggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div
      id="pac-cv-widget-container"
      ref={containerRef}
      data-theme={theme}
      className="overflow-hidden rounded-[var(--radius-xl2)] border shadow-lift"
      style={{ borderColor: "var(--glass-border)" }}
    >
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6" style={{ borderBottom: "1px solid var(--glass-border)" }}>
        <p className={`${pixelFont} text-[11px] sm:text-sm`} style={{ color: "var(--wall-glow-primary)" }}>
          PAC-CV
        </p>
        <div className={`${pixelFont} flex items-center gap-4 text-[9px] sm:text-[11px]`}>
          <span>SCORE {score}</span>
          <span aria-label={`${lives} vies`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} style={{ opacity: i < lives ? 1 : 0.18 }}>● </span>
            ))}
          </span>
          <span aria-label={`${collected.diploma} diplômes sur 3`} style={{ color: "var(--wall-glow-primary)" }}>
            ◆{collected.diploma}/3
          </span>
          <span aria-label={`${collected.quality} qualités sur 3`} style={{ color: "var(--pac-quality)" }}>
            ◆{collected.quality}/3
          </span>
          <span aria-label={`${collected.experience} expériences sur 3`} style={{ color: "var(--pac-exp)" }}>
            ◆{collected.experience}/3
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={themeToggle}
            aria-label={theme === "dark" ? "Passer en mode clair" : "Passer en mode sombre"}
            className="pac-glass flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-75"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={resetGame}
            aria-label="Recommencer la partie"
            className="pac-glass flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-75"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Plateau */}
      <div className="relative">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="Labyrinthe Pac-CV : déplacez la sphère pour collecter les diplômes, qualités et expériences du parcours de Meddy"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => phaseRef.current === "ready" && setPhase("playing")}
          className="block w-full select-none"
          style={{ touchAction: "none", aspectRatio: `${COLS}/${ROWS}` }}
        />

        {/* Voile "prêt" */}
        {phase === "ready" && (
          <button
            onClick={() => setPhase("playing")}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
            style={{ background: "var(--pac-dim)" }}
          >
            <span className={`${pixelFont} text-xs sm:text-sm`} style={{ color: "var(--wall-glow-primary)" }}>
              {lives < 3 ? "ENCORE " + lives + " VIE" + (lives > 1 ? "S" : "") : "PRÊT ?"}
            </span>
            <span className="max-w-xs px-6 text-xs sm:text-sm" style={{ color: "var(--pac-text)" }}>
              Flèches / ZQSD ou glisse le doigt — collecte mes{" "}
              <span style={{ color: "var(--wall-glow-primary)" }}>◆ diplômes</span>,{" "}
              <span style={{ color: "var(--pac-quality)" }}>◆ qualités</span> et{" "}
              <span style={{ color: "var(--pac-exp)" }}>◆ expériences</span>, et évite les fantômes.
            </span>
            <span className={`${pixelFont} pac-glass rounded-full px-4 py-2 text-[9px] sm:text-[10px]`}>
              APPUIE POUR JOUER
            </span>
          </button>
        )}

        {/* Pop-up de collecte (diplôme / qualité / expérience) */}
        {phase === "popup" && popup && (
          <div className="absolute inset-0 flex items-center justify-center p-4" style={{ background: "var(--pac-dim)" }}>
            <div className="pac-glass w-full max-w-sm rounded-2xl p-6 text-center">
              <span
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
              >
                {popup.kind === "diploma" && (
                  <GraduationCap className="h-6 w-6" style={{ color: `var(${KIND_VAR.diploma})` }} />
                )}
                {popup.kind === "quality" && (
                  <Star className="h-6 w-6" style={{ color: `var(${KIND_VAR.quality})` }} />
                )}
                {popup.kind === "experience" && (
                  <Briefcase className="h-6 w-6" style={{ color: `var(${KIND_VAR.experience})` }} />
                )}
              </span>
              <p className={`${pixelFont} text-[9px] uppercase`} style={{ color: `var(${KIND_VAR[popup.kind]})` }}>
                {popup.cat} {collected[popup.kind]}/3 · {popup.sub}
              </p>
              <h3 className="mt-2 text-base font-bold leading-snug">{popup.title}</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--pac-muted)" }}>{popup.detail}</p>
              {popup.place && (
                <p className="mt-1 text-xs" style={{ color: "var(--pac-muted)" }}>{popup.place}</p>
              )}
              <button
                onClick={closePopup}
                className={`${pixelFont} mt-5 rounded-full px-5 py-2.5 text-[9px] transition-opacity hover:opacity-85`}
                style={{ background: `var(${KIND_VAR[popup.kind]})`, color: "var(--pac-bg)" }}
              >
                CONTINUER
              </button>
            </div>
          </div>
        )}

        {/* Fin de partie */}
        {(phase === "win" || phase === "gameover") && (
          <div className="absolute inset-0 flex items-center justify-center p-4" style={{ background: "var(--pac-dim)" }}>
            <div className="pac-glass w-full max-w-sm rounded-2xl p-6 text-center">
              <p className={`${pixelFont} text-xs sm:text-sm`} style={{ color: "var(--wall-glow-primary)" }}>
                {phase === "win" ? "PARCOURS COMPLÉTÉ !" : "GAME OVER"}
              </p>
              <p className={`${pixelFont} mt-3 text-[10px]`}>SCORE FINAL : {score}</p>
              <p className="mt-3 text-sm" style={{ color: "var(--pac-muted)" }}>
                {phase === "win"
                  ? "Diplômes, qualités et expériences : vous connaissez mon CV par cœur. On en parle ?"
                  : "Les fantômes ont gagné cette fois… mais mon parcours reste consultable !"}
              </p>
              <div className="mt-5 flex flex-col items-center gap-2">
                <a
                  href="/cv-meddy-gironcelle.pdf"
                  download
                  className={`${pixelFont} inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[9px] transition-opacity hover:opacity-85`}
                  style={{ background: "var(--wall-glow-primary)", color: "var(--pac-bg)" }}
                >
                  <Download className="h-3.5 w-3.5" /> LE CV COMPLET
                </a>
                <button
                  onClick={resetGame}
                  className={`${pixelFont} pac-glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[9px] transition-opacity hover:opacity-85`}
                >
                  <RotateCcw className="h-3.5 w-3.5" /> REJOUER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* D-pad tactile */}
      <div className="hidden justify-center gap-2 px-4 py-4 [@media(pointer:coarse)]:flex">
        <div className="grid grid-cols-3 gap-1.5">
          <span />
          <PadBtn onPress={() => steer([0, -1])} label="Haut"><ChevronUp className="h-5 w-5" /></PadBtn>
          <span />
          <PadBtn onPress={() => steer([-1, 0])} label="Gauche"><ChevronLeft className="h-5 w-5" /></PadBtn>
          <PadBtn onPress={() => steer([0, 1])} label="Bas"><ChevronDown className="h-5 w-5" /></PadBtn>
          <PadBtn onPress={() => steer([1, 0])} label="Droite"><ChevronRight className="h-5 w-5" /></PadBtn>
        </div>
      </div>
    </div>
  );
}

function PadBtn({ children, onPress, label }: { children: React.ReactNode; onPress: () => void; label: string }) {
  return (
    <button
      aria-label={label}
      onPointerDown={(e) => { e.preventDefault(); onPress(); }}
      className="pac-glass flex h-12 w-12 items-center justify-center rounded-xl active:scale-95"
      style={{ touchAction: "none" }}
    >
      {children}
    </button>
  );
}
