import styled from "styled-components";
import { flexAlignStartStyle, flexCenterStyle } from "../../../styles/common";

export const ReviewWrapper = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    margin-top: ${({ theme }) => theme.spacing.medium};
`;

export const ReviewTitle = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
`;

export const ReviewContent = styled.div`
    font-size: ${({ theme }) => theme.fontSize.subText};
    margin-top: ${({ theme }) => theme.spacing.small};
`;

export const ReviewOverviewRight = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    width: 50%;

    margin-left: ${({ theme }) => theme.spacing.medium};
`;

export const ReviewOverviewWrapper = styled.div`
    ${flexCenterStyle}
    width: 17rem;
    height: 8rem;

    border-radius: ${({ theme }) => theme.borderRadius.large};
    cursor: pointer;

    border: ${({ theme }) => `0.1rem solid ${theme.color.point.lightGreen}`};

    background-color: ${({ $isSelected, theme }) =>
        $isSelected ? theme.color.point.lightGreen : "transparent"};

    transition: background-color 0.3s ease;
    margin-left: ${({ theme }) => theme.spacing.large};
`;

export const ReviewImg = styled.img`
    width: 40%;
    height: 80%;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    object-fit: cover;
`;
