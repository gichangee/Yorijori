import styled from "styled-components";

export const TabContainer = styled.div`
    width: 100%;
`;

export const TabButtons = styled.div`
    display: flex;
    justify-content: center;

    gap: 2.625rem;
    border-bottom: 0.063rem solid ${({ theme }) => theme.color.gray.lighter};
    margin-bottom: 2rem;
`;

export const TabButton = styled.div`
    height: 4.5rem;
    width: fit-content;

    font-size: ${({ theme }) => theme.fontSize.h4};
    font-family: "SUITSemiBold";

    display: flex;
    align-items: center;

    border-bottom: 0.063rem solid
        ${({ isActive, theme }) =>
            isActive ? theme.color.point.green : "none"};

    color: ${({ isActive, theme }) =>
        isActive ? theme.color.point.green : "#000"};
    cursor: pointer;
    user-select: none;

    padding: 0 0.656rem;
`;
