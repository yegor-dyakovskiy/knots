import { useEffect, useState, useRef, useCallback } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useGameStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import CountdownOverlay from "../../components/CountdownOverlay";
import "./levelNP1.css";

export default function LevelNP2() {
  const navigate = useNavigate();

  const {
    nodes: gameNodes,
    currentNodeIndex,
    nextNode,
    addResult,
    setLevel,
  } = useGameStore();

  // 🔹 Новая логика: ждём загрузки узлов, затем сбрасываем результаты и задаём сложность
useEffect(() => {
  // 🔹 При заходе на уровень полностью сбрасываем все результаты игры
  useGameStore.getState().resetGame(); 
}, []);

  // 🔹 Перемешиваем узлы один раз
  const [nodes] = useState(() => {
    if (!gameNodes?.length) return [];
    const arr = [...gameNodes];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  const [showCountdown, setShowCountdown] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showReadyButton, setShowReadyButton] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const timerRef = useRef(null);
  const currentNode = nodes[currentNodeIndex];
  const isLastNode = currentNodeIndex === nodes.length - 1;

  // 🔹 Устанавливаем ключ уровня
  useEffect(() => {
    if (currentNode) setLevel(`levelNP2-${currentNodeIndex + 1}`);
  }, [currentNodeIndex, currentNode, setLevel]);

  // 🔹 Сбрасываем CountdownOverlay при смене узла
  useEffect(() => {
    if (!currentNode) return;
    const t = setTimeout(() => {
      setShowCountdown(true);
      setShowReadyButton(false);
      setLastResult(null);
    }, 0);
    return () => clearTimeout(t);
  }, [currentNodeIndex, currentNode]);

  // Таймер
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    const started = Date.now();
    setShowReadyButton(true);
    setTimer(0);
    timerRef.current = setInterval(() => setTimer((Date.now() - started) / 1000), 50);
  }, []);

  // Кнопки
  const handleReady = useCallback(() => {
    clearInterval(timerRef.current);
    const result = timer.toFixed(2);
    addResult(result);
    setLastResult(result);
    setShowReadyButton(false);
  }, [timer, addResult]);

  const handleNext = useCallback(() => {
    if (!isLastNode) nextNode();
    else navigate("/final");
  }, [isLastNode, nextNode, navigate]);

  const handleRestart = useCallback(() => {
    setShowCountdown(true);
    setShowReadyButton(false);
    setLastResult(null);
  }, []);

  // Горячие клавиши
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showCountdown) return;

      if (e.key === "Enter") {
        if (showReadyButton) handleReady();
        else handleNext();
      }

      if (e.key === " ") {
        if (!showReadyButton) {
          e.preventDefault();
          handleRestart();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showCountdown, showReadyButton, handleReady, handleNext, handleRestart]);

  if (!currentNode) return <PageWrapper>Загрузка...</PageWrapper>;

  const isMobile = window.innerWidth < 900;

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>Назад</button>

      <PageWrapper>
        <div className="div-level-title">
          <h3>Узел {currentNodeIndex + 1} / {nodes.length}</h3>
          <h1>{currentNode.name}</h1>
        </div>

        <div className="knots-time-box">
          <div className="image-wrapper">
            <img src={currentNode.image} alt={currentNode.name} className="knot-img" />
          </div>

          <div className="time-box">
            {showCountdown && (
              <CountdownOverlay
                start={3}
                onComplete={() => {
                  setShowCountdown(false);
                  startTimer();
                }}
              />
            )}

            {!showCountdown && showReadyButton && (
              <>
                <div className="digital-timer">{timer.toFixed(2)}</div>
                <button className="knot-button" onClick={handleReady}>
                  Готово { !isMobile && "(Enter)" }
                </button>
              </>
            )}

            {lastResult && <p className="knot-result">Результат: {lastResult} сек</p>}

            {!showCountdown && !showReadyButton && (
              <>
                <button className="knot-button" onClick={handleRestart}>
                  Заново { !isMobile && "(Space)" }
                </button>
                <button className="knot-button" onClick={handleNext}>
                  {isLastNode
                    ? `Закончить тренировку${!isMobile ? " (Enter)" : ""}`
                    : `Следующий узел${!isMobile ? " (Enter)" : ""}`}
                </button>
              </>
            )}
          </div>
        </div>
      </PageWrapper>
    </>
  );
}
