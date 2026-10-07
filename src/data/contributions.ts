import snapshot from "./contributions-snapshot.json";

export type ContributionDay = { date: string; count: number; level: number };
export type Contributions = { total: number; fetchedAt: string; days: ContributionDay[] };
const key = "samuel-studio-contributions-v1";
const hour = 60 * 60 * 1000;
const endpoint = "https://github-contributions-api.jogruber.de/v4/samuelsce?y=last";
let pending: Promise<Contributions> | null = null;
let latest: Contributions | null = null;

export function validateContributions(value: unknown): value is Contributions {
  if (!value || typeof value !== "object") return false;
  const data = value as Contributions;
  if (!Number.isInteger(data.total) || data.total < 0 || data.total > 1000000 ||
      typeof data.fetchedAt !== "string" || !Number.isFinite(Date.parse(data.fetchedAt)) ||
      !Array.isArray(data.days) || data.days.length < 350 || data.days.length > 371) return false;
  let previous = 0;
  for (const day of data.days) {
    if (!day || typeof day.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(day.date) ||
        !Number.isInteger(day.count) || day.count < 0 || day.count > 100000 ||
        !Number.isInteger(day.level) || day.level < 0 || day.level > 4) return false;
    const time = Date.parse(`${day.date}T00:00:00Z`);
    if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== day.date ||
        (previous && time - previous !== 86400000)) return false;
    previous = time;
  }
  // The calendar includes complete weeks; the annual counter can exclude their extra days.
  return true;
}
export function initialContributions(): Contributions {
  if (latest) return latest;
  try {
    const cached: unknown = JSON.parse(localStorage.getItem(key) ?? "null");
    if (validateContributions(cached) && Date.parse(cached.fetchedAt) <= Date.now()) return cached;
  } catch { /* Public snapshot remains available when storage is blocked. */ }
  return snapshot;
}
export function loadContributions(force = false): Promise<Contributions> {
  if (pending) return pending;
  const cached = initialContributions();
  if (!force && Date.now() - Date.parse(cached.fetchedAt) < hour) return Promise.resolve(cached);
  pending = (async () => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7000);
    try {
      const response = await fetch(endpoint, { signal: controller.signal, credentials: "omit" });
      if (!response.ok) throw new Error("Contribution service unavailable");
      const raw = await response.json();
      const data: unknown = { total: raw?.total?.lastYear, days: raw?.contributions, fetchedAt: new Date().toISOString() };
      if (!validateContributions(data)) throw new Error("Invalid contribution data");
      latest = data;
      try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* In-memory cache still works. */ }
      return data;
    } finally { clearTimeout(timer); pending = null; }
  })();
  return pending;
}
