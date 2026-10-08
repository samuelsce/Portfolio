export const creativeReactionEvent = "portfolio:creativereaction";
export type CreativeReaction = "discovery" | "typing" | "proud";
export function creativeReaction(kind: CreativeReaction) {
  window.dispatchEvent(new CustomEvent(creativeReactionEvent, { detail: kind }));
}
