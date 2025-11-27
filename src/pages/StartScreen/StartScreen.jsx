import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import './StartScreen.css';

export default function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/level"); // переходим на выбор уровня
  };
    const handleKnotsGuide = () => {
    navigate("/knots-guide"); // переходим на статью
  };

  return (
    <PageWrapper>
      <h1 className="start-title">Тренажёр альпинистских узлов и техник</h1>
      <div className="start-description">
      <p>Здесь можно отработать узлы и основные альпинистские техники на время.</p>
      <p>Тренажёр составлен на основе современной программы подготовки.</p>
      <p>Заранее подготовь снаряжение перед запуском уровня. Например, для узлов НП-1 понадобится основная верёвка 9–10 мм, карабин и репшнур 6–7 мм для схватывающих узлов.</p>
      </div>
<div   className="start-button-box">
      <button
        onClick={handleStart}
        className="start-button"
        >
        Перейти к выбору уровня
      </button>
      <button
        onClick={handleKnotsGuide}
        className="start-button"
        >
        Ликбез по узлам
      </button>
        </div>
    </PageWrapper>
  );
}

