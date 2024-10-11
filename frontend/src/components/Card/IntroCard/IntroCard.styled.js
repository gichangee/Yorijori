import styled from "styled-components";
import {
    cardBorderRadius,
    BaseCard,
    BaseThumnail,
    BaseTitle,
    BaseText,
    BaseTextArea,
} from "../Card.styled";

export const IntroCard = styled(BaseCard)`
    margin: 20px;
    width: 17.25rem;
    height: 300px;
    background-color: white;
    border-radius: ${cardBorderRadius};
    box-shadow: 0px 0.25rem 1.25rem rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition:
        transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
        box-shadow 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
        transform: translateY(-0.625rem) scale(1.04);
        box-shadow: 0px 0.4rem 1.5rem rgba(0, 0, 0, 0.3);
    }

    &:active {
        background-color: ${({ theme }) => theme.color.point.lightGreen};
    }
`;

export const Thumnail = styled(BaseThumnail)`
    height: 60%;
    border-top-left-radius: ${cardBorderRadius};
    border-top-right-radius: ${cardBorderRadius};
`;

export const TextArea = styled(BaseTextArea)`
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    gap: 8px;
`;

export const Title = styled(BaseTitle)`
    height: fit-content;
    font-size: ${({ theme }) => theme.fontSize.h4};
`;

export const Text = styled(BaseText)`
    white-space: normal;
    flex: 1;
    width: 100%;
    font-size: ${({ theme }) => theme.fontSize.text};
    overflow-y: hidden;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 19px;
`;
