import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./screens/Home";
import { Committee } from "./screens/Committee";
import { Events } from "./screens/Events";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Gallery } from "./screens/Gallery";
import { Test } from "./portal/test";


const App = () => (
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/committee" element={<Committee />} />
        <Route path="/events" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/portal/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

if (typeof document !== 'undefined') {
  const container = document.getElementById("app");
  if (container) {
    createRoot(container).render(<App />);
  }
}

export default App;
