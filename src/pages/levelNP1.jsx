import { useEffect, useState, useRef, useCallback } from "react";
import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import './levelNP1.css';

export default function LevelNP1() {
  const navigate = useNavigate();
  const { nodes: originalNodes, currentNodeIndex, nextNode, addResult, setLevel } = useGameStore();

  const [nodes, setNodes] = useState([]);
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(3);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);
  const [showReadyButton, setShowReadyButton] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  // Рандомный порядок узлов один раз при старте
useEffect(() => {
  const timeout = setTimeout(() => {
    const shuffled = [...originalNodes];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setNodes(shuffled);
  }, 0);

  return () => clearTimeout(timeout);
}, [originalNodes]);

  const currentNode = nodes[currentNodeIndex];
  const isLastNode = currentNodeIndex === nodes.length - 1;

  // Устанавливаем currentLevel для каждого узла
  useEffect(() => {
    if (currentNode) setLevel(`levelNP${currentNodeIndex + 1}`);
  }, [currentNodeIndex, currentNode, setLevel]);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    const startTime = Date.now();
    setShowReadyButton(true);
    setTimer(0);

    timerRef.current = setInterval(() => {
      setTimer((Date.now() - startTime) / 1000);
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

  // Старт отсчёта при смене узла
  useEffect(() => {
    if (!currentNode) return;
    const timeout = setTimeout(() => startCountdown(), 0);
    return () => {
      clearTimeout(timeout);
      clearInterval(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, [currentNodeIndex, currentNode, startCountdown]);

  const handleReady = useCallback(() => {
    clearInterval(timerRef.current);
    const result = timer.toFixed(2);
    addResult(result);
    setLastResult(result);
    setShowReadyButton(false);
  }, [timer, addResult]);

  const handleNext = useCallback(() => {
    if (!isLastNode) {
      nextNode();
    } else {
      navigate("/final");
    }
  }, [isLastNode, nextNode, navigate]);

  const handleRestart = useCallback(() => {
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);
    startCountdown();
  }, [startCountdown]);

  // Клавиши Enter и Space
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

  return (
    <>
    <div className="div-level-title">
    <h3>
        Узел {currentNodeIndex + 1} / {nodes.length}
      </h3>
      <h1>{currentNode.name}</h1>
    </div>
        <PageWrapper>
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
            {isLastNode ? "Закончить тренировку (Enter)" : "Следующий узел (Enter)"}
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
