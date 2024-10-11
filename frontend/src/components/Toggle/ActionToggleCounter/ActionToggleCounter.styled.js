import styled from "styled-components";

export const ActionToggleCounter = styled.div`
    font-family: "SUITRegular";
    display: flex;
    width: fit-content;
    gap: 3px;
    align-items: center;
    cursor: default;
    color: ${({ theme }) => theme.color.gray.dark};
    user-select: none;
`;
