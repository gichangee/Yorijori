import axiosInstance from "./axios";

export const fetchUser = async () => {
    const response = await axiosInstance.get("/users/user");
    return response.data;
};

export const followUser = async (id) => {
    const response = await axiosInstance.post(`/social/follow/${id}`);
    return response.data;
};

export const unFollowUser = async (id) => {
    const response = await axiosInstance.delete(`/social/follow/${id}`);
    return response.data;
};

export const fetchUserRecipe = async () => {
    const response = await axiosInstance.get("/users/recipe");
    return response.data;
};

export const updateUser = async (data) => {
    const response = await axiosInstance.patch("/users/user", data);
    return response.data;
};

export const fetchAllergyList = async () => {
    const response = await axiosInstance.get("/users/common");
    return response.data.filter((item) => item.commonCodeType === "A");
};

export const fetchUserAllergyList = async () => {
    const response = await axiosInstance.get("/users/allergys");
    return response.data;
};

export const addAllergy = async (commonCodeNum) => {
    return await axiosInstance.post("/users/allergys", {
        commonCodeNum,
    });
};

export const deleteAllergy = async (commonCodeNum) => {
    return await axiosInstance.delete(`/users/allergys/${commonCodeNum}`);
};

export const uploadProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
        "/users/update-profile",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    );
    return response.data;
};

export const getUserLike = async () => {
    const response = await axiosInstance.get("/users/like");
    return response.data;
};

export const fetchOtherUser = async (id) => {
    const response = await axiosInstance.get(`/users/user/${id}`);
    return response.data;
};

export const getUserScrap = async () => {
    const response = await axiosInstance.get("/users/scrap");
    return response.data;
};

export const fetchOtherUserRecipe = async (id) => {
    const response = await axiosInstance.get(`/users/recipe/other/${id}`);
    return response.data;
};

export const getCommonCode = async () => {
    const response = await axiosInstance.get("/users/common");
    return response.data;
};
