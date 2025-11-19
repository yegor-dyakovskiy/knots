import { useEffect, useState, useRef } from "react";
import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";

export default function LevelNP1() {
  const { nodes, currentNodeIndex, nextNode, addResult } = useGameStore();

  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);       // секундомер
  const countdownRef = useRef(null);   // отсчёт 5 секунд
  const [showReadyButton, setShowReadyButton] = useState(false);
  const [lastResult, setLastResult] = useState(null);

  const currentNode = nodes[currentNodeIndex];

  // Секундомер
  const startTimer = () => {
    clearInterval(timerRef.current); // очищаем старый, если есть
    const startTime = Date.now();
    setShowReadyButton(true);
    setTimer(0);

    timerRef.current = setInterval(() => {
      setTimer((Date.now() - startTime) / 1000);
    }, 50);
  };

  // 5-секундный отсчёт перед стартом
  const startCountdown = () => {
    clearInterval(countdownRef.current); // очищаем старый countdown
    setShowCountdown(true);
    setCountdown(5);
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
  };

useEffect(() => {
  // всё делаем через setTimeout, чтобы React не ругался
  const timeout = setTimeout(() => {
    // очищаем предыдущие интервалы
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);

    // старт отсчёта
    setShowCountdown(true);
    setCountdown(5);
    setShowReadyButton(false);
    setLastResult(null);

    countdownRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          setShowCountdown(false);
          startTimer(); // запускаем секундомер
        }
        return prev - 1;
      });
    }, 1000);
  }, 0);

  return () => {
    clearTimeout(timeout);
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);
  };
}, [currentNodeIndex]);


  const handleReady = () => {
    clearInterval(timerRef.current);
    const result = timer.toFixed(2);
    addResult(result);
    setLastResult(result);
    setShowReadyButton(false);
  };

  const handleNext = () => nextNode();

  const handleRestart = () => {
    clearInterval(timerRef.current);
    clearInterval(countdownRef.current);
    startCountdown();
  };

  return (
    <PageWrapper>
      <h1>{currentNode.name}</h1>
      <img
        src={currentNode.image}
        alt={currentNode.name}
        style={{ width: "300px", margin: "20px 0" }}
      />

      {showCountdown && <p>Подумайте: {countdown} сек</p>}

      {!showCountdown && showReadyButton && (
        <>
          <p>Секундомер: {timer.toFixed(2)} сек</p>
          <button onClick={handleReady}>Готово</button>
        </>
      )}

      {!showCountdown && !showReadyButton && (
        <>
          <button onClick={handleRestart}>Заново</button>
          <button onClick={handleNext}>Следующий узел</button>
        </>
      )}

      {lastResult && (
        <p style={{ marginTop: "10px", fontWeight: "bold" }}>
          Результат: {lastResult} сек
        </p>
      )}
    </PageWrapper>
  );
}
