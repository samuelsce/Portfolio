export type RigPoint = { x: number; y: number };
const number = (n: number) => n.toFixed(4);

// A fixed-length two-bone limb. Return transforms only; all geometry is solved
// before native animation begins, rather than reading layout every frame.
export function limbPose(hip: RigPoint, end: RigPoint, length: number, bendDirection = 1) {
  const dx = end.x - hip.x, dy = end.y - hip.y;
  const distance = Math.max(.01, Math.hypot(dx, dy));
  const bend = Math.sqrt(Math.max(0, length * length - distance * distance / 4)) * bendDirection;
  const knee = { x: (hip.x + end.x) / 2 + dy / distance * bend, y: (hip.y + end.y) / 2 - dx / distance * bend };
  const thigh = Math.atan2(knee.y - hip.y, knee.x - hip.x) * 180 / Math.PI - 90;
  const shin = Math.atan2(end.y - knee.y, end.x - knee.x) * 180 / Math.PI - 90;
  return {
    thigh: `translate(${number(hip.x)}px,${number(hip.y)}px) rotate(${number(thigh)}deg)`,
    shin: `translate(${number(knee.x)}px,${number(knee.y)}px) rotate(${number(shin)}deg)`,
  };
}
