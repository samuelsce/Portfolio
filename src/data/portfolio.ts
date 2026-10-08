export const profile = {
  name: "Samuel Santos",
  fullName: "Samuel Santos Cerqueira",
  role: "Desenvolvedor full-stack",
  location: "São Paulo, Brasil",
  github: "https://github.com/samuelsce",
  githubHandle: "@samuelsce",
  // Preencha seus contatos reais para exibir os links automaticamente.
  email: "samuelsantosmft7@gmail.com",
  linkedin: "https://www.linkedin.com/in/samuelsce/",
  technologies: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "JavaScript",
    "Tailwind CSS",
    "HTML & CSS",
    "Git",
  ],
};

export const academicProject = {
  name: "Recette",
  repo: "https://github.com/Gab-sousa/recette-web",
  description:
    "Plataforma de receitas com geração por IA a partir dos ingredientes disponíveis, compartilhamento, favoritos e avaliações. Meu primeiro projeto, desenvolvido como TCC em equipe.",
  contribution:
    "Atuei principalmente no front-end com HTML, CSS e JavaScript, com contribuições pontuais em Python e Django.",
  technologies: ["HTML", "CSS", "JavaScript", "Django"],
};

export const projects = [
  {
    id: "barberag",
    name: "BarberAg",
    category: "Front-end em equipe · Produto em produção",
    description:
      "Plataforma de gestão e agendamento para barbearias. Atuo no front-end e na experiência de uso, em colaboração com a equipe de back-end.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Base UI"],
    repo: "",
    demo: "https://barberag.com.br/",
    note: "Interfaces, fluxos e integração com APIs REST.",
    details:
      "Minha atuação inclui agenda, interfaces financeiras, dashboards e autenticação. Uso Context e Hooks para estado, Fetch API para integração com o back-end e ExcelJS para exportar relatórios. Componentes acessíveis são construídos com Base UI, em colaboração com a equipe de back-end.",
    image: "projects/barberag.jpg",
    imageAlt:
      "Captura da página inicial do BarberAg, com apresentação da gestão e agenda demonstrativa.",
  },
  {
    id: "roomlab",
    name: "RoomLab",
    category: "Interação & exploração espacial",
    description:
      "Editor interativo de quartos e setups em 2D e 3D, com persistência local e compartilhamento por link.",
    tags: ["React", "TypeScript", "Three.js"],
    repo: "https://github.com/samuelsce/RoomLab",
    demo: "https://samuelsce.github.io/RoomLab/",
    note: "Da ideia à visualização, direto no navegador.",
    details:
      "Documento único para planta 2D e visualização 3D, histórico de desfazer/refazer, persistência local e compartilhamento por link. O repositório documenta as decisões e os limites do editor.",
    image: "projects/roomlab.png",
    imageAlt:
      "Captura real do editor RoomLab: quarto gamer em 3D, catálogo de objetos e painel de propriedades.",
  },
  {
    id: "linkwatch",
    name: "LinkWatch",
    category: "Aplicação full-stack",
    description:
      "Monitor de disponibilidade para sites e APIs HTTP, com aplicação web, worker independente, banco de dados e página pública de status.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    repo: "https://github.com/samuelsce/LinkWatch",
    demo: "",
    note: "Informação técnica que ajuda a entender o que aconteceu.",
    details:
      "Aplicação web, worker independente e página pública de status implementados. O projeto tem avaliação local; hospedagem, OAuth real e validação de capacidade ainda estão pendentes.",
    image: "projects/linkwatch.png",
    imageAlt:
      "Captura da página inicial do LinkWatch, com serviços online, disponibilidade e gráfico de latência ilustrativos.",
  },
] as const;
