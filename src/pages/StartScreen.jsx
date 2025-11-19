import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

export default function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/level"); // переходим на выбор уровня
  };

  return (
    <PageWrapper>
      <h1>Добро пожаловать!</h1>
      <p>Нажмите кнопку, чтобы начать игру</p>

      <button
        onClick={handleStart}
        style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
      >
        START
      </button>
    </PageWrapper>
  );
}
