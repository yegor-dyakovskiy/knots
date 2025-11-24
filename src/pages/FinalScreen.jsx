import { useState } from "react";
import PageWrapper from "../components/PageWrapper";
import { useGameStore } from "../store/store";
import { useNavigate } from "react-router-dom";
import "./FinalScreen.css";

export default function FinalScreen() {
  const { results, resetGame } = useGameStore();
  const navigate = useNavigate();

  // Локальная копия результатов
  const [localResults] = useState(results);
  const [isExiting, setIsExiting] = useState(false);

  // Номер тренера
  const [coachPhone, setCoachPhone] = useState("");

  const handleRestart = () => {
    setIsExiting(true);
    navigate("/");
    resetGame();
  };

  const getStats = (times = []) => {
    if (!times || times.length === 0) return null;
    const best = Math.min(...times).toFixed(2);
    const worst = Math.max(...times).toFixed(2);
    const avg = (times.reduce((a, b) => a + b, 0) / times.length).toFixed(2);
    return { best, worst, avg, attempts: times.length };
  };

  // 👉 Формирование WhatsApp сообщения по каждому узлу
  const buildWhatsappMessage = () => {
    let message = "Мои результаты по узлам (название, среднее время, количество попыток):\n\n";

    Object.keys(localResults).forEach((levelKey) => {
      const nodes = localResults[levelKey].nodes || {};

      Object.keys(nodes).forEach((nodeName) => {
        const arr = nodes[nodeName];
        if (!arr || arr.length === 0) return;

        const avg = (
          arr.reduce((a, b) => a + b, 0) / arr.length
        ).toFixed(2);

        message += `${nodeName}: — ${avg} сек (${arr.length})\n`;
      });
    });

    return message.trim();
  };

  const sendToCoach = () => {
    if (!coachPhone) {
      alert("Введите номер тренера");
      return;
    }

    const message = buildWhatsappMessage();

    if (!message) {
      alert("Нет данных для отправки");
      return;
    }

    const formatted = coachPhone.replace(/\D/g, "");

    const url = `https://wa.me/${formatted}?text=${encodeURIComponent(
      message
    )}`;

    window.open(url, "_blank");
  };

  // Случайные вдохновляющие цитаты
const quotes = [
  { text: "Горы не стадионы, где я удовлетворяю свои амбиции, они — храмы, где я исповедую мою религию.",  author: "Анатолий Букреев"},
  { text: "Горы имеют власть звать нас в свои края, это уже не страсть, это судьба моя…",  author: "Анатолий Букреев"},
  { text: "Я думаю у каждого альпиниста есть много своих поводов взойти на Маттерхорн. Но основная причина у всех одна: взойти на МаттерхорнПокоряем мы не горные вершины, а самих себя",  author: "Гастон Реббюфа"},
  { text: "Женщина для альпиниста является главной опасностью. Всем нам известна эта неприлежная истина",  author: "Морис Эрцог"},
  { text: "Мои партнеры должны были быть сильными, скромными, быстрыми и всегда оптимистичными.",  author: "Симоне Моро"},
  { text: "Альпинизм – сложный и опасный  многогранный вид деятельности человека.  Редкое сочетание изощренной умственной и физической работы в очень сложной обстановке.",  author: "Виталий Абалаков"},
  { text: "Покоряем мы не горные вершины, а самих себя",  author: "Эдмунд Хиллари"},
  { text: "С практикой и концентрацией ты можешь превзойти свои собственные ожидания.", author: "Эдмунд Хиллари" },
  { text: "Потому что он есть!", author: "Джордж Мэллори" },
  { text: "Горы не справедливы и не несправедливы, они просто опасны.", author: "Райнхольд Месснер" },
  { text: "Каждый человек нуждается в чем-то исключительном в эпоху, когда за деньги можно иметь все.", author: "Райнхольд Месснер" },
  { text: "... Эта тишина природы — сама музыка...", author: "Райнхольд Месснер" },
  { text: "Я существую лишь как преодоление самого себя", author: "Райнхольд Месснер" },
  { text: "Вершину нельзя покорить. Ты стоишь на ней считаные минуты, а потом ветер сметает твои следы.", author: "Арлен Блум" },
  { text: "Гора не похожа на людей. Гора искренняя. Орудия для её покорения находятся внутри тебя, в твоей душе.", author: "Вальтер Бонатти" },
];


const [quote] = useState(() => {
  return quotes[Math.floor(Math.random() * quotes.length)];
});

  return (
    <PageWrapper className={`${isExiting ? "fade-out" : ""} no-overflow`}>
      <h1 className="final-title">Результат тренировки</h1>
      <div className="final-quote-box">

     <p className="quote-text final-text">{quote.text}</p>
<p className="quote-author final-text">— {quote.author}</p>
      </div>


      {Object.keys(localResults).length === 0 && <p>Нет результатов</p>}

      <div className="final-box-result-box">
        {Object.keys(localResults).map((levelKey) => {
          const nodes = localResults[levelKey].nodes || {};

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
                          <li>
                            Попытки: {stats.attempts} | Лучший: {stats.best} с
                          </li>
                          <li>
                            Среднее: {stats.avg} с | Худший: {stats.worst} с
                          </li>
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

            <div className="center-div" style={{ marginTop: "20px" }}>
        <button className="start-button margin-bottom40" onClick={handleRestart}>
          Начать заново
        </button>
      </div>

      <div className="final-divider"></div>
      {/* 👉 Блок отправки тренеру */}
      <p className="final-text">Поделись результатом тренировки через WhatsApp</p>
      <div className="final-input-box">
        <input
          type="text"
          value={coachPhone}
          onChange={(e) => setCoachPhone(e.target.value)}
          placeholder="+77071234567"
          className="final-input"
          />

        <button
          onClick={sendToCoach}
          className="start-button"
          >
          Отправить
        </button>
          </div>

    </PageWrapper>
  );
}
