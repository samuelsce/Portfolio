type IconName =
  | "sun"
  | "moon"
  | "asterisk"
  | "image"
  | "check"
  | "copy"
  | "reset"
  | "link"
  | "plus"
  | "minus"
  | "close"
  | "down";

export default function Icon({ name }: { name: IconName }) {
  return (
    <svg
      className="ui-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {name === "sun" && (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      )}
      {name === "moon" && (
        <path d="M20.5 14A8.6 8.6 0 0 1 10 3.5 8.6 8.6 0 1 0 20.5 14Z" />
      )}
      {name === "asterisk" && (
        <path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" />
      )}
      {name === "image" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8" cy="9" r="1.5" />
          <path d="m3 17 5-5 4 4 4-6 5 7" />
        </>
      )}
      {name === "check" && <path d="m5 12 4 4L19 6" />}
      {name === "copy" && (
        <>
          <rect x="8" y="8" width="12" height="13" rx="2" />
          <path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" />
        </>
      )}
      {name === "reset" && (
        <path d="M4 10a8 8 0 1 1 1 7M4 4v6h6" />
      )}
      {name === "link" && (
        <path d="m10 8 3-3a4 4 0 0 1 6 6l-3 3M14 16l-3 3a4 4 0 0 1-6-6l3-3M8 16l8-8" />
      )}
      {name === "plus" && <path d="M12 5v14M5 12h14" />}
      {name === "minus" && <path d="M5 12h14" />}
      {name === "close" && <path d="m6 6 12 12M6 18 18 6" />}
      {name === "down" && <path d="M12 4v16m-6-6 6 6 6-6" />}
    </svg>
  );
}
