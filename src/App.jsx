import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useGameStore } from "./store/store";
import StartScreen from "./pages/StartScreen";
import LevelScreen from "./pages/LevelScreen";
import LevelNP1 from "./pages/levelNP1";
import LevelNP2 from "./pages/LevelNP2";
import LevelSP1 from "./pages/LevelSP1";
import LevelSP2 from "./pages/LevelSP2";
import FinalScreen from "./pages/FinalScreen";

// Функция предзагрузки изображений
const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = resolve;
    img.onerror = resolve;
  });

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<StartScreen />} />
        <Route path="/level" element={<LevelScreen />} />
        <Route path="/game/levelNP1" element={<LevelNP1 />} />
        <Route path="/game/levelNP2" element={<LevelNP2 />} />
        <Route path="/game/levelSP1" element={<LevelSP1 />} />
        <Route path="/game/levelSP2" element={<LevelSP2 />} />
        <Route path="/final" element={<FinalScreen />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const levels = useGameStore((state) => state.levels);
  const loading = useGameStore((state) => state.loading);
  const setLoading = useGameStore((state) => state.setLoading);

  // Прелоадер картинок
  useEffect(() => {
    const allImages = Object.values(levels).flat().map((i) => i.image);

    Promise.all(allImages.map(preloadImage)).then(() => {
      setLoading(false);
    });
  }, [levels, setLoading]);

  // Пока грузятся изображения — показываем экран загрузки
  if (loading) {
    return (
      <div style={styles.loaderScreen}>
        <div style={styles.loader}></div>
        <p style={{ marginTop: 12 }}>Загружаем ресурсы…</p>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

const styles = {
  loaderScreen: {
    width: "100vw",
    height: "100vh",
    background: "#0e1b2c",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontFamily: "sans-serif",
  },
  loader: {
    width: "60px",
    height: "60px",
    border: "6px solid rgba(255, 255, 255, 0.3)",
    borderTopColor: "#fff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};
