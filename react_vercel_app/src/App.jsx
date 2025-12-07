import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Favorites from "./pages/favorites/Favorites";


export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 20, display: "flex", gap: 20 }}>
        <Link to="/">Home</Link>
        <Link to="/favoritos">Favoritos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalhes" element={<Details />} />
        <Route path="/favoritos" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}
