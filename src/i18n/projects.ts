import type { projects } from "../data/portfolio";

type ProjectCopy = Record<"category" | "description" | "note" | "details" | "imageAlt", string>;

export const englishProjects: Record<(typeof projects)[number]["id"], ProjectCopy> = {
  barberag: {
    category: "Own product · In production",
    description: "A management and booking SaaS for barbershops, with real customers and users. I develop and maintain the front end in collaboration with the back-end team.",
    note: "Feature development and bug fixes for a product in active use.",
    details: "My work covers scheduling, financial interfaces, dashboards and authentication, with reusable and accessible components. I use Context and Hooks for state, Fetch API for integration and ExcelJS for reports. I also contribute to Netlify deployment, metadata and sitemap configuration, with team version control through Git and GitHub.",
    imageAlt: "BarberAg homepage screenshot showing the management platform and a sample schedule.",
  },
  roomlab: {
    category: "Interaction & spatial exploration",
    description: "An interactive 2D and 3D editor for rooms and desk setups, with local persistence and sharing via links.",
    note: "A 2D and 3D editor with undo/redo history and local persistence.",
    details: "A single document powers the 2D floor plan and 3D view, with object manipulation, undo/redo, import and export and sharing via links. The project includes responsive layouts, accessibility, Playwright tests and deployment through GitHub Actions. The repository documents the editor’s design decisions and limitations.",
    imageAlt: "RoomLab editor screenshot: a 3D gaming room, object catalog and properties panel.",
  },
  linkwatch: {
    category: "Full-stack application",
    description: "An uptime monitor for websites and HTTP APIs, with a web application, independent worker, database and public status page.",
    note: "An independent HTTP worker, latency history and incidents.",
    details: "An HTTP worker with concurrency and recovery of expired reservations. The application implements sessions, account isolation, transactions and SSRF protection, with unit, integration and E2E tests using Vitest and Playwright in GitHub Actions. The project has been evaluated locally; hosting, real OAuth integration and capacity validation are still pending.",
    imageAlt: "LinkWatch homepage screenshot showing online services, uptime and a sample latency chart.",
  },
  sentinel: {
    category: "Full stack and cybersecurity · M6 validated",
    description: "A security workspace with a live dashboard, three explainable detections and evidence timelines. Connects a real application to ingestion, investigation and triage.",
    note: "A connected SDK, API, worker and dashboard, with evidence preserved after retention.",
    details: "A Next.js/React dashboard with filters, pagination, audited triage and SSE updates. Fastify API and Node.js SDK with revocable sessions, roles, CSRF, quotas and deduplication. A Python worker uses a durable PostgreSQL queue, leases and recovery; three versioned rules explain each decision. Snapshots preserve evidence after private retention with a dry run. CI verifies tests, Semgrep, dependencies and the public bundle. The lab confirmed 30,050 events without loss, but the ingestion latency target remains unmet. A reproducible local demo; manual response and hosting are still planned.",
    imageAlt: "",
  },
};

export const englishAcademicProject: Record<"description" | "contribution", string> = {
  description: "A recipe platform with AI generation based on available ingredients, sharing, favorites and ratings. My first project, developed with a team as our final course project.",
  contribution: "I mainly worked on the front end with HTML, CSS and JavaScript, with occasional contributions in Python and Django.",
};
