import styled from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../styles/common";

export const Live = styled.div``;
export const RecommendSection = styled.div`
    ${flexStartStyle}
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
    height: auto;
    margin-top: 2rem;
`;

export const Hot = styled.div`
    margin-right: ${({ theme }) => theme.spacing.small};
`;
export const Label = styled.div`
    margin-left: 1rem;
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const Container = styled.div`
    width: 100%;
    ${flexCenterStyle}
    margin-bottom: 3rem;
    flex-direction: column;
`;
export const Separator = styled.hr`
    border: none;
    height: 0.1rem;
    width: 70%;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0)
    );
    margin-bottom: 2rem;
`;
export const Term = styled.span`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.point.red};
    margin: 0 0.2rem 0 0.3rem;
`;
export const IngredientLikeSection = styled.div`
    width: 70%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
    height: 25rem;
`;

export const Title = styled.div`
    ${flexStartStyle}
    width: 100%;
    margin: 1rem;
    font-size: ${({ theme }) => theme.fontSize.h3};
`;

export const TermWrapper = styled.div`
    ${flexCenterStyle}
    width: 60%;
    padding: ${({ theme }) => theme.spacing.large};
    height: auto;
`;
