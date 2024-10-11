import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexAroundStyle,
    flexBetweenStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const RecipeTotalRating = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.regular};
`;
export const FlexBetween = styled.div`
    ${flexBetweenStyle}

    width: 100%;
`;
export const RecipeName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
`;
export const FlexInside = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;

    width: 100%;
    margin-left: ${({ theme }) => theme.spacing.medium};
`;

export const FlexCenter = styled.div`
    ${flexCenterStyle}
    margin-left: -0.2rem;
`;
export const UserName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
`;
export const Wrapper = styled.div`
    ${flexAroundStyle}
    flex-direction: column;
    height: 80%;
    width: 45%;
    padding: 2rem;
    border-radius: ${({ theme }) => theme.borderRadius.large};
    border: 0.1rem solid ${({ theme }) => theme.color.gray.lighter};
`;
export const FlexLayout = styled.div`
    ${flexStartStyle}

    width: 100%;
`;
export const ReviewImg = styled.img`
    width: 100%;
    height: 9rem;
    border-radius: ${({ theme }) => theme.borderRadius.small};
`;

export const ReviewWrapper = styled.div`
    ${flexAlignStartStyle}
    width: 100%;
    margin-top: -1rem;
    flex-direction: column;
`;
export const ReviewTitle = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
`;
export const ReviewContent = styled.div`
    margin-top: ${({ theme }) => theme.spacing.small};
    font-size: ${({ theme }) => theme.fontSize.text};
`;
