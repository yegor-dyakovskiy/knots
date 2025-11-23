import { useEffect, useState, useRef, useCallback } from "react";
import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import "./levelNP1.css";

export default function LevelNP1() {
    const navigate = useNavigate();

    const {
        nodes: gameNodes,
        currentNodeIndex,
        nextNode,
        addResult,
        setLevel,
    } = useGameStore();

    // ============================================================
    // 1) ОДНОРАЗОВО ПЕРЕМЕШИВАЕМ УЗЛЫ (React 19-safe)
    // ============================================================
    const [nodes] = useState(() => {
        const arr = [...gameNodes];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    });

    // ============================================================
    // ЛОКАЛЬНЫЕ СОСТОЯНИЯ
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
    // УСТАНАВЛИВАЕМ КЛЮЧ ДЛЯ РЕЗУЛЬТАТОВ
    // ============================================================
    useEffect(() => {
        if (currentNode) {
            setLevel(`levelNP${currentNodeIndex + 1}`);
        }
    }, [currentNodeIndex, currentNode, setLevel]);

    // ============================================================
    // СТАРТ ТАЙМЕРА
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

    // ============================================================
    // СТАРТ ОБРАТНОГО ОТСЧЁТА
    // ============================================================
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

    // ============================================================
    // СТАРТ НОВОГО УЗЛА
    // ============================================================
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
    // КНОПКА ГОТОВО
    // ============================================================
    const handleReady = useCallback(() => {
        clearInterval(timerRef.current);
        const result = timer.toFixed(2);
        addResult(result);
        setLastResult(result);
        setShowReadyButton(false);
    }, [timer, addResult]);

    // ============================================================
    // КНОПКА ДАЛЕЕ
    // ============================================================
    const handleNext = useCallback(() => {
        if (!isLastNode) nextNode();
        else navigate("/final");
    }, [isLastNode, nextNode, navigate]);

    // ============================================================
    // ПОВТОР
    // ============================================================
    const handleRestart = useCallback(() => {
        clearInterval(timerRef.current);
        clearInterval(countdownRef.current);
        startCountdown();
    }, [startCountdown]);

    // ============================================================
    // ГОРЯЧИЕ КЛАВИШИ
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

                <div className="knots-time-box">
                    <div className="image-wrapper">
                        <img
                            src={currentNode.image}
                            alt={currentNode.name}
                            className="knot-img"
                        />
                    </div>

                <div className="time-box">
                    {showCountdown && <p className="knot-text">Будьте готовы через: {countdown} сек</p>}

                    {!showCountdown && showReadyButton && (
                        <>
                            <p className="knot-text">Секундомер: {timer.toFixed(2)} сек</p>
                            <button className="knot-button" onClick={handleReady}>Готово (Enter)</button>
                        </>
                    )}

                    {lastResult && (
                        <p className="knot-result">
                            Результат: {lastResult} сек
                        </p>
                    )}
                    {!showCountdown && !showReadyButton && (
                        <>
                            <button className="knot-button" onClick={handleRestart}>Заново (Space)</button>
                            <button className="knot-button" onClick={handleNext}>
                                {isLastNode
                                    ? "Закончить тренировку (Enter)"
                                    : "Следующий узел (Enter)"}
                            </button>
                        </>
                    )}

                    </div>
                </div>
            </PageWrapper>
        </>
    );
}
