export function GitHubIcon() {
  return <svg className="icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.5v-2.1c-3.4.7-4.1-1.5-4.1-1.5-.5-1.3-1.3-1.6-1.3-1.6-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.8-.3-5.7-1.4-5.7-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.7 1.6.3 2.9.2 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.9 5.8-5.7 6.1.5.4.8 1.1.8 2.2V22c0 .3.2.6.8.5A11.1 11.1 0 0 0 12 .9Z" /></svg>;
}

export function LinkedInIcon() {
  return <svg className="icon" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 2h20v20H2V2Zm4 6v11h3V8H6Zm1.5-4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM11 8v11h3v-6c0-3 3-3 3 0v6h3v-7c0-5-5-5-6-2V8h-3Z" /></svg>;
}

export function PixelDocument({ terminal = false }: { terminal?: boolean }) {
  return <svg className="pixel-document" width="64" height="64" viewBox="0 0 32 32" fill="none" shapeRendering="crispEdges" aria-hidden="true">
    {terminal ? <>
      <path d="M3 5h26v20H3z" fill="#202A22" stroke="#86B394" />
      <path d="M6 8h20v13H6z" fill="#0C100D" />
      <path d="m9 11 3 3-3 3" stroke="#86B394" />
      <path className="terminal-cursor" d="M15 17h5" stroke="#86B394" />
      <path d="M12 26h8v3H9v-1h14" stroke="#596D5C" />
    </> : <>
      <path d="M7 6h17v23H5V8h2z" fill="#425D47" stroke="#86B394" />
      <path d="M9 3h13l5 5v18H9z" fill="#DDDCC0" stroke="#676F59" />
      <path d="M22 3v5h5" stroke="#676F59" />
      <path className="document-lines" d="M12 11h11m-11 4h11m-11 4h11m-11 4h7" stroke="#7F947B" />
    </>}
  </svg>;
}
