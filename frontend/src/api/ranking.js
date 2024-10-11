import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchRanking = async (pageNumber, pageSize) => {
    pageNumber += 1;
    const response = await axios.get(
        `${BASE_URL}/users/rank?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    );
    return response.data;
};
