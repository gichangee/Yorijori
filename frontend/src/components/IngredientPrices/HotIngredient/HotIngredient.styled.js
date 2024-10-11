import styled from "styled-components";
import {
    flexAlignStartStyle,
    flexBetweenStyle,
    flexCenterStyle,
    flexStartStyle,
} from "../../../styles/common";

export const Like = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
`;
export const InfoLeft = styled.div`
    ${flexStartStyle}
`;
export const Name = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const InfoTop = styled.div`
    ${flexBetweenStyle}
    width: 100%;
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;
export const Wrapper = styled.div`
    margin: ${({ theme }) => theme.spacing.small};
    ${flexCenterStyle};
    width: 20rem;
    height: 5rem;
    box-shadow: 0rem 0.25rem 0.375rem rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: ${({ theme }) => theme.spacing.large};
`;
export const Info = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    margin-left: 2rem;
    width: 60%;
`;
export const Price = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.point.red};
    margin-bottom: ${({ theme }) => theme.spacing.medium};
`;
export const Rank = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ theme }) => theme.color.point.green};
    margin-right: ${({ theme }) => theme.spacing.medium};
`;
export const Img = styled.img`
    width: 35%;
    height: 100%;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
`;

export const Hot = styled.div`
    margin-right: ${({ theme }) => theme.spacing.small};
`;
