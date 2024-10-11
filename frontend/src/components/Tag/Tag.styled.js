import styled from "styled-components";
import { flexCenterStyle } from "../../styles/common";

export const TagEmoji = styled.span`
    font-size: ${({ theme }) => theme.fontSize.text};
    font-family: "TossFace";
    margin-left: 0.5rem;
`;
export const TagName = styled.span`
    font-family: ${({ theme }) => theme.fontWeight.bold};
    color: ${({ isClicked, theme }) =>
        isClicked ? theme.color.point.lightGreen : theme.color.point.green};
`;
export const TagWrapper = styled.div`
    ${flexCenterStyle}
    font-size: ${({ theme }) => theme.fontSize.text};
    background-color: ${({ isClicked, theme }) =>
        isClicked && theme.color.point.green};

    border: 1px solid
        ${({ isClicked, theme }) =>
            isClicked ? theme.color.point.lightGreen : theme.color.point.green};
    border-radius: ${({ theme }) => theme.borderRadius.large};
    text-align: center;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    margin-right: 0.5rem;
    inline-size: max-content;
`;
