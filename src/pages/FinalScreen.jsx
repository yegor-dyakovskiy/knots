import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";
import { useNavigate } from "react-router-dom";

export default function FinalScreen() {
  const { nodes, results, resetGame } = useGameStore();
  const navigate = useNavigate();

  const handleRestart = () => {
    resetGame();
    navigate("/");
  };

  const getStats = (times = []) => {
    if (!times || times.length === 0) return null;
    const best = Math.min(...times).toFixed(2);
    const worst = Math.max(...times).toFixed(2);
    const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
    return { best, worst, avg, attempts: times.length };
  };

  return (
    <PageWrapper>
      <h1>Результат тренировки</h1>
      <p>Эта информация нигде не сохранятеся, если она важна - запиши или сделай снимок экрана.</p>
      {nodes.map((node, index) => {
        const nodeKey = `levelNP${index + 1}`;
        const stats = getStats(results[nodeKey]);
        return (
          <div key={nodeKey} style={{ marginBottom: "20px" }}>
            <h2>{node.name}</h2>
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
      })}

      <button onClick={handleRestart}>Начать заново</button>
    </PageWrapper>
  );
}
