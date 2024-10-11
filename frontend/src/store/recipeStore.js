import create from "zustand";
import { persist } from "zustand/middleware";

export const useRecipeStore = create(
    persist(
        (set) => ({
            selectedType: "B_0001",
            selectedSituation: "C_0001",
            selectedIngredients: "D_0001",
            selectedMethod: "E_0001",
            sortOrder: "최신순",
            currentPage: 0,
            setSelectedType: (type) => set({ selectedType: type }),
            setSelectedSituation: (situation) =>
                set({ selectedSituation: situation }),
            setSelectedIngredients: (ingredients) =>
                set({ selectedIngredients: ingredients }),
            setSelectedMethod: (method) => set({ selectedMethod: method }),
            setSortOrder: (order) => set({ sortOrder: order }),
            setCurrentPage: (page) => set({ currentPage: page }),
        }),
        {
            name: "recipe-store", // 로컬 스토리지에 저장될 키
        },
    ),
);

export const useSearchResultStore = create(
    persist(
        (set) => ({
            selectedType: "전체",
            selectedSituation: "전체",
            selectedIngredients: "전체",
            selectedMethod: "전체",
            sortOrder: "최신순",
            currentPage: 0,
            setSelectedType: (type) => set({ selectedType: type }),
            setSelectedSituation: (situation) =>
                set({ selectedSituation: situation }),
            setSelectedIngredients: (ingredients) =>
                set({ selectedIngredients: ingredients }),
            setSelectedMethod: (method) => set({ selectedMethod: method }),
            setSortOrder: (order) => set({ sortOrder: order }),
            setCurrentPage: (page) => set({ currentPage: page }),
        }),
        {
            name: "search-result-store", // 로컬 스토리지에 저장될 키
        },
    ),
);
