export type MomentKind = "voyage" | "ghosts" | "toddy" | "aim";
export type GameKind = "basketball" | "blocks";
export type SecretKind = MomentKind | GameKind;
export type SecretRequest = { kind: SecretKind; source: HTMLElement | SVGElement; id: number };
export type ActorPoint = { x: number; y: number; size: number };
export type ActorClaim = { root: HTMLElement; origin: ActorPoint; release: (point: ActorPoint) => void };
export type ActorRequest = { kind: MomentKind; cancel: () => void; claim?: ActorClaim };
export const actorRequestEvent = "portfolio:actorrequest";
export function claimActor(kind: MomentKind, cancel: () => void): ActorClaim | undefined {
  const request: ActorRequest = { kind, cancel };
  window.dispatchEvent(new CustomEvent(actorRequestEvent, { detail: request }));
  return request.claim;
}
