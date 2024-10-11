import { useQuery } from "@tanstack/react-query";
import { fetchAllergyList, fetchUserAllergyList } from "../api/userApi";

export const useAllergyList = () => {
    return useQuery({
        queryKey: ["allergyList"],
        queryFn: fetchAllergyList,
        staleTime: 1000 * 60 * 60 * 3,
    });
};

export const useUserAllergyList = () => {
    return useQuery({
        queryKey: ["userAllergyList"],
        queryFn: fetchUserAllergyList,
    });
};
