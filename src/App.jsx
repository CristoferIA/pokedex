import "./App.css";
import { Routes, Route } from "react-router-dom";
import Pokedex from "./pages/Pokedex";
import Home from "./pages/Home";
import PokedexInfo from "./pages/PokedexInfo";
import NotFunt from "./components/NotFunt";
import ProtectedRoutes from "./pages/ProtectedRoutes";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="pokedex" element={<Pokedex />} />
          <Route path="pokedex/:id" element={<PokedexInfo />} />
          <Route path="/notfund" element={<NotFunt />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
