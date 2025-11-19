import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";

export default function LevelNP2() {
  const { scores, incrementLevelScore } = useGameStore();

  return (
    <PageWrapper>
      <h1>LevelNP2 — Средний уровень</h1>
      <p>Счётчик кликов: {scores.levelNP2}</p>
      <button onClick={() => incrementLevelScore("levelNP2")}>
        Кликни меня!
      </button>
    </PageWrapper>
  );
}
