import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../index.css"
import BestPracticePage from "./BestPracticePage"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BestPracticePage />
  </StrictMode>
)
