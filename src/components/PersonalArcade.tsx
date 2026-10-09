import { lazy, Suspense } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import { personalCopy } from "../i18n/personal";
import type { GameKind } from "./personal-secrets";
import { ThreePointGame } from "./PersonalGames";
import ArcadeDialog from "./ArcadeDialog";

const SkyJumpGame = lazy(() => import("./SkyJumpGame"));

export default function PersonalArcade({ kind, motion, onClose }: { kind: GameKind; motion: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  const c = personalCopy[language];
  return <ArcadeDialog kind={kind} title={c[kind].title} motion={motion} onClose={onClose}>
    {kind === "basketball" ? <ThreePointGame motion={motion} /> : <Suspense fallback={<div className="personal-stage" aria-busy="true" />}><SkyJumpGame motion={motion} /></Suspense>}
  </ArcadeDialog>;
}
