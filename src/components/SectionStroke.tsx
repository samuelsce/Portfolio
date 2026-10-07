import { memo, useEffect, useRef } from "react";

// Observe entry and departure separately so small scroll reversals cannot replay it.
const SectionStroke = memo(function SectionStroke({ motion }: { motion: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!motion) {
      node.dataset.drawn = "true";
      return;
    }
    if (!("IntersectionObserver" in window)) {
      node.dataset.drawn = "true";
      return;
    }
    const title = node.parentElement!;
    let inView = false;
    let ready = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    node.dataset.drawn = "false";
    function schedule() {
      if (!inView || !ready) {
        clearTimeout(timer);
        timer = undefined;
        return;
      }
      if (node!.dataset.drawn === "true" || timer !== undefined) return;
      // Give the title time to register before drawing its accent.
      timer = setTimeout(() => {
        timer = undefined;
        node!.dataset.drawn = "true";
      }, 220);
    }
    const departure = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (!inView && node.dataset.drawn !== "false") node.dataset.drawn = "false";
      schedule();
    }, { rootMargin: "-110px 0px 0px 0px" });
    let arrival: IntersectionObserver;
    let viewportHeight = window.innerHeight;
    function observeArrival() {
      arrival?.disconnect();
      ready = false;
      schedule();
      // IO percentage margins are based on width, so use height-based pixels.
      arrival = new IntersectionObserver(([entry]) => {
        ready = entry.isIntersecting && entry.intersectionRatio >= 0.999;
        schedule();
      }, { rootMargin: `-110px 0px -${Math.round(viewportHeight * 0.35)}px 0px`, threshold: 1 });
      arrival.observe(title);
    }
    function resize() {
      if (viewportHeight === window.innerHeight) return;
      viewportHeight = window.innerHeight;
      observeArrival();
    }
    departure.observe(title);
    observeArrival();
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      clearTimeout(timer);
      departure.disconnect();
      arrival.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [motion]);

  return (
    <svg ref={ref} className="section-stroke" viewBox="0 0 460 30" fill="none" aria-hidden="true">
      <path className="section-stroke-line" pathLength="1" d="M4 18C108 6 266 8 418 15" />
      <path className="section-stroke-flourish" pathLength="1" d="M326 23l91-8" />
      <g className="section-stroke-spark">
        <path d="m441 2 2 8 8-4-5 7 10 3-10 2 5 8-8-5-2 9-2-9-8 5 5-8-9-2 9-3-5-7 8 4Z" fill="currentColor" />
      </g>
    </svg>
  );
});

export default SectionStroke;
