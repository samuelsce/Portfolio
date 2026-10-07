import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { gardenCopy } from "../i18n/garden";
import LazyLoadBoundary, { LoadFailure } from "./LazyLoadBoundary";
const ContributionGarden = lazy(() => import("./ContributionGarden"));

export default function DeferredContributions({ motion }: { motion: boolean }) {
  const section = useRef<HTMLElement>(null);
  const [ready, setReady] = useState(false);
  const { language } = useLanguage();
  useEffect(() => {
    if (!section.current || ready) return;
    if (!("IntersectionObserver" in window)) { setReady(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      observer.disconnect();
    }, { rootMargin: "350px" });
    observer.observe(section.current);
    return () => observer.disconnect();
  }, [ready]);
  const placeholder = <div className="garden-placeholder" aria-label={gardenCopy[language].loading} aria-busy="true" />;
  return (
    <section ref={section} id="atividade" className="contribution-section section-shell" aria-labelledby={ready ? "contribution-title" : undefined}>
      {ready ? <LazyLoadBoundary fallback={<LoadFailure />}><Suspense fallback={placeholder}><ContributionGarden motion={motion} /></Suspense></LazyLoadBoundary> : placeholder}
    </section>
  );
}
