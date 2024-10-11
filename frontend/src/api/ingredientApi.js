import axiosInstance from "./axios";
export const getSearchIngredient = async (term) => {
    const response = await axiosInstance.get("/ingredient/search", {
        params: { keyword: term },
    });
    return response.data;
};

export const getIngredientPopularWeekly = async () => {
    const response = await axiosInstance.get("/ingredient/popular/week");
    return response.data;
};

export const getIngredientPopularMonthly = async () => {
    const response = await axiosInstance.get("/ingredient/popular/month");
    return response.data;
};

export const getLikeIngredients = async () => {
    const response = await axiosInstance.get("/ingredient/like");
    return response.data;
};

export const deleteLikeIngredient = async (id) => {
    const response = await axiosInstance.delete("/ingredient/like", {
        params: { id },
    });
    return response.data;
};

export const postLikeIngredient = async (id) => {
    const response = await axiosInstance.post(
        "/ingredient/like",
        {},
        { params: { id } },
    );
    return response.data;
};

export const getIngredientPrices = async (id) => {
    const response = await axiosInstance.get("/ingredient", {
        params: { id },
    });
    return response.data;
};

export const getIngredientLowPrices = async (word) => {
    const response = await axiosInstance.get("/ingredient/low", {
        params: { query: word, start: 1, display: 3, sort: "sim" },
    });
    return response.data;
};

export const getRelatedRecipe = async (ingredient) => {
    const response = await axiosInstance.post("/ingredient/recipe", ingredient);
    return response.data;
};
export const getIngredientPriceChange = async () => {
    const response = await axiosInstance.get("/ingredient/change", {});
    return response.data;
};
