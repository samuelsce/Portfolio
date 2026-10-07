import { lazy, memo, Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { initialContributions, loadContributions } from "../data/contributions";
import type { ContributionDay } from "../data/contributions";
import { useLanguage } from "../i18n/LanguageProvider";
import { gardenCopy } from "../i18n/garden";
import MascotArtwork from "./MascotArtwork";
const SecretGarden = lazy(() => import("./SecretGarden"));

const Calendar = memo(function Calendar({ days, onSelect }: { days: ContributionDay[]; onSelect: (day: ContributionDay) => void }) {
  const svg = useRef<SVGSVGElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const selected = useRef(days.length - 1);
  const highlighted = useRef<SVGElement | null>(null);
  const { language } = useLanguage();
  const copy = gardenCopy[language];
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay();
  const columns = Math.ceil((days.length + offset) / 7);
  const month = new Intl.DateTimeFormat(language === "pt" ? "pt-BR" : "en-US", { month: "short", timeZone: "UTC" });
  useLayoutEffect(() => {
    selected.current = days.length - 1;
    highlighted.current?.classList.remove("is-selected");
    highlighted.current = null;
    if (scroll.current) scroll.current.scrollLeft = scroll.current.scrollWidth;
  }, [days]);
  function select(index: number, reveal = false) {
    if (index < 0 || index >= days.length) return;
    selected.current = index;
    const cell = svg.current?.querySelector<SVGElement>(`[data-day="${index}"]`) ?? null;
    if (highlighted.current !== cell) {
      highlighted.current?.classList.remove("is-selected");
      cell?.classList.add("is-selected");
      highlighted.current = cell;
    }
    if (reveal && cell && scroll.current) {
      const cellRect = cell.getBoundingClientRect();
      const frame = scroll.current.getBoundingClientRect();
      if (cellRect.left < frame.left + 8) scroll.current.scrollLeft -= frame.left + 8 - cellRect.left;
      else if (cellRect.right > frame.right - 8) scroll.current.scrollLeft += cellRect.right - frame.right + 8;
    }
    onSelect(days[index]);
  }
  function pointer(event: PointerEvent<SVGSVGElement>) {
    if (!(event.target instanceof SVGElement)) return;
    const index = event.target.dataset.day;
    if (index !== undefined) select(Number(index));
  }
  function keyboard(event: KeyboardEvent<SVGSVGElement>) {
    const changes: Record<string, number> = { ArrowLeft: -7, ArrowRight: 7, ArrowUp: -1, ArrowDown: 1 };
    let index = selected.current;
    if (event.key === "Home") index = 0;
    else if (event.key === "End") index = days.length - 1;
    else if (event.key in changes) index = Math.min(days.length - 1, Math.max(0, index + changes[event.key]));
    else return;
    event.preventDefault();
    select(index, true);
  }
  return (
    <div className="contribution-scroll" ref={scroll}>
      <svg ref={svg} className="contribution-calendar" viewBox={`0 0 ${columns * 18} 150`} role="group" aria-label={copy.chart} aria-describedby="calendar-help" tabIndex={0} onKeyDown={keyboard} onPointerOver={pointer} onPointerDown={pointer} onFocus={() => select(selected.current)}>
        {days.map((day, index) => {
          const date = new Date(`${day.date}T00:00:00Z`);
          const x = Math.floor((index + offset) / 7) * 18 + 2;
          const y = ((index + offset) % 7) * 18 + 25;
          return <g key={day.date}>
            {(index === 0 || date.getUTCDate() === 1) && <text x={x} y="16" className="contribution-month" aria-hidden="true">{month.format(date)}</text>}
            <rect className={`contribution-day level-${day.level}`} data-day={index} x={x} y={y} width="13" height="13" rx="2" aria-hidden="true" />
          </g>;
        })}
      </svg>
    </div>
  );
});

export default function ContributionGarden({ motion }: { motion: boolean }) {
  const { language } = useLanguage();
  const copy = gardenCopy[language];
  const [data, setData] = useState(initialContributions);
  const [selected, setSelected] = useState<ContributionDay | null>(null);
  const [failed, setFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [secret, setSecret] = useState(false);
  const [taps, setTaps] = useState(0);
  const trigger = useRef<HTMLButtonElement>(null);
  const clickTime = useRef(0);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const locale = language === "pt" ? "pt-BR" : "en-US";
  const date = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
  useEffect(() => {
    let active = true;
    loadContributions().then(next => { if (active) { setData(next); setSelected(null); } }).catch(() => { if (active) setFailed(true); });
    return () => { active = false; clearTimeout(tapTimer.current); };
  }, []);
  const selectDay = useCallback((day: ContributionDay) => setSelected(previous => previous?.date === day.date ? previous : day), []);
  const closeSecret = useCallback(() => { setSecret(false); trigger.current?.focus({ preventScroll: true }); }, []);
  async function retry() {
    if (loading) return;
    setLoading(true);
    try { setData(await loadContributions(true)); setFailed(false); setSelected(null); }
    catch { setFailed(true); }
    finally { setLoading(false); }
  }
  function discover() {
    const now = performance.now();
    const next = now - clickTime.current < 1600 ? taps + 1 : 1;
    clickTime.current = now;
    clearTimeout(tapTimer.current);
    if (next >= 3) { setSecret(true); setTaps(0); }
    else { setTaps(next); tapTimer.current = setTimeout(() => setTaps(0), 1600); }
  }
  const activeDay = selected ?? data.days.at(-1)!;
  return <>
    <div className="contribution-heading">
      <div><h2 id="contribution-title">{copy.title}</h2><p>{copy.description}</p></div>
      <button className="garden-secret" ref={trigger} onClick={discover} data-taps={taps} aria-label={copy.secret} title={copy.secret}>
        <MascotArtwork docked />
      </button>
    </div>
    <div className="contribution-summary"><p><strong>{data.total.toLocaleString(locale)}</strong> {copy.contributions}</p><a href="https://github.com/samuelsce" target="_blank" rel="noreferrer">@samuelsce</a></div>
    <Calendar days={data.days} onSelect={selectDay} />
    <div className="contribution-details">
      <p className="contribution-selected" role="status" aria-live="polite">{date.format(new Date(`${activeDay.date}T00:00:00Z`))}: <strong>{activeDay.count} {activeDay.count === 1 ? copy.singular : copy.plural}</strong></p>
      <div className="contribution-legend" aria-hidden="true"><span>{copy.less}</span>{[0,1,2,3,4].map(level => <i key={level} className={`level-${level}`} />)}<span>{copy.more}</span></div>
    </div>
    <p className="contribution-instructions" id="calendar-help">{copy.chartHelp}</p>
    <div className="contribution-footer"><p>{failed ? copy.saved : copy.updated} <time dateTime={data.fetchedAt}>{date.format(new Date(data.fetchedAt))}</time>{failed && <button onClick={retry} disabled={loading}>{loading ? copy.loading : copy.retry}</button>}</p><span className="contribution-swipe">{copy.slide}</span></div>
    {secret && <Suspense fallback={<span role="status">{copy.gameLoading}</span>}><SecretGarden motion={motion} onClose={closeSecret} /></Suspense>}
  </>;
}
