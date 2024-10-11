import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            isLoggedIn: false,
            setTokens: (accessToken, refreshToken) =>
                set({ accessToken, refreshToken, isLoggedIn: true }),
            logout: () =>
                set({
                    accessToken: null,
                    refreshToken: null,
                    isLoggedIn: false,
                }),
        }),
        {
            name: "auth-storage",
            getStorage: () => sessionStorage,
        },
    ),
);

export const useUserStore = create((set) => ({
    user: null,
    recipes: [],
    setUser: (user) => set({ user }),
    setRecipes: (recipes) => set({ recipes }),
}));
