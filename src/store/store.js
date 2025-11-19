import { create } from "zustand";

export const useGameStore = create((set) => ({
  level: "levelNP1",
  results: [],
  currentNodeIndex: 0,
  nodes: [
    { id: 1, name: "Узел 1", image: "/images/node1.jpg" },
    { id: 2, name: "Узел 2", image: "/images/node2.jpg" },
    { id: 3, name: "Узел 3", image: "/images/node3.jpg" },
  ],
  setLevel: (lvl) => set({ level: lvl }),
  startNode: () => set({ currentNodeIndex: 0 }),
  nextNode: () =>
    set((state) => ({
      currentNodeIndex:
        state.currentNodeIndex + 1 < state.nodes.length
          ? state.currentNodeIndex + 1
          : 0,
    })),
  addResult: (time) =>
    set((state) => ({
      results: [
        ...state.results,
        {
          node: state.nodes[state.currentNodeIndex].name,
          time,
        },
      ],
    })),
}));
