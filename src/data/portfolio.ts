export const profile = {
  name: "Samuel Santos",
  fullName: "Samuel Santos Cerqueira",
  role: "Desenvolvedor full-stack",
  location: "Mauá, São Paulo, Brasil",
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
    "Fastify",
    "PostgreSQL",
    "SQL",
    "Supabase",
    "JavaScript",
    "Tailwind CSS",
    "HTML & CSS",
    "Git",
    "Vitest",
    "Playwright",
    "Docker",
    "GitHub Actions",
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
    category: "Produto próprio · Em produção",
    description:
      "SaaS de gestão e agendamento para barbearias, com clientes e usuários reais. Desenvolvo e mantenho o front-end em colaboração com a equipe de back-end.",
    tags: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Base UI"],
    repo: "",
    demo: "https://barberag.com.br/",
    note: "Evolução de funcionalidades e correção de problemas em uma operação real.",
    details:
      "Minha atuação inclui agenda, interfaces financeiras, dashboards e autenticação, com componentes reutilizáveis e acessíveis. Uso Context e Hooks para estado, Fetch API para integração e ExcelJS para relatórios. Também participo da publicação na Netlify, configuração de metadados e sitemap, com versionamento em equipe pelo Git e GitHub.",
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
    tags: ["React", "TypeScript", "Three.js", "Playwright"],
    repo: "https://github.com/samuelsce/RoomLab",
    demo: "https://samuelsce.github.io/RoomLab/",
    note: "Editor 2D e 3D com histórico de alterações e persistência local.",
    details:
      "Documento único para planta 2D e visualização 3D, com manipulação de objetos, desfazer/refazer, importação e exportação e compartilhamento por link. O projeto inclui responsividade, acessibilidade, testes com Playwright e publicação pelo GitHub Actions. O repositório documenta as decisões e os limites do editor.",
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
    tags: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma"],
    repo: "https://github.com/samuelsce/LinkWatch",
    demo: "",
    note: "Worker HTTP independente, histórico de latência e incidentes.",
    details:
      "Worker HTTP com concorrência e recuperação de reservas expiradas. A aplicação implementa sessões, isolamento entre contas, transações e proteção SSRF, com testes unitários, de integração e E2E usando Vitest e Playwright no GitHub Actions. O projeto tem avaliação local; hospedagem, OAuth real e validação de capacidade ainda estão pendentes.",
    image: "projects/linkwatch.png",
    imageAlt:
      "Captura da página inicial do LinkWatch, com serviços online, disponibilidade e gráfico de latência ilustrativos.",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    category: "Full-stack e cybersec · M6 validada",
    description:
      "Central de segurança com dashboard ao vivo, três detecções explicáveis e timeline de evidências. Integra uma aplicação real ao fluxo de ingestão, investigação e triagem.",
    tags: ["Next.js", "TypeScript", "Fastify", "Python", "PostgreSQL", "Docker"],
    repo: "https://github.com/samuelsce/Sentinel",
    demo: "",
    note: "SDK, API, worker e dashboard conectados, com evidências preservadas após retenção.",
    details:
      "Dashboard Next.js/React com filtros, paginação, triagem auditada e atualizações SSE. API Fastify e SDK Node.js com sessões revogáveis, papéis, CSRF, quotas e deduplicação. Worker Python com fila PostgreSQL durável, leases e recuperação; três regras versionadas explicam cada decisão. Snapshots preservam evidências após retenção privada com simulação. CI verifica testes, Semgrep, dependências e bundle. O laboratório confirmou 30.050 eventos sem perda, mas a meta de latência de ingestão permanece não atendida. Demo local reproduzível; resposta manual e publicação ainda planejadas.",
    image: "",
    imageAlt: "",
  },
] as const;
