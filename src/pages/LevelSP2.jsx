import { useEffect, useState, useRef, useCallback } from "react";
import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import "./levelNP1.css"; // оставляем тот же CSS, если стили одинаковы

export default function LevelSP2() {
  const navigate = useNavigate();

  const {
    nodes: gameNodes,
    currentNodeIndex,
    nextNode,
    addResult,
    setLevel,
    setDifficulty,
  } = useGameStore();

  // ============================================================
  // 1) Устанавливаем сложность hard при монтировании
  // ============================================================
  useEffect(() => {
    setDifficulty("hard2");
  }, [setDifficulty]);

  // ============================================================
  // 2) Однократно перемешиваем узлы
  // ============================================================
  const [nodes] = useState(() => {
    if (!gameNodes || !gameNodes.length) return [];
    const arr = [...gameNodes];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });

  // ============================================================
  // Локальные состояния
  // ============================================================
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(0);
  const [showReadyButton, setShowReadyButton] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const currentNode = nodes[currentNodeIndex];
  const isLastNode = currentNodeIndex === nodes.length - 1;

  // ============================================================
  // Устанавливаем ключ для результатов
  // ============================================================
  useEffect(() => {
    if (currentNode) {
      setLevel(`levelSP2-${currentNodeIndex + 1}`);
    }
  }, [currentNodeIndex, currentNode, setLevel]);

  // ============================================================
  // Таймер
  // ============================================================
  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    const started = Date.now();
    setShowReadyButton(true);
    setTimer(0);

    timerRef.current = setInterval(() => {
      setTimer((Date.now() - started) / 1000);
    }, 50);
  }, []);

  const startCountdown = useCallback(() => {
    clearInterval(countdownRef.current);
    setShowCountdown(true);
    setCountdown(3);
    setShowReadyButton(false);
    setLastResult(null);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setShowCountdown(false);
          startTimer();
        }
        return prev - 1;
      });
    }, 1000);
  }, [startTimer]);

  useEffect(() => {
    if (!currentNode) return;
    const t = setTimeout(() => startCountdown(), 0);

    return () => {
      clearTimeout(t);
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, [currentNodeIndex, currentNode, startCountdown]);

  // ============================================================
  // Кнопки
  // ============================================================
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
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);
    startCountdown();
  }, [startCountdown]);

  // ============================================================
  // Горячие клавиши
  // ============================================================
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

  // ============================================================
  // UI
  // ============================================================
  if (!currentNode) return <PageWrapper>Загрузка...</PageWrapper>;

  return (
    <>
      <button className="back-button" onClick={() => navigate(-1)}>
        Назад
      </button>

      <PageWrapper>
        <div className="div-level-title">
          <h3>
            Узел {currentNodeIndex + 1} / {nodes.length}
          </h3>
          <h1>{currentNode.name}</h1>
        </div>

        <div>
          <img
            src={currentNode.image}
            alt={currentNode.name}
            style={{ width: "300px", margin: "20px 0" }}
          />
        </div>

        <div>
          {showCountdown && <p>Будьте готовы через: {countdown} сек</p>}

          {!showCountdown && showReadyButton && (
            <>
              <p>Секундомер: {timer.toFixed(2)} сек</p>
              <button onClick={handleReady}>Готово (Enter)</button>
            </>
          )}

          {!showCountdown && !showReadyButton && (
            <>
              <button onClick={handleRestart}>Заново (Space)</button>
              <button onClick={handleNext}>
                {isLastNode
                  ? "Закончить тренировку (Enter)"
                  : "Следующий узел (Enter)"}
              </button>
            </>
          )}

          {lastResult && (
            <p style={{ marginTop: "10px", fontWeight: "bold" }}>
              Результат: {lastResult} сек
            </p>
          )}
        </div>
      </PageWrapper>
    </>
  );
}
