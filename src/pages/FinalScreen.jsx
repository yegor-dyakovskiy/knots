import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function FinalScreen() {
  const { results, resetGame } = useGameStore();
  const navigate = useNavigate();

  // Локальная копия результатов для отображения
  const [localResults] = useState(results);
  const [isExiting, setIsExiting] = useState(false);

  const handleRestart = () => {
    setIsExiting(true);       // запускаем анимацию
    navigate("/");            // переход на главную (можно сразу)
    resetGame();              // сброс состояния стора (результаты уже скопированы в localResults)
  };

  const getStats = (times = []) => {
    if (!times || times.length === 0) return null;
    const best = Math.min(...times).toFixed(2);
    const worst = Math.max(...times).toFixed(2);
    const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
    return { best, worst, avg, attempts: times.length };
  };

  return (
  <PageWrapper className={`${isExiting ? "fade-out" : ""} no-overflow`}>

      <h1>Результат тренировки</h1>
      <p>
        Эта информация нигде не сохраняется, если она важна — запиши или сделай снимок экрана.
      </p>

      {Object.keys(localResults).length === 0 && <p>Нет результатов</p>}

      {Object.keys(localResults).map((levelKey) => {
        const resultObj = localResults[levelKey];
        const nodes = resultObj.nodes || {};

        return (
          <div key={levelKey} style={{ marginBottom: "30px" }}>
            {Object.keys(nodes).length === 0 ? (
              <p>Нет результатов</p>
            ) : (
              Object.keys(nodes).map((nodeName) => {
                const stats = getStats(nodes[nodeName]);
                return (
                  <div key={nodeName} style={{ marginBottom: "15px" }}>
                    <h3>{nodeName}</h3>
                    {stats ? (
                      <ul>
                        <li>Попытки: {stats.attempts}</li>
                        <li>Лучшее время: {stats.best} сек</li>
                        <li>Худшее время: {stats.worst} сек</li>
                        <li>Среднее время: {stats.avg} сек</li>
                      </ul>
                    ) : (
                      <p>Нет результатов</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        );
      })}

      <button className="start-button" onClick={handleRestart}>Начать заново</button>
    </PageWrapper>
  );
}
