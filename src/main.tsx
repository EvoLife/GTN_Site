
  import { createRoot } from "react-dom/client";
  import App from "./App";
  import "./index.css";
  import { LanguageProvider } from "./components/i18n/LanguageContext";

  createRoot(document.getElementById("root")!).render(
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
  