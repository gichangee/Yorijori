import styled, { keyframes } from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../styles/common";

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px); 
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const IngredientLikeSection = styled.div`
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
    height: 22rem;
    animation: ${fadeIn} 1s ease-in-out;
`;

export const Wrapper = styled.div`
    ${flexCenterStyle}
    width: 100%;
`;

export const TabWrapper = styled.div`
    ${flexStartStyle}
    width: 40%;
    margin-top: -5rem;
`;

export const RelatedRecipeWrapper = styled.div`
    ${flexStartStyle}
    flex-direction: column;
    width: 70%;
    animation: ${fadeIn} 1s ease-in-out;
`;

export const TitleWrapper = styled.div``;
export const TotalPrice = styled.div`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    border-bottom: 1px solid ${({ theme }) => theme.color.green};
    margin: 0 0.3rem;
`;
export const LikeHeader = styled.div`
    width: 100%;
    ${flexStartStyle}
`;
export const TotalPriceWrapper = styled.div`
    ${flexStartStyle}
    font-size: ${({ theme }) => theme.fontSize.text};
`;
