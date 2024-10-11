import styled from "styled-components";

export const Button = styled.button`
    border: none;
    border-radius: 4px;

    width: ${({ width }) => width || "100px"};
    height: ${({ height }) => height || "40px"};

    color: white;
    background-color: ${({ theme }) => theme.color.point.green};

    font-size: ${({ type, theme }) => {
        if (type === "large") return theme.fontSize.h6;
        if (type === "small") return theme.fontSize.subText;
        return theme.fontSize.text;
    }};

    padding: ${({ type }) => {
        if (type === "large") return "15px";
        if (type === "small") return "5px";
        return "10px";
    }};
    font-family: "SUITMedium";

    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #3e8d55;
    }

    &:active {
        background-color: #367a4a;
    }
`;
