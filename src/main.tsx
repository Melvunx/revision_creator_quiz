import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { NavBar } from "./components/NavBar";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NavBar />
    <App />
  </StrictMode>,
);
