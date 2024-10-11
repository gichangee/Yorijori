import * as S from "./CardToggle.styled";
import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAllergy, deleteAllergy } from "../../../api/userApi";

const CardToggle = ({ imgUrl, code, text, isClicked = false }) => {
    const [isActive, setIsActive] = useState(isClicked);

    const queryClient = useQueryClient();

    const addAllergyMutation = useMutation({
        mutationFn: addAllergy,
        onSuccess: () => {
            queryClient.invalidateQueries("userAllergyList");
        },
    });

    const deleteAllergyMutation = useMutation({
        mutationFn: deleteAllergy,
        onSuccess: () => {
            queryClient.invalidateQueries("userAllergyList");
        },
    });

    const handleOnClick = () => {
        if (!isActive) {
            addAllergyMutation.mutate(code);
        } else {
            deleteAllergyMutation.mutate(code);
        }
        setIsActive(!isActive);
    };

    return (
        <S.CardToggle isActive={isActive} onClick={handleOnClick}>
            <S.Image src={imgUrl} />
            <S.Text>{text}</S.Text>
        </S.CardToggle>
    );
};

CardToggle.propTypes = {
    code: PropTypes.string,
    imgUrl: PropTypes.string,
    text: PropTypes.string,
    isClicked: PropTypes.bool,
};

export default CardToggle;
