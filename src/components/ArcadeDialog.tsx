import { useEffect, useRef } from "react";
import type { KeyboardEvent, ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import Icon from "./Icon";
import "../personal-arcade.css";

export default function ArcadeDialog({ kind, title, motion, onClose, children, closeOnHidden = false }: {
  kind: string; title: string; motion: boolean; onClose: () => void; children: ReactNode; closeOnHidden?: boolean;
}) {
  const { language } = useLanguage();
  const dialog = useRef<HTMLDialogElement>(null), close = useRef(onClose);
  close.current = onClose;
  useEffect(() => {
    const node = dialog.current!, portfolio = document.querySelector<HTMLElement>(".portfolio")!;
    const overflow = document.body.style.overflow;
    node.showModal(); document.body.style.overflow = "hidden";
    portfolio.dataset.arcadeOpen = "true";
    window.dispatchEvent(new Event("portfolio:arcadechange"));
    const visibility = () => {
      node.dataset.paused = String(document.hidden);
      if (document.hidden && closeOnHidden) close.current();
    };
    document.addEventListener("visibilitychange", visibility); visibility();
    return () => {
      node.close(); document.body.style.overflow = overflow; delete portfolio.dataset.arcadeOpen;
      window.dispatchEvent(new Event("portfolio:arcadechange"));
      document.removeEventListener("visibilitychange", visibility);
    };
  }, [closeOnHidden]);
  function trap(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not(:disabled), input:not(:disabled)')).filter(node => node.tabIndex >= 0);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  return createPortal(<dialog ref={dialog} className={`personal-arcade ${kind === "aim" ? "aim-arcade" : ""}`} data-game={kind} data-motion={motion ? "on" : "off"} aria-labelledby="arcade-title" onKeyDown={trap} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const r = event.currentTarget.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) onClose();
  }}>
    <div className="personal-heading"><h2 id="arcade-title">{title}</h2><button className="personal-close" onClick={onClose} aria-label={personalCopy[language].close}><Icon name="close" /></button></div>
    {children}
  </dialog>, document.body);
}
