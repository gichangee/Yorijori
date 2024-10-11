import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSearchHistoryStore = create(
    persist(
        (set, get) => ({
            searchHistory: {},

            getSearchTerm: (userId, purpose) => {
                const userHistory = get().searchHistory[userId] || {};
                return userHistory[purpose] || [];
            },

            addSearchTerm: (id, purpose, term) =>
                set((state) => {
                    const userHistory = state.searchHistory[id] || {};
                    const purposeHistory = userHistory[purpose] || [];

                    return {
                        searchHistory: {
                            ...state.searchHistory,
                            [id]: {
                                ...userHistory,
                                [purpose]: [term, ...purposeHistory].slice(
                                    0,
                                    10,
                                ),
                            },
                        },
                    };
                }),

            removeSearchTerm: (id, purpose, index) =>
                set((state) => {
                    const userHistory = state.searchHistory[id] || {};
                    const purposeHistory = userHistory[purpose] || [];
                    const updatedHistory = [...purposeHistory];
                    updatedHistory.splice(index, 1);

                    return {
                        searchHistory: {
                            ...state.searchHistory,
                            [id]: {
                                ...userHistory,
                                [purpose]: updatedHistory,
                            },
                        },
                    };
                }),

            clearSearchHistory: () =>
                set(() => ({
                    searchHistory: [],
                })),

            clearUserSearchHistory: (id) => {
                set((state) => {
                    const newSearchHistory = { ...state.searchHistory };
                    delete newSearchHistory[id];
                    return {
                        searchHistory: newSearchHistory,
                    };
                });
            },
        }),
        {
            name: "search-history",
            getStorage: () => localStorage,
        },
    ),
);

export default useSearchHistoryStore;
