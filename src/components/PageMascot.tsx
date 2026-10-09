import { useEffect, useRef, useState } from "react";
import type { HeaderSurface } from "./HeaderStretch";
import MascotArtwork from "./MascotArtwork";
import { languageChangeEvent, useLanguage } from "../i18n/LanguageProvider";
import { creativeReactionEvent } from "./creative-events";
import type { CreativeReaction } from "./creative-events";
import { actorRequestEvent } from "./personal-secrets";
import type { ActorRequest } from "./personal-secrets";

type Point = { x: number; y: number; size: number };
type Phase =
  | "docked"
  | "departing"
  | "observing"
  | "climbing"
  | "pulling"
  | "landing"
  | "returning"
  | "held"
  | "released"
  | "walking"
  | "settling"
  | "charging"
  | "scheming"
  | "pranking"
  | "cooling"
  | "bracing"
  | "pushing"
  | "yielding"
  | "waiting"
  | "reappearing"
  | "performing";
type Reaction =
  | "discovery"
  | "typing"
  | "coffee"
  | "language"
  | "wave"
  | "curious"
  | "inspect"
  | "night"
  | "dazzled"
  | "proud"
  | "stretch"
  | "startled"
  | "grumpy";
const INTERACTIVE: Phase[] = [
  "docked",
  "observing",
  "walking",
  "settling",
  "charging",
  "scheming",
  "pranking",
  "cooling",
];
const MISCHIEF: Phase[] = ["charging", "scheming", "pranking", "cooling"];
const BASE = 112;
const PULL_EASE = "cubic-bezier(0.4, 0.05, 0.22, 1.12)";
const transform = ({ x, y, size }: Point) =>
  `translate3d(${x}px, ${y}px, 0) scale(${size / BASE})`;

