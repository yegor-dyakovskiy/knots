import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";

export default function LevelScreen() {
  const navigate = useNavigate();
  const setLevel = useGameStore((state) => state.setLevel);

  const handleLevelSelect = (lvl) => {
    setLevel(lvl); 
    navigate(`/game/${lvl}`);
  };

  return (
    <PageWrapper>
      <h1>Выберите уровень</h1>

      <button onClick={() => handleLevelSelect("levelNP1")}>Узлы по НП 1</button>
      <button onClick={() => handleLevelSelect("levelNP2")}>Средний</button>
    </PageWrapper>
  );
}
