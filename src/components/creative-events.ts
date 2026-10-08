export const creativeReactionEvent = "portfolio:creativereaction";
export type CreativeReaction = "discovery" | "typing" | "proud" | "coffee";
export function creativeReaction(kind: CreativeReaction) {
  window.dispatchEvent(new CustomEvent(creativeReactionEvent, { detail: kind }));
}
