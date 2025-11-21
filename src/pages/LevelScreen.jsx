import { useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useGameStore } from '../store/store';
import './LevelScreen.css';

export default function LevelScreen() {
    const navigate = useNavigate();
    const setLevel = useGameStore((state) => state.setLevel);

    const handleLevelSelect = (lvl) => {
        setLevel(lvl);
        navigate(`/game/${lvl}`);
    };

    return (
        <>
            <button className="back-button" onClick={() => navigate(-1)}>
                Назад
            </button>
            <PageWrapper>
                <h1 className="level-title">Выбери уровень</h1>

                <div className="level-description">
                    <p>
                        После выбора сложности сразу начнётся отсчёт на выполнение задания.
                        Подготовься.
                    </p>
                    <p>
                        Каждый узел можно тренировать комфортное количество раз, в конце тренировки
                        будет подсчёт результатов.
                    </p>
                </div>

                <div className="level-button-box">
                    <button className="level-button" onClick={() => handleLevelSelect('levelNP1')}>
                        Узлы по НП-1
                    </button>
                    <button className="level-button" onClick={() => handleLevelSelect('levelNP2')}>
                        Средний
                    </button>
                </div>
            </PageWrapper>
        </>
    );
}
