import styled from "styled-components";
import { flexAroundStyle } from "../../../styles/common";

export const Title = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.point.green};
`;
export const Price = styled.div`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    font-size: ${({ theme }) => theme.fontSize.text};
`;
export const Wrapper = styled.div`
    ${flexAroundStyle}
    width: 100%;
    padding: ${({ theme }) => theme.spacing.medium};
`;
export const Img = styled.img`
    width: 13%;
    height: 3.5rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const LowestPriceWrapper = styled.div`
    width: 100%;
    height: 15rem;
    padding: 0.5rem 0;
`;