export default function PageMascot({
  motion,
  onAwayChange,
  onHeaderChange,
}: {
  motion: boolean;
  onAwayChange: (away: boolean) => void;
  onHeaderChange: (surface: HeaderSurface) => void;
}) {
  const { t } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("docked");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const element = root.current;
    let anchor = document.querySelector<HTMLElement>(".art-dot");
    const header = document.querySelector<HTMLElement>(".site-header");
    const inner = document.querySelector<HTMLElement>(".site-header-inner");
    const about = document.getElementById("sobre");
    const shell = document.querySelector<HTMLElement>(".section-shell");
    if (!element || !anchor || !header || !inner || !about || !shell) return;
    const menu = header.querySelector<HTMLElement>(".menu-toggle")!;
    const brand = header.querySelector<HTMLElement>(".brand")!;
    const nav = header.querySelector<HTMLElement>("nav")!;
    const portfolio = element.closest<HTMLElement>(".portfolio")!;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const headerPerch = (width: number) =>
      width <= 1100 || (coarsePointer && width <= 1500);
    const svgStyle = (selector: string) =>
      element.querySelector<SVGElement>(selector)!.style;
    const headStyle = svgStyle(".mascot-head");
    const gazeStyle = svgStyle(".mascot-gaze");
    const bodyStyle = svgStyle(".mascot-body");
    const leftLegStyle = svgStyle(".leg-left");
    const rightLegStyle = svgStyle(".leg-right");
    // Put frame-by-frame variables on the rig that consumes them, instead
    // of making every prop, gradient and limb inherit each new value.
    const rootStyle = [element.style];
    const variableTargets: Record<string, CSSStyleDeclaration[]> = {
      "--gaze-x": [gazeStyle],
      "--gaze-y": [gazeStyle],
      "--head-angle": [headStyle],
      "--step-left": [leftLegStyle],
      "--lift-left": [leftLegStyle],
      "--step-right": [rightLegStyle],
      "--lift-right": [rightLegStyle],
      "--arm-left": [svgStyle(".arm-left")],
      "--arm-right": [svgStyle(".arm-right")],
      "--walk-bob": [bodyStyle, svgStyle(".mascot-shadow")],
      "--walk-sway": [bodyStyle],
      "--walk-direction": [headStyle],
    };
    function setVariable(name: string, value: string) {
      for (const style of variableTargets[name] ?? rootStyle)
        if (style.getPropertyValue(name) !== value)
          style.setProperty(name, value);
    }
    let layout: {
      width: number;
      h: DOMRect;
      container: DOMRect;
      content: DOMRect;
      brand: DOMRect | null;
      right: DOMRect | null;
    } | null = null;
    function fixedLayout() {
      if (layout) return layout;
      const width = document.documentElement.clientWidth;
      layout = {
        width,
        h: header!.getBoundingClientRect(),
        container: inner!.getBoundingClientRect(),
        content: shell!.getBoundingClientRect(),
        brand: headerPerch(width) ? brand.getBoundingClientRect() : null,
        right:
          headerPerch(width)
            ? (width <= 650 ? menu : nav).getBoundingClientRect()
            : null,
      };
      return layout;
    }

    let current: Phase = "docked";
    let position: Point = { x: 0, y: 0, size: BASE };
    let animation: Animation | null = null;
    let measureFrame = 0;
    let gazeFrame = 0;
    let attentionTarget: HTMLElement | null = null;
    let attentionRect: DOMRect | null = null;
    let prankTarget: HTMLElement | null = null;
    let prankSpot: Point | null = null;
    let prankAttached = false;
    let prankFrame = 0;
    let prankJourney: {
      from: Point;
      start: number;
      duration: number;
      done: () => void;
    } | null = null;
    let reactionFrame = 0;
    let reactionTimer: ReturnType<typeof setTimeout> | undefined;
    let languageTimer: ReturnType<typeof setTimeout> | undefined;
    let languageFrame = 0;
    let pendingLanguage = false;
    let creativeTimer: ReturnType<typeof setTimeout> | undefined;
    let creativeFrame = 0;
    let lastCreative = -Infinity;
    let idleTimer: ReturnType<typeof setTimeout> | undefined;
    let holdTimer: ReturnType<typeof setTimeout> | undefined;
    let furyTimer: ReturnType<typeof setTimeout> | undefined;
    let planetTimer: ReturnType<typeof setTimeout> | undefined;
    let headerTimer: ReturnType<typeof setTimeout> | undefined;
    let walkFrame = 0;
    let returnFrame = 0;
    let walkingDone: (() => void) | null = null;
    let menuActive = false;
    let measuredMenuOpen: boolean | undefined;
    let anger = 0;
    let planet = false;
    let needsStretch = false;
    let headerAction: "idle" | "pull" | "push" = "idle";
    let prankControl: HTMLButtonElement | null = null;
    let prankAttribute = "";
    let prankExpected = "";
    let performingPrank = false;
    let prankTurn = 0;
    const jobs = new Set<ReturnType<typeof setTimeout>>();
    const teased = new Set<HTMLElement>();
    let holdFrame = 0;
    let holding: {
      id: number | null;
      start: number;
      x: number;
      y: number;
      dx: number;
      dy: number;
      moved: boolean;
      lastX: number;
      lastY: number;
      lastTime: number;
    } | null = null;
    let pendingDrag: { x: number; y: number } | null = null;
    let lastScroll = window.scrollY;
    let lastScrollAt = performance.now();
    let lastStartle = 0;
    let idleTurn = 0;
    let lastPreview: Element | null = null;
    let expanded = false;
    let covered = false;
    let zone = false;
    let home = true;
    let initialized = false;
    let measuredWidth = 0;
    let handledPink = false;
    let closed = false;
    let actorOwner: ActorRequest | null = null;
    let suspended = false;
    let sentSurface: HeaderSurface | null = null;
    let pointer: { x: number; y: number } | null = null;
    let observerSpot = position;
    let homeSpot = position;
    let gripSpot = position;
    let edgeSpot = position;
    element.dataset.reaction = "";
    element.dataset.temper = "";
    element.dataset.planet = "off";
    element.dataset.action = "";
    portfolio.dataset.pageHidden = String(document.hidden);

    function change(next: Phase) {
      if (current === next && element!.dataset.phase === next) return;
      current = next;
      element!.dataset.phase = next;
      setPhase(next);
    }
    function surface() {
      if (
        sentSurface?.expanded === expanded &&
        sentSurface.covered === covered &&
        sentSurface.action === headerAction
      )
        return;
      sentSurface = { expanded, covered, action: headerAction };
      onHeaderChange(sentSurface);
    }
    function place(next: Point) {
      position = next;
      element!.style.transform = transform(next);
    }
    function cardColor() {
      return getComputedStyle(anchor!.querySelector(".mascot-skin")!).fill;
    }
    function stopFlight() {
      cancelAnimationFrame(walkFrame);
      cancelAnimationFrame(returnFrame);
      cancelAnimationFrame(prankFrame);
      prankFrame = 0;
      prankJourney = null;
      returnFrame = 0;
      walkingDone = null;
      for (const name of [
        "step-left",
        "step-right",
        "lift-left",
        "lift-right",
        "arm-left",
        "arm-right",
        "walk-bob",
        "walk-sway",
      ])
        setVariable(`--${name}`, "0");
      if (!animation) return;
      // Capture the actual location before cancelling so fast direction
      // changes and resizing cannot teleport the character.
      const rect = element!.getBoundingClientRect();
      animation.cancel();
      animation = null;
      place({ x: rect.left, y: rect.top, size: rect.width });
    }
    function fly(
      to: Point,
      duration: number,
      done: () => void,
      arc = 0,
      easing = "cubic-bezier(0.4, 0, 0.2, 1)",
    ) {
      stopFlight();
      const from = position;
      setVariable(
        "--flight-lean",
        String(Math.max(-7, Math.min(7, (to.x - from.x) / 60))),
      );
      // A sampled parabola has a continuous tangent at the top of the arc.
      // The previous three keyframes created a visible corner mid-flight.
      const frames = arc
        ? Array.from({ length: 25 }, (_, i) => {
            const t = i / 24;
            return {
              offset: t,
              transform: transform({
                x: from.x + (to.x - from.x) * t,
                y: from.y + (to.y - from.y) * t - 4 * arc * t * (1 - t),
                size: from.size + (to.size - from.size) * t,
              }),
            };
          })
        : [{ transform: transform(from) }, { transform: transform(to) }];
      animation = element!.animate(frames, {
        duration,
        easing,
        fill: "forwards",
      });
      animation.onfinish = () => {
        if (closed) return;
        place(to);
        animation?.cancel();
        animation = null;
        done();
      };
    }
    function clearReaction() {
      clearTimeout(reactionTimer);
      cancelAnimationFrame(reactionFrame);
      element!.dataset.reaction = "";
    }
    function cancelActor() {
      if (!actorOwner) return;
      const owner = actorOwner;
      actorOwner = null;
      const rect = element!.getBoundingClientRect();
      owner.cancel();
      delete element!.dataset.secretPerformance;
      element!.style.translate = "";
      place({ x: rect.left, y: rect.top, size: rect.width });
      if (current === "performing") change("observing");
    }
    function requestActor(event: Event) {
      const request = (event as CustomEvent<ActorRequest>).detail;
      if (!request || !["voyage", "ghosts", "toddy"].includes(request.kind) || !motion || suspended || menuActive || holding || actorOwner || !["docked", "observing"].includes(current)) return;
      clearTimeout(idleTimer);
      clearReaction();
      stopFlight();
      if (current === "docked") place(homeSpot);
      actorOwner = request;
      onAwayChange(true);
      change("performing");
      element!.dataset.secretPerformance = request.kind;
      setVariable("--head-angle", "0deg");
      setVariable("--gaze-x", "0px");
      setVariable("--gaze-y", "0px");
      request.claim = {
        root: element!,
        origin: { ...position },
        release(point) {
          if (closed || actorOwner !== request) return;
          actorOwner = null;
          delete element!.dataset.secretPerformance;
          element!.style.translate = "";
          setVariable("--gaze-x", "0px");
          setVariable("--gaze-y", "0px");
          place(point);
          change("observing");
          if (!suspended && !menuActive && !document.hidden) observe();
        },
      };
    }
    function idle() {
      clearTimeout(idleTimer);
      if (!motion || current !== "observing") return;
      idleTimer = setTimeout(() => {
        if (current !== "observing" || document.hidden) return;
        energy(anger - 0.9);
        const kind = idleTurn++ % 2 ? "curious" : "stretch";
        react(kind, kind === "stretch" ? 2200 : 1400);
      }, 14000);
    }
    function react(kind: Reaction, duration = 1400) {
      if (!motion || suspended || current !== "observing") return;
      if (kind === "inspect") duration = Math.max(duration, 2000);
      clearReaction();
      idle();
      reactionFrame = requestAnimationFrame(() => {
        element!.dataset.reaction = kind;
        reactionTimer = setTimeout(() => {
          element!.dataset.reaction = "";
        }, duration);
      });
    }

    function languageGreeting() {
      if (!pendingLanguage || !motion || suspended || menuActive) return;
      if (current === "observing") {
        pendingLanguage = false;
        react("language", 1200);
      } else if (current === "docked" && anchor) {
        pendingLanguage = false;
        clearTimeout(languageTimer);
        cancelAnimationFrame(languageFrame);
        const card = anchor;
        delete card.dataset.languageReaction;
        languageFrame = requestAnimationFrame(() => {
          languageFrame = 0;
          if (closed || suspended) return;
          if (current !== "docked" || menuActive) {
            pendingLanguage = true;
            return;
          }
          card.dataset.languageReaction = "true";
          languageTimer = setTimeout(
            () => delete card.dataset.languageReaction,
            1200,
          );
        });
      }
    }
    function languageChanged() {
      if (!motion || suspended) return;
      // Queue the gesture while navigation or a trajectory has priority.
      pendingLanguage = true;
      languageGreeting();
    }
    function creativeChanged(event: Event) {
      if (!motion || suspended || menuActive) return;
      const kind = (event as CustomEvent<CreativeReaction>).detail;
      if (!["typing", "discovery", "proud", "coffee"].includes(kind)) return;
      const now = performance.now();
      if (kind === "typing" && now - lastCreative < 1500) return;
      lastCreative = now;
      const duration = kind === "coffee" ? 3400 : kind === "discovery" ? 1650 : 1250;
      if (current === "observing") react(kind, duration);
      else if (current === "docked" && anchor) {
        const card = anchor;
        clearTimeout(creativeTimer);
        cancelAnimationFrame(creativeFrame);
        delete card.dataset.interactionReaction;
        creativeFrame = requestAnimationFrame(() => {
          creativeFrame = 0;
          if (closed || suspended || current !== "docked") return;
          card.dataset.interactionReaction = kind;
          creativeTimer = setTimeout(() => delete card.dataset.interactionReaction, duration);
        });
      }
    }

    function observe() {
      if (expanded && !zone && needsStretch) {
        push();
        return;
      }
      if (home) {
        returnHome();
        return;
      }
      if (zone && !handledPink && needsStretch) {
        climb();
        return;
      }
      change("observing");
      setVariable("--mascot-color", "#ef75a3");
      if (
        Math.hypot(position.x - observerSpot.x, position.y - observerSpot.y) >
          2 ||
        Math.abs(position.size - observerSpot.size) > 1
      ) {
        fly(observerSpot, 420, observe);
        return;
      }
      place(observerSpot);
      look();
      idle();
      languageGreeting();
    }
    function land() {
      change("landing");
      fly(observerSpot, 600, observe, 30);
    }
    function pull() {
      if (!zone || home) {
        land();
        return;
      }
      handledPink = true;
      change("pulling");
      expanded = true;
      headerAction = "pull";
      surface();
      setVariable("--gaze-x", "3px");
      setVariable("--gaze-y", "-2px");
      fly(
        edgeSpot,
        1000,
        () => {
          headerAction = "idle";
          surface();
          land();
        },
        0,
        PULL_EASE,
      );
    }
    function climb() {
      clearTimeout(idleTimer);
      clearReaction();
      element!.dataset.action = "";
      change("climbing");
      element!.dataset.reaction = "";
      fly(
        gripSpot,
        580,
        () => {
          change("bracing");
          headerTimer = setTimeout(pull, 220);
        },
        42,
      );
    }
    function push() {
      if (!needsStretch) {
        expanded = zone;
        headerAction = "idle";
        surface();
        observe();
        return;
      }
      clearTimeout(headerTimer);
      clearTimeout(idleTimer);
      clearReaction();
      element!.dataset.action = "push";
      change("climbing");
      fly(
        edgeSpot,
        520,
        () => {
          change("bracing");
          element!.dataset.action = "push";
          headerTimer = setTimeout(() => {
            change("pushing");
            expanded = false;
            headerAction = "push";
            surface();
            fly(
              gripSpot,
              900,
              () => {
                headerAction = "idle";
                element!.dataset.action = "";
                surface();
                if (home) returnHome();
                else land();
              },
              0,
              "cubic-bezier(.42,0,.28,1)",
            );
          }, 180);
        },
        28,
      );
    }
    function depart() {
      clearReaction();
      stopFlight();
      place(homeSpot);
      onAwayChange(true);
      setVariable("--mascot-color", cardColor());
      change("departing");
      fly(observerSpot, 820, observe, 65);
    }
    function dock() {
      if (!motion) stopFlight();
      if (motion && !home) {
        land();
        return;
      }
      // Never swap renderers until the roaming face actually reaches the card.
      if (
        motion &&
        (Math.hypot(homeSpot.x - position.x, homeSpot.y - position.y) > 2 ||
          Math.abs(homeSpot.size - position.size) > 1)
      ) {
        fly(homeSpot, 220, dock);
        return;
      }
      clearTimeout(idleTimer);
      clearReaction();
      change("docked");
      onAwayChange(false);
      languageGreeting();
      if (element!.contains(document.activeElement))
        anchor?.focus({ preventScroll: true });
    }
    function returnHome() {
      if (expanded && !zone && needsStretch) {
        push();
        return;
      }
      clearTimeout(idleTimer);
      clearReaction();
      stopFlight();
      change("returning");
      setVariable("--mascot-color", cardColor());
      setVariable("--head-angle", "0deg");
      setVariable("--gaze-x", "0px");
      setVariable("--gaze-y", "0px");
      const from = position;
      const started = performance.now();
      // One clock for the entire return. Scrolling updates homeSpot without
      // cancelling, re-reading the animated SVG or restarting its easing.
      function step(now: number) {
        if (closed || suspended || current !== "returning") return;
        const t = Math.min(1, Math.max(0, (now - started) / 650));
        const eased = t * t * (3 - 2 * t);
        if (t === 1) {
          // Read the anchor once at handoff, after any final scroll/focus
          // change. The roaming and card renderers then share the same spot.
          updateHomeSpot(anchor!.getBoundingClientRect());
        }
        place({
          x: from.x + (homeSpot.x - from.x) * eased,
          y: from.y + (homeSpot.y - from.y) * eased - 180 * t * (1 - t),
          size: from.size + (homeSpot.size - from.size) * eased,
        });
        if (t < 1) returnFrame = requestAnimationFrame(step);
        else {
          returnFrame = 0;
          dock();
        }
      }
      returnFrame = requestAnimationFrame(step);
    }

    function updateHomeSpot(rect: DOMRect) {
      const size = (rect.width * BASE) / 74;
      homeSpot = {
        x: rect.left + rect.width / 2 - size / 2,
        y: rect.top + rect.height / 2 - (size * 52) / BASE,
        size,
      };
    }

    function later(ms: number, fn: () => void) {
      const job = setTimeout(() => {
        jobs.delete(job);
        if (!closed) fn();
      }, ms);
      jobs.add(job);
    }
    function energy(value: number) {
      anger = Math.max(0, Math.min(4, value));
      planet = anger >= 3;
      element!.dataset.planet = planet ? "on" : anger > 0 ? "warming" : "off";
      setVariable(
        "--planet-energy",
        String(Math.min(1, anger / 3)),
      );
    }
    function restorePrank(skip?: Element | null) {
      for (const node of teased)
        node.classList.remove("mascot-tapped", "mascot-teased");
      teased.clear();
      if (
        prankControl &&
        prankControl !== skip &&
        prankControl.isConnected &&
        prankControl.getAttribute(prankAttribute) === prankExpected
      ) {
        performingPrank = true;
        prankControl.click();
        performingPrank = false;
      }
      prankControl = null;
      element!.dataset.action = "";
    }
    function stopPlay(skip?: Element | null) {
      jobs.forEach(clearTimeout);
      jobs.clear();
      cancelAnimationFrame(prankFrame);
      prankFrame = 0;
      prankJourney = null;
      prankTarget = null;
      prankSpot = null;
      prankAttached = false;
      restorePrank(skip);
      followTarget(null);
    }
    function followTarget(node: HTMLElement | null) {
      attentionTarget = node;
      attentionRect = node?.getBoundingClientRect() ?? null;
      if (node && !gazeFrame) gazeFrame = requestAnimationFrame(look);
      else if (!node) {
        cancelAnimationFrame(gazeFrame);
        gazeFrame = 0;
      }
    }
    function walk(done: () => void) {
      stopFlight();
      clearReaction();
      clearTimeout(idleTimer);
      walkingDone = done;
      let previous = performance.now();
      let vx = 0,
        vy = 0,
        stride = 0;
      change("walking");
      function step(now: number) {
        if (closed || current !== "walking") return;
        const dt = Math.min(32, Math.max(1, now - previous));
        previous = now;
        // Pursue the current destination from the current position. Changing
        // scroll direction no longer interpolates against an obsolete origin.
        const dest = home && !planet ? homeSpot : observerSpot;
        const dx = dest.x - position.x,
          dy = dest.y - position.y;
        const distance = Math.hypot(dx, dy);
        const speed = Math.min(planet ? 0.43 : 0.36, distance / 180);
        const blend = 1 - Math.exp(-dt / 95);
        vx += ((dx / Math.max(1, distance)) * speed - vx) * blend;
        vy += ((dy / Math.max(1, distance)) * speed - vy) * blend;
        const travelled = Math.hypot(vx, vy) * dt;
        stride += (travelled / Math.max(0.4, position.size / BASE)) * 0.075;
        const weight = Math.min(1, Math.hypot(vx, vy) / 0.23, distance / 20);
        const cycle = Math.sin(stride);
        const vars = {
          "step-left": cycle * 19 * weight,
          "step-right": -cycle * 19 * weight,
          "lift-left": Math.max(0, cycle) * -3 * weight,
          "lift-right": Math.max(0, -cycle) * -3 * weight,
          "arm-left": -cycle * 14 * weight,
          "arm-right": cycle * 14 * weight,
          "walk-bob": -Math.abs(cycle) * 1.4 * weight,
          "walk-sway": cycle * 1.8 * weight,
        };
        for (const [name, value] of Object.entries(vars))
          setVariable(`--${name}`, String(value));
        if (Math.abs(vx) > 0.02)
          setVariable("--walk-direction", vx > 0 ? "1" : "-1");
        place({
          x: position.x + vx * dt,
          y: position.y + vy * dt,
          size:
            position.size +
            (dest.size - position.size) * (1 - Math.exp(-dt / 180)),
        });
        if (distance > 1.5 || Math.abs(dest.size - position.size) > 0.5)
          walkFrame = requestAnimationFrame(step);
        else {
          place(dest);
          const finish = walkingDone;
          walkingDone = null;
          finish?.();
        }
      }
      walkFrame = requestAnimationFrame(step);
    }
    function settle(annoyed = false, reaction: Reaction = "proud") {
      change("settling");
      element!.dataset.reaction = annoyed ? "grumpy" : reaction;
      const duration =
        annoyed || reaction === "proud"
          ? 1600
          : reaction === "inspect"
            ? 2000
            : reaction === "night"
              ? 1800
              : 900;
      later(duration, () => {
        clearReaction();
        if (home) returnHome();
        else observe();
      });
    }
    function adventureEnd() {
      stopPlay();
      change("cooling");
      element!.dataset.action = "cool";
      setVariable("--gaze-x", "0px");
      setVariable("--gaze-y", "0px");
      later(620, () => {
        energy(0);
        element!.dataset.action = "";
        walk(() => settle(false, "curious"));
      });
    }
    function targetVisible(node: HTMLElement, rect = node.getBoundingClientRect()) {
      return (
        node.isConnected &&
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > fixedLayout().h.bottom &&
        rect.top < window.innerHeight &&
        rect.right > 0 &&
        rect.left < document.documentElement.clientWidth
      );
    }
    function targetSpot(rect: DOMRect): Point {
      const size = Math.min(
        96,
        document.documentElement.clientWidth <= 650 ? 68 : 96,
      );
      return {
        size,
        x: Math.max(
          6,
          Math.min(
            document.documentElement.clientWidth - size - 6,
            rect.left + 10 - (size * 102) / BASE,
          ),
        ),
        y: Math.max(
          fixedLayout().h.bottom + 5,
          Math.min(
            window.innerHeight - (size * 126) / BASE - 8,
            rect.top + rect.height / 2 - (size * 79) / BASE,
          ),
        ),
      };
    }
    function approachTarget(duration: number, done: () => void) {
      stopFlight();
      setVariable(
        "--flight-lean",
        String(Math.max(-7, Math.min(7, ((prankSpot?.x ?? position.x) - position.x) / 60))),
      );
      prankJourney = { from: position, start: performance.now(), duration, done };
      function step(now: number) {
        prankFrame = 0;
        const journey = prankJourney;
        if (closed || suspended || !journey || !prankSpot) return;
        const t = Math.min(1, (now - journey.start) / journey.duration);
        const eased = t * t * (3 - 2 * t);
        const { from } = journey;
        place({
          x: from.x + (prankSpot.x - from.x) * eased,
          y: from.y + (prankSpot.y - from.y) * eased - 96 * eased * (1 - eased),
          size: from.size + (prankSpot.size - from.size) * eased,
        });
        look();
        if (t < 1) prankFrame = requestAnimationFrame(step);
        else {
          prankJourney = null;
          prankAttached = true;
          journey.done();
        }
      }
      prankFrame = requestAnimationFrame(step);
    }
    function prank() {
      const visible = (node: HTMLElement, whole = false) => {
        const r = node.getBoundingClientRect();
        const top = fixedLayout().h.bottom + 12;
        return (
          node.isConnected &&
          r.width > 0 &&
          (whole
            ? r.top > top && r.bottom < window.innerHeight - 25
            : Math.min(r.bottom, window.innerHeight - 35) -
                Math.max(r.top, top) >
              65)
        );
      };
      // Nearby visual controls only. Human focus and navigation have priority.
      const controls = Array.from(
        document.querySelectorAll<HTMLButtonElement>(
          ".project-art .room-light-toggle, .workbench .theme-control",
        ),
      ).filter(
        (node) =>
          visible(node, true) &&
          !node.disabled &&
          node !== document.activeElement,
      );
      const distance = (node: HTMLElement) => {
        const r = node.getBoundingClientRect();
        return Math.hypot(
          r.left + r.width / 2 - position.x,
          r.top + r.height / 2 - position.y,
        );
      };
      controls.sort((a, b) => distance(a) - distance(b));
      const control =
        controls[prankTurn++ % Math.max(1, Math.min(2, controls.length))];
      const figures = Array.from(
        document.querySelectorAll<HTMLElement>(
          ".project-visual, .idea-preview, h1, .contact-copy h2",
        ),
      ).filter((node) => visible(node));
      const figure =
        control
          ?.closest<HTMLElement>(".project-art, .workbench")
          ?.querySelector<HTMLElement>(".project-visual, .idea-preview") ??
        figures[0];
      const secondFigure = figures.find((node) => node !== figure) ?? figure;
      if (!control && !secondFigure) {
        adventureEnd();
        return;
      }

      function travel(node: HTMLElement, arrive: () => void) {
        const stillVisible = () => targetVisible(node);
        if (!stillVisible()) {
          adventureEnd();
          return;
        }
        change("scheming");
        element!.dataset.action = "scan";
        prankTarget = node;
        prankSpot = targetSpot(node.getBoundingClientRect());
        prankAttached = false;
        followTarget(node);
        later(320, () => {
          if (!stillVisible()) {
            adventureEnd();
            return;
          }
          element!.dataset.action = "approach";
          const target = targetSpot(node.getBoundingClientRect());
          prankSpot = target;
          const duration = Math.max(
            480,
            Math.min(
              920,
              420 +
                Math.hypot(target.x - position.x, target.y - position.y) * 0.48,
            ),
          );
          approachTarget(duration, () => {
            if (!stillVisible()) {
              adventureEnd();
              return;
            }
            change("pranking");
            element!.dataset.action = "aim";
            later(240, arrive);
          });
        });
      }
      function gloat(next: () => void) {
        element!.dataset.action = "gloat";
        followTarget(null);
        setVariable("--gaze-x", "-2px");
        setVariable("--gaze-y", "0px");
        later(420, next);
      }
      function teaseFigure() {
        if (!secondFigure || !targetVisible(secondFigure)) {
          adventureEnd();
          return;
        }
        travel(secondFigure, () => {
          element!.dataset.action = "windup";
          later(220, () => {
            if (!targetVisible(secondFigure)) {
              adventureEnd();
              return;
            }
            element!.dataset.action = "poke";
            later(290, () => {
              if (!targetVisible(secondFigure)) {
                adventureEnd();
                return;
              }
              secondFigure.classList.add("mascot-teased");
              teased.add(secondFigure);
              later(1050, () => {
                secondFigure.classList.remove("mascot-teased");
                teased.delete(secondFigure);
                gloat(adventureEnd);
              });
            });
          });
        });
      }
      if (!control) {
        teaseFigure();
        return;
      }
      travel(control, () => {
        element!.dataset.action = "press";
        later(290, () => {
          if (!targetVisible(control)) {
            adventureEnd();
            return;
          }
          prankControl = control;
          prankAttribute = control.hasAttribute("aria-checked")
            ? "aria-checked"
            : "aria-pressed";
          prankExpected =
            control.getAttribute(prankAttribute) === "true" ? "false" : "true";
          control.classList.add("mascot-tapped");
          teased.add(control);
          performingPrank = true;
          control.click();
          performingPrank = false;
          later(340, () => {
            element!.dataset.action = "watch";
            followTarget(figure && visible(figure) ? figure : control);
            later(760, () =>
              gloat(() => {
                if (!targetVisible(control)) {
                  adventureEnd();
                  return;
                }
                // Put it back with another deliberate touch, before moving on.
                element!.dataset.action = "undo";
                followTarget(control);
                later(290, () => {
                  restorePrank();
                  element!.dataset.action = "watch";
                  followTarget(figure && visible(figure) ? figure : control);
                  later(620, teaseFigure);
                });
              }),
            );
          });
        });
      });
    }
    function charge() {
      change("charging");
      element!.dataset.reaction = "";
      energy(Math.max(3, anger));
      later(1200, prank);
    }
    function grab(event: globalThis.PointerEvent | null) {
      if (!motion || holding || !INTERACTIVE.includes(current)) return;
      if (event && (!event.isPrimary || event.button !== 0)) return;
      event?.preventDefault();
      stopPlay();
      stopFlight();
      clearReaction();
      clearTimeout(idleTimer);
      if (current === "docked") {
        place(homeSpot);
        onAwayChange(true);
        setVariable("--mascot-color", cardColor());
      }
      const x = event?.clientX ?? position.x + position.size / 2;
      const y = event?.clientY ?? position.y + (position.size * 52) / BASE;
      holding = {
        id: event?.pointerId ?? null,
        start: performance.now(),
        x,
        y,
        dx: x - position.x,
        dy: y - position.y,
        moved: false,
        lastX: x,
        lastY: y,
        lastTime: performance.now(),
      };
      element!.dataset.temper = "surprised";
      element!.dataset.reaction = "";
      setVariable("--hang-angle", "0deg");
      setVariable("--hang-stretch", "1");
      setVariable("--gaze-x", "0px");
      setVariable("--gaze-y", "-2px");
      setVariable("--head-angle", "0deg");
      change("held");
      const button = element!.querySelector<HTMLButtonElement>("button")!;
      if (event) button.setPointerCapture(event.pointerId);
      button.focus({ preventScroll: true });
      holdTimer = setTimeout(() => {
        element!.dataset.temper = "annoyed";
        energy(anger + 0.65);
      }, 320);
      furyTimer = setTimeout(() => {
        element!.dataset.temper = "furious";
        energy(anger + 1);
      }, 1250);
      planetTimer = setTimeout(() => energy(Math.max(3, anger)), 2800);
    }
    function drag() {
      holdFrame = 0;
      if (!holding || !pendingDrag) return;
      const { x, y } = pendingDrag;
      pendingDrag = null;
      const now = performance.now();
      const dt = Math.max(16, now - holding.lastTime);
      const vx = (x - holding.lastX) / dt;
      const vy = (y - holding.lastY) / dt;
      holding.lastX = x;
      holding.lastY = y;
      holding.lastTime = now;
      holding.moved ||= Math.hypot(x - holding.x, y - holding.y) > 7;
      const maxX = Math.max(
        6,
        document.documentElement.clientWidth - position.size - 6,
      );
      const maxY = Math.max(
        6,
        window.innerHeight - (position.size * 126) / BASE - 6,
      );
      place({
        ...position,
        x: Math.min(maxX, Math.max(6, x - holding.dx)),
        y: Math.min(maxY, Math.max(6, y - holding.dy)),
      });
      setVariable(
        "--hang-angle",
        `${Math.max(-20, Math.min(20, vx * 10))}deg`,
      );
      setVariable(
        "--hang-stretch",
        `${1 + Math.min(0.12, Math.abs(vy) * 0.045)}`,
      );
    }
    function release(cancelled = false) {
      if (!holding) return;
      // Apply the last pointer sample before releasing, including short drags.
      if (pendingDrag) drag();
      const held = holding;
      holding = null;
      clearTimeout(holdTimer);
      clearTimeout(furyTimer);
      clearTimeout(planetTimer);
      cancelAnimationFrame(holdFrame);
      pendingDrag = null;
      const button = element!.querySelector<HTMLButtonElement>("button")!;
      if (held.id !== null && button.hasPointerCapture(held.id))
        button.releasePointerCapture(held.id);
      const annoyed = performance.now() - held.start >= 320;
      if (held.moved && !cancelled) energy(anger + 0.4);
      if (cancelled) energy(0);
      // Examine what was underneath when dropped, then retreat to the margin.
      const underneath = document
        .elementsFromPoint(
          position.x + position.size / 2,
          position.y + (position.size * 52) / BASE,
        )
        .find((node) => !element!.contains(node));
      const art = underneath?.closest(".project-art");
      const droppedReaction: Reaction =
        art?.querySelector(".room-night") ||
        art?.classList.contains("illustration-dark")
          ? "night"
          : art
            ? "curious"
            : "proud";
      element!.dataset.temper = "";
      setVariable("--hang-angle", "0deg");
      setVariable("--hang-stretch", "1");
      if (!cancelled && !home && !held.moved && !annoyed) {
        change("observing");
        place(observerSpot);
        react("wave");
        return;
      }
      change("released");
      // A small landing in place, then feet carry the character home.
      later(360, () =>
        walk(() => {
          if (planet && !cancelled) charge();
          else settle(annoyed && !cancelled, droppedReaction);
        }),
      );
    }
    function pointerDown(event: globalThis.PointerEvent) {
      if (!(event.target instanceof Element)) return;
      if (event.target.closest(".mascot-greeting, .art-dot")) grab(event);
      // Touch down can begin a scroll, including over a control. Focus and
      // click confirm a touch action; mouse presses still yield immediately.
      else if (MISCHIEF.includes(current) && event.pointerType === "mouse") {
        stopPlay(event.target.closest("button"));
        energy(0);
        stopFlight();
        walk(() => settle());
      }
    }
    function pointerUp(event: globalThis.PointerEvent) {
      if (holding?.id === event.pointerId) release(event.type !== "pointerup");
    }
    function keyDown(event: KeyboardEvent) {
      const target = event.target;
      if (event.key === "Escape" && holding) {
        event.preventDefault();
        release(true);
        return;
      }
      if (
        !(target instanceof Element) ||
        !target.closest(".mascot-greeting, .art-dot")
      )
        return;
      if (event.key === "Enter") {
        event.preventDefault();
        if (!event.repeat) {
          if (holding) release();
          else grab(null);
        }
      } else if (holding?.id === null && event.key.startsWith("Arrow")) {
        event.preventDefault();
        const dx =
          event.key === "ArrowLeft" ? -18 : event.key === "ArrowRight" ? 18 : 0;
        const dy =
          event.key === "ArrowUp" ? -18 : event.key === "ArrowDown" ? 18 : 0;
        pendingDrag = { x: holding.lastX + dx, y: holding.lastY + dy };
        drag();
      } else if (event.code === "Space" || event.key === " ") {
        event.preventDefault();
        if (!event.repeat) grab(null);
      }
    }
    function keyUp(event: KeyboardEvent) {
      if (
        (event.code === "Space" || event.key === " ") &&
        holding?.id === null
      ) {
        event.preventDefault();
        release();
      }
    }
    function visibility() {
      portfolio.dataset.pageHidden = String(document.hidden);
      if (document.hidden || portfolio.dataset.arcadeOpen === "true") {
        cancelActor();
        pendingLanguage = false;
        clearTimeout(creativeTimer);
        cancelAnimationFrame(creativeFrame);
        if (anchor) delete anchor.dataset.interactionReaction;
        clearTimeout(languageTimer);
        cancelAnimationFrame(languageFrame);
        if (anchor) delete anchor.dataset.languageReaction;
        suspended = true;
        release(true);
        stopPlay();
        stopFlight();
        clearTimeout(idleTimer);
        clearTimeout(headerTimer);
        cancelAnimationFrame(measureFrame);
        measureFrame = 0;
        cancelAnimationFrame(gazeFrame);
        gazeFrame = 0;
        energy(0);
        clearReaction();
        headerAction = "idle";
        handledPink = expanded;
        surface();
        if (current !== "docked") change("observing");
      } else if (suspended) {
        suspended = false;
        layout = null;
        // Refresh geometry before resuming, including scroll/viewport changes
        // while this tab was in the background. Keep the captured position.
        measure();
        if (current === "observing") observe();
      }
    }

    function yieldToMenu(open: boolean) {
      if (open === menuActive) return;
      menuActive = open;
      if (open) cancelActor();
      if (current === "docked") {
        if (!open) languageGreeting();
        return;
      }
      release(true);
      stopPlay();
      energy(0);
      clearTimeout(headerTimer);
      clearTimeout(idleTimer);
      clearReaction();
      stopFlight();
      element!.dataset.action = "";
      headerAction = "idle";
      surface();
      if (open) {
        // Make room for navigation with a visible duck and retreat, rather
        // than toggling visibility on the same frame as the menu opens.
        change("yielding");
        fly({ ...position, y: -position.size * 1.05 }, 380, () =>
          change("waiting"),
        );
      } else {
        change("reappearing");
        fly(
          home ? homeSpot : observerSpot,
          520,
          () => {
            if (home) dock();
            else observe();
          },
          12,
        );
      }
    }

    function measure() {
      measureFrame = 0;
      if (suspended) return;
      anchor = document.querySelector<HTMLElement>(".art-dot");
      if (!anchor) return;
      const a = anchor!.getBoundingClientRect();
      const geometry = fixedLayout();
      const { h, container, content, width } = geometry;
      const pink = about!.getBoundingClientRect();
      const widthChanged = measuredWidth !== 0 && measuredWidth !== width;
      measuredWidth = width;
      const height = window.innerHeight;
      const lastSpot = observerSpot;
      const wasHome = home;
      home = a.top + a.height / 2 > h.bottom + (home ? 72 : 112);
      needsStretch = width > 1500;
      // Trigger at the section's actual crossing, with a small dead band to
      // avoid restarting the gesture on tiny scroll reversals at the edge.
      const crossing = h.top + h.height / 2;
      zone =
        pink.top <= crossing + (zone ? 6 : -6) &&
        pink.bottom >= crossing + (zone ? -6 : 6);
      // Automatic coverage must not preempt the visible desktop tug/push.
      // Narrow screens and reduced motion still get immediate coverage.
      covered =
        pink.top <= h.bottom &&
        pink.bottom >= h.top &&
        (!motion || !needsStretch);
      if (!zone) {
        handledPink = false;
      }
      if (!needsStretch || !motion) expanded = zone;

      // Body circle occupies 74 of the SVG's 112 units. Match the hero's
      // original circle when taking off and when docking again.
      updateHomeSpot(a);
      const tucked = headerPerch(width);
      const menuIsOpen = menu.getAttribute("aria-expanded") === "true";
      if (menuIsOpen !== measuredMenuOpen) {
        measuredMenuOpen = menuIsOpen;
        setMenuOpen(menuIsOpen);
      }
      if (element!.dataset.tucked !== String(tucked))
        element!.dataset.tucked = String(tucked);

      if (tucked) {
        const gap = Math.max(0, geometry.right!.left - geometry.brand!.right);
        if (width > 650 && gap < 112) {
          // On tablets a cramped navigation gap must not shrink the character.
          observerSpot = { x: width - 112, y: h.bottom + 12, size: 104 };
        } else {
          const small = Math.min(
            width > 650 ? 96 : 60,
            Math.max(44, gap - (width > 650 ? 16 : 8)),
          );
          observerSpot = {
            x: geometry.brand!.right + gap / 2 - small / 2,
            y: h.height / 2 - (small * 52) / BASE,
            size: small,
          };
        }
      } else {
        const gutter = width - content.right;
        const small = Math.min(112, Math.max(44, gutter - 12));
        observerSpot = {
          x: width - small - 6,
          y: Math.min(height - small - 22, height * 0.7),
          size: small,
        };
      }
      const pullSize = width > 1500 ? 94 : observerSpot.size;
      gripSpot =
        width > 1500
          ? {
              x: container.right - (pullSize * 76) / BASE,
              y: Math.max(4, h.bottom - (pullSize * 82) / BASE),
              size: pullSize,
            }
          : { ...observerSpot };
      edgeSpot =
        width > 1500
          ? { ...gripSpot, x: width - pullSize - 6 }
          : { ...gripSpot };
      if (!motion) {
        expanded = zone;
        dock();
        surface();
        return;
      }
      if (!initialized) {
        initialized = true;
        if (!home) {
          onAwayChange(true);
          // Direct links open with the mascot already observing nearby.
          expanded = zone;
          handledPink = zone;
          place(observerSpot);
          observe();
        }
      }
      surface();
      yieldToMenu(menuIsOpen);
      if (
        menuIsOpen ||
        ["yielding", "waiting", "reappearing"].includes(current)
      )
        return;
      if (holding) {
        if (widthChanged || menuIsOpen) release(true);
        return;
      }
      if (actorOwner) {
        if (widthChanged) { cancelActor(); observe(); }
        return;
      }
      if (widthChanged && current !== "docked") {
        clearTimeout(headerTimer);
        stopPlay();
        energy(0);
        stopFlight();
        expanded = zone;
        headerAction = "idle";
        element!.dataset.action = "";
        surface();
        if (home) returnHome();
        else fly(observerSpot, 420, observe);
        return;
      }
      if (MISCHIEF.includes(current)) {
        // Scroll moves the document, not the adventure's clock. Read its
        // targets once per scheduled measurement and keep the hand attached.
        const rect = prankTarget?.getBoundingClientRect();
        attentionRect = attentionTarget === prankTarget
          ? rect ?? null
          : attentionTarget?.getBoundingClientRect() ?? null;
        if (rect && prankTarget) {
          if (!targetVisible(prankTarget, rect)) {
            stopPlay();
            energy(0);
            stopFlight();
            walk(() => settle());
            return;
          }
          const next = targetSpot(rect);
          if (prankJourney && prankSpot) {
            // Translate both endpoints together to preserve the ongoing arc.
            prankJourney.from = {
              ...prankJourney.from,
              x: prankJourney.from.x + next.x - prankSpot.x,
              y: prankJourney.from.y + next.y - prankSpot.y,
            };
          }
          prankSpot = next;
          if (prankAttached) place(next);
        }
        if (current !== "cooling" && element!.dataset.action !== "gloat") look();
        return;
      }
      if (home && !wasHome && current !== "docked" && current !== "returning") {
        stopPlay();
        clearTimeout(headerTimer);
        element!.dataset.action = "";
        headerAction = "idle";
        surface();
        energy(0);
        if (["walking", "released"].includes(current)) walk(returnHome);
        else returnHome();
        return;
      }
      if (home && current === "returning") {
        // The existing return loop reads the latest destination. Do not
        // restart a flight from a scroll or ResizeObserver notification.
        return;
      }
      if (
        [
          "released",
          "walking",
          "settling",
          "charging",
          "scheming",
          "pranking",
          "cooling",
        ].includes(current)
      )
        return;
      if (current === "pushing" || element!.dataset.action === "push") {
        if (zone) {
          clearTimeout(headerTimer);
          stopFlight();
          element!.dataset.action = "";
          headerAction = "idle";
          expanded = true;
          handledPink = true;
          surface();
          land();
        }
        return;
      }
      if (!zone && ["climbing", "bracing", "pulling"].includes(current)) {
        clearTimeout(headerTimer);
        stopFlight();
        headerAction = "idle";
        if (expanded && needsStretch) push();
        else land();
        return;
      }
      if (home) {
        if (current !== "docked" && current !== "returning") {
          if (expanded && !zone && needsStretch) push();
          else returnHome();
        }
      } else if (current === "docked") {
        depart();
      } else if (current === "returning") {
        land();
      } else if (current === "observing") {
        if (expanded && !zone && needsStretch) push();
        else if (zone && !handledPink && needsStretch) climb();
        else if (
          Math.hypot(lastSpot.x - observerSpot.x, lastSpot.y - observerSpot.y) >
            2 ||
          lastSpot.size !== observerSpot.size
        ) {
          fly(observerSpot, 300, observe);
        }
      }
      look();
    }
    function schedule() {
      if (suspended) return;
      const now = performance.now();
      const delta = Math.abs(window.scrollY - lastScroll);
      if (
        delta > 65 &&
        delta / Math.max(16, now - lastScrollAt) > 1.5 &&
        now - lastStartle > 2200
      ) {
        lastStartle = now;
        react("startled", 850);
      }
      lastScroll = window.scrollY;
      lastScrollAt = now;
      if (!measureFrame) measureFrame = requestAnimationFrame(measure);
    }
    function invalidateLayout() {
      layout = null;
      schedule();
    }
    function look() {
      gazeFrame = 0;
      if (
        !motion ||
        suspended ||
        (current !== "observing" && !MISCHIEF.includes(current))
      )
        return;
      // During a WAAPI flight the browser owns the position. At rest, use
      // the point we already know and avoid a layout read after SVG writes.
      const rect = animation
        ? element!.getBoundingClientRect()
        : { left: position.x, top: position.y, width: position.size };
      const r = attentionRect;
      const target = r
        ? {
            x: r.left + r.width / 2,
            y: Math.max(
              fixedLayout().h.bottom + 12,
              Math.min(window.innerHeight - 20, r.top + r.height / 2),
            ),
          }
        : (pointer ?? {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
          });
      const dx = target.x - (rect.left + rect.width / 2);
      const dy = target.y - (rect.top + (rect.width * 52) / BASE);
      const distance = Math.max(Math.hypot(dx, dy), 1);
      const strength = Math.min(distance / 120, 1);
      setVariable(
        "--gaze-x",
        `${((dx / distance) * 5 * strength).toFixed(2)}px`,
      );
      setVariable(
        "--gaze-y",
        `${((dy / distance) * 3.5 * strength).toFixed(2)}px`,
      );
      setVariable(
        "--head-angle",
        `${((dx / distance) * 6 * strength).toFixed(2)}deg`,
      );
    }
    function point(event: globalThis.PointerEvent) {
      if (suspended) return;
      if (holding && holding.id === event.pointerId) {
        pendingDrag = { x: event.clientX, y: event.clientY };
        if (!holdFrame) holdFrame = requestAnimationFrame(drag);
        return;
      }
      if (event.pointerType !== "mouse") return;
      pointer = { x: event.clientX, y: event.clientY };
      if (!gazeFrame) gazeFrame = requestAnimationFrame(look);
    }
    function focus(event: FocusEvent) {
      if (!(event.target instanceof HTMLElement)) return;
      if (
        MISCHIEF.includes(current) &&
        !element!.contains(event.target) &&
        event.target.closest("button") !== prankControl
      ) {
        stopPlay();
        energy(0);
        stopFlight();
        walk(() => settle());
      }
      const rect = event.target.getBoundingClientRect();
      pointer = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
      look();
    }
    function interaction(event: MouseEvent) {
      if (performingPrank) return;
      if (!(event.target instanceof Element)) return;
      const control = event.target.closest("button, a, input");
      if (!control) return;
      if (element!.contains(control)) {
        // Pointer taps are handled at release. Clicks from keyboard/AT wave.
        if (event.detail === 0) react("wave");
        return;
      }
      if (control.matches(".art-dot")) return;
      if (control.closest(".language-switcher")) return;
      if (MISCHIEF.includes(current)) {
        stopPlay(control);
        energy(0);
        stopFlight();
        walk(() => settle());
        return;
      }
      // These controls already emit a specific reaction from CreativeMotion.
      if (control.matches(".name-play, .chrome-secret, .agenda-days button")) return;
      if (control.matches(".room-light-toggle, .theme-control")) {
        react(
          control.getAttribute("aria-checked") === "true" ? "night" : "dazzled",
          1800,
        );
      } else if (control.matches(".project-detail-toggle")) {
        // Read the committed disclosure state after React processes the click.
        queueMicrotask(() => {
          if (closed) return;
          react(
            control.getAttribute("aria-expanded") === "true"
              ? "inspect"
              : "curious",
            2000,
          );
        });
      } else if (control.matches(".copy-contact, .idea-action")) {
        react("proud", 1600);
      } else react("curious");
    }
    function preview(event: globalThis.PointerEvent) {
      if (!(event.target instanceof Element) || current !== "observing") return;
      const art = event.target.closest(".project-visual");
      if (art && art !== lastPreview) {
        lastPreview = art;
        react("curious", 1600);
      } else if (!art) lastPreview = null;
    }
    function rest() {
      release(true);
      if (MISCHIEF.includes(current)) {
        stopPlay();
        energy(0);
        stopFlight();
        walk(() => settle());
      }
      pointer = null;
      look();
    }
    const resize = new ResizeObserver(invalidateLayout);
    for (const node of [
      header,
      inner,
      shell,
      brand,
      menu,
      nav,
      document.querySelector("main")!,
    ])
      resize.observe(node);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", invalidateLayout);
    if (motion)
      window.addEventListener("pointermove", point, { passive: true });
    window.addEventListener("blur", rest);
    if (motion) {
      document.addEventListener("focusin", focus);
      document.addEventListener("click", interaction);
      document.addEventListener("pointerdown", pointerDown);
      window.addEventListener("pointerup", pointerUp);
      window.addEventListener("pointercancel", pointerUp);
      element
        .querySelector("button")!
        .addEventListener("lostpointercapture", pointerUp);
      document.addEventListener("pointerover", preview, { passive: true });
      document.addEventListener("keydown", keyDown);
      document.addEventListener("keyup", keyUp);
      document.addEventListener("visibilitychange", visibility);
      window.addEventListener(languageChangeEvent, languageChanged);
      window.addEventListener(creativeReactionEvent, creativeChanged);
      window.addEventListener(actorRequestEvent, requestActor);
      window.addEventListener("portfolio:arcadechange", visibility);
    }
    measure();
    return () => {
      closed = true;
      cancelActor();
      delete portfolio.dataset.pageHidden;
      animation?.cancel();
      cancelAnimationFrame(measureFrame);
      cancelAnimationFrame(gazeFrame);
      cancelAnimationFrame(reactionFrame);
      clearTimeout(reactionTimer);
      clearTimeout(languageTimer);
      clearTimeout(creativeTimer);
      cancelAnimationFrame(creativeFrame);
      if (anchor) delete anchor.dataset.interactionReaction;
      cancelAnimationFrame(languageFrame);
      if (anchor) delete anchor.dataset.languageReaction;
      clearTimeout(idleTimer);
      clearTimeout(holdTimer);
      clearTimeout(furyTimer);
      clearTimeout(planetTimer);
      clearTimeout(headerTimer);
      cancelAnimationFrame(walkFrame);
      cancelAnimationFrame(returnFrame);
      stopPlay();
      cancelAnimationFrame(holdFrame);
      const button = element.querySelector("button")!;
      const captured = holding?.id;
      holding = null;
      if (captured != null && button.hasPointerCapture(captured))
        button.releasePointerCapture(captured);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", invalidateLayout);
      window.removeEventListener(languageChangeEvent, languageChanged);
      window.removeEventListener(creativeReactionEvent, creativeChanged);
      window.removeEventListener(actorRequestEvent, requestActor);
      window.removeEventListener("portfolio:arcadechange", visibility);
      window.removeEventListener("pointermove", point);
      window.removeEventListener("blur", rest);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("click", interaction);
      document.removeEventListener("pointerdown", pointerDown);
      window.removeEventListener("pointerup", pointerUp);
      window.removeEventListener("pointercancel", pointerUp);
      button.removeEventListener("lostpointercapture", pointerUp);
      document.removeEventListener("pointerover", preview);
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyup", keyUp);
      document.removeEventListener("visibilitychange", visibility);
      onAwayChange(false);
      if (element.contains(document.activeElement))
        anchor?.focus({ preventScroll: true });
    };
  }, [motion, onAwayChange, onHeaderChange]);

  return (
    <div
      ref={root}
      className="page-mascot"
      data-phase={phase}
      data-menu-open={menuOpen}
      data-motion={motion ? "on" : "off"}
    >
      <button
        className="mascot-greeting"
        type="button"
        aria-label={t.mascot}
        tabIndex={
          motion &&
          (INTERACTIVE.includes(phase) || phase === "held") &&
          !menuOpen
            ? 0
            : -1
        }
      >
        <div className="mascot-viewport">
          <MascotArtwork />
        </div>
      </button>
    </div>
  );
}
