import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/level"); // переходим на выбор уровня
  };

  return (
    <PageWrapper>
      <h1>Привет!</h1>
      <p>Тут ты можешь потренировать узлы и различные альп.техники на время.</p>
      <p>Необходимый минимум для альпиниста, при составлении тренажера была использована современная программа подготовки.</p>
      <p>Для тренировки подготовь заранее снаряжение. Например - на узлах НП-1 нужна основная веревка диаметра 9-10мм и репшнур 6-7мм на схватывающие узлы.</p>

      <button
        onClick={handleStart}
        style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
      >
        Перейти к выбору сложности
      </button>
    </PageWrapper>
  );
}
