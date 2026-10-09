import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import LazyLoadBoundary, { LoadFailure } from "./LazyLoadBoundary";
import { personalWord } from "./personal-secrets";
import type { PersonalTopic } from "./personal-secrets";
const PersonalArcade = lazy(() => import("./PersonalArcade"));

// Only this small discovery listener enters the initial bundle. The stories,
// artwork, games and their stylesheet are fetched after a real discovery.
export default function PersonalSecrets({ motion }: { motion: boolean }) {
  const { language } = useLanguage();
  const [topic, setTopic] = useState<PersonalTopic | null>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const open = useRef(false);
  useEffect(() => {
    const portfolio = document.querySelector<HTMLElement>(".portfolio")!;
    let pending: ReturnType<typeof setTimeout> | undefined;
    let taps = 0, lastTap = 0;
    function cancel() { clearTimeout(pending); pending = undefined; }
    function discover(next: PersonalTopic, source: HTMLElement) {
      cancel();
      if (open.current || document.hidden || portfolio.dataset.arcadeOpen === "true") return;
      trigger.current = source;
      open.current = true;
      setTopic(next);
    }
    function input(event: Event) {
      if (!(event.target instanceof HTMLInputElement) || !event.target.closest(".idea-input")) return;
      cancel();
      const next = personalWord(event.target.value), source = event.target;
      if (next) pending = setTimeout(() => discover(next, source), 550);
    }
    function key(event: KeyboardEvent) {
      if (event.key !== "Enter" || !(event.target instanceof HTMLInputElement) || !event.target.closest(".idea-input")) return;
      const next = personalWord(event.target.value);
      if (next) { event.preventDefault(); discover(next, event.target); }
    }
    function click(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;
      const source = event.target.closest<HTMLElement>(".name-play");
      if (!source) return;
      const now = performance.now();
      taps = now - lastTap < 1300 ? taps + 1 : 1;
      lastTap = now;
      if (taps === 5) { taps = 0; discover("voyage", source); }
    }
    function visibility() { if (document.hidden) cancel(); }
    portfolio.addEventListener("input", input);
    portfolio.addEventListener("click", click);
    portfolio.addEventListener("keydown", key);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("portfolio:arcadechange", cancel);
    return () => {
      cancel();
      portfolio.removeEventListener("input", input);
      portfolio.removeEventListener("click", click);
      portfolio.removeEventListener("keydown", key);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("portfolio:arcadechange", cancel);
    };
  }, []);
  function close() {
    open.current = false;
    setTopic(null);
    // The native dialog restores focus on unmount. Restore it explicitly for
    // load failures too, without changing the visitor's scroll position.
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }));
  }
  if (!topic) return null;
  return <LazyLoadBoundary fallback={<div className="personal-loading"><LoadFailure onClose={close} /></div>}>
    <Suspense fallback={<div className="personal-loading" role="status">{language === "pt" ? "Abrindo o segredo…" : "Opening the secret…"}<button onClick={close}>{language === "pt" ? "Cancelar" : "Cancel"}</button></div>}>
      <PersonalArcade initial={topic} motion={motion} onClose={close} />
    </Suspense>
  </LazyLoadBoundary>;
}
