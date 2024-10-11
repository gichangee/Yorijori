import styled from "styled-components";
import { flexAroundStyle, flexCenterStyle } from "../../../styles/common";

export const RecipeOverviewWrapper = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
`;
export const Icon = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h2};
    font-family: "TossFace";
`;
export const Label = styled.div`
    font-size: ${({ theme }) => theme.fontSize.subText};
    font-family: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.gray.dark};
    margin: 0.2rem 0;
`;
export const Detail = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.medium};
    margin: 0 ${({ theme }) => theme.spacing.medium};
`;
export const Wrapper = styled.div`
    ${flexAroundStyle}
    width: 70%;
    margin-top: ${({ theme }) => theme.spacing.large};
`;
