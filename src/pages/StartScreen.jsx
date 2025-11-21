import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import './StartScreen.css';

export default function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/level"); // переходим на выбор уровня
  };

  return (
    <PageWrapper>
      <h1 className="start-title">Привет!</h1>
      <div className="start-description">
      <p>Здесь можно отработать узлы и основные альпинистские техники на время.</p>
      <p>Тренажёр составлен на основе современной программы подготовки.</p>
      <p>Заранее подготовь снаряжение перед запуском уровня. Например, для узлов НП-1 понадобится основная верёвка 9–10 мм и репшнур 6–7 мм для схватывающих узлов.</p>
      </div>
<div   className="start-button-box">
      <button
        onClick={handleStart}
        className="start-button"
        >
        Перейти к выбору сложности
      </button>
        </div>
    </PageWrapper>
  );
}

