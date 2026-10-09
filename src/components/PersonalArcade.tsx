import { useEffect, useRef } from "react";
import type { KeyboardEvent } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import type { GameKind } from "./personal-secrets";
import { ThreePointGame, BridgeGame } from "./PersonalGames";
import Icon from "./Icon";
import "../personal-arcade.css";

export default function PersonalArcade({ kind, motion, onClose }: { kind: GameKind; motion: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const c = personalCopy[language];
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const node = dialog.current!, portfolio = document.querySelector<HTMLElement>(".portfolio")!;
    const overflow = document.body.style.overflow;
    node.showModal(); document.body.style.overflow = "hidden";
    portfolio.dataset.arcadeOpen = "true";
    window.dispatchEvent(new Event("portfolio:arcadechange"));
    const visibility = () => { node.dataset.paused = String(document.hidden); };
    document.addEventListener("visibilitychange", visibility); visibility();
    return () => { node.close(); document.body.style.overflow = overflow; delete portfolio.dataset.arcadeOpen; window.dispatchEvent(new Event("portfolio:arcadechange")); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  function trap(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled)')).filter(node => node.tabIndex >= 0);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  return createPortal(<dialog ref={dialog} className="personal-arcade" data-game={kind} data-motion={motion ? "on" : "off"} aria-labelledby="arcade-title" onKeyDown={trap} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target !== event.currentTarget) return; const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose(); }}>
    <div className="personal-heading"><h2 id="arcade-title">{c[kind].title}</h2><button className="personal-close" onClick={onClose} aria-label={c.close}><Icon name="close" /></button></div>
    {kind === "basketball" ? <ThreePointGame motion={motion} /> : <BridgeGame />}
  </dialog>, document.body);
}
