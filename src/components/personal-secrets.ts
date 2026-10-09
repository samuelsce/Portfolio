export const personalTopics = ["voyage", "ghosts", "basketball", "blocks", "valorant", "bahia", "toddy"] as const;
export type PersonalTopic = typeof personalTopics[number];
const words: Record<string, PersonalTopic> = {
  onepiece: "voyage", luffy: "voyage", naruto: "voyage", chapeudepalha: "voyage",
  ghosts: "ghosts", michaeljackson: "ghosts", mj: "ghosts", moonwalk: "ghosts",
  basquete: "basketball", basketball: "basketball", kyrie: "basketball", cash: "basketball",
  minecraft: "blocks", bedwars: "blocks", skywars: "blocks", "189": "blocks",
  valorant: "valorant", ascendente: "valorant", ascendant: "valorant",
  bahia: "bahia", acaraje: "bahia", yakisoba: "bahia", camarao: "bahia", shrimp: "bahia",
  toddy: "toddy",
};
export function personalWord(value: string): PersonalTopic | undefined {
  return words[value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "")];
}
