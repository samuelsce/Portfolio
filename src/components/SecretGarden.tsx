import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { KeyboardEvent } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { gardenCopy } from "../i18n/garden";
import MascotArtwork from "./MascotArtwork";
import Icon from "./Icon";
import "../secret-garden.css";

const side = 4;
const size = side * side;
const recordKey = "samuel-studio-orbit-best";
export function flipLights(board: boolean[], index: number) {
  const row = Math.floor(index / side), col = index % side;
  return board.map((lit, cell) => {
    const r = Math.floor(cell / side), c = cell % side;
    return Math.abs(r - row) + Math.abs(c - col) <= 1 ? !lit : lit;
  });
}
function puzzle(previous?: boolean[]) {
  // Scrambling a completed board guarantees that every puzzle has a solution.
  for (let attempt = 0; attempt < 12; attempt++) {
    const picks = Array.from({ length: size }, (_,index) => index);
    for (let i=size-1;i>0;i--) {
      const j=Math.floor(Math.random()*(i+1));
      [picks[i],picks[j]]=[picks[j],picks[i]];
    }
    const board = picks.slice(0,5).reduce(flipLights, Array<boolean>(size).fill(true));
    if (!board.every(Boolean) && (!previous || board.some((v,i) => v !== previous[i]))) return board;
  }
  return [0,3,6,11,14].reduce(flipLights, Array<boolean>(size).fill(true));
}
function savedBest(): number | null {
  try {
    const stored = localStorage.getItem(recordKey);
    const best = stored === null ? NaN : Number(stored);
    return Number.isInteger(best) && best > 0 && best < 100000 ? best : null;
  } catch { return null; }
}
export default function SecretGarden({ motion, onClose }: { motion: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [start, setStart] = useState(() => puzzle());
  const [board, setBoard] = useState(start);
  const [moves, setMoves] = useState(0);
  const [best, setBest] = useState(savedBest);
  const [focused, setFocused] = useState(0);
  const [last, setLast] = useState(-1);
  const { language } = useLanguage();
  const copy = gardenCopy[language];
  const won = board.every(Boolean);
  const lit = board.filter(Boolean).length;
  useEffect(() => {
    const node = dialog.current!;
    const portfolio = document.querySelector<HTMLElement>(".portfolio")!;
    const overflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    portfolio.dataset.arcadeOpen = "true";
    window.dispatchEvent(new Event("portfolio:arcadechange"));
    const visibility = () => { node.dataset.paused = String(document.hidden); };
    document.addEventListener("visibilitychange", visibility);
    visibility();
    return () => {
      node.close();
      document.body.style.overflow = overflow;
      delete portfolio.dataset.arcadeOpen;
      window.dispatchEvent(new Event("portfolio:arcadechange"));
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  useEffect(() => {
    if (!won || moves === 0) return;
    // Winning disables every tile. Move focus to an enabled action before Tab is lost.
    dialog.current?.querySelector<HTMLButtonElement>(".secret-actions button:last-child")?.focus({ preventScroll: true });
    if (best === null || moves < best) {
      setBest(moves);
      try { localStorage.setItem(recordKey, String(moves)); } catch { /* Play without storage. */ }
    }
  }, [won, moves, best]);
  function tap(index: number) {
    if (won) return;
    setBoard(current => flipLights(current, index));
    setMoves(current => current + 1);
    setLast(index);
    setFocused(index);
  }
  function focusCell(index: number) {
    setFocused(index);
    dialog.current?.querySelector<HTMLButtonElement>(`[data-cell="${index}"]`)?.focus();
  }
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const row = Math.floor(index / side), col = index % side;
    const next: Record<string, number> = { ArrowLeft: row * side + Math.max(0,col-1), ArrowRight: row * side + Math.min(side-1,col+1), ArrowUp: Math.max(0,row-1)*side+col, ArrowDown: Math.min(side-1,row+1)*side+col, Home:0, End:size-1 };
    if (event.key in next) { event.preventDefault(); focusCell(next[event.key]); }
  }
  function restart(fresh: boolean) {
    const next = fresh ? puzzle(start) : start;
    setStart(next); setBoard(next); setMoves(0); setLast(-1);
    setFocused(0);
  }
  useEffect(() => { if (moves === 0) dialog.current?.querySelector<HTMLButtonElement>('[data-cell="0"]')?.focus(); }, [moves, start]);
  function close() { dialog.current?.close(); onClose(); }
  function keepFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>('button:not(:disabled)')).filter(node => node.tabIndex >= 0);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  return createPortal(
    <dialog ref={dialog} className="secret-garden" data-motion={motion ? "on" : "off"} data-won={won} aria-labelledby="secret-title" aria-describedby="secret-rules" onKeyDown={keepFocus} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const r=event.currentTarget.getBoundingClientRect(); if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close(); } }}>
      <div className="secret-heading"><button onClick={close} aria-label={copy.close}><Icon name="close" /></button></div>
      <h2 id="secret-title">{copy.gameTitle}</h2>
      <p id="secret-rules">{copy.gameRules}</p>
      <div className="secret-playground">
        <div className="secret-portrait" data-last={last}>
          <svg className="secret-aura" viewBox="0 0 180 180" aria-hidden="true"><ellipse cx="90" cy="90" rx="78" ry="40" transform="rotate(-32 90 90)" /><ellipse cx="90" cy="90" rx="78" ry="40" transform="rotate(32 90 90)" /><path d="m149 21 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z" /></svg>
          <div className="secret-face" key={moves}><MascotArtwork docked /></div>
          <span>{copy.lights} <strong>{lit}/{size}</strong></span>
        </div>
        <div className="secret-board" role="group" aria-label={copy.board} aria-describedby="secret-keys">
          {board.map((value,index) => <button key={index} data-cell={index} aria-pressed={value} tabIndex={focused === index ? 0 : -1} onFocus={() => setFocused(index)} onClick={() => tap(index)} onKeyDown={event => keyboard(event,index)} aria-label={`${copy.row} ${Math.floor(index/side)+1}, ${copy.column} ${index%side+1}: ${value ? copy.lit : copy.unlit}`} disabled={won} />)}
        </div>
      </div>
      <p id="secret-keys" className="secret-key-hint">{copy.keys}</p>
      <div className="secret-score"><span>{copy.moves} <strong>{moves}</strong></span><span>{copy.best} <strong>{best ?? "…"}</strong></span></div>
      <div className="secret-result" role="status" aria-live="polite">{won && <><strong>{copy.won}</strong><span>{copy.wonDetail}</span></>}</div>
      <div className="secret-actions"><button onClick={() => restart(false)}>{copy.restart}</button><button onClick={() => restart(true)}>{copy.next}<Icon name="asterisk" /></button></div>
    </dialog>, document.body,
  );
}
