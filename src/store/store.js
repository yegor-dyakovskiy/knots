import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  nodes: [
    { name: "Восьмерка", image: "/images/eight.jpg" },
    { name: "Проводник", image: "/images/stremya.jpg" },
    { name: "Грейпвайн", image: "/images/grapewine.jpg" },
    { name: "Дубовый", image: "/images/duboviy.jpg" },
    { name: "Восьмерка одним концом", image: "/images/eight1.jpeg" },
    { name: "Контрольный узел (Баррел)", image: "/images/barrel1.jpeg" },
    { name: "Баррел", image: "/images/barrel.jpg" },
    { name: "Прусик", image: "/images/prussik.jpg" },
    { name: "Обмоточный", image: "/images/france.jpg" },
    { name: "Австрийский схватывающий", image: "/images/austrian.jpg" },
    { name: "Стремя", image: "/images/stremya.jpg" },
    { name: "УИАА (Мунтера)", image: "/images/uiaa.jpg" },
    // добавьте остальные узлы
  ],
  currentNodeIndex: 0,
  currentLevel: null,  // текущий узел
  results: {},          // { levelNP1: [3.2, 4.1], levelNP2: [2.9] }

  setLevel: (lvl) => set({ currentLevel: lvl }),

  nextNode: () =>
    set((state) => ({
      currentNodeIndex:
        state.currentNodeIndex + 1 < state.nodes.length
          ? state.currentNodeIndex + 1
          : state.currentNodeIndex,
    })),

  addResult: (time) => {
    const nodeKey = get().currentLevel;
    if (!nodeKey) return; // защита
    const prev = get().results[nodeKey] || [];
    set((state) => ({
      results: { ...state.results, [nodeKey]: [...prev, parseFloat(time)] },
    }));
  },

  resetGame: () => set({ currentNodeIndex: 0, currentLevel: null, results: {} }),
}));
