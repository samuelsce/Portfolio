import { useLanguage } from "../i18n/LanguageProvider";
import ArcadeDialog from "./ArcadeDialog";
import AimChallenge from "./AimChallenge";

export default function AimDialog({ motion, onClose }: { motion: boolean; onClose: () => void }) {
  const { language } = useLanguage();
  return <ArcadeDialog kind="aim" title={language === "pt" ? "Treino de mira." : "Aim practice."} motion={motion} onClose={onClose} closeOnHidden>
    <div className="aim-arena"><AimChallenge onDone={onClose} /></div>
  </ArcadeDialog>;
}
