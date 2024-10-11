import styled from "styled-components";
import { flexAroundStyle } from "../../../styles/common";

export const Reviews = styled.div`
    flex-direction: column;
    height: 90%;
    width: 50%;
    overflow: auto;
    padding: 1rem;
`;
export const ReviewModalWrapper = styled.div`
    ${flexAroundStyle}
    height: 100%;
    width: 100%;
`;
export const MoreReviews = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.regular};
    text-align: center;
    cursor: pointer;
`;
export const ReviewWrapper = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.large};
`;
