import styled from "styled-components";
import { flexAlignStartStyle, flexStartStyle } from "../../../styles/common";

export const UserContainer = styled.div`
    ${flexStartStyle}
    width: 80%;
    margin: 2rem;
`;

export const UserDetails = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    height: 6rem;
    margin-left: ${({ theme }) => theme.spacing.medium};
`;

export const UserInfo = styled.div`
    ${flexStartStyle}
    width: 100%;
`;

export const UserName = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    margin-right: ${({ theme }) => theme.spacing.medium};
`;
export const UserHome = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: "TossFace";
    cursor: pointer;
    margin-right: ${({ theme }) => theme.spacing.medium};
`;
export const UserTalk = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    margin-top: ${({ theme }) => theme.spacing.small};
    color: ${({ theme }) => theme.color.gray.darker};
`;
export const UserLabel = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: ${({ theme }) => theme.fontWeight.regular};
    color: ${({ theme }) => theme.color.gray.darker};
`;
