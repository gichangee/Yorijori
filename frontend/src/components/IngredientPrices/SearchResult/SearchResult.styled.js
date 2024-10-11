import styled, { keyframes } from "styled-components";
import {
    flexAroundStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const MoreInfo = styled.div`
    ${flexCenterStyle}
    background-color: ${({ theme }) => theme.color.gray.lighter};
    padding: ${({ theme }) => theme.spacing.large} 0;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    width: 70%;
    animation: ${slideIn} 0.5s ease-in-out;
    margin: ${({ theme }) => theme.spacing.large} 0;
`;
export const Name = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
    color: ${({ theme }) => theme.color.point.green};
    margin: 0 ${({ theme }) => theme.spacing.medium};
`;
export const Price = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
    margin: 0 ${({ theme }) => theme.spacing.medium};
`;
export const ResultInfo = styled.div`
    ${flexAroundStyle}
    width: 70%;
`;
export const Label = styled.div`
    ${flexStartStyle}
`;

export const ResultWrapper = styled.div`
    ${flexCenterStyle}
    width: 70%;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const Wrapper = styled.div`
    ${flexAroundStyle}
    width: 100%;
    flex-direction: column;
    animation: ${fadeIn} 1s ease-in-out;
`;
export const Img = styled.img`
    width: 15%;
    border-radius: ${({ theme }) => theme.borderRadius.small};
`;
export const Unit = styled.div``;
