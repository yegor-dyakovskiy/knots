import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import { useNavigate } from "react-router-dom";
import "./KnotsGuide.css";

export default function KnotsGuide() {
  const navigate = useNavigate();
  const [modalKnot, setModalKnot] = useState(null);

  return (
    <PageWrapper className="no-overflow page-wrapper-BG-guide">
      <button className="back-button" onClick={() => navigate(-1)}>
        Назад
      </button>

      <h1 className="guide-title">Руководство по узлам</h1>

      <div className="knots-guide">
        
        {/* --- Узел №1 --- */}
        <div className="knot-card" onClick={() => setModalKnot("eight")}>
          <h2>1. Восьмерка одним концом</h2>
        </div>

        {/* --- Узел №2 --- */}
        <div className="knot-card" onClick={() => setModalKnot("bowline")}>
          <h2>2. Булинь</h2>
        </div>

        {/* --- Узел №3 --- */}
        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

        <div className="knot-card" onClick={() => setModalKnot("grapevine")}>
          <h2>3. Грейпвайн</h2>
        </div>

      </div>

      {/* Модалки */}

      {modalKnot === "eight" && (
        <div className="modal-overlay" onClick={() => setModalKnot(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalKnot(null)}>✕</button>
          
            <div className="modal-body">
              <img src="/images/eight.jpg" alt="Восьмерка" className="modal-img"/>
              <div >
                <h2>Восьмерка одним концом</h2>
                <p className="modal-text">
                  Используют в страховке альпиниста для привязывания страховочной системы к альпинистской верёвке.
                  </p> 
                <h3>Достоинства</h3>     
                <ul className="modal-body-ul">
                  <li>Не нуждается в контрольных узлах</li>
                  <li>Узел — громоздкий и не скользит, поэтому иногда используют в качестве сто́порного узла на конце верёвки</li>
                  </ul> 
                  <h3>Недостатки</h3>     
                <ul className="modal-body-ul">
                  <li>Трудно развязать после нагрузки</li>
                  <li>Трудно уменьшать или увеличивать петлю узла</li>
                  </ul> 
              </div>
            </div>
          </div>
        </div>
      )}

       {modalKnot === "bowline" && (
         <div className="modal-overlay" onClick={() => setModalKnot(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalKnot(null)}>✕</button>
          
            <div className="modal-body">
              <img src="/images/boolean.jpg" alt="булинь" className="modal-img"/>
              <div >
                <h2>Булинь</h2>
                <p className="modal-text">
                  Используют для организации станций / двойной булинь для ввязывания
                  </p> 
                <h3>Достоинства</h3>     
                <ul className="modal-body-ul">
                  <li>Легко развязать после нагрузки</li>
                  <li>Легко завязать станцию на выступе/дереве/балде из основной веревки</li>
                  </ul> 
                  <h3>Недостатки</h3>     
                <ul className="modal-body-ul">
                  <li>Петля узла не предназначена для нагрузок, можно грузить только основную оськ</li>
                  <li>Обязательно контрольный узел</li>
                  </ul> 
              </div>
            </div>
          </div>
        </div>
      )}

             {modalKnot === "grapevine" && (
               <div className="modal-overlay" onClick={() => setModalKnot(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setModalKnot(null)}>✕</button>
          
            <div className="modal-body">
              <img src="/images/grapewine.jpg" alt="грейпвайн" className="modal-img"/>
              <div >
                <h2>Грейпвайн</h2>
                <p className="modal-text">
                  Используют для связывания веревок одного диаметра
                  </p> 
                <h3>Достоинства</h3>     
                <ul className="modal-body-ul">
                  <li>Узел — надёжен и прочен</li>
                  <li>Не нуждается в контрольных узлах</li>
                  </ul> 
                  <h3>Недостатки</h3>     
                <ul className="modal-body-ul">
                  <li>Сравнительно сложно завязывать</li>
                  <li>Трудно развязать после нагрузки</li>
                  <li>Легко ошибиться при завязывании</li>
                  </ul> 
              </div>
            </div>
          </div>
        </div>
      )}


    </PageWrapper>
  );
}
