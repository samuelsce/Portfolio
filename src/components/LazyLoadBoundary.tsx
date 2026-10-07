import { Component } from "react";
import type { ReactNode } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { gardenCopy } from "../i18n/garden";

// An optional feature must never take the rest of the portfolio down.
export default class LazyLoadBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function LoadFailure({ onClose }: { onClose?: () => void }) {
  const { language } = useLanguage();
  const copy = gardenCopy[language];
  return <div className="load-error" role="status">
    {!onClose && <h2 id="contribution-title">{copy.title}</h2>}
    <p><strong>{onClose ? copy.gameUnavailable : copy.calendarUnavailable}</strong> {copy.loadHelp}</p>
    <div><button onClick={() => window.location.reload()}>{copy.reload}</button>{onClose && <button onClick={onClose}>{copy.close}</button>}</div>
  </div>;
}
