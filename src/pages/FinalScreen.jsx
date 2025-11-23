import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import "./FinalScreen.css";

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

      <h1 className="final-title">Результат тренировки</h1>
      <p className="final-text">
        Эта информация нигде не сохраняется, если она важна — запиши или сделай снимок экрана.
      </p>

      {Object.keys(localResults).length === 0 && <p>Нет результатов</p>}

    <div className="final-box-result-box">
      {Object.keys(localResults).map((levelKey) => {
        const resultObj = localResults[levelKey];
        const nodes = resultObj.nodes || {};
        
        return (
          <div key={levelKey} className="final-knot-result">
            {Object.keys(nodes).length === 0 ? (
              <p>Нет результатов</p>
            ) : (
              Object.keys(nodes).map((nodeName) => {
                const stats = getStats(nodes[nodeName]);
                return (
                  <div key={nodeName} style={{ marginBottom: "15px" }}>
                    <h3 className="final-knot-name">{nodeName}</h3>
                    {stats ? (
                      <ul className="final-stats-ul">
                        <li>Попытки: {stats.attempts}</li>
                        <li>Лучший: {stats.best} с</li>
                        <li>Худший: {stats.worst} с</li>
                        <li>Среднее: {stats.avg} с</li>
                      </ul>
                    ) : (
                      <p className="final-text">Нет результатов</p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        );
      })}

      </div>
      <button className="start-button margin-center" onClick={handleRestart}>Начать заново</button>
    </PageWrapper>
  );
}
