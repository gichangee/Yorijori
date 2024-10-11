import styled from "styled-components";
import {
    flexAlignEndStyle,
    flexBetweenStyle,
    flexStartStyle,
} from "../../../styles/common";

export const RecipeHeaderContainer = styled.div`
    width: 90%;
    margin: 1rem;
    padding: 1rem;
`;

export const TopSection = styled.div`
    ${flexBetweenStyle}
    width: 100%;
    height: 70%;
`;

export const Title = styled.div`
    ${flexAlignEndStyle}
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.h3};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
    flex-wrap: wrap;
    max-width: 90%;
    overflow: hidden;
    letter-spacing: 0.09rem;
    line-height: 2rem;

    @media (max-width: 600px) {
        font-size: ${({ theme }) => theme.fontSize.h4};
    }
`;
export const TagWrapper = styled.div`
    ${flexStartStyle}
    height: 100%;

    gap: ${({ theme }) => theme.spacing.medium};
    margin: ${({ theme }) => theme.spacing.medium} 0;
`;

export const RecipeStats = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    margin-left: auto;
`;

export const RecipeDescription = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.medium};
    color: ${({ theme }) => theme.color.gray.darkest};
    line-height: 1.3rem;
    letter-spacing: 0.05rem;
    margin-top: 0.3rem;
`;
