import type { projects } from "../data/portfolio";

type ProjectCopy = Record<"category" | "description" | "note" | "details" | "imageAlt", string>;

export const englishProjects: Record<(typeof projects)[number]["id"], ProjectCopy> = {
  barberag: {
    category: "Team front-end development · Live product",
    description: "A management and booking platform for barbershops. I work on the front end and user experience in collaboration with the back-end team.",
    note: "Interfaces, user flows and REST API integration.",
    details: "My work covers scheduling, financial interfaces, dashboards and authentication. I use Context and Hooks for state, Fetch API for back-end integration and ExcelJS for report exports. Accessible components are built with Base UI, in collaboration with the back-end team.",
    imageAlt: "BarberAg homepage screenshot showing the management platform and a sample schedule.",
  },
  roomlab: {
    category: "Interaction & spatial exploration",
    description: "An interactive 2D and 3D editor for rooms and desk setups, with local persistence and sharing via links.",
    note: "From idea to visualization, right in the browser.",
    details: "A single document powers the 2D floor plan and 3D view, with undo/redo history, local persistence and sharing via links. The repository documents the editor’s design decisions and limitations.",
    imageAlt: "RoomLab editor screenshot: a 3D gaming room, object catalog and properties panel.",
  },
  linkwatch: {
    category: "Full-stack application",
    description: "An uptime monitor for websites and HTTP APIs, with a web application, independent worker, database and public status page.",
    note: "Technical information that helps explain what happened.",
    details: "The web application, independent worker and public status page are implemented. The project has been evaluated locally; hosting, real OAuth integration and capacity validation are still pending.",
    imageAlt: "LinkWatch homepage screenshot showing online services, uptime and a sample latency chart.",
  },
};

export const englishAcademicProject: Record<"description" | "contribution", string> = {
  description: "A recipe platform with AI generation based on available ingredients, sharing, favorites and ratings. My first project, developed with a team as our final course project.",
  contribution: "I mainly worked on the front end with HTML, CSS and JavaScript, with occasional contributions in Python and Django.",
};
