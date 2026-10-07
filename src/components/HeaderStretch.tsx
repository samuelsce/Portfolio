export type HeaderSurface = {
  expanded: boolean;
  covered: boolean;
  action?: "idle" | "pull" | "push";
};

/** The page mascot orchestrates the surface; the links never move. */
export default function HeaderStretch({
  expanded,
  covered,
  action = "idle",
}: HeaderSurface) {
  return (
    <div
      className="header-stretch"
      data-expanded={expanded}
      data-covered={covered}
      data-action={action}
      aria-hidden="true"
    >
      <div className="header-paper" />
    </div>
  );
}
