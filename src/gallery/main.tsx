import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "../index.css"
import ComponentsGallery from "./ComponentsGallery"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ComponentsGallery />
  </StrictMode>
)
