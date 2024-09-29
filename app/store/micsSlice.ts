import { StateCreator } from "zustand";

export type MicsState = {
  allData: string[];
  filteredData: string[]; // Separate state for search results
};

export type MicsActions = {
  setAllData: (allData: string[]) => void;
  removeItem: (proxy: string) => void;
  addItem: (proxy: string) => void;
  searchItem: (query: string) => void; // Modifies `filteredData`
  resetFilter: () => void; // Resets the filtered data back to allData
};

export type MicsSlice = MicsState & MicsActions;

export const initMicsStore = (): MicsState => {
  return {
    allData: [],
    filteredData: [], // Initialize filteredData
  };
};

export const defaultMicsState: MicsState = {
  ...initMicsStore(),
};

export const createMicsSlice =
  (
    initState: MicsState = defaultMicsState
  ): StateCreator<MicsSlice, [], [], MicsSlice> =>
  (set, get) => ({
    ...initState,
    setAllData: (allData) => set({ allData, filteredData: allData }), // Set both allData and filteredData
    removeItem: (proxy) =>
      set((state) => ({
        allData: state.allData.filter((item) => item !== proxy),
        filteredData: state.filteredData.filter((item) => item !== proxy),
      })),
    addItem: (proxy) =>
      set((state) => ({
        allData: [...state.allData, proxy], // Append to allData
        filteredData: [...state.filteredData, proxy], // Append to filteredData
      })),
    searchItem: (query) => {
      const { allData } = get(); // Use the original data for searching

      const filteredData = allData.filter((proxy) =>
        proxy.toLowerCase().includes(query.toLowerCase())
      );

      set({ filteredData }); // Update filteredData with the search result
    },
    resetFilter: () => {
      const { allData } = get();

      set({ filteredData: allData }); // Reset filteredData to allData
    },
  });
