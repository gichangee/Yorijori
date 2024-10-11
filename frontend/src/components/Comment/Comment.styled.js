import styled from "styled-components";
import {
    flexAlignEndStyle,
    flexAlignStartStyle,
    flexStartStyle,
} from "../../styles/common";

export const CommentsWrapper = styled.div`
    width: 80%;
`;
export const CommentWrapper = styled.div`
    ${flexAlignStartStyle}
    flex-direction: column;
    width: 80%;
    margin-bottom: 0.5rem;
`;
export const Info = styled.div`
    ${flexStartStyle}
    margin-bottom: 0.5rem;
`;
export const Text = styled.div`
    margin: 0.7rem 0rem;
    font-size: ${({ theme }) => theme.fontSize.text};
`;
export const Date = styled.p`
    color: ${({ theme }) => theme.color.gray.dark};
    font-size: ${({ theme }) => theme.fontSize.subText};
`;
export const UserName = styled.p`
    font-family: ${({ theme }) => theme.fontWeight.semiBold};
    font-size: ${({ theme }) => theme.fontSize.text};
    margin-left: 0.5rem;
`;
export const User = styled.div`
    ${flexStartStyle}
`;

export const SubmitButton = styled.button`
    border: ${({ theme }) => theme.color.point.green};
    color: ${({ theme }) => theme.color.point.lightGreen};
    font-family: ${({ theme }) => theme.fontWeight.bold};
    background-color: ${({ theme }) => theme.color.point.green};

    margin-top: 0.5rem;
    padding: 0.2rem 1rem;
    border-radius: 0.5rem;
`;
export const TextAreaBox = styled.textarea`
    font-family: ${({ theme }) => theme.fontWeight.regular};
    background-color: ${({ theme }) => theme.color.gray.lighter};
    border: 1px solid ${({ theme }) => theme.color.gray.lighter};
    width: 100%;
    height: 5rem;
    padding: 1rem 0.2rem;
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    outline: none;
    resize: none;
    text-indent: 1rem;
`;
export const ButtonWrapper = styled.div`
    width: 100%;
    ${flexAlignEndStyle}
    flex-direction: column;
    margin: 0.5rem 0;
`;
export const TextAreaWrapper = styled.div`
    ${flexAlignEndStyle}
    flex-direction: column;
    margin-top: ${({ theme }) => theme.spacing.large};
    width: 100%;
    resize: none;
`;

export const CommentInputWrapper = styled.div`
    width: 80%;
`;
export const CommentTitle = styled.div`
    width: 80%;
    margin-top: 2rem;
    font-family: ${({ theme }) => theme.fontWeight.medium};
`;
