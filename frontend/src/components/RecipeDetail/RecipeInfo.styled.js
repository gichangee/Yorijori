import styled from "styled-components";
import {
    flexAroundStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../styles/common";

export const Title = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
    margin-right: ${({ theme }) => theme.spacing.medium};
    margin-left: ${({ theme }) => theme.spacing.medium};
`;
export const RecipeIngredientLabel = styled.div`
    width: 80%;
    ${flexStartStyle}
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;
export const Layout = styled.div`
    ${flexCenterStyle}
    width: 50%;
    flex-direction: column;
`;
export const Wrapper = styled.div`
    ${flexAroundStyle}
    width: 80%;
    height: auto;
`;
export const Thumbnail = styled.img`
    height: 15rem;
    width: 40%;
    border-radius: ${({ theme }) => theme.borderRadius.small};
`;
