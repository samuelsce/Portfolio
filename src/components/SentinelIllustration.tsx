import { useLanguage } from "../i18n/LanguageProvider";

export default function SentinelIllustration() {
  const { t } = useLanguage();
  return (
    <div className="sentinel-panel" role="img" aria-label={t.sentinelDiagramLabel}>
      <div className="sentinel-heading">{t.sentinelFlow}</div>
      <div className="sentinel-flow" aria-hidden="true">
        <div className="sentinel-node">
          <strong>SDK</strong>
          <span>Node.js</span>
        </div>
        <FlowArrow />
        <div className="sentinel-node sentinel-api">
          <strong>API</strong>
          <span>Fastify</span>
        </div>
        <FlowArrow />
        <div className="sentinel-node">
          <strong>{t.sentinelData}</strong>
          <span>PostgreSQL</span>
        </div>
      </div>
      <div className="sentinel-capabilities" aria-hidden="true">
        <div>
          <span>{t.sentinelAuth}</span>
          <span>{t.sentinelAuthValue}</span>
        </div>
        <div>
          <span>{t.sentinelValidation}</span>
          <span>Zod</span>
        </div>
        <div>
          <span>{t.sentinelPersistence}</span>
          <span>{t.sentinelTransaction}</span>
        </div>
      </div>
    </div>
  );
}

function FlowArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 12h17m-6-6 6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle className="sentinel-packet" cx="3" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}
