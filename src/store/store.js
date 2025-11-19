import { create } from "zustand";

export const useGameStore = create((set, get) => ({
  nodes: [
    { name: "Восьмерка", image: "/images/eight.jpg" },
    { name: "Грейпвайн", image: "/images/grapewine.jpg" },
    { name: "Стремя", image: "/images/stremya.jpg" },
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
