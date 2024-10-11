import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../styles/common";

export const StepWrapper = styled.div`
    ${flexAlignStartStyle}
    min-height: 14rem;
    margin-top: 1rem;
    height: auto;
`;
export const StepContainer = styled.div`
    width: 80%;
`;
export const CircleNumber = styled.div`
    ${flexCenterStyle}
    width: 2.2rem;
    height: 2.2rem;
    background-color: ${({ theme }) => theme.color.point.green};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.h4};
    color: white;
    border-radius: 50%;
    text-align: center;
`;

export const StepDescription = styled.div`
    ${flexStartStyle}
    width: 80%;
    overflow: auto;
    min-height: 14rem;
    line-height: 1.3rem;
    letter-spacing: 0.05rem;
    background-color: ${({ theme }) => theme.color.point.lightGreen};
    font-family: ${({ theme }) => theme.fontWeight.medium};
    font-size: ${({ theme }) => theme.fontSize.text};
    margin: 0.5rem 0 0 1rem;
    border-radius: 0 2rem 2rem 2rem;
    padding: 1.4rem;
    box-sizing: border-box;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    text-align: start;
    align-items: flex-start;
`;

export const StepImage = styled.img`
    width: 14rem;
    height: 14rem;
    margin: 0.5rem 0 0 1rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    object-fit: cover;
`;
