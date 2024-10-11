import styled from "styled-components";
import { flexCenterStyle } from "../../styles/common";

export const Content = styled.div`
    font-size: ${({ theme }) => theme.fontSize.h4};
    margin-top: ${({ theme }) => theme.spacing.large};
    font-family: ${({ theme }) => theme.fontWeight.bold};
`;
export const Recommend = styled.div`
    font-size: ${({ theme }) => theme.fontSize.text};
    margin-top: ${({ theme }) => theme.spacing.medium};
    margin-bottom: ${({ theme }) => theme.spacing.medium};

    color: ${({ theme }) => theme.color.gray.darker};
`;
export const Emoji = styled.div`
    font-family: "TossFace";
    font-size: 5rem;
    margin-bottom: ${({ theme }) => theme.spacing.large};
`;
export const Wrapper = styled.div`
    ${flexCenterStyle}
    flex-direction: column;
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-color: red;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    background-color: ${({ theme }) => theme.color.gray.lighter};
`;
