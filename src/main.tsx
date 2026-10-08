import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import App from "./App";
import { LanguageProvider } from "./i18n/LanguageProvider";
import "./styles.css";
import "./refinements.css";
import "./mascot.css";
import "./mascot-adventures.css";
import "./mascot-finish.css";
import "./polish.css";
import "./contributions.css";
import "./creative.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>,
);
