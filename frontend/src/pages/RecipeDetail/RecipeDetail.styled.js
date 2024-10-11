import styled from "styled-components";
import { flexCenterStyle, flexStartStyle } from "../../styles/common";

export const CommentTitle = styled.div`
    ${flexStartStyle}
    width: 80%;
    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    margin-top: 2rem;
`;
export const Container = styled.div`
    width: 100%;
    ${flexCenterStyle}
    flex-direction: column;
`;
export const InfoSection = styled.div`
    ${flexCenterStyle}
    width: 70%;
    flex-direction: column;
`;
export const StepSection = styled.div`
    margin-top: 2rem;
    ${flexCenterStyle}
    width: 70%;
`;

export const UserSection = styled.div`
    ${flexCenterStyle}
    width: 70%;
`;

export const CommentSection = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
    width: 70%;
`;
