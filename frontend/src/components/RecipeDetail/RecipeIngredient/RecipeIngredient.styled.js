import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const IngredientWrapper = styled.div`
    ${flexAlignStartStyle}
    background-color: ${({ theme }) => theme.color.point.lightYellow};
    border-radius: 1rem;
    width: 80%;
`;

export const IngredientColumn = styled.div`
    ${flexCenterStyle};
    flex-direction: column;
    margin: 1rem 0 1rem 1.5rem;
    width: 40%;
`;

export const Ingredient = styled.div`
    width: 100%;
    ${flexStartStyle};
    margin: 0.3rem;
`;
export const IngredientName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.medium};
    margin-right: 0.8rem;
`;
export const IngredientAmount = styled.div`
    font-size: ${({ theme }) => theme.fontSize.subText};
    font-family: ${({ theme }) => theme.fontWeight.regular};
`;
