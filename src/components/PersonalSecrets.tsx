import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import LazyLoadBoundary, { LoadFailure } from "./LazyLoadBoundary";
import type { SecretKind, SecretRequest } from "./personal-secrets";
const PersonalArcade = lazy(() => import("./PersonalArcade"));
const SecretMoments = lazy(() => import("./SecretMoments"));
const AimDialog = lazy(() => import("./AimDialog"));
const counts: Record<SecretKind, number> = { voyage: 3, ghosts: 1, toddy: 2, basketball: 3, blocks: 2, aim: 2 };

// Discovery stays tiny. Each game or on-page performance has a separate lazy
// bundle; there is no menu of secrets and no word scanner in the idea field.
export default function PersonalSecrets({ motion }: { motion: boolean }) {
  const { language } = useLanguage();
  const [request, setRequest] = useState<SecretRequest | null>(null);
  const opened = useRef(false);
  const serial = useRef(0);
  const source = useRef<HTMLElement | SVGElement | null>(null);
  useEffect(() => {
    const portfolio = document.querySelector<HTMLElement>(".portfolio")!;
    const taps = new Map<Element, { count: number; at: number }>();
    let digits = "", digitAt = 0;
    function discover(kind: SecretKind, from: HTMLElement | SVGElement) {
      if (opened.current || document.hidden || portfolio.dataset.arcadeOpen === "true" || portfolio.dataset.constellation === "true") return;
      source.current = from;
      opened.current = true;
      setRequest({ kind, source: from, id: ++serial.current });
    }
    function click(event: MouseEvent) {
      if (!(event.target instanceof Element) || opened.current) return;
      const from = event.target.closest<HTMLElement | SVGElement>("[data-secret]");
      if (!from) return;
      const kind = from.dataset.secret as SecretKind;
      if (!(kind in counts)) return;
      if (kind === "ghosts" && !from.closest(".room-night")) {
        // The first touch opens the night scene; a touch on the lit window
        // reveals its visitor. The existing theme switch keeps its real state.
        from.closest(".project-art")?.querySelector<HTMLButtonElement>(".room-light-toggle")?.click();
        return;
      }
      const now = performance.now(), previous = taps.get(from);
      const count = previous && now - previous.at < 1200 ? previous.count + 1 : 1;
      taps.set(from, { count, at: now });
      if (count >= counts[kind]) { taps.delete(from); discover(kind, from); }
    }
    function key(event: KeyboardEvent) {
      if (opened.current || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.target instanceof Element && event.target.closest('input, textarea, [contenteditable="true"]')) return;
      if (!/^[189]$/.test(event.key)) { digits = ""; return; }
      const now = performance.now();
      digits = (now - digitAt < 1200 ? digits : "") + event.key;
      digits = digits.slice(-3); digitAt = now;
      if (digits === "189") {
        digits = "";
        discover("blocks", document.activeElement instanceof HTMLElement ? document.activeElement : portfolio);
      }
    }
    portfolio.addEventListener("click", click);
    window.addEventListener("keydown", key);
    return () => { portfolio.removeEventListener("click", click); window.removeEventListener("keydown", key); };
  }, []);
  function close() { opened.current = false; setRequest(null); }
  function closeGame() { close(); requestAnimationFrame(() => source.current?.focus({ preventScroll: true })); }
  if (!request) return null;
  const game = request.kind === "basketball" || request.kind === "blocks";
  return <LazyLoadBoundary key={request.id} fallback={<div className="personal-loading"><LoadFailure onClose={closeGame} /></div>}>
    <Suspense fallback={<div className="personal-loading" role="status">{language === "pt" ? "Abrindo o segredo…" : "Opening the secret…"}<button onClick={closeGame}>{language === "pt" ? "Cancelar" : "Cancel"}</button></div>}>
      {request.kind === "aim" ? <AimDialog motion={motion} onClose={closeGame} /> : game ? <PersonalArcade kind={request.kind as "basketball" | "blocks"} motion={motion} onClose={closeGame} /> : <SecretMoments request={request} motion={motion} onDone={close} />}
    </Suspense>
  </LazyLoadBoundary>;
}
