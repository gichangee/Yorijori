import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexBetweenStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const ChartWrapper = styled.div`
    width: 30%;
    height: 100%;
    ${flexCenterStyle}
`;
export const IngredientInfoLayout = styled.div`
    ${flexBetweenStyle};
    width: 100%;
`;
export const IngredientInfo = styled.div`
    ${flexAlignStartStyle}
    height: 100%;
    flex-direction: column;
    width: 80%;
    margin-left: ${({ theme }) => theme.spacing.large};
`;
export const Wrapper = styled.div`
    width: 18rem;
    height: 5rem;
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing.large};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    background-color: ${({ theme }) => theme.color.point.lightGreen};
    ${flexCenterStyle}

    &:hover {
        background-color: ${({ theme }) => theme.color.point.green};
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    }
`;

export const IngredientName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const IngredientPrice = styled.div`
    margin: 0 ${({ theme }) => theme.spacing.small};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme, isExpensive }) =>
        isExpensive ? theme.color.point.red : "blue"};
`;
export const IngredientLabel = styled.div`
    margin-top: ${({ theme }) => theme.spacing.medium};
    font-size: ${({ theme }) => theme.fontSize.text};
    ${flexStartStyle}
`;
export const ingredientNowPrice = styled.div`
    margin-top: ${({ theme }) => theme.spacing.medium};
`;
