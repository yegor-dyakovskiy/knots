import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  // Наборы узлов по уровням сложности
  levels: {
    easy: [
      { name: "Восьмерка одним концом", image: "/images/eight.jpg"},
      { name: "Восьмерка", image: "/images/eight.jpg" },
      { name: "Проводник", image: "/images/provodnik.jpg" },
      { name: "Грейпвайн", image: "/images/grapewine.jpg" },
      { name: "Дубовый", image: "/images/duboviy.jpg" },
      { name: "Контрольный узел (Баррел)", image: "/images/barrel1.jpg" },
      { name: "Баррел", image: "/images/barrel.jpg" },
      { name: "Прусик", image: "/images/prusik.jpg" },
      { name: "Обмоточный французский", image: "/images/france.jpg" },
      { name: "Стремя", image: "/images/stremya.jpg" },
      { name: "УИАА (Мунтера)", image: "/images/uiaa.jpg" },
    ],
    medium: [
      { name: "Австрийский схватывающий", image: "/images/austrian.jpg" },
      { name: "Стремя одним концом", image: "/images/stremya.jpg" },
      { name: "Полусхват", image: "/images/polushvat.jpg" },
      { name: "Австрийский проводник", image: "/images/austrianprovodnik.jpg" },
    ],
    hard: [
      { name: "Булинь", image: "/images/boolean.jpg" },
      { name: "Мунтера-Мула", image: "/images/muntermula.jpeg" },
      { name: "Рифовый (Мула)", image: "/images/rifoviy.jpg" },
      { name: "Штык", image: "/images/shtyk.jpg" },
      { name: "Двойной УИАА", image: "/images/uiaadvoinoi.jpg" },
      { name: "Супер УИАА", image: "/images/uiaasuper.jpg" },
      { name: "Гарда", image: "/images/garda.jpg" },
      { name: "Брамшкотовый", image: "/images/bramshkot.jpg" },
    ],
    hard2: [
      { name: "Баррел", image: "/images/barrel.jpg" },
      { name: "УИАА (Мунтера)", image: "/images/uiaa.jpg" },
    ],
  },

  // Текущие поля
  nodes: [],
  currentNodeIndex: 0,
  currentLevel: null,
  results: {},
  difficulty: "easy",

  // ⚡️ Добавлено: статус загрузки
  loading: true,
  setLoading: (value) => set({ loading: value }),

  // Инициализация nodes (по умолчанию easy)
  _init: () => {
    const easy = get().levels.easy || [];
    set({ nodes: easy, difficulty: "easy", currentNodeIndex: 0 });
  },

  setLevel: (lvl) => set({ currentLevel: lvl }),

  setDifficulty: (levelKey) => {
    const levels = get().levels || {};
    const chosen = levels[levelKey] || [];
    set({ difficulty: levelKey, nodes: chosen, currentNodeIndex: 0 });
  },

  startLevel: (levelName) => {
    let difficulty = "easy";
    if (levelName === "levelNP1") difficulty = "easy";
    else if (levelName === "levelNP2") difficulty = "medium";
    else if (levelName === "levelSP1") difficulty = "hard";
    else if (levelName === "levelSP2") difficulty = "hard2";

    get().setDifficulty(difficulty);
    get().setLevel(levelName);
    set({ currentNodeIndex: 0 });
  },

  nextNode: () =>
    set((state) => ({
      currentNodeIndex:
        state.currentNodeIndex + 1 < state.nodes.length
          ? state.currentNodeIndex + 1
          : state.currentNodeIndex,
    })),

  addResult: (time) => {
    const state = get();
    const levelKey = state.currentLevel;
    const difficulty = state.difficulty;
    const node = state.nodes[state.currentNodeIndex];
    if (!levelKey || !node) return;

    const prevLevel = state.results[levelKey] || { difficulty, nodes: {} };
    const prevNodeTimes = prevLevel.nodes[node.name] || [];

    set({
      results: {
        ...state.results,
        [levelKey]: {
          difficulty,
          nodes: {
            ...prevLevel.nodes,
            [node.name]: [...prevNodeTimes, parseFloat(time)],
          },
        },
      },
    });
  },

  // 🔹 Новый метод для сброса результатов текущего уровня
  resetLevelResults: () => {
    const state = get();
    const levelKey = state.currentLevel;
    if (!levelKey) return;

    set({
      results: {
        ...state.results,
        [levelKey]: { ...state.results[levelKey], nodes: {} },
      },
      currentNodeIndex: 0,
      currentLevel: null,
    });
  },

  resetGame: () =>
    set({ currentNodeIndex: 0, currentLevel: null, results: {} }),
}));

// Автоинициализация
const s = useGameStore.getState();
if (s && typeof s._init === "function") s._init();
