import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ResultsPage from "./ResultsPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ResultsPage />
  </StrictMode>
);
