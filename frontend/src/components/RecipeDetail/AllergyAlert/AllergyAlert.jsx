import PropTypes from "prop-types";
import * as S from "./AllergyAlert.styled";
import { useCallback, useEffect, useState } from "react";
import { useAuthStore } from "../../../store/userStore";
import { useAllergyList, useUserAllergyList } from "../../../hooks/useAllergy";
const AllergyAlert = ({ materials }) => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const { data: allergies = [], isLoading: isAllergiesLoading } =
        useUserAllergyList();
    const { data: allergieList = [], isLoading: isAllergieListLoading } =
        useAllergyList();
    const [allergicMaterials, setAllergicMaterials] = useState([]);

    const filterIngredientsByUserAllergy = useCallback(
        (ingredients, userAllergies, allergyDetails) => {
            return ingredients
                .filter(
                    (ingredient) =>
                        ingredient.allergyCode &&
                        userAllergies.some(
                            (userAllergy) =>
                                userAllergy.commonCodeNum ===
                                ingredient.allergyCode,
                        ),
                )
                .map((ingredient) => {
                    const allergyInfo = allergyDetails.find(
                        (allergy) =>
                            allergy.commonCodeNum === ingredient.allergyCode,
                    );
                    return {
                        materialName: ingredient.materialName,
                        allergyName: allergyInfo
                            ? allergyInfo.commonCodeName
                            : "Unknown",
                    };
                });
        },
        [],
    );

    useEffect(() => {
        if (
            isLoggedIn &&
            !isAllergiesLoading &&
            !isAllergieListLoading &&
            materials.length > 0 &&
            allergies.length > 0
        ) {
            const filtered = filterIngredientsByUserAllergy(
                materials,
                allergies,
                allergieList,
            );
            setAllergicMaterials(filtered);
        }
    }, [
        isLoggedIn,
        materials,
        allergies,
        allergieList,
        filterIngredientsByUserAllergy,
        isAllergiesLoading,
        isAllergieListLoading,
    ]);

    const isReadyToRender =
        isLoggedIn &&
        !isAllergiesLoading &&
        !isAllergieListLoading &&
        isLoggedIn &&
        allergies.length > 0 &&
        allergicMaterials.length > 0;

    return (
        <>
            {isReadyToRender && (
                <S.Wrapper>
                    <S.Emoji> 🚨 </S.Emoji>
                    <S.Allergy>
                        {allergicMaterials.map((allergy, idx) => (
                            <div key={allergy.materialId || idx}>
                                {allergy.materialName}({allergy.allergyName})
                                {idx !== allergicMaterials.length - 1 && ", "}
                            </div>
                        ))}
                    </S.Allergy>
                    <span> 알레르기를 조심하세요 !</span>
                </S.Wrapper>
            )}
        </>
    );
};

AllergyAlert.propTypes = {
    allergies: PropTypes.array.isRequired,
    materials: PropTypes.array.isRequired,
};

export default AllergyAlert;
