import styled from "styled-components";
import {
    flexAlignEndStyle,
    flexBetweenStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../styles/common";

export const ReviewSectionBottom = styled.div`
    ${flexCenterStyle}
    width: 80%;
`;
export const ReviewSectionTop = styled.div`
    ${flexBetweenStyle}
    width: 80%;
    margin-bottom: ${({ theme }) => theme.spacing.large};
`;
export const ReviewSection = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
    width: 70%;
`;

export const ReviewTitle = styled.div`
    ${flexStartStyle}
    font-family: ${({ theme }) => theme.fontWeight.medium};
`;

export const NoReviewsMessage = styled.div`
    ${flexCenterStyle}
    width: 80%;
`;
export const ReviewRegistButtonWrapper = styled.div`
    ${flexAlignEndStyle}
    flex-direction: column;
    width: 80%;
    margin-top: ${({ theme }) => theme.spacing.large};
`;
