import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./screens/Home";
import { Committee } from "./screens/Committee";
import { Events } from "./screens/Events";
import { BrowserRouter, Routes,Route } from "react-router-dom";
import { Gallery } from "./screens/Gallery";
createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
