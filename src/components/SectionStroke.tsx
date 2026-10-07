import { memo, useEffect, useRef } from "react";

// A single drawn accent, triggered on entry rather than updated on every scroll.
const SectionStroke = memo(function SectionStroke({ motion }: { motion: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || !motion || node.dataset.drawn === "true") return;
    if (!("IntersectionObserver" in window)) {
      node.dataset.drawn = "true";
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      node.dataset.drawn = "true";
      observer.disconnect();
    }, { rootMargin: "-110px 0px -12% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [motion]);

  return (
    <svg ref={ref} className="section-stroke" viewBox="0 0 460 30" fill="none" aria-hidden="true">
      <path className="section-stroke-line" pathLength="1" d="M4 18C108 6 266 8 418 15M326 23l91-8" />
      <g className="section-stroke-spark">
        <path d="m441 2 2 8 8-4-5 7 10 3-10 2 5 8-8-5-2 9-2-9-8 5 5-8-9-2 9-3-5-7 8 4Z" fill="currentColor" />
      </g>
    </svg>
  );
});

export default SectionStroke;
