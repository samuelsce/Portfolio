import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import { creativeReaction } from "./creative-events";

const ROUND_SECONDS = 6;
type Phase = "ready" | "playing" | "lost" | "won";

export default function AimChallenge({ source, onDone }: { source: HTMLElement | SVGElement; onDone: () => void }) {
  const { language } = useLanguage();
  const c = personalCopy[language].moment;
  const [phase, setPhase] = useState<Phase>("ready");
  const [hits, setHits] = useState(0), [remaining, setRemaining] = useState(ROUND_SECONDS);
  const [timed, setTimed] = useState(true);
  const deadline = useRef(0), hitCount = useRef(0), running = useRef(false);
  const target = useRef<HTMLButtonElement>(null), startButton = useRef<HTMLButtonElement>(null);
  const recoverFocus = useRef(false), done = useRef(onDone);
  done.current = onDone;

  useEffect(() => {
    if (source === document.activeElement && source.matches(":focus-visible")) startButton.current?.focus({ preventScroll: true });
  }, [source]);

  function lose() {
    if (!running.current) return;
    running.current = false;
    recoverFocus.current = document.activeElement === target.current;
    setRemaining(0); setPhase("lost");
  }

  useEffect(() => {
    if (phase !== "playing" || !timed) return;
    // A monotonic deadline prevents late clicks from winning between timer ticks.
    const tick = () => {
      const left = deadline.current - performance.now();
      setRemaining(Math.max(0, Math.ceil(left / 1000)));
      if (left <= 0) lose();
    };
    tick();
    const timer = setInterval(tick, 100);
    return () => clearInterval(timer);
  }, [phase, timed]);

  useEffect(() => {
    if ((phase === "playing" || phase === "lost") && recoverFocus.current) {
      (phase === "playing" ? target : startButton).current?.focus({ preventScroll: true });
      recoverFocus.current = false;
    }
    if (phase !== "won") return;
    creativeReaction("proud");
    const timer = setTimeout(() => done.current(), 1700);
    return () => clearTimeout(timer);
  }, [phase]);

  function start() {
    recoverFocus.current = document.activeElement === startButton.current;
    hitCount.current = 0; running.current = true;
    deadline.current = timed ? performance.now() + ROUND_SECONDS * 1000 : Infinity;
    setHits(0); setRemaining(ROUND_SECONDS); setPhase("playing");
  }

  function hit() {
    if (!running.current) return;
    if (performance.now() >= deadline.current) { lose(); return; }
    const focused = document.activeElement === target.current;
    const next = ++hitCount.current;
    setHits(next);
    if (next === 3) {
      running.current = false;
      if (focused) source.focus({ preventScroll: true });
      setPhase("won");
    } else if (focused) requestAnimationFrame(() => target.current?.focus({ preventScroll: true }));
  }

  return <div className="aim-challenge" data-phase={phase}>
    <div className="aim-hud">
      <div className="aim-count" aria-label={`${hits}/3`}><i data-hit={hits > 0} /><i data-hit={hits > 1} /><i data-hit={hits > 2} /></div>
      <span className="aim-time" role="timer" aria-label={c.timeLeft}>{timed ? `${remaining}s` : c.untimedShort}</span>
    </div>
    <p className="aim-message" role="status">{phase === "won" ? c.found : phase === "lost" ? c.failed : phase === "playing" && timed ? c.aimPlaying : timed ? c.aim : c.untimedHelp}</p>
    {(phase === "ready" || phase === "lost") && <div className="aim-controls">
      <button ref={startButton} className="aim-start" onClick={start}>{phase === "lost" ? c.retry : c.start}</button>
      <label className="aim-assist"><input type="checkbox" checked={!timed} onChange={event => setTimed(!event.target.checked)} />{c.untimed}</label>
    </div>}
    {phase === "playing" && <button ref={target} key={hits} className={`aim-target aim-target-${hits}`} aria-label={`${c.target} ${hits+1}/3`} onClick={hit}>
      <svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="32" cy="35" rx="23" ry="22" fill="#ba8da433" stroke="none" /><circle className="target-rim" cx="32" cy="32" r="23" /><path className="target-light" d="M17 25a17 17 0 0 1 16-10" fill="none" strokeLinecap="round" /><circle cx="32" cy="32" r="18" /><circle cx="32" cy="32" r="11" /><path d="M32 2v14m0 32v14M2 32h14m32 0h14" /><circle className="target-core" cx="32" cy="32" r="4" /></svg>
    </button>}
    {phase === "won" && <div className="aim-badge"><svg viewBox="0 0 90 90" aria-hidden="true"><ellipse cx="45" cy="83" rx="27" ry="4" fill="#387e711a" /><path d="m45 7 31 21v34L45 84 14 62V28Z" fill="#387e71" /><path d="m45 16 23 17v25L45 74 22 58V33Z" fill="#6ec2a4" /><path d="m29 42 16 16 16-16-16-13Z" fill="#e8f8ef" /></svg></div>}
  </div>;
}
