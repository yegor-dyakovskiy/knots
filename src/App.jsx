import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import StartScreen from "./pages/StartScreen";
import LevelScreen from "./pages/LevelScreen";
import LevelNP1 from "./pages/levelNP1";
import LevelNP2 from "./pages/LevelNP2";
import FinalScreen from "./pages/FinalScreen"; // <-- добавляем финальный экран

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<StartScreen />} />
        <Route path="/level" element={<LevelScreen />} />
        <Route path="/game/levelNP1" element={<LevelNP1 />} />
        <Route path="/game/levelNP2" element={<LevelNP2 />} />
        <Route path="/final" element={<FinalScreen />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}
