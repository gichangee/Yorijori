import styled from "styled-components";

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    padding-bottom: 10px;
    margin: 30px;
`;

export const SortButton = styled.button`
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-weight: ${(props) => (props.active ? "bold" : null)};
    cursor: pointer;
    font-family: "SUITRegular";
`;
